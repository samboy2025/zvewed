import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Create a new sponsor registration
export const createSponsorRegistration = mutation({
  args: {
    organizationName: v.string(),
    contactPerson: v.string(),
    position: v.string(),
    email: v.string(),
    phone: v.string(),
    website: v.optional(v.string()),
    address: v.string(),
    city: v.string(),
    state: v.string(),
    organizationType: v.string(),
    industry: v.string(),
    sponsorshipLevel: v.string(),
    sponsorshipAmount: v.string(),
    marketingObjectives: v.optional(v.string()),
    targetAudience: v.optional(v.string()),
    previousSponsorship: v.optional(v.string()),
    specialRequests: v.optional(v.string()),
    logoFile: v.optional(v.string()),
    marketingMaterials: v.optional(v.string()),
    speakerNomination: v.optional(v.string()),
    networkingPreferences: v.optional(v.string()),
    agreeToTerms: v.boolean(),
    agreeToMarketing: v.boolean(),
  },
  handler: async (ctx, args) => {
    // First check if user already exists
    const existingUser = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("email"), args.email))
      .first();
      
    if (!existingUser) {
      // Create user account for sponsor
      const userId = await ctx.db.insert("users", {
        firstName: args.contactPerson.split(' ')[0] || args.contactPerson,
        lastName: args.contactPerson.split(' ').slice(1).join(' ') || '',
        email: args.email,
        password: args.phone, // Using phone as default password
        phone: args.phone,
        organization: args.organizationName,
        position: args.position,
        city: args.city,
        state: args.state,
        industry: args.industry,
        website: args.website,
        userType: "sponsor", // Set userType as sponsor
        agreeToTerms: args.agreeToTerms,
        agreeToMarketing: args.agreeToMarketing,
        createdAt: Date.now(),
        status: "active",
        eventId: "wed-4.0",
      });
    }
    
    // Create sponsor registration
    const sponsorId = await ctx.db.insert("sponsors", {
      ...args,
      createdAt: Date.now(),
      status: "pending", // pending, approved, rejected
      paymentStatus: "unpaid", // unpaid, pending, paid
      eventId: "wed-4.0",
    });
    
    return sponsorId;
  },
});

// Get all sponsor registrations
export const getAllSponsors = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("sponsors").order("desc").collect();
  },
});

// Get sponsor by email
export const getSponsorByEmail = query({
  args: { email: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("sponsors")
      .filter((q) => q.eq(q.field("email"), args.email))
      .first();
  },
});

// Get sponsor by user ID
export const getSponsorByUserId = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    // First get the user
    const user = await ctx.db.get(args.userId);
    if (!user || user.userType !== "sponsor") return null;
    
    // Try to find a sponsor record with this email
    const sponsor = await ctx.db
      .query("sponsors")
      .filter((q) => q.eq(q.field("email"), user.email))
      .first();
      
    // If no sponsor record exists, create a virtual sponsor object from user data
    if (!sponsor) {
      return {
        _id: user._id,
        organizationName: user.organization || `${user.firstName} ${user.lastName} Company`,
        contactPerson: `${user.firstName} ${user.lastName}`,
        position: user.position || "Representative",
        email: user.email,
        phone: user.phone || "",
        website: user.website || "",
        address: "",
        city: user.city || "",
        state: user.state || "",
        organizationType: "corporate",
        industry: user.industry || "other",
        sponsorshipLevel: "silver",
        sponsorshipAmount: "500000",
        status: "pending",
        paymentStatus: "unpaid",
        createdAt: user.createdAt,
        eventId: "wed-4.0",
        isFromUserTable: true // Flag to indicate this is from users table
      };
    }
    
    return sponsor;
  },
});

// Update sponsor status
export const updateSponsorStatus = mutation({
  args: {
    sponsorId: v.id("sponsors"),
    status: v.string(),
    paymentStatus: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { sponsorId, status, paymentStatus } = args;
    
    const updateData: any = { status };
    if (paymentStatus) {
      updateData.paymentStatus = paymentStatus;
    }
    
    await ctx.db.patch(sponsorId, updateData);
  },
});

// Get sponsor statistics
export const getSponsorStats = query({
  args: {},
  handler: async (ctx) => {
    const allSponsors = await ctx.db.query("sponsors").collect();
    
    const stats = {
      total: allSponsors.length,
      approved: allSponsors.filter(s => s.status === "approved").length,
      pending: allSponsors.filter(s => s.status === "pending").length,
      rejected: allSponsors.filter(s => s.status === "rejected").length,
      paid: allSponsors.filter(s => s.paymentStatus === "paid").length,
      unpaid: allSponsors.filter(s => s.paymentStatus === "unpaid").length,
      platinum: allSponsors.filter(s => s.sponsorshipLevel === "platinum").length,
      gold: allSponsors.filter(s => s.sponsorshipLevel === "gold").length,
      silver: allSponsors.filter(s => s.sponsorshipLevel === "silver").length,
      inKind: allSponsors.filter(s => s.sponsorshipLevel === "in-kind").length,
    };
    
    return stats;
  },
});

// Get sponsor by phone (for login context)
export const getSponsorByPhone = query({
  args: { phone: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("sponsors")
      .filter((q) => q.eq(q.field("phone"), args.phone))
      .first();
  },
});

// Update sponsor profile
export const updateSponsorProfile = mutation({
  args: {
    sponsorId: v.id("sponsors"),
    organizationName: v.optional(v.string()),
    contactPerson: v.optional(v.string()),
    position: v.optional(v.string()),
    phone: v.optional(v.string()),
    website: v.optional(v.string()),
    address: v.optional(v.string()),
    city: v.optional(v.string()),
    state: v.optional(v.string()),
    organizationType: v.optional(v.string()),
    industry: v.optional(v.string()),
    marketingObjectives: v.optional(v.string()),
    targetAudience: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { sponsorId, ...updateData } = args;
    await ctx.db.patch(sponsorId, updateData);
  },
});

// Upload payment receipt
export const uploadPaymentReceipt = mutation({
  args: {
    sponsorId: v.id("sponsors"),
    receiptUrl: v.string(),
    paymentDetails: v.object({
      amount: v.number(),
      paymentMethod: v.string(),
      referenceNumber: v.string(),
      paymentDate: v.string(),
      bankName: v.optional(v.string()),
    }),
  },
  handler: async (ctx, args) => {
    const { sponsorId, receiptUrl, paymentDetails } = args;
    
    await ctx.db.patch(sponsorId, {
      paymentReceipt: receiptUrl,
      paymentDetails: paymentDetails,
      paymentStatus: "pending",
      paymentSubmittedAt: Date.now(),
    });
  },
});

// Update sponsor profile image
export const updateProfileImage = mutation({
  args: {
    sponsorId: v.id("sponsors"),
    imageUrl: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.sponsorId, {
      imageUrl: args.imageUrl,
    });
  },
});

// Delete sponsor registration
export const deleteSponsor = mutation({
  args: { sponsorId: v.id("sponsors") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.sponsorId);
  },
});
