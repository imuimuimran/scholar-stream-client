import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "../../api/axiosSecure";

import { MdMailOutline } from "react-icons/md";
import { IoCallOutline, IoLocationOutline } from "react-icons/io5";

const faqs = [
  {
    q: "How can I apply for a scholarship?",
    a: "Simply create an account, browse scholarships, and apply directly from the scholarship details page.",
  },
  {
    q: "Do I need to pay for applying?",
    a: "Some scholarships may require application fees depending on the university.",
  },
  {
    q: "Can I track my applications?",
    a: "Yes. Your dashboard contains complete application tracking and payment history.",
  },
  {
    q: "Can I leave reviews?",
    a: "Yes. Students can review scholarships after applying successfully.",
  },
  {
    q: "Is ScholarStream international?",
    a: "Yes. We provide scholarships from universities worldwide.",
  },
  {
    q: "How do moderators manage applications?",
    a: "Moderators can review, process, and provide feedback from the dashboard.",
  },
];

const Home = () => {
  const {
    data: reviews = [],
    isLoading: reviewsLoading,
  } = useQuery({
    queryKey: ["home-reviews"],

    queryFn: async () => {
      const res = await axios.get("/api/reviews");

      // HANDLE DIFFERENT RESPONSE SHAPES
      const reviewData =
        res.data.reviews ||
        res.data.data ||
        res.data;

      return reviewData.slice(0, 8);
    },
  });

  const {
    data: scholarships = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["top-scholarships"],

    queryFn: async () => {
      const res = await axios.get("/api/scholarships");

      return res.data.data || res.data;
    },
  });

  /* ================= LOADING ================= */

  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  /* ================= ERROR ================= */

  if (isError) {
    return (
      <div className="text-center py-20 text-red-500">
        Failed to load scholarships
      </div>
    );
  }

  if (reviewsLoading) {
    return (
      <div className="flex justify-center py-20">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="space-y-24">

      {/* ===================================================
          HERO SECTION
      =================================================== */}

      <section className="hero min-h-[85vh] bg-base-200 rounded-3xl overflow-hidden">

        <div className="hero-content flex-col lg:flex-row-reverse gap-10">

          {/* IMAGE */}
          <motion.img
            initial={{ opacity: 0, x: 80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            src="https://i.ibb.co.com/tPm7w3TB/Scholarship-01.png"
            className="max-w-md w-full"
          />

          {/* CONTENT */}
          <div>

            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-5xl md:text-6xl font-bold leading-tight"
            >
              Find Your <span className="text-primary">Dream Scholarship</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="py-6 text-lg opacity-80 max-w-xl"
            >
              Discover thousands of scholarships from top universities around
              the world and manage your applications easily through
              ScholarStream.
            </motion.p>

            <Link to="/scholarships">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn btn-primary btn-lg rounded-full px-10"
              >
                Search Scholarships
              </motion.button>
            </Link>

          </div>

        </div>

      </section>

      {/* ===================================================
          TOP SCHOLARSHIPS
      =================================================== */}

      <section>

        <div className="text-center mb-12">

          <h2 className="text-4xl font-bold text-primary">
            Top Scholarships
          </h2>

          <p className="opacity-70 mt-3">
            Explore our latest scholarship opportunities
          </p>

        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {scholarships.map((scholarship) => (

            <motion.div
              key={scholarship._id}
              whileHover={{ y: -8 }}
              className="card bg-base-100 shadow-xl border"
            >

              <figure>
                <img
                  src={
                    scholarship.universityImage ||
                    "https://i.ibb.co/9H6t0Z2/university.jpg"
                  }
                  alt=""
                  className="h-56 w-full object-cover"
                />
              </figure>

              <div className="card-body">

                <h2 className="card-title text-primary font-bold">
                  {scholarship.scholarshipName}
                </h2>

                <p className="font-medium text-primary">
                  {scholarship.universityName}
                </p>

                <p>
                  Degree: {scholarship.degree}
                </p>

                <p>
                  Category: {scholarship.scholarshipCategory}
                </p>

                <div className="card-actions justify-end mt-4">

                  <Link
                    to={`/scholarships/${scholarship._id}`}
                    className="btn btn-primary btn-sm text-white"
                  >
                    View Details
                  </Link>

                </div>

              </div>

            </motion.div>

          ))}

        </div>

      </section>

      {/* ===================================================
          TESTIMONIALS
      =================================================== */}

      <section className="py-20 bg-base-200 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">

          <h2 className="text-4xl font-bold text-center mb-12 text-primary">
            Testimonials
          </h2>

          <div className="relative overflow-hidden">

            <motion.div
              className="flex gap-6"
              animate={{ x: ["0%", "-100%"] }}
              transition={{
                repeat: Infinity,
                duration: 15,
                ease: "linear",
              }}
            >

              {[...reviews, ...reviews].map((review, index) => (
                <div
                  key={index}
                  className="min-w-[320px] bg-base-100 shadow-xl rounded-2xl p-6 border border-base-300"
                >

                  {/* Reviewer Image */}
                  <div className="flex justify-center mb-4">
                    <img
                      src={
                        review.photoURL ||
                        "https://i.ibb.co/4pDNDk1/avatar.png"
                      }
                      alt={review.reviewerName}
                      className="w-20 h-20 rounded-full object-cover border-4 border-primary"
                    />
                  </div>

                  {/* Reviewer Name */}
                  <h3 className="text-center text-xl font-bold mb-3">
                    {review.reviewerName}
                  </h3>

                  {/* Rating */}
                  {/* <div className="text-center mb-3 text-warning">
                    {"⭐".repeat(review.rating)}
                  </div> */}

                  {/* Scholarship Name */}
                  <h2 className="text-center font-bold mb-3 text-primary">
                    {review.scholarshipName}
                  </h2>

                  {/* Review */}
                  <p className="text-center opacity-80 leading-relaxed">
                    "{review.comment}"
                  </p>

                </div>
              ))}

            </motion.div>

          </div>
        </div>
      </section>




      {/* ===================================================
          FAQ SECTION
      =================================================== */}

      <section>

        <div className="text-center mb-12">

          <h2 className="text-4xl font-bold text-primary">
            F.A.Q.
          </h2>

          <p className="opacity-70 mt-3">
            Frequently asked questions
          </p>

        </div>

        <div className="space-y-4 w-full max-w-7xl mx-auto">

          {faqs.map((faq, index) => (

            <div
              key={index}
              className="collapse collapse-plus bg-base-200 rounded-xl"
            >

              <input type="radio" name="faq-accordion" />

              <div className="collapse-title text-lg font-medium">
                {faq.q}
              </div>

              <div className="collapse-content">
                <p>{faq.a}</p>
              </div>

            </div>

          ))}

        </div>

      </section>

      {/* ===================================================
          CONTACT SECTION
      =================================================== */}

      <section className="bg-base-200 rounded-3xl p-10 md:p-16">

        <div className="grid md:grid-cols-2 gap-10 items-center">

          {/* LEFT */}
          <div>

            <h2 className="text-4xl font-bold mb-5 text-primary">
              Contact Us
            </h2>

            <p className="opacity-80 mb-6">
              Have questions about scholarships or applications?
              Our support team is always ready to help you.
            </p>

            <div className="space-y-3">

              <p className="flex items-center gap-4">
                <MdMailOutline size={20} /> support@scholarstream.com
              </p>

              <p className="flex items-center gap-4">
                <IoCallOutline size={20} /> +880 1234-567890
              </p>

              <p className="flex items-center gap-4">
                <IoLocationOutline size={20} /> Dhaka, Bangladesh
              </p>

            </div>

          </div>

          {/* RIGHT */}
          <form className="space-y-4">

            <input
              type="text"
              placeholder="Your Name"
              className="input input-bordered w-full"
            />

            <input
              type="email"
              placeholder="Your Email"
              className="input input-bordered w-full"
            />

            <textarea
              placeholder="Your Message"
              className="textarea textarea-bordered w-full h-32"
            />

            <button className="btn btn-primary w-full">
              Send Message
            </button>

          </form>

        </div>

      </section>

    </div>
  );
};

export default Home;