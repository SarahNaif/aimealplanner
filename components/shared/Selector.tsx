import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function Selector({
  label = "Select",
  options = [],
  onSelect,
}: {
  label?: string;
  options: { label: string; value: string }[];
  onSelect: (name: string, value: string) => void;
}) {
  return (
    <Select onValueChange={(value) => onSelect(label, value)}>
      <SelectTrigger className="capitalize">
        <SelectValue placeholder={label} />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
