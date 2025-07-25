import { Card, Col, Divider, Input, Row, Select } from "antd";
import { itemTypes, SELECTED_ITEM_STORAGE_KEY } from "../constants";
import { useEffect, useState, type FC } from "react";
import { useTranslation } from "react-i18next";

const Items: FC<{
  selectedItem?: string;
  onItemSelect: (newItem: string) => void;
}> = ({ selectedItem, onItemSelect }) => {
  const [searchText, setSearchText] = useState<string>("");
  const [skillFilter, setSkillFilter] = useState<string>("all");
  const { t } = useTranslation();

  useEffect(() => {
    const selectedItemLs = localStorage.getItem(SELECTED_ITEM_STORAGE_KEY);
    if (selectedItemLs) {
      onItemSelect(selectedItemLs);
    }
  }, []);

  const filteredItems = Object.entries(itemTypes).filter(([, value]) => {
    const matchesSearch = value.name
      .toLowerCase()
      .includes(searchText.toLowerCase());

    const matchesSkill = skillFilter === "all" || value.skill === skillFilter;

    return matchesSearch && matchesSkill;
  });

  return (
    <div
      style={{
        flex: "1 1 0",
        display: "flex",
        flexDirection: "column",
        border: "1px solid #f0f0f0",
        padding: 10,
        borderRadius: 8,
        marginBottom: 16,
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "12px",
          flex: "1 1 0",
        }}
      >
        <Input
          placeholder={t("itemSelection.searchPlaceholder")}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          allowClear
        />
        <Select
          style={{ width: "100%" }}
          placeholder={t("itemSelection.filterPlaceholder")}
          value={skillFilter}
          onChange={setSkillFilter}
          optionRender={(option) => {
            if (option.value === "all") {
              return <span>{t("itemSelection.allSkills")}</span>;
            }
            let iconUrl = "";
            let skillName = "";

            if (option.value === "special_pharmacy") {
              iconUrl =
                "https://irowiki.org/w/images/1/13/Special_Pharmacy.png";
              skillName = t("itemSelection.specialPharmacy");
            } else if (option.value === "potion_creation") {
              iconUrl = "https://irowiki.org/w/images/5/53/Prepare_Potion.png";
              skillName = t("itemSelection.potionCreation");
            } else if (option.value === "mixed_cooking") {
              iconUrl = "https://irowiki.org/w/images/3/35/Mixed_Cooking.png";
              skillName = t("itemSelection.mixedCooking");
            }

            return (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <img
                  src={iconUrl}
                  alt={skillName}
                  style={{ width: "16px", height: "16px" }}
                />
                <span>{skillName}</span>
              </div>
            );
          }}
          options={[
            { value: "all", label: t("itemSelection.allSkills") },
            {
              value: "special_pharmacy",
              label: t("itemSelection.specialPharmacy"),
            },
            {
              value: "potion_creation",
              label: t("itemSelection.potionCreation"),
            },
            {
              value: "mixed_cooking",
              label: t("itemSelection.mixedCooking"),
            },
          ]}
        />

        <Divider style={{ margin: "12px 0" }} />
        <div
          style={{
            flex: "1 1 0",
            overflowY: "auto",
            overflowX: "hidden",
          }}
        >
          {filteredItems.length === 0 ? (
            <div
              style={{
                textAlign: "center",
                padding: "20px",
                color: "#999",
              }}
            >
              {t("itemSelection.noItemsFound")}
            </div>
          ) : (
            <Row gutter={[8, 8]}>
              {filteredItems.map(([key, value]) => {
                const rate = value.itemRate || value.potionRate || 0;
                const isSelected = selectedItem === key;
                const skillName =
                  value.skill === "special_pharmacy"
                    ? t("itemSelection.specialPharmacy")
                    : value.skill === "potion_creation"
                    ? t("itemSelection.potionCreation")
                    : t("itemSelection.mixedCooking");

                return (
                  <Col span={12} key={key}>
                    <Card
                      size="small"
                      hoverable
                      onClick={() => {
                        onItemSelect(key);
                        localStorage.setItem(SELECTED_ITEM_STORAGE_KEY, key);
                      }}
                      style={{
                        cursor: "pointer",
                        border: isSelected
                          ? "2px solid #1890ff"
                          : "1px solid #d9d9d9",
                        backgroundColor: isSelected ? "#f0f8ff" : "white",
                        height: "100%",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                        }}
                      >
                        <img
                          src={value.icon}
                          alt={value.name}
                          style={{ width: "24px", height: "24px" }}
                        />
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div
                            style={{
                              fontWeight: "bold",
                              fontSize: "12px",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              whiteSpace: "nowrap",
                            }}
                          >
                            {t(value.name)}
                          </div>
                          <div style={{ color: "#666", fontSize: "10px" }}>
                            {skillName}
                          </div>
                          <div style={{ color: "#666", fontSize: "10px" }}>
                            Rate: {rate > 0 ? "+" : ""}
                            {rate}
                          </div>
                        </div>
                      </div>
                    </Card>
                  </Col>
                );
              })}
            </Row>
          )}
        </div>
      </div>
    </div>
  );
};

export default Items;
