
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Phone, Mail, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-brand-dark text-white pt-16 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <Link to="/" className="flex items-center space-x-2 mb-6">
              <span className="font-display font-bold text-2xl text-brand-yellow">
               MY Travel<span className="text-white">Go</span>
              </span>
            </Link>
            <p className="text-gray-400 mb-6">
              Your trusted travel companion. We provide the best travel experiences with expert guides and exceptional service.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="bg-white/10 hover:bg-brand-yellow hover:text-black p-2 rounded-full transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="bg-white/10 hover:bg-brand-yellow hover:text-black p-2 rounded-full transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="bg-white/10 hover:bg-brand-yellow hover:text-black p-2 rounded-full transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="bg-white/10 hover:bg-brand-yellow hover:text-black p-2 rounded-full transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/about" className="text-gray-400 hover:text-brand-yellow transition-colors">About Us</Link>
              </li>
              <li>
                <Link to="/tours" className="text-gray-400 hover:text-brand-yellow transition-colors">Tours</Link>
              </li>
              <li>
                <Link to="/hotels" className="text-gray-400 hover:text-brand-yellow transition-colors">Hotels</Link>
              </li>
              <li>
                <Link to="/cars" className="text-gray-400 hover:text-brand-yellow transition-colors">Car Rentals</Link>
              </li>
              <li>
                <Link to="/blog" className="text-gray-400 hover:text-brand-yellow transition-colors">Blog</Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-brand-yellow transition-colors">Contact</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-brand-yellow mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-400">IPT - Kumasi, Ashanti City, Ghana</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-brand-yellow mr-3 flex-shrink-0" />
                <span className="text-gray-400">+233 (552) 945-333</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-brand-yellow mr-3 flex-shrink-0" />
                <span className="text-gray-400">info@mytravelgo.com</span>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-6">Newsletter</h3>
            <p className="text-gray-400 mb-4">
              Subscribe to our newsletter to receive the latest news and special offers.
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Your email address"
                className="bg-white/10 border border-white/20 rounded-l-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-brand-yellow"
              />
              <button
                type="submit"
                className="bg-brand-yellow text-black font-medium px-4 py-2 rounded-r-lg hover:brightness-105 transition-all"
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>
        
        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} My TravelGo. All rights reserved. <br/> Designed by K. Darlington Jnr
          </p>
          <div className="flex space-x-4">
            <Link to="/terms" className="text-gray-400 text-sm hover:text-brand-yellow transition-colors">
              Terms of Service
            </Link>
            <Link to="/privacy" className="text-gray-400 text-sm hover:text-brand-yellow transition-colors">
              Privacy Policy
            </Link>
            <Link to="/faq" className="text-gray-400 text-sm hover:text-brand-yellow transition-colors">
              FAQ
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
