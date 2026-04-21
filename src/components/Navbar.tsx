import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
   const getInitialDarkMode = (): boolean => {
      const savedMode = localStorage.getItem("isDarkMode");
      return savedMode === "true";
   };

   const [darkMode, setDarkMode] = useState<boolean>(getInitialDarkMode);

   useEffect(() => {
      if (darkMode) {
         document.body.classList.add("dark-theme");
      } else {
         document.body.classList.remove("dark-theme");
      }

      localStorage.setItem("isDarkMode", darkMode.toString());
   }, [darkMode]);

   return (
      <header className="navbar">
         <div className="navbar-inner">
            <div className="nav-left">
               <span className="navbar-brand">Todo App</span>

               <nav className="navbar-links">
                  <NavLink
                     to="/"
                     end
                     className={({ isActive }) =>
                        "nav-link" + (isActive ? " active" : "")
                     }
                  >
                     Home
                  </NavLink>

                  <NavLink
                     to="/active"
                     className={({ isActive }) =>
                        "nav-link" + (isActive ? " active" : "")
                     }
                  >
                     Active
                  </NavLink>

                  <NavLink
                     to="/completed"
                     className={({ isActive }) =>
                        "nav-link" + (isActive ? " active" : "")
                     }
                  >
                     Completed
                  </NavLink>

                  <NavLink
                     to="/trash"
                     className={({ isActive }) =>
                        "nav-link" + (isActive ? " active" : "")
                     }
                  >
                     Trash
                  </NavLink>

                  <NavLink
                     to="/create-new"
                     className={({ isActive }) =>
                        "nav-link" + (isActive ? " active" : "")
                     }
                  >
                     + Create New
                  </NavLink>

                  <NavLink
                     to="/about"
                     className={({ isActive }) =>
                        "nav-link" + (isActive ? " active" : "")
                     }
                  >
                     Hakkımda
                  </NavLink>
               </nav>
            </div>

            <div className="top-bar">
               <h1 className="app-title">📝 My Todo App</h1>

               <button
                  className="theme-btn"
                  onClick={() => setDarkMode(!darkMode)}
               >
                  {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
               </button>
            </div>
         </div>
      </header>
   );
};

export default Navbar;