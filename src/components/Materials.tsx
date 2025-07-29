import { Card, Typography } from "antd";
import { useTranslation } from "react-i18next";
import { ITEM_IMAGE_URL, itemTypes } from "../constants";
import type { FC } from "react";

const { Text } = Typography;

const Materials: FC<{ selectedItem?: string }> = ({ selectedItem }) => {
  const { t } = useTranslation();
  const selectedItemData = itemTypes[selectedItem ?? ""];
  if (!selectedItemData) return null;

  return (
    <Card title={t("materialsSection.title")} size="small">
      <div
        className="results-card"
        style={{ display: "flex", flexDirection: "column", gap: 12 }}
      >
        {selectedItemData.book && (
          <div>
            <Text strong>{t("materialsSection.requiredBook")}</Text>
            <div
              style={{
                marginTop: "8px",
                padding: "8px",
                backgroundColor: "var(--hover-background)",
                borderRadius: "4px",
              }}
            >
              <Text>{t(selectedItemData.book)}</Text>
            </div>
          </div>
        )}

        <div>
          <Text strong>{t("materialsSection.materialsNeeded")}</Text>
          <div style={{ marginTop: "8px" }}>
            <div>
              {selectedItemData.materials.map((material, index) => (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    padding: "8px",
                    backgroundColor: "var(--hover-background)",
                    borderRadius: "4px",
                    border: "1px solid var(--border-color)",
                  }}
                >
                  <img
                    src={`${ITEM_IMAGE_URL}/${material.id}.png`}
                    alt={material.name}
                    style={{ width: "24px", height: "24px" }}
                  />
                  <div style={{ flex: 1 }}>
                    <Text>{t(material.name)}</Text>
                  </div>
                  <div>
                    <Text strong>×{material.quantity}</Text>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default Materials;
