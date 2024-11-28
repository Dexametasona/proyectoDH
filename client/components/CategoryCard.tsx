"use client";

import { ICategoryRes } from "@/types/ICategory";

export default function CategoryCard({ photo_Url, title }: ICategoryRes) {
  return (
    <div
      className="categroy-container pt-32 p-2"
      style={{
        background: `linear-gradient(rgba(0, 0, 0,0),rgba(60, 9, 108,.7)), url(${photo_Url}) center/cover`,
      }}
    >
      <p className="text-white normal-case font-bold">{title}</p>
    </div>
  );
}
