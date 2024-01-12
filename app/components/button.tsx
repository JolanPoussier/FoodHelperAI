type Props = {
  text: string;
  classname?: string;
  onClick?: () => void;
};

export default function Button({ text, onClick, classname }: Props) {
  return (
    <button
      onClick={() => onClick?.()}
      className={`bg-blue-600 rounded-md p-1 ml-3 ${classname}`}
    >
      {text}
    </button>
  );
}
