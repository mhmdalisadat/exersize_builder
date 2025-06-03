import React, { useState } from "react";
import type { SetType } from "../../../../constants/setsType";
import { setTypeOptions } from "../../../../constants/setsType";
import StraightSetForm from "./StraightSetForm";
import SupersetForm from "./SupersetForm";
import TrisetForm from "./TrisetForm";
import GiantSetForm from "./GiantSetForm";
import DropSetForm from "./DropSetForm";
import RestPauseForm from "./RestPauseForm";
import PyramidSetForm from "./PyramidSetForm";
import FST7Form from "./FST7Form";
import ClusterSetForm from "./ClusterSetForm";
import CircuitForm from "./CircuitForm";
import HIITForm from "./HIITForm";
import PreExhaustForm from "./PreExhaustForm";
import PostExhaustForm from "./PostExhaustForm";
import TUTForm from "./TUTForm";
import MindMuscleForm from "./MindMuscleForm";

interface SetTypeSelectorProps {
  onSelect: (setType: SetType) => void;
}

const SetTypeSelector: React.FC<SetTypeSelectorProps> = ({ onSelect }) => {
  const [selectedSetType, setSelectedSetType] = useState<SetType | null>(null);
  const [showStraightForm, setShowStraightForm] = useState(false);
  const [showSupersetForm, setShowSupersetForm] = useState(false);
  const [showTrisetForm, setShowTrisetForm] = useState(false);
  const [showGiantSetForm, setShowGiantSetForm] = useState(false);
  const [showDropSetForm, setShowDropSetForm] = useState(false);
  const [showRestPauseForm, setShowRestPauseForm] = useState(false);
  const [showPyramidForm, setShowPyramidForm] = useState(false);
  const [showFST7Form, setShowFST7Form] = useState(false);
  const [showClusterForm, setShowClusterForm] = useState(false);
  const [showCircuitForm, setShowCircuitForm] = useState(false);
  const [showHIITForm, setShowHIITForm] = useState(false);
  const [showPreExhaustForm, setShowPreExhaustForm] = useState(false);
  const [showPostExhaustForm, setShowPostExhaustForm] = useState(false);
  const [showTUTForm, setShowTUTForm] = useState(false);
  const [showMindMuscleForm, setShowMindMuscleForm] = useState(false);

  const handleSetTypeClick = (setType: SetType) => {
    setSelectedSetType(setType);
    onSelect(setType);

    // Reset all form states
    setShowStraightForm(false);
    setShowSupersetForm(false);
    setShowTrisetForm(false);
    setShowGiantSetForm(false);
    setShowDropSetForm(false);
    setShowRestPauseForm(false);
    setShowPyramidForm(false);
    setShowFST7Form(false);
    setShowClusterForm(false);
    setShowCircuitForm(false);
    setShowHIITForm(false);
    setShowPreExhaustForm(false);
    setShowPostExhaustForm(false);
    setShowTUTForm(false);
    setShowMindMuscleForm(false);

    // Show the selected form
    switch (setType) {
      case "straight":
        setShowStraightForm(true);
        break;
      case "superset":
        setShowSupersetForm(true);
        break;
      case "triset":
        setShowTrisetForm(true);
        break;
      case "giant":
        setShowGiantSetForm(true);
        break;
      case "drop":
        setShowDropSetForm(true);
        break;
      case "restPause":
        setShowRestPauseForm(true);
        break;
      case "pyramid":
        setShowPyramidForm(true);
        break;
      case "fst7":
        setShowFST7Form(true);
        break;
      case "cluster":
        setShowClusterForm(true);
        break;
      case "circuit":
        setShowCircuitForm(true);
        break;
      case "hiit":
        setShowHIITForm(true);
        break;
      case "preExhaust":
        setShowPreExhaustForm(true);
        break;
      case "postExhaust":
        setShowPostExhaustForm(true);
        break;
      case "tut":
        setShowTUTForm(true);
        break;
      case "mindMuscle":
        setShowMindMuscleForm(true);
        break;
    }
  };

  const handleStraightSave = (data: any) => {
    console.log("Straight set data:", data);
  };

  const handleSupersetSave = (data: any) => {
    console.log("Superset data:", data);
  };

  const handleTrisetSave = (data: any) => {
    console.log("Triset data:", data);
  };

  const handleGiantSetSave = (data: any) => {
    console.log("Giant set data:", data);
  };

  const handleDropSetSave = (data: any) => {
    console.log("Drop set data:", data);
  };

  const handleRestPauseSave = (data: any) => {
    console.log("Rest-pause data:", data);
  };

  const handlePyramidSave = (data: any) => {
    console.log("Pyramid set data:", data);
  };

  const handleFST7Save = (data: any) => {
    console.log("FST-7 data:", data);
  };

  const handleClusterSave = (data: any) => {
    console.log("Cluster set data:", data);
  };

  const handleCircuitSave = (data: any) => {
    console.log("Circuit data:", data);
  };

  const handleHIITSave = (data: any) => {
    console.log("HIIT data:", data);
  };

  const handlePreExhaustSave = (data: any) => {
    console.log("Pre-exhaust data:", data);
  };

  const handlePostExhaustSave = (data: any) => {
    console.log("Post-exhaust data:", data);
  };

  const handleTUTSave = (data: any) => {
    console.log("TUT data:", data);
  };

  const handleMindMuscleSave = (data: any) => {
    console.log("Mind-muscle connection data:", data);
  };

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {setTypeOptions.map((option) => (
          <div
            key={option.value}
            onClick={() => handleSetTypeClick(option.value)}
            className={`p-4 rounded-lg cursor-pointer transition-all duration-200 ${
              selectedSetType === option.value
                ? "bg-blue-500 text-white shadow-lg transform scale-105"
                : "bg-white hover:bg-gray-50 text-gray-800 shadow-sm hover:shadow-md"
            }`}
          >
            <h3 className="text-lg font-semibold mb-2">{option.label}</h3>
            <p className="text-sm">{option.description}</p>
          </div>
        ))}
      </div>

      {showStraightForm && <StraightSetForm onSave={handleStraightSave} />}
      {showSupersetForm && <SupersetForm onSave={handleSupersetSave} />}
      {showTrisetForm && <TrisetForm onSave={handleTrisetSave} />}
      {showGiantSetForm && <GiantSetForm onSave={handleGiantSetSave} />}
      {showDropSetForm && <DropSetForm onSave={handleDropSetSave} />}
      {showRestPauseForm && <RestPauseForm onSave={handleRestPauseSave} />}
      {showPyramidForm && <PyramidSetForm onSave={handlePyramidSave} />}
      {showFST7Form && <FST7Form onSave={handleFST7Save} />}
      {showClusterForm && <ClusterSetForm onSave={handleClusterSave} />}
      {showCircuitForm && <CircuitForm onSave={handleCircuitSave} />}
      {showHIITForm && <HIITForm onSave={handleHIITSave} />}
      {showPreExhaustForm && <PreExhaustForm onSave={handlePreExhaustSave} />}
      {showPostExhaustForm && (
        <PostExhaustForm onSave={handlePostExhaustSave} />
      )}
      {showTUTForm && <TUTForm onSave={handleTUTSave} />}
      {showMindMuscleForm && <MindMuscleForm onSave={handleMindMuscleSave} />}
    </div>
  );
};

export default SetTypeSelector;
