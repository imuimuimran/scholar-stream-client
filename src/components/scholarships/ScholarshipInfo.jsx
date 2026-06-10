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

        <h1 className="text-3xl font-bold">
          {scholarship.scholarshipName}
        </h1>

        <p className="text-lg opacity-80">
          {scholarship.universityName}
        </p>

        <div className="grid md:grid-cols-3 gap-4 mt-4 text-sm">

          <p>
            Country: {scholarship.universityCountry}
          </p>

          <p>
            City: {scholarship.universityCity}
          </p>

          <p>
            Degree: {scholarship.degree}
          </p>

          <p>
            Category: {scholarship.scholarshipCategory}
          </p>

          <p>
            Subject: {scholarship.subjectCategory} 
          </p>

          <p>
            Rank: #{scholarship.universityWorldRank}
          </p>

          <p>
            Application Fee: $
            {scholarship.applicationFees}
          </p>

          <p>
            Tuition Fee: $
            {scholarship.tuitionFees}
          </p>

          <p>
            Deadline:{" "}
            {new Date(
              scholarship.applicationDeadline
            ).toLocaleDateString()}
          </p>

        </div>

        <div className="mt-6">
          <h3 className="font-bold text-lg mb-2">
            Description
          </h3>

          <p>{scholarship.description}</p>
        </div>

        {scholarship.stipendDetails && (
          <div className="mt-4">
            <h3 className="font-bold text-lg mb-2">
              Stipend Details
            </h3>

            <p>{scholarship.stipendDetails}</p>
          </div>
        )}

      </div>
    </div>
  );
};

export default ScholarshipInfo;