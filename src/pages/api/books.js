import axios from "axios";

const api = axios.create({
  baseURL: "localhost:3001",
});

export async function fetchBooks() {
  try {
    const response = await api.get("/books");
    return response.data;
  } catch (error) {
    console.error("Error fetching books:", error);
    throw error;
  }
}
export async function searchBooks(searchTerm) {
  try {
    const response = await api.get(`/books?q=${searchTerm}`);
    return response.data;
  } catch (error) {
    console.error("Error searching books:", error);
    throw error;
  }
}
