import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3001",
});

export async function fetchNotes() {
  try {
    const response = await api.get("/notes");
    return response.data;
  } catch (error) {
    console.error("Error fetching notes:", error);
    throw error;
  }
}
export async function searchNotes(searchTerm) {
  try {
    const response = await api.get(`/notes?q=${searchTerm}`);
    return response.data;
  } catch (error) {
    console.error("Error searching notes:", error);
    throw error;
  }
}

export async function InsertNote(note) {
  try {
    const response = await api.post("/notes", note);
    return response.data;
  } catch (error) {
    console.error("Error adding note:", error);
    throw error;
  }
}

export async function deleteNote(noteId) {
  try {
    const response = await api.delete(`/notes/${noteId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting note:", error);
    throw error;
  }
}

export async function updateNote(noteId, updates) {
  try {
    const response = await api.patch(`/notes/${noteId}`, updates);
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Error updating note:", error);
    throw error;
  }
}
