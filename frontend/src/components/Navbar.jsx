import { NavLink } from "react-router-dom";
import { Menu, X, Smartphone } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const navLinkClass = ({ isActive }) =>
    `px-3 py-2 rounded-md transition ${
      isActive ? "bg-blue-600 text-white" : "text-gray-700 hover:bg-gray-100"
    }`;

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}

          <NavLink to="/" className="flex items-center gap-2">
            <Smartphone className="w-7 h-7 text-blue-600" />

            <span className="font-bold text-xl">MobileHub</span>
          </NavLink>

          {/* Desktop Menu */}

          <div className="hidden md:flex gap-3">
            <NavLink to="/" className={navLinkClass}>
              Items
            </NavLink>

            <NavLink to="/brands" className={navLinkClass}>
              Brands
            </NavLink>

            <NavLink to="/models" className={navLinkClass}>
              Models
            </NavLink>
          </div>

          {/* Mobile Toggle */}

          <button className="md:hidden" onClick={() => setOpen(!open)}>
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}

      {open && (
        <div className="md:hidden border-t">
          <div className="flex flex-col p-3 gap-2">
            <NavLink
              to="/"
              className={navLinkClass}
              onClick={() => setOpen(false)}
            >
              Items
            </NavLink>

            <NavLink
              to="/brands"
              className={navLinkClass}
              onClick={() => setOpen(false)}
            >
              Brands
            </NavLink>

            <NavLink
              to="/models"
              className={navLinkClass}
              onClick={() => setOpen(false)}
            >
              Models
            </NavLink>
          </div>
        </div>
      )}
    </nav>
  );
}
