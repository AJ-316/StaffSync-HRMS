import { useEffect, useRef, useState } from 'react'
import Header from '../../components/PageHeader/Header'
import InnerHead from '../../components/InnerHead'
import DataTable from '../../components/DataTable'
import { APIKeyValues, attendanceService, columnConfig, getNestedValue, getNestedValueOrElse, isArrayOfAPIKeyValues, useFetchData } from '../../services/apiService';
import { FunnelIcon as SolidFunnel } from '@heroicons/react/24/solid';
import { DocumentArrowDownIcon, DocumentArrowUpIcon, FunnelIcon as OutlineFunnel } from '@heroicons/react/24/outline';
import { exportAttendanceToExcel } from '../../services/attendanceExcel';

function PageAttendance() {

  const [selectedMonth, setSelectedMonth] = useState("2025-04");

  const [selectedColumns, setSelectedColumns] = useState<string[]>(columnConfig.attendance.map(c => c.accessor));
  const filterBtnRef = useRef<HTMLDetailsElement>(null);
  const [isFiltering, setIsFiltering] = useState<boolean>(false);

  const toggleColumn = (accessor: string) => {
    setSelectedColumns(prev =>
      prev.includes(accessor)
        ? prev.filter(c => c !== accessor)
        : [...prev, accessor]
    );
  };

  useEffect(() => {
    const filterEl = filterBtnRef.current;
    if (filterEl) {
      const handleToggle = () => {
        setIsFiltering(filterEl.open);
      };
      filterEl.addEventListener("toggle", handleToggle);
      return () => filterEl.removeEventListener("toggle", handleToggle);
    }
  }, []);

  const { dataList, refetch, error, loading } = useFetchData({ isList: true, apiFn: attendanceService.getAll })

  const headerMap: Record<string, string> = {
    "employeeDto.userDto.name": "Employee Name",
    "date": "Date",
    "timeIn": "Check-In",
    "timeOut": "Check-Out",
    "status": "Attendance",
    "employeeDto.userDto.gender": "Gender",
    "employeeDto.userDto.profileDto.name": "Profile",
    "employeeDto.userDto.profileDto.departmentDto.name": "Department",
    // Add more mappings here as needed
  };

  const flattenObject = (obj: any, prefix = ""): Record<string, any> => {
    return Object.entries(obj).reduce((acc, [key, value]) => {
      const fullKey = prefix ? `${prefix}.${key}` : key;

      if (key === "id" || fullKey.endsWith(".id")) {
        return acc; // Skip all id fields
      }

      if (typeof value === "object" && value !== null && !Array.isArray(value)) {
        Object.assign(acc, flattenObject(value, fullKey));
      } else {
        acc[fullKey] = value;
      }

      return acc;
    }, {} as Record<string, any>);
  };

  const getAttendanceData = () => {
    refetch();

    if (error || !isArrayOfAPIKeyValues(dataList)) return;

    const flattenedData = dataList.map((item) => flattenObject(item));

    const renamedData = flattenedData.map((entry) => {
      const renamedEntry: Record<string, any> = {};

      for (const [key, value] of Object.entries(entry)) {
        const header = headerMap[key] || key; // fallback to original key if not mapped
        renamedEntry[header] = value;
      }

      return renamedEntry;
    });

    return renamedData;
  };

  return (
    <div className="main-div">
      <Header />
      <InnerHead
        title="Employees Attendance"
        desc={[""]}

        content={
          <div className='flex flex-row grow items-center justify-end'>
            <fieldset className="fieldset pb-[2.25rem]">
              <legend className="fieldset-legend text-neutral-400">Pick excel file to upload attendance</legend>
              <input
                type="file"
                className="file-input file-input-accent max-w-[14rem]"
              />
            </fieldset>
            <button
              type="button"

              className='btn btn-soft btn-accent m-2 mr-auto'
              onClick={() => exportAttendanceToExcel(getAttendanceData())}
              disabled={loading || error ? true : false}
            >
              <DocumentArrowDownIcon className='w-4 h-4' />
              Download Attendance
              {error && <p className='badge badge-error badge-sm'> Connection Error </p>}
            </button >
            <fieldset className="fieldset pb-[2.25rem]">
              <legend className="fieldset-legend text-neutral-400">Select month</legend>
              <input
                type="month"
                className="input input-accent max-w-xs"
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
              />
            </fieldset>

            <details ref={filterBtnRef} className="dropdown p-2 ">
              <summary className="btn btn-soft btn-accent flex items-center gap-2 text-xl">
                Filter
                {isFiltering && <SolidFunnel className='w-4 h-4' />}
                {!isFiltering && <OutlineFunnel className='w-4 h-4' />}
              </summary>

              <ul className="fixed z-3 translate-x-[-50%] menu dropdown-content bg-neutral rounded-box w-52 p-2 shadow-xl">
                <>
                  {columnConfig.attendance.map((col, index) => (
                    <>
                      {index > 0 &&
                        <li key={col.accessor}>
                          <label className="flex items-center space-x-2 mb-1 cursor-pointer">
                            <input
                              type="checkbox"
                              className="checkbox"
                              checked={selectedColumns.includes(col.accessor)}
                              onChange={() => toggleColumn(col.accessor)}
                            />
                            <span className="text-sm">{col.label}</span>
                          </label></li>
                      }
                    </>
                  ))}
                </>
              </ul>
            </details>
          </div>
        }
      />
      <DataTable
        navigationHolder='attendance'
        allColumns={columnConfig.attendance}
        selectedColumns={selectedColumns}
        apiGetAll={attendanceService.getAll}
      />
    </div>
  )
}

export default PageAttendance
