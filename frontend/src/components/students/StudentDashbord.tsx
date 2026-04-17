"use client";

import {
  FaBell,
  FaSearch,
  FaBars,
  FaTimes,
  FaTachometerAlt,
  FaBook,
  FaTasks,
  FaClipboardList,
  FaMoneyBill,
  FaBullhorn,
  FaCog,
} from "react-icons/fa";

import { NavLink, Outlet, To } from "react-router-dom";
import { useState, useEffect, ReactNode } from "react";
import { useAppContext } from "../../contexts/AppContext";
import { fetchCurrentUser } from "../../api-client";
import LogOutButton from "../LogOutButton";
import AboutImg from "../../assets/images/about_1_.jpg";
import { todaysDate, greeting } from "../../utils/date";
import React from "react";
import { UserType } from "../../../../backend/src/shared/types";

export default function StudentDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [click, setClick] = useState(false);
  const [user, setUser] = useState<UserType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { isLoggedIn } = useAppContext();
  const [userSearch, setUserSearch] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await fetchCurrentUser();
        setUser(userData);
      } catch {
        setError("Failed to fetch user data.");
      } finally {
        setLoading(false);
      }
    };

    if (isLoggedIn) fetchUserData();
    else setLoading(false);
  }, [isLoggedIn]);

  if (loading) {
    return (
      <div className='flex items-center justify-center h-screen'>
        <span className='animate-spin h-10 w-10 mr-3 text-green-500'></span>
        <span>Loading...</span>
      </div>
    );
  }

  if (error) return <div className='p-4 text-red-500'>{error}</div>;

  interface NavItemProps {
    to: To;
    children: ReactNode;
    icon: ReactNode;
    onClick?: () => void;
  }

  const NavItem: React.FC<NavItemProps> = ({ to, children, icon, onClick }) => (
    <NavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) =>
        `group relative flex items-center gap-3 px-3 py-2 transition-all duration-300 ${
          isActive
            ? "bg-green-700 text-white"
            : "text-white hover:bg-green-200 hover:text-green-900"
        }`
      }
    >
      {/* Icon */}
      <span className='text-lg'>{icon}</span>

      {/* Label */}
      {!collapsed && <span>{children}</span>}

      {/* Tooltip (only when collapsed) */}
      {collapsed && (
        <span className='absolute left-16 whitespace-nowrap bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition'>
          {children}
        </span>
      )}
    </NavLink>
  );

  return (
    <div className='flex h-screen bg-gray-100'>
      {/* SIDEBAR */}
      <aside
        className={`${
          collapsed ? "w-20" : "w-64"
        } bg-gray-900 text-white transition-all duration-300 fixed lg:static inset-y-0 left-0 z-40 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        {/* Header */}
        <div className='p-4 flex items-center justify-between'>
          {!collapsed && (
            <h1 className='font-bold text-green-500 text-sm'>
              WealthyHomeAcademy
            </h1>
          )}

          <div className='flex gap-2'>
            {/* Collapse Toggle */}
            <button
              title='button'
              type='button'
              onClick={() => setCollapsed(!collapsed)}
            >
              <FaBars />
            </button>

            {/* Close (mobile) */}
            <button
              title='button'
              type='button'
              className='lg:hidden'
              onClick={() => setSidebarOpen(false)}
            >
              <FaTimes />
            </button>
          </div>
        </div>

        {/* NAV */}
        <nav className='mt-6 space-y-2'>
          <NavItem
            to='/student-dashboard/dashboard-index'
            icon={<FaTachometerAlt />}
          >
            Dashboard
          </NavItem>

          {!collapsed && (
            <p className='px-4 text-xs text-gray-400 mt-4'>ACADEMIC</p>
          )}

          <NavItem to='/student-dashboard/enrolled-subjects' icon={<FaBook />}>
            Subjects
          </NavItem>

          <NavItem to='/student-dashboard/assignments' icon={<FaTasks />}>
            Assignments
          </NavItem>

          <NavItem
            to='/student-dashboard/exam-board'
            icon={<FaClipboardList />}
          >
            Exams
          </NavItem>

          {!collapsed && (
            <p className='px-4 text-xs text-gray-400 mt-4'>ADMIN</p>
          )}

          <NavItem to='/student-dashboard/school-fees' icon={<FaMoneyBill />}>
            Fees
          </NavItem>

          <NavItem to='/student-dashboard/announcements' icon={<FaBullhorn />}>
            Announcements
          </NavItem>

          {!collapsed && (
            <p className='px-4 text-xs text-gray-400 mt-4'>SETTINGS</p>
          )}

          <NavItem to='/student-dashboard/settings' icon={<FaCog />}>
            Settings
          </NavItem>
        </nav>

        <div className='p-4 flex '>
          {/* <FaSignOutAlt size={16} /> */}
          <LogOutButton color='text-green-500' fontBold='font-bold' />
        </div>
      </aside>

      {/* MAIN */}
      <main className='flex-1 overflow-y-auto'>
        {/* HEADER */}
        <header className='bg-white shadow-sm px-4 py-3 flex justify-between items-center'>
          <div className='flex items-center gap-3'>
            <button
              title='button'
              type='button'
              className='lg:hidden'
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <FaBars />
            </button>

            <div className='relative'>
              <input
                type='search'
                placeholder='Search'
                className='pl-10 pr-4 py-2 border rounded-full'
                value={userSearch}
                onChange={(e) => setUserSearch(e.target.value)}
              />
              <FaSearch className='absolute left-3 top-3 text-gray-400' />
            </div>
          </div>

          <div className='flex items-center gap-4'>
            <FaBell />

            {/* Avatar */}
            <div className='relative'>
              <img
                src={user?.avatar || AboutImg}
                className='h-9 w-9 rounded-full cursor-pointer'
                onClick={() => setClick(!click)}
                alt=''
              />

              {click && (
                <div className='absolute right-0 mt-2 w-48 bg-white shadow rounded'>
                  <div className='p-3 text-sm'>
                    {user?.childFirstName} {user?.childSurname}
                  </div>

                  <NavLink
                    to='/student-dashboard/dashboard-index'
                    className='block px-4 py-2 hover:bg-gray-100'
                  >
                    Profile
                  </NavLink>

                  <NavLink
                    to='/student-dashboard/forgot-password'
                    className='block px-4 py-2 hover:bg-gray-100'
                  >
                    Change Password
                  </NavLink>

                  <div className='px-4 py-2'>
                    {/* <FaSignOutAlt size={16} /> */}
                    <LogOutButton color='text-gray-700' />
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* CONTENT */}
        <div className='p-4'>
          {user && (
            <div className='flex justify-between mb-4'>
              <h2 className='text-xl font-bold'>
                👋 {greeting}{" "}
                <span className='text-green-600'>
                  {user.childFirstName} {user.childSurname}
                </span>
              </h2>

              <span>{todaysDate}</span>
            </div>
          )}

          <Outlet />
        </div>
      </main>
    </div>
  );
}
