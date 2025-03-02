import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["vpzroihbszqqnzxdwsql.supabase.co"], // Supabaseのストレージのドメインを許可
  },
};

export default nextConfig;
