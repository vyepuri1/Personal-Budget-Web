import { LogoutOutlined } from "@ant-design/icons";
import { Layout, Menu } from "antd";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { resetState } from "../../redux/budget/reducer";
import { logout } from "../../redux/login/reducer";
import "./style.css";

const { Header } = Layout;

function Navbar() {
  const loginSlice = useSelector((state) => state.login);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const curLocation = useLocation();
  const [selectedKeys, setSelectedKeys] = useState([]);

  const items = [
    {
      key: "budget",
      label: "Budget",
      onClick: () => navigate("/budget"),
    },
    {
      key: "expense",
      label: "Expense",
      onClick: () => navigate("/expense"),
    },
  ];

  function getLoginOrSignUp() {
    let pathname = curLocation.pathname;
    if (pathname === "/login") {
      return { name: "Sign up", url: "/signup" };
    }
    return { name: "Login", url: "/login" };
  }
  function dashboard() {
    setSelectedKeys([]);
    let pathname = curLocation.pathname;
    if (loginSlice.user) {
      navigate("/");
    } else {
      navigate(pathname);
    }
  }

  return (
    <Layout>
      <Header
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: "white",
          color: "black"
        }}
      >
        <div className="pBudget" onClick={dashboard}>
          <p style={{ marginTop: "1px" }}> {"Personal Budget"}</p>
        </div>
        {loginSlice.user ? (
          <Menu
            theme="white"
            mode="horizontal"
            selectedKeys={selectedKeys}
            onSelect={({ key }) => setSelectedKeys([key])}
            items={items}
            className="menuItem"
            style={{
              flex: 1,
              minWidth: 0,
              backgroundColor: "white",
              color: "black"
            }}
          />
        ) : (
          <Menu
            theme="white"
            mode="horizontal"
            items={[]}
            style={{
              flex: 1,
              minWidth: 0,
              backgroundColor: "white",
              color: "black"
            }}
          />
        )}
        {loginSlice.user ? (
          <div
            className="pBudget"
            onClick={() => {
              dispatch(logout());
              dispatch(resetState());
              setSelectedKeys([]);
            }}
          >
            <div className="avatarDiv">
              <p className="userName">
                {"User : "}
              </p>
              <p>
                {loginSlice.user.name}
              </p>
            </div>
            <p className="logoutP" style={{ marginTop: "-1px" }}>
              {" "}
              {"Logout"}
            </p>
            <div className="logoutIcon">
              <LogoutOutlined style={{ fontSize: "18px", marginLeft: "10px" }} />
            </div>
          </div>
        ) : (
          <div
            className="pBudget"
            onClick={() => {
              navigate(getLoginOrSignUp().url);
            }}
          >
            <p style={{ marginTop: "1px" }}> {getLoginOrSignUp().name}</p>
          </div>
        )}
      </Header>
    </Layout>
  );
}

export default Navbar;
