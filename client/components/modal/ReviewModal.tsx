import { IOrderRes } from "@/types/IOrder";
import ModalOverlay from "../shared/ModalOverlay";
import { Star, X } from "lucide-react";
import { FormEvent, useState } from "react";
import { Button } from "../ui/button";
import { IReviewReq } from "@/types/IReview";

const ReviewModal = ({
  order,
  handleShowModal,
  handleCreateReview
}: {
  order: IOrderRes;
  handleShowModal: (state:boolean) => void;
  handleCreateReview:(review:IReviewReq)=>Promise<void>
}) => {
  const starsId = [1, 2, 3, 4, 5];
  const [comment, setComment] = useState("");
  const [score, setScore] = useState(3);
  const [error, setError] = useState('');

const handleForm= async (e:FormEvent<HTMLFormElement>)=>{
  e.preventDefault()
  if(comment.trim().length<3 || comment.trim().length>300){
    setError('El comentario tiene que tener minimo 3 caracteres.')
    clearMessage()
    return
  }
  await handleCreateReview({comment, score, order_id:order.id})
}
  const clearMessage = ()=>{
    setTimeout(() => {
      setError('')
    }, 4000);
  }
  return (
    <ModalOverlay>
      <section className="bg-white relative rounded-xl p-4 min-w-96 space-y-2">
        <h3 className="font-bold text-primary text-xl">RESEÑA</h3>
        <p>
          Producto: <span className="font-bold">{order.productName}</span>
        </p>
        <form onSubmit={handleForm} className="space-y-4">
          <textarea
          className="border-2 border-disabled rounded-md w-full outline-none p-2"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={5}
            placeholder="Deja tu comentario..."
          ></textarea>
          <div className="field border-2 border-disabled rounded-md p-2">
            <span>Calificación</span>
            <div className="flex gap-x-2">
              {starsId.map((id) => (
                <button type="button" key={id} onClick={() => setScore(id)}>
                  <Star color={score >= id ? "#FF9E00" : "#AFAFAF"} fill={score >= id ? "#FF9E00" : "#AFAFAF"}/>
                </button>
              ))}
            </div>
          </div>
          <p className="text-sm">{error}</p>
          <Button type="submit" variant={'secondary'} className="transition-default w-full hover:opacity-80">
            Guardar
          </Button>
        </form>
        <button onClick={()=>handleShowModal(false)} type="button" className="absolute top-2 right-2">
          <X />
        </button>
      </section>
    </ModalOverlay>
  );
};

export default ReviewModal;
