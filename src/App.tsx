import React, { useState } from "react";
import {
  Form,
  InputNumber,
  Button,
  Card,
  Row,
  Col,
  Typography,
  Space,
  Divider,
  Alert,
  Statistic,
} from "antd";
import "./App.css";

const { Title, Text } = Typography;

interface FormValues {
  int: number;
  dex: number;
  luk: number;
  jobLevel: number;
  baseLevel: number;
  potionResearchLevel: number;
  fullChemicalProtectionLevel: number;
  specialPharmacyLevel: number;
  preparePotionLevel: number;
  instructionChangeLevel: number;
  itemType: string;
}

interface SpecialPharmacyData {
  specificValue: number;
  maxPotions: number;
}

const specialPharmacyTable: Record<number, SpecialPharmacyData> = {
  1: { specificValue: 600, maxPotions: 7 },
  2: { specificValue: 580, maxPotions: 8 },
  3: { specificValue: 560, maxPotions: 8 },
  4: { specificValue: 540, maxPotions: 9 },
  5: { specificValue: 520, maxPotions: 9 },
  6: { specificValue: 500, maxPotions: 10 },
  7: { specificValue: 480, maxPotions: 10 },
  8: { specificValue: 460, maxPotions: 11 },
  9: { specificValue: 440, maxPotions: 11 },
  10: { specificValue: 420, maxPotions: 12 },
};

interface ItemTypeData {
  name: string;
  itemRate?: number; // For Special Pharmacy items
  potionRate?: number; // For Potion Creation items
  icon: string;
  skill: "special_pharmacy" | "potion_creation";
}

const itemTypes: Record<string, ItemTypeData> = {
  // Special Pharmacy items
  thorn_plant_seed: {
    name: "Thorn Plant Seed",
    itemRate: 30,
    icon: "https://irowiki.org/images/db/item/6210.png",
    skill: "special_pharmacy",
  },
  blood_sucker_plant_seed: {
    name: "Blood Sucker Plant Seed",
    itemRate: 30,
    icon: "https://irowiki.org/images/db/item/6211.png",
    skill: "special_pharmacy",
  },
  bomb_mushroom_spore: {
    name: "Bomb Mushroom Spore",
    itemRate: 15,
    icon: "https://irowiki.org/images/db/item/6212.png",
    skill: "special_pharmacy",
  },
  enriched_white_potionz: {
    name: "Enriched White PotionZ",
    itemRate: 10,
    icon: "https://irowiki.org/images/db/item/12428.png",
    skill: "special_pharmacy",
  },
  vitata500: {
    name: "Vitata500",
    itemRate: 20,
    icon: "https://irowiki.org/images/db/item/12436.png",
    skill: "special_pharmacy",
  },
  enrich_celermine_juice: {
    name: "Enrich Celermine Juice",
    itemRate: 30,
    icon: "https://irowiki.org/images/db/item/12437.png",
    skill: "special_pharmacy",
  },
  cure_free: {
    name: "Cure Free",
    itemRate: 40,
    icon: "https://irowiki.org/images/db/item/12475.png",
    skill: "special_pharmacy",
  },
  concentrated_red_syrup: {
    name: "Concentrated Red Syrup Potion",
    itemRate: 100,
    icon: "https://irowiki.org/images/db/item/1100003.png",
    skill: "special_pharmacy",
  },
  concentrated_blue_syrup: {
    name: "Concentrated Blue Syrup Potion",
    itemRate: 130,
    icon: "https://irowiki.org/images/db/item/1100004.png",
    skill: "special_pharmacy",
  },
  concentrated_golden_syrup: {
    name: "Concentrated Golden Syrup Potion",
    itemRate: 150,
    icon: "https://irowiki.org/images/db/item/1100005.png",
    skill: "special_pharmacy",
  },
  red_herb_activator: {
    name: "Red Herb Activator",
    itemRate: 100,
    icon: "https://irowiki.org/images/db/item/100232.png",
    skill: "special_pharmacy",
  },
  blue_herb_activator: {
    name: "Blue Herb Activator",
    itemRate: 100,
    icon: "https://irowiki.org/images/db/item/100233.png",
    skill: "special_pharmacy",
  },
  golden_x_potion: {
    name: "Golden X Potion",
    itemRate: 145,
    icon: "https://irowiki.org/images/db/item/100231.png",
    skill: "special_pharmacy",
  },
  increase_hp_small: {
    name: "Increase HP Potion (Small)",
    itemRate: 10,
    icon: "https://irowiki.org/images/db/item/12422.png",
    skill: "special_pharmacy",
  },
  increase_hp_medium: {
    name: "Increase HP Potion (Medium)",
    itemRate: 20,
    icon: "https://irowiki.org/images/db/item/12423.png",
    skill: "special_pharmacy",
  },
  increase_hp_large: {
    name: "Increase HP Potion (Large)",
    itemRate: 40,
    icon: "https://irowiki.org/images/db/item/12424.png",
    skill: "special_pharmacy",
  },
  increase_sp_small: {
    name: "Increase SP Potion (Small)",
    itemRate: 10,
    icon: "https://irowiki.org/images/db/item/12425.png",
    skill: "special_pharmacy",
  },
  increase_sp_medium: {
    name: "Increase SP Potion (Medium)",
    itemRate: 15,
    icon: "https://irowiki.org/images/db/item/12426.png",
    skill: "special_pharmacy",
  },
  increase_sp_large: {
    name: "Increase SP Potion (Large)",
    itemRate: 20,
    icon: "https://irowiki.org/images/db/item/12427.png",
    skill: "special_pharmacy",
  },
  // Potion Creation items
  red_potion: {
    name: "Red Potion",
    potionRate: 20, // +15% ~ +25% average
    icon: "https://irowiki.org/images/db/item/501.png",
    skill: "potion_creation",
  },
  yellow_potion: {
    name: "Yellow Potion",
    potionRate: 20, // +15% ~ +25% average
    icon: "https://irowiki.org/images/db/item/503.png",
    skill: "potion_creation",
  },
  white_potion: {
    name: "White Potion",
    potionRate: 20, // +15% ~ +25% average
    icon: "https://irowiki.org/images/db/item/504.png",
    skill: "potion_creation",
  },
  blue_potion: {
    name: "Blue Potion",
    potionRate: -5,
    icon: "https://irowiki.org/images/db/item/505.png",
    skill: "potion_creation",
  },
  anodyne: {
    name: "Anodyne",
    potionRate: -5,
    icon: "https://irowiki.org/images/db/item/605.png",
    skill: "potion_creation",
  },
  aloevera: {
    name: "Aloevera",
    potionRate: -5,
    icon: "https://irowiki.org/images/db/item/606.png",
    skill: "potion_creation",
  },
  alcohol: {
    name: "Alcohol",
    potionRate: 10, // +5% ~ +15% average
    icon: "https://irowiki.org/images/db/item/970.png",
    skill: "potion_creation",
  },
  embryo: {
    name: "Embryo",
    potionRate: -5,
    icon: "https://irowiki.org/images/db/item/7142.png",
    skill: "potion_creation",
  },
  homunculus_tablet: {
    name: "Homunculus Tablet",
    potionRate: -5,
    icon: "https://irowiki.org/images/db/item/100371.png",
    skill: "potion_creation",
  },
  condensed_red_potion: {
    name: "Condensed Red Potion",
    potionRate: -5,
    icon: "https://irowiki.org/images/db/item/545.png",
    skill: "potion_creation",
  },
  condensed_yellow_potion: {
    name: "Condensed Yellow Potion",
    potionRate: -7, // -10% ~ -5% average
    icon: "https://irowiki.org/images/db/item/546.png",
    skill: "potion_creation",
  },
  condensed_white_potion: {
    name: "Condensed White Potion",
    potionRate: -10, // -15% ~ -5% average
    icon: "https://irowiki.org/images/db/item/547.png",
    skill: "potion_creation",
  },
  acid_bottle: {
    name: "Acid Bottle",
    potionRate: 0, // -5% ~ +5% average
    icon: "https://irowiki.org/images/db/item/7136.png",
    skill: "potion_creation",
  },
  bottle_grenade: {
    name: "Bottle Grenade",
    potionRate: 0, // -5% ~ +5% average
    icon: "https://irowiki.org/images/db/item/7135.png",
    skill: "potion_creation",
  },
  marine_sphere_bottle: {
    name: "Marine Sphere Bottle",
    potionRate: 0, // -5% ~ +5% average
    icon: "https://irowiki.org/images/db/item/7138.png",
    skill: "potion_creation",
  },
  plant_bottle: {
    name: "Plant Bottle",
    potionRate: 0, // -5% ~ +5% average
    icon: "https://irowiki.org/images/db/item/7137.png",
    skill: "potion_creation",
  },
  glistening_coat: {
    name: "Glistening Coat",
    potionRate: -10, // -15% ~ -5% average
    icon: "https://irowiki.org/images/db/item/7139.png",
    skill: "potion_creation",
  },
  coldproof_potion: {
    name: "Coldproof Potion",
    potionRate: -5,
    icon: "https://irowiki.org/images/db/item/12119.png",
    skill: "potion_creation",
  },
  earthproof_potion: {
    name: "Earthproof Potion",
    potionRate: -5,
    icon: "https://irowiki.org/images/db/item/12120.png",
    skill: "potion_creation",
  },
  thunderproof_potion: {
    name: "Thunderproof Potion",
    potionRate: -5,
    icon: "https://irowiki.org/images/db/item/12121.png",
    skill: "potion_creation",
  },
  fireproof_potion: {
    name: "Fireproof Potion",
    potionRate: -5,
    icon: "https://irowiki.org/images/db/item/12118.png",
    skill: "potion_creation",
  },
};

