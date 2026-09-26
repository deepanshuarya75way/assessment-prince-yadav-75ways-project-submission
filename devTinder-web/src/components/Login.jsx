import { useState, useEffect } from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constants';
import Footer from './Footer';

const Login = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoginForm, setIsLoginForm] = useState(true);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector(state => state.user);

    useEffect(() => {
        if (user) {
            navigate("/");
        }
    }, [user, navigate]);
    
    const handleLogin = async () => {
    try{
        const res = await axios.post(BASE_URL+"/login",{
            email,
            password
        },{withCredentials: true})
        dispatch(addUser(res.data));
        navigate("/")
    }
    catch(err){
        setError(err?.response?.data || "Something went wrong");
    }
        
    }

    const handleSignUp = async () => {
        try{
            const res = await axios.post(BASE_URL+"/signup", {
                firstName,
                lastName,
                email,
                password
            }, {withCredentials: true});
            dispatch(addUser(res.data.data));
            navigate("/profile");
        }
        catch(err){
            setError(err?.response?.data || "Something went wrong");
        }
    }

    return (
        <div>
            <div className='h-[80vh] flex items-center justify-center'>
        <fieldset className="fieldset bg-base-300 border-base-300 rounded-box w-xs border p-4">
                <legend className="fieldset-legend">{isLoginForm? "Login": "SignUp"}</legend>

                {!isLoginForm && <><label className="label">First Name</label>
                <input type="text" value={firstName} className="input" placeholder="firstname" onChange={(e) => setFirstName(e.target.value)}/>

                <label className="label">Last Name</label>
                <input type="text" value={lastName} className="input" placeholder="lastname" onChange={(e) => setLastName(e.target.value)}/>
                </>}
                <label className="label">Email</label>
                <input type="email" value={email} className="input" placeholder="Email" onChange={(e) => setEmail(e.target.value)}/>

                <label className="label">Password</label>
                <input type="password" value={password} className="input" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>

                <p className='text-red-500 text-center'>{error}</p>
                <button className="btn btn-neutral mt-4" onClick={isLoginForm? handleLogin: handleSignUp}>{isLoginForm?"Login": "SignUp"}</button>

                <p className='text-center mt-2 underline cursor-pointer text-xs text-gray-300'
                onClick={() => setIsLoginForm(!isLoginForm)}>{isLoginForm?"New user? Sign Up here!": "Already have an account."}</p>

            </fieldset>
            </div>
            <Footer />
            
        </div>
    )
}

export default Login
