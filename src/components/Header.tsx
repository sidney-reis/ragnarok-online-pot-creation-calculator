import { Select, Typography, Button } from "antd";
import { MoonOutlined, SunOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";

const { Title, Text } = Typography;

import i18n from "../i18n";
import { HEADER_HEIGHT, LANGUAGE_STORAGE_KEY } from "../constants";
import { useTheme } from "../hooks/useTheme";
import type { FC } from "react";

const Header: FC<{ isSmallWindow: boolean }> = ({ isSmallWindow }) => {
  const { t } = useTranslation();
  const { theme, toggleTheme } = useTheme();

  const handleLanguageChange = (language: string) => {
    i18n.changeLanguage(language);
    localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        height: isSmallWindow ? undefined : HEADER_HEIGHT,
        padding: isSmallWindow ? "12px 0" : undefined,
        flexDirection: isSmallWindow ? "column" : "row",
        gap: 6,
      }}
    >
      <Title
        level={3}
        style={{
          textAlign: "center",
          margin: 0,
        }}
      >
        {t("app.title")}
      </Title>
      <div
        style={{
          display: "flex",
          alignSelf: "flex-start",
          justifyContent: isSmallWindow ? "center" : "flex-end",
          height: isSmallWindow ? undefined : "100%",
          width: isSmallWindow ? "100%" : undefined,
          alignItems: "center",
          gap: 12,
        }}
      >
        <Button
          type="text"
          icon={theme === "dark" ? <SunOutlined /> : <MoonOutlined />}
          onClick={toggleTheme}
          size="small"
          title={theme === "dark" ? t("app.lightMode") : t("app.darkMode")}
        />
        {!isSmallWindow && <Text>{t("app.language")}:</Text>}
        <Select
          value={i18n.language}
          onChange={handleLanguageChange}
          style={{ width: 120 }}
          size="small"
          options={[
            { value: "en", label: t("app.english") },
            { value: "pt", label: t("app.portuguese") },
          ]}
        />
      </div>
    </div>
  );
};

export default Header;
