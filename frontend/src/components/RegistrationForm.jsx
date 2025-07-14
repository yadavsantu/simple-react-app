import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';

export default function RegistrationForm() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setError,
    reset,
    formState: { errors, isSubmitting }
  } = useForm();

  const password = watch("password");

  const onSubmit = async (data) => {
    try {
      const otpRes = await fetch('http://localhost:5001/api/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: data.email,
          firstName: data.firstName,
          lastName: data.lastName,
          phone: data.phone,
          password: data.password,
        }),
      });

      const otpData = await otpRes.json();

      if (otpRes.ok) {
        alert('✅ OTP sent to email! Please verify.');
        reset(); // Clear form
        navigate('/verify-otp', {
          state: { email: data.email },
        });
      } else {
        alert(`❌ OTP Error: ${otpData.message || 'Failed to send OTP'}`);
      }
    } catch (err) {
      console.error('Registration error:', err);
      alert('❌ Failed to connect to the server');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Account</h1>
        </div>

        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* First and Last Name */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <input
                  {...register('firstName', { required: 'First name is required' })}
                  type="text"
                  placeholder="First name"
                  className={`w-full px-4 py-3 rounded-xl border-2 outline-none ${
                    errors.firstName
                      ? 'border-red-300 bg-red-50'
                      : 'border-gray-200 focus:border-blue-500 focus:bg-blue-50'
                  }`}
                />
                {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName.message}</p>}
              </div>
              <div>
                <input
                  {...register('lastName', { required: 'Last name is required' })}
                  type="text"
                  placeholder="Last name"
                  className={`w-full px-4 py-3 rounded-xl border-2 outline-none ${
                    errors.lastName
                      ? 'border-red-300 bg-red-50'
                      : 'border-gray-200 focus:border-blue-500 focus:bg-blue-50'
                  }`}
                />
                {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName.message}</p>}
              </div>
            </div>

            {/* Email */}
            <div>
              <input
                {...register('email', {
                  required: 'Email is required',
                  pattern: { value: /^\S+@\S+$/i, message: 'Invalid email' },
                })}
                type="email"
                placeholder="Email address"
                className={`w-full px-4 py-3 rounded-xl border-2 outline-none ${
                  errors.email
                    ? 'border-red-300 bg-red-50'
                    : 'border-gray-200 focus:border-blue-500 focus:bg-blue-50'
                }`}
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
            </div>

            {/* Phone */}
            <div>
              <input
                {...register('phone', { required: 'Phone number is required' })}
                type="tel"
                placeholder="Phone number"
                className={`w-full px-4 py-3 rounded-xl border-2 outline-none ${
                  errors.phone
                    ? 'border-red-300 bg-red-50'
                    : 'border-gray-200 focus:border-blue-500 focus:bg-blue-50'
                }`}
              />
              {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
            </div>

            {/* Password */}
            <div className="relative">
              <input
                {...register('password', {
                  required: 'Password is required',
                  minLength: { value: 6, message: 'Min 6 characters' },
                })}
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                className={`w-full px-4 py-3 pr-12 rounded-xl border-2 outline-none ${
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
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
            </div>

            {/* Confirm Password */}
            <div className="relative">
              <input
                {...register('confirmPassword', {
                  required: 'Please confirm your password',
                  validate: value =>
                    value === password || 'Passwords do not match',
                })}
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="Confirm password"
                className={`w-full px-4 py-3 pr-12 rounded-xl border-2 outline-none ${
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
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
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
          </form>
        </div>
      </div>
    </div>
  );
}