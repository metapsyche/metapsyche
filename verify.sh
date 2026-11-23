#!/bin/bash
# Verification script for Metapsyche AWS Amplify Gen 2 setup

echo "🔍 Verifying Metapsyche setup..."
echo ""

# Check Node version
echo "📦 Node.js version:"
node --version
echo ""

# Check npm version
echo "📦 npm version:"
npm --version
echo ""

# Check TypeScript
echo "🔧 Running TypeScript type check..."
npx tsc --noEmit
if [ $? -eq 0 ]; then
    echo "✅ TypeScript: OK"
else
    echo "❌ TypeScript: FAILED"
    exit 1
fi
echo ""

# Check ESLint
echo "🔧 Running ESLint..."
npm run lint
if [ $? -eq 0 ]; then
    echo "✅ ESLint: OK"
else
    echo "❌ ESLint: FAILED"
    exit 1
fi
echo ""

# Check if critical files exist
echo "📄 Checking critical files..."
files=(
    "amplify.yml"
    "amplify/backend.ts"
    "amplify/auth/resource.ts"
    "amplify/data/resource.ts"
    "src/App.tsx"
    "src/main.tsx"
    "package.json"
    "tsconfig.json"
    "vite.config.ts"
    "eslint.config.js"
    "amplify-outputs.d.ts"
)

all_exist=true
for file in "${files[@]}"; do
    if [ -f "$file" ]; then
        echo "✅ $file"
    else
        echo "❌ $file (missing)"
        all_exist=false
    fi
done
echo ""

if [ "$all_exist" = false ]; then
    echo "❌ Some files are missing!"
    exit 1
fi

# Check documentation
echo "📚 Checking documentation..."
docs=(
    "README.md"
    "QUICKSTART.md"
    "DEVELOPMENT.md"
    "DEPLOYMENT.md"
    "CHANGELOG.md"
    "UPGRADE_SUMMARY.md"
)

for doc in "${docs[@]}"; do
    if [ -f "$doc" ]; then
        echo "✅ $doc"
    else
        echo "❌ $doc (missing)"
    fi
done
echo ""

echo "✅ All verifications passed!"
echo ""
echo "🚀 Your project is ready for AWS Amplify Gen 2 deployment!"
echo ""
echo "Next steps:"
echo "1. Run 'npx ampx sandbox' to test locally"
echo "2. Push to Git and connect to Amplify Console"
echo "3. See QUICKSTART.md for details"
