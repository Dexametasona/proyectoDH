"use client"; // Mark the component as a Client Component

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

const page = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const validateEmail = (email: string) => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  const validatePassword = (password: string) => {
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/;
    return re.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Client-side validation
    setError(null); // Clear any previous errors
    setLoading(true); // Set loading to true before the request
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
        "Password must be at least 8 characters long, contain at least one lowercase letter, one uppercase letter, and one special character"
      );
    }

    if (!isValid) return; // Prevent form submission if validation fails

    const backendBaseUrl = "http://localhost:8080/api/v1/";

    try {
      const response = await axios.post(`${backendBaseUrl}auth/register`, { name, lastname, email, password });
      if (response.status === 200 || response.status === 201) {
        const { token } = response.data.data; // Destructure the token from the response
        localStorage.setItem("authToken", token); // Save the token in localStorage
        router.push("/login"); // Redirect to the login or another page on success
      }
    } catch (error) {
      setError("Signup failed. Please try again."); // Update error message as needed
      console.error("Error:", error);
    } finally {
      setLoading(false); // Set loading to false after the request completes
    }
  };

  // Check if all fields are filled
  const isFormComplete = name && lastname && email && password;

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold mb-6">REGÍSTRATE</h2>

        <div>
          <p>Información personal</p>

          <div className="mb-4">
            {/* <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
            First Name
          </label> */}
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              type="text"
              placeholder="Nombre"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="mb-4">
            {/* <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="lastName">
            Last Name
          </label> */}
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
            {/* <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label> */}
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-6">
            {/* <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password
          </label> */}
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>

        {error && <p className="text-red-500 text-xs mb-4">{error}</p>}

        <div className="flex items-center justify-between">
          {/* <button
            className={`font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
              isFormComplete
                ? "bg-purple-500 hover:bg-purple-700 text-white"
                : "bg-gray-400 text-gray-700 cursor-not-allowed"
            }`}
            type="submit"
            disabled={!isFormComplete || loading}
          >
            Registrar
          </button> */}
          <button
            type="submit"
            disabled={!isFormComplete || loading}
            className={`font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
              isFormComplete
                ? "bg-purple-500 hover:bg-purple-700 text-white"
                : "bg-gray-400 text-gray-700 cursor-not-allowed"
            }`}
          >
            {loading ? (
              <div className="flex items-center">
                <svg
                  className="animate-spin h-5 w-5 mr-2 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
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
          </button>
        </div>
      </form>
    </div>
  );
};

export default page;
