// import { jwtDecode } from "jwt-decode";
// import { NextRequest, NextResponse } from "next/server";

// const publicRoutes = [
//   { path: "/login", whenAuthenticated: "redirect" },
//   { path: "/registro", whenAuthenticated: "redirect" },
//   { path: "/", whenAuthenticated: "next" },
// ] as const;

// const REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE = "/login";

// export function middleware(request: NextRequest) {
//   const path = request.nextUrl.pathname;
//   const publicRoute = publicRoutes.find((route) => route.path === path);
//   const tokenCookie = request.cookies.get("token-finity");

//   let isAuthenticated = false;

//   if (tokenCookie) {
//     try {
//       const decodedToken = jwtDecode<{ exp: number }>(tokenCookie.value);
//       if (decodedToken.exp * 1000 > Date.now()) {
//         isAuthenticated = true;
//       }
//     } catch (error) {
//       isAuthenticated = false;
//     }
//   }

//   if (!isAuthenticated && publicRoute) {
//     return NextResponse.next();
//   }

//   if (!isAuthenticated && !publicRoute) {
//     const redirectUrl = request.nextUrl.clone();
//     redirectUrl.pathname = REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE;
//     return NextResponse.redirect(redirectUrl);
//   }

//   if (isAuthenticated && publicRoute?.whenAuthenticated === "redirect") {
//     const redirectUrl = request.nextUrl.clone();
//     redirectUrl.pathname = "/dashboard";
//     return NextResponse.redirect(redirectUrl);
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: [
//     "/",
//     "/login",
//     "/registro",
//     "/categorias",
//     "/transacoes",
//     "/dashboard",
//   ],
// };
