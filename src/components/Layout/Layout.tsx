import { Outlet } from "react-router-dom";

import Header from "../header/Header";
import "./index.css";

function Layout() {
  return (
    <div className="layout">
      <Header />
      <div className="main">
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
