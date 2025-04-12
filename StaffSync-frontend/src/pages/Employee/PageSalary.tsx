import DataTable from '../../components/DataTable';
import Header from '../../components/PageHeader/Header';
import InnerHead from '../../components/InnerHead';
import LinkedDropdown from '../../components/PageHeader/LinkedDropdown';
import { BeakerIcon } from '@heroicons/react/24/outline';
import { columnConfig, salaryService } from '../../services/apiService';

function PageSalary() {
    return (
        <div className="main-div">
            <Header />
            <InnerHead
                title="Employee Salaries"
                desc={["Manage employee salaries.", "Instantly download salary csv and notify employees through email"]}

                content={<div className='ml-10 mr-auto'>
                    <LinkedDropdown dropdownLinks={[
                        {
                            name: "Operations",
                            icon: <BeakerIcon className='w-6 h-6' />,
                            classes: "btn-soft",
                            btns: [
                                {
                                    name: "Download CSV",
                                    link: ``
                                },
                                {
                                    name: "Generate Salaries",
                                    link: ``
                                }
                            ]
                        }
                    ]} />

                </div>}
            />
            <DataTable
                navigationHolder='employee/salary'
                allColumns={columnConfig.salary}
                selectedColumns={columnConfig.salary.map(c => c.accessor)}
                apiGetAll={salaryService.getAll}
            />
        </div>
    );
}

export default PageSalary
