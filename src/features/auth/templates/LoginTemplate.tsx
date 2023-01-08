import React, { useState } from 'react';
import { useLocation } from 'wouter';
import { Input, InputProps } from '../../../common/components/Input';
import useAuth from '../hooks/useAuth';

export const LoginTemplate = () => {
  const { login } = useAuth();
  const setLocation = useLocation()[1];
  const [formState, setFormState] = useState<{ [index: string]: string }>({
    email: '',
    password: '',
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());

    const response = await login(formJson.email as string, formJson.password as string);

    if (response) setLocation('/');
  };

  const handleChange: InputProps['onChange'] = function (e) {
    const target = e.target;
    setFormState((prevState) => ({ ...prevState, [target.name]: target.value }));
  };

  const handleClick = () => {
    setLocation('/signup');
  };

  return (
    <form
      className="mx-auto flex h-screen max-w-sm flex-col justify-center space-y-6"
      onSubmit={handleSubmit}
    >
      <Input
        label="Email"
        name="email"
        type="email"
        required
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
        minLength={8}
        value={formState.password}
        onChange={handleChange}
      />
      <button
        type="submit"
        className="rounded-md bg-sky-500 px-5 py-2.5 text-sm font-semibold leading-5 text-white hover:bg-sky-700 disabled:bg-sky-300"
      >
        로그인
      </button>
      <button
        type="button"
        onClick={handleClick}
        className="rounded-md bg-white px-5 py-2.5 text-sm font-semibold leading-5 text-sky-500 hover:bg-sky-200"
      >
        회원가입
      </button>
    </form>
  );
};
