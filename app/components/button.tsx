type Props = {
  text: string;
  onClick?: () => void;
};

export default function Button({ text, onClick }: Props) {
  return (
    <button
      onClick={() => onClick?.()}
      className="bg-blue-600 rounded-md p-1 ml-3"
    >
      {text}
    </button>
  );
}
