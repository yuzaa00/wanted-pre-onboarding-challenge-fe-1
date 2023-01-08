export interface InputProps {
  type?: 'text' | 'email' | 'password';
  label: string;
  name: string;
  value?: string;
  minLength?: number;
  pattern?: string;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  requiredMark?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function Input({
  type = 'text',
  label,
  name,
  value,
  minLength,
  pattern,
  placeholder,
  disabled,
  required,
  requiredMark,
  onChange,
}: InputProps) {
  return (
    <label className="block">
      <span
        className={`${
          requiredMark ? "after:ml-0.5 after:text-red-500 after:content-['*']" : ''
        } block text-sm font-medium text-slate-700`}
      >
        {label}
      </span>
      <input
        type={type}
        name={name}
        value={value}
        minLength={minLength}
        pattern={pattern}
        placeholder={placeholder}
        disabled={disabled}
        onChange={onChange}
        required={required}
        className="invalid:text-pink-600border-slate-300 mt-1 block w-full rounded-md border bg-white px-3 py-2 text-sm placeholder-slate-400 shadow-sm invalid:text-pink-600 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 focus:invalid:border-pink-500 focus:invalid:ring-pink-500 disabled:border-slate-200 disabled:bg-slate-50 disabled:text-slate-500 disabled:shadow-none"
      />
    </label>
  );
}
