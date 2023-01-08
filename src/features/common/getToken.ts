export default function getToken(): string | null {
  // eslint-disable-next-line prefer-const
  let token = localStorage.getItem("token");

  if (token) {
    // 토크 유효성 검사
  }

  return token;
}
