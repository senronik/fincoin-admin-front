import React from "react";
import { BsCurrencyRupee } from "react-icons/bs";
import { MdOutlineSupervisorAccount } from "react-icons/md";
import { VscOrganization } from "react-icons/vsc";
import { RiLightbulbFlashFill } from "react-icons/ri";
import Loader from '../components/Loader';

import { MdPending } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { useStateContext } from "../contexts/ContextProvider";
const Ecommerce = () => {
  const navigate = useNavigate();

  const { currentColor, Investors, paymentData, Users,isLoading ,withdrawalData} = useStateContext();
  const distributed = withdrawalData.reduce((total, data) => {
    if (data.status === 'approved') {
      total += data.amount;
    }
    return total; 
  }, 0);
  
  const totalInvestment = Investors.reduce((total, investor) => total + investor.amountPaid, 0);
  const pendingRequest = paymentData.filter((elm) => {
    return elm.status === "pending"
  }).length;

  const handleClick = () => {
    navigate('/investment');
  };
  const handlePaymentClick = () => {
    navigate('/payments');
  }
  if(isLoading){
    return <Loader/>
  }
  return (
    <div className="mt-24">
      <div className="flex flex-wrap lg:flex-nowrap justify-center">
        <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg h-44 rounded-xl w-full lg:w-80 p-8 pt-9 m-3 bg-hero-pattern bg-no-repeat bg-cover bg-center">
          <div className="flex justify-between items-center">
            <div>
              <p className="font-bold text-gray-400">Total Investment</p>
              <p className="text-2xl">Rs {totalInvestment}</p>
            </div>
            <button
              type="button"
              style={{ backgroundColor: currentColor }}
              className="text-2xl opacity-0.9 text-white hover:drop-shadow-xl rounded-full  p-4"
            >
              <BsCurrencyRupee />
            </button>
          </div>
          <div className="mt-6">
            <button
              style={{ color: 'white', backgroundColor: currentColor, borderRadius: '5px', padding: '7px' }}
              onClick={handleClick}
            >
              Watch
            </button>
          </div>
        </div>

        <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg h-44 rounded-xl w-full lg:w-80 p-8 pt-9 m-3 bg-hero-pattern bg-no-repeat bg-cover bg-center">
          <div className="flex justify-between items-center">
            <div>
              <p className="font-bold text-gray-400">Total Disbursement</p>
              <p className="text-2xl">Rs {distributed}</p>
            </div>
            <button
              type="button"
              style={{ backgroundColor: currentColor }}
              className="text-2xl opacity-0.9 text-white hover:drop-shadow-xl rounded-full  p-4"
            >
              <BsCurrencyRupee />
            </button>
          </div>
          <div className="mt-5">
            <button
              style={{ color: 'white', backgroundColor: currentColor, borderRadius: '5px', padding: '7px' }}
              onClick={handleClick}
            >
              Watch
            </button>
          </div>
        </div>
      </div>

      {/* cards  */}
      <div className="flex flex-wrap gap-6 justify-center items-center">
        <div className="flex m-3 flex-wrap  gap-6 items-center">
          <div
            className="bg-white h-44 dark:text-gray-200 dark:bg-secondary-dark-bg md:w-48  p-6 pt-9 rounded-2xl "
          >
            <button
              type="button"
              style={{ color: "#03C9D7", backgroundColor: "#E5FAFB" }}
              className="text-2xl opacity-0.9 rounded-full  p-4 hover:drop-shadow-xl"
              onClick={() => {
                navigate('/users')
              }}
            >
              <MdOutlineSupervisorAccount />
            </button>
            <p className="mt-3">
              <span className="text-lg font-semibold">{Users?.length}</span>
            </p>
            <p className="text-sm text-gray-400  mt-1">Register Users</p>
          </div>
        </div>
        <div className="flex m-3 flex-wrap  gap-6 items-center">
          <div
            className="bg-white h-44 dark:text-gray-200 dark:bg-secondary-dark-bg md:w-48  p-6 pt-9 rounded-2xl "
          >
            <button
              type="button"
              style={{ color: "#03C9D7", backgroundColor: "#E5FAFB" }}
              className="text-2xl opacity-0.9 rounded-full  p-4 hover:drop-shadow-xl"
              onClick={handleClick}
            >
              <VscOrganization />
            </button>
            <p className="mt-3">
              <span className="text-lg font-semibold">{Investors.length}</span>
            </p>
            <p className="text-sm text-gray-400  mt-1">Investors</p>
          </div>
        </div>
        <div className="flex m-3 flex-wrap  gap-6 items-center">
          <div
            className="bg-white h-44 dark:text-gray-200 dark:bg-secondary-dark-bg md:w-48  p-6 pt-9 rounded-2xl "
          >
            <button
              type="button"
              style={{ color: "#FFFF00", backgroundColor: "#F4D03F" }}
              className="text-2xl opacity-0.9 rounded-full  p-4 hover:drop-shadow-xl"
              onClick={handlePaymentClick}
            >
              <MdPending />
            </button>
            <p className="mt-3">
              <span className="text-lg font-semibold">{pendingRequest}</span>
            </p>
            <p className="text-sm text-gray-400  mt-1">Pending Requests for Payment verification</p>
          </div>
        </div>
        <div className="flex m-3 flex-wrap  gap-6 items-center">
          <div
            className="bg-white h-44 dark:text-gray-200 dark:bg-secondary-dark-bg md:w-48  p-6 pt-9 rounded-2xl "
          >
            <button
              type="button"
              style={{ color: "#339900", backgroundColor: "#99FF99" }}
              className="text-2xl opacity-0.9 rounded-full  p-4 hover:drop-shadow-xl"
              onClick={() => {
                navigate('/investment')
              }}
            >
              <RiLightbulbFlashFill />
            </button>
            <p className="mt-3">
              <span className="text-lg font-semibold">{Investors.length}</span>
            </p>
            <p className="text-sm text-gray-400  mt-1">Active User</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ecommerce;
