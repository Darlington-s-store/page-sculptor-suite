
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Search, ShoppingCart, Globe, ChevronDown, User } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'}`}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <span className="font-display font-bold text-xl md:text-2xl text-brand-yellow">
              Travel<span className={scrolled ? 'text-black' : 'text-white'}>Go</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className={`font-medium transition-colors hover:text-brand-yellow ${scrolled ? 'text-gray-800' : 'text-white'}`}>Home</Link>
            <div className="relative group">
              <button className={`flex items-center font-medium transition-colors group-hover:text-brand-yellow ${scrolled ? 'text-gray-800' : 'text-white'}`}>
                Tours <ChevronDown className="h-4 w-4 ml-1" />
              </button>
              <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <div className="py-1">
                  <Link to="/tours/beaches" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Beach Tours</Link>
                  <Link to="/tours/mountains" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Mountain Tours</Link>
                  <Link to="/tours/city" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">City Tours</Link>
                  <Link to="/tours/adventure" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Adventure Tours</Link>
                </div>
              </div>
            </div>
            <Link to="/hotels" className={`font-medium transition-colors hover:text-brand-yellow ${scrolled ? 'text-gray-800' : 'text-white'}`}>Hotels</Link>
            <Link to="/cars" className={`font-medium transition-colors hover:text-brand-yellow ${scrolled ? 'text-gray-800' : 'text-white'}`}>Cars</Link>
            <Link to="/blog" className={`font-medium transition-colors hover:text-brand-yellow ${scrolled ? 'text-gray-800' : 'text-white'}`}>Blog</Link>
          </nav>

          {/* Right Side Menu - Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            <button className={`p-2 rounded-full hover:bg-white/10 transition-colors ${scrolled ? 'text-gray-800' : 'text-white'}`}>
              <Search className="h-5 w-5" />
            </button>
            <button className={`p-2 rounded-full hover:bg-white/10 transition-colors ${scrolled ? 'text-gray-800' : 'text-white'}`}>
              <ShoppingCart className="h-5 w-5" />
            </button>
            <button className={`p-2 rounded-full hover:bg-white/10 transition-colors ${scrolled ? 'text-gray-800' : 'text-white'}`}>
              <Globe className="h-5 w-5" />
            </button>
            <Link to="/login">
              <Button variant="outline" className={`font-medium border ${scrolled ? 'border-brand-blue text-brand-blue' : 'border-white text-white'}`}>
                <User className="h-4 w-4 mr-2" /> Account
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className={`md:hidden p-2 rounded-full transition-colors ${scrolled ? 'text-gray-800 hover:bg-gray-100' : 'text-white hover:bg-white/10'}`}
            onClick={toggleMenu}
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity z-50 md:hidden ${
          isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={toggleMenu}
      >
        <div
          className={`absolute top-0 right-0 w-72 h-full bg-white shadow-xl transition-transform duration-300 transform ${
            isMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-center p-4 border-b">
            <span className="font-display font-bold text-xl">Travel<span className="text-brand-yellow">Go</span></span>
            <button
              className="p-2 rounded-full hover:bg-gray-100 transition-colors text-gray-800"
              onClick={toggleMenu}
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          <div className="p-4">
            <nav className="flex flex-col space-y-4">
              <Link to="/" className="font-medium py-2 transition-colors hover:text-brand-yellow">Home</Link>
              <div>
                <button className="flex items-center justify-between w-full font-medium py-2 transition-colors hover:text-brand-yellow">
                  Tours <ChevronDown className="h-4 w-4" />
                </button>
                <div className="pl-4 mt-2 border-l-2 border-gray-200 space-y-2">
                  <Link to="/tours/beaches" className="block py-1 text-sm text-gray-700 hover:text-brand-yellow">Beach Tours</Link>
                  <Link to="/tours/mountains" className="block py-1 text-sm text-gray-700 hover:text-brand-yellow">Mountain Tours</Link>
                  <Link to="/tours/city" className="block py-1 text-sm text-gray-700 hover:text-brand-yellow">City Tours</Link>
                  <Link to="/tours/adventure" className="block py-1 text-sm text-gray-700 hover:text-brand-yellow">Adventure Tours</Link>
                </div>
              </div>
              <Link to="/hotels" className="font-medium py-2 transition-colors hover:text-brand-yellow">Hotels</Link>
              <Link to="/cars" className="font-medium py-2 transition-colors hover:text-brand-yellow">Cars</Link>
              <Link to="/blog" className="font-medium py-2 transition-colors hover:text-brand-yellow">Blog</Link>
            </nav>
            <div className="mt-8 space-y-4">
              <div className="flex items-center space-x-4">
                <button className="p-2 rounded-full hover:bg-gray-100 transition-colors text-gray-800">
                  <Search className="h-5 w-5" />
                </button>
                <button className="p-2 rounded-full hover:bg-gray-100 transition-colors text-gray-800">
                  <ShoppingCart className="h-5 w-5" />
                </button>
                <button className="p-2 rounded-full hover:bg-gray-100 transition-colors text-gray-800">
                  <Globe className="h-5 w-5" />
                </button>
              </div>
              <Link to="/login" className="block w-full">
                <Button className="w-full bg-brand-blue text-white">
                  <User className="h-4 w-4 mr-2" /> Account
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
