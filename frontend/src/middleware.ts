
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

//  Define rutas públicas y privadas
const publicRoutes = ['/', '/login', '/register'];
const privateRoutes = ['/dashboard']; // ingresar futuras rutas privadas

export function middleware(request: NextRequest) {
return NextResponse.next();

  //  Obtiene la cookie de autenticación (o como sea que manejes la sesión)
  const authToken = request.cookies.get('auth_token')?.value;

  //  Obtiene la ruta que el usuario intenta visitar
  const { pathname } = request.nextUrl;

 

  // Si el usuario NO está logueado (no hay token) Y 
  // la ruta que visita es privada...
  if (!authToken && privateRoutes.includes(pathname)) {
    // ...redirige a /login
    const url = request.nextUrl.clone(); // Clona la URL para modificarla
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }

  // Si el usuario SÍ está logueado (hay token) Y
  // está intentando ir a login o register...
  if (authToken && (pathname === '/login' || pathname === '/register')) {
     // ...redirige al dashboard (o la página principal de la app)
    const url = request.nextUrl.clone();
    url.pathname = '/dashboard'; 
    return NextResponse.redirect(url);
  }

  // Si no se cumple ninguna condición, déjalo pasar
  return NextResponse.next();




}
// Configuración del Matcher
export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}