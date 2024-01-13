import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import { HiCheckCircle } from "react-icons/hi";
import { useStateContext } from '../contexts/ContextProvider';
import Loader from '../components/Loader';
const Payments = () => {
  const { paymentData, dispatch,isLoading } = useStateContext()
  const BASE_URL = "https://fincoin-backend.onrender.com";
  const pageSize = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  const handleResponse = async (transactionId, status) => {
    const isConfirmed = window.confirm(`Are you sure you want to ${status === 'approved' ? 'approve' : 'reject'} this payment?`);

    if (!isConfirmed) {
      return; 
    }
    try {
      await fetch(`${BASE_URL}/api/admin/paymentResponse/${transactionId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          status,
        }),
      });
      const updatedData = paymentData.map((payment) =>
        payment.transactionId === transactionId ? { ...payment, status } : payment
      );
      dispatch({
        type: "UPDATE_PAYMENT_DATA",
        payload: updatedData,
      });
    } catch (error) {
      console.error('Error updating payment status:', error);
    }
  };
  const pendingPayments = paymentData.filter((payment) => payment.status === 'pending');
    
  const totalPages = Math.ceil(pendingPayments.length / pageSize);

    const filteredData = pendingPayments.filter((user) =>
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
                Payment Requests
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
                Transaction ID
              </th>
              <th scope="col" className="px-6 py-3">
                Transaction Amount
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
                  {payment.transactionId}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {payment.amount}
                </td>
                <td className="px-6 py-4 whitespace-nowrap flex space-x-4">
                  {payment.status === 'pending' ? (
                    <>
                      <button
                        onClick={() => handleResponse(payment.transactionId, 'approved')} className="text-green-500 hover:text-green-600 focus:outline-none"
                      >
                        <HiCheckCircle className="text-xl" />
                      </button>
                      <button
                        onClick={() => handleResponse(payment.transactionId, 'rejected')} className="text-red-500 hover:text-red-600 focus:outline-none"
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

export default Payments;
