import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AlertCircle } from 'lucide-react';

const SignUpForm: React.FC = () => {
  const [error] = useState<string | null>(null);

  const handleRegister = async () => {
    try {
      const response = await fetch('/api/fivem-login/');
      if (!response.ok) {
        throw new Error('Failed to fetch FiveM login URL');
      }
      const data = await response.json();
      window.location.href = data.url;
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4">
      <div className="max-w-md w-full space-y-8 bg-dark-gray p-8 rounded-lg">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold text-white">
            Register with FiveM
          </h2>
          <p className="mt-2 text-center text-sm text-gray-400">
            Already have an account?{' '}
            <Link to="/signin" className="text-gold hover:text-gold/80">
              Sign in
            </Link>
          </p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-3 rounded relative flex items-center gap-2">
            <AlertCircle size={20} />
            <p>{error}</p>
          </div>
        )}

        <div className="mt-8">
          <button
            onClick={handleRegister}
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-black bg-gold hover:bg-gold/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gold"
          >
            Register with FiveM
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;