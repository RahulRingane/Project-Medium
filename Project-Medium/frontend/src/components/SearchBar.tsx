import React, { useState } from 'react';
import  { useNavigate }  from 'react-router-dom';

export const SearchBar: React.FC = () => {
  const [name, setName] = useState('');
  const Navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      Navigate(`/author/${name}/`);
    }
  };

  return (
    
<form onSubmit={handleSearch} className="md:max-w-full mx-auto">
<div className="flex">
    <div className="relative md:w-96">
        <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            id="search-dropdown"
            className="block p-1.5 md:p-2.5 w-full  text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-r-lg rounded-l-lg focus:outline-none"
            placeholder="Search Author Blogs By Name..."
            required
        />
        <button
            type="submit"
            className="absolute top-0 right-0 p-2.5 text-sm pl-2 font-medium h-full text-white bg-blue-500 rounded-r-lg hover:bg-blue-800 "
        >
            <svg
                className="w-4 h-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
            >
                <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
            </svg>
            <span className="sr-only">Search</span>
        </button>
    </div>
</div>



</form>


  )
}
   


/*<form onSubmit={handleSearch}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Search by User ID"
      />
      <button type="submit">Search</button>
    </form>*/