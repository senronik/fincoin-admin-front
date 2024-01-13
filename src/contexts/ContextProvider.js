import React, { createContext, useContext, useState,useReducer,useRef,useEffect } from 'react';
import reducer from '../reducers/AuthReducer';
// import Accounts from '../pages/Accounts';
const StateContext = createContext();

const initialState = {
  isLoding:false,
  chat: false,
  cart: false,
  userProfile: false,
  notification: false,
  isauthenticate:false,
  Investors:[],
  paymentData:[],
  Users:[],
  Accounts:[],
  withdrawalData:[]
};

export const ContextProvider = ({ children }) => {

  const [state, dispatch] = useReducer(reducer, initialState);

  const [screenSize, setScreenSize] = useState(undefined);
  const [currentColor, setCurrentColor] = useState('#03C9D7');
  const [currentMode, setCurrentMode] = useState('Light');
  const [themeSettings, setThemeSettings] = useState(false);
  const [activeMenu, setActiveMenu] = useState(true);
  const [isClicked, setIsClicked] = useState(initialState);

  const initialized = useRef(false);
  const BASE_URL ="https://fincoin-backend.onrender.com";

  const initialize = async () => {
    if (initialized.current) {
      return;
    }

    initialized.current = true;

      let isAuthenticated=localStorage.getItem("token");
    if (isAuthenticated) {
      dispatch({type:"LOGIN_SUCCESS"});
    } else {
      dispatch({
       type:"LOGOUT"
      });
    }
  };

  const setMode = (e) => {
    setCurrentMode(e.target.value);
    localStorage.setItem('themeMode', e.target.value);
  };

  const setColor = (color) => {
    setCurrentColor(color);
    localStorage.setItem('colorMode', color);
  };

  const handleClick = (clicked) => setIsClicked({ ...initialState, [clicked]: true });
 const fetchInvestData = async () => {

  try {
    const response = await fetch(`${BASE_URL}/api/admin/invests`);
    const data = await response.json();
    dispatch({type:"SET_INVETOR",payload:data.data})
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};
const fetchaccountsData = async () => {
  dispatch({type:"SET_ISLOADING"});
  try {
      const response = await fetch(`${BASE_URL}/api/admin/accountDetails`);
      if (!response.ok) {
          throw new Error('Failed to fetch accounts data');
      }

      const userData = await response.json();
      dispatch({type:"SET_ACCOUNT_DETAILS",payload:userData.data})
  } catch (error) {
      console.error('Error fetching accounts data:', error.message);
  }
};


const fetchUsersData = async () => {
  dispatch({type:"SET_ISLOADING"});
  try {
      const response = await fetch(`${BASE_URL}/api/user/userDetails`); 
      if (!response.ok) {
          throw new Error('Failed to fetch accounts data');
      }

      const userData = await response.json();
      dispatch({type:"SET_USERS",payload:userData.data})

  } catch (error) {
      console.error('Error fetching accounts data:', error.message);
  }
};

 const fetchPayments = async () => {
  dispatch({type:"SET_ISLOADING"});
  try {
    const response = await fetch(`${BASE_URL}/api/admin/payments`);
    const data = await response.json();
    dispatch({type:"SET_PAYMENTS",payload:data.data})
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};
const fetchWithdrawals = async () => {
  dispatch({type:"SET_ISLOADING"});
  try {
    const response = await fetch(`${BASE_URL}/api/admin/withdrawDetails`);
    const data = await response.json();
    dispatch({type:"SET_WITHDRAWALS",payload:data.data})
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

  useEffect(
    () => {
      initialize();
      fetchInvestData();
      fetchPayments()
      fetchUsersData()
      fetchaccountsData();
      fetchWithdrawals();
    },
    []
  );
  return (
    <StateContext.Provider value={{ ...state, currentColor, currentMode, activeMenu, screenSize, setScreenSize, handleClick, isClicked, initialState,dispatch, setIsClicked, setActiveMenu, setCurrentColor, setCurrentMode, setMode, setColor, themeSettings, setThemeSettings }}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
