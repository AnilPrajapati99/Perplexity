import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

export default function EmailSent() {
  const navigate = useNavigate();
  const location = useLocation()
  const email = location.state.email || "your@gmail.com"

  return (
    <div style={{ height: "100dvh" }} className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center px-4">
      
      <div className="bg-slate-800 rounded-lg border border-slate-700 p-8 max-w-md w-full text-center">
        
        {/* Icon */}
        <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <span className="text-4xl">📧</span>
        </div>

        {/* Text */}
        <h1 className="text-2xl font-bold text-white mb-3">Check your Gmail!</h1>
        <p className="text-slate-400 mb-2">We sent a verification email to:</p>
        <p className="text-green-400 font-medium mb-6">{email}</p>
        <p className="text-slate-400 text-sm mb-8">
          Click the link in the email to verify your account and get started.
        </p>

        {/* Button */}
        <button
          onClick={() => navigate("/login")}
          className="w-full py-3 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white font-semibold rounded-lg transition-all duration-200"
        >
          Go to Login
        </button>

        <p className="text-slate-500 text-xs mt-4">
          Didn't receive email? Check spam folder.
        </p>

      </div>
    </div>
  );
}