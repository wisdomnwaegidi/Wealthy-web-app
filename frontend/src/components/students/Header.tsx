import { Link, NavLink } from "react-router-dom";
import {
  FaBars,
  FaTimes,
  FaBell,
  FaChevronUp,
  FaChevronDown,
} from "react-icons/fa";
import { useState } from "react";

// Header.tsx
interface HeaderProps {
  childFirstName?: string;
  childSurname?: string;
  childAge?: number;
  homeAddress?: string;
  parentNames?: string;
  stateOfOrigin?: string;
  childClass?: string;
  parentsEmail?: string;
  password?: string;
  image?: string;
}

const Header: React.FC<HeaderProps> = ({
  image,
  childFirstName,
  childSurname,
}) => {
  const [menu, setMenu] = useState<boolean>(false);
  const [arrow, setArrow] = useState<boolean>(false);
  const toggleMenu = (): void => setMenu(!menu);
  const toggleArrow = (): void => setArrow(!arrow);

  return (
    <div>
      <header className="fixed top-0 left-0 right-0 z-100 bg-prcolor px-4 py-4 shadow-md z-[999]">
        <nav className="flex justify-between items-center w-full align-center py-2">
          <span>
            <span>
              <Link to="/" className="text-white text-lg font-medium">
                Wealthy Homes Academy
              </Link>
            </span>
            <span className="mx-4 text-white"> | Student Dashboard</span>
          </span>
          <span className="flex items-center">
            <span className="text-white mr-2">Modules</span>
            <span>
              {arrow ? (
                <>
                  <NavLink to='/modules'>
                    <FaChevronDown
                      onMouseOver={toggleArrow}
                      className="text-white"
                    />
                  </NavLink>
                </>
              ) : (
                <FaChevronUp
                  onMouseLeave={toggleArrow}
                  className="text-white"
                />
              )}
            </span>
          </span>
          <span>
            <ul
              className={`flex items-center gap-3 font-semibold ${
                menu ? "flex" : "hidden md:flex"
              }`}>
              <li className="text-white">
                <FaBell />
              </li>
              <li>
                <button
                  type="button"
                  title="image-button"
                  className="cursor-pointer">
                  <img
                    src={image}
                    alt={`${childFirstName} ${childSurname}`}
                    className="uploaded-image w-10"
                  />
                </button>
              </li>
              <li className="text-white">{`${childFirstName} ${childSurname}`}</li>
            </ul>
          </span>
          <span className="md:hidden">
            {menu ? (
              <FaTimes className="text-black" onClick={toggleMenu} />
            ) : (
              <FaBars className="text-black" onClick={toggleMenu} />
            )}
          </span>
        </nav>
      </header>
    </div>
  );
};

export default Header;
