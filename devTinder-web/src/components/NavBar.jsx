import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { BASE_URL } from "../utils/constants"
import axios from "axios"
import { removeUser } from "../utils/userSlice"
import { removeFeed } from "../utils/feedSlice"
import { removeConnections } from "../utils/connectionSlice"
import { removeAllRequests } from "../utils/requestSlice"

const NavBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = async () => {
    try {
      await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });
      dispatch(removeUser());
      dispatch(removeFeed());
      dispatch(removeConnections());
      dispatch(removeAllRequests());
      navigate('/login');
    }
    catch (err) {
      console.error(err);
    }
  }
  const user = useSelector((store) => store.user)
  return (
    <div>
      <div className="navbar bg-base-300 shadow-sm fixed top-0 z-100">
        <div className="flex-1">
          <Link to="/" className="btn btn-ghost text-xl">devTinder</Link>
        </div>
        <div className="flex gap-2">

          {user && <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar mx-5">
              <div className="w-10 rounded-full">
                <img
                  alt="user photo"
                  src={user.photoUrl} />
              </div>
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
              <li>
                <Link to="/profile" className="justify-between">
                  Profile
                </Link>
              </li>
              <li><Link to="/connections">Connections</Link></li>
              <li><Link to="/requests">Requests</Link></li>
              <li><a onClick={handleLogout}>Logout</a></li>
              <li><Link to="/changepassword">Change password</Link></li>
            </ul>
          </div>}
        </div>
      </div>
    </div>
  )
}

export default NavBar
