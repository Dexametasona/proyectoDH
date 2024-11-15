"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { validateEmail, validatePassword } from "@/lib/utils";
import { registerUser } from "@/lib/api_interface";

const RegisterUser = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError(null);
    setLoading(true);
    let isValid = true;

    if (!name) {
      isValid = false;
      setError("Please enter your name");
    }

    if (!lastname) {
      isValid = false;
      setError("Please enter your last name");
    }

    if (!email || !validateEmail(email)) {
      isValid = false;
      setError("Please enter a valid email address");
    }

    if (!password || !validatePassword(password)) {
      isValid = false;
      setError(
        "Password must be at least 8 characters long, contain at least one lowercase letter, one uppercase letter, and one special character",
      );
    }

    if (!isValid) return;

    const success = await registerUser({
      name,
      lastname,
      email,
      password,
      setLoading,
    });

    if (success) {
      router.push("/login");
    } else {
      setError("Sign-up failed. Please try again.");
    }
  };

  const isFormComplete = name && lastname && email && password;

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <form
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-[480px]"
        onSubmit={handleSubmit}
      >
        <h2 className="text-xl font-bold mb-6 text-primary">REGÍSTRATE</h2>

        <div>
          <p>Información personal</p>

          <div className="mb-4">
            <Input
              className="rounded-full"
              id="name"
              type="text"
              placeholder="Nombre"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <Input
              className="rounded-full"
              id="lastname"
              type="text"
              placeholder="Apellido"
              value={lastname}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
        </div>

        <div>
          <p>Usuario y contraseña</p>

          <div className="mb-4">
            <Input
              className="rounded-full"
              id="email"
              type="email"
              placeholder="Correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
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
          </div>
        </div>

        {error && <p className="text-error text-xs mb-4">{error}</p>}

        <div className="flex items-center justify-between">
          <Button
            type="submit"
            disabled={!isFormComplete || loading}
            className={`font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline w-full ${
              isFormComplete
                ? "bg-primary hover:bg-primary text-white"
                : "bg-grey-subtext text-gray-700 cursor-not-allowed"
            }`}
          >
            {loading ? (
              <div className="flex items-center">
                <svg
                  className="animate-spin h-4 w-4 mr-2 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Cargando...
              </div>
            ) : (
              "Registrar"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default RegisterUser;
