import React, { useState } from 'react'
import { useStateContext } from '../contexts/ContextProvider'
const AllTransaction = () => {
  const { paymentData } = useStateContext()
  const pageSize = 5; // Number of items per page
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  // Calculate the total number of pages based on the pageSize
  const totalPages = Math.ceil(paymentData.length / pageSize);

  // Filter the data based on the search term
  const filteredData = paymentData.filter((user) =>
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
  
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <div className="p-4 mb-4 flex items-center justify-between">
        <input
          type="text"
          placeholder="Search..."
          className="border border-gray-300 p-2 rounded"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Username
            </th>
            <th scope="col" className="px-6 py-3">
              Phonenumber
            </th>
            <th scope="col" className="px-6 py-3">
              TransactionId
            </th>
            <th scope="col" className="px-6 py-3">
              Amount
            </th>
            <th scope="col" className="px-6 py-3">
              Status
            </th>
          </tr>
        </thead>
        <tbody>
          {    
            currentPageData.map((payment, index) => (
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
                {`Rs ${payment.amount}`}
              </td>
              <td className="px-6 py-4 whitespace-nowrap flex space-x-4">
                {payment.status}
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

  )
}

export default AllTransaction;
