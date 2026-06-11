import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useAuth } from "../../providers/AuthProvider";
import { FcGoogle } from "react-icons/fc";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function Login() {
  const { login, googleLogin, resetPassword } = useAuth();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  // redirect back to previous page after login
  const from = location.state?.from?.pathname || "/dashboard";

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await login(form.email, form.password);

      navigate(from, { replace: true });
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await googleLogin();
      navigate(from, { replace: true });
    } catch (err) {
      console.error(err);
    }
  };

  const handleForgotPassword = async () => {

    if (!form.email) {
      alert("Please enter your email first");
      return;
    }

    try {

      await resetPassword(form.email);

      alert(
        "Password reset email sent. Check your inbox."
      );

    } catch (err) {

      alert(
        err.message || "Failed to send reset email"
      );
    }
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
      <div className="bg-base-100 p-8 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-6">Login</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />

          {/* <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          /> */}


          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className="input input-bordered w-full"
              required
            />

            <button
              type="button"
              onClick={() =>
                setShowPassword(!showPassword)
              }
              className="absolute right-3 top-3"
            >
              {showPassword ? (
                <FaEyeSlash />
              ) : (
                <FaEye />
              )}
            </button>
          </div>



          <div className="text-right">
            <button
              type="button"
              onClick={handleForgotPassword}
              className="text-sm text-primary hover:underline"
            >
              Forgot Password?
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary w-full"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="divider">OR</div>

        <button
          onClick={handleGoogleLogin}
          className="btn btn-outline w-full flex items-center gap-2"
        >
          <FcGoogle size={20} />
          Continue with Google
        </button>

        <p className="text-sm mt-4 text-center">
          Don’t have an account?{" "}
          <Link to="/register" className="link link-primary">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
