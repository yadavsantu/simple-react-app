import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // ← hook

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const res = await fetch('http://localhost:5001/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    if (res.ok) {
      alert('✅ Login successful!');
          // ✅ Save email to localStorage
      localStorage.setItem('userEmail', email);
      navigate('/');
    } else {
      alert(`❌ ${data.message}`);
    }
  } catch (err) {
    console.error('Login error:', err);
    alert('❌ Failed to connect to server');
  }
};
  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-900 text-white">
      <form onSubmit={handleSubmit} className="bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-md space-y-4">
        <h2 className="text-2xl font-bold text-center">Login</h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full px-3 py-2 rounded bg-gray-700 text-white"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full px-3 py-2 rounded bg-gray-700 text-white"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          className="w-full bg-cyan-600 hover:bg-cyan-700 py-2 rounded text-white font-semibold"
        >
          Log In
        </button>
      </form>
    </div>
  );
}
