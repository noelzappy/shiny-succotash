import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";

const MenuItems = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "Books",
    path: "/books",
  },
  {
    name: "Characters",
    path: "/characters",
  },
  {
    name: "Houses",
    path: "/houses",
  },
] as const;

const Layout: React.FC = () => {
  let location = useLocation();

  return (
    <div className="layout-container">
      <div className="menu-container">
        <div className="menu-container-inner">
          {MenuItems.map((item) => {
            const isActive = location.pathname === item.path;

            return (
              <Link
                to={item.path}
                className="menu-item"
                style={{
                  backgroundColor: isActive ? "#dd9" : undefined,
                }}
              >
                <div>{item.name}</div>
              </Link>
            );
          })}
        </div>
      </div>
      <div className="content-container">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
