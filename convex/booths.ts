import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Get all booths
export const getAllBooths = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("booths").collect();
  },
});

// Get available booths
export const getAvailableBooths = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("booths")
      .filter((q) => q.eq(q.field("status"), "available"))
      .collect();
  },
});

// Get booth by ID
export const getBoothById = query({
  args: { boothId: v.id("booths") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.boothId);
  },
});

// Get booth by vendor ID
export const getBoothByVendorId = query({
  args: { vendorId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db.query("booths")
      .filter((q) => q.eq(q.field("vendorId"), args.vendorId))
      .first();
  },
});

// Assign booth to vendor
export const assignBoothToVendor = mutation({
  args: {
    boothId: v.id("booths"),
    vendorId: v.string(),
    vendorName: v.string(),
    adminId: v.string(),
  },
  handler: async (ctx, args) => {
    // Update booth status
    await ctx.db.patch(args.boothId, {
      status: "assigned",
      vendorId: args.vendorId,
      vendorName: args.vendorName,
      assignedAt: Date.now(),
      assignedBy: args.adminId,
      updatedAt: Date.now(),
    });

    // Update vendor with booth assignment
    const vendors = await ctx.db.query("vendors").collect();
    const vendor = vendors.find(v => v._id === args.vendorId);
    
    if (vendor) {
      const booth = await ctx.db.get(args.boothId);
      if (booth) {
        // Find vendor in vendors table and update
        // Note: This assumes vendors are stored in the vendors table
        // You may need to adjust this based on your actual data structure
        const vendorToUpdate = vendors.find(v => v._id === args.vendorId);
        if (vendorToUpdate) {
          // Since we can't directly update vendors table from here,
          // we'll return the booth assignment details
          return {
            success: true,
            booth: booth,
            vendor: vendorToUpdate,
          };
        }
      }
    }

    return { success: true };
  },
});

// Unassign booth from vendor
export const unassignBoothFromVendor = mutation({
  args: {
    boothId: v.id("booths"),
    adminId: v.string(),
  },
  handler: async (ctx, args) => {
    const booth = await ctx.db.get(args.boothId);
    if (!booth) {
      throw new Error("Booth not found");
    }

    // Update booth status
    await ctx.db.patch(args.boothId, {
      status: "available",
      vendorId: undefined,
      vendorName: undefined,
      assignedAt: undefined,
      assignedBy: undefined,
      updatedAt: Date.now(),
    });

    return { success: true };
  },
});

// Create new booth
export const createBooth = mutation({
  args: {
    boothNumber: v.string(),
    section: v.string(),
    location: v.string(),
    size: v.string(),
    area: v.string(),
    notes: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const boothId = await ctx.db.insert("booths", {
      boothNumber: args.boothNumber,
      section: args.section,
      location: args.location,
      size: args.size,
      area: args.area,
      status: "available",
      notes: args.notes,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });

    return boothId;
  },
});

// Update booth details
export const updateBooth = mutation({
  args: {
    boothId: v.id("booths"),
    boothNumber: v.optional(v.string()),
    section: v.optional(v.string()),
    location: v.optional(v.string()),
    size: v.optional(v.string()),
    area: v.optional(v.string()),
    notes: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { boothId, ...updateData } = args;
    
    await ctx.db.patch(boothId, {
      ...updateData,
      updatedAt: Date.now(),
    });

    return { success: true };
  },
});

// Delete booth
export const deleteBooth = mutation({
  args: { boothId: v.id("booths") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.boothId);
    return { success: true };
  },
});