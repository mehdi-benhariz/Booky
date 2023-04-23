import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3001",
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

export async function InsertBook(book) {
  try {
    const response = await api.post("/books", book);
    return response.data;
  } catch (error) {
    console.error("Error adding book:", error);
    throw error;
  }
}

export async function deleteBook(bookId) {
  try {
    const response = await api.delete(`/books/${bookId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting book:", error);
    throw error;
  }
}

export async function updateBook(bookId, updates) {
  try {
    const response = await api.patch(`/books/${bookId}`, updates);
    return response.data;
  } catch (error) {
    console.error("Error updating book:", error);
    throw error;
  }
}

export async function getBookById(bookId, includeNote = false) {
  try {
    let url = `/books/${bookId}`;
    if (includeNote) url += "?_embed=notes";
    const response = await api.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching book:", error);
    throw error;
  }
}
