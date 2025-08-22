#!/bin/bash

echo "🚀 Deploying to Existing Convex Project: zvewed"
echo "================================================"

# Set the deployment
export CONVEX_DEPLOYMENT=dev:courteous-koala-82

echo "✅ Using deployment: $CONVEX_DEPLOYMENT"
echo ""

# Check if we can access the deployment
echo "🔍 Checking deployment access..."
if npx convex function-spec > /dev/null 2>&1; then
    echo "✅ Deployment accessible"
else
    echo "❌ Cannot access deployment. You need to authenticate first."
    echo ""
    echo "🔧 To fix this, run:"
    echo "   npx convex dev"
    echo "   # This will open your browser to authenticate"
    echo "   # After authentication, come back and run this script again"
    echo ""
    exit 1
fi

echo ""
echo "🚀 Deploying your Convex functions..."
npx convex deploy

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Deployment successful!"
    echo ""
    echo "🌱 Now let's seed your database with admin users..."
    echo "Running seed function..."
    
    # Seed the admin user
    npx convex run api.seedAdmin.seedAdminUser
    
    echo ""
    echo "🎉 Your Convex backend is now live and seeded!"
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