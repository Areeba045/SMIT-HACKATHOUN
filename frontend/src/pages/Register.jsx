import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Button from "../components/common/Button";
import InputField from "../components/common/InputField";

const Register = () => {
  const { register, isAuthenticated } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: "",
      });
    }
  };

  const validateForm = () => {
    let tempErrors = {};
    let isValid = true;

    if (!formData.name) {
      tempErrors.name = "Name is required";
      isValid = false;
    }

    if (!formData.email) {
      tempErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = "Email is invalid";
      isValid = false;
    }

    if (!formData.password) {
      tempErrors.password = "Password is required";
      isValid = false;
    } else if (formData.password.length < 6) {
      tempErrors.password = "Password must be at least 6 characters";
      isValid = false;
    }

    if (!formData.confirmPassword) {
      tempErrors.confirmPassword = "Please confirm your password";
      isValid = false;
    } else if (formData.password !== formData.confirmPassword) {
      tempErrors.confirmPassword = "Passwords do not match";
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      setIsSubmitting(true);
      const { confirmPassword, ...userData } = formData;
      const success = await register(userData);
      setIsSubmitting(false);

      if (success) {
        navigate("/", { replace: true });
      }
    }
  };

  return (
    <div className="flex h-screen fade-in">
      <div className="flex-1 flex flex-col justify-center px-12 max-w-[500px] mx-auto w-full md:px-6">
        <h1 className="text-4xl font-bold text-primary-600 mb-2">SMITApp</h1>
        <p className="text-gray-600 mb-8">Create your account to get started</p>

        <form onSubmit={handleSubmit} className="space-y-5 mb-6">
          <InputField
            type="text"
            name="name"
            label="Full Name"
            placeholder="John Doe"
            value={formData.name}
            onChange={handleChange}
            error={errors.name}
          />

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
            placeholder="Choose a password"
            value={formData.password}
            onChange={handleChange}
            error={errors.password}
          />

          <InputField
            type="password"
            name="confirmPassword"
            label="Confirm Password"
            placeholder="Confirm your password"
            value={formData.confirmPassword}
            onChange={handleChange}
            error={errors.confirmPassword}
          />

          <Button type="submit" fullWidth primary disabled={isSubmitting}>
            {isSubmitting ? "Creating account..." : "Register"}
          </Button>
        </form>

        <p className="text-sm text-gray-600 text-center">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-primary-600 font-medium hover:underline"
          >
            Login
          </Link>
        </p>
      </div>

      <div className="hidden md:flex flex-1 bg-gradient-to-br from-primary-600 to-primary-800 items-center justify-center relative overflow-hidden">
        <div className="text-white text-center max-w-md px-8">
          <h2 className="text-3xl mb-4">Simplify your workflow</h2>
          <p className="text-lg opacity-90">
            Create, organize, and track your tasks with our intuitive task
            management platform.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
