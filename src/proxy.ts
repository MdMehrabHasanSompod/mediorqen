import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'


export default async function proxy(request: NextRequest) {
    const pathname = request.nextUrl.pathname
    const publicRoutes:string[] = ["/about","/contact","/doctors","/services"]
    const authenticationRoutes:string[] = ["/register","/login","/api/auth"]
    const userRoutes:string[] = ["/user","/appointments","/tests"]
    const adminRoutes:string[] = ["/admin"]
    const superAdminRoutes:string[] = ["/super-admin"]
    if(pathname === "/" || publicRoutes.some(route=>pathname.startsWith(route))){
      return NextResponse.next()
    }
    if (pathname.startsWith("/api/auth")) {
     return NextResponse.next()
    }
    const token = await getToken({req:request,secret:process.env.AUTH_SECRET})
    if(pathname.startsWith("/api") && !token){
      return NextResponse.json({ error: "Attempted to Unauthorized Access" }, { status: 401 })
    }
    if(!token){
      return NextResponse.redirect(new URL("/login",request.url))
    }
    if(token && authenticationRoutes.some(route=>pathname.startsWith(route)) && token.role === "user"){
      return NextResponse.redirect(new URL("/user/dashboard",request.url))
    }
    if(token && authenticationRoutes.some(route=>pathname.startsWith(route)) && token.role === "admin"){
      return NextResponse.redirect(new URL("/admin/dashboard",request.url))
    }
    if(token && authenticationRoutes.some(route=>pathname.startsWith(route)) && token.role === "super-admin"){
      return NextResponse.redirect(new URL("/super-admin/dashboard",request.url))
    }
    if(token.role==="user" && (adminRoutes.some(route=>pathname.startsWith(route))||superAdminRoutes.some(route=>pathname.startsWith(route)))){
      return NextResponse.redirect(new URL("/user/dashboard",request.url))
    }
     if(token.role==="admin" && (userRoutes.some(route=>pathname.startsWith(route))||superAdminRoutes.some(route=>pathname.startsWith(route)))){
      return NextResponse.redirect(new URL("/admin/dashboard",request.url))
    }
     if(token.role==="super-admin" && (userRoutes.some(route=>pathname.startsWith(route))||adminRoutes.some(route=>pathname.startsWith(route)))){
      return NextResponse.redirect(new URL("/super-admin/dashboard",request.url))
    }
     
    return NextResponse.next()
}
 
 

export const config = {
  matcher: [
    '/api/:path*',
    '/admin',
    '/admin/:path*',
    '/super-admin',
    '/super-admin/:path*',
    '/user',
    '/user/:path*',
    '/appointments/:path*',
    '/tests/:path*',
    '/login',
    '/register'
  ],
}