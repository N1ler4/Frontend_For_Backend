import { create } from "zustand";
import http from "../config/index"; 
import { message } from "antd";

const useBooksStore = create((set) => ({
  books: [],
  loading: false,
  error: null,

  fetchBooks: async () => {
    set({ loading: true, error: null });
    try {
      const response = await http.get("/library/books/");
      if (response.status === 200) {
        set({ books: response.data, loading: false });
      }
    } catch (error) {
      set({ error: error.message, loading: false });
      console.error("Ошибка загрузки книг:", error);
      message.error("Ошибка загрузки книг");
    }
  },

  addBook: async (data) => {
    set({ error: null });
    try {
      const response = await http.post("/library/books/", data);
      if (response.status === 201) {
        set((state) => ({ books: [...state.books, response.data] }));
        message.success("Книга успешно добавлена!");
      }
    } catch (error) {
      set({ error: error.message });
      console.error("Ошибка при добавлении книги:", error);
      message.error("Ошибка при добавлении книги");
    }
  },

  updateBook: async (id, data) => {
    set({ error: null });
    try {
      const response = await http.put(`/library/books/${id}/`, data);
      if (response.status === 200) {
        set((state) => ({
          books: state.books.map((book) =>
            book.id === id ? { ...book, ...data } : book
          ),
        }));
        message.success("Книга обновлена!");
      }
    } catch (error) {
      set({ error: error.message });
      console.error("Ошибка обновления книги:", error);
      message.error("Ошибка обновления книги");
    }
  },

  deleteBook: async (id) => {
    set({ error: null });
    try {
      const response = await http.delete(`/library/books/${id}/`);
      if (response.status === 200) {
        set((state) => ({ books: state.books.filter((book) => book.id !== id) }));
        message.success("Книга удалена!");
      }
    } catch (error) {
      set({ error: error.message });
      console.error("Ошибка удаления книги:", error);
      message.error("Ошибка удаления книги");
    }
  },
  getBookById: async (id) => {
    set({ error: null });
    try {
      const response = await http.get(`/library/books/${id}/`);
      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      set({ error: error.message });
      console.error("Ошибка получения книги по ID:", error);
      message.error("Ошибка получения книги по ID");
    }
    return null; 
  }
}));

export default useBooksStore;
