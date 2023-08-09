import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { Link, useNavigate, useLocation } from "react-router-dom";
import WelcomeMessage from "./Welcome";
import { useAuth } from '../../../contextApi/auth'
import { AiOutlineReload } from "react-icons/ai";
import axios from "axios";
function Login() {
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, SetLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  useEffect(() => {
    if (auth?.user) {
      navigate("/");
    }
  }, [auth, navigate]);


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;

    try {
      SetLoading(true);
      const res = await axios.post('/api/v1/auth/login', {
        email,
        password,
      });

      if (res.data.success) {
        SetLoading(false);
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem("CurrentUser", JSON.stringify(res.data));

        const userData = JSON.parse(localStorage.getItem("CurrentUser"));

        const { name, avtar } = userData.user; // Retrieve from the user data
        toast.custom((t) => (
          <WelcomeMessage name={name} avatar={avtar} />
        ));

        setTimeout(() => {
          navigate(location.state || '/');
        }, 1000);

      } else {
        SetLoading(false);

        toast.error(res.data.message);
      }
    } catch (error) {
      SetLoading(false);

      if (error.response) {
        toast.error(error.response.data.message);
      } else if (error.request) {
        toast.error('No response received from the server');
      } else {
        toast.error('Error submitting form');
      }
    }
  };


  return (
    <>
      <section className="bg-gray-50">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
         
          <div className="w-full bg-white rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                Sign in to your account
              </h1>
              <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6" action="#">
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Your email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    placeholder="name@company.com"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    required=""
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="remember"
                        aria-describedby="remember"
                        type="checkbox"
                        className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300"
                        required=""
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label
                        htmlFor="remember"
                        className="text-gray-900"
                      >
                        Remember me
                      </label>
                    </div>
                  </div>
                  <a
                    href="abc"
                    className="text-sm font-medium text-primary-600 hover:underline"
                  >
                    Forgot password?
                  </a>
                </div>
                <div className="flex items-center justify-between">
                  {loading ? (
                    <div className="flex items-center justify-center mb-6 mt-3">
                      <AiOutlineReload className="animate-spin text-2xl mr-2 " />
                      Sending req...
                    </div>
                  ) : (
                    <button
                      type="submit"
                      className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                    >
                      Sign in
                    </button>
                  )}

                </div>

                <p className="text-sm  text-gray-900">
                  Don’t have an account yet?{" "}
                  <Link to='/register'
                    
                    className="font-medium text-primary-600 hover:underline"
                  >
                    Sign up
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

    </>
  );
}

export default Login;
