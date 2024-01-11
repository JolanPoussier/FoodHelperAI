type Props = {
  classname?: string;
  placeholder?: string;
  value?: string;
  onChange?: (text: string, section: string) => void;
  onClick?: () => void;
  section: string;
};

export default function Input({
  classname,
  placeholder,
  value,
  onChange,
  onClick,
  section,
}: Props) {
  return (
    <input
      className={classname}
      placeholder={placeholder}
      type="text"
      value={value}
      onChange={(e) => onChange?.(e.target.value, section)}
      onClick={() => onClick?.()}
    />
  );
}
