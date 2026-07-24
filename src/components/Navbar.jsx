import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { navLinks } from "../data/navigation";
import { useAuth } from "../contexts/AuthContext";
import { useCart } from "../contexts/CartContext";
import { Search, ShoppingBag, User, X, Menu } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { user, logout } = useAuth();
  const { cartCount } = useCart();
  const navigate = useNavigate();

  const handleSearch = (e) => {
    if (e.key === "Enter" && searchQuery.trim()) {
      setIsSearchOpen(false);
      navigate(`/shop?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
    }
  };

  const handleAuthClick = () => {
    if (user) {
      logout();
    } else {
      navigate("/login");
    }
  };

  useEffect(() => {
    if (isOpen || isSearchOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [isOpen, isSearchOpen]);

  return (
    <>
      <nav id="main-nav" className="flex justify-between items-center py-2.5 border-b border-[#1e5e3a]/10 mb-3 animate-fade-in relative z-100 bg-white/40 backdrop-blur-md px-4 rounded-3xl mt-2 border border-white/20">
        <Link to="/" className="flex items-center gap-2 group relative z-110">
          <img 
            src="https://svarp.org/company/svarp-logo.webp" 
            alt="SVARP Logo" 
            className="h-8 md:h-9 w-auto object-contain group-hover:scale-105 transition-transform duration-300"
          />
          <div className="flex flex-col">
            <span className="font-serif text-[1.2rem] md:text-[1.4rem] tracking-wider font-bold leading-none text-[#1e5e3a]">
              SVARP
            </span>
            <span className="text-[7px] md:text-[8px] uppercase tracking-[0.2em] font-sans text-primary/60 font-semibold">
              Body Wellness
            </span>
          </div>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden lg:flex gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className="text-sm font-medium text-primary hover:text-accent relative hover:after:w-full after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-px after:bg-accent after:transition-custom group"
            >
              {link.name}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4 md:gap-6">
          <div className="hidden md:flex gap-6 items-center">
            <button
              id="search-btn"
              onClick={() => setIsSearchOpen(true)}
              className="text-primary flex items-center justify-center hover:-translate-y-0.5 hover:text-accent transition-custom"
              aria-label="Search"
            >
              <Search size={20} />
            </button>
            <button
              id="cart-btn"
              onClick={() => navigate("/cart")}
              className="text-primary flex items-center justify-center hover:-translate-y-0.5 hover:text-accent transition-custom relative"
              aria-label="Cart"
            >
              <ShoppingBag size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-accent text-white text-[9px] font-bold rounded-full w-4.5 h-4.5 flex items-center justify-center shadow-sm">
                  {cartCount}
                </span>
              )}
            </button>

            <div className="relative group flex items-center">
              {user ? (
                <div className="flex flex-col items-center cursor-pointer relative">
                  <Link
                    to="/profile"
                    className="text-xs uppercase tracking-wider text-accent font-semibold mb-0.5 hover:text-accent/80 transition-colors"
                  >
                    {(user.full_name || user.email || "U").split(" ")[0]}
                  </Link>
                  <button
                    onClick={handleAuthClick}
                    className="text-[9px] uppercase text-primary/60 hover:text-red-500 absolute -bottom-4 bg-transparent whitespace-nowrap"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <button
                  id="login-btn"
                  onClick={handleAuthClick}
                  className="text-primary flex items-center justify-center hover:-translate-y-0.5 hover:text-accent transition-custom"
                  title="Login"
                >
                  <User size={20} />
                </button>
              )}
            </div>
          </div>

          {/* Hamburger */}
          <button
            className="lg:hidden text-primary relative z-110 p-1"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Menu"
          >
            {isOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </nav>

      {/* Search Overlay */}
      {isSearchOpen && (
        <div className="fixed inset-0 bg-[#faf9f5]/98 backdrop-blur-md z-[200] animate-fade-in flex items-center justify-center px-6">
          <button
            onClick={() => setIsSearchOpen(false)}
            className="absolute top-10 right-10 text-primary/60 hover:text-accent transition-colors scale-150"
          >
            <X size={24} />
          </button>
          <div className="w-full max-w-2xl flex flex-col items-center">
            <h2 className="font-serif text-3xl mb-12 tracking-wide text-primary">Discover our organic collection</h2>
            <div className="w-full relative group">
              <input
                autoFocus
                type="text"
                placeholder="Search oils, spices, seeds, setups..."
                className="w-full bg-transparent border-b-2 border-[#1e5e3a]/15 py-4 text-2xl outline-none focus:border-accent transition-all pl-2 text-primary"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleSearch}
              />
              <div className="absolute right-0 top-1/2 -translate-y-1/2 opacity-25">
                <Search size={24} />
              </div>
            </div>
            <p className="mt-6 text-[10px] uppercase tracking-[0.3em] text-primary/40">
              Press Enter to Search
            </p>
          </div>
        </div>
      )}

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 bg-[#faf9f5] z-90 transition-transform duration-500 lg:hidden flex flex-col items-center justify-center pt-12 gap-8 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {navLinks.map((link) => (
          <Link
            key={link.name}
            to={link.path}
            onClick={() => setIsOpen(false)}
            className="text-[1.6rem] font-serif font-bold text-primary hover:text-accent transition-colors"
          >
            {link.name}
          </Link>
        ))}
        <div className="flex gap-8 mt-4">
          <button onClick={() => { setIsOpen(false); setIsSearchOpen(true); }} className="text-primary scale-125">
            <Search size={24} />
          </button>
          <button
            onClick={() => { setIsOpen(false); navigate("/cart"); }}
            className="text-primary scale-125 relative"
          >
            <ShoppingBag size={24} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-accent text-white text-[8px] font-bold rounded-full w-3.5 h-3.5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
          <button
            onClick={() => { setIsOpen(false); user ? navigate("/profile") : navigate("/login"); }}
            className={`scale-125 ${user ? "text-accent" : "text-primary"}`}
          >
            <User size={24} />
          </button>
        </div>
      </div>
    </>
  );
};

export default Navbar;
