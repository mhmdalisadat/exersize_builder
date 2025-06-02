import Dropdown from "../../common/dropdown";
import { muscleOptions } from "../../../constants";

interface MultiSelectMuscleProps {
  value: string[];
  onChange: (val: string[]) => void;
  getMuscleLabel: (value: string) => string;
}

const MultiSelectMuscle: React.FC<MultiSelectMuscleProps> = ({
  value = [],
  onChange,
  getMuscleLabel,
}) => {
  const handleChange = (name: string, newValue: string | string[]) => {
    if (Array.isArray(newValue)) {
      // Rest day is exclusive
      if (newValue.includes("rest")) {
        onChange(["rest"]);
      } else {
        onChange(newValue);
      }
    }
  };

  const formattedOptions = muscleOptions.map((option) => ({
    value: option.value,
    label: getMuscleLabel(option.value),
  }));

  return (
    <div className="w-full">
      <Dropdown
        label="عضلات"
        name="muscles"
        value={value}
        options={formattedOptions}
        onChange={handleChange}
        multiple={true}
      />
    </div>
  );
};

export default MultiSelectMuscle;
