#!/bin/bash

echo "🔐 CONVEX AUTHENTICATION & DEPLOYMENT"
echo "======================================"
echo ""

# Set environment variables
export CONVEX_DEPLOYMENT=dev:courteous-koala-82
export NEXT_PUBLIC_CONVEX_URL=https://courteous-koala-82.convex.cloud

echo "✅ Environment variables set:"
echo "   CONVEX_DEPLOYMENT: $CONVEX_DEPLOYMENT"
echo "   NEXT_PUBLIC_CONVEX_URL: $NEXT_PUBLIC_CONVEX_URL"
echo ""

echo "🔐 Step 1: Authentication Required"
echo "   You need to authenticate with Convex first."
echo "   Run this command in a new terminal:"
echo ""
echo "   npx convex dev"
echo ""
echo "   This will:"
echo "   1. Open your browser to authenticate"
echo "   2. Set up your local Convex configuration"
echo "   3. After authentication, press Ctrl+C to stop"
echo ""
echo "   Then come back and run this script again."
echo ""

read -p "Press Enter after you've authenticated with 'npx convex dev'..."

echo ""
echo "🔍 Step 2: Testing deployment access..."
if npx convex function-spec > /dev/null 2>&1; then
    echo "✅ Authentication successful! Deployment accessible."
else
    echo "❌ Still cannot access deployment."
    echo "   Please run 'npx convex dev' first to authenticate."
    exit 1
fi

echo ""
echo "🚀 Step 3: Deploying functions..."
npx convex deploy

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Functions deployed successfully!"
    echo ""
    echo "🌱 Step 4: Seeding database..."
    echo "   Running seed function..."
    
    SEED_RESULT=$(npx convex run api.seedAdmin.seedAdminUser 2>/dev/null)
    if [ -n "$SEED_RESULT" ]; then
        echo "✅ Database seeded successfully!"
        echo "   Result: $SEED_RESULT"
    else
        echo "❌ Failed to seed database"
        echo "   This might mean the function doesn't exist or there's an error"
    fi
    
    echo ""
    echo "🎉 DEPLOYMENT COMPLETE!"
    echo ""
    echo "🔍 Test your deployment:"
    echo "   npx convex dashboard"
    echo "   npx convex function-spec"
    echo "   npx convex logs"
    echo ""
    echo "📱 Your login should work now!"
    echo ""
    echo "🧪 Test credentials:"
    echo "   Admin: admin@wed4.com / Admin@2025"
    echo "   User: john.doe@example.com / password123"
    echo "   Vendor: mike@techvendor.com / password123"
    echo "   Sponsor: emily@sponsor.com / password123"
    
else
    echo ""
    echo "❌ Deployment failed. Please check the error messages above."
    echo ""
    echo "🔧 Common issues:"
    echo "   1. Not authenticated - run 'npx convex dev' first"
    echo "   2. Schema errors - check your convex/schema.ts file"
    echo "   3. Function errors - check your convex/*.ts files"
    exit 1
fi