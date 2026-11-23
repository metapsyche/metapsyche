# Changelog

All notable changes to the Metapsyche project.

## [Unreleased] - 2024-11-23

### Added
- Updated all dependencies to latest versions
  - AWS Amplify packages to v6.22.2 (aws-amplify) and v6.15.7 (UI)
  - AWS Amplify Backend to v1.11.1
  - React to 18.3.1
  - Vite to 6.0.7
  - TypeScript to 5.7.3
  - ESLint to 9.18.0 with flat config
  - AWS CDK to 2.174.3
- Comprehensive documentation
  - [QUICKSTART.md](QUICKSTART.md) - 5-minute getting started guide
  - [DEVELOPMENT.md](DEVELOPMENT.md) - Complete local development guide
  - [DEPLOYMENT.md](DEPLOYMENT.md) - Detailed AWS deployment instructions
  - [CHANGELOG.md](CHANGELOG.md) - This file
- GitHub Actions CI workflow
  - Automated linting on push/PR
  - TypeScript type checking
  - Build verification
- Configuration files
  - `.npmrc` for npm configuration
  - `.node-version` for Node.js version pinning
  - `eslint.config.js` (ESLint 9 flat config)
  - `amplify-outputs.d.ts` for TypeScript type safety
- Node.js engine requirements in package.json (>=18.0.0)

### Changed
- Migrated from ESLint 8 (.eslintrc.cjs) to ESLint 9 (flat config)
- Updated README.md with better structure and documentation links
- Project name from "amplify-vite-react-template" to "metapsyche"
- Improved TypeScript configuration for better type safety
- Enhanced amplify.yml with caching strategies

### Fixed
- TypeScript compilation errors with amplify_outputs.json import
- ESLint configuration compatibility with modern packages
- Build process to handle missing amplify_outputs.json gracefully

### Removed
- Old .eslintrc.cjs configuration file
- Deprecated ESLint parser packages in favor of typescript-eslint

## Notes

### Breaking Changes
None. This update maintains full backward compatibility with AWS Amplify Gen 2.

### Migration Guide
If you're updating an existing deployment:

1. Pull the latest changes
2. Remove old dependencies: `rm -rf node_modules package-lock.json`
3. Install new dependencies: `npm install`
4. Run type check: `npx tsc --noEmit`
5. Run linter: `npm run lint`
6. Test locally: `npx ampx sandbox` then `npm run dev`
7. Deploy as usual

### Security Updates
- Multiple dependency security updates included
- No known vulnerabilities in direct dependencies
- Some transitive dependencies have warnings (monitored)

### Performance Improvements
- Vite 6 provides faster build times
- Updated AWS SDK reduces bundle size
- Improved caching in CI/CD pipeline

### Maintenance
- Project is now ready for AWS Amplify Gen 2 deployment
- All documentation is current as of November 2024
- Dependencies are on stable, actively-maintained versions
