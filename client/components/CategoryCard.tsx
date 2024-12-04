import { ICategoryRes } from "@/types/ICategory";
import { useRouter } from "next/navigation";

export default function CategoryCard({ photo_Url, title, id }: ICategoryRes) {
  const router = useRouter()
  return (
    <div
      className="categroy-container pt-32 p-2 cursor-pointer shadow-none rounded-sm transition-all ease-in-out duration-300 hover:-translate-y-1 hover:shadow-md"
      onClick={()=>router.push('/catalog?categoryIds='+id)}
      style={{
        background: `linear-gradient(rgba(0, 0, 0,0),rgba(60, 9, 108,.7)), url(${photo_Url}) center/cover`,
      }}
    >
      <p className="text-white normal-case font-bold">{title}</p>
    </div>
  );
}
