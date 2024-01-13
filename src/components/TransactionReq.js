import React, { useState } from 'react';
import { useStateContext } from '../contexts/ContextProvider';

const TransactionReq = () => {

  const { Investors } = useStateContext()
  console.log(Investors);
  const [showModal, setShowModal] = useState(false);
  const [selectedInvestor, setSelectedInvestor] = useState(null);
  const pageSize = 5; // Number of items per page
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  // Calculate the total number of pages based on the pageSize
  const totalPages = Math.ceil(Investors.length / pageSize);

  // Filter the data based on the search term
  const filteredData = Investors.filter((user) =>
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

  const handleViewDetails = (investor) => {
    setSelectedInvestor(investor);
    setShowModal(true);
  };
  const getStatusColorClass = (status) => {
    switch (status) {
      case 'pending':
        return 'text-yellow-500'; // Apply your yellow text class
      case 'active':
        return 'text-blue-500'; // Apply your blue text class
      case 'completed':
        return 'text-green-500'; // Apply your green text class
      case 'inactive':
        return 'text-red-500'; // Apply your red text class
      default:
        return '';
    }
  };
  return (
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
      </div>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-4 py-3">
              Username
            </th>
            <th scope="col" className="px-4 py-3">
              Plan Type
            </th>

            <th scope="col" className="px-4 py-3">
              Total Amount Paid
            </th>
            <th scope="col" className="px-4 py-3">
              Remaining Amount
            </th>
            <th scope="col" className="px-4 py-3">
              Paid Inst
            </th>
            <th scope="col" className="px-4 py-3">
              Remaining Inst.
            </th>
            <th scope="col" className="px-4 py-3">
              Future Value
            </th>
            <th scope="col" className="px-4 py-3">
              Status
            </th>
            <th scope="col" className="px-4 py-3">
              <span className="sr-only">Actions</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {currentPageData.map((Investor, index) => (
            <tr key={index}>
              <td className="px-4 py-4 whitespace-nowrap">
                {Investor.Username}
              </td>
              <td className="px-4 py-4 whitespace-nowrap">
                {Investor.planType}
              </td>

              <td className="px-4 py-4 whitespace-nowrap">
                {`Rs. ${Investor.amountPaid}`}
              </td>
              <td className="px-4 py-4 whitespace-nowrap">
                {`Rs. ${Investor.remainingAmount}`}
              </td>
              <td className="px-4 py-4 whitespace-nowrap">
                {Investor.installmentsPaid}
              </td>
              <td className="px-4 py-4 whitespace-nowrap">
                {Investor.totalInstallment}
              </td>
              <td className="px-4 py-4 whitespace-nowrap">
                {`Rs. ${Investor.futureValue?.toFixed(2)}`}
              </td>

              <td className={`px-4 py-4 whitespace-nowrap ${getStatusColorClass(Investor.status)}`}>
                {Investor.status}
              </td>
              <td className="px-4 py-4 whitespace-nowrap flex space-x-4">
                <button
                  onClick={() => handleViewDetails(Investor)}
                  className="bg-blue-500 text-white px-4 py-2 rounded focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
                >
                  View
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
      {showModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" onClick={() => setShowModal(false)}>
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>&#8203;

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:w-full max-w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Investor Details</h3>
                <div className="mt-2">
                  {/* Render the details of the selected investor */}
                  <InvestorDetailsModal investor={selectedInvestor} />
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  onClick={() => setShowModal(false)}
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-500 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring focus:border-blue-300 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>

  )
}

const InvestorDetailsModal = ({ investor }) => {
  // Render the details of the selected investor in the modal
  const { paymentData } = useStateContext()

  const paymentData1 = paymentData.filter((payment) => {
    return payment.Phonenumber === investor.Phonenumber;
  })

  console.log(investor)
  return (
    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
      <h2 className="text-lg leading-6 font-medium text-gray-900">Investor Details</h2>
      <div className="mt-2">
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Username</th>
                <th className="py-2 px-4 border-b">Phonenumber</th>
                <th className="py-2 px-4 border-b">TransactionId</th>
                <th className="py-2 px-4 border-b">Amount</th>
                <th className="py-2 px-4 border-b">Status</th>
              </tr>
            </thead>
            <tbody>
              {paymentData1.map((payment, index) => (
                <tr key={index}>
                  <td className="py-2 px-4 border-b">
                    {payment.Username}
                  </td>
                  <td className="py-2 px-4 border-b">
                    {payment.Phonenumber}
                  </td>
                  <td className="py-2 px-4 border-b">
                    {payment.transactionId}
                  </td>
                  <td className="py-2 px-4 border-b">
                    {payment.amount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap flex space-x-4">
                    {payment.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

        </div>
      </div>
    </div>
  );
};
export default TransactionReq

