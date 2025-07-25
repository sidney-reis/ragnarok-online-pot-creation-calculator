import { useState, useEffect } from "react";
import {
  Form,
  InputNumber,
  Card,
  Row,
  Col,
  Typography,
  Space,
  Divider,
  Statistic,
  Input,
  Select,
} from "antd";
import { useTranslation } from "react-i18next";
import i18n from "./i18n";
import "./App.css";
import type { FormValues, SimulationResult, StorageState } from "./types";
import { itemTypes, STORAGE_KEY } from "./constants";
import FormulaResult from "./components/FormulaResult";
import calculatePreciseResults from "./helpers/calculatePreciseResults";
import calculateStatistics from "./helpers/calculateStatistics";

const { Title, Text } = Typography;

function App() {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const [results, setResults] = useState<SimulationResult[]>([]);
  const [selectedItemType, setSelectedItemType] = useState<string>(
    "enriched_white_potionz"
  );
  const [searchText, setSearchText] = useState<string>("");
  const [skillFilter, setSkillFilter] = useState<string>("all");
  const [isFormulaCollapsed, setIsFormulaCollapsed] = useState<boolean>(true);
  const [isInitialized, setIsInitialized] = useState<boolean>(false);

  // Load saved data from localStorage
  const loadSavedData = () => {
    try {
      const savedData = localStorage.getItem(STORAGE_KEY);

      if (savedData) {
        return JSON.parse(savedData);
      }
    } catch (error) {
      console.error("Error loading saved data:", error);
    }

    return null;
  };

  // Save data to localStorage
  const saveData = (data: StorageState) => {
    try {
      const jsonString = JSON.stringify(data);
      localStorage.setItem(STORAGE_KEY, jsonString);
    } catch (error) {
      console.error("Error saving data:", error);
      console.error("Data that failed to save:", data);
    }
  };

  // Initialize form with saved data
  useEffect(() => {
    const initializeApp = async () => {
      const savedData = loadSavedData();

      const defaultFormValues = {
        int: 99,
        dex: 99,
        luk: 99,
        jobLevel: 50,
        baseLevel: 99,
        potionResearchLevel: 10,
        fullChemicalProtectionLevel: 5,
        specialPharmacyLevel: 10,
        preparePotionLevel: 10,
        instructionChangeLevel: 5,
        itemType: "enriched_white_potionz",
      };

      let finalFormValues = defaultFormValues;

      if (savedData && savedData.selectedItemType) {
        console.log("Loading saved data:", savedData);

        // Set selected item type first
        const savedItemType = savedData.selectedItemType;
        setSelectedItemType(savedItemType);

        // Set form values including the saved itemType
        finalFormValues = {
          ...defaultFormValues,
          itemType: savedItemType,
          ...savedData.formValues, // Override with saved values
        };

        // Set formula collapse preference
        if (typeof savedData.isFormulaCollapsed === "boolean") {
          setIsFormulaCollapsed(savedData.isFormulaCollapsed);
        }
      } else {
        console.log("No saved data found, using defaults");
      }

      // Set form values
      form.setFieldsValue(finalFormValues);

      // Auto-calculate results after initialization
      setTimeout(() => {
        const preciseResults = calculatePreciseResults(finalFormValues);
        setResults(preciseResults);
        setIsInitialized(true);
      }, 100);
    };

    initializeApp();
  }, [form]);

  // Save data whenever form values or selected item changes (only after initialization)
  useEffect(() => {
    if (!isInitialized) return;

    const formValues = form.getFieldsValue();
    const cleanFormValues = {
      int: formValues.int,
      dex: formValues.dex,
      luk: formValues.luk,
      jobLevel: formValues.jobLevel,
      baseLevel: formValues.baseLevel,
      potionResearchLevel: formValues.potionResearchLevel,
      fullChemicalProtectionLevel: formValues.fullChemicalProtectionLevel,
      specialPharmacyLevel: formValues.specialPharmacyLevel,
      preparePotionLevel: formValues.preparePotionLevel,
      instructionChangeLevel: formValues.instructionChangeLevel,
      itemType: formValues.itemType,
    };
    const dataToSave = {
      selectedItemType,
      formValues: cleanFormValues,
      isFormulaCollapsed,
    };
    saveData(dataToSave);
  }, [selectedItemType, isFormulaCollapsed, isInitialized]);

  const onFinish = async (values: FormValues) => {
    // Calculate precise results
    const preciseResults = calculatePreciseResults(values);
    setResults(preciseResults);
  };

  const statistics = results.length > 0 ? calculateStatistics(results) : [];

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

  const skillUsed = results.length > 0 ? results[0].skill : null;
  const selectedItemData =
    selectedItemType && itemTypes[selectedItemType]
      ? itemTypes[selectedItemType]
      : itemTypes["enriched_white_potionz"];

  const handleItemSelect = (itemKey: string) => {
    setSelectedItemType(itemKey);
    form.setFieldValue("itemType", itemKey);

    // Immediately save to localStorage when item is selected
    if (isInitialized) {
      const formValues = form.getFieldsValue();
      const cleanFormValues = {
        int: formValues.int,
        dex: formValues.dex,
        luk: formValues.luk,
        jobLevel: formValues.jobLevel,
        baseLevel: formValues.baseLevel,
        potionResearchLevel: formValues.potionResearchLevel,
        fullChemicalProtectionLevel: formValues.fullChemicalProtectionLevel,
        specialPharmacyLevel: formValues.specialPharmacyLevel,
        preparePotionLevel: formValues.preparePotionLevel,
        instructionChangeLevel: formValues.instructionChangeLevel,
        itemType: itemKey,
      };
      const dataToSave = {
        selectedItemType: itemKey,
        formValues: cleanFormValues,
        isFormulaCollapsed,
      };
      console.log("Saving data:", dataToSave);
      saveData(dataToSave);

      // Automatically submit the form when item is selected
      form.submit();
    }
  };

  const filteredItems = Object.values(itemTypes).filter((value) => {
    const matchesSearch = value.name
      .toLowerCase()
      .includes(searchText.toLowerCase());

    const matchesSkill = skillFilter === "all" || value.skill === skillFilter;

    return matchesSearch && matchesSkill;
  });

  const handleLanguageChange = (language: string) => {
    i18n.changeLanguage(language);
    // Save language preference to localStorage
    try {
      localStorage.setItem("ragnarok-simulator-language", language);
    } catch (error) {
      console.error("Error saving language preference:", error);
    }
  };

  // Helper function to translate item names and book names
  const translateText = (text: string): string => {
    if (
      text.startsWith("items.") ||
      text.startsWith("books.") ||
      text.startsWith("materials.")
    ) {
      return t(text);
    }
    return text;
  };

  return (
    <div style={{ padding: 16, paddingBottom: 0 }}>
      <div
        style={{
          display: "flex",
          marginBottom: 16,
          justifyContent: "space-between",
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
          }}
        >
          <Space>
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
          </Space>
        </div>
      </div>

      <Row gutter={[24, 24]} style={{ height: "calc(100vh - 64px)" }}>
        <Col xs={24} lg={12} style={{ maxWidth: "600px", height: "100%" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "24px",
              height: "100%",
            }}
          >
            <Card title={t("characterStats.title")} size="small">
              <Form
                form={form}
                layout="vertical"
                requiredMark={false}
                onFinish={onFinish}
                onValuesChange={() => {
                  // Save form data whenever any field changes and auto-calculate results
                  if (isInitialized) {
                    setTimeout(() => {
                      const formValues = form.getFieldsValue();
                      const cleanFormValues = {
                        int: formValues.int,
                        dex: formValues.dex,
                        luk: formValues.luk,
                        jobLevel: formValues.jobLevel,
                        baseLevel: formValues.baseLevel,
                        potionResearchLevel: formValues.potionResearchLevel,
                        fullChemicalProtectionLevel:
                          formValues.fullChemicalProtectionLevel,
                        specialPharmacyLevel: formValues.specialPharmacyLevel,
                        preparePotionLevel: formValues.preparePotionLevel,
                        instructionChangeLevel:
                          formValues.instructionChangeLevel,
                        itemType: formValues.itemType,
                      };
                      const dataToSave = {
                        selectedItemType,
                        formValues: cleanFormValues,
                        isFormulaCollapsed,
                      };
                      saveData(dataToSave);

                      // Auto-calculate results when form values change
                      const preciseResults =
                        calculatePreciseResults(cleanFormValues);
                      setResults(preciseResults);
                    }, 100);
                  }
                }}
              >
                <Form.Item name="itemType" style={{ display: "none" }}>
                  <input type="hidden" />
                </Form.Item>

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
                      iconUrl =
                        "https://irowiki.org/w/images/5/53/Prepare_Potion.png";
                      skillName = t("itemSelection.potionCreation");
                    } else if (option.value === "mixed_cooking") {
                      iconUrl =
                        "https://irowiki.org/w/images/3/35/Mixed_Cooking.png";
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
                        const skillName =
                          value.skill === "special_pharmacy"
                            ? t("itemSelection.specialPharmacy")
                            : value.skill === "potion_creation"
                            ? t("itemSelection.potionCreation")
                            : t("itemSelection.mixedCooking");
                        const isSelected = selectedItemType === key;

                        return (
                          <Col span={12} key={key}>
                            <Card
                              size="small"
                              hoverable
                              onClick={() => handleItemSelect(key)}
                              style={{
                                cursor: "pointer",
                                border: isSelected
                                  ? "2px solid #1890ff"
                                  : "1px solid #d9d9d9",
                                backgroundColor: isSelected
                                  ? "#f0f8ff"
                                  : "white",
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
                                    {translateText(value.name)}
                                  </div>
                                  <div
                                    style={{ color: "#666", fontSize: "10px" }}
                                  >
                                    {skillName}
                                  </div>
                                  <div
                                    style={{
                                      color: rate >= 0 ? "#52c41a" : "#ff4d4f",
                                      fontSize: "10px",
                                    }}
                                  >
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
          </div>
        </Col>

        <Col xs={24} lg={8}>
          {results.length > 0 && (
            <Space direction="vertical" style={{ width: "100%" }} size="large">
              <Card title={t("calculationResults.title")} size="small">
                <Row gutter={16}>
                  <Col span={24}>
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
                  </Col>
                </Row>
                <Row gutter={16} style={{ marginTop: "16px" }}>
                  <Col span={12}>
                    <Statistic
                      title={t("calculationResults.averageCreationValue")}
                      value={avgCreation}
                      precision={2}
                    />
                  </Col>
                  <Col span={12}>
                    <Statistic
                      title={t("calculationResults.averageItemsCreated")}
                      value={avgPotions}
                      precision={2}
                    />
                  </Col>
                </Row>
              </Card>

              <Card
                title={t("calculationResults.probabilityTitle")}
                size="small"
              >
                <Space direction="vertical" style={{ width: "100%" }}>
                  {statistics.map((stat) => {
                    // Determine color based on skill type and relative performance
                    let colorType: "success" | "warning" | "error" | "neutral" =
                      "neutral";

                    if (skillUsed === "potion_creation") {
                      // For potion creation: 1 = success (green), 0 = failure (red)
                      colorType = stat.potions === 1 ? "success" : "error";
                    } else if (skillUsed === "special_pharmacy") {
                      // For special pharmacy: relative to max possible (7-12 depending on level)
                      const maxPossible = Math.max(
                        ...statistics.map((s) => s.potions)
                      );
                      const minPossible = Math.min(
                        ...statistics.map((s) => s.potions)
                      );
                      const range = maxPossible - minPossible;

                      if (
                        stat.potions >=
                        maxPossible - Math.floor(range * 0.2)
                      ) {
                        colorType = "success"; // Top 20% of results
                      } else if (
                        stat.potions >=
                        maxPossible - Math.floor(range * 0.6)
                      ) {
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

                    const colors = {
                      success: {
                        bg: "#f6ffed",
                        border: "#b7eb8f",
                        dot: "#52c41a",
                      },
                      warning: {
                        bg: "#fffbe6",
                        border: "#ffe58f",
                        dot: "#faad14",
                      },
                      error: {
                        bg: "#fff2f0",
                        border: "#ffccc7",
                        dot: "#ff4d4f",
                      },
                      neutral: {
                        bg: "#fafafa",
                        border: "#d9d9d9",
                        dot: "#8c8c8c",
                      },
                    };

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
                </Space>
              </Card>
            </Space>
          )}

          {results.length === 0 && (
            <Card>
              <div style={{ textAlign: "center", padding: "48px 0" }}>
                <Text type="secondary">
                  {t("calculationResults.noResults")}
                </Text>
              </div>
            </Card>
          )}
        </Col>

        <Col xs={24} lg={8}>
          {results.length > 0 && (
            <Space direction="vertical" style={{ width: "100%" }} size="large">
              <Card title={t("formulaInfo.title")} size="small">
                <FormulaResult skill={skillUsed} />
              </Card>
              {/* Materials and Requirements Section */}
              {selectedItemData.materials?.length && (
                <Card title={t("materialsSection.title")} size="small">
                  <Space
                    direction="vertical"
                    style={{ width: "100%" }}
                    size="small"
                  >
                    {selectedItemData.book && (
                      <div>
                        <Text strong>{t("materialsSection.requiredBook")}</Text>
                        <div
                          style={{
                            marginTop: "8px",
                            padding: "8px",
                            backgroundColor: "#f5f5f5",
                            borderRadius: "4px",
                          }}
                        >
                          <Text>{translateText(selectedItemData.book)}</Text>
                        </div>
                      </div>
                    )}

                    <div>
                      <Text strong>
                        {t("materialsSection.materialsNeeded")}
                      </Text>
                      <div style={{ marginTop: "8px" }}>
                        <Space
                          direction="vertical"
                          style={{ width: "100%" }}
                          size="small"
                        >
                          {selectedItemData.materials.map((material, index) => (
                            <div
                              key={index}
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "12px",
                                padding: "8px",
                                backgroundColor: "#fafafa",
                                borderRadius: "4px",
                                border: "1px solid #e8e8e8",
                              }}
                            >
                              {material.icon && (
                                <img
                                  src={material.icon}
                                  alt={material.name}
                                  style={{ width: "24px", height: "24px" }}
                                />
                              )}
                              <div style={{ flex: 1 }}>
                                <Text>{translateText(material.name)}</Text>
                              </div>
                              <div>
                                <Text strong>×{material.quantity}</Text>
                              </div>
                            </div>
                          ))}
                        </Space>
                      </div>
                    </div>
                  </Space>
                </Card>
              )}
            </Space>
          )}

          {results.length === 0 && (
            <Card>
              <div style={{ textAlign: "center", padding: "48px 0" }}>
                <Text type="secondary">
                  {t("calculationResults.noResults")}
                </Text>
              </div>
            </Card>
          )}
        </Col>
      </Row>
    </div>
  );
}

export default App;
