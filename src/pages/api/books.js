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
export async function searchBooks({
  searchTerm = "",
  filters = [],
  sort = "",
  page = 1,
  limit = 10,
  includeTotal = false,
}) {
  try {
    console.log({ searchTerm, filters, sort, page, limit, includeTotal });
    let url = `/books?q=${searchTerm}`;
    const start = (page - 1) * limit;
    const end = start + limit;
    url += `&_start=${start}&_end=${end}`;

    if (includeTotal) url += "&_embed=total";
    if (sort !== "") url += `&_sort=${sort}`;
    if (filters.length > 0)
      filters.forEach((filter) => {
        if (filter === "new") url += `&currentPage=0`;
        if (filter === "recent")
          url += `&recentUpdate_gte=${new Date(
            new Date().setDate(new Date().getDate() - 7)
          ).toISOString()}`;
        if (filter === "completed") url += `&currentPage=totalPages`;
        url += `&${filter.type}=${filter.value}`;
      });
    console.log(url);
    const response = await api.get(url);

    return response;
  } catch (error) {
    console.error("Error searching books:", error);
    throw error;
  }
}

export async function InsertBook(book) {
  try {
    const response = await api.post("/books", {
      ...book,
      recentUpdate: new Date(),
    });
    return response;
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
    const response = await api.patch(`/books/${bookId}`, {
      ...updates,
      recentUpdate: new Date(),
    });
    return response;
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
