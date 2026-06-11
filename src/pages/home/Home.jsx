import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "../../api/axiosSecure";
import { useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";

import { MdMailOutline } from "react-icons/md";
import { IoCallOutline, IoLocationOutline } from "react-icons/io5";


const blogs = [
  {
    id: 1,
    title: "How To Write A Winning SOP",
    content: `A Statement of Purpose (SOP) is one of the most important documents in any scholarship application. Universities use it to understand your academic journey, career goals, achievements, and motivation. A strong SOP should tell a compelling story about who you are and why you deserve the opportunity. Start with a clear introduction, explain your academic background, highlight relevant experiences, and connect them with your future goals. Avoid copying templates from the internet because admissions officers can easily identify generic content. Instead, focus on authentic experiences and specific examples that demonstrate your passion and determination. Proofread carefully to remove grammatical errors and ensure clarity. A well-written SOP can significantly increase your chances of securing scholarships and admission offers from top universities worldwide.`,
  },
  {
    id: 2,
    title: "Scholarship Interview Tips",
    content: `Many scholarship providers conduct interviews to evaluate candidates beyond their written applications. Preparation is the key to success. Start by researching the scholarship program, university, and organization offering the award. Be ready to discuss your academic achievements, leadership experiences, career plans, and reasons for choosing the institution. Practice answering common questions confidently while maintaining a natural tone. During the interview, demonstrate enthusiasm, professionalism, and genuine interest. Listen carefully to each question before responding. Avoid memorized answers because interviewers value authenticity. Dress appropriately, maintain eye contact, and communicate clearly. Following these practices can help you leave a positive impression and improve your chances of receiving scholarship funding.`,
  },
  {
    id: 3,
    title: "Common Application Mistakes",
    content: `Thousands of students lose scholarship opportunities due to avoidable mistakes. One common issue is submitting incomplete applications. Missing documents, incorrect information, or failure to meet eligibility requirements can lead to immediate rejection. Another mistake is waiting until the last minute to apply, which increases the risk of technical problems and rushed submissions. Many applicants also fail to customize their essays and personal statements for specific scholarships. Generic applications rarely stand out among competitive candidates. Additionally, ignoring proofreading can result in spelling and grammar mistakes that reduce professionalism. Taking time to review every detail before submission can dramatically improve your chances of success.`,
  },
  {
    id: 4,
    title: "Finding Fully Funded Scholarships",
    content: `Fully funded scholarships cover tuition fees, living expenses, travel costs, and sometimes health insurance. These opportunities are highly competitive, but thousands of students receive them every year. To improve your chances, begin your search early and focus on scholarships that match your academic profile and career goals. Research government-funded programs, university scholarships, and international organizations. Keep track of deadlines and prepare required documents in advance. Strong academic performance, leadership experience, and community involvement often strengthen applications. By staying organized and applying strategically, students can significantly increase their chances of securing fully funded opportunities abroad.`,
  },
];

const partners = [
  {
    name: "Harvard University",
    logo:
      "https://i.ibb.co.com/Pv2tYjjB/harvard-logo-958x575.png",
  },
  {
    name: "MIT",
    logo:
      "https://i.ibb.co.com/TDSf29FF/massachusetts-institute-of-technology-mit-logo.png",
  },
  {
    name: "Oxford University",
    logo:
      "https://i.ibb.co.com/zDw6b0p/University-of-Oxford-Logo-wine.jpg",
  },
  {
    name: "Stanford University",
    logo:
      "https://i.ibb.co.com/p68h5Wcm/Stanford-Emblem.png",
  },
  {
    name: "Cambridge University",
    logo:
      "https://i.ibb.co.com/s9bvv98d/university-of-cambridge-logo-1.png",
  },
  {
    name: "Yale University",
    logo:
      "https://i.ibb.co.com/zTmvBq2c/yale-university-logo-png-2.png",
  },
  {
    name: "University of Sydney",
    logo:
      "https://i.ibb.co.com/DP2fr0Fp/university-of-sydney-logo-png-seeklogo-250838.png",
  },
];


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
  const [selectedBlog, setSelectedBlog] = useState(null);
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
          ABOUT SECTION
      =================================================== */}
      <section
        id="about"
        className="bg-base-200 py-20 px-6 lg:px-12 rounded-3xl"
      >
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold text-primary mb-6">
              About ScholarStream
            </h2>

            <p className="max-w-3xl mx-auto text-lg leading-8 text-base-content/70">
              ScholarStream is a comprehensive scholarship management platform
              designed to bridge the gap between talented students and
              life-changing educational opportunities across the world.
            </p>
          </div>

          {/* Mission & Vision */}
          <div className="grid lg:grid-cols-2 gap-10 mb-20">
            <div className="bg-base-100 shadow-xl p-8 rounded-2xl">
              <h3 className="text-3xl font-bold text-primary mb-4 text-center">
                Our Mission
              </h3>

              <p className="leading-8 text-base-content/80">
                To make scholarship discovery and application processes
                accessible, transparent, and efficient for students
                worldwide, regardless of their background or location.
              </p>
            </div>

            <div className="bg-base-100 shadow-xl p-8 rounded-2xl">
              <h3 className="text-3xl font-bold text-primary mb-4 text-center">
                Our Vision
              </h3>

              <p className="leading-8 text-base-content/80">
                We envision a world where financial barriers never prevent
                deserving students from pursuing quality higher education
                and achieving their academic dreams.
              </p>
            </div>
          </div>


          {/* Statistics */}
          <div className="bg-primary text-primary-content rounded-3xl p-10 mb-20">
            <div className="grid md:grid-cols-4 gap-8 text-center">

              <div>
                <h3 className="text-5xl font-bold">500+</h3>
                <p className="mt-2">Scholarships Listed</p>
              </div>

              <div>
                <h3 className="text-5xl font-bold">100+</h3>
                <p className="mt-2">Partner Universities</p>
              </div>

              <div>
                <h3 className="text-5xl font-bold">10K+</h3>
                <p className="mt-2">Student Applications</p>
              </div>

              <div>
                <h3 className="text-5xl font-bold">50+</h3>
                <p className="mt-2">Countries Covered</p>
              </div>

            </div>
          </div>

          {/* Story Section */}
          <div className="bg-base-100 rounded-3xl shadow-xl p-10">
            <h2 className="text-4xl font-bold mb-6 text-primary text-center">
              Our Story
            </h2>

            <p className="leading-8 text-base-content/80 mb-4">
              Many talented students miss scholarship opportunities simply
              because information is scattered across different websites,
              application procedures are confusing, and tracking progress
              becomes overwhelming.
            </p>

            <p className="leading-8 text-base-content/80">
              ScholarStream was created to solve these challenges by
              providing a centralized platform where students can discover,
              apply for, and manage scholarships effortlessly while
              universities can efficiently reach deserving candidates.
            </p>
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

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

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

      <section className="py-20 bg-base-200 overflow-hidden rounded-3xl">
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
          BLOG SECTION
      =================================================== */}


      <section className="bg-base-200 p-12 rounded-3xl">

        <h2 className="text-4xl font-bold text-primary mb-12 text-center">
          Latest Scholarship Tips
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

          {blogs.map((blog) => (

            <div
              key={blog.id}
              className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300"
            >

              <div className="card-body">

                <h3 className="card-title text-primary text-md font-bold">
                  {blog.title}
                </h3>

                <p className="line-clamp-4 text-base-content/80">
                  {blog.content}
                </p>

                <div className="card-actions justify-end mt-4">

                  <button
                    className="btn btn-primary btn-sm px-2"
                    onClick={() => setSelectedBlog(blog)}
                  >
                    Read More
                  </button>

                </div>

              </div>

            </div>

          ))}

        </div>

      </section>


      {selectedBlog && (
        <dialog
          className="modal modal-open"
        >
          <div className="modal-box max-w-3xl max-h-[90vh] overflow-y-auto">

            <div className="sticky top-0 bg-base-100 z-10 flex justify-end pb-2">
              <button
                className="btn btn-sm"
                onClick={() => setSelectedBlog(null)}
              >
                ✕
              </button>
            </div>

            <h3 className="font-bold text-2xl text-primary mb-4">
              {selectedBlog.title}
            </h3>

            <p className="py-4 leading-8">
              {selectedBlog.content}
            </p>

            <div className="modal-action">

              <button
                className="btn"
                onClick={() => setSelectedBlog(null)}
              >
                Close
              </button>

            </div>

          </div>

          <div
            className="modal-backdrop"
            onClick={() => setSelectedBlog(null)}
          />
        </dialog>
      )}


      {/* ===================================================
          PARTNERS SECTION
      =================================================== */}

      <section className="py-20 bg-base-200 rounded-3xl">

        <div className="text-center mb-12">

          <h2 className="text-4xl font-bold text-primary">
            Our Partners
          </h2>

          <p className="opacity-70 mt-3">
            Trusted universities and institutions worldwide
          </p>

        </div>

        <Swiper
          modules={[Autoplay]}
          spaceBetween={30}
          slidesPerView={2}
          loop={true}
          autoplay={{
            delay: 0,
            disableOnInteraction: false,
          }}
          speed={3000}
          breakpoints={{
            640: {
              slidesPerView: 3,
            },
            768: {
              slidesPerView: 4,
            },
            1024: {
              slidesPerView: 5,
            },
          }}
        >

          {partners.map((partner, index) => (
            <SwiperSlide key={index}>

              <div className="bg-base-100 h-40 rounded-2xl shadow-lg flex flex-col items-center justify-center mx-2">

                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="h-16 object-contain mb-4"
                />

                <h3 className="font-semibold text-center">
                  {partner.name}
                </h3>

              </div>

            </SwiperSlide>
          ))}

        </Swiper>

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

      <section id="contact" className="bg-base-200 rounded-3xl p-10 md:p-16">

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