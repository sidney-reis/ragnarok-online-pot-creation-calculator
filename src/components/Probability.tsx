import { Card, Typography } from "antd";
import { useTranslation } from "react-i18next";
import type { FC } from "react";
import type { SimulationResult } from "../types";
import { colors } from "../constants";

const { Text } = Typography;

const Probability: FC<{ results: SimulationResult[] }> = ({ results }) => {
  const { t } = useTranslation();
  const potionCounts: Record<number, number> = {};

  results.forEach((result) => {
    potionCounts[result.potionsCreated] =
      (potionCounts[result.potionsCreated] || 0) + 1;
  });

  const statistics =
    results.length > 0
      ? Object.entries(potionCounts)
          .map(([potions, count]) => ({
            potions: parseInt(potions),
            count,
            percentage: ((count / results.length) * 100).toFixed(2),
          }))
          .sort((a, b) => b.potions - a.potions)
      : [];

  const skillUsed = results.length > 0 ? results[0].skill : null;

  return (
    <Card title={t("calculationResults.probabilityTitle")} size="small">
      <div className="results-card">
        {statistics.map((stat) => {
          // Determine color based on skill type and relative performance
          let colorType: "success" | "warning" | "error" | "neutral" =
            "neutral";

          if (skillUsed === "potion_creation") {
            // For potion creation: 1 = success (green), 0 = failure (red)
            colorType = stat.potions === 1 ? "success" : "error";
          } else if (skillUsed === "special_pharmacy") {
            // For special pharmacy: relative to max possible (7-12 depending on level)
            const maxPossible = Math.max(...statistics.map((s) => s.potions));
            const minPossible = Math.min(...statistics.map((s) => s.potions));
            const range = maxPossible - minPossible;

            if (stat.potions >= maxPossible - Math.floor(range * 0.2)) {
              colorType = "success"; // Top 20% of results
            } else if (stat.potions >= maxPossible - Math.floor(range * 0.6)) {
              colorType = "warning"; // Middle 40% of results
            } else {
              colorType = "error"; // Bottom 40% of results
            }
          } else if (skillUsed === "mixed_cooking") {
            // For mixed cooking: relative performance, 0 = failure
            if (stat.potions === 0) {
              colorType = "error"; // Complete failure
            } else if (stat.potions >= 10) {
              colorType = "success"; // Good results
            } else if (stat.potions >= 8) {
              colorType = "warning"; // Decent results
            } else {
              colorType = "error"; // Poor results
            }
          }

          return (
            <div
              key={stat.potions}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "12px 16px",
                backgroundColor: colors[colorType].bg,
                border: `1px solid ${colors[colorType].border}`,
                borderRadius: "6px",
                marginBottom: "8px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <div
                  style={{
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    backgroundColor: colors[colorType].dot,
                  }}
                />
                <Text strong>
                  {stat.potions} {t("calculationResults.potions")}
                </Text>
              </div>
              <Text strong style={{ fontSize: "16px" }}>
                {stat.percentage}%
              </Text>
            </div>
          );
        })}
      </div>
    </Card>
  );
};

export default Probability;
