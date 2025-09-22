import React from "react";
import { Link } from "react-router-dom";

function SideNavbar({ items }) {
  return (
    <div className="h-screen w-64 bg-blue-700 text-white flex flex-col fixed left-0 top-0">
      <div className="p-6 text-2xl font-bold border-b border-blue-900">
        NyumbaPay
      </div>
      <nav className="flex-1 p-4">
        <ul>
          {items.map((item) => (
            <li key={item.label} className="mb-4">
              <Link
                to={item.href}
                className="hover:bg-blue-900 px-4 py-2 rounded block"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

export default SideNavbar;
