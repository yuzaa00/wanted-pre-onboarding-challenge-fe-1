import useAuth from "../hooks/useAuth";

function SignUpTemplate() {
  const { signup } = useAuth();

  // todo form 태그 말고 state로 관리하기
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());

    signup(formJson.email as string, formJson.password as string);
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
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
        <button type="submit">회원가입</button>
      </form>
    </div>
  );
}

export default SignUpTemplate;
