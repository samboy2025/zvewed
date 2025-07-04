import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Create a new user account
export const createUser = mutation({
  args: {
    firstName: v.string(),
    lastName: v.string(),
    email: v.string(),
    password: v.string(),
    phone: v.optional(v.string()),
    organization: v.optional(v.string()),
    position: v.optional(v.string()),
    city: v.optional(v.string()),
    state: v.optional(v.string()),
    industry: v.optional(v.string()),
    experience: v.optional(v.string()),
    bio: v.optional(v.string()),
    website: v.optional(v.string()),
    userType: v.string(), // participant, admin, speaker
    agreeToTerms: v.boolean(),
    agreeToMarketing: v.boolean(),
  },
  handler: async (ctx, args) => {
    const userId = await ctx.db.insert("users", {
      ...args,
      createdAt: Date.now(),
      status: "active", // active, inactive, suspended
      lastLogin: undefined,
      eventId: "wed-4.0",
    });
    
    return userId;
  },
});

// Get all users
export const getAllUsers = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("users").order("desc").collect();
  },
});

// Get user by email
export const getUserByEmail = query({
  args: { email: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("email"), args.email))
      .first();
  },
});

// Update user status
export const updateUserStatus = mutation({
  args: {
    userId: v.id("users"),
    status: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.userId, { status: args.status });
  },
});

// Update user profile
export const updateUserProfile = mutation({
  args: {
    userId: v.id("users"),
    firstName: v.optional(v.string()),
    lastName: v.optional(v.string()),
    phone: v.optional(v.string()),
    organization: v.optional(v.string()),
    position: v.optional(v.string()),
    city: v.optional(v.string()),
    state: v.optional(v.string()),
    industry: v.optional(v.string()),
    experience: v.optional(v.string()),
    bio: v.optional(v.string()),
    website: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { userId, ...updateData } = args;
    await ctx.db.patch(userId, updateData);
  },
});

// Get user statistics
export const getUserStats = query({
  args: {},
  handler: async (ctx) => {
    const allUsers = await ctx.db.query("users").collect();
    
    const stats = {
      total: allUsers.length,
      active: allUsers.filter(u => u.status === "active").length,
      inactive: allUsers.filter(u => u.status === "inactive").length,
      suspended: allUsers.filter(u => u.status === "suspended").length,
      participants: allUsers.filter(u => u.userType === "participant").length,
      vendors: allUsers.filter(u => u.userType === "vendor").length,
      sponsors: allUsers.filter(u => u.userType === "sponsor").length,
      admins: allUsers.filter(u => u.userType === "admin").length,
      speakers: allUsers.filter(u => u.userType === "speaker").length,
    };
    
    return stats;
  },
});

// Get user by phone (for login context)
export const getUserByPhone = query({
  args: { phone: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("phone"), args.phone))
      .first();
  },
});

// Get user with registration data
export const getUserWithRegistration = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    const user = await ctx.db.get(args.userId);
    if (!user) return null;
    
    const registration = await ctx.db
      .query("registrations")
      .filter((q) => q.eq(q.field("email"), user.email))
      .first();
    
    return {
      ...user,
      registration,
      eventId: `WED4-${user._id.slice(-8).toUpperCase()}`,
    };
  },
});

// Generate user event ID
export const generateEventId = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    return `WED4-${args.userId.slice(-8).toUpperCase()}`;
  },
});

// Update user profile image
export const updateProfileImage = mutation({
  args: {
    userId: v.id("users"),
    imageUrl: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.userId, {
      imageUrl: args.imageUrl,
    });
  },
});

// Update user role
export const updateUserRole = mutation({
  args: {
    userId: v.id("users"),
    userType: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.userId, { 
      userType: args.userType,
      updatedAt: Date.now() 
    });
  },
});

// Get users by role
export const getUsersByRole = query({
  args: { userType: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("userType"), args.userType))
      .order("desc")
      .collect();
  },
});

// Search users
export const searchUsers = query({
  args: { searchTerm: v.string() },
  handler: async (ctx, args) => {
    const allUsers = await ctx.db.query("users").collect();
    const searchLower = args.searchTerm.toLowerCase();
    
    return allUsers.filter(user => 
      user.firstName.toLowerCase().includes(searchLower) ||
      user.lastName.toLowerCase().includes(searchLower) ||
      user.email.toLowerCase().includes(searchLower) ||
      (user.organization && user.organization.toLowerCase().includes(searchLower))
    );
  },
});

// Create admin user
export const createAdminUser = mutation({
  args: {
    firstName: v.string(),
    lastName: v.string(),
    email: v.string(),
    password: v.string(),
    phone: v.string(),
  },
  handler: async (ctx, args) => {
    const userId = await ctx.db.insert("users", {
      ...args,
      userType: "admin",
      status: "active",
      createdAt: Date.now(),
      agreeToTerms: true,
      agreeToMarketing: false,
      eventId: "wed-admin",
    });
    return userId;
  },
});

// Delete user
export const deleteUser = mutation({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.userId);
  },
});
