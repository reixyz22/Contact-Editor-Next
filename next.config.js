// next.config.js
module.exports = {
  typescript: {
    // Disables type checking
    ignoreBuildErrors: true,
  },
  eslint: {
    // Avoid running ESLint checks
    ignoreDuringBuilds: true,
  }
};
