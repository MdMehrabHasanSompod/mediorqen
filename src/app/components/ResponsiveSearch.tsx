"use client";

import { useState } from "react";
import { Search } from "lucide-react";

interface ISearchProp {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  placeholderText: string;
}

const ResponsiveSearch = ({ searchTerm, setSearchTerm, placeholderText }: ISearchProp) => {
  const [showMobileSearch, setShowMobileSearch] = useState(false);

  return (
    <div className="w-full flex justify-center mb-6 relative">
      <div className={`relative w-full sm:w-1/2 transition-all duration-300
        ${showMobileSearch ? "opacity-100" : "opacity-0 md:opacity-100"}`}
        style={{ transitionProperty: "transform, opacity" }}
      >
         <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder={placeholderText}
          className="w-full pl-10 pr-6 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 bg-blue-100"
        />
       
      </div>
      
      <button
        onClick={() => setShowMobileSearch(!showMobileSearch)}
        className="md:hidden absolute right-0 flex items-center justify-center p-2 bg-blue-500 text-white rounded-full z-20"
      >
        <Search size={24} />
      </button>
    </div>
  );
};

export default ResponsiveSearch;
