import { Link, useLocation } from "react-router-dom";
import { IoHomeOutline } from "react-icons/io5";

export default function Breadcrumb() {
  const location = useLocation();
  let currentLink = "";

  const crumbs = location.pathname
    .split("/")
    .filter((crumb) => crumb !== "")
    .map((crumb) => {
      currentLink += `/${crumb}`;

      return (
        <li key={crumb} className="breadcrumb-item">
          <Link to={currentLink}>/ {crumb}</Link>
        </li>
      );
    });
  return (
        <nav>
          <ul className="breadcrumb">
            {crumbs}
          </ul>
        </nav>
  );
}

