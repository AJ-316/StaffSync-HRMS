import { useState } from "react";
import { AxiosResponse } from "axios";
import { useNavigate } from "react-router-dom";
import { MagnifyingGlassIcon } from "@heroicons/react/16/solid";
import LoadState from "./LoadState";
import { EyeDropperIcon } from "@heroicons/react/24/solid";
import { APIKeyValues, Column, getNestedValueOrElse, useFetchData } from "../services/apiService";
import WavesBg from "./WavesBg";

type TableProps = {
    allColumns: Column[];
    selectedColumns: string[];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    apiGetAll: () => (Promise<AxiosResponse<any, any>>);
    navigationHolder: string;
};

const DataTable = ({ allColumns, selectedColumns, apiGetAll, navigationHolder }: TableProps) => {
    const navigate = useNavigate();

    const {
        dataList,
        loading,
        error,
        partialList
    } = useFetchData({
        apiFn: apiGetAll,
        columnConfig: allColumns
    });

    const [searchValues, setSearchValues] = useState<APIKeyValues>({});

    const [activeField, setActiveField] = useState<string | null>(null);

    const handleSearchChange = (accessor: string, value: string) => {
        setSearchValues((prev) => ({ ...prev, [accessor]: value }));
    };

    const filteredDatas = Array.isArray(partialList) && partialList !== undefined
    ? partialList.filter((data: unknown) =>
        Object.entries(searchValues).every(([accessor, value]) => {
            const dataValue = getNestedValueOrElse(data, accessor, '-');
            return String(dataValue).toLowerCase().includes(value.toLowerCase());
        })
    ) : [];

    return (
        <div className={`scroll-content-div-corner h-full wave-body`}>
            <LoadState error={error} loading={loading} />
            {error || loading ? <WavesBg /> :
                <table className="table-scale">
                    <thead>
                        <tr className="tr-scale sticky top-0 shadow-2xl shadow-neutral-950">
                            {allColumns
                                .filter((col) => selectedColumns.includes(col.accessor))
                                .map((col) => (
                                    <th
                                        key={col.label}
                                        className="icon-visible th-scale cursor-pointer"
                                        onClick={() => setActiveField(col.label)}
                                    >
                                        {activeField === col.label ? (
                                            <label className="input input-ghost">
                                                <MagnifyingGlassIcon className="w-8 h-8" />
                                                <input
                                                    type="text"
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
                                                <EyeDropperIcon className="icon-v w-4 h-4" />
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
                        {Array.isArray(dataList) && dataList !== undefined && filteredDatas.map((dat, index) => (
                            <tr key={index}
                                className="tr-scale"
                                onClick={() => { navigate(`/${navigationHolder}/data?id=${dataList[index].id}`)?.then(() => window.location.reload()); }}
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
            }
        </div>
    );
};

export default DataTable;
