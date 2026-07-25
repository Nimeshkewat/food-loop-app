import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";

type FilterOptionsState = {
  id: string;
  label: string;
};

const filterOptions: FilterOptionsState[] = [
  { id: "burger", label: "Burger" },
  { id: "thali", label: "Thali" },
  { id: "biryani", label: "Biryani" },
  { id: "momos", label: "Momos" },
];

interface FilterPageProps {
  selectedCuisines: string[];
  toggleCuisine: (label: string) => void;
  resetFilters: () => void;
}

function FilterPage({
  selectedCuisines,
  toggleCuisine,
  resetFilters,
}: FilterPageProps) {
  return (
    <div className="md:w-72">
      <div className="flex items-center justify-between">
        <h1 className="font-medium text-lg">Filter by cuisines</h1>
        <Button
          onClick={resetFilters}
          variant="link"
          className="cursor-pointer"
        >
          Reset
        </Button>
      </div>
      {filterOptions.map((option) => (
        <div key={option.id} className="flex items-center space-x-2 my-5">
          <Checkbox
            checked={selectedCuisines.includes(option.label)}
            onCheckedChange={() => toggleCuisine(option.label)}
            id={option.id}
          />
          <Label className="text-sm font-medium leading-none">
            {option.label}
          </Label>
        </div>
      ))}
    </div>
  );
}

export default FilterPage;
