import { ICategoryRes } from "@/types/ICategory";
import { useRouter } from "next/navigation";

export default function CategoryCard({ photo_Url, title, id, description }: ICategoryRes) {
  const router = useRouter()
  return (
    <div
      className="categroy-container pt-32 p-2 cursor-pointer shadow-none rounded-sm transition-default relative overflow-hidden hover:-translate-y-1 hover:shadow-md group"
      onClick={()=>router.push('/catalog?categoryIds='+id)}
      style={{
        background: `linear-gradient(rgba(0, 0, 0,0),rgba(60, 9, 108,.7)), url(${photo_Url}) center/cover`,
      }}
    >
      <p className="text-white normal-case font-bold">{title}</p>
      <div className="absolute top-80 px-10 left-0 w-full h-full bg-black/70 text-white grid place-items-center group-hover:top-0 transition-default">
        {description}
      </div>
    </div>
  );
}
