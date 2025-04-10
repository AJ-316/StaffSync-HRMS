import { useState, useEffect } from "react";
import { AxiosResponse } from "axios";

export type FetchResult = {
    dataList: APIKeyValues;
    loading: boolean;
    error: string | null;
    refetch: () => void;
};

export type FetchResultList = {
    dataList: APIKeyValues[];
    loading: boolean;
    error: string | null;
    refetch: () => void;
};

export interface APIKeyValues {
    [key: string]: string;
}

export const useFetchById = (
    id: number,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    apiGetById: (id: number) => Promise<AxiosResponse<any>>
): FetchResult => {
    const [dataList, setDataList] = useState<APIKeyValues>({});
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchData = async () => {
        let dataResultMsg = "";
        try {
            const response = await apiGetById(id);
            dataResultMsg = ": " + response.data.message;
            if (!response.data.success) throw new Error();
            setDataList(response.data.data);
        } catch (err) {
            console.error("Failed to fetch data:", err);
            dataResultMsg = dataResultMsg.length === 0 ? ": API Connection Failed" : dataResultMsg;
            setError("Failed to fetch data" + dataResultMsg);
        } finally {
            setLoading(false);
        }
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => { fetchData(); }, []);

    return { dataList, loading, error, refetch: fetchData };
};

export const useFetchAll = (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    apiGetAll: () => Promise<AxiosResponse<any>>
): FetchResultList => {
    const [dataList, setDataList] = useState<APIKeyValues[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchData = async () => {
        let dataResultMsg = "";
        try {
            const response = await apiGetAll();

            dataResultMsg = ": " + response.data.message;
            if (!response.data.success) throw new Error();
            setDataList(response.data.data);
        } catch (err) {
            console.error("Failed to fetch data:", err);
            dataResultMsg = dataResultMsg.length === 0 ? ": API Connection Failed" : dataResultMsg;
            setError("Failed to fetch data" + dataResultMsg);
        } finally {
            setLoading(false);
        }
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => { fetchData(); }, []);

    return { dataList, loading, error, refetch: fetchData };
};