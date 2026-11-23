# Quick Start Guide

Get Metapsyche up and running in 5 minutes.

## 🚀 Deploy to AWS Amplify (Fastest)

1. **Push to GitHub** (or GitLab/Bitbucket):
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-repo-url>
   git push -u origin main
   ```

2. **Deploy via Amplify Console**:
   - Go to [AWS Amplify Console](https://console.aws.amazon.com/amplify/)
   - Click "New app" → "Host web app"
   - Connect your repository
   - Accept default settings (uses `amplify.yml`)
   - Click "Save and deploy"

3. **Wait 5-10 minutes** for deployment to complete

4. **Access your app** at the provided URL

✅ Done! Your app is live with:
- Authentication (Cognito)
- GraphQL API (AppSync)
- Real-time Database (DynamoDB)
- HTTPS and CDN (CloudFront)

## 💻 Local Development

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start Amplify Sandbox**:
   ```bash
   npx ampx sandbox
   ```
   Keep this terminal open.

3. **Start dev server** (in a new terminal):
   ```bash
   npm run dev
   ```

4. **Open** `http://localhost:5173`

## 📝 Make Your First Change

1. Edit `src/App.tsx`
2. Save the file
3. See changes instantly in the browser

## 🔧 Customize the Backend

### Add a field to the Todo model:

Edit `amplify/data/resource.ts`:
```typescript
const schema = a.schema({
  Todo: a.model({
    content: a.string(),
    isDone: a.boolean(),  // 👈 Add this
    priority: a.enum(['low', 'medium', 'high']),  // 👈 Or this
  })
  .authorization((allow) => [allow.publicApiKey()]),
});
```

The sandbox auto-deploys your changes.

### Update the frontend:

Edit `src/App.tsx` to use the new fields:
```typescript
function createTodo() {
  client.models.Todo.create({
    content: window.prompt("Todo content"),
    isDone: false,
    priority: 'medium',
  });
}
```

## 📚 Next Steps

- **Full docs**: See [README.md](README.md)
- **Development guide**: See [DEVELOPMENT.md](DEVELOPMENT.md)
- **Deployment guide**: See [DEPLOYMENT.md](DEPLOYMENT.md)
- **Amplify docs**: https://docs.amplify.aws/react/

## ⚠️ Important Notes

- The sandbox creates **real AWS resources** (minimal cost during development)
- Stop the sandbox (Ctrl+C) when not in use to avoid charges
- Production deployment uses separate, permanent resources
- Never commit `amplify_outputs.json` or secrets

## 🆘 Troubleshooting

**"Cannot find module '../amplify_outputs.json'"**
→ Run `npx ampx sandbox` first

**Build fails in CI/CD**
→ Normal! The build only succeeds after Amplify generates the config

**Authentication not working**
→ Verify sandbox is running and browser console for errors

## 🎯 What to Build Next

- Add user authentication UI with `<Authenticator>` component
- Create more data models (Post, Comment, User profile, etc.)
- Add file storage with Amplify Storage
- Implement search and filtering
- Add real-time notifications
- Create admin dashboard

Happy building! 🎉
