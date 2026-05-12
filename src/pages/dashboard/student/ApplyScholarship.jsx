// import { useParams, useNavigate } from "react-router-dom";
// import { useQuery } from "@tanstack/react-query";
// import axios from "../../../api/axiosSecure";

// const ApplyScholarship = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const { data: scholarship, isLoading } = useQuery({
//     queryKey: ["scholarship", id],
//     queryFn: async () => {
//       const res = await axios.get(`/api/scholarships/${id}`);
//       return res.data;
//     },
//   });

//   if (isLoading) {
//     return (
//       <div className="flex justify-center py-20">
//         <span className="loading loading-spinner loading-lg"></span>
//       </div>
//     );
//   }

//   if (!scholarship) {
//     return (
//       <div className="text-center py-20">
//         Scholarship not found
//       </div>
//     );
//   }

//   const handleCheckout = () => {
//     navigate(`/checkout/${id}`); 
//   };

//   return (
//     <section className="max-w-3xl mx-auto">
//       <div className="card bg-base-100 shadow-xl">
//         <div className="card-body">

//           <h1 className="text-3xl font-bold">
//             {scholarship.scholarshipName}
//           </h1>

//           <p className="text-lg opacity-70">
//             {scholarship.universityName}
//           </p>

//           <div className="grid md:grid-cols-2 gap-4 mt-6">

//             <div className="bg-base-200 p-4 rounded-xl">
//               <h3 className="font-bold mb-2">Scholarship Info</h3>

//               <p>
//                 <strong>Country:</strong>{" "}
//                 {scholarship.university }
//               </p>

//               <p>
//                 <strong>Degree:</strong>{" "}
//                 {scholarship.degree}
//               </p>

//               <p>
//                 <strong>Category:</strong>{" "}
//                 {scholarship.scholarshipCategory}
//               </p>
//             </div>

//             <div className="bg-base-200 p-4 rounded-xl">
//               <h3 className="font-bold mb-2">Payment Info</h3>

//               <p>
//                 <strong>Application Fee:</strong> $
//                 {scholarship.applicationFees}
//               </p>

//               <p>
//                 <strong>Service Charge:</strong> $
//                 {scholarship.serviceCharge}
//               </p>
//             </div>
//           </div>

//           <button
//             onClick={handleCheckout}
//             className="btn btn-primary mt-8"
//           >
//             Proceed To Checkout
//           </button>

//         </div>
//       </div>
//     </section>
//   );
// };

// export default ApplyScholarship;