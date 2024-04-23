
// import { useState } from "react";
// import "./App.css";
// // import Header from "./Header";
// import Sidebar from "./Sidebar";
// import Home from "./Home";
// import Order from "./Order";
// import { BrowserRouter, Route, Routes, Navigate, useLocation } from "react-router-dom";
// import Contact from "./Contact";
// import "./Contact.css";
// import Table3 from "./Itemview";
// import Inventory from "./Order.jsx";
// import AboutUs from "./About.jsx";
// import "./About.css";
// import Project from "./Project.jsx";
// import LoginV from "./LoginVisual.jsx";
// import PlaceOrder from "./Ordersreal.jsx";

// function App() {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
//   const location = useLocation();

//   const OpenSidebar = () => {
//     setOpenSidebarToggle(!openSidebarToggle);
//   };

//   const handleLogin = () => {
//     setIsLoggedIn(true);
//   };

//   // Determine if sidebar should be shown based on route path
//   const showSidebar = location.pathname !== "/LoginV";

//   return (
//     <div className="grid-container">
//       {/* <Header OpenSidebar={OpenSidebar} /> */}
//       {showSidebar && (
//         <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />
//       )}
//       <Routes>
//         <Route
//           path="/"
//           element={isLoggedIn ? <Home /> : <Navigate to="/LoginV" />}
//         />

//         <Route path="/dashboards" element={<Home />} />
//         <Route path="/Orders" element={<PlaceOrder />} />
//         <Route path="/contact" element={<Contact />} />
//         <Route path="/item/view" element={<Table3 />} />
//         <Route path="/About" element={<AboutUs />} />
//         <Route path="/item/update" element={<Inventory />} />
//         <Route path="/Project" element={<Project />} />
//         <Route path="/LoginV" element={<LoginV />} />
//       </Routes>
//     </div>
//   );
// }

// export default App;

import { useState } from "react";
import "./App.css";
// import Header from "./Header";
import Sidebar from "./Sidebar";
import Home from "./Home";
import Order from "./Order";
import { BrowserRouter, Route, Routes, Navigate, useLocation } from "react-router-dom";
import Contact from "./Contact";
import "./Contact.css";
import Table3 from "./Itemview";
import Inventory from "./Order.jsx";
import AboutUs from "./About.jsx";
import "./About.css";
import Project from "./Project.jsx";
import LoginV from "./LoginVisual.jsx";
import PlaceOrder from "./Ordersreal.jsx";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
  const location = useLocation();

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  // Determine if sidebar should be shown based on route path
  const showSidebar = location.pathname !== "/LoginV";

  return (
    <div className={`grid-container ${location.pathname === '/LoginV' ? 'login-page' : ''}`}>
      {/* <Header OpenSidebar={OpenSidebar} /> */}
      {showSidebar && (
        <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />
      )}
      <Routes>
        <Route
          path="/"
          element={isLoggedIn ? <Home /> : <Navigate to="/LoginV" />}
        />

        <Route path="/dashboards" element={<Home />} />
        <Route path="/Orders" element={<PlaceOrder />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/item/view" element={<Table3 />} />
        <Route path="/About" element={<AboutUs />} />
        <Route path="/item/update" element={<Inventory />} />
        <Route path="/Project" element={<Project />} />
        <Route path="/LoginV" element={<LoginV />} />
      </Routes>
    </div>
  );
}

export default App;
