import React, { useState } from 'react';
import { FaTrash } from 'react-icons/fa';
import { useStateContext } from '../contexts/ContextProvider';
import Loader from '../components/Loader';

const Accounts = () => {
    const { Accounts, isLoading } = useStateContext();
    const [accounts, setAccounts] = useState(Accounts);
    const pageSize = 5;
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const totalPages = Math.ceil(accounts.length / pageSize);
    const filteredData = accounts.filter((user) =>
        user.Username.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;

    const currentPageData = filteredData.slice(startIndex, endIndex);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleDelete = (index) => {
        const updatedData = [...accounts];
        updatedData.splice(index + startIndex, 1);
        setAccounts(updatedData);
    };

    const handleClearAll = () => {
        setAccounts([]);
    };

    if (isLoading) {
        return <Loader />
    }
    return (
        <div className="container mx-auto p-4 mt-10 bg-white">
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
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
                        User Account Details
                    </button>
                </div>

                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Username
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Phone Number
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Bank Account Number
                            </th>
                            <th scope="col" className="px-6 py-3">
                                IFSC CODE
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Adhar/Pan Number
                            </th>
                            <th scope="col" className="px-6 py-3">
                                <span>Actions</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentPageData.map((user, index) => (
                            <tr key={index}>
                                <td className="px-6 py-4 whitespace-nowrap">{user.Username}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{user.Phonenumber}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{user.AccountNumber}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{user.ifsc}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{user.AdharPan}</td>
                                <td className="px-6 py-4 whitespace-nowrap flex space-x-4">
                                    <button
                                        onClick={() => handleDelete(index)}
                                        className="text-red-500 hover:text-red-600 focus:outline-none"
                                    >
                                        <FaTrash className="text-xl" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
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

export default Accounts;
