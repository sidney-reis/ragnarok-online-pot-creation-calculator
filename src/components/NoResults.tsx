import { Card, Typography } from "antd";
import { useTranslation } from "react-i18next";

const { Text } = Typography;

const NoResults = () => {
  const { t } = useTranslation();

  return (
    <Card>
      <div style={{ textAlign: "center", padding: "48px 0" }}>
        <Text type="secondary">{t("calculationResults.noResults")}</Text>
      </div>
    </Card>
  );
};

export default NoResults;
