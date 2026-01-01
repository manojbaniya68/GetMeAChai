// export default function SuccessPage() {
//   return
//   );
// }

"use client";
export default function SuccessPage() {
  return  (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-green-100 px-4">
      <div className="bg-white shadow-xl rounded-2xl p-10 max-w-md w-full text-center border border-green-200 animate-fadeIn">

        <div className="flex justify-center mb-4">
          <div className="bg-green-100 text-green-600 w-20 h-20 flex items-center justify-center rounded-full shadow-inner">
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
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        </div>

        <h1 className="text-3xl font-bold text-green-600 mb-3">Payment Successful!</h1>
        <p className="text-gray-600 mb-6">
          Thank you! Your payment has been verified successfully.
          You will receive the confirmation shortly.
        </p>

       <a
          href="/"
          className="inline-block mt-3 bg-green-600 text-white px-6 py-3 rounded-xl shadow hover:bg-green-700 transition"
        >
          Go Back Home
        </a>
      </div>
    </div>
   );
}
