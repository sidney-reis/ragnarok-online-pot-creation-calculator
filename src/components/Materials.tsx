import { Card, Typography, InputNumber, Tooltip } from "antd";
import { useTranslation } from "react-i18next";
import { ITEM_IMAGE_URL, itemTypes } from "../constants";
import type { FC } from "react";

const { Text } = Typography;

interface MaterialsProps {
  selectedItem?: string;
  onMaterialCostChange: (materialId: number, cost: number | null) => void;
  materialCosts?: Record<number, number>;
}

const Materials: FC<MaterialsProps> = ({
  selectedItem,
  onMaterialCostChange,
  materialCosts = {},
}) => {
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
                    gap: "8px",
                    justifyContent: "space-between",
                    padding: "8px",
                    backgroundColor: "var(--hover-background)",
                    borderRadius: "4px",
                    border: "1px solid var(--border-color)",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      flex: 1,
                    }}
                  >
                    <img
                      src={`${ITEM_IMAGE_URL}/${material.id}.png`}
                      alt={material.name}
                      style={{ width: "24px", height: "24px" }}
                    />
                    <div>
                      <Text strong>{material.quantity}×</Text>
                    </div>
                    <div
                      style={{
                        flex: 1,
                        overflow: "hidden",
                        textAlign: "start",
                      }}
                    >
                      <Text ellipsis={{ tooltip: t(material.name) }}>
                        {t(material.name)}
                      </Text>
                    </div>
                  </div>
                  <Tooltip title={t("materialsSection.costPerUnit")}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "4px",
                      }}
                    >
                      <InputNumber
                        size="small"
                        min={0}
                        precision={0}
                        placeholder="0"
                        value={materialCosts[material.id] || null}
                        onChange={(value) =>
                          onMaterialCostChange(material.id, value)
                        }
                        style={{ width: "60px" }}
                      />
                      <Text type="secondary">z</Text>
                    </div>
                  </Tooltip>
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
