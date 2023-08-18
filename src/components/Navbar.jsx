import {useContext} from "react";
import { Link } from "react-router-dom";
import avatar from "../assets/default.jpeg"
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {

const {logOut, currentUser} = useContext(AuthContext)
  return (
    <>

    <nav className="bg-white border-gray-200 dark:bg-gray-900 fixed top-0 z-10 w-[100vw] pe-6 ps-6">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link to="/" className="flex items-center">
          ICON CREATOR
        </Link>

        <div className="flex items-center md:order-2">
          <button
            type="button"
            className="flex mr-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
            id="user-menu-button"
            aria-expanded="false"
            data-dropdown-toggle="user-dropdown"
            data-dropdown-placement="bottom"
          >
            <img
              className="w-8 h-8 rounded-full"
              src={currentUser.photoURL ||  avatar}
              alt="user photo"
              referrerPolicy="no-referrer"
            />
          </button>

          {/* Dropdown menu */}
          <div
            className="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600"
            id="user-dropdown"
          >

            <div className="px-4 py-3">
              <span className="block text-sm text-gray-900 dark:text-white">
                {currentUser && <h5 className="capitalize">{currentUser?.displayName}</h5>}
              </span>
            </div>


{currentUser ? <ul className="py-2" aria-labelledby="user-menu-button">
             
             <Link
             onClick={logOut}
               to="/login"
               className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
             >
               Logout
             </Link>
           
           </ul>:
           
           <ul className="py-2" aria-labelledby="user-menu-button">
             

             <Link
               to="/register"
               className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
             >
               Register
             </Link>

             <Link
               to="/login"
               className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
             >
               Login
             </Link>
       
           
           </ul>}

            
          </div>
         
        </div>
       
      </div>
    </nav>
    <div className="h-[150px] bg-[#CDDBFF]"></div>
    </>
  );
};

export default Navbar;
