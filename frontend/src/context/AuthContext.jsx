import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Check for stored auth on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('token');

    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  // Login function (mock for now - will integrate with API later)
  const login = async (credentials) => {
    try {
      // Mock login - in real implementation, this would call the API
      const mockUser = {
        id: '1',
        name: credentials.email || credentials.phone,
        email: credentials.email,
        phone: credentials.phone,
        userType: credentials.userType, // 'resident' or 'stakeholder'
        role: credentials.role, // For stakeholders: lawyer, builder, etc.
        company: credentials.company, // Company ID if applicable
        isRepresentative: credentials.isRepresentative || false,
        projects: [], // Projects the user has access to
        approvalStatus: credentials.approvalStatus || 'approved', // 'pending', 'approved', 'rejected'
      };

      const mockToken = 'mock-jwt-token-' + Date.now();

      setUser(mockUser);
      setIsAuthenticated(true);
      localStorage.setItem('user', JSON.stringify(mockUser));
      localStorage.setItem('token', mockToken);

      return { success: true, user: mockUser };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: error.message };
    }
  };

  // Signup function (mock for now)
  const signup = async (userData) => {
    try {
      // Mock signup - in real implementation, this would call the API
      const mockUser = {
        id: Date.now().toString(),
        name: userData.name,
        email: userData.email,
        phone: userData.phone,
        userType: userData.userType,
        role: userData.role,
        company: userData.company,
        isRepresentative: userData.isRepresentative || false,
        projects: userData.projects || [],
        approvalStatus: userData.userType === 'resident' ? 'pending' : 'approved',
      };

      const mockToken = 'mock-jwt-token-' + Date.now();

      // For residents, we might not log them in immediately if they need approval
      if (userData.userType === 'resident') {
        return { success: true, user: mockUser, requiresApproval: true };
      }

      setUser(mockUser);
      setIsAuthenticated(true);
      localStorage.setItem('user', JSON.stringify(mockUser));
      localStorage.setItem('token', mockToken);

      return { success: true, user: mockUser, requiresApproval: false };
    } catch (error) {
      console.error('Signup error:', error);
      return { success: false, error: error.message };
    }
  };

  // Verify OTP function (mock for now)
  const verifyOTP = async (phone, code) => {
    try {
      // Mock OTP verification
      if (code === '1234' || code.length === 4) {
        return { success: true };
      }
      return { success: false, error: 'Invalid code' };
    } catch (error) {
      console.error('OTP verification error:', error);
      return { success: false, error: error.message };
    }
  };

  // Request password reset (mock for now)
  const requestPasswordReset = async (email) => {
    try {
      // Mock password reset request
      console.log('Password reset requested for:', email);
      return { success: true };
    } catch (error) {
      console.error('Password reset error:', error);
      return { success: false, error: error.message };
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  // Update user data
  const updateUser = (userData) => {
    const updatedUser = { ...user, ...userData };
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };

  const value = {
    user,
    isAuthenticated,
    isLoading,
    login,
    signup,
    logout,
    verifyOTP,
    requestPasswordReset,
    updateUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
