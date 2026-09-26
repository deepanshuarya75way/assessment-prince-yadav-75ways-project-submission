import axios from "axios"
import { BASE_URL } from "../utils/constants"
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addRequest, removeRequest } from "../utils/requestSlice";
import Loading from "./Loading";


const Requests = () => {
    const request = useSelector((store) => store.request);
    const dispatch = useDispatch();
    const [loading, isLoading] = useState(true);
    const getRequest = async () => {
        try{

            const res = await axios.get(BASE_URL + "/user/requests/received", { withCredentials: true });
            dispatch(addRequest(res?.data?.data));
        }
        catch(err){
            console.error(err?.response?.data);
        }
        finally{
            isLoading(false);
        }
    }

    const reviewRequest = async (status, id) => {
        try{

            await axios.post(BASE_URL+"/request/review/"+status+"/"+id, {}, {withCredentials: true})
            dispatch(removeRequest(id));
        }
        catch(err){
            console.error(err?.response?.data || "Something went wrong");
        }
    }

    useEffect(() => {
        getRequest();

    }, [])

    if(loading) return <Loading/>

    if (!request || request.length === 0) return <div className="text-center font-bold my-20">No request found</div>
    return (
        <div>
            <ul className="list bg-base-100 rounded-box shadow-md my-16">

                <li className="p-4 pb-2 text-xl tracking-wide">Pending Requests</li>
                {request.map((request) => {
                    const { firstName, lastName, age, gender, about, photoUrl, _id } = request.fromUserId;
                    return (


                        <li className="list-row" key={_id}>
                            <div><img className="size-10 rounded-box" src={photoUrl} /></div>
                            <div>
                                <div>{firstName + " " + lastName}</div>
                                <div className="text-sm ">{(age || gender) &&
                                    <p>{[age, gender].filter(Boolean).join(", ")}</p>}</div>
                            </div>
                            <p className="list-col-wrap text-xs">
                                {about}
                            </p>
                            <button className="btn btn-success" onClick={() => reviewRequest("accepted", request._id)}>Accept</button>
                            <button className="btn btn-error"onClick={() => reviewRequest("rejected", request._id)}>Reject</button>

                        </li>


                    )
                }
                )}
            </ul>
        </div>
    )
}

export default Requests
