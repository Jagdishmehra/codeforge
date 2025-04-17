import React from 'react';

const ProductCard = ({ product, onAddToCart, onAddToWishlist }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-300 p-3 transition hover:shadow-md relative">
      <img
        src={product.thumbnail}
        alt={product.title}
        className="w-full h-36 object-cover rounded-lg mb-4"
      />
      <button
        onClick={() => onAddToWishlist(product)}
        className="absolute top-2 right-2 bg-green-100 text-green-600 p-2 rounded-full hover:bg-green-200"
      >
        ♥
      </button>
      <h3 className="text-sm font-medium text-gray-800 mb-1">{product.title}</h3>
      <p className="text-xs text-green-600 mb-2">{product.category}</p>
      <div className="flex gap-1 text-xs text-gray-600 mb-4">
        <span>Rating: {product.rating}</span>
        <span>|</span>
        <span>Price: ${product.price}</span>
      </div>
      <button
        onClick={() => onAddToCart(product)}
        className="bg-green-100 text-green-700 text-sm rounded-md px-3 py-1 border border-green-300 flex items-center gap-2 hover:bg-green-200"
      >
        🛒 Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;