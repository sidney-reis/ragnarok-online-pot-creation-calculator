import { useState } from "react";
import { Form, Row, Col, Space } from "antd";
import "./App.css";
import type { FormValues, SimulationResult } from "./types";
import FormulaResult from "./components/FormulaResult";
import CharacterStats from "./components/CharacterStats";
import calculatePreciseResults from "./helpers/calculatePreciseResults";
import Items from "./components/Items";
import NoResults from "./components/NoResults";
import Materials from "./components/Materials";
import CalculationResults from "./components/CalculationResults";
import Probability from "./components/Probability";

const App = () => {
  const [form] = Form.useForm<FormValues>();
  const [results, setResults] = useState<SimulationResult[]>([]);
  const [selectedItem, setSelectedItem] = useState<string | undefined>(
    undefined
  );
  const skillUsed = results.length > 0 ? results[0].skill : null;

  return (
    <div style={{ padding: 16, paddingBottom: 0 }}>
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
            <CharacterStats
              form={form}
              onChange={(formValues) => {
                if (
                  !selectedItem ||
                  form.getFieldsError().some(({ errors }) => errors.length)
                )
                  return;
                setResults(calculatePreciseResults(formValues, selectedItem));
              }}
            />

            <Items
              selectedItem={selectedItem}
              onItemSelect={(newItem) => {
                setSelectedItem(newItem);
                console.log(form.getFieldsError());
                if (form.getFieldsError().some(({ errors }) => errors.length))
                  return;
                setResults(
                  calculatePreciseResults(form.getFieldsValue(), newItem)
                );
              }}
            />
          </div>
        </Col>

        <Col xs={24} lg={8}>
          {results.length > 0 && (
            <Space direction="vertical" style={{ width: "100%" }} size="large">
              <CalculationResults results={results} />
              <Probability results={results} />
            </Space>
          )}
        </Col>

        <Col xs={24} lg={8}>
          {results.length > 0 && (
            <Space direction="vertical" style={{ width: "100%" }} size="large">
              <FormulaResult skill={skillUsed} />
              <Materials selectedItem={selectedItem} />
            </Space>
          )}

          {results.length === 0 && <NoResults />}
        </Col>
      </Row>
    </div>
  );
};

export default App;
