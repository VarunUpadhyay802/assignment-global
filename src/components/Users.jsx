import React, { useEffect, useState } from "react";
import { fetchUsers } from "../utilities/api";
import UserCard from "./UserCard";
import Pagination from "./Pagination";
import { useSearchParams } from "react-router-dom";

function Users() {
  const [users, setUsers] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = parseInt(searchParams.get("page")) || 1;

  useEffect(() => {
    const getUsers = async () => {
      const data = await fetchUsers(currentPage);
      setUsers(data.data);
      setTotalPages(data.total_pages);
    };
    getUsers();
  }, [currentPage]);

  const handleDeleteUser = (userId) => {
    setUsers(users.filter((user) => user.id !== userId));
  };

  const handlePageChange = (newPage) => {
    setSearchParams({ page: newPage });
  };

  // Filter users based on the search query
  const filteredUsers = users.filter(
    (user) =>
      user.first_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.last_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-purple-100 via-blue-100 to-pink-100">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-8 text-center bg-gray-100 p-6 rounded-md shadow-md flex items-center justify-center gap-4">
          EmployeeWise
          <img
            src="/employwise_logo.jpg"
            alt="EmployeeWise Logo"
            className=" md:h-14 md:w-14 h-12 w-12 object-cover rounded-lg" // Adjusted size and added object-cover
          />
        </h2>

        {/* Search Input */}
        <div className="mb-5">
          <input
            type="text"
            placeholder="Search users..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-2 border rounded-lg shadow border-collapse"
          />
        </div>

        {/* Conditional rendering for users */}
        {filteredUsers.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {filteredUsers.map((user) => (
              <UserCard key={user.id} user={user} onDelete={handleDeleteUser} />
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-600 mt-8">
            <img
              src="/browser.png"
              alt=""
              className="flex justify-between items-center w-1/2 m-auto md:w-1/5"
            />
            <div className="font-bold"> No users found.</div>
          </div>
        )}

        {/* Pagination */}
        {filteredUsers.length > 0 && (
          <div className="mt-8">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default Users;
