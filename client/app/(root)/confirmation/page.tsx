"use client"
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();

  return (
    <section className="grid place-items-center gap-2">
      <Image className="aspect-square object-cover animate-bounce" width={200} height={200} src={"/assets/icons/email-verify.png"} alt="email-icon"/>
      <h2 className="title text-center text-2xl text-primary font-bold">
        Correo verificado
      </h2>
      <p>Tu cuenta ha sido verificada con éxito.</p>
      <Button onClick={()=>router.push('/login')} className="bg-secondary text-black transition-all ease-in-out duration-300 hover:opacity-80">Iniciar sesión</Button>
    </section>
  );
};

export default Page;
