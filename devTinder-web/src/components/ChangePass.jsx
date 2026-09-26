import axios from "axios";
import { useState } from "react";
import { BASE_URL } from "../utils/constants";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { removeUser } from "../utils/userSlice";
import Footer from "./Footer";

const ChangePass = () => {
    const[oldPassword, setOldPassword] = useState("");
    const[newPassword, setNewPassword] = useState("");
    const[error, setError] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleChangePass = async ()=>{
        try{
            setError("");
            await axios.patch(BASE_URL+"/profile/password", {oldPassword, newPassword}, {withCredentials: true});
            navigate("/login");
            dispatch(removeUser());
        }
        catch(err){
            setError(err?.response?.data || "Something went wrong");
            
        }
    }
  return (
    <div>
      <div className='h-[80vh] flex items-center justify-center'>
        <fieldset className="fieldset bg-base-300 border-base-300 rounded-box w-xs border p-4">
                <legend className="fieldset-legend">Change Password</legend>


                <label className="label">Old Password</label>
                <input type="password" value={oldPassword} className="input" placeholder="old password" onChange={(e) => setOldPassword(e.target.value)}/>
                <label className="label">New Password</label>
                <input type="password" value={newPassword} className="input" placeholder="new password" onChange={(e) => setNewPassword(e.target.value)}/>

                <p className='text-red-500 text-center'>{error}</p>
                <button className="btn btn-neutral mt-4" onClick={handleChangePass}>Change Password</button>

            </fieldset>
            </div>
            <Footer />
    </div>
  )
}

export default ChangePass
