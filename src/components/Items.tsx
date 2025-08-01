import { Card, Divider, Input, Select } from "antd";
import {
  ITEM_IMAGE_URL,
  itemTypes,
  SELECTED_ITEM_STORAGE_KEY,
} from "../constants";
import { useEffect, useState, type FC } from "react";
import { useTranslation } from "react-i18next";

const Items: FC<{
  selectedItem?: string;
  onItemSelect: (newItem: string) => void;
  isVerySmallWindow: boolean;
}> = ({ selectedItem, onItemSelect, isVerySmallWindow }) => {
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
    const matchesSearch = t(value.name)
      .toLowerCase()
      .trim()
      .includes(searchText.toLowerCase().trim());

    const matchesSkill = skillFilter === "all" || value.skill === skillFilter;

    return matchesSearch && matchesSkill;
  });

  return (
    <div
      style={{
        flex: "1 1 0",
        display: "flex",
        flexDirection: "column",
        border: "1px solid var(--border-color)",
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
                color: "var(--text-color)",
                opacity: 0.6,
              }}
            >
              {t("itemSelection.noItemsFound")}
            </div>
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: `repeat(${
                  isVerySmallWindow ? 1 : 2
                }, 1fr)`,
                gap: 10,
              }}
            >
              {filteredItems.map(([key, value]) => {
                const rate = value.itemRate || value.potionRate || 0;
                const isSelected = selectedItem === key;
                let skillName = t("itemSelection.mixedCooking");

                if (value.skill === "special_pharmacy") {
                  skillName = t("itemSelection.specialPharmacy");
                } else if (value.skill === "potion_creation") {
                  skillName = t("itemSelection.potionCreation");
                }

                return (
                  <div>
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
                          ? "2px solid var(--selected-border)"
                          : `1px solid var(--border-color)`,
                        backgroundColor: isSelected
                          ? "var(--selected-background)"
                          : "var(--card-background)",
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
                          src={`${ITEM_IMAGE_URL}/${value.id}.png`}
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
                          <div
                            style={{
                              color: "var(--text-color)",
                              opacity: 0.7,
                              fontSize: "10px",
                            }}
                          >
                            {skillName}
                          </div>
                          <div
                            style={{
                              color: "var(--text-color)",
                              opacity: 0.7,
                              fontSize: "10px",
                            }}
                          >
                            Rate: {rate > 0 ? "+" : ""}
                            {rate}
                          </div>
                        </div>
                      </div>
                    </Card>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Items;
