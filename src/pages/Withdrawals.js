import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import { HiCheckCircle } from "react-icons/hi";
import { useStateContext } from '../contexts/ContextProvider';
import Loader from '../components/Loader';
const Withdrawals = () => {
  const { dispatch,isLoading,withdrawalData } = useStateContext()
  console.log(withdrawalData);
  const BASE_URL = "https://fincoin-backend.onrender.com";
  const pageSize = 5; // Number of items per page
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  const handleResponse = async (investmentId,Phonenumber, status) => {
    // Show a confirmation dialog
    const isConfirmed = window.confirm(`Are you sure you want to ${status === 'approved' ? 'approve' : 'reject'} this payment?`);

    if (!isConfirmed) {
      return; // Do nothing if the admin cancels the action
    }
    try {
      // Make a POST request to update the status
      await fetch(`${BASE_URL}/api/admin/withdrawalResponse`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          status,
          investmentId,
          Phonenumber,
        }),
      });

      // Update the local state with the new data
      const updatedData = withdrawalData.map((payment) =>
        payment.Phonenumber === Phonenumber ? { ...payment, status } : payment
      );
      dispatch({
        type: "UPDATE_WITHDRAW_DATA",
        payload: updatedData,
      }); 
    } catch (error) {
      console.error('Error updating payment status:', error);
    }
  };
  const totalPages = Math.ceil(withdrawalData.length / pageSize);

    const filteredData = withdrawalData.filter((user) =>
        user.Username.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;

    const currentPageData = filteredData.slice(startIndex, endIndex);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };
    if(isLoading){
      return <Loader/>
    }
  return (
    <div className='container mx-auto p-4 mt-10 bg-white'>
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
               
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 focus:outline-none"
            >
              Withdrawals
            </button>
        </div>
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Phone Number
              </th>
              <th scope="col" className="px-6 py-3">
                Withdraw Amount
              </th>
              <th scope="col" className="px-6 py-3">
                Pending Req.
              </th>
            </tr>
          </thead>
          <tbody>
            {currentPageData.map((payment, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap">
                  {payment.Username}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {payment.Phonenumber}
                </td>
              
                <td className="px-6 py-4 whitespace-nowrap">
                  {`Rs. ${payment.amount?.toFixed(2)}`}

                </td>
                <td className="px-6 py-4 whitespace-nowrap flex space-x-4">
                  {payment.status === 'pending' ? (
                    <>
                      <button
                        onClick={() => handleResponse(payment.investmentId,payment.Phonenumber, 'approved')} className="text-green-500 hover:text-green-600 focus:outline-none"
                      >
                        <HiCheckCircle className="text-xl" />
                      </button>
                      <button
                        onClick={() => handleResponse(payment.investmentId,payment.Phonenumber, 'rejected')} className="text-red-500 hover:text-red-600 focus:outline-none"
                      >
                        <FaTimes className="text-xl" />
                      </button>
                    </>
                  ) : (
                    payment.status
                  )}
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

export default Withdrawals;
