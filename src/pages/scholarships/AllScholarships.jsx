import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import axios from "../../api/axiosSecure";
import ScholarshipCardSkeleton from "../../components/shared/ScholarshipCardSkeleton";

const LIMIT = 9;

const AllScholarships = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [country, setCountry] = useState("");
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("");

  /* ======================
     Fetch scholarships
  ====================== */
  const { data, isLoading } = useQuery({
    queryKey: ["scholarships", page, search, country, category, sort],
    queryFn: async () => {
      const res = await axios.get("/api/scholarships", {
        params: {
          page,
          limit: LIMIT,
          search,
          country,
          category,
          sort,
        },
      });

      return res.data;
    },
    placeholderData: (previousData) => previousData,
  });

  const scholarships = data?.data || [];
  const totalPages = data?.totalPages || 1;

  /* ======================
     Loading
  ====================== */
  // if (isLoading) {
  //   return (
  //     <div className="flex justify-center py-20">
  //       <span className="loading loading-spinner loading-lg text-primary"></span>
  //     </div>
  //   );
  // }

  if (isLoading) {
    return (
      <div className="grid md:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <ScholarshipCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  return (
    <section>
      {/* ================= HEADER ================= */}
      <h1 className="text-3xl text-center font-bold mb-6 text-primary">
        All Scholarships
      </h1>


      {/* ================= SEARCH + FILTER ================= */}
      <div className="grid md:grid-cols-4 gap-4 mb-8">
        {/* Search */}
        <input
          type="text"
          placeholder="Search scholarship or university..."
          className="input input-bordered w-full"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
        />

        {/* Country */}
        <select
          className="select select-bordered"
          value={country}
          onChange={(e) => {
            setCountry(e.target.value);
            setPage(1);
          }}
        >
          <option value="">All Countries</option>

          {[...new Set(scholarships.map((s) => s.country || s.universityCountry))]
            .filter(Boolean)
            .map((countryName) => (
              <option key={countryName} value={countryName}>
                {countryName}
              </option>
            ))}
        </select>

        {/* Category */}
        <select
          className="select select-bordered"
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          <option value="Full fund">Full fund</option>
          <option value="Partial">Partial</option>
          <option value="Self-fund">Self-fund</option>
        </select>

        {/* Sort */}
        <select
          className="select select-bordered"
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="">Sort</option>
          <option value="fees_asc">Fees ↑</option>
          <option value="fees_desc">Fees ↓</option>
          <option value="date_desc">Newest</option>
        </select>
      </div>

      {/* ================= CARDS ================= */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {scholarships.map((sch) => (
          <div
            key={sch._id}
            className="card bg-base-200 shadow-md hover:shadow-xl transition"
          >
            <figure className="h-44 overflow-hidden">
              <img
                src={sch.universityImage}
                alt={sch.universityName}
                className="w-full object-cover"
              />
            </figure>

            <div className="card-body">
              <h2 className="card-title text-primary font-bold">{sch.scholarshipName}</h2>

              <p className="font-medium text-primary">{sch.universityName}</p>

              <div className="text-sm mt-2 space-y-1">
                <p>Country: {sch.universityCountry}</p>
                <p>Degree: {sch.degree}</p>
                <p>Category: {sch.scholarshipCategory}</p>
                <p>Fee: ${sch.applicationFees}</p>
              </div>

              <div className="card-actions justify-end mt-4">
                <Link
                  to={`/scholarships/${sch._id}`}
                  className="btn btn-primary btn-sm text-white"
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ================= PAGINATION ================= */}
      <div className="flex justify-center gap-2 mt-10">
        <button
          className="btn btn-sm"
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
        >
          Prev
        </button>

        <span className="btn btn-sm btn-disabled">
          {page} / {totalPages}
        </span>

        <button
          className="btn btn-sm"
          disabled={page === totalPages}
          onClick={() => setPage((p) => p + 1)}
        >
          Next
        </button>
      </div>
    </section>
  );
};

export default AllScholarships;
