import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Create a new vendor registration
export const createVendorRegistration = mutation({
  args: {
    companyName: v.string(),
    contactPerson: v.string(),
    email: v.string(),
    phone: v.string(),
    website: v.optional(v.string()),
    address: v.string(),
    city: v.string(),
    state: v.string(),
    businessType: v.string(),
    industry: v.string(),
    yearsInBusiness: v.string(),
    productServices: v.string(),
    targetAudience: v.optional(v.string()),
    boothSize: v.string(),
    specialRequirements: v.optional(v.string()),
    marketingMaterials: v.optional(v.string()),
    previousExperience: v.optional(v.string()),
    objectives: v.optional(v.string()),
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
      // Create user account for vendor
      const userId = await ctx.db.insert("users", {
        firstName: args.contactPerson.split(' ')[0] || args.contactPerson,
        lastName: args.contactPerson.split(' ').slice(1).join(' ') || '',
        email: args.email,
        password: args.phone, // Using phone as default password
        phone: args.phone,
        organization: args.companyName,
        position: "Vendor",
        city: args.city,
        state: args.state,
        industry: args.industry,
        website: args.website,
        userType: "vendor", // Set userType as vendor
        agreeToTerms: args.agreeToTerms,
        agreeToMarketing: args.agreeToMarketing,
        createdAt: Date.now(),
        status: "active",
        eventId: "wed-4.0",
      });
    }
    
    // Create vendor registration
    const vendorId = await ctx.db.insert("vendors", {
      ...args,
      createdAt: Date.now(),
      status: "pending", // pending, approved, rejected
      paymentStatus: "unpaid", // unpaid, pending, paid
      eventId: "wed-4.0",
    });
    
    return vendorId;
  },
});

// Get all vendor registrations
export const getAllVendors = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("vendors").order("desc").collect();
  },
});

// Get vendor by email
export const getVendorByEmail = query({
  args: { email: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("vendors")
      .filter((q) => q.eq(q.field("email"), args.email))
      .first();
  },
});

// Get vendor by user ID
export const getVendorByUserId = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    // First get the user
    const user = await ctx.db.get(args.userId);
    if (!user || user.userType !== "vendor") return null;
    
    // Try to find a vendor record with this email
    const vendor = await ctx.db
      .query("vendors")
      .filter((q) => q.eq(q.field("email"), user.email))
      .first();
      
    // If no vendor record exists, create a virtual vendor object from user data
    if (!vendor) {
      return {
        _id: user._id,
        companyName: user.organization || `${user.firstName} ${user.lastName}`,
        contactPerson: `${user.firstName} ${user.lastName}`,
        email: user.email,
        phone: user.phone || "",
        website: user.website || "",
        address: "",
        city: user.city || "",
        state: user.state || "",
        businessType: "startup",
        industry: user.industry || "other",
        yearsInBusiness: "1-3",
        productServices: "",
        boothSize: "medium",
        status: "pending",
        paymentStatus: "unpaid",
        createdAt: user.createdAt,
        eventId: "wed-4.0",
        isFromUserTable: true // Flag to indicate this is from users table
      };
    }
    
    return vendor;
  },
});

// Update vendor status
export const updateVendorStatus = mutation({
  args: {
    vendorId: v.id("vendors"),
    status: v.string(),
    paymentStatus: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { vendorId, status, paymentStatus } = args;
    
    const updateData: any = { status };
    if (paymentStatus) {
      updateData.paymentStatus = paymentStatus;
    }
    
    await ctx.db.patch(vendorId, updateData);
  },
});

// Update vendor booth assignment
export const updateVendorBoothAssignment = mutation({
  args: {
    vendorId: v.id("vendors"),
    boothNumber: v.string(),
    boothSection: v.string(),
    boothLocation: v.string(),
    boothNotes: v.optional(v.string()),
    adminId: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.vendorId, {
      boothAssigned: true,
      boothNumber: args.boothNumber,
      boothSection: args.boothSection,
      boothLocation: args.boothLocation,
      boothAssignedAt: Date.now(),
      boothAssignedBy: args.adminId,
      boothNotes: args.boothNotes,
    });
  },
});

// Remove vendor booth assignment
export const removeVendorBoothAssignment = mutation({
  args: {
    vendorId: v.id("vendors"),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.vendorId, {
      boothAssigned: false,
      boothNumber: undefined,
      boothSection: undefined,
      boothLocation: undefined,
      boothAssignedAt: undefined,
      boothAssignedBy: undefined,
      boothNotes: undefined,
    });
  },
});

