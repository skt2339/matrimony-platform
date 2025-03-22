import { useEffect, useState } from "react";

export default function Browse() {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
  const fetchProfiles = async () => {
    try {
      const res = await fetch("https://your-backend-url.onrender.com/profiles", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      setProfiles(data.profiles || []);
    } catch (err) {
      console.error("Error fetching profiles:", err);
    } finally {
      setLoading(false);
    }
  };

  fetchProfiles();
}, [token]);

  if (loading) {
    return <div className="text-center mt-10 text-lg">Loading profiles...</div>;
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold text-center text-purple-700 mb-6">
        Browse Matches
      </h2>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {profiles.length === 0 && (
          <p className="text-center text-gray-500 col-span-full">
            No profiles found 😕
          </p>
        )}
        {profiles.map((profile) => (
          <div
            key={profile.id}
            className="bg-white p-4 rounded-lg shadow hover:shadow-md transition"
          >
            <h3 className="text-xl font-semibold text-purple-800">
              {profile.fullName}, {profile.age}
            </h3>
            <p className="text-sm text-gray-600">
              {profile.gender} | {profile.religion} | {profile.location}
            </p>
            <p className="mt-2 text-gray-700">{profile.bio}</p>
            <button className="mt-4 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition">
              Express Interest ❤️
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

