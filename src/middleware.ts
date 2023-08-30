import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {

    console.log("middleware auth");
    
    const path = req.nextUrl.pathname;

    const isPublicPath = path === "/session/login" || path === "/session/signup";

    const token = req.cookies.get("token")?.value || '';

    if(isPublicPath && token)
        return NextResponse.redirect(new URL("/", req.nextUrl));
    
    if(!isPublicPath && !token)
        return NextResponse.redirect(new URL("/session/login", req.nextUrl));

}

export const config = {
    matcher:[
        "/session/login",
        "/session/signup",
    ]
}