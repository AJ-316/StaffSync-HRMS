import { useEffect, useState } from "react";
import LoadState from "../../components/LoadState"
import Header from "../../components/PageHeader/Header"
import { APIKeyValues, columnConfig, getNestedValue, getNestedValueOrElse, isArrayOfAPIKeyValues, useFetchData, welfareService } from "../../services/apiService"
import { useLocation } from "react-router-dom";
import InnerHead from "../../components/InnerHead";
import WavesBg from "../../components/WavesBg";

function PageWelfare() {

    const location = useLocation();
    const [id, setId] = useState<number>(-1);

    useEffect(() => {
        const searchParam = new URLSearchParams(location.search);
        const paramId = searchParam.get("id");
        if (paramId) {
            setId(parseInt(paramId));
        }
    }, [location]);

    const { dataList, error, loading } = useFetchData({ id: id, columnConfig: columnConfig.welfare, isList: true, apiFn: welfareService.getByEmployeeId })

    const welfareContainer = (welfareData: APIKeyValues, key: number) => {
        return (
            <tr key={key} className="tr-disp">
                <td className="td-scale">
                    <div className="text-xl">
                        {key + 1}
                    </div>
                </td>
                <td className="td-scale">
                    <div className="text-xl">
                        {getNestedValueOrElse(welfareData, "description", "-")}
                    </div>
                </td>
            </tr>
        )
    }

    return (
        <div className="main-div">
            <Header />
            <InnerHead
                title={"Employee Welfare"}
                desc={[]}
                content={undefined} />
            <div className="scroll-content-div h-full wave-body">
                <LoadState error={error} loading={loading} />
                {(error || loading) && <WavesBg />}
                {!error && !loading && isArrayOfAPIKeyValues(dataList) &&
                    <>

                        <div className="sticky top-0 z-1 m-2.5 p-2.5 text-center text-2xl bg-base-100 shadow-2xl rounded-2xl">
                            {isArrayOfAPIKeyValues(dataList) && dataList.length > 0 &&
                                getNestedValue(dataList[0], "employeeDto.userDto.name") + " - " +
                                getNestedValue(dataList[0], "employeeDto.userDto.profileDto.departmentDto.name") + " (" +
                                getNestedValue(dataList[0], "employeeDto.userDto.profileDto.name") + ")"
                            }
                        </div>
                        <table className="table-disp grid-cols-1">
                            {dataList.map(welfareContainer)}
                        </table>
                    </>
                }
            </div>
        </div>
    )
}

export default PageWelfare
