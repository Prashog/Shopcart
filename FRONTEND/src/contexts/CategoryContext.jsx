// import React, { createContext, useState, useEffect, useContext } from 'react';
// import { getCategories } from '../services/api';

// const CategoryContext = createContext();

// export const useCategories = () => useContext(CategoryContext);

// export const CategoryProvider = ({ children }) => {
//   const [categories, setCategories] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         setLoading(true);
//         const { data } = await getCategories();
//         if (data.success) {
//             setCategories(data.response);
//         } else {
//             // Handle cases where the API returns success: false
//             throw new Error(data.error || 'An unknown error occurred');
//         }
//         setError(null);
//       } catch (err) {
//         setError('Failed to fetch categories.');
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchCategories();
//   }, []);

//   const value = { categories, loading, error };

//   return (
//     <CategoryContext.Provider value={value}>
//       {children}
//     </CategoryContext.Provider>
//   );
// };

import React, { createContext, useState, useEffect, useContext } from 'react';
import { getCategories } from '../services/api';

const CategoryContext = createContext();

export const useCategories = () => useContext(CategoryContext);

export const CategoryProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const { data } = await getCategories();
        if (data.success) {
            setCategories(data.response);
        } else {
            // Handle cases where the API returns success: false
            throw new Error(data.error || 'An unknown error occurred');
        }
        setError(null);
      } catch (err) {
        setError('Failed to fetch categories.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  const value = { categories, loading, error };

  return (
    <CategoryContext.Provider value={value}>
      {children}
    </CategoryContext.Provider>
  );
};