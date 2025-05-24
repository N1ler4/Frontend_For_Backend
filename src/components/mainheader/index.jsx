import React, { useEffect, useState } from "react";
import { DownOutlined, UserOutlined } from "@ant-design/icons";
import { Dropdown, Space } from "antd";
import { useNavigate } from "react-router-dom";
import useAuth from "../../auth/is-auth.js";
import useAuthStore from "../../store/auth.js";

const MainHeader = () => {
  const user = useAuthStore();
  const {logOut} = useAuthStore();
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();
  const [info, setInfo] = useState(null); 

  const getUser = async () => {
    try {
      const response = await user.getUser();
      if (response.status === 200) {
        setInfo(response.data);
        console.log("User data fetched successfully:", response.data);
      } else {
        console.error("Failed to fetch user data: ", response);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const handleLogout = async () => {
    try {
      const response = await logOut();
      if (response.status === 200) {
        console.log("Logout successful");
        navigate("/login");
      } else {
        console.error("Logout failed: ", response);
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  }

  useEffect(() => {
    if (isLoggedIn) {
      getUser();
    }
  }, [isLoggedIn]);

  const items = [
    {
      label: <button onClick={() => navigate("/login")}>Login</button>,
      key: "0",
    },
    {
      label: <button onClick={() => navigate("/signup")}>Register</button>,
      key: "1",
    },
  ];
  const logedItems = [
    {
      label: <button onClick={() => { handleLogout(); navigate("/"); }}>Logout</button>,
      key: "2",
    },
  ];

  return (
    <div className="flex justify-evenly pr-5 items-center bg-white">
      {isLoggedIn ? (
        <Dropdown menu={{ items: logedItems }} trigger={["click"]}>
          <a onClick={(e) => e.preventDefault()}>
            <Space>
              <UserOutlined />
              <DownOutlined />
            </Space>
          </a>
        </Dropdown>
      ) : (
        <Dropdown menu={{ items }} trigger={["click"]}>
          <a onClick={(e) => e.preventDefault()}>
            <Space>
              <UserOutlined />
              <DownOutlined />
            </Space>
          </a>
        </Dropdown>
      )}
    </div>
  );
  
};

export default MainHeader;
