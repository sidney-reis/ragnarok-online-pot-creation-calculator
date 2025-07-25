import { Select, Typography } from "antd";
import { useTranslation } from "react-i18next";

const { Title, Text } = Typography;

import i18n from "../i18n";
import { HEADER_HEIGHT, LANGUAGE_STORAGE_KEY } from "../constants";

const Header = () => {
  const { t } = useTranslation();

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
        height: HEADER_HEIGHT,
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
          height: "100%",
          alignItems: "center",
          gap: 12,
        }}
      >
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
      </div>
    </div>
  );
};

export default Header;
