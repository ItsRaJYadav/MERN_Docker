import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { RiDeleteBinLine, RiEdit2Line } from "react-icons/ri";
import Spinner from "../Global/Spinner";

function AdminPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/v1/auth/admin/alluser");
      const fetchedUsers = response.data;
      setUsers(fetchedUsers);
      setLoading(false);
    } catch (error) {
      setError("Error fetching users. Please try again later."); // Set error state in case of error
      setLoading(false);
      console.error("Error fetching users:", error);
    }
  };

  const handleDeleteUser = async (userId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          setLoading(true);
          await axios.delete(`/api/v1/auth/admin/deleteuser/${userId}`);
          await fetchUsers();
          setLoading(false);
          Swal.fire("Deleted!", "User has been deleted.", "success");
        } catch (error) {
          setError("Error deleting user. Please try again later.");
          setLoading(false);
          console.error("Error deleting user:", error);
          Swal.fire("Error", "Failed to delete user.", "error");
        }
      }
    });
  };

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="container mx-auto px-10 py-8">
      <h2 className="text-2xl font-bold mb-4 text-center">All Users</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {users.map((user) => (
          <div
            key={user._id}
            className="bg-white shadow-md rounded-md p-4 flex flex-col justify-between h-full"
          >
            <div>
              <h3 className="text-lg font-semibold mb-2">{user.name}</h3>
              <p className="text-gray-500 mb-1">Email: {user.email}</p>
              <p className="text-gray-500">ID: {user._id}</p>
              <p className="text-gray-500 mt-2">
                Joined: {new Date(user.createdAt).toLocaleString()}
              </p>
            </div>
            <div className="flex items-center mt-4">
              <button
                onClick={() => handleDeleteUser(user._id)}
                className="text-red-500 hover:text-red-700 focus:outline-none ml-2"
              >
                <RiDeleteBinLine />
              </button>
              <button className="text-blue-500 hover:text-blue-700 focus:outline-none ml-2">
                <RiEdit2Line />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminPage;
