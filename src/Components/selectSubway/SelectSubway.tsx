import { useState } from "react";
import Select, { GroupBase, MultiValue, SingleValue } from "react-select";
import { subwaySpb } from "../../data/subwaysLists";
import SubwayIcon from "../svg/subwayIcon";

interface SubwayOption {
    value: string;
    label: string;
    color: string;
}

interface ISelectSubwayProps<T extends boolean> {
    multiple: T;
    handleChange: (value: T extends true ? string[] : string) => void;
}

const SelectSubway = <T extends boolean>({ handleChange, multiple }: ISelectSubwayProps<T>) => {
    const [selectedValue, setSelectedValue] = useState<
        T extends true ? readonly SubwayOption[] : SubwayOption | null
    >(null as any);
    const groupedOptions: GroupBase<SubwayOption>[] = subwaySpb.lines.map((item) => ({
        label: item.name,
        options: item.stations.map((station) => ({
            label: station,
            value: station,
            color: item.color,
        })),
    }));
    const handleSelect = (
        option: T extends true ? MultiValue<SubwayOption> : SingleValue<SubwayOption>
    ) => {
        setSelectedValue(option);
        if (multiple) {
            const values = (option as SubwayOption[]).map((option) => option.value);
            (handleChange as (value: string[]) => void)(values);
        } else {
            const value = (option as SubwayOption).value;
            (handleChange as (value: string) => void)(value);
        }
    };
    return (
        <Select
            options={groupedOptions}
            isMulti={multiple}
            value={selectedValue}
            onChange={handleSelect}
            placeholder="Выберите станцию"
            isSearchable
            styles={{
                control: (styles) => ({
                    ...styles,
                    border: "none",
                    boxShadow: "none",
                    backgroundColor: "inherit",
                    borderRadius: "12px",
                    padding: "4px 8px",
                    minHeight: "40px",
                }),
                option: (styles, { isFocused }) => ({
                    ...styles,
                    backgroundColor: isFocused ? "#f0f0f0" : "white",
                    color: "black",
                }),
                singleValue: (styles) => ({
                    ...styles,
                    display: "flex",
                    alignItems: "center",
                }),
                multiValue: (styles) => ({
                    ...styles,
                    backgroundColor: "#f5f5f5",
                }),
                menu: (base) => ({
                    ...base,
                    minWidth: "300px",
                    zIndex: "99",
                }),
                dropdownIndicator: (styles) => ({
                    ...styles,
                    color: "#616161",
                    ":hover": {
                        color: "#2f2f2f",
                    },
                }),
                clearIndicator: (styles) => ({
                    ...styles,
                    color: "#616161",
                    ":hover": {
                        color: "#2f2f2f",
                    },
                }),
                placeholder: (styles) => ({
                    ...styles,
                    fontSize: "inherit",
                }),
            }}
            formatOptionLabel={(option) => (
                <div style={{ display: "flex", alignItems: "center" }}>
                    <SubwayIcon color={option.color} size="15px" />
                    <span style={{ marginLeft: 8 }}>{option.label}</span>
                </div>
            )}
        />
    );
};

export default SelectSubway;
