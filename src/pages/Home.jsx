import { motion } from 'framer-motion'
import MainFeature from '../components/MainFeature'
import ApperIcon from '../components/ApperIcon'
import { useDarkMode } from '../App'


const Home = () => {
  const { darkMode, toggleDarkMode } = useDarkMode()

  return (
    <div className="min-h-screen transition-colors duration-300">

      {/* Navigation Header */}
      <nav className="bg-white/80 dark:bg-surface-900/80 backdrop-blur-md border-b border-surface-200 dark:border-surface-700 sticky top-0 z-50">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <motion.div 
              className="flex items-center space-x-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="w-10 h-10 bg-gradient-to-r from-primary to-accent rounded-xl flex items-center justify-center">
                <ApperIcon name="Shirt" className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-gradient">ThriftVibe</span>
            </motion.div>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#shop" className="text-surface-700 dark:text-surface-300 hover:text-primary dark:hover:text-primary-light transition-colors">Shop</a>
              <a href="#categories" className="text-surface-700 dark:text-surface-300 hover:text-primary dark:hover:text-primary-light transition-colors">Categories</a>
              <a href="#about" className="text-surface-700 dark:text-surface-300 hover:text-primary dark:hover:text-primary-light transition-colors">About</a>
              <a href="#contact" className="text-surface-700 dark:text-surface-300 hover:text-primary dark:hover:text-primary-light transition-colors">Contact</a>

            </div>

            {/* Right Side Icons */}
            <div className="flex items-center space-x-4">
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-xl bg-surface-100 dark:bg-surface-800 hover:bg-surface-200 dark:hover:bg-surface-700 transition-colors"
                aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                <ApperIcon name={darkMode ? 'Sun' : 'Moon'} className="w-5 h-5 text-surface-700 dark:text-surface-300" />
              </button>

              <button className="p-2 rounded-xl bg-surface-100 dark:bg-surface-800 hover:bg-surface-200 dark:hover:bg-surface-700 transition-colors relative">
                <ApperIcon name="Search" className="w-5 h-5 text-surface-700 dark:text-surface-300" />
              </button>
              <button className="p-2 rounded-xl bg-surface-100 dark:bg-surface-800 hover:bg-surface-200 dark:hover:bg-surface-700 transition-colors relative">
                <ApperIcon name="Heart" className="w-5 h-5 text-surface-700 dark:text-surface-300" />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-accent text-white text-xs rounded-full flex items-center justify-center">
                  0
                </span>
              </button>
              <button className="p-2 rounded-xl bg-surface-100 dark:bg-surface-800 hover:bg-surface-200 dark:hover:bg-surface-700 transition-colors relative">
                <ApperIcon name="ShoppingBag" className="w-5 h-5 text-surface-700 dark:text-surface-300" />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-accent text-white text-xs rounded-full flex items-center justify-center">
                  0
                </span>
              </button>

            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <motion.h1 
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-surface-900 dark:text-surface-100 mb-6"

              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Sustainable Fashion
              <span className="block text-gradient">Starts Here</span>
            </motion.h1>
            <motion.p 
              className="text-lg sm:text-xl text-surface-600 dark:text-surface-400 max-w-3xl mx-auto mb-8"

              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Discover unique vintage pieces, designer finds, and sustainable fashion choices 
              at ThriftVibe - where every piece tells a story.
            </motion.p>
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <button className="btn-primary w-full sm:w-auto">
                <ApperIcon name="Search" className="w-5 h-5 mr-2" />
                Browse Collection
              </button>
              <button className="btn-outline w-full sm:w-auto">
                <ApperIcon name="Play" className="w-5 h-5 mr-2" />
                Watch Story
              </button>
            </motion.div>
          </div>

          {/* Stats */}
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            {[
              { number: '10K+', label: 'Unique Items', icon: 'Shirt' },
              { number: '5K+', label: 'Happy Customers', icon: 'Users' },
              { number: '50+', label: 'Partner Stores', icon: 'Store' },
              { number: '99%', label: 'Satisfaction', icon: 'Heart' }
            ].map((stat, index) => (
              <div key={index} className="text-center p-6 card dark:bg-surface-800 dark:border-surface-700 hover:shadow-card transition-shadow">

                <div className="w-12 h-12 bg-gradient-to-r from-primary to-accent rounded-xl flex items-center justify-center mx-auto mb-4">
                  <ApperIcon name={stat.icon} className="w-6 h-6 text-white" />
                </div>
                <div className="text-2xl font-bold text-surface-900 dark:text-surface-100 mb-1">{stat.number}</div>
                <div className="text-surface-600 dark:text-surface-400 text-sm">{stat.label}</div>

              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Main Feature - Shopping Platform */}
      <MainFeature />

      {/* Categories Section */}
      <section id="categories" className="py-16 bg-surface-50 dark:bg-surface-900">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-surface-900 dark:text-surface-100 mb-4">
              Shop by Category

            </h2>
            <p className="text-lg text-surface-600 dark:text-surface-400 max-w-2xl mx-auto">

              From vintage denim to designer accessories, find your perfect style match
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { name: 'Dresses', icon: 'User', count: '1.2K+' },
              { name: 'Tops', icon: 'Shirt', count: '2.5K+' },
              { name: 'Bottoms', icon: 'User', count: '1.8K+' },
              { name: 'Outerwear', icon: 'Shirt', count: '950+' },
              { name: 'Accessories', icon: 'Crown', count: '3.1K+' },
              { name: 'Shoes', icon: 'User', count: '1.5K+' }
            ].map((category, index) => (
              <motion.div
                key={index}
                className="card dark:bg-surface-800 dark:border-surface-700 p-6 text-center cursor-pointer hover:shadow-card transition-all duration-300 hover:-translate-y-1"

                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="w-16 h-16 bg-gradient-to-r from-primary to-secondary rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <ApperIcon name={category.icon} className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-semibold text-surface-900 dark:text-surface-100 mb-1">{category.name}</h3>
                <p className="text-sm text-surface-600 dark:text-surface-400">{category.count}</p>

              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-surface-900 dark:bg-surface-950 text-white py-12">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-primary to-accent rounded-xl flex items-center justify-center">
                  <ApperIcon name="Shirt" className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold">ThriftVibe</span>
              </div>
              <p className="text-surface-400 dark:text-surface-500 mb-4">
                Making sustainable fashion accessible to everyone, one vintage piece at a time.

              </p>
              <div className="flex space-x-4">
                {['Facebook', 'Twitter', 'Instagram', 'Youtube'].map((social) => (
                  <button key={social} className="w-10 h-10 bg-surface-800 dark:bg-surface-700 rounded-xl flex items-center justify-center hover:bg-primary transition-colors">

                    <ApperIcon name={social} className="w-5 h-5" />
                  </button>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Shop</h3>
              <ul className="space-y-2 text-surface-400 dark:text-surface-500">

                <li><a href="#" className="hover:text-white transition-colors">New Arrivals</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Best Sellers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Sale</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Gift Cards</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-surface-400 dark:text-surface-500">

                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Shipping</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Returns</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Size Guide</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Newsletter</h3>
              <p className="text-surface-400 dark:text-surface-500 mb-4">Get updates on new arrivals and exclusive offers</p>

              <div className="flex">
                <input 
                  type="email" 
                  className="flex-1 px-4 py-2 bg-surface-800 dark:bg-surface-700 border border-surface-700 dark:border-surface-600 rounded-l-xl focus:outline-none focus:border-primary text-white placeholder-surface-400"
                  placeholder="Enter your email"
                />

                <button className="px-4 py-2 bg-primary rounded-r-xl hover:bg-primary-dark transition-colors">
                  <ApperIcon name="Send" className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
          
          <div className="border-t border-surface-800 dark:border-surface-700 pt-8 mt-8 text-center text-surface-400 dark:text-surface-500">

            <p>&copy; 2024 ThriftVibe. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Home