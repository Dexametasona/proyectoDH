"use client"
import ModalOverlay from "@/components/shared/ModalOverlay";
import { Button } from "@/components/ui/button";
import { getCharTypeFromId } from "@/lib/utils";
import { ICharacteristicReq, ICharacteristicRes } from "@/types/ICharacteristic";
import { X } from "lucide-react";
import { FormEvent, useEffect, useState } from "react";

const FormModal = ({
  createChar,
  updateChar,
  showModal,
  char,
}: {
  char?: ICharacteristicRes;
  updateChar: (char: ICharacteristicReq, id:number) => Promise<void>;
  createChar: (char:ICharacteristicReq) => Promise<void>;
  showModal: (state: boolean) => void;
}) => {
  const typeIds = [1, 2, 3, 4, 5, 6, 7];
  const [type, setType] = useState(1);
  const [description, setDescription] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Char enviado: ',{ type, description });
    if(char){
      await updateChar({type, description}, char.id)
      return;
    }
    await createChar({ type, description })
  };

  useEffect(()=>{
    if(char){
      setType(char.type);
      setDescription(char.description)
    }
  },[char])


  return (
    <ModalOverlay>
      <section className="relative rounded-md bg-white min-w-80 p-4">
        <h3 className="text-xl font-bold mb-4 text-primary">
          {char ? "Actualizar Caracteristica" : "Crear Caracteristica"}
        </h3>
        <form className="space-y-2" onSubmit={handleSubmit}>
          <div className="field">
            <label className="font-bold text-primary" htmlFor="type">
              Tipo:{" "}
            </label>
            <select
              id="type"
              className="border-2 border-disabled rounded-sm outline-none"
              onChange={(e)=>setType(Number(e.target.value))}
            >
              {typeIds.map((id) => (
                <option
                selected={char?char.type===id:id===1}
                key={id}
                value={id}
                >
                  {getCharTypeFromId(id).name}
                </option>
              ))}
            </select>
          </div>
          <div className="field flex flex-col">
            <label className="font-bold text-primary" htmlFor="description">
              Descripción:{" "}
            </label>
            <textarea
            rows={3}
              id="description"
              value={description}
              className="border-disabled border-2 p-2 rounded-sm outline-none"
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
          <Button className="transition-default hover:opacity-80" type="submit" variant={"secondary"}>
            Guardar
          </Button>
        </form>
        <button
          className="absolute top-2 right-2 transition-default hover:opacity-80"
          type="button"
          onClick={() => showModal(false)}
        >
          <X />
        </button>
      </section>
    </ModalOverlay>
  );
};

export default FormModal;
