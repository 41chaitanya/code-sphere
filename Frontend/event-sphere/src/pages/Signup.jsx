// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import Layout from '../components/Layout';
// import AuthForm from '../components/AuthForm';
// import { useAuth } from '../contexts/AuthContext';

// const Signup = () => {
//   const [loading, setLoading] = useState(false);
//   const { signup } = useAuth();
//   const navigate = useNavigate();

//   const handleSignup = async (data) => {
//     setLoading(true);
//     try {
//       await signup(data.name, data.email, data.password);
//       navigate('/login');
//     } catch (error) {
//       console.error('Signup error:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Layout>
//       <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
//         <div className="bg-gray-900 py-4 px-6">
//           <h2 className="text-2xl font-bold text-white">Create an Account</h2>
//         </div>
//         <div className="p-6">
//           <AuthForm isLogin={false} onSubmit={handleSignup} />
          
//           <div className="mt-4 text-center text-sm">
//             <p className="text-gray-600">
//               Already have an account?{' '}
//               <Link to="/login" className="text-red-500 hover:text-red-600">
//                 Sign in here
//               </Link>
//             </p>
//           </div>
//         </div>
//       </div>
//     </Layout>
//   );
// };

// export default Signup;

// // import React, { useState } from 'react';
// // import { Link, useNavigate } from 'react-router-dom';
// // import Layout from '../components/Layout';
// // import AuthForm from '../components/AuthForm';
// // import { useAuth } from '../contexts/AuthContext';

// // const Signup = () => {
// //   const [loading, setLoading] = useState(false);
// //   const { signup } = useAuth();
// //   const navigate = useNavigate();

// //   const handleSignup = async (data) => {
// //     setLoading(true);
// //     try {
// //       await signup(data.name, data.email, data.password);
// //       navigate('/login');
// //     } catch (error) {
// //       console.error('Signup error:', error);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <Layout>
// //       <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
// //         <div className="bg-primary-600 py-4 px-6">
// //           <h2 className="text-2xl font-bold text-white">Create an Account</h2>
// //         </div>
// //         <div className="p-6">
// //           <AuthForm isLogin={false} onSubmit={handleSignup} />
          
// //           <div className="mt-4 text-center text-sm">
// //             <p className="text-gray-600">
// //               Already have an account?{' '}
// //               <Link to="/login" className="text-primary-600 hover:text-primary-800">
// //                 Sign in here
// //               </Link>
// //             </p>
// //           </div>
// //         </div>
// //       </div>
// //     </Layout>
// //   );
// // };

// // export default Signup;


// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import Layout from "../components/Layout";
// import AuthForm from "../components/AuthForm";
// import { useAuth } from "../contexts/AuthContext";

// const Signup = () => {
//   const [loading, setLoading] = useState(false);
//   const { signup } = useAuth();
//   const navigate = useNavigate();

//   const handleSignup = async (data) => {
//     setLoading(true);
//     try {
//       await signup(data.name, data.email, data.password);
//       navigate("/login");
//     } catch (error) {
//       console.error("Signup error:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Layout>
//       <div className="flex items-center justify-center bg-[#f0f8ff] py-12">
//         <div className="max-w-md w-full bg-white rounded-xl shadow-lg transform transition-all hover:shadow-2xl p-8">
//           {/* Header */}
//           <div className="bg-gradient-to-r from-[#05445e] to-[#189ab4] text-white text-center py-4 rounded-t-xl">
//             <h2 className="text-2xl font-semibold">Create an Account</h2>
//           </div>

//           {/* Form Section */}
//           <div className="p-6 ">
            
//            <AuthForm
//   isLogin={false}
//   onSubmit={handleSignup}
//   buttonText={<span >Sign Up</span>}
// />

            
//             {/* Sign In Link */}
//             <div className="mt-4 text-center text-sm">
//               <p className="text-gray-600">
//                 Already have an account?{" "}
//                 <Link
//                   to="/login"
//                   className="text-[#189ab4] font-semibold hover:text-[#75e6da] transition"
//                 >
//                   Sign in here
//                 </Link>
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </Layout>
//   );
// };

// export default Signup;


import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import AuthForm from "../components/AuthForm";
import { useAuth } from "../contexts/AuthContext";
import { toast } from "react-toastify";

const Signup = () => {
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // General email validation
    const anonymousDomains = ["abc.com", "test.com", "example.com"]; // Add common anonymous domains
    const domain = email.split("@")[1];

    if (!emailRegex.test(email)) {
      toast.error("Invalid email format.");
      return false;
    }
    if (anonymousDomains.includes(domain)) {
      toast.error("Please enter a valid professional or personal email.");
      return false;
    }
    return true;
  };

  const handleSignup = async (data) => {
    if (!validateEmail(data.email)) return;

    setLoading(true);
    try {
      await signup(data.name, data.email, data.password);
      toast.success("Signup successful! Redirecting to login...");
      navigate("/login");
    } catch (error) {
      console.error("Signup error:", error);
      toast.error("Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="flex items-center justify-center bg-[#f0f8ff] py-12">
        <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#05445e] to-[#189ab4] text-white text-center py-4 rounded-t-xl">
            <h2 className="text-2xl font-semibold">Create an Account</h2>
          </div>

          {/* Form Section */}
          <div className="p-6">
            <AuthForm isLogin={false} onSubmit={handleSignup} />

            {/* Sign In Link */}
            <div className="mt-4 text-center text-sm">
              <p className="text-gray-600">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-[#189ab4] font-semibold hover:text-[#75e6da] transition"
                >
                  Sign in here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Signup;

