import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import ApperIcon from '../components/ApperIcon'

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-surface-50 via-purple-50 to-orange-50 flex items-center justify-center px-4">
      <motion.div 
        className="text-center max-w-md mx-auto"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="w-24 h-24 bg-gradient-to-r from-primary to-accent rounded-3xl flex items-center justify-center mx-auto mb-8">
          <ApperIcon name="Search" className="w-12 h-12 text-white" />
        </div>
        
        <h1 className="text-6xl font-bold text-surface-900 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-surface-800 mb-4">Page Not Found</h2>
        <p className="text-surface-600 mb-8">
          Oops! The page you're looking for seems to have wandered off like a vintage piece in a thrift store.
        </p>
        
        <div className="space-y-4">
          <Link 
            to="/" 
            className="btn-primary inline-flex items-center"
          >
            <ApperIcon name="Home" className="w-5 h-5 mr-2" />
            Back to Home
          </Link>
          
          <div className="text-surface-500 text-sm">
            or browse our collection to find something unique
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default NotFound