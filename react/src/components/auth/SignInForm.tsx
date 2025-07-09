import React from 'react';

const SignInForm: React.FC = () => {
  const handleSignIn = async () => {
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
            Sign in with FiveM
          </h2>
        </div>

        <div className="mt-8">
          <button
            onClick={handleSignIn}
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-black bg-gold hover:bg-gold/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gold"
          >
            Sign in with FiveM
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignInForm;