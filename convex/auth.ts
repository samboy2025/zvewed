import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Sign up new user with password
export const signup = mutation({
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
    userType: v.string(),
    agreeToTerms: v.boolean(),
    agreeToMarketing: v.boolean(),
  },
  handler: async (ctx, args) => {
    const existingUser = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("email"), args.email))
      .first();

    if (existingUser) {
      throw new Error("User with this email already exists.");
    }

    const userId = await ctx.db.insert("users", {
      ...args,
      createdAt: Date.now(),
      status: "active",
      lastLogin: undefined,
      eventId: "wed-4.0",
    });

    return userId;
  },
});

// Login user with email and password
export const loginUser = mutation({
  args: {
    email: v.string(),
    password: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("email"), args.email))
      .first();

    if (!user || user.password !== args.password) {
      return { success: false, message: "Invalid credentials" };
    }

    if (user.status !== "active") {
      return { success: false, message: "Account is not active" };
    }

    // Update last login
    await ctx.db.patch(user._id, { lastLogin: Date.now() });

    return {
      success: true,
      user: {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
        organization: user.organization,
        position: user.position,
        userType: user.userType,
        status: user.status,
        imageUrl: user.imageUrl,
      },
    };
  },
});

// Admin login
export const adminLogin = mutation({
  args: {
    email: v.string(),
    password: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("email"), args.email))
      .filter((q) => q.eq(q.field("userType"), "admin"))
      .first();

    if (!user || user.password !== args.password) {
      return { success: false, message: "Invalid admin credentials" };
    }

    if (user.status !== "active") {
      return { success: false, message: "Admin account is not active" };
    }

    // Update last login
    await ctx.db.patch(user._id, { lastLogin: Date.now() });

    return {
      success: true,
      user: {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        userType: user.userType,
        status: user.status,
      },
    };
  },
});

// Phone-based login (legacy)
export const login = mutation({
  args: {
    phone: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("phone"), args.phone))
      .first();

    if (user) {
      await ctx.db.patch(user._id, { lastLogin: Date.now() });
      return user;
    }

    // Check vendors table
    const vendor = await ctx.db
      .query("vendors")
      .filter((q) => q.eq(q.field("phone"), args.phone))
      .first();

    if (vendor) {
      return vendor;
    }

    // Check sponsors table
    const sponsor = await ctx.db
      .query("sponsors")
      .filter((q) => q.eq(q.field("phone"), args.phone))
      .first();

    if (sponsor) {
      return sponsor;
    }

    throw new Error("User not found.");
  },
});

// Unified login by phone
export const unifiedLogin = mutation({
  args: {
    phone: v.string(),
  },
  handler: async (ctx, args) => {
    // Check users table first
    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("phone"), args.phone))
      .first();

    if (user) {
      await ctx.db.patch(user._id, { lastLogin: Date.now() });
      return { type: "user", data: user };
    }

    // Check vendors table
    const vendor = await ctx.db
      .query("vendors")
      .filter((q) => q.eq(q.field("phone"), args.phone))
      .first();

    if (vendor) {
      return { type: "vendor", data: vendor };
    }

    // Check sponsors table
    const sponsor = await ctx.db
      .query("sponsors")
      .filter((q) => q.eq(q.field("phone"), args.phone))
      .first();

    if (sponsor) {
      return { type: "sponsor", data: sponsor };
    }

    throw new Error("Phone number not found in any registration.");
  },
});

// Vendor login
export const vendorLogin = mutation({
  args: {
    phone: v.string(),
  },
  handler: async (ctx, args) => {
    const vendor = await ctx.db
      .query("vendors")
      .filter((q) => q.eq(q.field("phone"), args.phone))
      .first();

    if (!vendor) {
      throw new Error("Vendor not found.");
    }

    return vendor;
  },
});

// Change password
export const changePassword = mutation({
  args: {
    userId: v.id("users"),
    currentPassword: v.string(),
    newPassword: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db.get(args.userId);
    
    if (!user) {
      throw new Error("User not found");
    }

    if (user.password !== args.currentPassword) {
      throw new Error("Current password is incorrect");
    }

    await ctx.db.patch(args.userId, {
      password: args.newPassword,
      updatedAt: Date.now(),
    });

    return { success: true };
  },
});

// Reset password (admin function)
export const resetUserPassword = mutation({
  args: {
    userId: v.id("users"),
    newPassword: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.userId, {
      password: args.newPassword,
      updatedAt: Date.now(),
    });

    return { success: true };
  },
});

// Validate session
export const validateSession = query({
  args: {
    userId: v.id("users"),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db.get(args.userId);
    
    if (!user || user.status !== "active") {
      return { valid: false };
    }

    return {
      valid: true,
      user: {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        userType: user.userType,
        status: user.status,
      },
    };
  },
});