// Get vendor statistics
export const getVendorStats = query({
  args: {},
  handler: async (ctx) => {
    const allVendors = await ctx.db.query("vendors").collect();
    
    const stats = {
      total: allVendors.length,
      approved: allVendors.filter(v => v.status === "approved").length,
      pending: allVendors.filter(v => v.status === "pending").length,
      rejected: allVendors.filter(v => v.status === "rejected").length,
      paid: allVendors.filter(v => v.paymentStatus === "paid").length,
      unpaid: allVendors.filter(v => v.paymentStatus === "unpaid").length,
      startup: allVendors.filter(v => v.businessType === "startup").length,
      sme: allVendors.filter(v => v.businessType === "sme").length,
      corporation: allVendors.filter(v => v.businessType === "corporation").length,
      nonprofit: allVendors.filter(v => v.businessType === "nonprofit").length,
    };
    
    return stats;
  },
});

// Get vendor by phone (for login context)
export const getVendorByPhone = query({
  args: { phone: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("vendors")
      .filter((q) => q.eq(q.field("phone"), args.phone))
      .first();
  },
});

// Update vendor profile
export const updateVendorProfile = mutation({
  args: {
    vendorId: v.union(v.id("vendors"), v.id("users")),
    companyName: v.optional(v.string()),
    contactPerson: v.optional(v.string()),
    phone: v.optional(v.string()),
    website: v.optional(v.string()),
    address: v.optional(v.string()),
    city: v.optional(v.string()),
    state: v.optional(v.string()),
    businessType: v.optional(v.string()),
    industry: v.optional(v.string()),
    yearsInBusiness: v.optional(v.string()),
    productServices: v.optional(v.string()),
    targetAudience: v.optional(v.string()),
    boothSize: v.optional(v.string()),
    specialRequirements: v.optional(v.string()),
    objectives: v.optional(v.string()),
    previousExperience: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { vendorId, ...updateData } = args;
    
    // Try to update vendors table first, then users table if needed
    try {
      const vendor = await ctx.db.get(vendorId as any);
      if (vendor) {
        await ctx.db.patch(vendorId as any, updateData);
        return;
      }
    } catch (error) {
      // If it fails, it might be a user ID, try users table
      try {
        const user = await ctx.db.get(vendorId as any);
        if (user) {
          // Map vendor fields to user fields where applicable
          const userUpdateData: any = {};
          if (updateData.contactPerson) {
            const names = updateData.contactPerson.split(' ');
            userUpdateData.firstName = names[0] || '';
            userUpdateData.lastName = names.slice(1).join(' ') || '';
          }
          if (updateData.phone) userUpdateData.phone = updateData.phone;
          if (updateData.website) userUpdateData.website = updateData.website;
          if (updateData.city) userUpdateData.city = updateData.city;
          if (updateData.state) userUpdateData.state = updateData.state;
          if (updateData.industry) userUpdateData.industry = updateData.industry;
          if (updateData.companyName) userUpdateData.organization = updateData.companyName;
          
          await ctx.db.patch(vendorId as any, userUpdateData);
          return;
        }
      } catch (userError) {
        throw new Error("Invalid vendor or user ID");
      }
    }
    
    throw new Error("Vendor or user not found");
  },
});

// Upload payment receipt
export const uploadPaymentReceipt = mutation({
  args: {
    vendorId: v.union(v.id("vendors"), v.id("users")),
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
    const { vendorId, receiptUrl, paymentDetails } = args;
    
    // Try to update vendors table first, then users table if needed
    try {
      const vendor = await ctx.db.get(vendorId as any);
      if (vendor) {
        await ctx.db.patch(vendorId as any, {
          paymentReceipt: receiptUrl,
          paymentDetails: paymentDetails,
          paymentStatus: "pending",
          paymentSubmittedAt: Date.now(),
        });
        return;
      }
    } catch (error) {
      // If it fails, it might be a user ID, try users table
      try {
        const user = await ctx.db.get(vendorId as any);
        if (user) {
          await ctx.db.patch(vendorId as any, {
            paymentReceipt: receiptUrl,
            paymentDetails: paymentDetails,
            paymentStatus: "pending",
            paymentSubmittedAt: Date.now(),
          });
          return;
        }
      } catch (userError) {
        throw new Error("Invalid vendor or user ID");
      }
    }
    
    throw new Error("Vendor or user not found");
  },
});

