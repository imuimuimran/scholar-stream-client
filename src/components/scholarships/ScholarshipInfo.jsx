const ScholarshipInfo = ({ scholarship }) => {
  return (
    <div className="card bg-base-200 shadow-lg">
      <figure className="h-72 overflow-hidden">
        <img
          src={scholarship.universityImage}
          alt={scholarship.universityName}
          className="w-full object-cover"
        />
      </figure>

      <div className="card-body">
        <h1 className="text-3xl font-bold">{scholarship.scholarshipName}</h1>

        <p className="text-lg opacity-80">{scholarship.universityName}</p>

        <div className="grid md:grid-cols-3 gap-4 mt-4 text-sm">
          <p>📍 {scholarship.country}</p>
          <p>🎓 {scholarship.category}</p>
          <p>💵 Fee: ${scholarship.applicationFees}</p>
        </div>

        <p className="mt-4">{scholarship.description}</p>
      </div>
    </div>
  );
};

export default ScholarshipInfo;
