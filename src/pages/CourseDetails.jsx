import axios from "axios";

const handleCheckout = async () => {
  const token = localStorage.getItem("access-token");

  const res = await axios.post(
    `${import.meta.env.VITE_SERVER_URL}/api/payments/create-checkout-session`,
    {
      amount: 49, // USD
      courseId: "course_123",
      courseTitle: "Advanced MERN Stack",
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  window.location.href = res.data.url;
};

export default handleCheckout;
