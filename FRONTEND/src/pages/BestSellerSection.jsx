import { useEffect, useState } from 'react';
import { getBestSellers } from '../services/api';

const BestSellersSection = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getBestSellers().then(res => setProducts(res.data.bestSellers));
  }, []);

  return (
    <div>
      <h2>🔥 Best Sellers</h2>
      <ul>
        {products.map(p => (
          <li key={p._id}>
            <img src={p.images[0]} alt={p.name} />
            <p>{p.name} - ₹{p.price}</p>
            <small>{p.totalSold} sold</small>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BestSellersSection;