import Image from "next/image";
import { Button } from "../ui/button";
import { FormEvent, useState } from "react";
import { validateSearchNameProduct } from "@/lib/utils";
import { ICatalogSidebarProps } from "@/types/IProps";

const SearchBar = ({ sendFilters, categories }: ICatalogSidebarProps) => {
  const [text, setText] = useState("");
  const [textError, setTextError] = useState<string | null>(null);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isValid = validateSearchNameProduct(text);
    if (!isValid) {
      setTextError("Mínimo 4 letras, sin espacios ni números.");
      setTimeout(() => {
        setTextError(null);
      }, 4000);
      return;
    }
    setTextError(null);
    const categoryIds = categories.map((category) => category.id);
    sendFilters({ name: text.trim(), categoryIds });
  };

  return (
    <div className="search-container flex flex-col px-2 gap-2">
      <form
        onSubmit={handleSubmit}
        className={`field-container flex items-center gap-x-2 w-full border-2 rounded-full overflow-hidden ${
          textError ? "border-error" : ""
        }`}
      >
        <Button
        title="Iniciar búsqueda"
          className="bg-primary px-2 rounded-none hover:opacity-70 transition-all duration-300 ease-in-out"
          type="submit"
        >
          <Image
            src={"/assets/icons/search-icon.png"}
            alt="search-icon"
            width={16}
            height={16}
          ></Image>
        </Button>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          id="name"
          className="grow outline-none"
          placeholder="¿Que estas buscando?"
        />
      </form>

      <div className="category-container"></div>
      {textError ? (
        <span className="text-xs text-error">{textError}</span>
      ) : null}
    </div>
  );
};

export default SearchBar;
