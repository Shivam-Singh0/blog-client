/** @type {import('next').NextConfig} */
const nextConfig = {
   
    async rewrites() {
        return [
            {
                source: '/api/:path*',
                destination: `${process.env.API_URL || 'https://blog-server-dln6.onrender.com'}/api/:path*`,
            },
        ];
    },
};

export default nextConfig;