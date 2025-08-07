import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProductById, submitReview } from '../services/api';
import axios from 'axios';
import Button from '../components/common/Button';
import { useCart } from '../contexts/CartContext';
import { useWishlist } from '../contexts/WishlistContext';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { getWishlist, addToWishlist, removeFromWishlist } from '../services/api';
import { Star, StarHalf, Star as StarOutline } from 'lucide-react';

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [reviewInput, setReviewInput] = useState({ rating: 0, comment: '' });
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [isFavourite, setIsFavourite] = useState(false);
  const [wishlistId, setWishlistId] = useState(null);
  const { wishlist, refreshWishlist } = useWishlist();

  const fetchProduct = async () => {
    try {
      const { data } = await getProductById(id);
      setProduct(data.response);
    } catch (err) {
      console.error('Failed to load product', err);
    }
  };

  const fetchReviews = async () => {
    try {
      const { data } = await axios.get(`http://localhost:8080/reviews/${id}`);
      setReviews(data.response || []);
    } catch (err) {
      console.error('Failed to fetch reviews', err);
    }
  };

  const checkWishlistStatus = () => {
    const match = wishlist.find((item) => item._id === id);
    setIsFavourite(!!match);
    setWishlistId(match?._id || null);
  };

  useEffect(() => {
    (async () => {
      setLoading(true);
      await fetchProduct();
      await fetchReviews();
      setLoading(false);
    })();
  }, [id]);

  useEffect(() => {
    checkWishlistStatus();
  }, [wishlist, id]);

  useEffect(() => {
    if (product?.images?.length > 1) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % product.images.length);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [product]);

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!reviewInput.rating || !reviewInput.comment.trim()) return;
    try {
      await submitReview(id, reviewInput);
      setReviewInput({ rating: 0, comment: '' });
      await fetchProduct();
      await fetchReviews();
    } catch (error) {
      console.error('Failed to submit review', error);
      alert('You must be logged in to post a review.');
    }
  };

  const handleAddToCart = () => {
    const productToAdd = {
      id: product._id,
      name: product.name,
      price: product.price,
      qty: quantity,
      imageUrl: product.images?.[0] || 'https://via.placeholder.com/150',
      stock: product.stock,
    };
    addToCart(productToAdd);
    navigate('/cart');
  };

  const handleBuyNow = () => {
    const productToBuy = {
      id: product._id,
      name: product.name,
      price: product.price,
      qty: quantity,
      imageUrl: product.images?.[0] || 'https://via.placeholder.com/150',
    };
    addToCart(productToBuy);
    navigate('/checkout');
  };

  const toggleWishlist = async () => {
    try {
      if (isFavourite) {
        await removeFromWishlist(product._id);
      } else {
        await addToWishlist(product._id);
      }
      await refreshWishlist();
    } catch (err) {
      console.error('Failed to toggle wishlist', err);
    }
  };


  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    const stars = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`full-${i}`} className="text-black w-5 h-5 fill-black" />);
    }

    if (hasHalfStar) {
      stars.push(<StarHalf key="half" className="text-black w-5 h-5 fill-black" />);
    }

    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="text-black w-5 h-5" />);
    }

    return (
      <div className="flex items-center gap-1">
        {stars}
        <span className="ml-2 text-sm text-black">({rating.toFixed(1)})</span>
      </div>
    );
  };

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (!product) return <div className="text-center text-red-500">Product not found</div>;

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">{product.name}</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Image Carousel */}
        <div className="flex gap-4">
          {/* Thumbnail column */}
          <div className="flex flex-col gap-2 overflow-y-auto max-h-[400px]">
            {product.images?.map((img, index) => (
              <img
                key={index}
                src={img || 'https://via.placeholder.com/400'}
                alt="thumbnail"
                onClick={() => setCurrentImageIndex(index)}
                className={`w-16 h-16 object-cover rounded cursor-pointer ${currentImageIndex === index ? 'ring-2 ring-black' : ''}`}
              />
            ))}
          </div>

          {/* Main Image */}
          <div className="flex-1 rounded bg-white overflow-hidden h-[550px]">
            <img
              src={product.images?.[currentImageIndex] || 'https://via.placeholder.com/400'}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-white bg-gray-800 px-4 py-2 rounded">{product.name}</h2>
          <p className="text-gray-700 text-base">{product.description}</p>

          {renderStars(product.rating)}

          <div className="flex flex-wrap gap-2">
            {(product.categories || []).map((cat, i) => (
              <span key={i} className="flex items-center gap-1 bg-gray-200 text-sm px-2 py-1 rounded">
                <span className="text-xs">🏷️</span>
                {cat.name || 'Unnamed'}
              </span>
            ))}
          </div>

          <p className="text-3xl font-bold text-green-700">₹{product.price}</p>
          <p className={`text-md font-semibold ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
            {product.stock > 0 ? `${product.stock} in stock` : 'Out of Stock'}
          </p>

          <div className="flex items-center gap-4 mt-2">
            <span className="font-medium">Qty:</span>
            <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="px-3 py-1 border rounded">-</button>
            <span>{quantity}</span>
            <button onClick={() => setQuantity(q => q + 1)} className="px-3 py-1 border rounded">+</button>
          </div>

          <div className="flex gap-4 mt-4">
            <Button onClick={handleAddToCart} className="bg-black text-white hover:bg-blue-100 hover:text-black">Add to Cart</Button>
            <Button onClick={handleBuyNow} className="bg-black text-white hover:bg-blue-100 hover:text-black">Buy Now</Button>
            <Button
              onClick={toggleWishlist}
              className="group flex items-center gap-2 border border-black text-white hover:bg-blue-100 hover:text-black"
            >
              {isFavourite ? (
                <AiFillHeart className="text-red-600 group-hover:text-black" />
              ) : (
                <AiOutlineHeart className="text-white group-hover:text-black" />
              )}
              Favourite
            </Button>
          </div>

          <div className="mt-6 flex items-center gap-4 bg-gray-100 p-4 rounded-lg">
            <span className="text-2xl">🚚</span>
            <div>
              <p className="font-semibold">Free Delivery</p>
              <p className="text-sm text-gray-600">Get free delivery on all orders above ₹500</p>
            </div>
          </div>

          <div className="mt-4 flex items-center gap-4 bg-gray-100 p-4 rounded-lg">
            <span className="text-2xl">🔁</span>
            <div>
              <p className="font-semibold">10-Day Replacement</p>
              <p className="text-sm text-gray-600">Replacement available within 10 days of delivery</p>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews */}
      <section className="mt-12">
        <h2 className="text-2xl font-bold mb-4 text-black">Customer Reviews</h2>

        {reviews.length > 0 ? (
          <ul className="space-y-2">
            {reviews.map((review) => (
              <li
                key={review._id}
                className="bg-white text-black p-4 rounded shadow-sm"
              >
                <div className="flex items-center gap-1 text-sm">
                  {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
                </div>
                <p className="italic mt-1">"{review.comment}"</p>
                <p className="text-sm mt-1">- {review.name}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600">No reviews yet.</p>
        )}

        <form onSubmit={handleReviewSubmit} className="mt-6 space-y-4">
          <div>
            <label className="block font-medium text-black mb-1">Rating:</label>
            <select
              value={reviewInput.rating}
              onChange={(e) =>
                setReviewInput({ ...reviewInput, rating: parseInt(e.target.value) })
              }
              className="border border-gray-300 p-2 rounded w-32 text-black"
            >
              <option value={0}>Select</option>
              {[1, 2, 3, 4, 5].map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block font-medium text-black mb-1">Comment:</label>
            <textarea
              value={reviewInput.comment}
              onChange={(e) =>
                setReviewInput({ ...reviewInput, comment: e.target.value })
              }
              className="w-full border border-gray-300 p-2 rounded h-24 text-black"
              placeholder="Write your review..."
            />
          </div>
          <Button type="submit" className="bg-black text-white hover:bg-blue-100 hover:text-black">
            Submit Review
          </Button>
        </form>
      </section>

    </div>
  );
};

export default ProductDetailPage;