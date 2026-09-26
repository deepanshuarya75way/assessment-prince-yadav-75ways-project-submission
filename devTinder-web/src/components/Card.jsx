import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { removeUserFromFeed } from "../utils/feedSlice";
import { useDispatch } from "react-redux";
import { increaseIndex } from "../utils/indexSlice";

const Card = ({ user }) => {
  const { _id, firstName, lastName, age, gender, about, photoUrl } = user;
  const dispatch = useDispatch();
  const handleSendRequest = async (status, id) => {
    try{
      await axios.post(BASE_URL+"/request/send/"+status+"/"+id , {}, {withCredentials: true})
      dispatch(removeUserFromFeed(id));
      dispatch(increaseIndex());
    }
    catch(err){
      console.error(err?.response?.data);
    }
  }

  

  return (
    <div>
      <div className="card bg-base-300 w-96 h-120 shadow-sm content-center">
        <figure>
          <img
            src={photoUrl}
            alt="profile picture" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{firstName + " " + lastName}</h2>
          {(age || gender) &&
          <p className="text-sm m-0">{[age, gender].filter(Boolean).join(", ")}</p>}
          <p>{about || "No Bio available"}</p>
          <div className="card-actions justify-between mt-4">
            <button className="btn btn-error" onClick={() => handleSendRequest("ignored", _id)}>Ignore</button>
            <button className="btn btn-success" onClick={() => handleSendRequest("interested", _id)}>Interested</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Card
