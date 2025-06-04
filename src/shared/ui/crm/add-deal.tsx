import React, { useState } from "react";
import { createDeal } from "@/shared/api/crm";
import { Task } from "@/shared/ui/crm/task-crm";
import "@/shared/styles/kanban.css";

interface Deal {
  id: string;
  name: string;
  timeAgo: string;
  amount: number;
  client_name: string;
  client_phone: string;
  columnId: string;
  createdAt: Date | string;
}

interface ColumnProps {
  id: string;
  title: string;
  deals: Deal[]; // ✅ Получаем сделки из родителя
  onDealClick: (deal: Deal) => void;
  draggedDeal: Deal | null;
  setDraggedDeal: (deal: Deal | null) => void;
  onDropDeal: (deal: Deal, targetColumnId: string) => void;
  onAddDeal: (deal: Deal) => void; // ✅ Передаём новую сделку наверх
}

const Column: React.FC<ColumnProps> = ({
  id,
  title,
  deals,
  onDealClick,
  draggedDeal,
  setDraggedDeal,
  onDropDeal,
  onAddDeal,
}) => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    client_name: "",
    client_phone: "",
    amount: 0,
  });

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (draggedDeal) {
      onDropDeal(draggedDeal, id);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const { name, value } = e.target;
  setFormData(prev => ({
    ...prev,
    [name]: name === "amount" ? Number(value || 0) : value,
  }));
};


  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  const { name, client_name, client_phone, amount } = formData;

  if (!name || !client_name || !client_phone || amount <= 0) {
    alert("Заполните все поля корректно");
    return;
  }

  try {
    const payload = {
      name,
      description: null,
      date_of_creation: new Date().toISOString(),
      date_of_send: new Date().toISOString(),
      address: null,
      delivery_method: "COURIER",
      price: amount,
      column_id: id,
      client_name,
      client_phone,
    };

    // 🔧 ВАЖНО: здесь должен быть вызов createDeal
    const response = await createDeal(payload);

    if (response?.order) {
      const newDeal: Deal = {
        id: response.order.id,
        name: response.order.name,
        timeAgo: "",
        amount: response.order.price || 0,
        client_name: response.order.client?.name || client_name,
        client_phone: response.order.client?.phone || client_phone,
        columnId: response.order.columnId || id,
        createdAt: response.order.date_of_creation,
      };
      onAddDeal(newDeal);
      setShowForm(false);
      setFormData({ name: "", client_name: "", client_phone: "", amount: 0 });
    }
  } catch (err) {
    console.error("Ошибка создания сделки:", err);
    alert("Не удалось создать сделку");
  }
};




  return (
    <div className="column-wrapper" onDragOver={e => e.preventDefault()} onDrop={handleDrop}>
      <div className="column-header-inside">
        <h2 className="column-title">{title}</h2>
        <div className="deal-count">{deals.length}</div>
        <button
          className="add-deal-button"
          onClick={() => setShowForm(!showForm)}
          title="Создать сделку"
        >
          +
        </button>
      </div>

      {showForm && (
        <form className="crm-form-container" onSubmit={handleSubmit}>
          <input type="text" name="name" placeholder="Название сделки" value={formData.name} onChange={handleInputChange} className="crm-input" />
          <input type="text" name="client_name" placeholder="ФИО клиента" value={formData.client_name} onChange={handleInputChange} className="crm-input" />
          <input type="text" name="client_phone" placeholder="Телефон" value={formData.client_phone} onChange={handleInputChange} className="crm-input" />
          <input type="number" name="amount" placeholder="Сумма" value={formData.amount || ""} onChange={handleInputChange} className="crm-input" />
          <button type="submit" className="crm-submit-button">Сохранить</button>
        </form>
      )}

      <div className="crm-task-list">
        {deals.length === 0 ? (
          <div className="empty-column-message">Нет сделок</div>
        ) : (
          deals.map((deal, index) => (
            <div
              key={deal.id}
              className="task-card"
              draggable
              onDragStart={() => setDraggedDeal(deal)}
              onDragEnd={() => setDraggedDeal(null)}
              onClick={() => onDealClick(deal)}
            >
              <Task taskData={deal} index={index} onClick={() => {}} />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Column;
