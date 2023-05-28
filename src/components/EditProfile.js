import { useEffect, useState } from 'react';
import { database } from '../firebaseConfig';
import { ref, query, orderByChild, equalTo, get, update } from 'firebase/database';
import Header from './Header';
import CustomerHeader from './customer/CustomerHeader';
import AlternateHeader from './customer/AlternateHeader';


const EditProfile = () => {
    const [fullName, setFullName] = useState('');
    const [phoneNo, setPhoneNo] = useState('');
    const [email, setEmail] = useState('')
    const [city, setCity] = useState('')

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [userType, setUserType] = useState('');

    useEffect(() => {
        const email = localStorage.getItem('email');
        if (email) {
            fetchUser(email);
        }
    }, []);

    const fetchUser = async (email) => {
        try {
            const usersRef = ref(database, 'users');
            const emailQuery = query(usersRef, orderByChild('email'), equalTo(email));
            const snapshot = await get(emailQuery);
            if (snapshot.exists()) {
                const userData = snapshot.val();
                const userId = Object.keys(userData)[0];
                const userRef = ref(database, `users/${userId}`);
                const userSnapshot = await get(userRef);
                if (userSnapshot.exists()) {
                    const user = userSnapshot.val();
                    console.log(user)
                    setFullName(user.name || '');
                    setEmail(user.email || '');
                    setUserType(user.userType)
                    setPhoneNo(user.phoneNo || '');
                    setCity(user.city || '')
                    setError('');
                } else {
                    setError('User data not found');
                }
            } else {
                setError('User not found');
            }
        } catch (error) {
            setError('Error fetching user data');
        }
        setLoading(false);
        console.log(userType)
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userEmail = localStorage.getItem('email');
        const usersRef = ref(database, 'users');
        const emailQuery = query(usersRef, orderByChild('email'), equalTo(userEmail));
        const snapshot = await get(emailQuery);
        if (snapshot.exists()) {
            const userData = snapshot.val();
            const userId = Object.keys(userData)[0];
            console.log(userId)
            const userRef = ref(database, `users/${userId}`);
            await update(userRef, { name: fullName, phoneNo, city });
            console.log(fullName)
            setSuccess(true)
        } else {
            setError('User not found');
        }
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <>
            {userType === 'customer' ? (
                <AlternateHeader />
            ) : (
                <Header />
            )}
            <div className="max-w-md mx-auto mt-10">
                <h1 className="text-2xl font-bold mb-4">Edit Profile</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="fullName" className="block mb-2">
                            Full Name:
                        </label>
                        <input
                            type="text"
                            id="fullName"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md"
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="phoneNo" className="block mb-2">
                            Phone Number:
                        </label>
                        <input
                            type="tel"
                            id="phoneNo"
                            value={phoneNo}
                            onChange={(e) => setPhoneNo(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="city" className="block mb-2">
                            City
                        </label>
                        <input
                            type="text"
                            id="city"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md"
                        />
                    </div>
                    <button
                        type="submit"
                        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                    >
                        Save Changes
                    </button>
                </form>
                {success && <p className="text-green-500">Profile Edited Successfully!</p>}
            </div>
        </>
    );
};

export default EditProfile