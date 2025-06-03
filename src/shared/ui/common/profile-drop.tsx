import React from "react";

const ProfileDropdown: React.FC = () => {
  return (
    <div
  style={{
    position: "absolute",
    top: "100%", // Позиция сразу под элементом
    right: "0", // Выравнивание справа
    transform: "translateX(264px) translateY(-68px)", // Смещение вправо и вниз
    width: "250px",
    backgroundColor: "#fff",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
    borderRadius: "8px",
    padding: "16px",
    zIndex: 10, // Отображение поверх других элементов
  }}
    >
      {/* Информация о пользователе */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginBottom: "16px",
        }}
      >
        <img
          src="/user_photo.png"
          alt="User Avatar"
          style={{
            width: "32px",
            height: "32px",
            borderRadius: "50%",
            marginRight: "12px",
          }}
        />
        <div>
          <div style={{ fontSize: "16px", fontWeight: "bold" }}>
            Палагина Виктория
          </div>
          <div style={{ fontSize: "14px", color: "#8e8e8e" }}>
            v9023669439@gmail.com
          </div>
        </div>
      </div>

      <hr style={{ borderColor: "#f0f0f0", margin: "12px 0" }} />

              {/* Настройки профиля */}
              <div
          style={{
            display: "flex",
            alignItems: "center",
            padding: "8px 0",
            cursor: "pointer",
          }}
        >
          <a
            href="/account-user"
            style={{
              display: "flex", // Чтобы содержимое ссылки сохраняло текущий стиль
              alignItems: "center",
              textDecoration: "none", // Убирает стандартное подчеркивание
              color: "inherit", // Наследует цвет текста
              width: "100%", // Делает ссылку кликабельной по всей ширине
            }}
          >
            <img
              src="/setting-icon.svg"
              alt="Настройки"
              style={{
                width: "20px",
                height: "20px",
                marginRight: "12px",
              }}
            />
            <span style={{ fontSize: "14px", color: "#2e2e2e" }}>
              Настройки профиля
            </span>
          </a>
        </div>


      <hr style={{ borderColor: "#f0f0f0", margin: "12px 0" }} />

      {/* Выход */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          padding: "8px 0",
          cursor: "pointer",
        }}
      >
        <img
          src="/exit.svg"
          alt="Выход"
          style={{
            width: "20px",
            height: "20px",
            marginRight: "12px",
          }}
        />
        <span style={{ fontSize: "14px", color: "#2e2e2e" }}>Выход</span>
      </div>
    </div>
  );
};

export default ProfileDropdown;
