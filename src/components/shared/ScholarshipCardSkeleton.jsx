const ScholarshipCardSkeleton = () => {
  return (
    <div className="card bg-base-100 shadow-xl">

      <div className="skeleton h-52 w-full"></div>

      <div className="card-body space-y-3">

        <div className="skeleton h-6 w-3/4"></div>

        <div className="skeleton h-4 w-1/2"></div>

        <div className="skeleton h-4 w-full"></div>

        <div className="skeleton h-10 w-full mt-4"></div>

      </div>

    </div>
  );
};

export default ScholarshipCardSkeleton;