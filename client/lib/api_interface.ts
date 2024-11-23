import axios from "axios";

import { AuthenticateUserProps, RegisterUserProps } from "@/types";

const BASE_URL = "https://proyectodh-13hj.onrender.com/api/v1";

export const getAllProducts = async () => {
	try {
		const response = await axios.get(`${BASE_URL}/products`);

		return response.data.data.content;
	} catch (error) {
		console.error("Error fetching products:", error);
		return [];
	}
};

export const getProductById = async (id: string | string[]) => {
	try {
		const response = await axios.get(`${BASE_URL}/products/${id}`);
		return response.data.data;
	} catch (error) {
		console.error("Error fetching product:", error);
		return [];
	}
};

export const getAllUsers = async () => {
	try {
		const response = await axios.get(`${BASE_URL}/users`);

		return response.data.data.content;
	} catch (error) {
		console.error("Error fetching users:", error);
		return [];
	}
};

export const authenticateUser = async ({
	email,
	password,
}: AuthenticateUserProps) => {
	try {
		const response = await axios.post(`${BASE_URL}/auth/login`, {
			email,
			password,
		});
		if (response.status === 200) {
			const { token } = response.data.data;
			localStorage.setItem("authToken", token);
			return true;
		}
		return false;
	} catch (error) {
		console.error("Error:", error);
		return false;
	}
};

export const registerUser = async ({
	name,
	lastname,
	email,
	password,
	setLoading,
}: RegisterUserProps) => {
	try {
		const response = await axios.post(`${BASE_URL}/auth/register`, {
			name,
			lastname,
			email,
			password,
		});

		if (response.status === 200 || response.status === 201) {
			const { token } = response.data.data;
			localStorage.setItem("authToken", token);
			return true;
		}
		return false;
	} catch (error) {
		console.error("Error:", error);
	} finally {
		setLoading(false);
	}
};
