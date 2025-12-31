import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import LoginSelection from './components/LoginSelection';
import StakeholderLogin from './components/StakeholderLogin';
import ResidentLogin from './components/ResidentLogin';
import UserTypeSelection from './components/UserTypeSelection';
import ResidentSignup from './components/ResidentSignup';
import StakeholderSignup from './components/StakeholderSignup';
import OTPVerification from './components/OTPVerification';
import ForgotPassword from './components/ForgotPassword';
import ApprovalWaiting from './components/ApprovalWaiting';
import InviteSignup from './components/InviteSignup';
import StakeholderInviteDemo from './components/StakeholderInviteDemo';
import ResidentLanding from './components/ResidentLanding';
import StakeholderLanding from './components/StakeholderLanding';
import RENHomePage from './components/RENHomePage';
import ResidentLoginV3 from './components/ResidentLoginV3';
import StakeholderLoginV3 from './components/StakeholderLoginV3';
import OTPVerificationV3 from './components/OTPVerificationV3';
import ForgotPasswordV3 from './components/ForgotPasswordV3';
import ProjectPage from './components/ProjectPage';
import AddStakeholderFlow from './components/AddStakeholderFlow';
import DevNavigator from './components/DevNavigator';

function App() {
  return (
    <AuthProvider>
      <Router>
        {/* Dev Navigator - For Testing */}
        <DevNavigator />

        <Routes>
          {/* Default route - Project Page */}
          <Route path="/" element={<ProjectPage />} />

          {/* ============================================ */}
          {/* V2 COLLABORATION FLOWS                      */}
          {/* ============================================ */}

          {/* Project Page - Entry point for inviting stakeholders */}
          <Route path="/project" element={<ProjectPage />} />

          {/* Add Stakeholder Flow - Multi-step dialog */}
          <Route path="/project/invite" element={<AddStakeholderFlow />} />

          {/* Invite acceptance - All 3 scenarios (new user, logged in, logged out) */}
          <Route path="/invite/demo" element={<StakeholderInviteDemo />} />

          {/* ============================================ */}
          {/* V3 AUTH PAGES (Current/Modern)              */}
          {/* ============================================ */}

          <Route path="/login3/resident" element={<ResidentLoginV3 />} />
          <Route path="/login3/stakeholder" element={<StakeholderLoginV3 />} />
          <Route path="/verify-otp3" element={<OTPVerificationV3 />} />
          <Route path="/forgot-password3" element={<ForgotPasswordV3 />} />

          {/* ============================================ */}
          {/* SIGNUP FLOWS                                */}
          {/* ============================================ */}

          {/* User type selection (first step of signup) */}
          <Route path="/signup" element={<UserTypeSelection />} />

          {/* Resident signup flow */}
          <Route path="/signup/resident" element={<ResidentSignup />} />

          {/* Stakeholder signup flow */}
          <Route path="/signup/stakeholder" element={<StakeholderSignup />} />

          {/* ============================================ */}
          {/* LEGACY/V1 ROUTES (kept for reference)       */}
          {/* ============================================ */}

          {/* Login routes */}
          <Route path="/login/:userType?" element={<LoginSelection />} />

          {/* OTP verification */}
          <Route path="/verify-otp" element={<OTPVerification />} />

          {/* Forgot password */}
          <Route path="/forgot-password" element={<ForgotPassword />} />

          {/* Approval waiting (for residents waiting for project approval) */}
          <Route path="/approval-waiting" element={<ApprovalWaiting />} />

          {/* Invite-based signup (with token in URL) */}
          <Route path="/invite/:token" element={<InviteSignup />} />

          {/* Netflix-style landing pages (V2) */}
          <Route path="/login2/resident" element={<ResidentLanding />} />
          <Route path="/login2/stakeholder" element={<StakeholderLanding />} />

          {/* REN Home Page (also available at /ren) */}
          <Route path="/ren" element={<RENHomePage />} />

          {/* Catch all - redirect to home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
