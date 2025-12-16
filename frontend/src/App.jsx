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

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Default route - REN Home Page */}
          <Route path="/" element={<RENHomePage />} />

          {/* Login routes */}
          <Route path="/login/:userType?" element={<LoginSelection />} />

          {/* User type selection (first step of signup) */}
          <Route path="/signup" element={<UserTypeSelection />} />

          {/* Resident signup flow */}
          <Route path="/signup/resident" element={<ResidentSignup />} />

          {/* Stakeholder signup flow */}
          <Route path="/signup/stakeholder" element={<StakeholderSignup />} />

          {/* OTP verification */}
          <Route path="/verify-otp" element={<OTPVerification />} />

          {/* Forgot password */}
          <Route path="/forgot-password" element={<ForgotPassword />} />

          {/* Approval waiting (for residents waiting for project approval) */}
          <Route path="/approval-waiting" element={<ApprovalWaiting />} />

          {/* Invite-based signup (with token in URL) */}
          <Route path="/invite/:token" element={<InviteSignup />} />

          {/* Stakeholder invite demo (use ?scenario=1,2,3) */}
          <Route path="/invite/demo" element={<StakeholderInviteDemo />} />

          {/* Netflix-style landing pages */}
          <Route path="/login2/resident" element={<ResidentLanding />} />
          <Route path="/login2/stakeholder" element={<StakeholderLanding />} />

          {/* REN Home Page with redesigned nav (also available at /ren) */}
          <Route path="/ren" element={<RENHomePage />} />

          {/* Catch all - redirect to home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
