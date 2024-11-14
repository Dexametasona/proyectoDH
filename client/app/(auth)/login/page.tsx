"use client"; // Mark the component as a Client Component

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

const page = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const validateEmail = (email: string) => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Client-side validation
    setError(null); // Clear any previous errors
    let isValid = true;

    if (!email || !validateEmail(email)) {
      isValid = false;
      setError("Please enter a valid email address");
    }

    if (!password) {
      isValid = false;
      setError("Please enter your password");
    }

    if (!isValid) return; // Prevent form submission if validation fails

    // Rest of the form submission logic (unchanged)

    const backendBaseUrl = "http://localhost:8080/api/v1/";

    try {
      const response = await axios.post(`${backendBaseUrl}auth/login`, { email, password });
      if (response.status === 200) {
        const { token } = response.data.data; // Destructure the token from the response
        localStorage.setItem("authToken", token); // Save the token in localStorage
        router.push("/home"); // Redirect to the homepage or another page on success
      }
    } catch (error) {
      setError("Invalid email or password"); // Update error message as needed
      console.error("Error:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold mb-6">INICIA SESIÓN</h2>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Correo electrónico
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Contraseña
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
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

        <div className="flex items-center justify-between">
          <button
            className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Iniciar sesión
          </button>
        </div>
      </form>
    </div>
  );
};

export default page;
