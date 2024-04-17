import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MdSpaceDashboard } from "react-icons/md";
import { IoPersonOutline } from "react-icons/io5";
import { FaBed, FaNotesMedical, FaDoorOpen, FaCalendarAlt, FaRegUserCircle, FaRegNewspaper } from "react-icons/fa";
import { IoIosNotifications } from "react-icons/io";
import { HiOutlineShoppingBag } from 'react-icons/hi';
import { FiSettings } from 'react-icons/fi';

const Sidebar = ({ children }) => {
  
  return (
    <div className='flex'>
      <div className='fixed w-20 h-screen p-4 bg-white border-r-[1px] flex flex-col justify-between'>
        <div className='flex flex-col items-center'>
          <Link href='/'>
            <div className='bg-purple-800 text-white p-3 rounded-lg inline-block'>
              <IoPersonOutline size={20} />
               
            </div>
            
          </Link>
          <span className='border-b-[1px] border-gray-200 w-full p-2'></span>
          <Link href='/'>
            <div className='bg-gray-100 hover:bg-gray-200 cursor-pointer my-4 p-3 rounded-lg inline-block'>
              <MdSpaceDashboard size={20} />
            </div>
            
          </Link>
          
          <Link href='/appointment'>
            <div className='bg-gray-100 hover:bg-gray-200 cursor-pointer my-4 p-3 rounded-lg inline-block'>
              <FaNotesMedical size={20} />
            </div>
          </Link>
          <Link href='/calendar'>
            <div className='bg-gray-100 hover:bg-gray-200 cursor-pointer my-4 p-3 rounded-lg inline-block'>
              <FaCalendarAlt size={20} />
            </div>
          </Link>
          <Link href='/customers'>
            <div className='bg-gray-100 hover:bg-gray-200 cursor-pointer my-4 p-3 rounded-lg inline-block'>
              <FaRegUserCircle size={20} />
            </div>
          </Link>
          <Link href='/news'>
            <div className='bg-gray-100 hover:bg-gray-200 cursor-pointer my-4 p-3 rounded-lg inline-block'>
              <FaRegNewspaper size={20} />
            </div>
          </Link>
          <Link href='/notification'>
            <div className='bg-gray-100 hover:bg-gray-200 cursor-pointer my-4 p-3 rounded-lg inline-block'>
              <IoIosNotifications size={20} />
            </div>
          </Link>
        
        </div>
      </div>
      <main className='ml-20 w-full'>{children}</main>
    </div>
  );
};

export default Sidebar;
