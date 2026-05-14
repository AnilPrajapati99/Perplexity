import { useSearchParams, useNavigate } from "react-router-dom";

export default function VerifyEmail() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const status = searchParams.get("status"); // ← "success" ya "error" direct milega

  return (
    <div style={{ minHeight: "100vh", background: "#f4f6fb", display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 16px" }}>
      <div style={{ background: "#fff", borderRadius: "12px", border: "0.5px solid #e5e7eb", maxWidth: "440px", width: "100%", padding: "48px 40px", textAlign: "center" }}>

        {status === "success" && (
          <>
            <div style={{ width: 72, height: 72, borderRadius: "50%", background: "#eaf3de", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px", fontSize: 36 }}>✅</div>
            <h1 style={{ fontSize: 22, fontWeight: 500, marginBottom: 10 }}>You're all set!</h1>
            <p style={{ color: "#6b7280", fontSize: 15, marginBottom: 28 }}>Your email has been successfully verified.</p>
            <button onClick={() => navigate("/login")}
              style={{ width: "100%", padding: "13px", background: "#1a56db", color: "#fff", border: "none", borderRadius: 8, fontSize: 15, fontWeight: 500, cursor: "pointer" }}>
              Go to login
            </button>
          </>
        )}

        {status === "error" && (
          <>
            <div style={{ width: 72, height: 72, borderRadius: "50%", background: "#fef2f2", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px", fontSize: 36 }}>❌</div>
            <h1 style={{ fontSize: 22, fontWeight: 500, marginBottom: 10 }}>Verification failed</h1>
            <p style={{ color: "#6b7280", fontSize: 15, marginBottom: 28 }}>Link expired or invalid. Request a new one.</p>
            <button onClick={() => navigate("/register")}
              style={{ width: "100%", padding: "13px", background: "#1a56db", color: "#fff", border: "none", borderRadius: 8, fontSize: 15, fontWeight: 500, cursor: "pointer" }}>
              Resend verification email
            </button>
          </>
        )}

        {!status && (
          <>
            <div style={{ width: 72, height: 72, borderRadius: "50%", background: "#e6f1fb", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px" }}>
              <span style={{ fontSize: 32 }}>⏳</span>
            </div>
            <h1 style={{ fontSize: 22, fontWeight: 500, marginBottom: 10 }}>Verifying your email</h1>
            <p style={{ color: "#6b7280", fontSize: 15 }}>Please wait a moment...</p>
          </>
        )}

      </div>
    </div>
  );
}