import axios from 'axios';
import { useState } from 'react'
import { BASE_URL } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import Card from './Card';

const EditProfile = ({ user }) => {

    const [firstName, setFirstName] = useState(user.firstName);
    const [lastName, setLastName] = useState(user.lastName);
    const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
    const [age, setAge] = useState(user.age || "");
    const [gender, setGender] = useState(user.gender);
    const [about, setAbout] = useState(user.about);
    const [error, setError] = useState("");
    const [showToast, setShowToast] = useState(false);

    const dispatch = useDispatch();

    const saveProfile = async () => {
        try {
            setError("");
            const res = await axios.patch(BASE_URL + "/profile/edit", {
                firstName,
                lastName,
                photoUrl,
                age,
                gender,
                about
            }, { withCredentials: true })

            dispatch(addUser(res?.data?.data))
            setShowToast(true);
            setTimeout(() => {
                setShowToast(false)
            }, 3000)
        }
        catch (err) {
            setError(err?.response?.data || "Someting went wrong")
        }
    }

    return (
        <>
            <div className='flex items-center gap-10 my-16 flex-col md:flex-row md:justify-center'>
                <div className='flex justify-center'>
                    <fieldset className="fieldset bg-base-300 border-base-300 rounded-box w-xs border p-4">
                        <legend className="fieldset-legend">Edit Profile</legend>

                        <label className="label">First Name</label>
                        <input type="text" className="input" value={firstName} onChange={(e) => setFirstName(e.target.value)} />

                        <label className="label">Last Name</label>
                        <input type="text" className="input" value={lastName} onChange={(e) => setLastName(e.target.value)} />

                        <label className="label">Photo URL</label>
                        <input type="text" className="input" value={photoUrl} onChange={(e) => setPhotoUrl(e.target.value)} />

                        <label className="label">Age</label>
                        <input type="text" className="input" placeholder='age' value={age} onChange={(e) => setAge(e.target.value)} />

                        <label className='label'>Gender</label>
                        <div className='flex gap-4'>
                            <div>

                                <label className='mr-1'>Male</label>
                                <input type="radio" name="radio-1" className="radio" value='male' checked={gender === 'male'} onChange={(e) => setGender(e.target.value)} />
                            </div>
                            <div>

                                <label className='mr-1'>Female</label>
                                <input type="radio" name="radio-1" className="radio" value='female' checked={gender === 'female'} onChange={(e) => setGender(e.target.value)} />
                            </div>
                            <div>

                                <label className='mr-1'>Others</label>
                                <input type='radio' name="radio-1" className="radio" value='other' checked={gender === 'other'} onChange={(e) => setGender(e.target.value)} />
                            </div>
                        </div>


                        <label className='label'>About</label>
                        <textarea className="textarea" placeholder="Bio" value={about} onChange={(e) => setAbout(e.target.value)}></textarea>

                        <p className='text-red-500 text-center'>{error}</p>
                        <button className="btn btn-neutral mt-4" onClick={saveProfile}>Save</button>
                    </fieldset>
                </div>
                <div className='mt-10'>

                    <Card user={{ firstName, lastName, photoUrl, age, gender, about }} />
                </div>
                
            </div>
            
            {showToast && <div className="toast toast-top toast-center z-101">
                
                <div className="alert alert-success">
                    <span>Profile saved successfully!</span>
                </div>
            </div>}
        </>

    )
}

export default EditProfile
