import { Card, Statistic } from "antd";
import type { FC } from "react";
import { useTranslation } from "react-i18next";
import type { SimulationResult } from "../types";

const CalculationResults: FC<{ results: SimulationResult[] }> = ({
  results,
}) => {
  const { t } = useTranslation();
  const skillUsed = results.length > 0 ? results[0].skill : null;

  const avgCreation =
    results.length > 0
      ? (
          results.reduce((sum, r) => sum + r.creation, 0) / results.length
        ).toFixed(2)
      : 0;

  const avgPotions =
    results.length > 0
      ? (
          results.reduce((sum, r) => sum + r.potionsCreated, 0) / results.length
        ).toFixed(2)
      : 0;

  return (
    <Card title={t("calculationResults.title")} size="small">
      <div className="results-card">
        <div>
          <div>
            <Statistic
              title={t("calculationResults.skillUsed")}
              value={
                skillUsed === "special_pharmacy"
                  ? t("itemSelection.specialPharmacy")
                  : skillUsed === "potion_creation"
                  ? t("itemSelection.potionCreation")
                  : t("itemSelection.mixedCooking")
              }
              formatter={(value) => (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    justifyContent: "center",
                  }}
                >
                  <img
                    src={
                      skillUsed === "special_pharmacy"
                        ? "https://irowiki.org/w/images/1/13/Special_Pharmacy.png"
                        : skillUsed === "potion_creation"
                        ? "https://irowiki.org/w/images/5/53/Prepare_Potion.png"
                        : "https://irowiki.org/w/images/3/35/Mixed_Cooking.png"
                    }
                    alt={
                      skillUsed === "special_pharmacy"
                        ? t("itemSelection.specialPharmacy")
                        : skillUsed === "potion_creation"
                        ? t("itemSelection.potionCreation")
                        : t("itemSelection.mixedCooking")
                    }
                    style={{ width: "20px", height: "20px" }}
                  />
                  <span>{value}</span>
                </div>
              )}
            />
          </div>
        </div>
        <div>
          <div>
            <Statistic
              title={t("calculationResults.averageCreationValue")}
              value={avgCreation}
              precision={2}
            />
          </div>
          <div>
            <Statistic
              title={t("calculationResults.averageItemsCreated")}
              value={avgPotions}
              precision={2}
            />
          </div>
        </div>
      </div>
    </Card>
  );
};

export default CalculationResults;
