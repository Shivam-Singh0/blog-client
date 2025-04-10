import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export  function middleware(req) {
  const token  =  req.cookies.get('token')?.value;
  
  const { pathname } = req.nextUrl;


  const protectedPaths = ['/create-post', '/dashboard', '/profile', '/posts'];
  

  const isProtected = protectedPaths.some(path => 
    pathname === path || pathname.startsWith(`${path}/`)
  );

  if (!isProtected) {
    return NextResponse.next();
  }

  if (!token) {
    return NextResponse.redirect(new URL('/auth/login', req.url));
  }

 
}

export const config = {
 
  matcher: [
    '/create-post',
    '/dashboard/:path*',
    '/profile/:path*',
    '/posts/:path*',
  ]
};