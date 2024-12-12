import { Button } from "@/components/ui/button";
import { getCharTypeFromId } from "@/lib/utils";
import { ICharacteristicRes } from "@/types/ICharacteristic";
import { IProductReq } from "@/types/IProduct";
import { CircleX, PackagePlus } from "lucide-react";
import { ChangeEvent, useState } from "react";

const ProductInputChar = ({
  characteristics,
  product,
  handleCaracteristicas,
  handleAddChar,
  handleRemoveChar,
}: {
  characteristics: ICharacteristicRes[];
  product: IProductReq;
  handleCaracteristicas: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleAddChar: (id: number) => void;
  handleRemoveChar: (id: number) => void;
}) => {
  const typesId = [1, 2, 3, 4, 5, 6, 7];
  const [type, setType] = useState(0);
  const [char, setChar] = useState(0);

  const idToCharComponent = (id: number) => {
    const charSelect = characteristics.filter((item) => item.id === id)[0];
    const { icon: Icon } = getCharTypeFromId(charSelect.type);

    return (
      <div
        key={charSelect.id}
        className="item flex items-center gap-2 border-r-2 border-disabled px-2"
      >
        <Icon />
        <p>{charSelect.description}</p>
        <button className="hover:bg-disabled rounded-full" type="button" onClick={()=>handleRemoveChar(id)}>
          <CircleX />
        </button>
      </div>
    );
  };
  const handleChangeType = (e: ChangeEvent<HTMLSelectElement>) => {
    const typeId = Number(e.target.value);
    setType(typeId);
    const defaultChar = characteristics.filter(
      (char) => char.type === typeId
    )[0];
    setChar(defaultChar.id);
  };

  return (
    <div className={`field_characteristic`}>
      <label>Características: </label>
      {characteristics.length > 0 ? (
        <div className="characteristic_input pl-2 flex gap-x-3 border-2 border-disabled rounded-md">
          <select className="char_type" onChange={handleChangeType}>
            <option value={0} selected disabled>
              Tipo
            </option>
            {typesId.map((id) => (
              <option key={id} value={id}>
                {getCharTypeFromId(id).name}
              </option>
            ))}
          </select>

          <select
            className="char_item flex-grow"
            onChange={(e) => setChar(Number(e.target.value))}
          >
            <option value={0} selected disabled>
              Descripción
            </option>
            {characteristics
              .filter((char) => char.type === type)
              .map((char) => (
                <option key={char.id} value={char.id}>
                  {char.description}
                </option>
              ))}
          </select>
          <Button
            onClick={() => handleAddChar(char)}
            type="button"
            className="hover:opacity-70 transition-all ease-in-out duration-300"
          >
            <PackagePlus />
          </Button>
        </div>
      ) : null}
      {product.characteristic.length > 0 ? (
        <div className="characteristic_selected flex flex-col gap-2 py-2">
          {product.characteristic.map(idToCharComponent)}
        </div>
      ) : null}

      <input
        type="text"
        id="characteristics"
        value={product.characteristic.join(",")}
        onChange={handleCaracteristicas}
        hidden
      />
    </div>
  );
};

export default ProductInputChar;
