import { motion } from "framer-motion";

const Home = () => {
  return (
    <section className="text-center py-20">
      <motion.h1
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl md:text-6xl font-bold text-primary mb-6"
      >
        Find Your Dream Scholarship
      </motion.h1>

      <p className="max-w-xl mx-auto text-lg opacity-80 mb-8">
        Explore thousands of scholarships worldwide and apply easily through
        ScholarStream.
      </p>

      <button className="btn btn-primary btn-lg">
        Search Scholarships
      </button>
    </section>
  );
};

export default Home;
