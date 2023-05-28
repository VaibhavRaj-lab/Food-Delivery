import { useState } from 'react';

import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import backgroundImage from '../img/avatar.png';

const firebaseConfig = {
    // Your Firebase configuration
};


const ResetPassword = () => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const handleResetPassword = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess(false);

        try {
            await sendPasswordResetEmail(auth, email);
            setSuccess(true);
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="min-h-screen bg-cover bg-center flex items-center justify-center" style={{ backgroundImage: "url('https://img.freepik.com/free-psd/delivery-3d-illustration-with-man-scooter-with-backpack_23-2149442162.jpg?w=900&t=st=1682620150~exp=1682620750~hmac=754ab0937e610c503a04fce732dc060ec6a1079a92ff2b15a44e5f20bdd4f98b')" }}>
            <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
                <h2 className="text-2xl font-semibold mb-4">Reset Password</h2>
                {success && <p className="text-green-600 mb-4">Password reset email sent. Check your inbox.</p>}
                {error && <p className="text-red-600 mb-4">{error}</p>}
                <form onSubmit={handleResetPassword}>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
                        <input
                            type="email"
                            id="email"
                            className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg"
                    >
                        Reset Password
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ResetPassword;
