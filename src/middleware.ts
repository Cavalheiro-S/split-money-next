import { NextURL } from "next/dist/server/web/next-url";
import { NextRequest, NextResponse } from "next/server";
import dayjs from "dayjs";


export function middleware(req: NextRequest) {

    const tokenValue = req.cookies.get("split.money.token")?.value
    const tokenExpiresAtValue = req.cookies.get("split.money.expiresAt")?.value
    if (!tokenValue || !tokenExpiresAtValue) {
        return NextResponse.redirect(new NextURL("/session/login", req.nextUrl))
    }    

    if (tokenValue && dayjs(dayjs().unix()).isBefore(dayjs(tokenExpiresAtValue).unix())) {
        return NextResponse.next()
    }
    return NextResponse.redirect(new NextURL("/session/login", req.nextUrl))
}

export const config = {
    matcher: ["/dashboard", "/transaction"],
}