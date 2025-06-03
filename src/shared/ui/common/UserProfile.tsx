import React, { useState } from "react";
import { User } from "@nextui-org/react";
import ProfileDropdown from "@/shared/ui/common/profile-drop"; // Исправленный импорт меню профиля

export const UserProfile: React.FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Состояние для меню профиля

  const handleArrowClick = () => {
    setIsDropdownOpen((prev) => !prev); // Переключаем состояние меню
  };

  return (
    <div className="user-profile relative">
      {/* Информация о пользователе */}
      <User
        avatarProps={{
          src: "/user_photo.png", // Путь к аватару
          className: "user-avatar",
        }}
        name="Палагина Виктория"
        description="v9023669439@gmail.com"
        className="user-info"
        css={{
          display: "flex",
          alignItems: "center",
          padding: "1rem",
          borderTop: "1px solid #f6f6f6",
          ".nextui-user-avatar": {
            width: "32px",
            height: "32px",
            marginRight: "0.75rem",
          },
          ".nextui-user-info": {
            flexGrow: 1,
          },
          ".nextui-user-name": {
            fontSize: "1rem",
            fontWeight: "600",
            color: "#2e2e2e",
          },
          ".nextui-user-description": {
            fontSize: "0.875rem",
            color: "#8e8e8e",
          },
        }}
      />
      {/* Стрелка для открытия меню */}
      <img
        src="/arrow.svg"
        alt="Иконка"
        className={`user-arrow ${isDropdownOpen ? "flipped" : ""}`}
        onClick={handleArrowClick}
      />

      {/* Выпадающее меню */}
      {isDropdownOpen && (
        <div
          style={{
            position: "absolute",
            top: "100%", // Отображаем под элементом
            right: "0", // Прилепляем к правому краю
            marginTop: "8px", // Небольшой отступ сверху
            zIndex: 10,
            backgroundColor: "white",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
            borderRadius: "8px",
            width: "250px", // Фиксированная ширина меню
          }}
        >
          <ProfileDropdown /> {/* Подключаем меню профиля */}
        </div>
      )}
    </div>
  );
};

export default UserProfile;
