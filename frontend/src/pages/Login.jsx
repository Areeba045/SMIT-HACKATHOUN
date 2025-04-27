import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import Button from '../components/common/Button';
import InputField from '../components/common/InputField';

const Login = () => {
  const { login, isAuthenticated } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, from]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: ''
      });
    }
  };

  const validateForm = () => {
    let tempErrors = {};
    let isValid = true;
    
    if (!formData.email) {
      tempErrors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = 'Email is invalid';
      isValid = false;
    }
    
    if (!formData.password) {
      tempErrors.password = 'Password is required';
      isValid = false;
    }
    
    setErrors(tempErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      const success = await login(formData);
      setIsSubmitting(false);
      
      if (success) {
        navigate(from, { replace: true });
      }
    }
  };

  return (
    <div className="flex h-screen fade-in">
      <div className="flex-1 flex flex-col justify-center px-12 max-w-[500px] mx-auto w-full md:px-6">
        <h1 className="text-4xl font-bold text-primary-600 mb-2">SMITApp</h1>
        <p className="text-gray-600 mb-8">Welcome back! Log in to your account</p>
        
        <form onSubmit={handleSubmit} className="space-y-5 mb-6">
          <InputField
            type="email"
            name="email"
            label="Email"
            placeholder="your.email@example.com"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
          />
          
          <InputField
            type="password"
            name="password"
            label="Password"
            placeholder="Your password"
            value={formData.password}
            onChange={handleChange}
            error={errors.password}
          />
          
          <Button 
            type="submit" 
            fullWidth 
            primary
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Logging in...' : 'Login'}
          </Button>
        </form>
        
        <p className="text-sm text-gray-600 text-center">
          Don't have an account?{' '}
          <Link to="/register" className="text-primary-600 font-medium hover:underline">
            Register
          </Link>
        </p>
      </div>
      
      <div className="hidden md:flex flex-1 bg-gradient-to-br from-primary-500 to-primary-700 items-center justify-center relative overflow-hidden">
        <div className="text-white text-center max-w-md px-8">
          <h2 className="text-3xl mb-4">Manage your tasks with ease</h2>
          <p className="text-lg opacity-90">
            Organize, track, and complete tasks efficiently with our powerful task management tool.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;