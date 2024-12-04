"use client";
import { useLoaderContext } from "@/context/loaderContext";
import { Vortex } from "react-loader-spinner";
export default function CustomLoader() {
  const { isActive } = useLoaderContext();
  if (!isActive) return <></>;
  return (
    <div className="h-screen w-screen fixed bg-black/50 top-0 right-0 z-50 grid place-items-center">
      <Vortex
        colors={[
          "#3c096c",
          "#ff9e00",
          "#3c096c",
          "#f0f0f0",
          "#ff9e00",
          "#3c096c",
        ]}
      />
    </div>
  );
}
