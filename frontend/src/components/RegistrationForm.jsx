import { useState } from 'react';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';


export default function RegistrationForm() {
  const navigate = useNavigate(); // ✅ Correct
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    
    return newErrors;
  };

 const handleSubmit = async (e) => {
  e.preventDefault();
  const newErrors = validateForm();

  if (Object.keys(newErrors).length > 0) {
    setErrors(newErrors);
    return;
  }

  setIsSubmitting(true);

  try {
    const res = await fetch('http://localhost:5001/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (res.ok) {
      alert('✅ Registration successful!');
      // ✅ Reset form
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
      });
      setErrors({});
       // ✅ Redirect to login
      navigate('/login');
    } else {
      alert(`❌ ${data.message || 'Something went wrong'}`);
    }
  } catch (err) {
    console.error('Registration error:', err);
    alert('❌ Failed to connect to the server');
  } finally {
    setIsSubmitting(false);
  }
};

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Account</h1>
          
        </div>

        {/* Form */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8">
          <div className="space-y-6">
            {/* Name Fields */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <input
                  type="text"
                  name="firstName"
                  placeholder="First name"
                  value={formData.firstName}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 outline-none ${
                    errors.firstName 
                      ? 'border-red-300 bg-red-50' 
                      : 'border-gray-200 focus:border-blue-500 focus:bg-blue-50'
                  }`}
                />
                {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
              </div>
              <div>
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last name"
                  value={formData.lastName}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 outline-none ${
                    errors.lastName 
                      ? 'border-red-300 bg-red-50' 
                      : 'border-gray-200 focus:border-blue-500 focus:bg-blue-50'
                  }`}
                />
                {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
              </div>
            </div>

            {/* Email */}
            <div>
              <input
                type="email"
                name="email"
                placeholder="Email address"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 outline-none ${
                  errors.email 
                    ? 'border-red-300 bg-red-50' 
                    : 'border-gray-200 focus:border-blue-500 focus:bg-blue-50'
                }`}
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>

            {/* Phone */}
            <div>
              <input
                type="tel"
                name="phone"
                placeholder="Phone number"
                value={formData.phone}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 outline-none ${
                  errors.phone 
                    ? 'border-red-300 bg-red-50' 
                    : 'border-gray-200 focus:border-blue-500 focus:bg-blue-50'
                }`}
              />
              {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
            </div>

            <div className="relative">
  <input
    type={showPassword ? 'text' : 'password'}
    name="password"
    placeholder="Password"
    value={formData.password}
    onChange={handleChange}
    className={`w-full px-4 py-3 rounded-xl border-2 pr-12 transition-all duration-200 outline-none ${
      errors.password
        ? 'border-red-300 bg-red-50'
        : 'border-gray-200 focus:border-blue-500 focus:bg-blue-50'
    }`}
  />
  <button
    type="button"
    className="absolute right-3 top-3 text-gray-500"
    onClick={() => setShowPassword(prev => !prev)}
  >
    {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
  </button>
  {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
</div>

            <div className="relative">
  <input
    type={showConfirmPassword ? 'text' : 'password'}
    name="confirmPassword"
    placeholder="Confirm password"
    value={formData.confirmPassword}
    onChange={handleChange}
    className={`w-full px-4 py-3 rounded-xl border-2 pr-12 transition-all duration-200 outline-none ${
      errors.confirmPassword
        ? 'border-red-300 bg-red-50'
        : 'border-gray-200 focus:border-blue-500 focus:bg-blue-50'
    }`}
  />
  <button
    type="button"
    className="absolute right-3 top-3 text-gray-500"
    onClick={() => setShowConfirmPassword(prev => !prev)}
  >
    {showConfirmPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
  </button>
  {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
</div>
            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              onClick={handleSubmit}
              className={`w-full py-3 px-4 rounded-xl font-semibold text-white transition-all duration-200 ${
                isSubmitting
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 active:scale-95'
              } shadow-lg hover:shadow-xl`}
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2"></div>
                  Creating Account...
                </div>
              ) : (
                'Create Account'
              )}
            </button>
          </div>

          {/* Footer */}
         
        </div>

        {/* Trust Indicators */}
        
      </div>
    </div>
  );
}