import React, { useState } from "react";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { ref, set, query, get, orderByChild, equalTo } from 'firebase/database';
import { auth, database } from '../firebaseConfig';
import { Navigate, useNavigate } from 'react-router-dom'


const LoginPage = () => {
    const [loginVisible, setLoginVisible] = useState(false);
    const [email, setEmail] = useState("");
    const [resetEmail, setResetEmail] = useState("");
    const [password, setPassword] = useState("");
    const [fullName, setFullName] = useState("");
    const [phoneNo, setPhoneNo] = useState("");
    const [city, setCity] = useState("");
    const [error, setError] = useState("");
    const [userType, setUserType] = useState("")
    const [UserAuthState, setUserAuthState] = useState(true)
    const [errorMessage, setErrorMessage] = useState("");

    const [success, setSuccess] = useState(false);
    const navigate = useNavigate()
    const loginHandler = async (e) => {
        e.preventDefault();
        if (!email || !password) {
            setError("Please enter email and password.");
            return;
        }

        console.log(`Email: ${email}, Password: ${password}`);



        try {
            // Sign in with email and password
            await signInWithEmailAndPassword(auth, email, password).then(async () => {
                setEmail('');
                setPassword('');
                const usersRef = ref(database, 'users');
                console.log(usersRef)
                const billRef = query(ref(database, 'users'), orderByChild('email'), equalTo(email))
                const snapshot = await get(billRef);
                let userType1;
                if (snapshot.exists()) {
                    const user = snapshot.val();
                    userType1 = Object.values(user)[0].userType;
                    console.log("42", userType1)
                } else {
                    return null;
                }
                localStorage.setItem("email", email)
                if (userType === "customer") {
                    console.log(userType, userType1)
                    if (userType === userType1) {
                        navigate("/customerHeader");
                    } else {
                        setErrorMessage("Your Role is Not the Following")
                    }
                } else if (userType === "restaurant") {
                    if (userType === userType1) {
                        navigate("/yourRestaurant");
                    } else {
                        setErrorMessage("Your Role is Not the Following")
                    }

                } else if (userType === "delivery-boy") {

                    if (userType === userType1) {
                        navigate("/delivery");
                    } else {
                        setErrorMessage("Your Role is Not the Following")
                    }

                }
                console.log("user logged in successfully")

            })


            // Save user type to the database
            // Clear form fields

        } catch (error) {
            console.error(error);
            setErrorMessage("User not found. Please register.");
        }


        // do login logic here
    };

    const signUpHandler = async (e) => {
        e.preventDefault();
        if (!email || !password) {
            setError("Please enter email and password.");
            return;
        }
        try {
            await createUserWithEmailAndPassword(auth, email, password).then(async (userCredential) => {

                const user = userCredential.user;
                const uid = user.uid;

                console.log("23")
                await set(ref(database, `users/${uid}`), {
                    email: email,
                    userType: userType,
                    name: fullName,
                    phoneNo: phoneNo,
                    city: city

                });
                localStorage.setItem("email", email)

                if (userType === "customer") {
                    navigate("/customerHeader");
                } else if (userType === "restaurant") {
                    navigate("/yourRestaurant");
                } else if (userType === "delivery-boy") {
                    navigate("/deliveryBoy");
                }
            });
        }
        catch (error) {
            setErrorMessage("User Already Registered. Please Sign In")
        }


        // Save user type to the database

        // Clear form fields
        setEmail('');
        setPassword('');

    }
    const handleButtonClick = (userTypeId) => {
        setLoginVisible(true);
        setUserType(userTypeId)
        // set user type here
    };

    const closeLogin = () => {
        setLoginVisible(false)
        console.log(loginVisible)
    }
    const handleResetPassword = async (e) => {
        navigate("/resetPassword")
    };
    return (
        <div style={styles.background}>
            {console.log("32", loginVisible)}
            {!loginVisible ? (
                <div style={styles.loginContainer}>
                    <div style={styles.container}>
                        <div>
                            <h1 style={styles.h1}>Who Are You ?</h1>
                        </div>
                        <div className="flex flex-col items-center justify-center space-y-4">
                            <button className="w-full py-2 text-white bg-green-500 rounded-md hover:bg-green-600" onClick={() => handleButtonClick("customer")}>Customer</button>
                            <button className="w-full py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600" onClick={() => handleButtonClick("restaurant")}>Restaurant</button>
                            <button className="w-full py-2 text-white bg-yellow-500 rounded-md hover:bg-yellow-600" onClick={() => handleButtonClick("delivery-boy")}>Delivery Boy</button>
                        </div>
                    </div>


                </div>
            ) : (
                <div style={styles.loginForm}>


                    {error && <div style={styles.alert}>{error}</div>}

                    {!UserAuthState ? (
                        <form onSubmit={signUpHandler}>
                            <span style={styles.closeBtn} onClick={() => closeLogin()} >&#x2716; </span>
                            <div style={styles.formGroup}>
                                <label style={styles.label}>Email:</label>
                                <input
                                    type="email"
                                    value={email}
                                    style={styles.input}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter Your Email Address"

                                />
                            </div>
                            <div style={styles.formGroup}>
                                <label style={styles.label}>Password:</label>
                                <input
                                    type="password"
                                    value={password}
                                    style={styles.input}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Enter Your 8 digit password"
                                />
                            </div>
                            <div style={styles.formGroup}>
                                <label style={styles.label}>Full Name:</label>
                                <input
                                    type="text"
                                    value={fullName}
                                    style={styles.input}
                                    onChange={(e) => setFullName(e.target.value)}
                                    placeholder="Enter Your Full Name"
                                />
                            </div>
                            <div style={styles.formGroup}>
                                <label style={styles.label}>Phone Number:</label>
                                <input
                                    type="tel"
                                    value={phoneNo}
                                    style={styles.input}
                                    onChange={(e) => setPhoneNo(e.target.value)}
                                    placeholder="Enter Your Phone Number"
                                />
                            </div>
                            <div style={styles.formGroup}>
                                <label style={styles.label}>City</label>
                                <input
                                    type="tel"
                                    value={city}
                                    style={styles.input}
                                    onChange={(e) => setCity(e.target.value)}
                                    placeholder="Enter Your City"
                                />
                            </div>
                            <button type="submit" style={styles.btn}>
                                Signup
                            </button>
                            <p >Already Registered ? <button style={{ cursor: 'pointer' }} onClick={() => setUserAuthState(true)}>Login</button></p>
                            <button onClick={handleResetPassword} type="submit" style={{ color: "red" }}>Reset Password</button>

                        </form>
                    ) : (




                        <form onSubmit={loginHandler}>
                            <span style={styles.closeBtn} onClick={() => closeLogin()} >&#x2716; </span>
                            <div style={styles.formGroup}>
                                <label style={styles.label}>Email:</label>
                                <input
                                    type="email"
                                    value={email}
                                    style={styles.input}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter Your Email Address"

                                />
                            </div>
                            <div style={styles.formGroup}>
                                <label style={styles.label}>Password:</label>
                                <input
                                    type="password"
                                    value={password}
                                    style={styles.input}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Enter Your 8 digit password"
                                />
                            </div>

                            <button type="submit" style={styles.btn}>
                                Sign In
                            </button>

                            {success && <p>Password reset email sent. Check your inbox.</p>}
                            {error && <p>{error}</p>}
                            <p >New Account ? <button style={{ cursor: 'pointer' }} onClick={() => setUserAuthState(false)}>Register</button></p>


                            <button onClick={handleResetPassword} type="submit" style={{ color: "red" }}>Reset Password</button>

                        </form>

                    )
                    }


                    {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
                </div >
            )
            }
        </div >
    );
};
const styles = {
    container: {
        display: "flex",
        flexDirection: "column",

    },
    closeBtn: {

        top: "5px",
        right: "5px",
        fontSize: "1.5rem",
        marginLeft: "350px",
        fontWeight: "bold",
        cursor: "pointer",
    },

    background: {
        backgroundImage: "url('https://img.freepik.com/free-psd/delivery-3d-illustration-with-man-scooter-with-backpack_23-2149442162.jpg?w=900&t=st=1682620150~exp=1682620750~hmac=754ab0937e610c503a04fce732dc060ec6a1079a92ff2b15a44e5f20bdd4f98b')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",

    },
    loginContainer: {
        backgroundColor: "rgba(255, 255, 255, 0.8)",
        borderRadius: "5px",
        padding: "20px",
        display: "flex",
        height: "300px",
        width: "500px",
        flexDirection: "row",
        alignItems: "center",
        marginLeft: "600px",
        justifyContent: "center"
    },
    customerButton: {
        backgroundColor: "#4CAF50",
        color: "white",
        padding: "10px 20px",
        borderRadius: "8px",
        margin: "10px",
        cursor: "pointer",
    },
    restaurantButton: {
        backgroundColor: "#008CBA",
        color: "white",
        padding: "10px 20px",
        borderRadius: "8px",
        margin: "10px",
        cursor: "pointer",
    },
    deliveryButton: {
        backgroundColor: "#f44336",
        color: "white",
        padding: "10px 20px",
        borderRadius: "8px",
        margin: "10px",
        cursor: "pointer",
    },
    h1: {
        margin: "0",
        fontSize: "2em",
        textAlign: "center",
        padding: "30px"
    },
    loginForm: {
        marginLeft: "600px",
        width: "400px",
        backgroundColor: "rgba(255, 255, 255, 0.8)",
        borderRadius: "5px",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)",
        padding: "20px",
    },
    title: {
        textAlign: "center",
        marginBottom: "20px",
    },
    formGroup: {
        marginBottom: "20px",
    },
    label: {
        display: "block",
        fontWeight: "bold",
        marginBottom: "5px",
    },
    input: {
        width: "100%",
        padding: "10px",
        border: "1px solid #ccc",
        borderRadius: "5px",
        boxSizing: "border-box",
    },
    inputFocus: {
        borderColor: "#007bff",
    },
    btn: {
        display: "block",
        width: "100%",
        padding: "10px",
        borderRadius: "5px",
        backgroundColor: "#007bff",
        color: "#fff",
        fontWeight: "bold",
        textAlign: "center",
        textDecoration: "none",
        cursor: 'pointer'
    },
    btnHover: {
        backgroundColor: "#0069d9",
    },
    alert: {
        marginTop: "20px",
        padding: "10px",
        borderRadius: "5px",
        color: "#721c24",
        backgroundColor: "#f8d7da",
        borderColor: "#f5c6cb",
    },


};

export default LoginPage;