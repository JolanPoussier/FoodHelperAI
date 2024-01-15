type Props = {
  classname?: string;
  placeholder?: string;
  value?: string;
  onChange?: (text: string, section: string) => void;
  onClick?: () => void;
  section: string;
  errorMessage?: string;
};

export default function Input({
  classname,
  placeholder,
  value,
  onChange,
  onClick,
  section,
  errorMessage,
}: Props) {
  return (
    <>
      <input
        className={`${
          errorMessage ? "border border-red-500" : ""
        } ${classname}`}
        placeholder={placeholder}
        type="text"
        value={value}
        onChange={(e) => onChange?.(e.target.value, section)}
        onClick={() => onClick?.()}
      />
      <div className="text-red-500">{errorMessage}</div>
    </>
  );
}
