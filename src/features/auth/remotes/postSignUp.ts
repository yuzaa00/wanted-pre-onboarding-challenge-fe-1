import { config } from "../../common/config";

// todo: fetch 공통 모듈로 분리
async function postSignUp(email: string, password: string) {
  return await fetch(new URL("/users/create", config.BASE_URL), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
}

export default postSignUp;
