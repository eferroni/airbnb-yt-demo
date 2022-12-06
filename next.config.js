/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    domains: ["links.papareact.com"],
  },
  env: {
    mapbox_token: process.env.REACT_APP_MAPBOX_ACCESS_TOKEN,
  },
};
