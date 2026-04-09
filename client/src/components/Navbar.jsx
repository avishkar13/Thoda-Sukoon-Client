import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, User as UserIcon } from "lucide-react";
import useAuthStore from "../store/authStore";

const Navbar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false); // mobile nav
  const [showProfile, setShowProfile] = useState(false); // profile dropdown

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Chat", path: "/chat" },
    { name: "Book", path: "/book" },
    { name: "Test", path: "/test" },
    { name: "Resources", path: "/resources" },
    // { name: "Forum", path: "/forum" },
  ];

  const { user, logout } = useAuthStore();

  useEffect(() => {
    setIsOpen(false);
    setShowProfile(false);
  }, [user, location.pathname]);

  return (
    <nav className="sticky top-0 z-50 bg-black/40 backdrop-blur-md border-b border-gray-800">
      <div className="container mx-auto flex items-center justify-between px-6 py-3">
        
        {/* Left: Logo */}
        <Link
          to="/"
          className="flex items-center text-2xl font-bold bg-gradient-to-r from-indigo-400 to-teal-400 bg-clip-text text-transparent"
        >
          <img
            src="/images/TS-logo.jpg"
            alt="TS"
            className="inline-block w-8 h-8 mr-2 rounded-full"
          />
          ThodaSukoon
        </Link>

        {/* Center: Routes (desktop only) */}
        <div className="hidden md:flex space-x-6">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`relative transition ${
                location.pathname === item.path
                  ? "text-indigo-400"
                  : "text-gray-300 hover:text-white"
              }`}
            >
              {item.name}
              {location.pathname === item.path && (
                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-indigo-400 to-teal-400 rounded-full"></span>
              )}
            </Link>
          ))}
        </div>

        {/* Right: Auth + Profile + Hamburger */}
        <div className="flex items-center space-x-3 relative">
          {user && user.role === "admin" && (
            <Link
              to="/admin"
              className="hidden md:block px-4 py-2 bg-indigo-500 hover:bg-indigo-600 rounded-xl text-white font-semibold transition cursor-pointer"
            >
              Admin
            </Link>
          )}

          {!user ? (
            <>
              <Link
                to="/login"
                className="px-4 py-2 bg-teal-500 hover:bg-teal-600 rounded-xl text-white font-semibold transition cursor-pointer"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="hidden md:block px-4 py-2 bg-teal-500 hover:bg-teal-600 rounded-xl text-white font-semibold transition cursor-pointer"
              >
                Sign Up
              </Link>
            </>
          ) : (
            <>
              {/* Profile button */}
              <button
                onClick={() => setShowProfile(!showProfile)}
                className="flex items-center space-x-2 px-3 py-1.5 rounded-full bg-indigo-600/20 hover:bg-indigo-600/40 border border-indigo-500/30 transition cursor-pointer"
              >
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-indigo-600">
                  <UserIcon size={18} />
                </div>
                <span className="hidden sm:inline text-sm font-medium text-gray-200">
                  {user.name?.split(" ")[0]}
                </span>
              </button>

              {/* Profile Dropdown */}
              {showProfile && (
                <div className="absolute right-0 top-12 w-64 bg-gray-900 border border-gray-700 rounded-xl shadow-2xl p-4 space-y-2 z-50">
                  <div className="pb-2 mb-2 border-b border-gray-700">
                    <p className="text-white font-semibold">{user.name || "User"}</p>
                    {user.email && (
                      <p className="text-gray-400 text-xs truncate">{user.email}</p>
                    )}
                    {!user.email && user.aliasId && (
                      <p className="text-gray-400 text-xs truncate">ID: {user.aliasId}</p>
                    )}
                  </div>
                  <div className="space-y-1">
                    <p className="text-gray-300 text-xs flex justify-between">
                      <span>Role:</span>
                      <span className="text-indigo-400 font-medium capitalize">
                        {user.role || "student"}
                      </span>
                    </p>
                    {user.preferences?.language && (
                      <p className="text-gray-300 text-xs flex justify-between">
                        <span>Language:</span>
                        <span className="text-teal-400">{user.preferences.language}</span>
                      </p>
                    )}
                  </div>
                  <button
                    onClick={logout}
                    className="w-full mt-3 py-2 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white border border-red-500/50 rounded-lg font-semibold transition cursor-pointer text-sm"
                  >
                    Logout
                  </button>
                </div>
              )}
            </>
          )}

          {/* Hamburger (mobile only) */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-gray-300 hover:text-white transition cursor-pointer p-1"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden w-full bg-gray-800/80 backdrop-blur-3xl border-t border-gray-700 flex flex-col items-center py-4 space-y-4">
          {user && user.role === "admin" && (
            <Link
              to="/admin"
              onClick={() => setIsOpen(false)}
              className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 rounded-xl text-white font-semibold transition"
            >
              Admin
            </Link>
          )}

          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className={`${
                location.pathname === item.path
                  ? "text-indigo-400"
                  : "text-gray-300 hover:text-white"
              } transition`}
            >
              {item.name}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
