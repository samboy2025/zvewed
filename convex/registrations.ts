import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Registration data schema
const registrationSchema = v.object({
  firstName: v.string(),
  lastName: v.string(),
  email: v.string(),
  phone: v.string(),
  organization: v.optional(v.string()),
  position: v.optional(v.string()),
  city: v.string(),
  state: v.string(),
  category: v.string(),
  experience: v.optional(v.string()),
  interests: v.array(v.string()),
  expectations: v.optional(v.string()),
  dietaryRestrictions: v.optional(v.string()),
  agreeToTerms: v.boolean(),
  agreeToMarketing: v.boolean(),
});

// Create a new registration
export const createRegistration = mutation({
  args: {
    firstName: v.string(),
    lastName: v.string(),
    email: v.string(),
    phone: v.string(),
    organization: v.optional(v.string()),
    position: v.optional(v.string()),
    city: v.string(),
    state: v.string(),
    category: v.string(),
    experience: v.optional(v.string()),
    interests: v.array(v.string()),
    expectations: v.optional(v.string()),
    dietaryRestrictions: v.optional(v.string()),
    agreeToTerms: v.boolean(),
    agreeToMarketing: v.boolean(),
  },
  handler: async (ctx, args) => {
    const registrationId = await ctx.db.insert("registrations", {
      ...args,
      createdAt: Date.now(),
      status: "pending",
      paymentStatus: "unpaid",
      eventId: "wed-4.0",
    });

    const existingUser = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("phone"), args.phone))
      .first();

    if (!existingUser) {
      await ctx.db.insert("users", {
        firstName: args.firstName,
        lastName: args.lastName,
        email: args.email,
        phone: args.phone,
        organization: args.organization,
        position: args.position,
        city: args.city,
        state: args.state,
        userType: "participant",
        agreeToTerms: args.agreeToTerms,
        agreeToMarketing: args.agreeToMarketing,
        createdAt: Date.now(),
        status: "active",
        lastLogin: undefined,
        eventId: "wed-4.0",
      });
    }
    
    return registrationId;
  },
});

// Get all registrations (for admin)
export const getAllRegistrations = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("registrations").order("desc").collect();
  },
});

// Get registration by email
export const getRegistrationByEmail = query({
  args: { email: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("registrations")
      .filter((q) => q.eq(q.field("email"), args.email))
      .first();
  },
});

// Update registration status
export const updateRegistrationStatus = mutation({
  args: {
    registrationId: v.id("registrations"),
    status: v.string(),
    paymentStatus: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { registrationId, status, paymentStatus } = args;
    
    const updateData: any = { status };
    if (paymentStatus) {
      updateData.paymentStatus = paymentStatus;
    }
    
    await ctx.db.patch(registrationId, updateData);
  },
});

// Get registration statistics
export const getRegistrationStats = query({
  args: {},
  handler: async (ctx) => {
    const allRegistrations = await ctx.db.query("registrations").collect();
    
    return {
      total: allRegistrations.length,
      confirmed: allRegistrations.filter(r => r.status === "confirmed").length,
      pending: allRegistrations.filter(r => r.status === "pending").length,
      paid: allRegistrations.filter(r => r.paymentStatus === "paid").length,
    };
  },
});

// Delete registration (admin only)
export const deleteRegistration = mutation({
  args: { registrationId: v.id("registrations") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.registrationId);
  },
}); 