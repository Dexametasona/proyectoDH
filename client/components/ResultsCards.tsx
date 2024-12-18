"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

const ResultsCards = ({ id, photoUrl, name, price }) => {
  const router = useRouter();

  const handleRedirect = (page: string) => {
    router.push(`/${page}/${id}`);
  };

  return (
    <div
      key={id}
      className="w-full flex flex-col gap-4"
      onClick={() => handleRedirect("product")}
    >
      <Image
        src={photoUrl || ""}
        alt="product image"
        width={400}
        height={200}
        className="w-full h-80 rounded-xl cursor-pointer object-cover"
        layout="fixed"
      />
      <div className="flex flex-col gap-2 pr-3">
        <p className="text-xl font-medium">{name}</p>
        <p className="text-primary-soft">{`$${price}/día`}</p>
      </div>
    </div>
  );
};

export default ResultsCards;
