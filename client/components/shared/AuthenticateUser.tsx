"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "../ui/button";
import { authenticateUser } from "@/lib/api_interface";
import { validateEmail } from "@/lib/utils";
import { Input } from "../ui/input";

const AuthenticateUser = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError(null);
    let isValid = true;

    if (!email || !validateEmail(email)) {
      isValid = false;
      setError("Please enter a valid email address");
    }

    if (!password) {
      isValid = false;
      setError("Please enter your password");
    }

    if (!isValid) return;

    const success = await authenticateUser({ email, password, setError });
    if (success) {
      router.push("/home");
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <form
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-[480px]"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold mb-6">INICIA SESIÓN</h2>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-6"
            htmlFor="email"
          >
            Usuario y contraseña
          </label>
          <Input
            className="rounded-full"
            id="email"
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {error &&
            email.length > 0 && ( // Show error only if email is not empty
              <p className="text-red-500 text-xs">{error}</p>
            )}
        </div>

        <div className="mb-6">
          <Input
            className="rounded-full"
            id="password"
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error &&
            password.length > 0 && ( // Show error only if password is not empty
              <p className="text-red-500 text-xs">{error}</p>
            )}
        </div>

        <div className="flex items-center justify-center flex-col gap-6">
          <Button type="submit" className="w-full rounded-full">
            Iniciar sesión
          </Button>
          <p className="underline text-primary">Recuperar contraseña</p>
        </div>
      </form>
    </div>
  );
};

export default AuthenticateUser;
