import React, { useState } from 'react'
import { Link } from 'react-router-dom';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (email) {
      // Handle newsletter subscription logic here
      setIsSubscribed(true);
      setEmail('');
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  return (
    <footer className='relative bg-gradient-to-br from-pink-50 via-rose-50 to-pink-100 text-gray-800 overflow-hidden'>
      {/* Background Pattern */}
      <div className='absolute inset-0 opacity-15'>
        <div className='absolute inset-0 bg-gradient-to-r from-pink-200/30 to-transparent'></div>
        <div className='absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(236,72,153,0.1),transparent_70%)]'></div>
      </div>

      <div className='relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16'>
        {/* Main Footer Content */}
        <div className='grid grid-cols-1 lg:grid-cols-4 gap-12 mb-12'>
          
          {/* Brand Section */}
          <div className='lg:col-span-2 space-y-6'>
            <div>
              <h2 className='text-3xl lg:text-4xl font-bold mb-4 text-gray-900'>
                Flavor<span className='text-hotPink'>Hub</span>
              </h2>
              <p className='text-gray-800 text-lg leading-relaxed max-w-md'>
                Discover and share culinary masterpieces with FlavorHub, your ultimate kitchen companion. 
                Connect with passionate food lovers and make every meal memorable.
              </p>
            </div>
            
            {/* Social Media Icons */}
            <div className='flex space-x-6'>
              <a href="#" className='group'>
                <div className='w-10 h-10 bg-hotPink rounded-full flex items-center justify-center hover:opacity-90 transition-opacity duration-300 shadow-sm'>
                  <svg className='w-5 h-5 text-white' fill='currentColor' viewBox='0 0 24 24'>
                    <path d='M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z'/>
                  </svg>
                </div>
              </a>
              <a href="#" className='group'>
                <div className='w-10 h-10 bg-hotPink rounded-full flex items-center justify-center hover:opacity-90 transition-opacity duration-300 shadow-sm'>
                  <svg className='w-5 h-5 text-white' fill='currentColor' viewBox='0 0 24 24'>
                    <path d='M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z'/>
                  </svg>
                </div>
              </a>
              <a href="#" className='group'>
                <div className='w-10 h-10 bg-hotPink rounded-full flex items-center justify-center hover:opacity-90 transition-opacity duration-300 shadow-sm'>
                  <svg className='w-5 h-5 text-white' fill='currentColor' viewBox='0 0 24 24'>
                    <path d='M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.739.099.120.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.748-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001.012.001z'/>
                  </svg>
                </div>
              </a>
              <a href="#" className='group'>
                <div className='w-10 h-10 bg-hotPink rounded-full flex items-center justify-center hover:opacity-90 transition-opacity duration-300 shadow-sm'>
                  <svg className='w-5 h-5 text-white' fill='currentColor' viewBox='0 0 24 24'>
                    <path d='M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z'/>
                  </svg>
                </div>
              </a>
            </div>
          </div>

          {/* Navigation Links */}
          <div className='space-y-6'>
            <h3 className='text-xl font-semibold text-gray-900 mb-4'>Quick Links</h3>
            <nav className='space-y-3'>
              <Link to="/" className='block text-gray-800 hover:text-hotPink transition-colors duration-300'>Home</Link>
              <Link to="/recipes" className='block text-gray-800 hover:text-hotPink transition-colors duration-300'>Recipes</Link>
              <Link to="/blog" className='block text-gray-800 hover:text-hotPink transition-colors duration-300'>Blog</Link>
              <Link to="/share-recipe" className='block text-gray-800 hover:text-hotPink transition-colors duration-300'>Share Recipe</Link>
              <Link to="/about" className='block text-gray-800 hover:text-hotPink transition-colors duration-300'>About Us</Link>
              <Link to="/contact" className='block text-gray-800 hover:text-hotPink transition-colors duration-300'>Contact</Link>
            </nav>
          </div>

          {/* Newsletter Section */}
          <div className='space-y-6'>
            <h3 className='text-xl font-semibold text-gray-900 mb-4'>Stay Updated</h3>
            <p className='text-gray-800 text-sm mb-6'>
              Subscribe to our newsletter for the latest recipes, cooking tips, and culinary inspiration.
            </p>
            
            <form onSubmit={handleNewsletterSubmit} className='space-y-4'>
              <div className='relative'>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className='w-full px-4 py-3 bg-white/60 border border-pink-200 rounded-lg text-gray-900 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-hotPink focus:border-transparent transition-all duration-300 shadow-sm'
                  required
                />
              </div>
              
              <button
                type="submit"
                disabled={isSubscribed}
                className={`w-full py-3 px-6 rounded-lg font-medium transition-all duration-300 ${
                  isSubscribed 
                    ? 'bg-green-500 text-white' 
                    : 'bg-gradient-to-r from-hotPink to-pink-500 hover:from-pink-500 hover:to-hotPink text-white hover:shadow-lg transform hover:-translate-y-0.5'
                }`}
              >
                {isSubscribed ? '✓ Subscribed!' : 'Subscribe Now'}
              </button>
            </form>
            
            <div className='space-y-3'>
              <h4 className='text-sm font-medium text-gray-900'>Legal</h4>
              <div className='space-y-2'>
                <Link to="/terms" className='block text-gray-800 hover:text-gray-900 text-sm transition-colors duration-300'>Terms of Service</Link>
                <Link to="/privacy" className='block text-gray-800 hover:text-gray-900 text-sm transition-colors duration-300'>Privacy Policy</Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className='pt-8 border-t border-pink-200/50'>
          <div className='flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0'>
            <p className='text-gray-800 text-sm'>
              © 2025 FlavorHub. All rights reserved.
            </p>
            <p className='text-gray-800 text-sm'>
              Made with ❤️ for food lovers everywhere
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

