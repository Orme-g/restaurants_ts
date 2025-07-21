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
                option: (styles, { data, isFocused }) => ({
                    ...styles,
                    display: "flex",
                    alignItems: "center",
                    backgroundColor: isFocused ? "#f0f0f0" : "white",
                    color: "black",
                    paddingLeft: "8px",
                }),
                singleValue: (styles, { data }) => ({
                    ...styles,
                    display: "flex",
                    alignItems: "center",
                }),
                control: (base, state) => ({
                    ...base,
                    border: "none",
                    boxShadow: "none",
                    backgroundColor: "#fff",
                    borderRadius: "12px",
                    padding: "4px 8px",
                    minHeight: "40px",
                }),
            }}
            formatOptionLabel={(option) => (
                <div style={{ display: "flex", alignItems: "center" }}>
                    <SubwayIcon color={option.color} />
                    <span style={{ marginLeft: 8 }}>{option.label}</span>
                </div>
            )}
        />
    );
};

export default SelectSubway;
