// import { jwtVerify } from "jose";
// import type { NextRequest } from "next/server";
// import { NextResponse } from "next/server";

// const JWT_SECRET = process.env.JWT_SECRET;

// if (!JWT_SECRET) {
//   throw new Error("JWT_SECRET não está definido nas variáveis de ambiente.");
// }

// export const config = {
//   matcher: ["/app/:path*", "/login", "/registro"],
// };

// export async function middleware(request: NextRequest) {
//   const token = request.cookies.get("token-finity")?.value;
//   const { pathname } = request.nextUrl;

//   if (pathname === "/login" || pathname === "/registro") {
//     if (token) {
//       try {
//         await jwtVerify(token, new TextEncoder().encode(JWT_SECRET));
//         return NextResponse.redirect(new URL("/app/dashboard", request.url));
//       } catch (err) {}
//     }
//     return NextResponse.next();
//   }

//   if (pathname.startsWith("/app")) {
//     if (!token) {
//       return NextResponse.redirect(new URL("/login", request.url));
//     }

//     try {
//       await jwtVerify(token, new TextEncoder().encode(JWT_SECRET));
//       return NextResponse.next();
//     } catch (err) {
//       const response = NextResponse.redirect(new URL("/login", request.url));
//       response.cookies.delete("token-finity");
//       response.cookies.delete("refreshToken");
//       return response;
//     }
//   }

//   return NextResponse.next();
// }
