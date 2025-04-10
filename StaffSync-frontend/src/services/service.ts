

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getNestedValue = (obj: any, path: string): string => {
    return path.split('.').reduce((acc, key) => acc?.[key], obj);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getNestedValueOrElse = (obj: any, path: string, elseVal: string): string => {
    return path.split('.').reduce((acc, key) => acc?.[key], obj) ?? elseVal;
};