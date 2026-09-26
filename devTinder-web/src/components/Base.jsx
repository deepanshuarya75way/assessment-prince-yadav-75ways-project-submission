import { useEffect, useState } from 'react'
import NavBar from './NavBar'
import { Outlet, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addUser } from '../utils/userSlice'
import Loading from './Loading'

const Base = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((store) => store.user);
  const [loading, setLoading] = useState(true);
  const fetchUser = async () => {
    try {
      const res = await axios.get(BASE_URL + "/profile", { withCredentials: true })
      dispatch(addUser(res.data))
    }
    catch (err) {
      if(err.response?.status === 401){
        return navigate("/login");
      }
      console.error(err);
    }
    finally{
      setLoading(false);
    }
  }
  useEffect(() => {
    if(userData) {
      setLoading(false)
      return;
    }

      fetchUser();
    
  }, [])


  return (
    <div>
      {!loading?
      <div>
        <NavBar />
      <Outlet />
      
      </div>: <Loading/>
      }
      
    </div>
  )
}

export default Base
