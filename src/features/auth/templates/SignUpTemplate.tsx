import { useState } from 'react';
import { useLocation } from 'wouter';
import { Input, InputProps } from '../../common/components/Input';
import useAuth from '../hooks/useAuth';

function SignUpTemplate() {
  const { signup } = useAuth();
  const [_, setLocation] = useLocation();
  const [formState, setFormState] = useState<{ [index: string]: string }>({
    email: '',
    password: '',
  });

  // todo form 태그 말고 state로 관리하기
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());

    const response = await signup(formJson.email as string, formJson.password as string);

    if (response) setLocation('/login');
  };

  const handleChange: InputProps['onChange'] = function (e) {
    const target = e.target;
    setFormState((prevState) => ({ ...prevState, [target.name]: target.value }));
  };

  return (
    <form
      className="flex h-screen w-full flex-col justify-center space-y-6"
      onSubmit={handleSubmit}
    >
      <Input
        label="Email"
        name="email"
        type="email"
        required
        requiredMark
        pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
        placeholder="test@test.com"
        value={formState.email}
        onChange={handleChange}
      />
      <Input
        label="Password"
        name="password"
        type="password"
        required
        requiredMark
        minLength={8}
        value={formState.password}
        onChange={handleChange}
      />
      <button
        type="submit"
        className="rounded-md bg-sky-500 px-5 py-2.5 text-sm font-semibold leading-5 text-white hover:bg-sky-700"
      >
        회원가입
      </button>
    </form>
  );
}

export default SignUpTemplate;
