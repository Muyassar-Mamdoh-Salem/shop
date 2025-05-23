// src/pages/SearchInput.jsx
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchTerm } from '../Redux/appSlice';

const SearchInput = () => {
  const dispatch = useDispatch();
  const searchTerm = useSelector((state) => state.app.searchTerm);

  const handleChange = (e) => {
    dispatch(setSearchTerm(e.target.value));
  };

  return (
    <input
      type="text"
      value={searchTerm}
      onChange={handleChange}
      placeholder="ابحث عن منتج..."
      className="border rounded p-2 w-full mb-6"
    />
  );
};

export default SearchInput;
