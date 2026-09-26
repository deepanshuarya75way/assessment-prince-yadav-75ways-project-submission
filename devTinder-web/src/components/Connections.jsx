import axios from "axios"
import { BASE_URL } from "../utils/constants"
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnections, removeOneConnection } from "../utils/connectionSlice";
import Loading from "./Loading";
import { Link } from "react-router-dom";

const Connections = () => {
    const connections = useSelector((store) => store.connection);
    const dispatch = useDispatch();
    const [loading , isLoading] = useState(true);
    const getConnections = async () => {
        try{

            const res = await axios.get(BASE_URL + "/user/connections", { withCredentials: true });
            dispatch(addConnections(res?.data))
        }
        catch(err){
            console.error(err?.response?.data);
        }
        finally{
            isLoading(false);
        }
    }

    const handleRemove = async (connectedUserId) => {
        try{
            await axios.delete(BASE_URL+"/user/connections/"+connectedUserId, {withCredentials: true});
            dispatch(removeOneConnection(connectedUserId));
        }
        catch(err){
            console.error(err?.response?.data);
        }
    }

    useEffect(() => {
        getConnections();
    }, [])

    if(loading) return <Loading/>

    if (!connections || connections.length === 0) return <div className="text-center font-bold my-20">No connections found</div>
    return (
        <div>
            <ul className="list bg-base-100 rounded-box shadow-md my-16">

                        <li className="p-4 pb-2 text-xl tracking-wide">Your Connections</li>
            {connections.map((connection) => {
                const {firstName, lastName, age, gender, about, photoUrl, _id} = connection;
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
                            <Link to={"/chat/"+_id} className="btn btn-soft btn-primary">Chat</Link>
                            <button className="btn btn-soft btn-error" onClick={() => {handleRemove(connection._id)}}>Remove</button>
                           
                        </li>

                   
                )
            }
            )}
             </ul>
        </div>
    )
}

export default Connections
