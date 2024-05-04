import { Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import Dashboard from './parts/dashboard/dashboard';
import { useEffect } from 'react';
import Helper from "./utility/helper";
import Login from "./parts/login/login"
import Signup from "./parts/signup/signUp";
import { useDispatch, useSelector } from 'react-redux'
import { refreshToken, resetOperationType, setUser } from "./redux/login/reducer";
import { resetState } from "./redux/budget/reducer";

import { Spin } from "antd";
import Navbar from './parts/navbar/navbar';
import Budget from './parts/budget/budget';
import Expense from './parts/expense/expense';


function App() {
  const loginSlice = useSelector((state) => state.login)
  const navigate = useNavigate();
  const curLocation = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    let user = Helper.getItem("user");
    let pathname = curLocation.pathname;
    if (!user) {
      if (pathname === "/login" || pathname === "/signup") {
        navigate(pathname);
      } else {
        navigate("/login");
      }
    } else {

      if (pathname === "/login" || pathname === "/signup") {
        pathname = "/"
      }
      dispatch(setUser({ user }));
      navigate(pathname);
    }
  }, []);


  useEffect(() => {
    const intervalId = setInterval(() => {
      if (loginSlice.user) {
        dispatch(refreshToken());
      }
    }, 50000);

    return () => clearInterval(intervalId);
  });

  useEffect(() => {
    if (loginSlice.operationType === "LOGOUT") {
      Helper.logout()
      navigate("/login");
      dispatch(resetOperationType())
      dispatch(resetState())
    }
  }, [loginSlice.operationType])




  return (
    <Spin spinning={loginSlice.isLoading}>
      <Navbar />
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/' element={<Dashboard />} />
        <Route path='/budget' element={<Budget />} />
        <Route path='/Expense' element={<Expense />} />
      </Routes>
    </Spin>
  );
}

export default App;
