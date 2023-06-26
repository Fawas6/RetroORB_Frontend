import './App.css'
import { HashRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import Menu from './components/Menu'
import Dashboard from './pages/Dashboard';
import Signup_Form from './pages/Signup_Form'
import Login_Form from './pages/Login_Form';
import NoPage from './pages/NoPage'

function App() {
  const queryClient = new QueryClient();
  return (
    <>
      <HashRouter>
        <QueryClientProvider client={queryClient}>
          <Menu />
          <Routes>
          <Route index element = {<Dashboard />} />
          <Route path = "/Dashboard" element = {<Dashboard />} />
          <Route path = "/Signup_Form" element = {<Signup_Form />} />
          <Route path = "/Login_Form" element = {<Login_Form />} />
          <Route path = "*" element = {<NoPage />} />
          </Routes>
        </QueryClientProvider>
      </HashRouter>
    </>
  )
}

export default App
