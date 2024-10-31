export default function ({
  text,
  onClick,
  className = "block w-full py-2 px-4 border-b outline-none resize-none bg-transparent border border-neutral-700 focus:outline-stone-700 text-sm text-neutral-450",
  type = "submit",
  disabled = false,
}) {
  return (
    <button
      className={className}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {text}
    </button>
  );
}
