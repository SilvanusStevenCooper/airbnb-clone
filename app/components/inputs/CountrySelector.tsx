"use client";

import Select from "react-select";
import useCountries from "@/app/hooks/useCountries";

export type CountrySelectorValue = {
  flag: string;
  label: string;
  latlng: number[];
  region: string;
  value: string;
};

interface CountrySelectorProps {
  value?: CountrySelectorValue;
  onChange: (value: CountrySelectorValue) => void;
}

const CountrySelector: React.FC<CountrySelectorProps> = ({
  value,
  onChange,
}) => {
  const { getAll } = useCountries();
  return (
    <div>
      <Select
        placeholder="AnyWhere"
        isClearable
        options={getAll()}
        value={value}
        onChange={(xyz) => onChange(xyz as CountrySelectorValue)}
        formatOptionLabel={(option: any) => (
          <div className="flex flex-row items-center gap-3">
            <div>{option.flag}</div>
            <div>
              {option.label},
              <span className="text-neutral-500 ml-1">{option.region}</span>
            </div>
          </div>
        )}
        classNames={{
          control: () => "p-3 border-2",
          input: () => "text-lg",
          option: () => "text-lg",
        }}
        theme={(theme) => ({
          ...theme,
          borderRadius: 6,
          colors: {
            ...theme.colors,
            primary: "black",
            primary25: "#ffe4e6",
          },
        })}
      />
    </div>
  );
};

export default CountrySelector;
