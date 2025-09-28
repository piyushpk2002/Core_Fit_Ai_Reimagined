import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"
import { logoutUser } from "../store/features/authSlice";

function Header() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isAuthenticated } = useSelector(state => state.auth)

    const handleLogout = (e )=> {
      e.preventDefault();

      dispatch(logoutUser()).then((res) => {
        alert(res?.payload?.message);
        navigate("/");
      })
    }

  const navItems = [
    {
      name: "UserDetails",
      active: true,
      slug: "/userdetails",
    },

    {
      name: "Image Recomendation",
      active: true,
      slug: "/imageRecomendation",
    },

    {
      name: "Todos",
      active: true,
      slug: "/todo",
    },

    {
      name: "Medical Image Analysis",
      active: true,
      slug: "/medicalAnalysis",
    }
  ];

  return (
    <div className="w-full h-16 bg-blue-950 shadow-md flex justify-between items-center px-10">

      {/* Logo */}
      <Link to="/">
        <img src="vite.svg" alt="" className="w-10" />
      </Link>

      {/* Navigation Items */}
      <ul className="flex w-auto gap-8 justify-center h-auto items-center">
        {navItems.map((items) => {
          if (items.active) {
            return (
              <li key={items.name} className="text-lg font-sans ">
                <NavLink
                  to={items.slug}
                  className={({isActive}) => `p-2 font-extralight hover:ring-2 ring-blue-500 rounded duration-200 ${isActive ? "ring-2" : ""}`}
                >
                  {items.name}
                </NavLink>
              </li>
            );
          }
        })}
        <button className={`px-3 py-2 rounded font-semibold ${!isAuthenticated ? "bg-pink-800 hover:bg-pink-700" : "bg-lime-400 text-black hover:bg-lime-500"}`} onClick={!isAuthenticated ? () => navigate("/auth/login") : handleLogout}>{!isAuthenticated ? "Sign in" : "Sign Out"}</button>
      </ul>

    </div>
  );
}

export default Header;
