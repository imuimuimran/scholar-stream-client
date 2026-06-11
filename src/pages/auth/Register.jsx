import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../providers/AuthProvider";
import { FcGoogle } from "react-icons/fc";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function Register() {

  const { signup, googleLogin } = useAuth();

  const [form, setForm] = useState({
    name: "",
    photoURL: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  /* ===================================================
      REGISTER SUBMIT
  =================================================== */

  const handleSubmit = async (e) => {

    e.preventDefault();

    const { password } = form;

    /* ================= PASSWORD VALIDATION ================= */

    // Minimum 6 characters
    if (password.length < 6) {
      alert("Password must be at least 6 characters long.");
      return;
    }

    // At least one uppercase letter
    if (!/[A-Z]/.test(password)) {
      alert(
        "Password must contain at least one uppercase letter."
      );
      return;
    }

    // At least one number
    if (!/[0-9]/.test(password)) {
      alert(
        "Password must contain at least one number."
      );
      return;
    }

    // At least one special character
    if (!/[!@#$%^&*(),.?\":{}|<>]/.test(password)) {
      alert(
        "Password must contain at least one special character."
      );
      return;
    }

    try {

      setLoading(true);

      await signup(
        form.email,
        form.password,
        form.name,
        form.photoURL
      );

      navigate("/dashboard", {
        replace: true,
      });

    } catch (err) {

      alert(
        err.message || "Registration failed"
      );

    } finally {

      setLoading(false);

    }
  };

  /* ===================================================
      GOOGLE LOGIN
  =================================================== */

  const handleGoogleLogin = async () => {

    try {

      setLoading(true);

      await googleLogin();

      navigate("/dashboard", {
        replace: true,
      });

    } catch (err) {

      alert(
        err.message || "Google login failed"
      );

    } finally {

      setLoading(false);

    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">

      <div className="bg-base-100 p-8 rounded-lg shadow-xl w-full max-w-md">

        <h2 className="text-2xl font-semibold mb-6 text-center">
          Register
        </h2>

        {/* ================= FORM ================= */}

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />

          <input
            type="text"
            name="photoURL"
            placeholder="Photo URL"
            value={form.photoURL}
            onChange={handleChange}
            className="input input-bordered w-full"
          />

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

          <p className="text-xs opacity-70">
            Password must contain:
          </p>

          <ul className="text-xs opacity-70 list-disc ml-5">
            <li>Minimum 6 characters</li>
            <li>One uppercase letter</li>
            <li>One number</li>
            <li>One special character</li>
          </ul>

          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary w-full"
          >
            {loading
              ? "Registering..."
              : "Register"}
          </button>

        </form>

        {/* ================= DIVIDER ================= */}

        <div className="divider">
          OR
        </div>

        {/* ================= GOOGLE LOGIN ================= */}

        <button
          onClick={handleGoogleLogin}
          disabled={loading}
          className="btn btn-outline w-full flex items-center gap-2"
        >

          <FcGoogle size={20} />

          Continue with Google

        </button>

        {/* ================= LOGIN LINK ================= */}

        <p className="text-sm mt-4 text-center">

          Already have an account?{" "}

          <Link
            to="/login"
            className="link link-primary"
          >
            Login
          </Link>

        </p>

      </div>

    </div>
  );
}



