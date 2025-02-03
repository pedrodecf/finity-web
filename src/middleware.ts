import { jwtDecode } from "jwt-decode";
import { NextRequest, NextResponse } from "next/server";

const publicRoutes = [
  { path: "/login", whenAuthenticated: "redirect" },
  { path: "/registro", whenAuthenticated: "redirect" },
  { path: "/", whenAuthenticated: "next" },
] as const;

const REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE = "/login";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const publicRoute = publicRoutes.find((route) => route.path === path);
  const authToken = request.cookies.get("token-finity");

  if (!authToken && publicRoute) {
    console.log(1);
    return NextResponse.next();
  }

  if (!authToken && !publicRoute) {
    console.log(2);
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE;
    return NextResponse.redirect(redirectUrl);
  }

  if (authToken && publicRoute?.whenAuthenticated === "redirect") {
    console.log(3);
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = "/dashboard";
    return NextResponse.redirect(redirectUrl);
  }

  if (authToken && !publicRoute) {
    console.log(4);
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = "/login";

    const decodedToken = jwtDecode(authToken.value);

    if (decodedToken.exp! < Date.now() / 1000) {
      return NextResponse.redirect(redirectUrl);
    }

    return NextResponse.next();
  }

  console.log(5);
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/login",
    "/registro",
    "/categorias",
    "/transacoes",
    "/dashboard",
  ],
};
