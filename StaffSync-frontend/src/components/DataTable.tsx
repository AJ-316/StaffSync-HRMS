import { useState, useEffect } from "react";
import { AxiosResponse } from "axios";
import { useNavigate } from "react-router-dom";
import { MagnifyingGlassIcon } from "@heroicons/react/16/solid";
import { getNestedValueOrElse } from "../services/service";

export type Column = {
    label: string;
    accessor: string;
};

type SearchValues = {
    [key: string]: string;
};

type TableProps = {
    allColumns: Column[];
    selectedColumns: string[];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    apiGetAll: () => (Promise<AxiosResponse<any, any>>);
    navigationHolder: string;
};

const DataTable = ({ allColumns, selectedColumns, apiGetAll, navigationHolder }: TableProps) => {
    const navigate = useNavigate();
    
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [datas, setDataList] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const [searchValues, setSearchValues] = useState<SearchValues>({});

    const [activeField, setActiveField] = useState<string | null>(null);

    useEffect(() => {
        const fetchDataAllData = async () => {
            try {
                const response = await apiGetAll();
                console.log("Fetched data response:", response);

                const dataList = Array.isArray(response?.data?.data)
                    ? response.data.data : [];

                setDataList(dataList);
            } catch (error) {
                console.error("Failed to fetch data:", error);
                setError("Failed to fetch data:");
                setDataList([]);
            } finally {
                setLoading(false);
            }

        };

        fetchDataAllData();
    }, []);

    const handleSearchChange = (accessor: string, value: string) => {
        setSearchValues((prev) => ({ ...prev, [accessor]: value }));
    };

    const filteredDatas = datas.filter((dat) =>
        Object.entries(searchValues).every(([accessor, value]) => {
            const datValue = getNestedValueOrElse(dat, accessor, '-');
            return String(datValue).toLowerCase().includes(value.toLowerCase());
        })
    );

    return (
        <div className="m-10 h-full overflow-x-auto shadow-2xl shadow-neutral-950 border-l-2 border-l-info-content border-t-2 border-t-info-content rounded-[50px]">
            {loading ? (
                <p className="text-center p-4">Loading...</p>
            ) : error ? (
                <p className="text-center text-error p-4">{error}</p>
            ) : (

                <table className="table-scale">
                    <thead>
                        <tr className="sticky top-0 bg-info-content shadow-2xl shadow-neutral-950">
                            {allColumns
                                .filter((col) => selectedColumns.includes(col.accessor))
                                .map((col) => (
                                    <th
                                        key={col.label}
                                        className="icon-visible th-scale cursor-pointer"
                                        onClick={() => setActiveField(col.label)}
                                    >
                                        {activeField === col.label ? (
                                            <label className="input">
                                                <MagnifyingGlassIcon className="w-8 h-8"/>
                                                <input
                                                    type="search"
                                                    placeholder="Search"
                                                    value={searchValues[col.accessor] || ''}
                                                    onChange={(e) => handleSearchChange(col.accessor, e.target.value)}
                                                    onBlur={() => setActiveField(null)}
                                                    className="w-full text-xl max-w-[15rem] h-full p-2"
                                                    autoFocus
                                                />
                                            </label>
                                        ) : (
                                            <div className="flex flex-row justify-start items-center">
                                                <svg className="icon-v h-[2em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                                    <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="3" fill="none" stroke="currentColor">
                                                        <path d="M3 4h18M6 10h12M10 16h4" />
                                                    </g>
                                                </svg>
                                                <p className="p-2">
                                                    {col.label.charAt(0).toUpperCase() + col.label.slice(1) + (
                                                        searchValues[col.label] ?
                                                            (searchValues[col.label].length === 0 ? "" : (" = " + searchValues[col.label])) : ""
                                                    )}
                                                </p>
                                            </div>
                                        )}
                                    </th>
                                ))}
                        </tr>
                    </thead>

                    {<tbody className="overflow-hidden">

                        {filteredDatas.map((dat, index) => (
                            <tr key={index}
                                className="bg-base-100 hover:border-2 border-accent hover:bg-accent-content transition-all duration-100 ease-in-out"
                                onClick={() => {navigate(`/${navigationHolder}?id=${dat.id}`)?.then(() => window.location.reload());}}
                            >
                                {allColumns
                                    .filter((col) => selectedColumns.includes(col.accessor))
                                    .map((col) => (
                                        <td className="td-scale" key={col.accessor}>
                                            {getNestedValueOrElse(dat, col.accessor, '-')}
                                        </td>
                                    ))}
                            </tr>
                        ))}
                    </tbody>}
                </table>
            )}
        </div>
    );
};

export default DataTable;