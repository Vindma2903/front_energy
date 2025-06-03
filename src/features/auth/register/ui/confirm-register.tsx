import React from "react";
import "@/shared/styles/globals.css"; // Подключаем глобальные стили

export const ConfirmRegister = () => {
  return (
    <div className="confirm-page flex items-center justify-center min-h-screen bg-confirm-background">
      <div className="confirm-card bg-white rounded-lg shadow-lg p-8 w-96 text-center">
        <h1 className="confirm-title text-2xl font-semibold mb-4">
          Подтверждение регистрации
        </h1>
        <p className="confirm-text text-gray-600">
          Вашему руководителю отправлено уведомление, пожалуйста, ожидайте
          подтверждения вашей регистрации.
        </p>
      </div>
    </div>
  );
};

export default ConfirmRegister;
