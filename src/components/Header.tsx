import { Select, Space, Typography } from "antd";
import { useTranslation } from "react-i18next";

const { Title, Text } = Typography;

import i18n from "../i18n";

const Header = () => {
  const { t } = useTranslation();

  const handleLanguageChange = (language: string) => {
    i18n.changeLanguage(language);
    // Save language preference to localStorage
    try {
      localStorage.setItem("ragnarok-simulator-language", language);
    } catch (error) {
      console.error("Error saving language preference:", error);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        marginBottom: 16,
        justifyContent: "space-between",
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
          justifyContent: "flex-end",
        }}
      >
        <Space>
          <Text>{t("app.language")}:</Text>
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
        </Space>
      </div>
    </div>
  );
};

export default Header;
