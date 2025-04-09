import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import Navbar from "./components/navbar/Navbar";
import WhichAuth from "./pages/whichAuth/WhichAuth";
import WhichLogin from "./pages/whichAuth/WhichLogin";
import CompanySignup from "./pages/companyAuth/CompanySignup";
import CompanyLogin from "./pages/companyAuth/CompanyLogin";
import SignupUser from "./pages/userAuth/SignupUser";
import LoginUser from "./pages/userAuth/LoginUser";
import { Toaster } from "react-hot-toast";
import VerifyUser from "./pages/userAuth/VerifyUser";
import UserStore from "./stores/UserStore";
import ForgotPass from "./pages/userAuth/ForgotPass";
import ResetUserPass from "./pages/userAuth/ResetUserPass";
import UserProfile from "./pages/userAuth/UserProfile";
import UpdateProfile from "./pages/userAuth/UpdateProfile";
import VerifyCompany from "./pages/companyAuth/VerifyCompany";
import { companyStore } from "./stores/CompanyStore";
import ForgotPassCompany from "./pages/companyAuth/ForgotPassCompany";
import ResetCompanyPass from "./pages/companyAuth/ResetCompanyPass";
import CompanyVacansies from "./pages/companyVacansies/CompanyVacansies";
import AddVacancy from "./pages/companyVacansies/AddVacancy";
import GetOneVacancy from "./pages/companyVacansies/GetOneVacancy";
import HardSkillTests from "./pages/userVacancy/HardSkillTests";
import Chats from "./pages/chats/Chats";

function App() {
  const { getLoggedInUser, user } = UserStore();
  const { getLoggedCompany, company } = companyStore();

  useEffect(() => {
    getLoggedInUser();
  }, [getLoggedInUser]);

  useEffect(() => {
    getLoggedCompany();
  }, [getLoggedCompany]);

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/whichAuth" element={<WhichAuth />} />
        <Route path="/whichLogin" element={<WhichLogin />} />

        {/* AUTH FOR COMPANY */}
        <Route path="/signupCompany" element={<CompanySignup />} />
        <Route path="/loginCompany" element={<CompanyLogin />} />
        <Route path="/verifyCompany" element={<VerifyCompany />} />
        <Route path="/forgotPasswordCompany" element={<ForgotPassCompany />} />
        <Route path="/reset-password_company" element={<ResetCompanyPass />} />

        {/* AUTH FOR User */}
        <Route path="/signupUser" element={<SignupUser />} />
        <Route path="/loginUser" element={<LoginUser />} />
        <Route path="/verifyUser" element={<VerifyUser />} />
        <Route path="/forgotPassword" element={<ForgotPass />} />
        <Route path="/reset-password" element={<ResetUserPass />} />
        <Route path="/userProfile" element={<UserProfile />} />
        <Route path="/updateProfile" element={<UpdateProfile />} />

        {/* vacansies */}
        <Route path="/companyVacansies" element={<CompanyVacansies />} />
        <Route path="/add_vacancy" element={<AddVacancy />} />
        <Route path="/getOneVacancy" element={<GetOneVacancy />} />
        <Route path="/hardSkillTests" element={<HardSkillTests />} />

        {/* CHATS */}
        <Route path="/chats" element={<Chats />} />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
