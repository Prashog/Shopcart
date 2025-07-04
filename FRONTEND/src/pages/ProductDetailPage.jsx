import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useProducts } from '../contexts/ProductContext';
import { useCart } from '../contexts/CartContext';
import Button from '../components/common/Button';
import Magnifier from 'react-magnifier';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

// Fallback data if product details are missing
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
  const [mainImageIndex, setMainImageIndex] = useState(0); // State for current main image
  const [reviewInput, setReviewInput] = useState({ rating: 0, comment: '' });
  const [wishlist, setWishlist] = useState([]);

  // State for dynamic location part
  const [deliveryLocation, setDeliveryLocation] = useState('Raipur 492013'); // Initial dynamic location
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false); // State to control modal visibility
  const [newPinCode, setNewPinCode] = useState(''); // State to hold the new PIN code input

  useEffect(() => {
    window.scrollTo(0, 0);
    const foundProduct = products.find(p => p._id === id);
    if (foundProduct) {
      setProduct(foundProduct);
      // Initialize selected color/size if product has them
      if (foundProduct.colors && foundProduct.colors.length > 0) {
        setSelectedColor(foundProduct.colors[0]);
      } else {
        setSelectedColor(fallbackColors[0]);
      }
      if (foundProduct.sizes && foundProduct.sizes.length > 0) {
        setSelectedSize(foundProduct.sizes[0]);
      }
      setMainImageIndex(0); // Reset to the first image when a new product is loaded
      setQuantity(1); // Reset quantity
    }
  }, [id, products]);

  if (!product) return <div className="text-center py-10">Loading product details...</div>;

  // Placeholder for image sources, using product.images or a fallback
  const productImages = product.images && product.images.length > 0
    ? product.images
    : ['https://via.placeholder.com/600/F0F0F0?text=Product+Image+1', 'https://via.placeholder.com/600/E0E0E0?text=Product+Image+2', 'https://via.placeholder.com/600/D0D0D0?text=Product+Image+3'];

  const currentMainImage = productImages[mainImageIndex];
  const currentZoomImage = product.productLargeImages?.[mainImageIndex] || currentMainImage;


  const handleAddToCart = () => {
    if (product.stock === 0) return;
    addToCart({ ...product, qty: quantity, color: selectedColor, size: selectedSize });
    alert(`${quantity} x ${product.name} (${selectedColor ? selectedColor : ''} ${selectedSize ? selectedSize : ''}) added to cart!`);
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
    if (!reviewInput.rating || !reviewInput.comment.trim()) {
      alert('Please provide both a rating and a comment.');
      return;
    }
    const newReview = { ...reviewInput, date: new Date().toLocaleDateString() };
    product.reviews = [...(product.reviews || []), newReview];
    product.rating = ((product.rating || 0) * (product.numReviews || 0) + newReview.rating) / ((product.numReviews || 0) + 1);
    product.numReviews = (product.numReviews || 0) + 1;

    setReviewInput({ rating: 0, comment: '' });
    alert('Review submitted!');
  };

  const relatedProducts = products
    .filter(p => p._id !== id && p.categories.some(cat => product.categories.includes(cat)))
    .slice(0, 4);

  // Mock data for delivery
  const deliveryDate = new Date();
  deliveryDate.setMonth(6); // July (0-indexed)
  deliveryDate.setDate(8);
  deliveryDate.setFullYear(2025);

  const deliveryDay = deliveryDate.toLocaleDateString('en-US', { weekday: 'long' });
  const deliveryMonth = deliveryDate.toLocaleDateString('en-US', { month: 'long' });
  const deliveryDayOfMonth = deliveryDate.getDate();

  // Mock remaining time for order
  const remainingHours = 23;
  const remainingMinutes = 6;


  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Top Breadcrumb and Sponsored label */}
      <div className="flex justify-between items-center text-xs text-gray-600 mb-4">
        <nav>
          <Link to="/" className="hover:underline">Home</Link> &gt;{' '}
          <Link to="/products" className="hover:underline">Products</Link> &gt;{' '}
          <span className="text-gray-700 font-medium">{product.name}</span>
        </nav>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-12 gap-6">

        {/* Left Vertical Thumbnails (col-span-1 on md, col-span-1 on lg) */}
        <div className="hidden md:flex flex-col items-center space-y-3 col-span-1">
          {productImages.slice(0, 4).map((img, i) => ( // Show first 4 images as thumbnails
            <button
              key={i}
              className={`p-1 border rounded-sm ${mainImageIndex === i ? 'border-blue-500' : 'border-gray-300'}`}
              onClick={() => setMainImageIndex(i)}
            >
              <img src={img} alt={`Thumbnail ${i + 1}`} className="w-12 h-12 object-cover" />
            </button>
          ))}
          {/* Video Placeholder */}
          <button className="p-1 border rounded-sm border-gray-300">
            <div className="w-12 h-12 flex items-center justify-center bg-gray-100 text-gray-600">
              <i className="fas fa-video text-xl"></i> {/* Font Awesome video icon */}
            </div>
          </button>
          {/* More Images Placeholder */}
          {productImages.length > 4 && (
            <button
              className="p-1 border rounded-sm border-gray-300"
              onClick={() => { /* Handle view all images */ }}
            >
              <div className="w-12 h-12 flex items-center justify-center bg-gray-100 text-gray-600 font-bold text-lg">
                3+
              </div>
            </button>
          )}
        </div>

        {/* Main Product Image with Magnifier and Zoom */}
        <div className="md:col-span-1 lg:col-span-5 flex flex-col items-center">
          <div className="relative border p-4 rounded-lg shadow-md w-full max-w-lg bg-white flex items-center justify-center"
               style={{ height: '400px', overflow: 'hidden' }}
          >
            {/* Wrap Magnifier with Zoom */}
            <Zoom>
              <Magnifier
                src={currentMainImage}
                zoomImgSrc={currentZoomImage}
                zoomFactor={1.5}
                mgShape="square"
                mgWidth={200}
                mgHeight={200}
                className="w-full h-full object-contain"
                mgShowOverflow={false}
              />
            </Zoom>

            <button className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-md text-gray-600 hover:text-gray-900">
              <i className="fas fa-share-alt"></i> {/* Share icon */}
            </button>
            <button className="absolute top-4 left-4 bg-white p-2 rounded-full shadow-md text-gray-600 hover:text-gray-900">
              <i className="fas fa-expand"></i> {/* Expand icon (could trigger a custom full-screen view) */}
            </button>
          </div>
          <p className="text-sm text-gray-500 mt-2">Hover for magnified view, click for full screen</p>
        </div>

        {/* Right Product Details & Purchase Options (col-span-1 on md, col-span-6 on lg) */}
        <div className="md:col-span-1 lg:col-span-6 space-y-4">
          {/* Product Name */}
          <h1 className="text-3xl font-bold text-gray-800">{product.name}</h1>

          {/* Rating and Reviews Summary */}
          <div className="flex items-center space-x-2 text-yellow-500">
            {'★'.repeat(Math.round(product.rating || 0))}
            {'☆'.repeat(5 - Math.round(product.rating || 0))}
            <span className="text-sm text-gray-500">({product.numReviews || 0} reviews)</span>
          </div>

          {/* Price */}
          <div className="text-4xl font-semibold text-gray-800">
            ₹{product.price.toLocaleString()}
            <sup className="text-xl align-super">00</sup>
          </div>

          {/* Color Selector */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Color:</h3>
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
              <h3 className="text-lg font-semibold mb-2">Size:</h3>
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

          {/* Quantity Selector */}
          <div className="flex items-center gap-4">
            <h3 className="text-lg font-semibold">Quantity:</h3>
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
          </div>

          {/* Delivery Information */}
          <div className="text-green-700 text-sm font-semibold">
            FREE delivery {deliveryDay}, {deliveryDayOfMonth} {deliveryMonth}.
          </div>
          <div className="text-sm text-gray-700">
            Order within <span className="font-bold text-red-600">{remainingHours} hrs {remainingMinutes} mins</span>
            . <Link to="#" className="text-blue-600 hover:underline">Details</Link>
          </div>
          {/* Dynamic Location Part */}
          <div className="flex items-center text-sm text-gray-600">
            <i className="fas fa-map-marker-alt mr-2"></i> {/* Map marker icon */}
            <span>Delivering to {deliveryLocation} - </span> {/* Dynamic location */}
            <span
              className="text-blue-600 hover:underline ml-1 cursor-pointer"
              onClick={() => setIsLocationModalOpen(true)} // Open modal on click
            >
              Update location
            </span>
          </div>

          {/* Stock Info */}
          {product.stock > 0 ? (
            <div className="text-lg font-bold text-red-700 mt-4">
              Only {product.stock} left in stock.
            </div>
          ) : (
            <div className="text-lg font-bold text-red-700 mt-4">Out of Stock</div>
          )}

          {/* Seller Info */}
          <div className="text-sm text-gray-600 space-y-1">
            <div className="flex">
              <span className="w-20 text-gray-500">Ships from</span>
              <span className="font-semibold">Doveberry</span>
            </div>
            <div className="flex">
              <span className="w-20 text-gray-500">Sold by</span>
              <span className="font-semibold">Doveberry</span>
            </div>
            <div className="flex">
              <span className="w-20 text-gray-500">Payment</span>
              <span>Secure transaction</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col space-y-3 mt-6">
            <Button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className="w-full bg-yellow-500 hover:bg-yellow-600 text-black py-2 rounded-lg font-semibold shadow-md disabled:opacity-50"
            >
              Add to Cart
            </Button>
            <Button
              onClick={handleBuyNow}
              disabled={product.stock === 0}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-lg font-semibold shadow-md disabled:opacity-50"
            >
              Buy Now
            </Button>
            <Button
              onClick={handleAddToWishlist}
              className="w-full bg-green hover:bg-gray-100 text-blue-700 border border-gray-400 py-2 rounded-lg font-semibold shadow-sm"
            >
              Add to Wish List
            </Button>
          </div>
        </div>
      </div>

      {/* Product Description Section */}
      <section className="mt-16 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Product Description</h2>
        <p className="text-gray-700 leading-relaxed">{product.description}</p>
      </section>

      {/* Reviews Section */}
      <section className="mt-16 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Customer Reviews</h2>
        {product.reviews?.length > 0 ? (
          <ul className="space-y-6">
            {product.reviews.map((review, index) => (
              <li key={index} className="border-b pb-4 last:border-b-0">
                <div className="flex items-center space-x-2 text-yellow-500 mb-1">
                  {'★'.repeat(Math.round(review.rating))}
                  {'☆'.repeat(5 - Math.round(review.rating))}
                  <span className="text-sm text-gray-500 ml-2">{review.date}</span>
                </div>
                <p className="text-base text-gray-800 font-medium mb-1">{review.comment}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 text-lg">No reviews yet. Be the first to share your thoughts!</p>
        )}

        {/* Review Form */}
        <h3 className="text-xl font-bold text-gray-800 mt-10 mb-4">Write a Customer Review</h3>
        <form onSubmit={handleReviewSubmit} className="space-y-4">
          <div>
            <label className="block font-semibold text-gray-700 mb-1" htmlFor="reviewRating">Rating:</label>
            <select
              id="reviewRating"
              value={reviewInput.rating}
              onChange={(e) => setReviewInput({ ...reviewInput, rating: parseInt(e.target.value) })}
              className="border p-2 rounded w-full sm:w-32 focus:ring-blue-500 focus:border-blue-500"
              required
            >
              <option value={0}>Select</option>
              {[1, 2, 3, 4, 5].map(n => (
                <option key={n} value={n}>{n} Star{n > 1 ? 's' : ''}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block font-semibold text-gray-700 mb-1" htmlFor="reviewComment">Comment:</label>
            <textarea
              id="reviewComment"
              value={reviewInput.comment}
              onChange={(e) => setReviewInput({ ...reviewInput, comment: e.target.value })}
              className="w-full border p-2 rounded h-32 focus:ring-blue-500 focus:border-blue-500"
              placeholder="What did you like or dislike about the product? What are its key features?"
              required
            ></textarea>
          </div>
          <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-lg font-semibold">Submit Review</Button>
        </form>
      </section>

      {/* Related Products */}
      <section className="mt-16 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Customers also viewed these products</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {relatedProducts.map(rel => (
            <Link to={`/products/${rel._id}`} key={rel._id} className="border rounded-lg p-3 hover:shadow-lg transition-shadow duration-200 flex flex-col items-center text-center">
              <img src={rel.images?.[0] || 'https://via.placeholder.com/150'} alt={rel.name} className="w-full h-32 object-contain rounded-md mb-3" />
              <h4 className="text-md font-semibold text-gray-700 truncate w-full px-1">{rel.name}</h4>
              <p className="text-sm text-green-700 font-bold mt-1">₹{rel.price.toLocaleString()}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Location Update Modal */}
      {isLocationModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl w-80">
            <h3 className="text-lg font-semibold mb-4">Update Delivery Location</h3>
            <input
              type="text"
              className="border p-2 rounded w-full mb-4 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter new PIN code (e.g., 492001)"
              value={newPinCode}
              onChange={(e) => setNewPinCode(e.target.value)}
            />
            <div className="flex justify-end space-x-2">
              <Button
                onClick={() => {
                  setIsLocationModalOpen(false);
                  setNewPinCode(''); // Clear input on cancel
                }}
                className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300"
              >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  // Basic validation: check if pincode is not empty and is numeric
                  if (newPinCode.trim() && /^\d{6}$/.test(newPinCode.trim())) { // Simple 6-digit PIN code check
                    // For simplicity, we'll replace just the PIN code part.
                    // In a real application, you might use a location API to get
                    // city/state from the PIN code and update the full string.
                    setDeliveryLocation(prev => {
                        // Attempt to replace just the numeric part (PIN code)
                        const parts = prev.split(' ');
                        const lastPart = parts[parts.length - 1];
                        if (/\d+/.test(lastPart)) { // If last part contains digits, assume it's the pincode
                            parts[parts.length - 1] = newPinCode.trim();
                            return parts.join(' ');
                        } else { // Otherwise, just append the new pincode
                            return `${prev.split(' - ')[0]} - ${newPinCode.trim()}`;
                        }
                    });
                    setIsLocationModalOpen(false);
                    setNewPinCode('');
                  } else {
                    alert('Please enter a valid 6-digit PIN code.');
                  }
                }}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Update
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetailPage;