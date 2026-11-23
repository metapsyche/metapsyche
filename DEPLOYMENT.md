# Deployment Guide - AWS Amplify Gen 2

This guide walks you through deploying the Metapsyche application to AWS Amplify Gen 2.

## Prerequisites

Before deploying, ensure you have:

- An AWS account with appropriate permissions
- Git repository hosted on GitHub, GitLab, Bitbucket, or AWS CodeCommit
- Node.js 18+ installed locally (for testing before deployment)

## Deployment Methods

### Method 1: AWS Amplify Console (Recommended for Production)

This is the easiest method and provides automatic CI/CD.

#### Step 1: Push to Git Repository

```bash
# If you haven't already initialized git
git init
git add .
git commit -m "Initial commit"

# Push to your remote repository
git remote add origin <your-repository-url>
git branch -M main
git push -u origin main
```

#### Step 2: Connect to Amplify Console

1. Go to [AWS Amplify Console](https://console.aws.amazon.com/amplify/)
2. Click **"New app"** → **"Host web app"**
3. Select your Git provider (GitHub, GitLab, Bitbucket, or CodeCommit)
4. Authorize AWS Amplify to access your repository
5. Select the repository and branch (e.g., `main`)

#### Step 3: Configure Build Settings

Amplify will automatically detect the `amplify.yml` file. Review the configuration:

```yaml
version: 1
backend:
  phases:
    build:
      commands:
        - npm ci --cache .npm --prefer-offline
        - npx ampx pipeline-deploy --branch $AWS_BRANCH --app-id $AWS_APP_ID
frontend:
  phases:
    build:
      commands:
        - npm run build
  artifacts:
    baseDirectory: dist
    files:
      - '**/*'
  cache:
    paths:
      - .npm/**/*
      - node_modules/**/*
```

#### Step 4: Configure Service Role

Amplify needs permissions to create backend resources:

1. In the build settings, click **"Create new role"** or select an existing role
2. The role needs permissions for:
   - CloudFormation
   - S3
   - Cognito
   - AppSync
   - DynamoDB
   - IAM (for resource creation)

#### Step 5: Review and Deploy

1. Review all settings
2. Click **"Save and deploy"**
3. Wait for the deployment to complete (typically 5-10 minutes)

#### Step 6: Access Your Application

Once deployed, Amplify provides:
- **Frontend URL**: `https://<branch>.<app-id>.amplifyapp.com`
- **Backend Resources**: Visible in the Amplify Console under "Backend environments"

### Method 2: Deploy Backend Separately (Advanced)

For more control over backend deployment:

#### Step 1: Deploy Backend

```bash
# Install dependencies
npm install

# Deploy the backend to AWS
npx ampx pipeline-deploy --branch main --app-id <your-app-id>
```

This creates:
- Cognito User Pool for authentication
- AppSync GraphQL API
- DynamoDB table for data storage
- API Keys and configuration

#### Step 2: Build Frontend

```bash
# Build the production bundle
npm run build
```

The built files will be in the `dist` directory.

#### Step 3: Deploy Frontend

You can deploy the `dist` folder to:
- **AWS Amplify Hosting**: Manual upload via console
- **S3 + CloudFront**: For custom CDN configuration
- **Any static hosting service**: Netlify, Vercel, etc.

## Environment-Specific Deployments

### Multiple Environments (Dev, Staging, Production)

Create different branches for each environment:

```bash
# Development
git checkout -b develop
git push origin develop

# Staging
git checkout -b staging
git push origin staging

# Production (main branch)
git checkout main
```

In Amplify Console:
1. Connect each branch separately
2. Each branch gets its own backend resources
3. Environment-specific URLs are generated automatically

### Environment Variables

Add environment variables in Amplify Console:

1. Go to **App settings** → **Environment variables**
2. Add variables as needed:
   - `VITE_API_REGION`: AWS region
   - `VITE_CUSTOM_CONFIG`: Any custom configuration

Access them in your code:
```typescript
const apiRegion = import.meta.env.VITE_API_REGION;
```

## Custom Domain Setup

### Step 1: Add Custom Domain

1. In Amplify Console, go to **App settings** → **Domain management**
2. Click **"Add domain"**
3. Enter your domain name (e.g., `metapsyche.com`)

### Step 2: Configure DNS

Amplify provides DNS records to add to your domain provider:
- For Route 53: Automatic configuration
- For other providers: Manually add the provided CNAME/ALIAS records

### Step 3: Enable HTTPS

Amplify automatically:
- Provisions an SSL/TLS certificate via AWS Certificate Manager
- Enables HTTPS for your custom domain
- Redirects HTTP to HTTPS

## Post-Deployment

### Verify Deployment

1. **Frontend**: Visit your Amplify URL and verify the app loads
2. **Authentication**: Test user sign-up and login
3. **API**: Create a Todo item and verify it appears in the list
4. **Real-time**: Open the app in two browser tabs and verify real-time updates

### Monitor Your Application

Amplify Console provides:
- **Build history**: View past deployments
- **Logs**: Frontend and backend build logs
- **Metrics**: Traffic, errors, and performance data
- **Alarms**: Set up CloudWatch alarms for critical issues

### Continuous Deployment

After initial setup, every push to the connected branch triggers:
1. Backend deployment (if backend files changed)
2. Frontend build
3. Automatic deployment
4. Health checks

## Troubleshooting

### Build Failures

**Backend deployment fails:**
- Check AWS credentials and permissions
- Verify CDK version compatibility
- Review CloudFormation logs in AWS Console

**Frontend build fails:**
- Check Node.js version (must be 18+)
- Run `npm ci` and `npm run build` locally to test
- Review build logs for missing dependencies

### Runtime Issues

**Authentication not working:**
- Verify Cognito User Pool is created
- Check `amplify_outputs.json` is generated
- Ensure frontend is using the correct configuration

**API calls failing:**
- Verify AppSync API is deployed
- Check API Key hasn't expired (default: 30 days)
- Review AppSync logs in CloudWatch

## Rollback

If deployment fails or introduces issues:

1. In Amplify Console, go to **Build history**
2. Find the last working deployment
3. Click **"Redeploy this version"**

## Cleanup

To remove all resources:

1. Delete the Amplify app from the console
2. This removes:
   - Frontend hosting
   - Backend resources (Cognito, AppSync, DynamoDB)
   - CloudFormation stacks

**Warning**: This action cannot be undone. User data will be lost.

## Additional Resources

- [AWS Amplify Gen 2 Documentation](https://docs.amplify.aws/react/)
- [AWS Amplify Console Guide](https://docs.aws.amazon.com/amplify/latest/userguide/)
- [Troubleshooting Guide](https://docs.amplify.aws/react/deploy-and-host/troubleshooting/)

## Support

For issues specific to this project, open an issue in the repository.
For AWS Amplify issues, refer to [AWS Support](https://aws.amazon.com/support/) or the [Amplify Discord community](https://discord.gg/amplify).
