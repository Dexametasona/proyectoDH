import { IProductInput } from "@/types/IProduct";

export default function ProductInput({
  fieldName,
  onChange,
  value,
  type = "text",
  placeholder = "texto",
}: IProductInput) {
  return (
    <div className="flex flex-col">
      <label htmlFor={fieldName}>{fieldName}: </label>
      <input
        className="border-2 border-disabled rounded-md p-2 opacity-70 focus:outline-primary focus:opacity-100"
        id={fieldName}
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        required
        value={value}
      />
    </div>
  );
}
