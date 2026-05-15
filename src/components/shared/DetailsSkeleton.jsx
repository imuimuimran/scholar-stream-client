const DetailsSkeleton = () => {
  return (
    <div className="max-w-6xl mx-auto py-10 px-4">

      <div className="grid md:grid-cols-2 gap-10">

        <div className="skeleton h-[350px] w-full rounded-2xl"></div>

        <div className="space-y-4">

          <div className="skeleton h-10 w-3/4"></div>

          <div className="skeleton h-5 w-1/2"></div>

          <div className="skeleton h-5 w-full"></div>

          <div className="skeleton h-5 w-full"></div>

          <div className="skeleton h-12 w-40 mt-8"></div>

        </div>

      </div>

    </div>
  );
};

export default DetailsSkeleton;