import React from "react";
import { Link, useLocation } from "react-router-dom";
import { UserProfile } from "@/shared/ui/common/UserProfile";

const MainSidebar: React.FC = React.memo(() => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <aside className="sidebar">
      <div className="sidebar-container">
        <div className="menu-header">
          <img src="/logo.svg" alt="Логотип" className="menu-logo" />
          <button className="burger-button" aria-label="Меню">
            <img src="/burger.svg" alt="Бургер" className="burger-icon" />
          </button>
        </div>
        <nav className="menu-links">
          <Link
            to="/crm"
            className={`menu-link subtitle ${isActive("/crm") ? "active" : ""}`}
          >
            <img src="/Target.svg" alt="CRM" className="menu-icon icon" />
            CRM
          </Link>
          <Link
            to="/analytics"
            className={`menu-link subtitle ${
              isActive("/analytics") ? "active" : ""
            }`}
          >
            <img src="/chart-pie.svg" alt="Аналитика" className="menu-icon icon" />
            Аналитика
          </Link>
          <Link
            to="/admin-users"
            className={`menu-link subtitle ${
              isActive("/admin-users") ? "active" : ""
            }`}
          >
            <img
              src="/public/users.svg"
              alt="Пользователи"
              className="menu-icon icon"
            />
            Пользователи
          </Link>
        </nav>
        <UserProfile />
      </div>
    </aside>
  );
});

export { MainSidebar };
