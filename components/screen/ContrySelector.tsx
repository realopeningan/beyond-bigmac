import {
  Select,
  SelectTrigger,
  SelectInput,
  SelectIcon,
  SelectPortal,
  SelectBackdrop,
  SelectContent,
  SelectDragIndicatorWrapper,
  SelectDragIndicator,
  SelectItem,
} from "@/components/ui/select";
import { ChevronDownIcon } from "@/components/ui/icon";
import { countries } from "@/lib/data/countries";

export function CountrySelector({
  selected,
  onChange,
}: {
  selected: string;
  onChange: (value: string) => void;
}) {
  return (
    <Select selectedValue={selected} onValueChange={(value) => onChange(value)}>
      <SelectTrigger variant="underlined" size="xl">
        <SelectInput placeholder="Select option" />
        <SelectIcon className="mr-3" as={ChevronDownIcon} />
      </SelectTrigger>
      <SelectPortal>
        <SelectBackdrop />
        <SelectContent>
          <SelectDragIndicatorWrapper>
            <SelectDragIndicator />
          </SelectDragIndicatorWrapper>
          {countries.map((country) => (
            <SelectItem
              key={country.code}
              label={`${country.flag} ${country.name} (${country.code})`}
              value={country.code}
            />
          ))}
        </SelectContent>
      </SelectPortal>
    </Select>
  );
}
