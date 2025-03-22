import { useState } from "react";

export default function ProfileSetup() {
  const [fullName, setFullName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [religion, setReligion] = useState("");
  const [location, setLocation] = useState("");
  const [bio, setBio] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Not logged in!");
      return;
    }

    try {
      const res = await fetch("https://your-backend-url.onrender.com/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          fullName,
          age: parseInt(age),
          gender,
          religion,
          location,
          bio,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Something went wrong");
      } else {
        alert("Profile created!");
        // later: navigate to match list page
      }
    } catch (err) {
      console.error("Profile error:", err);
      alert("Server error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-purple-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-purple-700">
          Set Up Your Profile
        </h2>

        <input
          type="text"
          placeholder="Full Name"
          className="w-full p-3 mb-4 border rounded-lg"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
        />

        <input
          type="number"
          placeholder="Age"
          className="w-full p-3 mb-4 border rounded-lg"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Gender"
          className="w-full p-3 mb-4 border rounded-lg"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Religion"
          className="w-full p-3 mb-4 border rounded-lg"
          value={religion}
          onChange={(e) => setReligion(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Location"
          className="w-full p-3 mb-4 border rounded-lg"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
        />

        <textarea
          placeholder="Short Bio"
          className="w-full p-3 mb-4 border rounded-lg h-24"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
        />

        <button
          type="submit"
          className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition"
        >
          Save Profile
        </button>
      </form>
    </div>
  );
}

