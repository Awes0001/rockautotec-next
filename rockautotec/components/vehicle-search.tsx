"use client";

import { useEffect, useMemo, useState } from "react";
import { Search } from "lucide-react";
import {
  ALL_YEARS, getMakesForYear, getModelsForMakeYear, getTrimsForVehicle,
  getEngineSizesForTrim, getDriveTypesForEngine, getBodyStylesForEngine,
} from "@/data/vehicles";
import SearchableSelect from "@/components/searchable-select";

export interface VehicleSelection {
  year: string;
  make: string;
  model: string;
  trim: string;
  engine: string;
  /** Empty string when this vehicle doesn't have more than one drive-type option. */
  driveType: string;
  /** Empty string when this vehicle doesn't have more than one body-style option. */
  bodyStyle: string;
}

interface VehicleSearchProps {
  /** Called with the full selection once Year/Make/Model/Trim/Engine are all set and the button is clicked. */
  onSearch?: (selection: VehicleSelection) => void;
  /** Visual variant — "hero" is the larger one-row desktop layout, "compact" is a tighter inline row. */
  variant?: "hero" | "compact";
  className?: string;
}

/** Brief synthetic loading flag so each step's combobox shows a spinner while
 *  its option list is (re)computed — keeps the UX consistent with how this
 *  will behave once option lookups move behind a real network call at scale. */
function useStepLoading(dep: unknown): boolean {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    const id = setTimeout(() => setLoading(false), 120);
    return () => clearTimeout(id);
  }, [dep]);
  return loading;
}

export default function VehicleSearch({ onSearch, variant = "hero", className = "" }: VehicleSearchProps) {
  const [year, setYear] = useState("");
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [trim, setTrim] = useState("");
  const [engine, setEngine] = useState("");
  const [driveType, setDriveType] = useState("");
  const [bodyStyle, setBodyStyle] = useState("");

  const yearNum = year ? parseInt(year, 10) : NaN;

  const makeOptions = useMemo(
    () => (year ? getMakesForYear(yearNum) : []),
    [year, yearNum]
  );
  const modelOptions = useMemo(
    () => (make && year ? getModelsForMakeYear(make, yearNum) : []),
    [make, year, yearNum]
  );
  const trimOptions = useMemo(
    () => (model && year ? getTrimsForVehicle(make, model, yearNum) : []),
    [make, model, year, yearNum]
  );
  const engineOptions = useMemo(
    () => (trim ? getEngineSizesForTrim(make, model, trim) : []),
    [make, model, trim]
  );
  const driveOptions = useMemo(
    () => (engine ? getDriveTypesForEngine(make, model, trim, engine) : []),
    [make, model, trim, engine]
  );
  const bodyOptions = useMemo(
    () => (engine ? getBodyStylesForEngine(make, model, trim, engine, driveType) : []),
    [make, model, trim, engine, driveType]
  );

  const makeLoading = useStepLoading(year);
  const modelLoading = useStepLoading(make);
  const trimLoading = useStepLoading(model);
  const engineLoading = useStepLoading(trim);

  // Dependent resets (Phase 2) — changing an upstream field always clears
  // everything below it so no invalid combination can be submitted.
  useEffect(() => { setMake(""); setModel(""); setTrim(""); setEngine(""); setDriveType(""); setBodyStyle(""); }, [year]);
  useEffect(() => { setModel(""); setTrim(""); setEngine(""); setDriveType(""); setBodyStyle(""); }, [make]);
  useEffect(() => { setTrim(""); setEngine(""); setDriveType(""); setBodyStyle(""); }, [model]);
  useEffect(() => { setEngine(""); setDriveType(""); setBodyStyle(""); }, [trim]);
  useEffect(() => { setDriveType(""); setBodyStyle(""); }, [engine]);
  useEffect(() => { setBodyStyle(""); }, [driveType]);

  // Drive Type / Body Style are only shown "if available" (more than one
  // option) — when there's just one option (or none), auto-fill it instead
  // of forcing the user through a meaningless extra click.
  const showDriveType = driveOptions.length > 1;
  const showBodyStyle = bodyOptions.length > 1;

  useEffect(() => {
    if (!showDriveType && driveOptions.length === 1 && driveType !== driveOptions[0]) {
      setDriveType(driveOptions[0]);
    }
  }, [showDriveType, driveOptions, driveType]);

  useEffect(() => {
    if (!showBodyStyle && bodyOptions.length === 1 && bodyStyle !== bodyOptions[0]) {
      setBodyStyle(bodyOptions[0]);
    }
  }, [showBodyStyle, bodyOptions, bodyStyle]);

  const canSearch = Boolean(year && make && model && trim && engine);

  function handleSubmit() {
    if (canSearch) {
      onSearch?.({ year, make, model, trim, engine, driveType, bodyStyle });
    }
  }

  const fieldClass = variant === "hero" ? "" : "";
  const gridClass = "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-2.5";

  return (
    <div className={className}>
      <div className={gridClass}>
        <SearchableSelect
          placeholder="Select Year"
          options={ALL_YEARS.map(String)}
          value={year}
          onChange={setYear}
          className={fieldClass}
        />
        <SearchableSelect
          placeholder="Select Make"
          options={makeOptions}
          value={make}
          onChange={setMake}
          disabled={!year}
          loading={makeLoading}
          className={fieldClass}
        />
        <SearchableSelect
          placeholder="Select Model"
          options={modelOptions}
          value={model}
          onChange={setModel}
          disabled={!make}
          loading={modelLoading}
          className={fieldClass}
        />
        <SearchableSelect
          placeholder="Select Trim"
          options={trimOptions}
          value={trim}
          onChange={setTrim}
          disabled={!model}
          loading={trimLoading}
          className={fieldClass}
        />
        <SearchableSelect
          placeholder="Select Engine"
          options={engineOptions}
          value={engine}
          onChange={setEngine}
          disabled={!trim}
          loading={engineLoading}
          className={fieldClass}
        />

        <button
          onClick={handleSubmit}
          disabled={!canSearch}
          className="rounded-lg bg-red-600 hover:bg-red-500 active:bg-red-700 disabled:bg-zinc-700 disabled:text-zinc-500 text-white font-semibold py-3 px-4 flex items-center justify-center gap-2 transition-colors text-sm whitespace-nowrap"
        >
          <Search className="h-4 w-4 shrink-0" />
          <span className="lg:hidden">Find Parts</span>
          <span className="hidden lg:inline">Search</span>
        </button>
      </div>

      {/* Drive Type / Body Style — shown only "if available" (more than one option) */}
      {(showDriveType || showBodyStyle) && (
        <div className="mt-2.5 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {showDriveType && (
            <SearchableSelect
              placeholder="Select Drive Type"
              options={driveOptions}
              value={driveType}
              onChange={setDriveType}
            />
          )}
          {showBodyStyle && (
            <SearchableSelect
              placeholder="Select Body Style"
              options={bodyOptions}
              value={bodyStyle}
              onChange={setBodyStyle}
            />
          )}
        </div>
      )}

      <p className="mt-2.5 text-xs text-zinc-500 text-center sm:text-left">
        {year && make && model && trim && engine
          ? `${year} ${make} ${model} ${trim} · ${engine}${driveType ? ` · ${driveType}` : ""}${bodyStyle ? ` · ${bodyStyle}` : ""}`
          : "Select your vehicle step by step — each field narrows the next."}
      </p>
    </div>
  );
}
