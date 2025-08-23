import { mutation } from "./_generated/server";

// Seed initial booth data
export const seedBooths = mutation({
  args: {},
  handler: async (ctx) => {
    const booths = [
      // Technology Zone
      {
        boothNumber: "T-001",
        section: "Technology Zone",
        location: "Ground Floor, Technology Zone, Near Main Entrance",
        size: "3m x 3m",
        area: "9 sqm",
        status: "available",
        notes: "Premium location near main entrance",
        createdAt: Date.now(),
        updatedAt: Date.now(),
      },
      {
        boothNumber: "T-002",
        section: "Technology Zone",
        location: "Ground Floor, Technology Zone, Center Area",
        size: "3m x 4m",
        area: "12 sqm",
        status: "available",
        notes: "Large booth in center of technology zone",
        createdAt: Date.now(),
        updatedAt: Date.now(),
      },
      {
        boothNumber: "T-003",
        section: "Technology Zone",
        location: "Ground Floor, Technology Zone, Window Side",
        size: "3m x 2m",
        area: "6 sqm",
        status: "available",
        notes: "Natural lighting from windows",
        createdAt: Date.now(),
        updatedAt: Date.now(),
      },
      
      // Manufacturing Hall
      {
        boothNumber: "M-001",
        section: "Manufacturing Hall",
        location: "Ground Floor, Manufacturing Hall, Near Loading Dock",
        size: "3m x 4m",
        area: "12 sqm",
        status: "available",
        notes: "Easy access for heavy equipment",
        createdAt: Date.now(),
        updatedAt: Date.now(),
      },
      {
        boothNumber: "M-002",
        section: "Manufacturing Hall",
        location: "Ground Floor, Manufacturing Hall, Center Area",
        size: "3m x 3m",
        area: "9 sqm",
        status: "available",
        notes: "Central location in manufacturing hall",
        createdAt: Date.now(),
        updatedAt: Date.now(),
      },
      {
        boothNumber: "M-003",
        section: "Manufacturing Hall",
        location: "Ground Floor, Manufacturing Hall, Near Power Station",
        size: "3m x 3m",
        area: "9 sqm",
        status: "available",
        notes: "Multiple power outlets available",
        createdAt: Date.now(),
        updatedAt: Date.now(),
      },
      
      // Services Pavilion
      {
        boothNumber: "S-001",
        section: "Services Pavilion",
        location: "Ground Floor, Services Pavilion, Near Reception",
        size: "3m x 3m",
        area: "9 sqm",
        status: "available",
        notes: "High visibility near reception area",
        createdAt: Date.now(),
        updatedAt: Date.now(),
      },
      {
        boothNumber: "S-002",
        section: "Services Pavilion",
        location: "Ground Floor, Services Pavilion, Center Area",
        size: "3m x 2m",
        area: "6 sqm",
        status: "available",
        notes: "Standard booth in services area",
        createdAt: Date.now(),
        updatedAt: Date.now(),
      },
      
      // Main Exhibition Hall
      {
        boothNumber: "ME-001",
        section: "Main Exhibition Hall",
        location: "Ground Floor, Main Exhibition Hall, Center Stage",
        size: "3m x 4m",
        area: "12 sqm",
        status: "available",
        notes: "Premium location near center stage",
        createdAt: Date.now(),
        updatedAt: Date.now(),
      },
      {
        boothNumber: "ME-002",
        section: "Main Exhibition Hall",
        location: "Ground Floor, Main Exhibition Hall, Near Food Court",
        size: "3m x 3m",
        area: "9 sqm",
        status: "available",
        notes: "High foot traffic near food court",
        createdAt: Date.now(),
        updatedAt: Date.now(),
      },
      {
        boothNumber: "ME-003",
        section: "Main Exhibition Hall",
        location: "Ground Floor, Main Exhibition Hall, Window Side",
        size: "3m x 3m",
        area: "9 sqm",
        status: "available",
        notes: "Natural lighting and outdoor visibility",
        createdAt: Date.now(),
        updatedAt: Date.now(),
      },
      
      // Innovation Corner
      {
        boothNumber: "IC-001",
        section: "Innovation Corner",
        location: "Ground Floor, Innovation Corner, Near Demo Area",
        size: "3m x 4m",
        area: "12 sqm",
        status: "available",
        notes: "Perfect for product demonstrations",
        createdAt: Date.now(),
        updatedAt: Date.now(),
      },
      {
        boothNumber: "IC-002",
        section: "Innovation Corner",
        location: "Ground Floor, Innovation Corner, Center Area",
        size: "3m x 3m",
        area: "9 sqm",
        status: "available",
        notes: "Innovation-focused area",
        createdAt: Date.now(),
        updatedAt: Date.now(),
      },
      
      // Startup Alley
      {
        boothNumber: "SA-001",
        section: "Startup Alley",
        location: "Ground Floor, Startup Alley, Near Networking Zone",
        size: "3m x 2m",
        area: "6 sqm",
        status: "available",
        notes: "Affordable booth for startups",
        createdAt: Date.now(),
        updatedAt: Date.now(),
      },
      {
        boothNumber: "SA-002",
        section: "Startup Alley",
        location: "Ground Floor, Startup Alley, Center Area",
        size: "3m x 2m",
        area: "6 sqm",
        status: "available",
        notes: "Startup-friendly pricing",
        createdAt: Date.now(),
        updatedAt: Date.now(),
      },
      {
        boothNumber: "SA-003",
        section: "Startup Alley",
        location: "Ground Floor, Startup Alley, Near Mentorship Area",
        size: "3m x 2m",
        area: "6 sqm",
        status: "available",
        notes: "Close to mentorship and support services",
        createdAt: Date.now(),
        updatedAt: Date.now(),
      },
    ];

    const boothIds = [];
    for (const booth of booths) {
      const boothId = await ctx.db.insert("booths", booth);
      boothIds.push(boothId);
    }

    return {
      success: true,
      message: `Created ${boothIds.length} booths`,
      boothIds,
    };
  },
});