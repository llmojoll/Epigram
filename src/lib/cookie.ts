import Cookies from 'js-cookie';
import { NextApiResponse } from 'next';

//브라우저에서 쿠키 읽기
export function getCookie(name: string) {
  return Cookies.get(name);
}

// 브라우저에서 쿠키 쓰기
export function setCookie(name: string, value: string, days = 7) {
  Cookies.set(name, value, { expires: days, path: '/' });
}

// 브라우저에서 쿠키 삭제
export function removeCookie(name: string) {
  Cookies.remove(name);
}

// 서버에서 응답 헤더로 쿠키 설정
export function setServerCookie(res: NextApiResponse, name: string, value: string, days = 7) {
  const expires = new Date();
  expires.setDate(expires.getDate() + days);
  res.setHeader(
    'Set-Cookie',
    `${name}=${value}; Path=/; Expires=${expires.toUTCString()}; HttpOnly; SameSite=Lax`,
  );
}
