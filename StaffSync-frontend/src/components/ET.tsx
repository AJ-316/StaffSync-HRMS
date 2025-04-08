import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

type Employee = {
  id: number;
  name: string;
  department: string;
  role: string;
  status: string;
  moreInfo: string;
};

type SearchValues = {
  [key: string]: string;
};

const ET = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [searchValues, setSearchValues] = useState<SearchValues>({
    name: "",
    department: "",
    role: "",
    status: "",
    moreInfo: "",
  });

  const [activeField, setActiveField] = useState<string | null>(null);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/employee/get");
        setEmployees(res.data);
      } catch (err) {
        setError("Failed to fetch employee data.");
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  const handleSearchChange = (key: string, value: string) => {
    setSearchValues((prev) => ({ ...prev, [key]: value }));
  };

  const filteredEmployees = employees.filter((emp) =>
    Object.entries(searchValues).every(([key, value]) =>
      String(emp[key as keyof Employee]).toLowerCase().includes(value.toLowerCase())
    )
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
              {["name", "department", "role", "status", "moreInfo"].map((key) => (
                <th
                  key={key}
                  className="icon-visible th-scale cursor-pointer"
                  onClick={() => setActiveField(key)}
                >
                  {activeField === key ? (
                    <label className="input">
                      <svg className="h-[2em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="3" fill="none" stroke="currentColor"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.3-4.3"></path></g></svg>
                      <input
                        type="search"
                        placeholder="Search"
                        value={searchValues[key]}
                        onChange={(e) => handleSearchChange(key, e.target.value)}
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
                        {key.charAt(0).toUpperCase() + key.slice(1) + (searchValues[key].length === 0 ? "" : (" = " + searchValues[key]))}
                      </p>
                    </div>
                  )}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="overflow-hidden">
            {filteredEmployees.map((emp) => (
              <tr
                key={emp.id}
                className="bg-base-100 hover:border-2 border-accent hover:bg-accent-content transition-all duration-100 ease-in-out"
              >
                <td className="td-scale">
                    <Link to={"http://localhost:8080/api/employee/${emp.id}"}>
                        {emp.name}
                    </Link>
                </td>
                <td className="td-scale">{emp.department}</td>
                <td className="td-scale">{emp.role}</td>
                <td className="td-scale">{emp.status}</td>
                <td className="td-scale">{emp.moreInfo}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ET;

/* import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

type SearchValues = {
    [key: string]: string;
};

type Employee = {
    employeeId: number;
    userDto: {
        name: string;
        dob: string;
        gender: string;
        maritalStatus: string;
        addressTemp: string;
        addressPerm: string;
        email: string;
        contactNumber: string;
        qualification: { name: string };
        profile: {
            name: string;
            department: { name: string };
        };
    };
    joinDate: string;
    status: string;
};

export type Column = {
    label: string;
    accessor: string;
};

const getNestedValue = (obj: any, path: string): string => {
    return path.split('.').reduce((acc, key) => acc?.[key], obj) ?? "-";
};

type EmployeeTableProps = {
    allColumns: Column[];
    selectedColumns: string[];
};

const EmployeeTable = ({ allColumns, selectedColumns }: EmployeeTableProps) => {
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const [searchValues, setSearchValues] = useState<SearchValues>({});

    const [activeField, setActiveField] = useState<Column | null>(null);

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const res = await axios.get("http://localhost:8080/api/employee/get");
                setEmployees(res.data);
                console.log(res.data)
            } catch (err) {
                setError("Failed to fetch employee data.");
            } finally {
                setLoading(false);
            }
        };

        fetchEmployees();
    }, []);

    const handleSearchChange = (key: string, value: string) => {
        setSearchValues((prev) => ({ ...prev, [key]: value }));
    };

    const filteredEmployees = employees.filter((emp) =>
        Object.entries(searchValues).every(([key, value]) =>
            String(emp[key as keyof Employee]).toLowerCase().includes(value.toLowerCase())
        )
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
                    {allColumns
                                .filter((col) => selectedColumns.includes(col.accessor))
                                .map((col) => (
                                    <th
                                    key={col.accessor}
                                    className="icon-visible th-scale cursor-pointer"
                                    onClick={() => setActiveField(col)}
                                >
                                    {activeField === col ? (
                                        <label className="input">
                                            <svg className="h-[2em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="3" fill="none" stroke="currentColor"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.3-4.3"></path></g></svg>
                                            <input
                                                type="search"
                                                placeholder="Search"
                                                value={searchValues[col.accessor]}
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
                                                {col.accessor.charAt(0).toUpperCase() + col.accessor.slice(1) /* + 
                                                (searchValues[col.accessor].length === 0 ? "" : (" = " + searchValues[col.accessor])) *//*}
                                            </p>
                                        </div>
                                    )}
                                </th>
                                ))}




                        
                    </thead>

                    <tbody className="overflow-hidden">
                        {filteredEmployees.map((emp) => (
                            <tr
                                key={emp.employeeId}
                                className="bg-base-100 hover:border-2 border-accent hover:bg-accent-content transition-all duration-100 ease-in-out"
                            >
                                <td className="td-scale">
                                    <Link to={`http://localhost:8080/api/employee/${"emp.id"}`} className="hover:underline">
                                        {emp.userDto.name}
                                    </Link>
                                </td>
                                <td className="td-scale">{emp.userDto.profile.department.name}</td>
                                <td className="td-scale">{"emp.role"}</td>
                                <td className="td-scale">{emp.status}</td>
                                <td className="td-scale">{"emp.moreInfo"}</td>
                            </tr>
                        ))}
                    </tbody>


                    <table className="table-scale table-zebra w-full">
                        <tr className="bg-info-content top-0 sticky z-2">
                            {allColumns
                                .filter((col) => selectedColumns.includes(col.accessor))
                                .map((col) => (

                                    <th className="th-scale" key={col.accessor + "s"}>{col.label}</th>
                                ))}
                        </tr>
                        {employees.map((emp) => (
                            <tr key={emp.employeeId} className="bg-base-100 hover:border-2 border-accent hover:bg-accent-content transition-all duration-100 ease-in-out">
                                {allColumns
                                    .filter((col) => selectedColumns.includes(col.accessor))
                                    .map((col) => (
                                        <td className="td-scale" key={col.accessor}>
                                            {getNestedValue(emp, col.accessor)}
                                        </td>
                                    ))}
                            </tr>
                        ))}
                    </table>

                </table>
            )}
        </div>
    );
};

export default EmployeeTable; */

/* import { useEffect, useState } from "react";
import axios from "axios";

type Employee = {
    employeeId: number;
    userDto: {
        name: string;
        dob: string;
        gender: string;
        maritalStatus: string;
        addressTemp: string;
        addressPerm: string;
        email: string;
        contactNumber: string;
        qualification: { name: string };
        profile: {
            name: string;
            department: { name: string };
        };
    };
    joinDate: string;
    status: string;
};

export type Column = {
    label: string;
    accessor: string;
};

const getNestedValue = (obj: any, path: string): string => {
    return path.split('.').reduce((acc, key) => acc?.[key], obj) ?? "-";
};

type EmployeeTableProps = {
    allColumns: Column[];
    selectedColumns: string[];
};

const EmployeeTable = ({ allColumns, selectedColumns }: EmployeeTableProps) => {
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const res = await axios.get("http://localhost:8080/api/employee/get");
                setEmployees(res.data);
            } catch {
                setError("Failed to fetch employee data.");
            } finally {
                setLoading(false);
            }
        };

        fetchEmployees();
    }, []);

    return (
        <div className="relative m-10 h-full overflow-x-auto shadow-2xl shadow-neutral-950 border-l-2 border-l-info-content border-t-2 border-t-info-content rounded-[50px] p-4">
            {/* <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Employee Table</h2>
                <div className="relative">
                    {showColumnFilter && (
                        <div className="absolute right-0 mt-2 bg-base-200 border border-base-300 rounded-lg shadow-lg p-4 z-10 w-56 max-h-80 overflow-y-auto transition duration-300">
                            {allColumns.map((col) => (
                                <label key={col.accessor} className="flex items-center space-x-2 mb-1 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        className="checkbox checkbox-sm"
                                        checked={selectedColumns.includes(col.accessor)}
                                        onChange={() => toggleColumn(col.accessor)}
                                    />
                                    <span className="text-sm">{col.label}</span>
                                </label>
                            ))}
                        </div>
                    )}

                </div>
            </div> *//*}

{loading ? (
    <p className="text-center p-4">Loading...</p>
) : error ? (
    <p className="text-center text-error p-4">{error}</p>
) : (
    <table className="table-scale table-zebra w-full">
        <tr className="bg-info-content top-0 sticky z-2">
            {allColumns
                .filter((col) => selectedColumns.includes(col.accessor))
                .map((col) => (

                    <th className="th-scale" key={col.accessor + "s"}>{col.label}</th>
                ))}
        </tr>
        {employees.map((emp) => (
            <tr key={emp.employeeId} className="bg-base-100 hover:border-2 border-accent hover:bg-accent-content transition-all duration-100 ease-in-out">
                {allColumns
                    .filter((col) => selectedColumns.includes(col.accessor))
                    .map((col) => (
                        <td className="td-scale" key={col.accessor}>
                            {getNestedValue(emp, col.accessor)}
                        </td>
                    ))}
            </tr>
        ))}
    </table>
)}
</div>
);
};

export default EmployeeTable; */


/* import { useState, useEffect } from "react";
import axios from "axios";

type FlatEmployee = {
  [key: string]: string | number;
  id: number;
};

type SearchValues = {
  [key: string]: string;
};

const flattenEmployee = (employee: any): FlatEmployee => {
  return {
    id: employee.employeeId,
    name: employee.userDto.name,
    email: employee.userDto.email,
    contactNumber: employee.userDto.contactNumber,
    dob: employee.userDto.dob,
    gender: employee.userDto.gender,
    maritalStatus: employee.userDto.maritalStatus,
    qualification: employee.userDto.qualification?.name || "",
    role: employee.userDto.profile?.name || "",
    department: employee.userDto.profile?.department?.name || "",
    joinDate: employee.joinDate,
    status: employee.status,
  };
};

const EmployeeTable = () => {
  const [employees, setEmployees] = useState<FlatEmployee[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [searchValues, setSearchValues] = useState<SearchValues>({});
  const [activeField, setActiveField] = useState<string | null>(null);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/employee/get");
        const flat = res.data.map(flattenEmployee);
        setEmployees(flat);

        // Initialize search fields
        const keys = Object.keys(flat[0] || {}).filter(k => k !== "id");
        setSearchValues(Object.fromEntries(keys.map(k => [k, ""])));
      } catch (err) {
        setError("Failed to fetch employee data.");
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  const handleSearchChange = (key: string, value: string) => {
    setSearchValues(prev => ({ ...prev, [key]: value }));
  };

  const filteredEmployees = employees.filter((emp) =>
    Object.entries(searchValues).every(([key, value]) =>
      String(emp[key] ?? "").toLowerCase().includes(value.toLowerCase())
    )
  );

  const columns = Object.keys(searchValues);

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
              {columns.map((key) => (
                <th
                  key={key}
                  className="icon-visible th-scale cursor-pointer"
                  onClick={() => setActiveField(key)}
                >
                  {activeField === key ? (
                    <label className="input">
                      <svg className="h-[2em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="3" fill="none" stroke="currentColor">
                          <circle cx="11" cy="11" r="8"></circle>
                          <path d="m21 21-4.3-4.3"></path>
                        </g>
                      </svg>
                      <input
                        type="search"
                        placeholder="Search"
                        value={searchValues[key]}
                        onChange={(e) => handleSearchChange(key, e.target.value)}
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
                        {key.charAt(0).toUpperCase() + key.slice(1)} {searchValues[key] && `= ${searchValues[key]}`}
                      </p>
                    </div>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="overflow-hidden">
            {filteredEmployees.map((emp) => (
              <tr
                key={emp.id}
                className="bg-base-100 hover:border-2 border-accent hover:bg-accent-content transition-all duration-100 ease-in-out"
              >
                {columns.map((key) => (
                  <td key={key} className="td-scale">{emp[key]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default EmployeeTable; */


/* import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

type Employee = {
  id: number;
  name: string;
  department: string;
  role: string;
  status: string;
  moreInfo: string;
};

type SearchValues = {
  [key: string]: string;
};

const EmployeeTable = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [searchValues, setSearchValues] = useState<SearchValues>({
    name: "",
    department: "",
    role: "",
    status: "",
    moreInfo: "",
  });

  const [activeField, setActiveField] = useState<string | null>(null);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/employee/get");
        setEmployees(res.data);
        console.log(res.data)
      } catch (err) {
        setError("Failed to fetch employee data.");
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  const handleSearchChange = (key: string, value: string) => {
    setSearchValues((prev) => ({ ...prev, [key]: value }));
  };

  const filteredEmployees = employees.filter((emp) =>
    Object.entries(searchValues).every(([key, value]) =>
      String(emp[key as keyof Employee]).toLowerCase().includes(value.toLowerCase())
    )
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
              {["name", "department", "role", "status", "moreInfo"].map((key) => (
                <th
                  key={key}
                  className="icon-visible th-scale cursor-pointer"
                  onClick={() => setActiveField(key)}
                >
                  {activeField === key ? (
                    <label className="input">
                      <svg className="h-[2em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="3" fill="none" stroke="currentColor"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.3-4.3"></path></g></svg>
                      <input
                        type="search"
                        placeholder="Search"
                        value={searchValues[key]}
                        onChange={(e) => handleSearchChange(key, e.target.value)}
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
                        {key.charAt(0).toUpperCase() + key.slice(1) + (searchValues[key].length === 0 ? "" : (" = " + searchValues[key]))}
                      </p>
                    </div>
                  )}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="overflow-hidden">
            {filteredEmployees.map((emp) => (
              <tr
                key={emp.id}
                className="bg-base-100 hover:border-2 border-accent hover:bg-accent-content transition-all duration-100 ease-in-out"
              >
                <td className="td-scale">
                  <Link to={`http://localhost:8080/api/employee/${emp.id}`} className="hover:underline">
                    {emp.name}
                  </Link>
                </td>
                <td className="td-scale">{emp.department}</td>
                <td className="td-scale">{emp.role}</td>
                <td className="td-scale">{emp.status}</td>
                <td className="td-scale">{emp.moreInfo}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default EmployeeTable;
 */