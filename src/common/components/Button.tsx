export interface ButtonProps {
  type?: 'button' | 'submit';
  appearance?: 'main' | 'ghost';
  text: string;
  onClick?: any;
  onChange?: any;
}

export const Button = ({
  type = 'button',
  appearance = 'main',
  text,
  onClick,
  onChange,
}: ButtonProps) => {
  return (
    <>
      {appearance === 'main' && (
        <button
          type={type}
          onClick={onClick}
          onChange={onChange}
          className="rounded-md bg-sky-500 px-5 py-2.5 text-sm font-semibold leading-5 text-white hover:bg-sky-700 disabled:bg-sky-300"
        >
          {text}
        </button>
      )}
      {appearance === 'ghost' && (
        <button
          type={type}
          onClick={onClick}
          onChange={onChange}
          className="rounded-md bg-white px-5 py-2.5 text-sm font-semibold leading-5 text-sky-500 hover:bg-sky-200"
        >
          {text}
        </button>
      )}
    </>
  );
};