// Submit payment proof via WhatsApp (no receipt upload required)
export const submitPaymentProofViaWhatsApp = mutation({
  args: {
    vendorId: v.union(v.id("vendors"), v.id("users")),
    paymentDetails: v.object({
      amount: v.number(),
      paymentMethod: v.string(),
      referenceNumber: v.string(),
      paymentDate: v.string(),
      bankName: v.optional(v.string()),
    }),
    notes: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { vendorId, paymentDetails, notes } = args;
    
    // Try to update vendors table first, then users table if needed
    try {
      const vendor = await ctx.db.get(vendorId as any);
      if (vendor) {
        await ctx.db.patch(vendorId as any, {
          paymentDetails: paymentDetails,
          paymentStatus: "pending",
          paymentSubmittedAt: Date.now(),
          paymentNotes: notes || "Payment proof submitted via WhatsApp",
        });
        return;
      }
    } catch (error) {
      // If it fails, it might be a user ID, try users table
      try {
        const user = await ctx.db.get(vendorId as any);
        if (user) {
          await ctx.db.patch(vendorId as any, {
            paymentDetails: paymentDetails,
            paymentStatus: "pending",
            paymentSubmittedAt: Date.now(),
            paymentNotes: notes || "Payment proof submitted via WhatsApp",
          });
          return;
        }
      } catch (userError) {
        throw new Error("Invalid vendor or user ID");
      }
    }
    
    throw new Error("Vendor or user not found");
  },
});

// Update vendor profile image
export const updateProfileImage = mutation({
  args: {
    vendorId: v.union(v.id("vendors"), v.id("users")),
    imageUrl: v.string(),
  },
  handler: async (ctx, args) => {
    // Check if the ID is from the users table by examining the ID format
    // Convex IDs contain the table name information
    try {
      // Try to get from vendors table first
      const vendor = await ctx.db.get(args.vendorId as any);
      if (vendor) {
        await ctx.db.patch(args.vendorId as any, {
          imageUrl: args.imageUrl,
        });
        return;
      }
    } catch (error) {
      // If it fails, it might be a user ID, try users table
      try {
        const user = await ctx.db.get(args.vendorId as any);
        if (user) {
          await ctx.db.patch(args.vendorId as any, {
            imageUrl: args.imageUrl,
          });
          return;
        }
      } catch (userError) {
        throw new Error("Invalid vendor or user ID");
      }
    }
    
    throw new Error("Vendor or user not found");
  },
});

// Delete vendor
export const deleteVendor = mutation({
  args: { vendorId: v.id("vendors") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.vendorId);
  },
});

// Verify vendor payment and update status
export const verifyVendorPayment = mutation({
  args: {
    vendorId: v.id("vendors"),
    adminId: v.id("users"),
    amount: v.number(),
    paymentMethod: v.optional(v.string()),
    notes: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    // Verify the admin exists and is an admin
    const admin = await ctx.db.get(args.adminId);
    if (!admin || admin.userType !== "admin") {
      throw new Error("Unauthorized: User is not an admin");
    }

    // Get the vendor to verify
    const vendor = await ctx.db.get(args.vendorId);
    if (!vendor) {
      throw new Error("Vendor not found");
    }

    // Create a payment record for verification
    const paymentId = await ctx.db.insert("payments", {
      userId: vendor.email, // Using email as userId for vendors
      userType: "vendor",
      userName: vendor.contactPerson,
      userEmail: vendor.email,
      amount: args.amount,
      type: "vendor_booth",
      reference: `VENDOR-${Date.now()}`,
      status: "approved",
      paymentMethod: args.paymentMethod || "manual_verification",
      approvedAt: Date.now(),
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });

    // Update vendor payment status
    await ctx.db.patch(args.vendorId, {
      paymentStatus: "paid",
      paymentAmount: args.amount,
      paymentSubmittedAt: Date.now(),
      paymentApprovedAt: Date.now(),
      updatedAt: Date.now(),
    });

    // Log the admin action
    await ctx.db.insert("admin_actions", {
      adminId: args.adminId,
      action: "vendor_payment_verification",
      targetType: "vendor",
      targetId: args.vendorId,
      details: `Verified payment of ₦${args.amount} for vendor ${vendor.companyName} (${vendor.contactPerson}). ${args.notes || ""}`,
      timestamp: Date.now(),
    });

    return { success: true, paymentId };
  },
});
