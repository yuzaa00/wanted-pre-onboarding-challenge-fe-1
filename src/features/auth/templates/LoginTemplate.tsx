import { useLocation } from "wouter";
import useAuth from "../hooks/useAuth";

function LoginTemplate() {
  const { login } = useAuth();
  const [_, setLoation] = useLocation();

  //todo form 태그 사용하지 말고 state 관리하기
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());
    login(formJson.email as string, formJson.password as string);
  }

  function handleClick() {
    setLoation("/signup");
  }

  return (
    <div>
      <form method="post" onSubmit={handleSubmit}>
        <label>
          ID
          <input
            name="email"
            required
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
          />
        </label>
        <label>
          PW
          <input type="password" name="password" required minLength={8} />
        </label>
        <button type="submit">로그인</button>
        <button type="button" onClick={handleClick}>
          회원가입
        </button>
      </form>
    </div>
  );
}

export default LoginTemplate;
