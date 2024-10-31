export default function ({
  name,
  value,
  onChange,
  onBlur,
  onKeyDown,
  placeholder,
  className = "block w-full py-2 px-4 text-lg border-b outline-none bg-transparent border border-neutral-700 focus:outline-stone-700 placeholder:text-sm text-neutral-450",
  type = "text",
  disabled = false,
}) {
  return (
    <textarea
      className={className}
      type={type}
      placeholder={placeholder}
      name={name}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      onKeyDown={onKeyDown}
      disabled={disabled}
      rows={5}
    />
  );
}
