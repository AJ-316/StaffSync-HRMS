import { useEffect, useRef, useState } from 'react';
import Header from '../../components/PageHeader/Header';
import { FunnelIcon as SolidFunnel } from '@heroicons/react/24/solid';
import { FunnelIcon as OutlineFunnel } from '@heroicons/react/24/outline';
import InnerHead from '../../components/InnerHead.tsx';
import { candidateService, columnConfig } from '../../services/apiService.ts';
import DataTable from '../../components/DataTable.tsx';

function PageCandidatePools() {

  const [selectedColumns, setSelectedColumns] = useState<string[]>(columnConfig.candidate.map(c => c.accessor));
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
    <div className="main-div">
      <Header />
      <InnerHead
        title="Candidates Pool"
        desc={["Manage your candidates.", "Rejected Candidates are pooled for future reference"]}

        content={
          <details ref={filterBtnRef} className="dropdown p-2">
            <summary className="btn btn-soft btn-accent flex items-center gap-2 text-xl">
              Filter
              {isFiltering && <SolidFunnel className='w-4 h-4' />}
              {!isFiltering && <OutlineFunnel className='w-4 h-4' />}
            </summary>

            <ul className="fixed z-3 translate-x-[-50%] menu dropdown-content bg-neutral rounded-box w-52 p-2 shadow-xl">
              <>
                {columnConfig.candidate.map((col, index) => (
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
      <DataTable
        navigationHolder='candidate'
        allColumns={columnConfig.candidate}
        selectedColumns={selectedColumns}
        apiGetAll={candidateService.getAll} />
    </div>
  );
}

export default PageCandidatePools;