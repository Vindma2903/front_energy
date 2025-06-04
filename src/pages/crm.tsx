import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/features/auth/AuthContext";
import "@/shared/styles/projects.css";
import "@/shared/styles/globals.css";
import { MainSidebar } from "@/shared/ui/common/main-sidebar";
import Breadcrumbs from "@/shared/ui/common/Breadcrumb";
import { NavCRM } from "@/shared/ui/crm/nav-crm";
import Column from "@/shared/ui/crm/Column";
import { fetchDeals, updateDealColumn } from "@/shared/api/crm";

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

export const CRMPage: React.FC = () => {
  const { user, loading } = useAuth();
  const [deals, setDeals] = useState<Deal[]>([]);
  const [draggedDeal, setDraggedDeal] = useState<Deal | null>(null);

  // Форматирование даты в дд.мм
  const formatDateShort = (date: string | Date): string => {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    return `${day}.${month}`;
  };

  // Загрузка сделок из API
  useEffect(() => {
    const loadDeals = async () => {
      try {
        const data = await fetchDeals();
        const formatted: Deal[] = data.map((deal: any) => ({
          id: deal.id,
          name: deal.name,
          timeAgo: formatDateShort(deal.createdAt || deal.date_of_creation),
          amount: deal.price || 0,
          client_name: deal.client?.name || "Не указан",
          client_phone: deal.client?.phone || "Не указан",
          columnId: deal.columnId || deal.column_id || "column-1",
          createdAt: deal.createdAt || deal.date_of_creation || new Date().toISOString(),
        }));
        setDeals(formatted);
      } catch (err) {
        console.error("❌ Ошибка загрузки сделок:", err);
      }
    };
    loadDeals();
  }, []);

  // Обработка перемещения карточки между колонками
  const handleDropDeal = async (deal: Deal, targetColumnId: string) => {
    if (deal.columnId === targetColumnId) return;

    const updatedDeal = { ...deal, columnId: targetColumnId };
    setDeals(prev =>
      prev.map(d => (d.id === deal.id ? updatedDeal : d))
    );

    try {
      await updateDealColumn(deal.id, targetColumnId);
    } catch (err) {
      console.error("❌ Ошибка при обновлении колонки:", err);
    }
  };

  // Добавление новой сделки в состояние
  const handleAddDeal = (newDeal: Deal) => {
    setDeals(prev => [...prev, newDeal]);
  };

  if (loading) return <div>Загрузка...</div>;
  if (!user) return <Navigate to="/login" replace />;

  const breadcrumbs = [
    { label: "Главная", to: "/" },
    { label: "CRM", to: "/crm" },
    { label: "Ваши сделки", to: "/projects" },
  ];

  const columns = [
    { id: "column-1", title: "Новая заявка" },
    { id: "column-2", title: "Ответственный агент" },
    { id: "column-3", title: "Передано менеджеру" },
  ];

  return (
    <div className="home-container" style={{ display: "flex", position: "relative" }}>
      <MainSidebar />
      <main className="content" style={{ flex: 1, paddingRight: "100px" }}>
        <Breadcrumbs breadcrumbs={breadcrumbs} />
        <h2 className="content-title">Ваши сделки</h2>

        <div className="kanban-columns" style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
          {columns.map(col => (
            <Column
              key={col.id}
              id={col.id}
              title={col.title}
              deals={deals.filter(d => d.columnId === col.id)}
              onDealClick={(deal) => console.log("Открыта сделка:", deal)}
              draggedDeal={draggedDeal}
              setDraggedDeal={setDraggedDeal}
              onDropDeal={handleDropDeal}
              onAddDeal={handleAddDeal}
            />
          ))}
        </div>
      </main>
      <NavCRM />
    </div>
  );
};

export default CRMPage;
