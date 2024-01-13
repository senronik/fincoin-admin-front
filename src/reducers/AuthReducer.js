// AuthReducer.js
const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_ISLOADING':
      return {
        ...state,
        isLoading:true
      }
    case 'LOGIN_SUCCESS': {
      const token = localStorage.getItem("token");
      return token ? { ...state, isauthenticate: true } : state;
    }
    case 'LOGOUT':
      localStorage.removeItem("token");
      return { ...state, isauthenticate: false };
    case 'CLICKED':
      console.log(action.payload);
      return { ...state, userProfile: true };
    case 'SET_INVETOR':
      // console.log(action.payload);
      return { ...state, Investors: action.payload };
    case 'SET_PAYMENTS':
      // console.log(action.payload);
      return { ...state, paymentData: action.payload ,isLoading:false};
    case 'SET_WITHDRAWALS':
    // console.log(action.payload);
    return { ...state, withdrawalData: action.payload ,isLoading:false};
    case 'UPDATE_PAYMENT_DATA':
        // console.log(action.payload);
      return { ...state, paymentData: action.payload };
    case 'UPDATE_WITHDRAW_DATA':
      // console.log(action.payload);
    return { ...state, paymentData: action.payload };
    case 'SET_ACCOUNT_DETAILS':
      return {...state,Accounts:action.payload,isLoading:false}
    case 'SET_USERS':
      return {...state,Users:action.payload,isLoading:false};
    default:
      return state;
  }
};

  export default reducer;
  