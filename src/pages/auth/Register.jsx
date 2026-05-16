import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../providers/AuthProvider";
import { FcGoogle } from "react-icons/fc";

export default function Register() {

  const { signup, googleLogin } = useAuth();

  const [form, setForm] = useState({
    name: "",
    photoURL: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

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
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="bg-white p-8 rounded-lg shadow w-full max-w-md">

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
            className="w-full border p-2 rounded"
            required
          />

          <input
            type="text"
            name="photoURL"
            placeholder="Photo URL"
            value={form.photoURL}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
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
            className="text-blue-600 underline"
          >
            Login
          </Link>

        </p>

      </div>

    </div>
  );
}



