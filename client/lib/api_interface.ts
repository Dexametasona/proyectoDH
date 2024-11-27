import axios from "axios";

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
