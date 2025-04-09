import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import AboutUs from './pages/AboutUs';

import PageTrainings from './pages/Engagement/PageTrainings';
import PageMeetings from './pages/Engagement/PageMeetings';
import PageEvents from './pages/Engagement/PageEvents';

import PageJobListings from './pages/Recruitment/PageJobListings';
import PageCandidatePools from './pages/Recruitment/PageCandidatePools';
import PageCandidateJoinings from './pages/Recruitment/PageCandidateJoinings';

import PageDatabase from './pages/Employee/PageDatabase';
import PageAttendance from './pages/Employee/PageAttendance';
import PagePerformance from './pages/Employee/PagePerformance';
import PageSalary from './pages/Employee/PageSalary';
import PageUserData from './pages/Employee/PageUserData';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recruitment/job-listings" element={<PageJobListings />} />
        <Route path="/recruitment/candidate-pools" element={<PageCandidatePools />} />
        <Route path="/recruitment/candidate-joinings" element={<PageCandidateJoinings />} />
        <Route path="/employee/database" element={<PageDatabase />} />
        <Route path="/employee/attendance" element={<PageAttendance />} />
        <Route path="/employee/performance" element={<PagePerformance />} />
        <Route path="/employee/salary" element={<PageSalary />} />
        <Route path="/employee/data" element={<PageUserData userType={'employee'} />} />
        <Route path="/candidate/data" element={<PageUserData userType={'candidate'} />} />
        <Route path="/engagement/meetings" element={<PageMeetings />} />
        <Route path="/engagement/trainings" element={<PageTrainings />} />
        <Route path="/engagement/events" element={<PageEvents />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
