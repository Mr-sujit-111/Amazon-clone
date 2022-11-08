/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["www.google.com", "fakestoreapi.com", "links.papareact.com"]
  },
  env: {
    stripe_public_key: process.env.Stripe_PUBLIC
  },
  webpack: (config) => {
    config.experiments = config.experiments || {}
    config.experiments.topLevelAwait = true
    return config
  },

}

module.exports = nextConfig
