import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Sign up new user with phone number (password optional for non-admin users)
export const signup = mutation({
  args: {
    firstName: v.string(),
    lastName: v.string(),
    email: v.string(),
    password: v.optional(v.string()), // Optional for regular users, required for admins
    phone: v.string(), // Required for phone-based login
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
    // Check if user with email already exists
    const existingUserByEmail = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("email"), args.email))
      .first();

    if (existingUserByEmail) {
      throw new Error("User with this email already exists.");
    }

    // Check if user with phone already exists
    const normalizedPhone = normalizePhoneNumber(args.phone);
    const existingUserByPhone = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("phone"), normalizedPhone))
      .first();

    if (existingUserByPhone) {
      throw new Error("User with this phone number already exists.");
    }

    // Validate admin users must have password
    if (args.userType === "admin" && !args.password) {
      throw new Error("Admin users must have a password.");
    }

    const userId = await ctx.db.insert("users", {
      ...args,
      phone: normalizedPhone, // Store normalized phone number
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

    if (!user) {
      return { success: false, message: "Admin user not found" };
    }

    if (!user.password) {
      return { success: false, message: "Admin account has no password set" };
    }

    if (user.password !== args.password) {
      return { success: false, message: "Invalid admin password" };
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

// Unified login by phone with phone number normalization
export const unifiedLogin = mutation({
  args: {
    phone: v.string(),
  },
  handler: async (ctx, args) => {
    // Normalize phone number to handle different formats
    const normalizedPhone = normalizePhoneNumber(args.phone);
    
    // Check users table first
    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("phone"), normalizedPhone))
      .first();

    if (user) {
      await ctx.db.patch(user._id, { lastLogin: Date.now() });
      return { type: "user", data: user };
    }

    // Check vendors table
    const vendor = await ctx.db
      .query("vendors")
      .filter((q) => q.eq(q.field("phone"), normalizedPhone))
      .first();

    if (vendor) {
      return { type: "vendor", data: vendor };
    }

    // Check sponsors table
    const sponsor = await ctx.db
      .query("sponsors")
      .filter((q) => q.eq(q.field("phone"), normalizedPhone))
      .first();

    if (sponsor) {
      return { type: "sponsor", data: sponsor };
    }

    throw new Error("Phone number not found in any registration.");
  },
});

// Helper function to normalize phone numbers
function normalizePhoneNumber(phone: string): string {
  // Remove all non-digit characters
  let cleaned = phone.replace(/\D/g, '');
  
  // Handle Nigerian phone numbers
  if (cleaned.startsWith('0') && cleaned.length === 11) {
    // Convert 08012345678 to +2348012345678
    cleaned = '+234' + cleaned.substring(1);
  } else if (cleaned.startsWith('234') && cleaned.length === 12) {
    // Convert 2348012345678 to +2348012345678
    cleaned = '+' + cleaned;
  } else if (cleaned.startsWith('+234') && cleaned.length === 14) {
    // Already in correct format
    cleaned = cleaned;
  } else if (cleaned.length === 10) {
    // Assume it's a Nigerian number without country code
    cleaned = '+234' + cleaned;
  }
  
  return cleaned;
}

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
