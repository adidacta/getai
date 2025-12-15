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

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Default route - redirect to login */}
          <Route path="/" element={<Navigate to="/login" replace />} />

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

          {/* Catch all - redirect to login */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
