import { Card, Col, Form, InputNumber, Row, type FormInstance } from "antd";
import { useEffect, type FC } from "react";
import { useTranslation } from "react-i18next";
import type { FormValues } from "../types";
import { FORM_STORAGE_KEY } from "../constants";

const CharacterStats: FC<{
  form: FormInstance<FormValues>;
  onChange: (values: FormValues) => void;
}> = ({ form, onChange }) => {
  const { t } = useTranslation();

  useEffect(() => {
    try {
      const stringSavedData = localStorage.getItem(FORM_STORAGE_KEY);

      if (stringSavedData) {
        const savedData = JSON.parse(stringSavedData) as FormValues;
        form.setFieldsValue(savedData);
      }
    } catch (error) {
      console.error("Error loading saved data:", error);
    }
  }, []);

  // const defaultFormValues: FormValues = {
  //   int: 99,
  //   dex: 99,
  //   luk: 99,
  //   jobLevel: 50,
  //   baseLevel: 99,
  //   potionResearchLevel: 10,
  //   fullChemicalProtectionLevel: 5,
  //   specialPharmacyLevel: 10,
  //   preparePotionLevel: 10,
  //   instructionChangeLevel: 5,
  // };

  return (
    <Card title={t("characterStats.title")} size="small">
      <Form
        form={form}
        layout="vertical"
        requiredMark={false}
        onValuesChange={(_, formValues) => {
          localStorage.setItem(FORM_STORAGE_KEY, JSON.stringify(formValues));
          onChange(formValues);
        }}
      >
        <Row gutter={8}>
          <Col span={5}>
            <Form.Item
              label={t("characterStats.int")}
              name="int"
              rules={[
                {
                  required: true,
                  message: t("validation.intRequired"),
                },
              ]}
            >
              <InputNumber
                min={1}
                max={999}
                style={{ width: "100%" }}
                size="small"
              />
            </Form.Item>
          </Col>
          <Col span={5}>
            <Form.Item
              label={t("characterStats.dex")}
              name="dex"
              rules={[
                {
                  required: true,
                  message: t("validation.dexRequired"),
                },
              ]}
            >
              <InputNumber
                min={1}
                max={999}
                style={{ width: "100%" }}
                size="small"
              />
            </Form.Item>
          </Col>
          <Col span={5}>
            <Form.Item
              label={t("characterStats.luk")}
              name="luk"
              rules={[
                {
                  required: true,
                  message: t("validation.lukRequired"),
                },
              ]}
            >
              <InputNumber
                min={1}
                max={999}
                style={{ width: "100%" }}
                size="small"
              />
            </Form.Item>
          </Col>
          <Col span={5}>
            <Form.Item
              label={t("characterStats.baseLevel")}
              name="baseLevel"
              rules={[
                {
                  required: true,
                  message: t("validation.baseLevelRequired"),
                },
              ]}
            >
              <InputNumber
                min={1}
                max={999}
                style={{ width: "100%" }}
                size="small"
              />
            </Form.Item>
          </Col>
          <Col span={4}>
            <Form.Item
              label={t("characterStats.jobLevel")}
              name="jobLevel"
              rules={[
                {
                  required: true,
                  message: t("validation.jobLevelRequired"),
                },
              ]}
            >
              <InputNumber
                min={1}
                max={70}
                style={{ width: "100%" }}
                size="small"
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={8} style={{ marginTop: "4px" }}>
          <Col span={5}>
            <Form.Item
              label={t("characterStats.potionResearchLevel")}
              name="potionResearchLevel"
              rules={[
                {
                  required: true,
                  message: t("validation.potionResearchRequired"),
                },
              ]}
            >
              <InputNumber
                min={0}
                max={10}
                style={{ width: "100%" }}
                size="small"
              />
            </Form.Item>
          </Col>
          <Col span={5}>
            <Form.Item
              label={t("characterStats.fullChemicalProtectionLevel")}
              name="fullChemicalProtectionLevel"
              rules={[
                {
                  required: true,
                  message: t("validation.fcpRequired"),
                },
              ]}
            >
              <InputNumber
                min={0}
                max={5}
                style={{ width: "100%" }}
                size="small"
              />
            </Form.Item>
          </Col>
          <Col span={5}>
            <Form.Item
              label={t("characterStats.specialPharmacyLevel")}
              name="specialPharmacyLevel"
              rules={[
                {
                  required: true,
                  message: t("validation.specialPharmacyRequired"),
                },
              ]}
            >
              <InputNumber
                min={1}
                max={10}
                style={{ width: "100%" }}
                size="small"
              />
            </Form.Item>
          </Col>
          <Col span={5}>
            <Form.Item
              label={t("characterStats.preparePotionLevel")}
              name="preparePotionLevel"
              rules={[
                {
                  required: true,
                  message: t("validation.preparePotionRequired"),
                },
              ]}
            >
              <InputNumber
                min={0}
                max={10}
                style={{ width: "100%" }}
                size="small"
              />
            </Form.Item>
          </Col>
          <Col span={4}>
            <Form.Item
              label={t("characterStats.instructionChangeLevel")}
              name="instructionChangeLevel"
              rules={[
                {
                  required: true,
                  message: t("validation.instructionChangeRequired"),
                },
              ]}
            >
              <InputNumber
                min={0}
                max={5}
                style={{ width: "100%" }}
                size="small"
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Card>
  );
};

export default CharacterStats;
