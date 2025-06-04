import React from "react";
import "@/shared/styles/kanban.css";

interface Deal {
  id: string;
  name: string;
  amount: number;
  client_name: string;
  client_phone: string;
  columnId: string;
  createdAt: string; // строка вида "2025-06-04 10:58:41.863"
}

interface TaskProps {
  taskData: Deal;
  index: number;
  onClick: () => void;
}

export const Task: React.FC<TaskProps> = ({ taskData, index, onClick }) => {
  // Форматируем createdAt в "дд.мм"
  const formatDateShort = (dateStr: string): string => {
  const date = new Date(dateStr);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${day}.${month} ${hours}:${minutes}`;
};


  const formattedDate = formatDateShort(taskData.createdAt);

  return (
    <div className="task-container" onClick={onClick}>
      {/* Заголовок сделки */}
      <h4 className="task-title">{taskData.name}</h4>

      {/* Информация по клиенту и сумме */}
      <div className="task-info-group">
        <p className="task-info">Клиент: {taskData.client_name}</p>
        <p className="task-info">Телефон: {taskData.client_phone}</p>
        <p className="task-amount">{taskData.amount} ₽</p>
      </div>

      {/* Подвал карточки с датой */}
      <div className="task-footer">
        <span className="task-date">{formattedDate}</span>
      </div>
    </div>
  );
};
