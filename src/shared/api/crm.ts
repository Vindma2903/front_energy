import axios from "axios";

// ⚙️ Базовый URL API
const API_BASE_URL = "http://localhost:8000/kanban";

// 🔐 Авторизация
const getAuthHeaders = () => {
  const token = localStorage.getItem("access_token");
  if (!token) throw new Error("Нет токена авторизации");

  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
};

// 📥 Получение списка сделок
export const fetchDeals = async () => {
  try {
    console.log("🔍 Отправляем GET-запрос:", `${API_BASE_URL}/orders`);
    const response = await axios.get(`${API_BASE_URL}/orders`);
    console.log("✅ Получены сделки:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Ошибка при получении сделок:", error);
    return [];
  }
};

// ➕ Создание новой сделки
export const createDeal = async (dealData: any) => {
  try {
    let token = localStorage.getItem("access_token");

    if (!token) {
      console.warn("⚠️ Токен отсутствует! Попытка повторной авторизации...");
      // Можно добавить checkAuth(), если реализовано
      token = localStorage.getItem("access_token");
    }

    if (!token) {
      throw new Error("🚨 Токен авторизации не найден!");
    }

    const headers = getAuthHeaders();

    const newDealData = {
      name: dealData.name,
      description: dealData.description || null,
      date_of_creation: new Date().toISOString(),
      date_of_send: new Date().toISOString(),
      address: dealData.address || null,
      delivery_method: dealData.delivery_method || "COURIER",
      price: dealData.price,
      client_name: dealData.client_name,
      client_phone: dealData.client_phone,
      column_id: dealData.column_id,
    };

    console.log("📤 Создание сделки:", JSON.stringify(newDealData, null, 2));

    const response = await axios.post(`${API_BASE_URL}/orders`, newDealData, { headers });

    console.log("✅ Сделка создана:", response.data);
    return response.data;
  } catch (error: any) {
    console.error("❌ Ошибка при создании сделки:", error);
    console.log("📌 Ответ сервера:", JSON.stringify(error.response?.data, null, 2));
    throw error;
  }
};

// 🔄 Обновление колонки у сделки (drag & drop)
export const updateDealColumn = async (dealId: string, newColumnId: string) => {
  try {
    const headers = getAuthHeaders();
    const payload = { column_id: newColumnId };

    console.log(`📦 Обновляем сделку ${dealId}: новая колонка ${newColumnId}`);

    const response = await axios.patch(`${API_BASE_URL}/orders/${dealId}`, payload, { headers });

    console.log("✅ Сделка успешно обновлена:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Ошибка при обновлении сделки:", error);
    throw error;
  }
};
