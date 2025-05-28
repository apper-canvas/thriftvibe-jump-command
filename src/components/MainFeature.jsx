import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'react-toastify'
import ApperIcon from './ApperIcon'

const MainFeature = () => {
  const [products, setProducts] = useState([])
  const [cart, setCart] = useState([])
  const [wishlist, setWishlist] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [sortBy, setSortBy] = useState('newest')
  const [showCart, setShowCart] = useState(false)
  const [showCheckout, setShowCheckout] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [showSearch, setShowSearch] = useState(false)
  const [searchResults, setSearchResults] = useState([])
  const [searchFilters, setSearchFilters] = useState({
    category: 'all',
    minPrice: '',
    maxPrice: '',
    condition: [],
    brand: ''
  })
  const [isSearching, setIsSearching] = useState(false)

  const [isLoading, setIsLoading] = useState(true)

  // Mock product data
  useEffect(() => {
    const mockProducts = [
      {
        id: '1',
        name: 'Vintage Levi\'s Denim Jacket',
        description: 'Classic 80s denim jacket in excellent condition. Perfect for layering.',
        price: 45.99,
        category: 'outerwear',
        size: 'M',
        brand: 'Levi\'s',
        condition: 'Excellent',
        images: ['https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400'],
        inStock: true,
        dateAdded: new Date('2024-01-15')
      },
      {
        id: '2',
        name: 'Floral Midi Dress',
        description: 'Beautiful vintage floral print dress, perfect for spring occasions.',
        price: 32.99,
        category: 'dresses',
        size: 'S',
        brand: 'Unknown',
        condition: 'Good',
        images: ['https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400'],
        inStock: true,
        dateAdded: new Date('2024-01-14')
      },
      {
        id: '3',
        name: 'Designer Silk Blouse',
        description: 'Luxurious silk blouse from premium brand. Timeless elegance.',
        price: 68.99,
        category: 'tops',
        size: 'M',
        brand: 'Designer',
        condition: 'Like New',
        images: ['https://images.unsplash.com/photo-1564859228273-274232fdb516?w=400'],
        inStock: true,
        dateAdded: new Date('2024-01-13')
      },
      {
        id: '4',
        name: 'High-Waisted Mom Jeans',
        description: 'Trendy mom jeans in perfect condition. Classic 90s style.',
        price: 38.99,
        category: 'bottoms',
        size: 'L',
        brand: 'Vintage',
        condition: 'Excellent',
        images: ['https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=400'],
        inStock: true,
        dateAdded: new Date('2024-01-12')
      },
      {
        id: '5',
        name: 'Leather Crossbody Bag',
        description: 'Genuine leather crossbody bag with adjustable strap.',
        price: 42.99,
        category: 'accessories',
        size: 'One Size',
        brand: 'Artisan',
        condition: 'Good',
        images: ['https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400'],
        inStock: true,
        dateAdded: new Date('2024-01-11')
      },
      {
        id: '6',
        name: 'Vintage Nike Sneakers',
        description: 'Retro Nike sneakers in great condition. Authentic vintage pair.',
        price: 55.99,
        category: 'shoes',
        size: '9',
        brand: 'Nike',
        condition: 'Good',
        images: ['https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400'],
        inStock: true,
        dateAdded: new Date('2024-01-10')
      }
    ]

    setTimeout(() => {
      setProducts(mockProducts)
      setIsLoading(false)
    }, 1000)
  }, [])

  const categories = [
    { id: 'all', name: 'All Items', icon: 'Grid3X3' },
    { id: 'dresses', name: 'Dresses', icon: 'User' },
    { id: 'tops', name: 'Tops', icon: 'Shirt' },
    { id: 'bottoms', name: 'Bottoms', icon: 'User' },
    { id: 'outerwear', name: 'Outerwear', icon: 'Shirt' },
    { id: 'accessories', name: 'Accessories', icon: 'Crown' },
    { id: 'shoes', name: 'Shoes', icon: 'User' }
  ]

  const filteredProducts = products
    .filter(product => selectedCategory === 'all' || product.category === selectedCategory)
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price
        case 'price-high':
          return b.price - a.price
        case 'newest':
          return new Date(b.dateAdded) - new Date(a.dateAdded)
        default:
          return 0
      }
    })

  const addToCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id)
    if (existingItem) {
      setCart(cart.map(item => 
        item.id === product.id 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ))
      toast.success('Updated quantity in cart!')
    } else {
      setCart([...cart, { ...product, quantity: 1 }])
      toast.success('Added to cart!')
    }
  }

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId))
    toast.success('Removed from cart!')
  }

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity === 0) {
      removeFromCart(productId)
    } else {
      setCart(cart.map(item => 
        item.id === productId 
          ? { ...item, quantity: newQuantity }
          : item
      ))
    }
  }

  const toggleWishlist = (product) => {
    const isInWishlist = wishlist.find(item => item.id === product.id)
    if (isInWishlist) {
      setWishlist(wishlist.filter(item => item.id !== product.id))
      toast.success('Removed from wishlist!')
    } else {
      setWishlist([...wishlist, product])
      toast.success('Added to wishlist!')
    }
  }

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2)
  }

  const handleCheckout = (e) => {
    e.preventDefault()
    toast.success('Order placed successfully!')
    setCart([])
    setShowCheckout(false)
    setShowCart(false)
  }

  const handleSearch = () => {
    if (!searchQuery.trim() && searchFilters.category === 'all' && !searchFilters.minPrice && !searchFilters.maxPrice && searchFilters.condition.length === 0 && !searchFilters.brand) {
      setSearchResults(products)
      return
    }

    setIsSearching(true)
    
    setTimeout(() => {
      let filtered = products.filter(product => {
        // Text search
        const matchesText = !searchQuery.trim() || 
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.category.toLowerCase().includes(searchQuery.toLowerCase())

        // Category filter
        const matchesCategory = searchFilters.category === 'all' || product.category === searchFilters.category

        // Price filter
        const matchesMinPrice = !searchFilters.minPrice || product.price >= parseFloat(searchFilters.minPrice)
        const matchesMaxPrice = !searchFilters.maxPrice || product.price <= parseFloat(searchFilters.maxPrice)

        // Condition filter
        const matchesCondition = searchFilters.condition.length === 0 || searchFilters.condition.includes(product.condition)

        // Brand filter
        const matchesBrand = !searchFilters.brand || product.brand.toLowerCase().includes(searchFilters.brand.toLowerCase())

        return matchesText && matchesCategory && matchesMinPrice && matchesMaxPrice && matchesCondition && matchesBrand
      })

      setSearchResults(filtered)
      setIsSearching(false)
      
      if (filtered.length === 0) {
        toast.info('No products found matching your search criteria')
      } else {
        toast.success(`Found ${filtered.length} product${filtered.length === 1 ? '' : 's'}`)
      }
    }, 500)
  }

  const clearSearch = () => {
    setSearchQuery('')
    setSearchFilters({
      category: 'all',
      minPrice: '',
      maxPrice: '',
      condition: [],
      brand: ''
    })
    setSearchResults([])
  }

  const handleFilterChange = (filterType, value) => {
    setSearchFilters(prev => {
      if (filterType === 'condition') {
        const newConditions = prev.condition.includes(value)
          ? prev.condition.filter(c => c !== value)
          : [...prev.condition, value]
        return { ...prev, condition: newConditions }
      }
      return { ...prev, [filterType]: value }
    })
  }

  // Expose search function to parent components
  window.openSearch = () => setShowSearch(true)



  if (isLoading) {
    return (
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-gradient-to-r from-primary to-accent rounded-2xl flex items-center justify-center mx-auto mb-4 animate-pulse">
              <ApperIcon name="ShoppingBag" className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-surface-900 mb-4">Loading Collection...</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="card p-6 animate-pulse">
                <div className="bg-surface-200 h-48 rounded-xl mb-4"></div>
                <div className="bg-surface-200 h-4 rounded mb-2"></div>
                <div className="bg-surface-200 h-4 rounded w-2/3"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="shop" className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="w-16 h-16 bg-gradient-to-r from-primary to-accent rounded-2xl flex items-center justify-center mx-auto mb-4"
          >
            <ApperIcon name="ShoppingBag" className="w-8 h-8 text-white" />
          </motion.div>
          <h2 className="text-3xl sm:text-4xl font-bold text-surface-900 mb-4">
            Shop Collection
          </h2>
          <p className="text-lg text-surface-600 max-w-2xl mx-auto">
            Discover unique pieces from our curated collection of pre-loved fashion
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between">
            {/* Category Filter */}
            <div className="w-full lg:w-auto">
              <h3 className="text-sm font-medium text-surface-700 mb-3">Categories</h3>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 flex items-center space-x-2 ${
                      selectedCategory === category.id
                        ? 'bg-primary text-white shadow-card'
                        : 'bg-surface-100 text-surface-700 hover:bg-surface-200'
                    }`}
                  >
                    <ApperIcon name={category.icon} className="w-4 h-4" />
                    <span className="hidden sm:block">{category.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Sort Filter */}
            <div className="w-full lg:w-auto">
              <h3 className="text-sm font-medium text-surface-700 mb-3">Sort By</h3>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="input-field w-full lg:w-48"
              >
                <option value="newest">Newest First</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
          layout
        >
          <AnimatePresence>
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="card group cursor-pointer hover:shadow-card transition-all duration-300"
                onClick={() => setSelectedProduct(product)}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <span className={`badge ${
                      product.condition === 'Like New' ? 'bg-green-100 text-green-800' :
                      product.condition === 'Excellent' ? 'bg-blue-100 text-blue-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {product.condition}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4">
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        toggleWishlist(product)
                      }}
                      className={`p-2 rounded-full transition-colors ${
                        wishlist.find(item => item.id === product.id)
                          ? 'bg-accent text-white'
                          : 'bg-white/80 text-surface-600 hover:bg-white'
                      }`}
                    >
                      <ApperIcon name="Heart" className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-surface-900 group-hover:text-primary transition-colors">
                      {product.name}
                    </h3>
                    <span className="text-xl font-bold text-primary">${product.price}</span>
                  </div>
                  
                  <p className="text-surface-600 text-sm mb-3 line-clamp-2">
                    {product.description}
                  </p>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4 text-sm text-surface-500">
                      <span>Size: {product.size}</span>
                      <span>Brand: {product.brand}</span>
                    </div>
                  </div>
                  
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      addToCart(product)
                    }}
                    className="btn-primary w-full"
                  >
                    <ApperIcon name="ShoppingCart" className="w-5 h-5 mr-2" />
                    Add to Cart
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Cart Sidebar */}
        <AnimatePresence>
          {showCart && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50 z-50"
                onClick={() => setShowCart(false)}
              />
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 20 }}
                className="fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-50 overflow-y-auto"
              >
                <div className="p-6 border-b border-surface-200">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-semibold">Shopping Cart ({cart.length})</h3>
                    <button
                      onClick={() => setShowCart(false)}
                      className="p-2 hover:bg-surface-100 rounded-xl transition-colors"
                    >
                      <ApperIcon name="X" className="w-6 h-6" />
                    </button>
                  </div>
                </div>

                <div className="p-6">
                  {cart.length === 0 ? (
                    <div className="text-center py-12">
                      <ApperIcon name="ShoppingCart" className="w-16 h-16 text-surface-300 mx-auto mb-4" />
                      <p className="text-surface-600">Your cart is empty</p>
                    </div>
                  ) : (
                    <>
                      <div className="space-y-4 mb-6">
                        {cart.map((item) => (
                          <div key={item.id} className="flex items-center space-x-4 p-4 bg-surface-50 rounded-xl">
                            <img
                              src={item.images[0]}
                              alt={item.name}
                              className="w-16 h-16 object-cover rounded-xl"
                            />
                            <div className="flex-1">
                              <h4 className="font-medium text-surface-900">{item.name}</h4>
                              <p className="text-sm text-surface-600">Size: {item.size}</p>
                              <div className="flex items-center space-x-2 mt-2">
                                <button
                                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                  className="w-8 h-8 rounded-full bg-surface-200 flex items-center justify-center"
                                >
                                  <ApperIcon name="Minus" className="w-4 h-4" />
                                </button>
                                <span className="w-8 text-center">{item.quantity}</span>
                                <button
                                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                  className="w-8 h-8 rounded-full bg-surface-200 flex items-center justify-center"
                                >
                                  <ApperIcon name="Plus" className="w-4 h-4" />
                                </button>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="font-semibold text-primary">${(item.price * item.quantity).toFixed(2)}</p>
                              <button
                                onClick={() => removeFromCart(item.id)}
                                className="text-surface-400 hover:text-red-500 transition-colors"
                              >
                                <ApperIcon name="Trash2" className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="border-t border-surface-200 pt-6">
                        <div className="flex justify-between text-xl font-semibold mb-4">
                          <span>Total: ${getTotalPrice()}</span>
                        </div>
                        <button
                          onClick={() => setShowCheckout(true)}
                          className="btn-primary w-full"
                        >
                          <ApperIcon name="CreditCard" className="w-5 h-5 mr-2" />
                          Proceed to Checkout
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Checkout Modal */}
        <AnimatePresence>
          {showCheckout && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
                onClick={() => setShowCheckout(false)}
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="fixed inset-0 z-50 flex items-center justify-center p-4"
              >
                <div className="bg-white rounded-2xl p-8 max-w-md w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-semibold">Checkout</h3>
                    <button
                      onClick={() => setShowCheckout(false)}
                      className="p-2 hover:bg-surface-100 rounded-xl transition-colors"
                    >
                      <ApperIcon name="X" className="w-6 h-6" />
                    </button>
                  </div>

                  <form onSubmit={handleCheckout} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-surface-700 mb-2">Email</label>
                      <input type="email" required className="input-field" placeholder="your@email.com" />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-surface-700 mb-2">Full Name</label>
                      <input type="text" required className="input-field" placeholder="John Doe" />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-surface-700 mb-2">Address</label>
                      <input type="text" required className="input-field" placeholder="123 Main St" />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-surface-700 mb-2">City</label>
                        <input type="text" required className="input-field" placeholder="New York" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-surface-700 mb-2">ZIP Code</label>
                        <input type="text" required className="input-field" placeholder="10001" />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-surface-700 mb-2">Card Number</label>
                      <input type="text" required className="input-field" placeholder="1234 5678 9012 3456" />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-surface-700 mb-2">Expiry</label>
                        <input type="text" required className="input-field" placeholder="MM/YY" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-surface-700 mb-2">CVV</label>
                        <input type="text" required className="input-field" placeholder="123" />
                      </div>
                    </div>
                    
                    <div className="border-t border-surface-200 pt-4 mt-6">
                      <div className="flex justify-between text-xl font-semibold mb-4">
                        <span>Total: ${getTotalPrice()}</span>
                      </div>
                      <button type="submit" className="btn-primary w-full">
                        <ApperIcon name="Lock" className="w-5 h-5 mr-2" />
                        Place Order
                      </button>
                    </div>
                  </form>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Product Detail Modal */}
        <AnimatePresence>
          {selectedProduct && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50 z-50"
                onClick={() => setSelectedProduct(null)}
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="fixed inset-0 z-50 flex items-center justify-center p-4"
              >
                <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                  <div className="relative">
                    <img
                      src={selectedProduct.images[0]}
                      alt={selectedProduct.name}
                      className="w-full h-80 object-cover"
                    />
                    <button
                      onClick={() => setSelectedProduct(null)}
                      className="absolute top-4 right-4 p-2 bg-white/80 hover:bg-white rounded-xl transition-colors"
                    >
                      <ApperIcon name="X" className="w-6 h-6" />
                    </button>
                  </div>
                  
                  <div className="p-8">
                    <div className="flex justify-between items-start mb-4">
                      <h2 className="text-2xl font-bold text-surface-900">{selectedProduct.name}</h2>
                      <span className="text-3xl font-bold text-primary">${selectedProduct.price}</span>
                    </div>
                    
                    <p className="text-surface-600 mb-6">{selectedProduct.description}</p>
                    
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="p-4 bg-surface-50 rounded-xl">
                        <h4 className="font-medium text-surface-900 mb-1">Size</h4>
                        <p className="text-surface-600">{selectedProduct.size}</p>
                      </div>
                      <div className="p-4 bg-surface-50 rounded-xl">
                        <h4 className="font-medium text-surface-900 mb-1">Brand</h4>
                        <p className="text-surface-600">{selectedProduct.brand}</p>
                      </div>
                      <div className="p-4 bg-surface-50 rounded-xl">
                        <h4 className="font-medium text-surface-900 mb-1">Condition</h4>
                        <p className="text-surface-600">{selectedProduct.condition}</p>
                      </div>
                      <div className="p-4 bg-surface-50 rounded-xl">
                        <h4 className="font-medium text-surface-900 mb-1">Category</h4>
                        <p className="text-surface-600 capitalize">{selectedProduct.category}</p>
                      </div>
                    </div>
                    
                    <div className="flex gap-4">
                      <button
                        onClick={() => {
                          addToCart(selectedProduct)
                          setSelectedProduct(null)
                        }}
                        className="btn-primary flex-1"
                      >
                        <ApperIcon name="ShoppingCart" className="w-5 h-5 mr-2" />
                        Add to Cart
                      </button>
                      <button
                        onClick={() => toggleWishlist(selectedProduct)}
                        className={`p-3 rounded-xl transition-colors ${
                          wishlist.find(item => item.id === selectedProduct.id)
                            ? 'bg-accent text-white'
                            : 'bg-surface-100 text-surface-600 hover:bg-surface-200'
                        }`}
                      >
                        <ApperIcon name="Heart" className="w-6 h-6" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Floating Cart Button */}
        {cart.length > 0 && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="fixed bottom-6 right-6 w-16 h-16 bg-primary text-white rounded-full shadow-lg flex items-center justify-center z-40"
            onClick={() => setShowCart(true)}
          >
            <ApperIcon name="ShoppingCart" className="w-6 h-6" />
            <span className="absolute -top-2 -right-2 w-6 h-6 bg-accent text-white text-xs rounded-full flex items-center justify-center">
              {cart.reduce((total, item) => total + item.quantity, 0)}
            </span>
          </motion.button>



        {/* Search Modal */}
        <AnimatePresence>
          {showSearch && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50 z-50"
                onClick={() => setShowSearch(false)}
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-20"
              >
                <div className="bg-white dark:bg-surface-800 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                  <div className="p-6 border-b border-surface-200 dark:border-surface-700">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-2xl font-semibold text-surface-900 dark:text-surface-100">Search Products</h3>
                      <button
                        onClick={() => setShowSearch(false)}
                        className="p-2 hover:bg-surface-100 dark:hover:bg-surface-700 rounded-xl transition-colors"
                      >
                        <ApperIcon name="X" className="w-6 h-6 text-surface-600 dark:text-surface-400" />
                      </button>
                    </div>
                    
                    {/* Search Input */}
                    <div className="relative mb-4">
                      <ApperIcon name="Search" className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-surface-400" />
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                        placeholder="Search by name, brand, or description..."
                        className="input-field pl-12 text-lg"
                      />
                    </div>
                    
                    {/* Search Filters */}
                    <div className="space-y-4">
                      {/* Category Filter */}
                      <div>
                        <h4 className="text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">Category</h4>
                        <div className="flex flex-wrap gap-2">
                          {categories.map((category) => (
                            <button
                              key={category.id}
                              onClick={() => handleFilterChange('category', category.id)}
                              className={`px-3 py-1 rounded-xl text-sm font-medium transition-all duration-200 flex items-center space-x-1 ${
                                searchFilters.category === category.id
                                  ? 'bg-primary text-white'
                                  : 'bg-surface-100 dark:bg-surface-700 text-surface-700 dark:text-surface-300 hover:bg-surface-200 dark:hover:bg-surface-600'
                              }`}
                            >
                              <ApperIcon name={category.icon} className="w-3 h-3" />
                              <span>{category.name}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                      
                      {/* Price Range */}
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">Min Price</label>
                          <input
                            type="number"
                            value={searchFilters.minPrice}
                            onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                            placeholder="$0"
                            className="input-field"
                            min="0"
                            step="0.01"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">Max Price</label>
                          <input
                            type="number"
                            value={searchFilters.maxPrice}
                            onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                            placeholder="$999"
                            className="input-field"
                            min="0"
                            step="0.01"
                          />
                        </div>
                      </div>
                      
                      {/* Condition Filter */}
                      <div>
                        <h4 className="text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">Condition</h4>
                        <div className="flex flex-wrap gap-2">
                          {['Like New', 'Excellent', 'Good'].map((condition) => (
                            <button
                              key={condition}
                              onClick={() => handleFilterChange('condition', condition)}
                              className={`px-3 py-1 rounded-xl text-sm font-medium transition-colors ${
                                searchFilters.condition.includes(condition)
                                  ? 'bg-primary text-white'
                                  : 'bg-surface-100 dark:bg-surface-700 text-surface-700 dark:text-surface-300 hover:bg-surface-200 dark:hover:bg-surface-600'
                              }`}
                            >
                              {condition}
                            </button>
                          ))}
                        </div>
                      </div>
                      
                      {/* Brand Filter */}
                      <div>
                        <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">Brand</label>
                        <input
                          type="text"
                          value={searchFilters.brand}
                          onChange={(e) => handleFilterChange('brand', e.target.value)}
                          placeholder="Enter brand name..."
                          className="input-field"
                        />
                      </div>
                    </div>
                    
                    {/* Search Actions */}
                    <div className="flex gap-3 mt-6">
                      <button
                        onClick={handleSearch}
                        className="btn-primary flex-1"
                      >
                        <ApperIcon name="Search" className="w-5 h-5 mr-2" />
                        Search Products
                      </button>
                      <button
                        onClick={clearSearch}
                        className="btn-outline"
                      >
                        <ApperIcon name="RotateCcw" className="w-5 h-5 mr-2" />
                        Clear
                      </button>
                    </div>
                  </div>
                  
                  {/* Search Results */}
                  <div className="p-6">
                    {isSearching ? (
                      <div className="text-center py-12">
                        <div className="w-12 h-12 bg-gradient-to-r from-primary to-accent rounded-xl flex items-center justify-center mx-auto mb-4 animate-pulse">
                          <ApperIcon name="Search" className="w-6 h-6 text-white" />
                        </div>
                        <p className="text-surface-600 dark:text-surface-400">Searching products...</p>
                      </div>
                    ) : searchResults.length > 0 ? (
                      <>
                        <div className="flex items-center justify-between mb-6">
                          <h4 className="text-lg font-semibold text-surface-900 dark:text-surface-100">
                            Search Results ({searchResults.length})
                          </h4>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          {searchResults.map((product) => (
                            <motion.div
                              key={product.id}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="card group cursor-pointer hover:shadow-card transition-all duration-300"
                              onClick={() => {
                                setSelectedProduct(product)
                                setShowSearch(false)
                              }}
                            >
                              <div className="relative overflow-hidden">
                                <img
                                  src={product.images[0]}
                                  alt={product.name}
                                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                                />
                                <div className="absolute top-3 left-3">
                                  <span className={`badge text-xs ${
                                    product.condition === 'Like New' ? 'bg-green-100 text-green-800' :
                                    product.condition === 'Excellent' ? 'bg-blue-100 text-blue-800' :
                                    'bg-yellow-100 text-yellow-800'
                                  }`}>
                                    {product.condition}
                                  </span>
                                </div>
                                <div className="absolute top-3 right-3">
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation()
                                      toggleWishlist(product)
                                    }}
                                    className={`p-2 rounded-full transition-colors ${
                                      wishlist.find(item => item.id === product.id)
                                        ? 'bg-accent text-white'
                                        : 'bg-white/80 text-surface-600 hover:bg-white'
                                    }`}
                                  >
                                    <ApperIcon name="Heart" className="w-4 h-4" />
                                  </button>
                                </div>
                              </div>
                              
                              <div className="p-4">
                                <div className="flex justify-between items-start mb-2">
                                  <h3 className="font-semibold text-surface-900 dark:text-surface-100 group-hover:text-primary transition-colors text-sm">
                                    {product.name}
                                  </h3>
                                  <span className="text-lg font-bold text-primary">${product.price}</span>
                                </div>
                                
                                <p className="text-surface-600 dark:text-surface-400 text-xs mb-3 line-clamp-2">
                                  {product.description}
                                </p>
                                
                                <div className="flex items-center justify-between mb-3">
                                  <div className="flex items-center space-x-3 text-xs text-surface-500 dark:text-surface-400">
                                    <span>Size: {product.size}</span>
                                    <span>Brand: {product.brand}</span>
                                  </div>
                                </div>
                                
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    addToCart(product)
                                  }}
                                  className="btn-primary w-full text-sm py-2"
                                >
                                  <ApperIcon name="ShoppingCart" className="w-4 h-4 mr-1" />
                                  Add to Cart
                                </button>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </>
                    ) : searchQuery || searchFilters.category !== 'all' || searchFilters.minPrice || searchFilters.maxPrice || searchFilters.condition.length > 0 || searchFilters.brand ? (
                      <div className="text-center py-12">
                        <ApperIcon name="SearchX" className="w-16 h-16 text-surface-300 dark:text-surface-600 mx-auto mb-4" />
                        <h4 className="text-lg font-semibold text-surface-900 dark:text-surface-100 mb-2">No results found</h4>
                        <p className="text-surface-600 dark:text-surface-400 mb-4">Try adjusting your search criteria or clearing filters</p>
                        <button
                          onClick={clearSearch}
                          className="btn-outline"
                        >
                          <ApperIcon name="RotateCcw" className="w-4 h-4 mr-2" />
                          Clear Search
                        </button>
                      </div>
                    ) : (
                      <div className="text-center py-12">
                        <ApperIcon name="Search" className="w-16 h-16 text-surface-300 dark:text-surface-600 mx-auto mb-4" />
                        <h4 className="text-lg font-semibold text-surface-900 dark:text-surface-100 mb-2">Start your search</h4>
                        <p className="text-surface-600 dark:text-surface-400">Enter keywords or apply filters to find products</p>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

      </div>
    </section>
  )
}

export default MainFeature