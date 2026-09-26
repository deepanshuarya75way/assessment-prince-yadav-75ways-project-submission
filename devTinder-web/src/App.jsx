import { BrowserRouter, Route, Routes } from "react-router-dom"
import Profile from "./components/Profile"
import Base from "./components/Base"
import Login from "./components/Login"
import { Provider } from "react-redux"
import appStore from "./utils/appStore"
import Feed from "./components/Feed"
import Connections from "./components/Connections"
import Requests from "./components/Requests"
import ChangePass from "./components/ChangePass"
import Chat from "./components/Chat"


function App() {

  return (
    <>
    <Provider store={appStore}>
    <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Base />}>
            <Route path="/" element={<Feed />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/login" element={<Login />} />
            <Route path="/connections" element={<Connections/>} />
            <Route path="/requests" element={<Requests/>} />
            <Route path="/changepassword" element={<ChangePass/>}/>
            <Route path="/chat/:targetUserId" element={<Chat/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
    </>
  )
}

export default App
