"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "../ui/button";
import { validateEmail } from "@/lib/utils";
import { Input } from "../ui/input";
import { useAuthContext } from "@/context/AuthContext";
import { Eye, EyeClosed } from "lucide-react";

const AuthenticateUser = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formError, setFormError] = useState<string | null>(null);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [showPass, setShowPass] = useState(false)

  const { loginContext } = useAuthContext();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setFormError(null);
    let isValid = true;

    if (!email || !validateEmail(email)) {
      isValid = false;
      setFormError("Please enter a valid email address");
    }

    if (!password) {
      isValid = false;
      setFormError("Please enter your password");
    }

    if (!isValid) return;
    try {
      const response = await loginContext({ email, password });
      if (response !== null && response.rol === 0) {
        router.push("/admin");
      } else {
        router.push("/home");
      }
    } catch {
      setLoginError("Email o contraseña incorrecta");
      setTimeout(() => {
        setLoginError(null);
      }, 2000);
    }
  };

  return (
    <div className="overflow-hidden  flex flex-col items-center justify-center flex-1 sm:w-full sm:px-4">
      <form
        className="bg-white shadow-lg rounded-2xl px-6 py-8 w-full max-w-md sm:px-2 pt-6 pb-8 sm:w-full sm:max-w-sm"
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
          {formError &&
            email.length > 0 && ( // Show error only if email is not empty
              <p className="text-red-500 text-xs">{formError}</p>
            )}
        </div>

        <div className="mb-6 relative">
          <Input
            className="rounded-full"
            id="password"
            type={showPass? 'text':'password'}
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="button" onClick={()=>setShowPass(!showPass)} className="absolute right-2 bottom-1/2 translate-y-1/2">
           {showPass ? (<Eye/>):(<EyeClosed/>)}
          </button>
          {formError &&
            password.length > 0 && ( // Show error only if password is not empty
              <p className="text-red-500 text-xs">{formError}</p>
            )}
        </div>
        {!loginError ? (
          <></>
        ) : (
          <div className="p-4 text-white border-l-red-500 border-2 bg-black mb-4 rounded-sm shadow-sm">
            <p>{loginError}</p>
          </div>
        )}

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
