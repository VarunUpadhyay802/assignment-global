import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { deleteUser, edilteUser, updateUser } from '../utilities/api';
import UserEditModal from '../userModel';

function UserCard({ user, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);

  const handleDelete = async (id) => {
    try {
      await deleteUser(id);
      toast.success("User successfully deleted!", { position: "top-center" });
      onDelete(id);
    } catch (error) {
      toast.error("Error deleting user.");
      console.error("Error deleting user:", error);
    }
  };

  const handleUpdate = async (id, updatedData) => {
    user.first_name = updatedData.first_name || user.first_name;
    user.last_name = updatedData.last_name || user.last_name;
    user.email = updatedData.email || user.email;
    edilteUser(id);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
      <div className="flex flex-col items-center">
        <img
          src={user.avatar}
          alt={user.first_name}
          className="rounded-full w-24 h-24 mb-4 shadow-md"
        />
        <h3 className="text-xl font-medium text-gray-800 mb-1">
          {user.first_name} {user.last_name}
        </h3>
        <p className="text-gray-600">{user.email}</p>
      </div>
      <div className="flex justify-between mt-6">
        <button
          className="flex items-center text-blue-500 px-4 py-2 rounded-md hover:scale-105 transition-transform duration-200"
          onClick={() => setIsEditing(true)}
        >
          <img
            src="/edit.png"
            alt="Edit"
            className="w-5 h-5 mr-2"
          />
          
        </button>
        <button
          className="flex items-center text-red-500 px-4 py-2 rounded-md hover:scale-105 transition-transform duration-200"
          onClick={() => handleDelete(user.id)}
        >
          <img
            src="/delete.png"
            alt="Delete"
            className="w-5 h-5 mr-2"
          />
    
        </button>
      </div>

      {isEditing && (
        <UserEditModal
          user={user}
          onClose={() => setIsEditing(false)}
          onUpdate={handleUpdate}
        />
      )}
    </div>
  );
}

export default UserCard;
