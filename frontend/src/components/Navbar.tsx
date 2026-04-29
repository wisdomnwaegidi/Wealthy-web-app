import { useState, useEffect, useRef } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState<boolean | number>(false);
  const [indicatorStyle, setIndicatorStyle] = useState({});
  const navRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  // 🔥 Shrink on scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 🔥 Sliding underline logic
  useEffect(() => {
    const active = navRef.current?.querySelector(".active-link") as HTMLElement;

    if (active && navRef.current) {
      const { offsetLeft, offsetWidth } = active;
      setIndicatorStyle({
        left: offsetLeft,
        width: offsetWidth,
      });
    }
  }, [location]);

  return (
    <header
      className={`w-full fixed top-0 left-0 z-50 transition-all duration-300 bg-white md:bg-transparent ${
  scrolled ? "py-4 backdrop-blur-md shadow-sm" : "py-8"
}`}
    >
      <div className='max-w-7xl mx-auto px-6 flex items-center justify-between'>
        {/* LOGO */}
        <Link
          to='/'
          className='bg-prcolor text-white px-8 py-3 rounded-full font-semibold text-sm'
        >
          WealthyHomeAcademy
        </Link>

        {/* CENTER NAV */}
        <div
          ref={navRef}
          className='relative hidden md:flex items-center bg-gray-100 px-8 py-3 rounded-full shadow-sm gap-10'
        >
          {/* Sliding Indicator */}
          <span
            className='absolute bottom-1 h-[3px] bg-prcolor rounded-full transition-all duration-300'
            style={indicatorStyle}
          />

          {[
            {
              to: "/our-classes",
              label: "Classes",
              // icon: <FaBookOpen className='text-xs' />,
            },
            { to: "/about-us", label: "About Us" },
            { to: "/contact-us", label: "Contact Us" },
            { to: "/blog-&-articles", label: "Blog" },
            { to: "/faq", label: "FAQ" },
          ].map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `relative flex items-center gap-2 px-2 py-1 text-sm font-medium transition ${
                  isActive
                    ? "text-prcolor active-link"
                    : "text-gray-700 hover:text-prcolor"
                }`
              }
            >
              {/* {item.icon} */}
              {item.label}
            </NavLink>
          ))}
        </div>

        {/* RIGHT */}
        <div className='hidden md:flex items-center gap-4'>
          <NavLink
            to='/login'
            className='flex items-center gap-2 bg-purplecolor px-5 py-3 rounded-full text-sm font-medium text-white hover:bg-prcolor transition'
          >
            {/* <FaUser className='text-xs' /> */}
            Log in
          </NavLink>

          <NavLink
            to='/register'
            className='bg-prcolor text-white px-6 py-3 rounded-full text-sm font-medium hover:bg-purplecolor transition'
          >
            Register ward
          </NavLink>
        </div>

        {/* MOBILE BUTTON */}
        <button type="button"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className='md:hidden text-prcolor'
        >
          {isMenuOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
        </button>
      </div>

      {/* 📱 MOBILE MENU */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-500 ${
          isMenuOpen ? "max-h-[500px]" : "max-h-0"
        }`}
      >
        <div className='px-6 py-6 space-y-4 bg-white border-t'>
          {[
            { to: "/our-classes", label: "Classes" },
            { to: "/about-us", label: "About Us" },
            { to: "/contact-us", label: "Contact Us" },
            { to: "/blog-&-articles", label: "Blog" },
            { to: "/faq", label: "FAQ" },
          ].map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={() => setIsMenuOpen(false)}
              className='block text-gray-700 text-sm font-medium hover:text-prcolor transition'
            >
              {item.label}
            </NavLink>
          ))}

          <div className='pt-4 flex flex-col gap-3'>
            <NavLink
              to='/login'
              className='bg-gray-100 px-5 py-3 rounded-full text-sm font-medium text-center'
            >
              Log in
            </NavLink>

            <NavLink
              to='/register'
              className='bg-prcolor text-white px-5 py-3 rounded-full text-sm font-medium text-center'
            >
              Register ward
            </NavLink>
          </div>
        </div>
      </div>
    </header>
  );
}
