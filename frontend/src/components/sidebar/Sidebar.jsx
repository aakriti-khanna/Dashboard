import "./sidebar.scss";
import { MdDashboard } from "react-icons/md";
import { Link } from "react-router-dom";



const Sidebar = () => {
 
  return (
    <div className="sidebar">
      <div className="top">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">INSIGHTS</span>
        </Link>
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title">MAIN</p>
          <li>
            <MdDashboard  className="icon" />
            <span>Dashboard</span>
          </li>
         
        </ul>
      </div>
      
    </div>
  );
};

export default Sidebar;