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
import { ThemeProvider } from "./contexts/ThemeContext";
import {
  HEADER_HEIGHT,
  SMALL_WINDOW_WIDTH,
  VERY_SMALL_WINDOW_WIDTH,
  MATERIAL_COSTS_STORAGE_KEY,
} from "./constants";

const AppContent = () => {
  const [form] = Form.useForm<FormValues>();
  const [results, setResults] = useState<SimulationResult[]>([]);
  const [selectedItem, setSelectedItem] = useState<string | undefined>(
    undefined
  );
  const [materialCosts, setMaterialCosts] = useState<Record<number, number>>(
    {}
  );
  const skillUsed = results.length > 0 ? results[0].skill : null;
  const [isSmallWindow, setIsSmallWindow] = useState(
    window.innerWidth < SMALL_WINDOW_WIDTH
  );
  const [isVerySmallWindow, setIsVerySmallWindow] = useState(
    window.innerWidth < VERY_SMALL_WINDOW_WIDTH
  );

  useEffect(() => {
    try {
      const savedCosts = localStorage.getItem(MATERIAL_COSTS_STORAGE_KEY);
      console.log(savedCosts);
      if (savedCosts) {
        const parsedCosts = JSON.parse(savedCosts);
        setMaterialCosts(parsedCosts);
      }
    } catch (error) {
      console.error("Failed to load material costs from localStorage:", error);
    }
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia(
      `(max-width: ${SMALL_WINDOW_WIDTH}px)`
    );
    const handleResize = (e: { matches: boolean }) =>
      setIsSmallWindow(e.matches);
    mediaQuery.addEventListener("change", handleResize);
    return () => mediaQuery.removeEventListener("change", handleResize);
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia(
      `(max-width: ${VERY_SMALL_WINDOW_WIDTH}px)`
    );
    const handleResize = (e: { matches: boolean }) =>
      setIsVerySmallWindow(e.matches);
    mediaQuery.addEventListener("change", handleResize);
    return () => mediaQuery.removeEventListener("change", handleResize);
  }, []);

  const handleMaterialCostChange = (
    materialId: number,
    cost: number | null
  ) => {
    setMaterialCosts((prev) => {
      const next = { ...prev };

      if (cost === null) {
        delete next[materialId];
      } else {
        next[materialId] = cost;
      }

      localStorage.setItem(MATERIAL_COSTS_STORAGE_KEY, JSON.stringify(next));

      return next;
    });
  };

  return (
    <div style={{ padding: "0px 16px" }}>
      <Header isSmallWindow={isSmallWindow} />
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
              isVerySmallWindow={isVerySmallWindow}
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
              isVerySmallWindow={isVerySmallWindow}
            />
          </div>
        </div>

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
            {results.length > 0 ? (
              <>
                <CalculationResults
                  results={results}
                  selectedItem={selectedItem}
                  materialCosts={materialCosts}
                />
                <Probability results={results} />
                <FormulaResult skill={skillUsed} />
                <Materials
                  selectedItem={selectedItem}
                  materialCosts={materialCosts}
                  onMaterialCostChange={handleMaterialCostChange}
                />
              </>
            ) : (
              <NoResults />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
};

export default App;
