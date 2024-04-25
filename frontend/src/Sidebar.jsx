import React, { useState } from "react";
import { FaSignInAlt } from "react-icons/fa";
import {
  BsCart3,
  BsGrid1X2Fill,
  BsFillGrid3X3GapFill,
  BsPeopleFill,
  BsListCheck,
} from "react-icons/bs";
import { LiaSignOutAltSolid } from "react-icons/lia";
import { IoMdContact } from "react-icons/io";
import { Link } from "react-router-dom";
import "./Sidebar.css";

function Sidebar({ openSidebarToggle, OpenSidebar }) {
  const [productDropdownOpen, setProductDropdownOpen] = useState(false);

  const toggleProductDropdown = () => {
    setProductDropdownOpen(!productDropdownOpen);
  };

  return (
    <aside
      id="sidebar"
      className={openSidebarToggle ? "sidebar-responsive" : ""}
    >
      <div className="sidebar-title">
        <div className="sidebar-brand">
          <BsCart3 className="icon_header" /> Sync
        </div>
        <span className="icon close_icon" onClick={OpenSidebar}>
          X
        </span>
      </div>

      <ul className="sidebar-list">
        <li className="sidebar-list-item">
          <a href="/dashboards">
            <BsGrid1X2Fill className="icon" /> Dashboard
          </a>
        </li>

        <li className="sidebar-list-item">
          <Link to="/Project">
            <BsFillGrid3X3GapFill className="icon" />
            Find Your Stock
          </Link>
        </li>
        <li className="sidebar-list-item">
          <a href="#" onClick={toggleProductDropdown}>
            <BsListCheck className="icon" /> Products
          </a>
          {productDropdownOpen && (
            <ul className="submenu">
              <li>
                <Link to="/item/view">Item View</Link>
              </li>
              <li>
                <Link to="/item/update">Item Update</Link>
              </li>
              <li>
                <Link to="/item/categories">Item Categories</Link>
              </li>
            </ul>
          )}
        </li>
        <li className="sidebar-list-item">
          <Link to="/Orders">
            <BsPeopleFill className="icon" />Orders
          </Link>
        </li>
        <li className="sidebar-list-item">
          <Link to="/About">
            <BsPeopleFill className="icon" /> About Us
          </Link>
        </li>

        <li className="sidebar-list-item">
          <Link to="/contact">
            <IoMdContact className="icon" /> Contact Us
          </Link>
        </li>
        {/* <li className="sidebar-list-item">
          <Link to="">
            <FaSignInAlt className="icon" /> SignIn
          </Link>
        </li> */}
        <li className="sidebar-list-item">
          <a href="/LoginV">
            <LiaSignOutAltSolid className="icon" /> SignOut
          </a>
        </li>
      </ul>
    </aside>
  );
}

export default Sidebar;
