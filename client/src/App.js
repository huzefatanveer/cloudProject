import "./App.css";
import Landing from "./components/LandingPage/Landing";
// import { useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";
import LoginForm from "./components/Login";
import ForgotPasswordPage from "./components/Forget-Password";
import UserSignup from "./components/Signup/UserSignup";
import Dashboard from "./components/Dashboard/Dashboard";
import DashboardAdmin from "./components/DashboardAdmin/DashboardAdmin";
import UserManagement from "./components/UsersManage/UserManagement";
import ProfileManagementPage from "./components/ProfileManage/ProfileManagementPage";
import ReceiptManage from "./components/DashboardAdmin/ReceiptManage";
import PassManagement from "./components/DashboardAdmin/PassManagement";
import Category from "./components/DashboardAdmin/Category";
import TollGate from "./components/DashboardAdmin/TollGate";
import ReportGen from "./components/DashboardAdmin/Report";
// import Dashboard1 from "./components/receipt";
// import App1 from "./components/Dashboard/app1";
// import Dashboard from "./components/Dashboard/Dashboard";

function App() {
  
  return (
    <>
     <Routes>       

        <Route exact path="/" element={<Landing />} />
        <Route exact path="/login" element={<LoginForm />} />
        <Route exact path="/signup/user" element={<UserSignup />} />    
        <Route exact path="/forget-password" element={<ForgotPasswordPage />} />
        <Route exact path="/dashboard" element={<Dashboard />} />
        <Route exact path="/admindashboard" element={<DashboardAdmin />} />
        <Route exact path="/users" element={<UserManagement />} />
        <Route exact path="/receipt" element={<ReceiptManage />} />
        <Route exact path="/pass" element={<PassManagement />} />
        <Route exact path="/category" element={<Category />} />
        <Route exact path="/tollgate" element={<TollGate />} />
        <Route exact path="/report" element={<ReportGen />} />

        {/* <Route exact path="/receipt" element={<Dashboard1 />} /> */}
        <Route exact path="/profile" element={<ProfileManagementPage />} />

        {/* <Route exact path="/dashboard" element={<Dashboard />} /> */}
      
        {/* <Route exact path="/app1" element={<App1 />} /> */}


        
     </Routes>
     
    </>
  );
}

export default App;


