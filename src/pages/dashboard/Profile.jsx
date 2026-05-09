import { useAuth } from "../../providers/AuthProvider";

const Profile = () => {
  const { user, dbUser } = useAuth();

  return (
    <div className="max-w-3xl mx-auto">

      <div className="card bg-base-100 shadow-xl">
        <div className="card-body items-center text-center">

          {/* Avatar */}
          <div className="avatar mb-4">
            <div className="w-28 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <img
                src={
                  user?.photoURL ||
                  dbUser?.photoURL ||
                  "https://i.ibb.co/4pDNDk1/avatar.png"
                }
                alt="profile"
              />
            </div>
          </div>

          {/* Name */}
          <h2 className="text-2xl font-bold">
            {user?.displayName || dbUser?.name}
          </h2>

          {/* Email */}
          <p className="text-gray-500">
            {user?.email}
          </p>

          {/* Role */}
          <div className="badge badge-primary mt-3">
            {dbUser?.role || "Student"}
          </div>

        </div>
      </div>

    </div>
  );
};

export default Profile;