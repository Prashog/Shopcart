import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getSuggestions } from '../../services/api'; // adjust path if needed
import debounce from 'lodash.debounce';

const SearchBar = () => {
  const [input, setInput] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();

  const fetchSuggestions = debounce(async (value) => {
    if (!value.trim()) return setSuggestions([]);
    try {
      const res = await getSuggestions(value);
      if (res.data.success) {
        setSuggestions(res.data.response);
      }
    } catch (err) {
      console.error('Suggestion fetch failed:', err);
    }
  }, 300);

  useEffect(() => {
    fetchSuggestions(input);
    return fetchSuggestions.cancel;
  }, [input]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      navigate(`/search?q=${encodeURIComponent(input.trim())}`);
      setSuggestions([]);
    }
  };

  return (
    <div className="relative w-full max-w-xl">
      <form onSubmit={handleSubmit} className="flex border rounded overflow-hidden">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Search products..."
          className="flex-1 p-2 outline-none"
        />
        <button type="submit" className="bg-green-700 text-white px-4">Search</button>
      </form>

      {suggestions.length > 0 && (
        <ul className="absolute z-10 bg-white w-full border shadow mt-1 max-h-60 overflow-y-auto">
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              className="p-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => {
                navigate(`/search?q=${encodeURIComponent(suggestion)}`);
                setSuggestions([]);
                setInput(suggestion);
              }}
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
