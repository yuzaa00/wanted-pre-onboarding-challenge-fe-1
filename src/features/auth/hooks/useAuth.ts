import postLogin from "../remotes/postLogin";
import postSignUp from "../remotes/postSignUp";

function useAuth() {
  function login(email: string, password: string) {
    // api 요청
    postLogin(email, password);
    // 성공시 -> 페이지 이동 / 토큰 저장
    // 실패시 -> 실패 이유 보여주기
  }

  function signup(email: string, password: string) {
    postSignUp(email, password);
  }
  return {
    login,
    signup,
  };
}

export default useAuth;
