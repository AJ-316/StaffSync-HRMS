import { useState } from 'react';
import Header from '../../components/PageHeader/Header';
import * as DataTable from '../../components/DataTable'
import { getAllEmployees } from '../../services/employeeService';
import { getCandidateById } from '../../services/candidateService';

function PageDatabase() {
  const allColumns: DataTable.Column[] = [
    { label: "ID", accessor: "id" },
    { label: "Name", accessor: "userDto.name" },
    { label: "Department", accessor: "userDto.profile.department.name" },
    { label: "Profile", accessor: "userDto.profile.name" },
    { label: "Qualification", accessor: "userDto.qualification.name" },
    { label: "Status", accessor: "status" },
    { label: "Join Date", accessor: "joinDate" },
    { label: "Email", accessor: "userDto.email" },
    { label: "Contact", accessor: "userDto.contactNumber" },
  ];

  const [selectedColumns, setSelectedColumns] = useState<string[]>(allColumns.map(c => c.accessor));

  const toggleColumn = (accessor: string) => {
    setSelectedColumns(prev =>
      prev.includes(accessor)
        ? prev.filter(c => c !== accessor)
        : [...prev, accessor]
    );
  };

  return (
    <div className="flex flex-col h-screen bg-base-300">
      <Header />
      <div className="w-full flex flex-col">
        <div className="flex justify-between items-center p-4 sticky top-0 z-10">
          <p className="title ml-20">Employee Database</p>
          <p className="ml-10 title-p-small text-left">
            Manage your employees.<br />
            Add filters to search through database with ease
          </p>

          <div className="flex justify-between items-center mb-4">
            <div className="relative">
              <details className="dropdown">
                <summary className="btn btn-soft btn-accent m-5 p-5 flex items-center gap-2 text-xl">
                  Filter 💧
                </summary>

                <ul className="fixed z-3 translate-x-[-50%] menu dropdown-content bg-neutral rounded-box w-52 p-2 shadow-xl">
                  {allColumns.map((col) => (
                    <li key={col.accessor}>
                      <label className="flex items-center space-x-2 mb-1 cursor-pointer">
                        <input
                          type="checkbox"
                          className="checkbox checkbox-accent"
                          checked={selectedColumns.includes(col.accessor)}
                          onChange={() => toggleColumn(col.accessor)}
                        />
                        <span className="text-sm">{col.label}</span>
                      </label></li>
                  ))}
                </ul>
              </details>
            </div>
          </div>
        </div>
      </div>
      <DataTable.default dataHolder='employee' allColumns={allColumns} selectedColumns={selectedColumns} apiGetAll={getAllEmployees} apiGetById={getCandidateById}/>
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