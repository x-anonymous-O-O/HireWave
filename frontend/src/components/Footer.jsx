const Footer = () => {
    return (
      <footer className="bg-gray-900 text-white py-10 mt-12">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Logo & About */}
          <div>
            <h2 className="text-xl font-bold mb-3">HireWave</h2>
            <p className="text-gray-400 text-sm">
              Helping students find part-time jobs, internships, and freelance opportunities with ease.
            </p>
          </div>
  
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li><a href="/" className="hover:text-white">Home</a></li>
              <li><a href="/jobs" className="hover:text-white">Browse Jobs</a></li>
              <li><a href="/about" className="hover:text-white">About Us</a></li>
              <li><a href="/contact" className="hover:text-white">Contact</a></li>
            </ul>
          </div>
  
          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Contact Us</h3>
            <p className="text-gray-400 text-sm">Email: support@HireWave.com</p>
            <p className="text-gray-400 text-sm">Phone: +91 98765 43210</p>
            <p className="text-gray-400 text-sm">Location: West Bengal, India</p>
          </div>
        </div>
  
        {/* Bottom Bar */}
        <div className="mt-10 border-t border-gray-700 pt-6 text-center text-gray-500 text-xs">
          © {new Date().getFullYear()} HireWave. All rights reserved.
        </div>
      </footer>
    );
  };
  
  export default Footer;
  