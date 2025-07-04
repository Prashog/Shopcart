import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useProducts } from '../contexts/ProductContext';
import { useCart } from '../contexts/CartContext';
import Button from '../components/common/Button';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

const fallbackColors = ['#E44D5A', '#333333', '#EAEAEA', '#3B5998', '#CCCCCC'];

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products } = useProducts();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [mainImage, setMainImage] = useState(null);
  const [reviewInput, setReviewInput] = useState({ rating: 0, comment: '' });
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    const foundProduct = products.find(p => p._id === id);
    if (foundProduct) {
      setProduct(foundProduct);
      if (foundProduct.colors && foundProduct.colors.length > 0) {
        setSelectedColor(foundProduct.colors[0]);
      } else {
        setSelectedColor(fallbackColors[0]);
      }
      if (foundProduct.sizes && foundProduct.sizes.length > 0) {
        setSelectedSize(foundProduct.sizes[0]);
      }
      setMainImage(foundProduct.images?.[0] || 'https://via.placeholder.com/600');
    }
  }, [id, products]);

  if (!product) return <div className="text-center py-10">Loading product details...</div>;

  const handleAddToCart = () => {
    if (product.stock === 0) return;
    addToCart({ ...product, qty: quantity, color: selectedColor, size: selectedSize });
  };

  const handleBuyNow = () => {
    if (product.stock === 0) return;
    addToCart({ ...product, qty: quantity, color: selectedColor, size: selectedSize });
    navigate('/checkout');
  };

  const handleAddToWishlist = () => {
    if (!wishlist.includes(product._id)) {
      setWishlist(prev => [...prev, product._id]);
      alert('Added to wishlist!');
    } else {
      alert('Already in wishlist.');
    }
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!reviewInput.rating || !reviewInput.comment.trim()) return;
    const newReview = { ...reviewInput };
    product.reviews = [...(product.reviews || []), newReview];
    setReviewInput({ rating: 0, comment: '' });
  };

  const relatedProducts = products
    .filter(p => p._id !== id && p.categories.some(cat => product.categories.includes(cat)))
    .slice(0, 4);

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Breadcrumb */}
      <nav className="text-sm mb-6 text-gray-500">
        <Link to="/" className="hover:text-gray-700">Home</Link> /{' '}
        <Link to="/products" className="hover:text-gray-700">Products</Link> /{' '}
        <span className="text-gray-700 font-medium">{product.name}</span>
      </nav>

      <div className="grid md:grid-cols-2 gap-12 items-start">
        {/* Image Gallery */}
        <div className="flex flex-col gap-4">
          <Zoom>
            <img
              src={mainImage}
              alt={product.name}
              className="w-full rounded-lg shadow-lg cursor-zoom-in"
            />
          </Zoom>
          <div className="flex gap-2 mt-2">
            {(product.images || []).map((img, i) => (
              <img
                key={i}
                src={img}
                alt={`Thumbnail ${i}`}
                className={`w-20 h-20 rounded-lg border cursor-pointer object-cover ${mainImage === img ? 'border-blue-500' : 'border-gray-300'}`}
                onClick={() => setMainImage(img)}
              />
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div className="space-y-6">
          <h1 className="text-4xl font-bold text-gray-800">{product.name}</h1>
          <p className="text-gray-600">{product.description}</p>

          <div className="flex items-center space-x-2 text-yellow-500">
            {'★'.repeat(Math.round(product.rating || 0))}
            {'☆'.repeat(5 - Math.round(product.rating || 0))}
            <span className="text-sm text-gray-500">({product.numReviews} reviews)</span>
          </div>

          <p className="text-3xl font-bold text-green-700">₹{product.price.toLocaleString()}</p>

          {/* Color Selector */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Choose a Color:</h3>
            <div className="flex gap-2">
              {(product.colors?.length ? product.colors : fallbackColors).map(color => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  style={{ backgroundColor: color }}
                  className={`w-8 h-8 rounded-full border-2 transition-all duration-200 ${
                    selectedColor === color ? 'border-black scale-110' : 'border-gray-300'
                  }`}
                ></button>
              ))}
            </div>
          </div>

          {/* Size Selector */}
          {product.sizes?.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-2">Select Size:</h3>
              <div className="flex gap-3">
                {product.sizes.map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 border rounded-md font-medium transition ${
                      selectedSize === size ? 'bg-gray-800 text-white' : 'bg-white text-gray-700 border-gray-300'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity + Stock */}
          <div className="flex items-center gap-6">
            <div className="flex items-center border rounded-lg overflow-hidden">
              <button
                onClick={() => setQuantity(q => Math.max(1, q - 1))}
                disabled={quantity <= 1}
                className="px-4 py-2 text-lg font-bold disabled:opacity-50"
              >-</button>
              <span className="px-4 py-2 text-lg">{quantity}</span>
              <button
                onClick={() => setQuantity(q => Math.min(q + 1, product.stock))}
                disabled={quantity >= product.stock}
                className="px-4 py-2 text-lg font-bold disabled:opacity-50"
              >+</button>
            </div>
            <p className={`font-medium ${product.stock <= 10 ? 'text-orange-500' : 'text-green-600'}`}>
              {product.stock === 0 ? 'Out of Stock' : `${product.stock} in stock`}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="mt-6 flex flex-col sm:flex-row gap-4">
            <Button onClick={handleAddToCart} disabled={product.stock === 0} className="w-full sm:w-auto">
              Add to Cart
            </Button>
            <Button variant="secondary" onClick={handleBuyNow} disabled={product.stock === 0} className="w-full sm:w-auto">
              Buy Now
            </Button>
            <Button onClick={handleAddToWishlist} className="w-full sm:w-auto bg-pink-500 hover:bg-pink-600 text-white">
              Add to Wishlist
            </Button>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <section className="mt-16">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Customer Reviews</h2>
        {product.reviews?.length > 0 ? (
          <ul className="space-y-4">
            {product.reviews.map((review, index) => (
              <li key={index} className="border p-4 rounded-md bg-gray-50">
                <div className="flex items-center space-x-2 text-yellow-500 mb-1">
                  {'★'.repeat(Math.round(review.rating))}
                  {'☆'.repeat(5 - Math.round(review.rating))}
                </div>
                <p className="text-sm text-gray-600 italic">"{review.comment}"</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No reviews yet. Be the first to review!</p>
        )}

        {/* Review Form */}
        <form onSubmit={handleReviewSubmit} className="mt-6 space-y-4">
          <div>
            <label className="block font-semibold text-gray-700 mb-1">Rating:</label>
            <select
              value={reviewInput.rating}
              onChange={(e) => setReviewInput({ ...reviewInput, rating: parseInt(e.target.value) })}
              className="border p-2 rounded w-24"
            >
              <option value={0}>Select</option>
              {[1, 2, 3, 4, 5].map(n => (
                <option key={n} value={n}>{n}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block font-semibold text-gray-700 mb-1">Comment:</label>
            <textarea
              value={reviewInput.comment}
              onChange={(e) => setReviewInput({ ...reviewInput, comment: e.target.value })}
              className="w-full border p-2 rounded h-24"
              placeholder="Write your review here..."
            ></textarea>
          </div>
          <Button type="submit" className="bg-blue-600 text-white">Submit Review</Button>
        </form>
      </section>

      {/* Related Products */}
      <section className="mt-16">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">You may also like</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {relatedProducts.map(rel => (
            <Link to={`/products/${rel._id}`} key={rel._id} className="border rounded-lg p-4 hover:shadow">
              <img src={rel.images?.[0] || 'https://via.placeholder.com/150'} alt={rel.name} className="w-full h-32 object-cover rounded-md mb-2" />
              <h4 className="text-md font-semibold text-gray-700 truncate">{rel.name}</h4>
              <p className="text-sm text-green-600 font-bold">₹{rel.price.toLocaleString()}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ProductDetailPage;