import { useRef, useState } from "react";

export interface ComboboxValues {
    [key: string]: string;
}

interface ComboboxProps {
    options: ComboboxValues;
    onAddOption: (newOption: string) => void;
}

function Combobox({ options, onAddOption }: ComboboxProps) {
    const [inputValue, setInputValue] = useState("");
    const [dropdownQuery, setDropdownQuery] = useState("");
    const dropdownRef = useRef<HTMLDivElement>(null);

    const filtered = Object.values(options).filter(dep =>
        dep.toLowerCase().includes(dropdownQuery.toLowerCase())
    );

    const handleSelect = (value: string, checkFiltered: boolean) => {
        if (checkFiltered && !filtered.includes(value)) return;
        setTimeout(() => setDropdownQuery(""), 100);
        setInputValue(value);
    };

    const handleAddCustom = () => {
        const alreadyExists = Object.values(options).some(
            (dep) => dep.toLowerCase() === dropdownQuery.toLowerCase()
        );

        if (dropdownQuery && !alreadyExists) {
            onAddOption(dropdownQuery)
        }

        handleSelect(dropdownQuery, false);
    };

    return (
        <div className="relative p-2 w-fit">
            <input
                type="text"
                placeholder="Search or add department..."
                className="input input-bordered w-[200%]"
                value={inputValue}
                onChange={(e) => {
                    setInputValue(e.target.value);
                    setDropdownQuery(e.target.value);
                }}
                onBlur={(e) => {
                    setTimeout(() => {
                        if (!dropdownRef.current?.contains(document.activeElement))
                            handleSelect(e.target.value, true);
                    }, 100);
                }}
            />
            <div ref={dropdownRef}>
                {dropdownQuery && (
                    <ul className="absolute z-10 bg-neutral-950 grid grid-cols-4 w-max rounded-xl mt-2 shadow-xl shadow-info-content">
                        {filtered.map((item, idx) =>
                            <button
                                key={idx}
                                className="btn btn-ghost btn-accent m-1 cursor-pointer"
                                onMouseDown={() => handleSelect(item, true)}
                            >
                                {item}
                            </button>
                        )}
                    </ul>
                )}

                {filtered.length === 0 && (
                    <button className="absolute z-10 btn btn-error w-fit whitespace-nowrap" onClick={handleAddCustom}>
                        Add New: <strong>{dropdownQuery}</strong>
                    </button>
                )}
            </div>
        </div>
    )
}

export default Combobox
