import { useEffect, useState } from "react";
import { Form } from "antd";
import "./App.css";
import type { FormValues, SimulationResult } from "./types";
import FormulaResult from "./components/FormulaResult";
import CharacterStats from "./components/CharacterStats";
import calculateResults from "./helpers/calculateResults";
import Items from "./components/Items";
import NoResults from "./components/NoResults";
import Materials from "./components/Materials";
import CalculationResults from "./components/CalculationResults";
import Probability from "./components/Probability";
import Header from "./components/Header";
import { HEADER_HEIGHT, SMALL_WINDOW_WIDTH } from "./constants";

const App = () => {
  const [form] = Form.useForm<FormValues>();
  const [results, setResults] = useState<SimulationResult[]>([]);
  const [selectedItem, setSelectedItem] = useState<string | undefined>(
    undefined
  );
  const skillUsed = results.length > 0 ? results[0].skill : null;
  const [isSmallWindow, setIsSmallWindow] = useState(
    window.innerWidth < SMALL_WINDOW_WIDTH
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia(
      `(max-width: ${SMALL_WINDOW_WIDTH}px)`
    );
    const handleResize = (e: { matches: boolean }) =>
      setIsSmallWindow(e.matches);
    mediaQuery.addEventListener("change", handleResize);
    return () => mediaQuery.removeEventListener("change", handleResize);
  }, []);

  return (
    <div style={{ padding: "0px 16px" }}>
      <Header />
      <div
        style={{
          height: `calc(100vh - ${HEADER_HEIGHT}px)`,
          display: "flex",
          gap: 24,
          flexWrap: "wrap",
        }}
      >
        <div
          style={{
            minHeight: 800,
            maxHeight: isSmallWindow ? undefined : "100%",
            width: isSmallWindow ? "100%" : 600,
            overflow: "auto",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "24px",
              height: "100%",
              width: "100%",
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
                setResults(calculateResults(formValues, selectedItem));
              }}
            />

            <Items
              selectedItem={selectedItem}
              onItemSelect={(newItem) => {
                setSelectedItem(newItem);
                if (form.getFieldsError().some(({ errors }) => errors.length))
                  return;
                setResults(calculateResults(form.getFieldsValue(), newItem));
              }}
            />
          </div>
        </div>

        {results.length > 0 ? (
          <div style={{ height: "100%", flex: "1 1 0" }}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(450px, 1fr))",
                gap: 24,
                overflow: "auto",
                maxHeight: "100%",
                width: "100%",
              }}
            >
              <CalculationResults results={results} />
              <Probability results={results} />
              <FormulaResult skill={skillUsed} />
              <Materials selectedItem={selectedItem} />
            </div>
          </div>
        ) : (
          <NoResults />
        )}
      </div>
    </div>
  );
};

export default App;
