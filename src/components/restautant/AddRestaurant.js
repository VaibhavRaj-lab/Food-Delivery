import { useState } from "react";
import { auth, database } from '../../firebaseConfig';
import { ref, set, query, get, orderByChild, equalTo, child, push } from 'firebase/database';
import { useNavigate } from "react-router-dom";
function AddRestaurant() {
  const [name, setName] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("Lucknow"); // Default city

  // Get the email from local storage
  const email = localStorage.getItem("email");

  // Save the restaurant info for the user
  const navigate = useNavigate()
  const saveRestaurantInfo = async () => {

    console.log(email)
    // Query the database to get the user with the email address
    const billRef = query(ref(database, 'users'), orderByChild('email'), equalTo(email))
    console.log(get(billRef))
    const userSnapshot = await get(billRef);
    const obj = userSnapshot.val();
    console.log(obj)
    console.log(userSnapshot.val())
    const userId = Object.keys(userSnapshot.val())[0];
    const userBillRef = child(billRef, userId + '/restaurant');
    console.log(userBillRef)
    await push(userBillRef, {
      name,
      contactNo,
      address,
      city,
      
    });
    console.log(userSnapshot.val())
    navigate('/yourRestaurant')
    // query.on("child_added", (snapshot) => {
    //   const user = snapshot.val();

    //   // Save the restaurant info for the user
    //   const restaurantRef = ref(usersRef, `${snapshot.key}/restaurant`);
    //   set(restaurantRef, {
    //     name,
    //     contactNo,
    //     address,
    //     city,
    //   });
    // });
  };
  const handleChange = (e) => {
    const re = /^[0-9\b]+$/; // regex pattern to match numbers only
    if (e.target.value === "" || re.test(e.target.value)) {
      setContactNo(e.target.value);
    }
  };

  return (
    <div style={style.container}>
      <h1>Add Restaurant Info</h1>
      <div>
        <label style={style.label}>Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={style.input}
        />
      </div>
      <div>
        <label style={style.label}>Contact:</label>
        <input
          type="tel"
          value={contactNo}
          onChange={handleChange}
          style={style.input}
        />
      </div>
      <div>
        <label style={style.label}>Address:</label>
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          style={style.input}
        />
      </div>
      <div>
        <label style={style.label}>City:</label>
        <select
          value={city}
          onChange={(e) => setCity(e.target.value)}
          style={style.select}
        >
          <option value="">--Select a Capital City--</option>
          <option value="Amaravati">Amaravati (Andhra Pradesh)</option>
          <option value="Itanagar">Itanagar (Arunachal Pradesh)</option>
          <option value="Dispur">Dispur (Assam)</option>
          <option value="Patna">Patna (Bihar)</option>
          <option value="Raipur">Raipur (Chhattisgarh)</option>
          <option value="Panaji">Panaji (Goa)</option>
          <option value="Gandhinagar">Gandhinagar (Gujarat)</option>
          <option value="Chandigarh">Chandigarh (Haryana)</option>
          <option value="Shimla">Shimla (Himachal Pradesh)</option>
          <option value="Srinagar">Srinagar (Jammu and Kashmir)</option>
          <option value="Ranchi">Ranchi (Jharkhand)</option>



          <option value="Bengaluru">Bengaluru (Karnataka)</option>
          <option value="Thiruvananthapuram">Thiruvananthapuram (Kerala)</option>
          <option value="Bhopal">Bhopal (Madhya Pradesh)</option>
          <option value="Mumbai">Mumbai (Maharashtra)</option>
          <option value="Imphal">Imphal (Manipur)</option>
          <option value="Shillong">Shillong (Meghalaya)</option>
          <option value="Aizawl">Aizawl (Mizoram)</option>
          <option value="Kohima">Kohima (Nagaland)</option>
          <option value="Bhubaneswar">Bhubaneswar (Odisha)</option>
          <option value="Chandigarh">Chandigarh (Punjab)</option>
          <option value="Jaipur">Jaipur (Rajasthan)</option>
          <option value="Gangtok">Gangtok (Sikkim)</option>
          <option value="Chennai">Chennai (Tamil Nadu)</option>
          <option value="Hyderabad">Hyderabad (Telangana)</option>
          <option value="Agartala">Agartala (Tripura)</option>
          <option value="Lucknow">Lucknow (Uttar Pradesh)</option>
          <option value="Dehradun">Dehradun (Uttarakhand)</option>
          <option value="Kolkata">Kolkata (West Bengal)</option>
        </select>
      </div>
      <button onClick={saveRestaurantInfo}>Save</button>
    </div>
  );
}


const style = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "400px",
    height: "500px",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
    position: "relative",

  },
  label: {
    fontSize: "16px",
    marginBottom: "5px",
  },
  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "20px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    fontSize: "16px",
  },
  select: {
    width: "100%",
    padding: "10px",
    marginBottom: "20px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    fontSize: "16px",
  },
  button: {
    width: "100%",
    padding: "10px",
    borderRadius: "5px",
    border: "none",
    backgroundColor: "#4CAF50",
    color: "white",
    fontSize: "16px",
    cursor: "pointer",
  },
  loginContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: "5px",
    padding: "20px",
    display: "flex",
    height: "200px",
    width: "400px",
    flexDirection: "row",
    alignItems: "center",
    marginLeft: "600px"
  },
};
export default AddRestaurant;