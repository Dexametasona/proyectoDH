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
    <div className="overflow-hidden  flex flex-col items-center justify-center flex-1 sm:w-full sm:px-4">
      <form
        className="bg-white shadow-lg rounded-2xl px-6 py-8 w-full max-w-md sm:px-2 pt-6 pb-8 w-[480px] sm:w-full sm:max-w-sm"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold mb-6 text-primary">INICIA SESIÓN</h2>

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
