import { useEffect, useState } from "react";

export type InputData = {
    placeholder: string
    inputValue: string
    separator?: string
}

interface NestedInputProps {
    name: string;
    unit: string;
    inputs: InputData[];
    onSetValues: (values: string[]) => void
}

function NestedInput({ name, unit, inputs, onSetValues }: NestedInputProps) {

    const [inputValues, setInputValues] = useState<string[]>([]);

    useEffect(() => {
        const newInputValues = [...inputValues];
        inputs.forEach((data, index) => {
            newInputValues[index] = data.inputValue;
        });
        setInputValues(newInputValues);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleInput = (value: string, index: number, input: InputData) => {
        input.inputValue = value;

        const newInputValues = [...inputValues];
        newInputValues[index] = value;
        onSetValues(newInputValues);
        setInputValues(newInputValues);
        
        /* setInputValues(prev => {
            const newInputValues = [...prev];
            newInputValues[index] = value;
            return newInputValues;
        }); */
    }

    return (
        <label className="input w-[20rem]">
            <span className="select-none text-neutral-400 font-bold">{name}</span>
            <div className="flex flex-row items-center justify-end mr-10">
                {inputs.map((data, index) =>
                    <>
                        <input
                            key={index}
                            type="text"
                            placeholder={data.placeholder}
                            className={"w-[30%] border-1 border-neutral-600 p-1 rounded-xl text-center m-2"}
                            value={inputValues[index]}
                            onChange={(e) => {
                                handleInput(e.target.value, index, data);
                            }}
                        />
                        {data.separator &&
                            <span className="text-neutral-500 text-center select-none">
                                {data.separator}
                            </span>
                        }
                    </>
                )}
                <span className="text-neutral-500 text-left select-none">
                    {unit}
                </span>
            </div>
        </label>
    )
}

export default NestedInput
