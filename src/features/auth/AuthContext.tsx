import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Интерфейс пользователя
interface User {
  id: number;
  username: string;
  email: string;
  status: string;
  role: string;
  isAdmin: boolean;
}

// Интерфейс контекста авторизации
interface AuthContextType {
  user: User | null;
  loading: boolean;
  setUser: (user: User | null) => void;
  checkAuth: () => Promise<void>;
}

// Создаем контекст
const AuthContext = createContext<AuthContextType | null>(null);

// Провайдер контекста
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  // ✅ Функция проверки авторизации
  const checkAuth = async () => {
  try {
    console.log("🚀 Проверяем авторизацию (GET /auth/check)...");
    console.log("🔎 Текущие cookies:", document.cookie);
    console.log("🔎 Текущий токен в localStorage:", localStorage.getItem("access_token"));

    const response = await axios.get<{ status: string; user: User; access_token?: string }>(
      "http://127.0.0.1:8000/auth/check",
      {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token") || ""}`,
        },
      }
    );

    console.log("✅ Ответ от сервера:", response.data);
    console.log("📦 Заголовки ответа:", response.headers);

    if (response.data.status === "authorized") {
      // Если сервер передал токен в `data.access_token`, сохраняем его
      if (response.data.access_token) {
        console.log("🔑 Обновляем токен в localStorage...");
        localStorage.setItem("access_token", response.data.access_token);
      }

      setUser({
        ...response.data.user,
        isAdmin: response.data.user.role === "admin",
      });

      console.log("🎉 Пользователь авторизован:", response.data.user);
    } else {
      console.warn("⚠️ Пользователь не авторизован!");
      setUser(null);
    }
  } catch (error: any) {
    console.error("❌ Ошибка авторизации:", error);
    setUser(null);
    localStorage.removeItem("access_token"); // Удаляем токен при ошибке
  } finally {
    console.log("⏳ Завершаем проверку авторизации...");
    setLoading(false);
  }
};


  // ✅ Проверяем авторизацию при загрузке страницы
  useEffect(() => {
    checkAuth();
  }, []);

  // ✅ Перенаправляем пользователя, если он не авторизован
  useEffect(() => {
    if (!loading && !user) {
      console.warn("🔄 Перенаправляем на /login...");
      navigate("/login");
    }
  }, [loading, user, navigate]);

  return (
    <AuthContext.Provider value={{ user, loading, setUser, checkAuth }}>
      {!loading ? children : <div>Загрузка...</div>}
    </AuthContext.Provider>
  );
};

// ✅ Хук для использования контекста
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth должен использоваться внутри AuthProvider");
  }
  return context;
};
