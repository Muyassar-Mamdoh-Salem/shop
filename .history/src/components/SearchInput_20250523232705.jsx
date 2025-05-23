import { useDispatch, useSelector } from "react-redux";
import { setSearchTerm } from "../Redux/appSlice";

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
      className="w-full p-2 mb-6 rounded border border-gray-300"
    />
  );
};

export default SearchInput;
