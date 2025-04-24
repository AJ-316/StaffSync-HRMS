import { useRef, useState } from "react";

export interface ComboboxValues {
    [key: string]: string;
}

interface ComboboxProps {
    classes?: string;
    dropDownTitle: string;
    options: ComboboxValues;
    emptyOptionsErrorText?: string;
    placeholder?: string;
    onSelectOption: (selectedKey: string | null, selectedValue: string) => void;
    onAddOption?: ((newOption: string) => void) | undefined;
}

function Combobox({ classes="", dropDownTitle, options, placeholder = "Select...", emptyOptionsErrorText = placeholder, onSelectOption, onAddOption=undefined }: ComboboxProps) {
    const [inputValue, setInputValue] = useState("");
    const [dropdownQuery, setDropdownQuery] = useState("");
    const dropdownRef = useRef<HTMLDivElement>(null);
    const [isDropVisible, setIsDropVisible] = useState<boolean>(false);

    const filtered = Object.values(options).filter(dep =>
        dep.toLowerCase().includes(dropdownQuery.toLowerCase())
    );

    const handleOptionClick = (optionValue: string, checkFiltered: boolean) => {
        if (checkFiltered && !filtered.includes(optionValue)) return;
        setIsDropVisible(false);
        setTimeout(() => setDropdownQuery(""), 100);
        setInputValue(optionValue);
    };

    const handleSelect = (optionValue: string) => {
        const entry = Object.entries(options).find(([, value]) => value === optionValue);
        const optionKey = entry?.[0] ?? "";
        onSelectOption(optionKey, optionValue);
    }

    const handleInput = (value: string) => {
        setInputValue(value);
        setDropdownQuery(value);
        onSelectOption(null, "");
    }

    const handleAddCustom = () => {
        const alreadyExists = Object.values(options).some(
            (dep) => dep.toLowerCase() === dropdownQuery.toLowerCase()
        );

        if (dropdownQuery && !alreadyExists && onAddOption) {
            onAddOption(dropdownQuery)
        }

        handleOptionClick(dropdownQuery, false);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key !== 'Enter' || filtered.length !== 0) return;
        handleAddCustom();
    };

    return (
        <div className={classes + " relative mb-2 mt-2 w-[20rem]"}>
            <label className="input w-full">
                <span className=" text-neutral-400 font-bold select-none" >{dropDownTitle}</span>
                <input
                    type="text"
                    placeholder={Object.keys(options).length === 0 ? emptyOptionsErrorText : placeholder}
                    className={"text-neutral-100"}
                    onFocus={() => setIsDropVisible(true)}
                    onBlur={() => setTimeout(() => setIsDropVisible(false), 100)}
                    value={inputValue}
                    onChange={(e) => {
                        handleInput(e.target.value);
                    }}
                    onKeyDown={handleKeyDown}
                />
                {filtered.length === 0 && Object.keys(options).length !== 0 && onAddOption &&
                    <span className="badge badge-error badge-xs" onClick={handleAddCustom}>
                        ADD
                    </span>
                }
            </label>

            <div ref={dropdownRef}>
                {(isDropVisible) && (
                    <ul
                        className="absolute z-50 bg-neutral-950 grid w-max rounded-xl mt-2 shadow-xl shadow-neutral-950"
                        style={{
                            display: "grid",
                            gridTemplateColumns: `repeat(${Math.min(filtered.length, 4)}, max-content)`,
                        }}
                    >
                        {filtered.map((item, idx) =>
                            <button
                                type="button"
                                key={idx}
                                className="btn btn-ghost btn-accent m-1 cursor-pointer"
                                onMouseDown={() => { handleOptionClick(item, true); handleSelect(item); }}
                            >
                                {item}
                            </button>
                        )}
                    </ul>
                )}
            </div>
        </div>
    )
}

export default Combobox
