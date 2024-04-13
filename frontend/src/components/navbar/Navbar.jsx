import "./navbar.scss";


import { FaSearch, FaLanguage,  FaExpand, FaBell, FaComment, FaList } from 'react-icons/fa';

// import { DarkModeContext } from "../../context/darkModeContext";
// import { useContext } from "react";

const Navbar = () => {
  // const { dispatch } = useContext(DarkModeContext);
  return (
    <div className='navbar'>
      <div className="wrapper">
        <div className="search">
          <input type="text" placeholder="Search..." />
          <FaSearch /> 
        </div>
        <div className="items">
          <div className="item">
            <FaLanguage className="icon" />
            English
          </div>
          <div className="item">
            {/* <DarkModeOutlinedIcon
              className="icon"
              onClick={() => dispatch({ type: "TOGGLE" })}
            /> */}
          </div>
          <div className="item">
            < FaExpand className="icon" />
          </div>
          <div className="item">
            < FaBell className="icon" />
            <div className="counter">1</div>
          </div>
          <div className="item">
            <FaComment className="icon" />
            <div className="counter">2</div>
          </div>
          <div className="item">
            <FaList className="icon" />
          </div>
          <div className="item">
            <img
              src="https://images.pexels.com/photos/941693/pexels-photo-941693.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
              alt=""
              className="avatar"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar