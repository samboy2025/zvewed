#!/bin/bash

echo "🚀 Convex Backend Deployment Script"
echo "=================================="

# Check if CONVEX_DEPLOY_KEY is set
if [ -z "$CONVEX_DEPLOY_KEY" ]; then
    echo "❌ CONVEX_DEPLOY_KEY environment variable is not set"
    echo ""
    echo "Please set your deploy key:"
    echo "export CONVEX_DEPLOY_KEY=your_deploy_key_here"
    echo ""
    echo "You can find your deploy key in the Convex dashboard:"
    echo "https://dashboard.convex.dev"
    exit 1
fi

echo "✅ Deploy key found"
echo ""

# Check if .env.local exists
if [ ! -f ".env.local" ]; then
    echo "⚠️  .env.local file not found"
    echo "Please create it with your Convex URL:"
    echo "NEXT_PUBLIC_CONVEX_URL=https://your-project-name.convex.cloud"
    echo ""
    read -p "Press Enter to continue anyway..."
fi

echo "🔧 Deploying Convex functions..."
npx convex deploy

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Deployment successful!"
    echo ""
    echo "🔍 To verify your deployment:"
    echo "   npx convex dashboard"
    echo "   npx convex function-spec"
    echo "   npx convex logs"
    echo ""
    echo "🌐 Your Convex backend is now live!"
else
    echo ""
    echo "❌ Deployment failed. Please check the error messages above."
    echo ""
    echo "🔧 Troubleshooting tips:"
    echo "   1. Verify your deploy key is correct"
    echo "   2. Check for TypeScript errors in your convex/ directory"
    echo "   3. Ensure your project is active in the Convex dashboard"
    exit 1
fi