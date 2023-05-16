import React from 'react';
import '../App.css';
import { BsChevronDown } from 'react-icons/bs';
import { AiOutlineSearch } from 'react-icons/ai';

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="lh">
        <h1>EDYODA</h1>
        <div>
          <p>Courses</p>
          <BsChevronDown style={{ fontSize: '15px' }} />
        </div>
        <div>
          <p>Programs</p>
          <BsChevronDown style={{ fontSize: '15px' }} />
        </div>
      </div>
      <div className="rh">
        <AiOutlineSearch style={{ fontSize: '20px' }} />
        <div>Log in</div>
        <button>JOIN NOW</button>
      </div>
    </div>
  );
};

export default Navbar;