interface SimulationResult {
  creation: number;
  difficulty: number;
  difference: number;
  potionsCreated: number;
  successRate: string;
  skill: "special_pharmacy" | "potion_creation";
}

function App() {
  const [form] = Form.useForm();
  const [results, setResults] = useState<SimulationResult[]>([]);
  const [isCalculating, setIsCalculating] = useState(false);
  const [selectedItemType, setSelectedItemType] = useState<string>(
    "enriched_white_potionz"
  );

  const getRandomInRange = (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const calculateCreation = (values: FormValues): number => {
    const randomBonus = getRandomInRange(30, 150);
    const fcp = values.fullChemicalProtectionLevel * getRandomInRange(4, 10);

    return (
      values.int +
      Math.floor(values.dex / 2) +
      values.luk +
      values.jobLevel +
      randomBonus +
      (values.baseLevel - 100) +
      values.potionResearchLevel * 5 +
      fcp
    );
  };

  const calculatePotionsCreated = (
    creation: number,
    difficulty: number,
    maxPotions: number
  ): number => {
    const difference = creation - difficulty;

    if (difference >= 400) {
      return maxPotions;
    } else if (difference >= 300) {
      return maxPotions - 3;
    } else if (difference >= 100) {
      return maxPotions - 4;
    } else if (difference >= 1) {
      return maxPotions - 5;
    } else {
      return maxPotions - 6;
    }
  };

  const calculateBrewingRate = (values: FormValues): number => {
    return (
      values.preparePotionLevel * 3 +
      values.potionResearchLevel +
      values.instructionChangeLevel +
      values.jobLevel * 0.2 +
      values.dex * 0.1 +
      values.luk * 0.1 +
      values.int * 0.05
    );
  };

  const runSimulation = (
    values: FormValues,
    iterations: number = 1000
  ): SimulationResult[] => {
    const itemData = itemTypes[values.itemType];
    const results: SimulationResult[] = [];

    if (itemData.skill === "special_pharmacy") {
      // Special Pharmacy logic
      const pharmacyData = specialPharmacyTable[values.specialPharmacyLevel];
      const difficulty = pharmacyData.specificValue + (itemData.itemRate || 0);

      for (let i = 0; i < iterations; i++) {
        const creation = calculateCreation(values);
        const difference = creation - difficulty;
        const potionsCreated = calculatePotionsCreated(
          creation,
          difficulty,
          pharmacyData.maxPotions
        );

        results.push({
          creation,
          difficulty,
          difference,
          potionsCreated,
          successRate: "",
          skill: itemData.skill,
        });
      }
    } else {
      // Potion Creation logic
      const brewingRate =
        calculateBrewingRate(values) + (itemData.potionRate || 0);

      for (let i = 0; i < iterations; i++) {
        const success = Math.random() * 100 < brewingRate;

        results.push({
          creation: brewingRate,
          difficulty: 0,
          difference: brewingRate,
          potionsCreated: success ? 1 : 0,
          successRate: `${brewingRate.toFixed(1)}%`,
          skill: itemData.skill,
        });
      }
    }

    return results;
  };

  const calculateStatistics = (results: SimulationResult[]) => {
    const potionCounts: Record<number, number> = {};

    results.forEach((result) => {
      potionCounts[result.potionsCreated] =
        (potionCounts[result.potionsCreated] || 0) + 1;
    });

    const statistics = Object.entries(potionCounts).map(([potions, count]) => ({
      potions: parseInt(potions),
      count,
      percentage: ((count / results.length) * 100).toFixed(2),
    }));

    return statistics.sort((a, b) => b.potions - a.potions);
  };

  const onFinish = async (values: FormValues) => {
    setIsCalculating(true);

    // Run simulation
    const simulationResults = runSimulation(values, 10000);
    setResults(simulationResults);

    setIsCalculating(false);
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
  const selectedItemData = itemTypes[selectedItemType];

  const handleItemSelect = (itemKey: string) => {
    setSelectedItemType(itemKey);
    form.setFieldValue("itemType", itemKey);
  };

  return (
    <div style={{ padding: "24px", maxWidth: "1400px", margin: "0 auto" }}>
      <Title level={1} style={{ textAlign: "center", marginBottom: "32px" }}>
        Ragnarok Online Potion Creation Simulator
      </Title>

      <Row gutter={[24, 24]}>
        <Col xs={24} lg={8}>
          <Card title="Select Item to Create" size="small">
            <div style={{ maxHeight: "600px", overflowY: "auto" }}>
              <Space
                direction="vertical"
                style={{ width: "100%" }}
                size="small"
              >
                {Object.entries(itemTypes).map(([key, value]) => {
                  const rate = value.itemRate || value.potionRate || 0;
                  const skillName =
                    value.skill === "special_pharmacy"
                      ? "Special Pharmacy"
                      : "Potion Creation";
                  const isSelected = selectedItemType === key;

                  return (
                    <Card
                      key={key}
                      size="small"
                      hoverable
                      onClick={() => handleItemSelect(key)}
                      style={{
                        cursor: "pointer",
                        border: isSelected
                          ? "2px solid #1890ff"
                          : "1px solid #d9d9d9",
                        backgroundColor: isSelected ? "#f0f8ff" : "white",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "12px",
                        }}
                      >
                        <img
                          src={value.icon}
                          alt={value.name}
                          style={{ width: "32px", height: "32px" }}
                        />
                        <div style={{ flex: 1 }}>
                          <div style={{ fontWeight: "bold" }}>{value.name}</div>
                          <div style={{ color: "#666", fontSize: "12px" }}>
                            {skillName}
                          </div>
                          <div
                            style={{
                              color: rate >= 0 ? "#52c41a" : "#ff4d4f",
                              fontSize: "12px",
                            }}
                          >
                            Rate: {rate > 0 ? "+" : ""}
                            {rate}
                          </div>
                        </div>
                      </div>
                    </Card>
                  );
                })}
              </Space>
            </div>
          </Card>
        </Col>

        <Col xs={24} lg={8}>
          <Card
            title={`Character Stats & Skills - ${
              selectedItemData.skill === "special_pharmacy"
                ? "Special Pharmacy"
                : "Potion Creation"
            }`}
            size="small"
          >
            <Form
              form={form}
              layout="vertical"
              onFinish={onFinish}
              initialValues={{
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
                itemType: selectedItemType,
              }}
            >
              <Form.Item name="itemType" style={{ display: "none" }}>
                <input type="hidden" />
              </Form.Item>

              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    label="INT"
                    name="int"
                    rules={[{ required: true, message: "Please input INT!" }]}
                  >
                    <InputNumber min={1} max={999} style={{ width: "100%" }} />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="DEX"
                    name="dex"
                    rules={[{ required: true, message: "Please input DEX!" }]}
                  >
                    <InputNumber min={1} max={999} style={{ width: "100%" }} />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    label="LUK"
                    name="luk"
                    rules={[{ required: true, message: "Please input LUK!" }]}
                  >
                    <InputNumber min={1} max={999} style={{ width: "100%" }} />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="Job Level"
                    name="jobLevel"
                    rules={[
                      { required: true, message: "Please input Job Level!" },
                    ]}
                  >
                    <InputNumber min={1} max={70} style={{ width: "100%" }} />
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item
                label="Base Level"
                name="baseLevel"
                rules={[
                  { required: true, message: "Please input Base Level!" },
                ]}
              >
                <InputNumber min={1} max={999} style={{ width: "100%" }} />
              </Form.Item>

              <Divider>Skills</Divider>

              <Form.Item
                label="Potion Research Level"
                name="potionResearchLevel"
                rules={[
                  {
                    required: true,
                    message: "Please input Potion Research Level!",
                  },
                ]}
              >
                <InputNumber min={0} max={10} style={{ width: "100%" }} />
              </Form.Item>

              {selectedItemData.skill === "special_pharmacy" && (
                <>
                  <Form.Item
                    label="Full Chemical Protection Level"
                    name="fullChemicalProtectionLevel"
                    rules={[
                      { required: true, message: "Please input FCP Level!" },
                    ]}
                  >
                    <InputNumber min={0} max={5} style={{ width: "100%" }} />
                  </Form.Item>

                  <Form.Item
                    label="Special Pharmacy Level"
                    name="specialPharmacyLevel"
                    rules={[
                      {
                        required: true,
                        message: "Please input Special Pharmacy Level!",
                      },
                    ]}
                  >
                    <InputNumber min={1} max={10} style={{ width: "100%" }} />
                  </Form.Item>
                </>
              )}

              {selectedItemData.skill === "potion_creation" && (
                <>
                  <Form.Item
                    label="Prepare Potion Level"
                    name="preparePotionLevel"
                    rules={[
                      {
                        required: true,
                        message: "Please input Prepare Potion Level!",
                      },
                    ]}
                  >
                    <InputNumber min={0} max={10} style={{ width: "100%" }} />
                  </Form.Item>

                  <Form.Item
                    label="Instruction Change Level"
                    name="instructionChangeLevel"
                    rules={[
                      {
                        required: true,
                        message: "Please input Instruction Change Level!",
                      },
                    ]}
                  >
                    <InputNumber min={0} max={5} style={{ width: "100%" }} />
                  </Form.Item>
                </>
              )}

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={isCalculating}
                  size="large"
                  style={{ width: "100%" }}
                >
                  Calculate Creation Odds
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>

        <Col xs={24} lg={8}>
          {results.length > 0 && (
            <Space direction="vertical" style={{ width: "100%" }} size="large">
              <Card title="Simulation Results" size="small">
                <Row gutter={16}>
                  <Col span={8}>
                    <Statistic
                      title="Skill Used"
                      value={
                        skillUsed === "special_pharmacy"
                          ? "Special Pharmacy"
                          : "Potion Creation"
                      }
                    />
                  </Col>
                  <Col span={8}>
                    <Statistic
                      title="Average Creation Value"
                      value={avgCreation}
                      precision={2}
                    />
                  </Col>
                  <Col span={8}>
                    <Statistic
                      title="Average Items Created"
                      value={avgPotions}
                      precision={2}
                    />
                  </Col>
                </Row>
              </Card>

              <Card title="Potion Creation Probability" size="small">
                <Space direction="vertical" style={{ width: "100%" }}>
                  {statistics.map((stat) => (
                    <Alert
                      key={stat.potions}
                      message={`${stat.potions} Potions: ${stat.percentage}%`}
                      description={`${stat.count} out of ${results.length} simulations`}
                      type={
                        stat.potions >= 8
                          ? "success"
                          : stat.potions >= 5
                          ? "warning"
                          : "error"
                      }
                      showIcon
                    />
                  ))}
                </Space>
              </Card>

              <Card title="Formula Information" size="small">
                {skillUsed === "special_pharmacy" ? (
                  <>
                    <Text>
                      <strong>Special Pharmacy - Creation Formula:</strong>
                      <br />
                      INT + (DEX ÷ 2) + LUK + Job_Lv + Random[30, 150] +
                      (Base_Lv − 100) + (Potion_Research_Lv × 5) +
                      (Full_Chemical_Protection_Lv × Random[4, 10])
                    </Text>
                    <br />
                    <br />
                    <Text>
                      <strong>Difficulty Formula:</strong>
                      <br />
                      Specific_Value + Item_Rate
                    </Text>
                    <br />
                    <br />
                    <Text>
                      <strong>Success Conditions:</strong>
                      <br />• Creation {">"}= Difficulty + 400: Maximum potions
                      <br />• Creation {">"}= Difficulty + 300: Max - 3 potions
                      <br />• Creation {">"}= Difficulty + 100: Max - 4 potions
                      <br />• Creation {">"}= Difficulty + 1: Max - 5 potions
                      <br />• Creation {"<"} Difficulty: Max - 6 potions
                    </Text>
                  </>
                ) : (
                  <>
                    <Text>
                      <strong>Potion Creation - Brewing Rate Formula:</strong>
                      <br />
                      (PreparePotion_Lv × 3) + (PotionResearch_Lv) +
                      (InstructionChange_Lv) + (JobLv × 0.2) + (DEX × 0.1) +
                      (LUK × 0.1) + (INT × 0.05) + Potion_Rate
                    </Text>
                    <br />
                    <br />
                    <Text>
                      <strong>Success Condition:</strong>
                      <br />
                      Random[0, 100] {"<"} Brewing Rate = Success (1 item
                      created)
                      <br />
                      Random[0, 100] {">"}= Brewing Rate = Failure (0 items
                      created)
                    </Text>
                  </>
                )}
              </Card>
            </Space>
          )}

          {results.length === 0 && (
            <Card>
              <div style={{ textAlign: "center", padding: "48px 0" }}>
                <Text type="secondary">
                  Fill in your character stats and click "Calculate Potion
                  Creation Odds" to see the simulation results.
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
