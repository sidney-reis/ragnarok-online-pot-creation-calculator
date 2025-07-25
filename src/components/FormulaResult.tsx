import type { FC } from "react";
import type { Skill } from "../types";
import { Card, Typography } from "antd";
import { useTranslation } from "react-i18next";

const { Text } = Typography;

const FormulaResult: FC<{ skill: Skill | null }> = ({ skill }) => {
  const { t } = useTranslation();

  if (skill === "special_pharmacy") {
    return (
      <Card title={t("formulaInfo.title")} size="small">
        <div className="results-card">
          <Text>
            <strong>{t("formulaInfo.specialPharmacy.creationFormula")}</strong>
            <br />
            {t("formulaInfo.specialPharmacy.creationFormulaText")}
          </Text>
          <br />
          <br />
          <Text>
            <strong>
              {t("formulaInfo.specialPharmacy.difficultyFormula")}
            </strong>
            <br />
            {t("formulaInfo.specialPharmacy.difficultyFormulaText")}
          </Text>
          <br />
          <br />
          <Text>
            <strong>
              {t("formulaInfo.specialPharmacy.successConditions")}
            </strong>
            <br />• {t("formulaInfo.specialPharmacy.condition1")}
            <br />• {t("formulaInfo.specialPharmacy.condition2")}
            <br />• {t("formulaInfo.specialPharmacy.condition3")}
            <br />• {t("formulaInfo.specialPharmacy.condition4")}
            <br />• {t("formulaInfo.specialPharmacy.condition5")}
          </Text>
        </div>
      </Card>
    );
  }

  if (skill === "potion_creation") {
    return (
      <Card title={t("formulaInfo.title")} size="small">
        <div className="results-card">
          <Text>
            <strong>
              {t("formulaInfo.potionCreation.brewingRateFormula")}
            </strong>
            <br />
            {t("formulaInfo.potionCreation.brewingRateFormulaText")}
          </Text>
          <br />
          <br />
          <Text>
            <strong>{t("formulaInfo.potionCreation.successCondition")}</strong>
            <br />
            {t("formulaInfo.potionCreation.successConditionText1")}
            <br />
            {t("formulaInfo.potionCreation.successConditionText2")}
          </Text>
        </div>
      </Card>
    );
  }

  if (skill === "mixed_cooking") {
    return (
      <Card title={t("formulaInfo.title")} size="small">
        <div className="results-card">
          <Text>
            <strong>{t("formulaInfo.mixedCooking.creationFormula")}</strong>
            <br />
            {t("formulaInfo.mixedCooking.creationFormulaText")}
          </Text>
          <br />
          <br />
          <Text>
            <strong>{t("formulaInfo.mixedCooking.difficultyFormula")}</strong>
            <br />
            {t("formulaInfo.mixedCooking.difficultyFormulaText")}
          </Text>
          <br />
          <br />
          <Text>
            <strong>{t("formulaInfo.mixedCooking.successConditions")}</strong>
            <br />• {t("formulaInfo.mixedCooking.condition1")}
            <br />• {t("formulaInfo.mixedCooking.condition2")}
            <br />• {t("formulaInfo.mixedCooking.condition3")}
            <br />• {t("formulaInfo.mixedCooking.condition4")}
            <br />• {t("formulaInfo.mixedCooking.condition5")}
          </Text>
        </div>
      </Card>
    );
  }

  return null;
};

export default FormulaResult;
