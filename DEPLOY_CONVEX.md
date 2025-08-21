# Deploying Your Convex Backend to the Cloud

## Prerequisites
- Node.js and npm installed
- Convex CLI installed (`npm install -g convex` or `npx convex`)
- A Convex account (sign up at https://dashboard.convex.dev)

## Step 1: Login to Convex
```bash
# Open your browser and go to:
# https://dashboard.convex.dev
# Sign up or log in to your account
```

## Step 2: Create a New Project
1. Go to https://dashboard.convex.dev
2. Click "New Project"
3. Choose a project name (e.g., "my-v0-project")
4. Select your preferred region
5. Click "Create Project"

## Step 3: Get Your Deployment URL
After creating the project, you'll get:
- A deployment URL (e.g., `https://your-project-name.convex.cloud`)
- A deploy key (you'll need this)

## Step 4: Configure Your Local Project
Create a `.env.local` file in your project root:

```bash
# Create the environment file
touch .env.local
```

Add your Convex URL to `.env.local`:
```env
NEXT_PUBLIC_CONVEX_URL=https://your-project-name.convex.cloud
```

## Step 5: Deploy Your Functions
```bash
# Set your deploy key (replace YOUR_DEPLOY_KEY with the actual key)
export CONVEX_DEPLOY_KEY=YOUR_DEPLOY_KEY

# Deploy your functions
npx convex deploy
```

## Step 6: Verify Deployment
```bash
# Check your deployment status
npx convex dashboard

# View your functions
npx convex function-spec

# Check logs
npx convex logs
```

## Step 7: Test Your Backend
Your Convex backend should now be accessible at your deployment URL.

## Troubleshooting

### If you get authentication errors:
1. Make sure you're logged in to the Convex dashboard
2. Verify your deploy key is correct
3. Check that your project is active

### If functions don't deploy:
1. Check for TypeScript errors in your convex/ directory
2. Ensure all imports are correct
3. Verify your schema.ts file is valid

### If you can't connect from your frontend:
1. Verify NEXT_PUBLIC_CONVEX_URL is set correctly
2. Check that your deployment is running
3. Ensure your ConvexClientProvider is using the correct URL

## Next Steps
After successful deployment:
1. Update your frontend to use the production Convex URL
2. Test all your functions
3. Set up any additional environment variables needed
4. Consider setting up a production database if needed

## Support
- Convex Documentation: https://docs.convex.dev
- Convex Dashboard: https://dashboard.convex.dev
- Convex Discord: https://discord.gg/convex