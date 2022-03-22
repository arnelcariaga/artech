/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    db_url:
      "mongodb+srv://artechu:VFawnshCXmEG3GTh@cluster0.ffqqf.mongodb.net/artech_db?retryWrites=true&w=majority",
  },
};

module.exports = nextConfig;
