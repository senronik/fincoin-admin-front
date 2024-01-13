import React, {  useState } from 'react';
import { FaTrash } from 'react-icons/fa';
import axios from 'axios';
import { useStateContext } from '../contexts/ContextProvider';
import Loader from '../components/Loader';
const Users = () => {

    const {Users,isLoading}=useStateContext();
    const [users, setUsers] = useState(Users);
    const BASE_URL ="https://fincoin-backend.onrender.com";

    const pageSize = 5; // Number of items per page
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');

    // Calculate the total number of pages based on the pageSize
    const totalPages = Math.ceil(Users.length / pageSize);

    // Filter the data based on the search term
    const filteredData = Users.filter((user) =>
        user.Username.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Calculate the index range of the current page
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;

    // Get the current page data
    const currentPageData = filteredData.slice(startIndex, endIndex);

    // Function to handle pagination
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    // Function to handle delete button click
    const handleDelete =async (Phonenumber,index) => {
        try {
            // Make an API request to delete the user
            await axios.delete(`${BASE_URL}/api/user/deleteUsers/${Phonenumber}`);
    
            // If the deletion is successful, update the local state
            const updatedData = [...users];
            updatedData.splice(index + startIndex, 1);
            setUsers(updatedData);
        } catch (error) {
            console.error('Error deleting user:', error);
            // Handle error (e.g., show an error message to the user)
        }
    };

    // Function to handle clear button click
    const handleClearAll = () => {
        setUsers([]);
    };
    if(isLoading){
        return <Loader/>
    }

    return (
        <div className="container mx-auto p-4 mt-10 bg-white">
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                {/* Search input */}
                <div className="p-4 mb-4 flex items-center justify-between">
                    <input
                        type="text"
                        placeholder="Search..."
                        className="border border-gray-300 p-2 rounded"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button
                        onClick={handleClearAll}
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 focus:outline-none"
                    >
                       All Users
                    </button>
                </div>

                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    {/* Table header */}
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Phone Number
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Amount
                            </th>
                            <th scope="col" className="px-6 py-3">
                                <span>Actions</span>
                            </th>
                        </tr>
                    </thead>
                    {/* Table body */}
                    <tbody>
                        {currentPageData.map((user, index) => (
                            <tr key={index}>
                                <td className="px-6 py-4 whitespace-nowrap">{user.Username}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{user.Phonenumber}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{`Rs ${user.amount}`}</td>
                                <td className="px-6 py-4 whitespace-nowrap flex space-x-4">
                                    <button
                                        onClick={() => handleDelete(user.Phonenumber,index)}
                                        className="text-red-500 hover:text-red-600 focus:outline-none"
                                    >
                                        <FaTrash className="text-xl" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {/* Pagination */}
                <div className="flex items-center justify-end p-4">
                    <button
                        disabled={currentPage === 1}
                        onClick={() => handlePageChange(currentPage - 1)}
                        className="text-blue-500 hover:text-blue-700 focus:outline-none"
                    >
                        Previous
                    </button>
                    <span className="mx-2">
                        Page {currentPage} of {totalPages}
                    </span>
                    <button
                        disabled={currentPage === totalPages}
                        onClick={() => handlePageChange(currentPage + 1)}
                        className="text-blue-500 hover:text-blue-700 focus:outline-none"
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Users;