import { create } from "zustand";
import http from "../config/index"; 
import { message } from "antd";
import Cookies from "js-cookie";

const useAuthStore = create((set) => ({
  user: null, 

  signIn: async (data) => {
    try {
      const response = await http.post("/user/login/", data);
      if (response.status === 200) {
        message.success("Успешный вход!");
        return response;
      }
    } catch (error) {
      console.error("Ошибка при входе:", error);
      message.error("Ошибка при входе");
    }
  },

  signUp: async (data) => {
    try {
      const response = await http.post("/user/register/", data);
      if (response.status === 201) {
        message.success("Регистрация прошла успешно!");
        return response;
      }
    } catch (error) {
      console.error("Ошибка при регистрации:", error);
      message.error("Ошибка при регистрации");
    }
  },
  getUser: async () => {
    try {
      const response = await http.get("/user/profile/");
      if (response.status === 200) {
        set({ user: response.data });
        return response.data;
      }
    } catch (error) {
      console.error("Ошибка при получении профиля:", error);
      message.error("Ошибка при получении профиля");
    }
  },
  logOut: async () => {
    try {
      const refreshToken = Cookies.get("refreshToken") ; 
  
      if (!refreshToken) {
        message.error("Нет refresh токена");
        return;
      }
  
      const response = await http.post("/user/logout/", { refresh: refreshToken });
  
      if (response.status === 205 || response.status === 200) {
        set({ user: null });
        Cookies.remove("token");
        Cookies.remove("refreshToken");
        Cookies.remove("id");
        message.success("Вы вышли из системы!");
        return response;
      }
    } catch (error) {
      console.error("Ошибка при выходе:", error);
      message.error("Ошибка при выходе");
    }
  }
}));

export default useAuthStore;
