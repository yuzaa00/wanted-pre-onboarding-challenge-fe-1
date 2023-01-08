import { config } from "../../common/config";

// todo: fetch 공통 모듈로 분리
async function postLogin(email: string, password: string) {
  return fetch(new URL("/users/login", config.BASE_URL), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })
    .then((res) => (res.ok ? res : Promise.reject(res)))
    .then((res) => res.json())
    .catch((err) => {
      throw Error(err);
    });
}
export default postLogin;
