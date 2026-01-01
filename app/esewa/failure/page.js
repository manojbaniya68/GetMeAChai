export default function FailedPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-red-100 px-4">
      <div className="bg-white shadow-xl rounded-2xl p-10 max-w-md w-full text-center border border-red-200 animate-fadeIn">
        
        <div className="flex justify-center mb-4">
          <div className="bg-red-100 text-red-600 w-20 h-20 flex items-center justify-center rounded-full shadow-inner">
            <svg
              className="w-12 h-12"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 
                1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 17c-.77 
                1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
        </div>

        <h1 className="text-3xl font-bold text-red-600 mb-3">Payment Failed</h1>
        <p className="text-gray-600 mb-6">
          We were unable to verify your payment.  
          Please try again or contact support if the issue persists.
        </p>

        <a
          href="/"
          className="inline-block mt-3 bg-red-600 text-white px-6 py-3 rounded-xl shadow hover:bg-red-700 transition"
        >
          Go Back Home
        </a>
      </div>
    </div>
  );
}

