import { useEffect, useRef, useState } from 'react';
import Header from '../../components/PageHeader/Header';
import * as DataTable from '../../components/DataTable'
import { allColumns, getAllEmployees } from '../../services/employeeService';
import { FunnelIcon as SolidFunnel } from '@heroicons/react/24/solid';
import { FunnelIcon as OutlineFunnel } from '@heroicons/react/24/outline';
import InnerHead from '../../components/InnerHead';

function PageDatabase() {

  const [selectedColumns, setSelectedColumns] = useState<string[]>(allColumns.map(c => c.accessor));
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

  return (
    <div className="flex flex-col h-screen bg-base-300">
      <Header />
      <InnerHead
        title="Employee Database"
        desc={["Manage your employees", "Add filters to search through database with ease"]}

        content={
          <details ref={filterBtnRef} className="dropdown">
            <summary className="btn btn-soft btn-accent m-5 p-5 flex items-center gap-2 text-xl">
              Filter
              {isFiltering && <SolidFunnel className='w-4 h-4' />}
              {!isFiltering && <OutlineFunnel className='w-4 h-4' />}
            </summary>

            <ul className="fixed z-3 translate-x-[-50%] menu dropdown-content bg-neutral rounded-box w-52 p-2 shadow-xl">
              <>
                {allColumns.map((col, index) => (
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
        }
      />
      <DataTable.default navigationHolder='employee/data' allColumns={allColumns} selectedColumns={selectedColumns} apiGetAll={getAllEmployees} />
    </div>
  );
}

export default PageDatabase;


/* import EmployeeTable from '../../components/EmployeeTable'
import Header from '../../components/PageHeader/Header'

function PageDatabase() {
  return (
    <div className="flex flex-col h-screen bg-base-300">
      <Header />
      <div className="w-full flex flex-col">
        <div className="flex justify-between items-center p-4 sticky top-0 z-10">
          <p className="title ml-20">Employee Database</p>
          <p className="ml-10 title-p-small text-left">
            Manage your employees.<br />
            Add filters to search through database with ease</p>
          <button className="btn btn-accent btn-outline btn-lg ml-auto mr-10 p-5">Filter 💧</button>
        </div>
      </div>
      <EmployeeTable />
    </div>
  )
}

export default PageDatabase
 */