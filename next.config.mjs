/** @type {import('next').NextConfig} */
import withPWAInit from "@ducanh2912/next-pwa";

const withPWA = withPWAInit({
  dest: "public",
  cacheOnFrontEndNav: true,
  aggressiveFrontEndNavCaching: true,
  reloadOnOnline: true,
  swcMinify: true,
  disableSwc: false,
  workboxOptions:{
    disableDevLogs:true
  }
});

export default withPWA({
  // Your Next.js config
});
