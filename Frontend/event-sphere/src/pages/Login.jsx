import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import AuthForm from '../components/AuthForm';
import { useAuth } from '../contexts/AuthContext';

const Login = () => {
  const [loading, setLoading] = useState(false);
  const { login, authError, clearError } = useAuth();
  const navigate = useNavigate();
  
  // Clear any existing errors when component mounts
  useEffect(() => {
    clearError();
  }, [clearError]);

  const handleLogin = async (data) => {
    setLoading(true);
    try {
      await login(data.email, data.password);
      navigate('/dashboard');
    } catch (error) {
      console.error('Login error:', error);
      // Error is already handled in the auth context
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="flex items-center justify-center bg-gray-100 py-12 min-h-screen">
        <div className="max-w-md w-full bg-white border border-gray-300 rounded-xl shadow-lg transform transition-all hover:shadow-2xl p-8">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#05445e] to-[#189ab4] text-white text-center py-4 rounded-t-xl">
            <h2 className="text-2xl font-semibold">Sign In</h2>
          </div>

          {/* Error Banner - Show specific user-friendly errors */}
          {authError && (
            <div className={`mt-4 p-3 rounded-md text-sm font-medium ${
              authError.type === 'user_not_found' 
                ? 'bg-yellow-100 border border-yellow-400 text-yellow-700' 
                : 'bg-red-100 border border-red-400 text-red-700'
            }`}>
              <p>{authError.message}</p>
              
              {/* Conditional action based on error type */}
              {authError.type === 'user_not_found' && (
                <div className="mt-2">
                  <Link 
                    to="/signup" 
                    className="text-[#189ab4] font-semibold hover:text-[#75e6da] transition"
                  >
                    Sign up now
                  </Link>
                </div>
              )}
            </div>
          )}

          {/* Form Section */}
          <div className="p-6">
            <AuthForm 
              isLogin={true} 
              onSubmit={handleLogin} 
              isLoading={loading}
            />

            {/* Sign Up Link */}
            <div className="mt-4 text-center text-sm">
              <p className="text-gray-700">
                Don't have an account?{' '}
                <Link 
                  to="/signup" 
                  className="text-[#189ab4] font-semibold hover:text-[#75e6da] transition"
                >
                  Sign up here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Login;