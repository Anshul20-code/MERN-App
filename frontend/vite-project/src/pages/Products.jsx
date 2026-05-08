import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Products() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/");
      return;
    }

  fetch(`${import.meta.env.VITE_API_URL}/products`, {
      headers: {
       Authorization: token,
      },
    })
      .then(res => res.json())
      .then(data => setData(data));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-100">

      {/* Navbar */}
      <div className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-gray-800">Products Dashboard</h1>

        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
        >
          Logout
        </button>
      </div>

      {/* Content */}
      <div className="p-6">

        <h2 className="text-2xl font-semibold mb-6 text-gray-700">
          Available Products
        </h2>

       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

  {Array.isArray(data) &&
    data.map((item, i) => (
      <div
        key={i}
        className="bg-white rounded-xl shadow hover:shadow-lg transition p-5 border"
      >
        <h3 className="text-lg font-bold text-gray-800">
          {item.name}
        </h3>

        <p className="text-gray-500 mt-2">
          Product ID: #{i + 1}
        </p>

        <div className="mt-4 text-green-600 font-semibold text-lg">
          ₹{item.price}
        </div>

        <button className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg">
          Buy Now
        </button>
      </div>
  ))}

        </div>
      </div>
    </div>
  );
}

export default Products;