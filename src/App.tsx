import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage/HomePage'
import MakerPage from './pages/MakerPage/MakerPage'
import CustomerPages from './pages/CustomerPages/CustomerPages'
import JobDetails from './pages/JobDetailsPage/JobDetailsPage'
import NotFoundPage from './pages/NotFoundPage/NotFoundPage'
import NavigationBar from './pages/Navigation/Navigation'

function App() {
  return (
    <Routes>
      <Route path='/' element={<NavigationBar />}>
        <Route index element={<HomePage />} />
        <Route path='customer' element={<CustomerPages />} />
        <Route path='maker/jobs/filter' element={<MakerPage />} />
        <Route path='maker/jobs/details/:id' element={<JobDetails />} />
        <Route path='*' element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}

export default App
