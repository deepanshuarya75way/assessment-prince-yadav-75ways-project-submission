import { useSelector } from 'react-redux'
import EditProfile from './EditProfile'
import Footer from './Footer'

const Profile = () => {
  const user = useSelector((store) => store.user)
  return (user &&
    <div>
      <EditProfile user={user}/>
      <Footer />
    </div>
  )
}

export default Profile
