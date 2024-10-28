// App.js
import db from "./firebaseconfig";
import { collection, addDoc, getDocs } from "firebase/firestore";
import React, { useState, useEffect } from "react";
import "./App.css";

const App = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [users, setUsers] = useState([]); // State to hold user data

  useEffect(() => {
    document.title = "Firebase CRUD Application"; // Set browser tab title
    fetchUsers(); // Fetch users on component mount
  }, []);

  const handleNameChange = (e) => setName(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handleAgeChange = (e) => setAge(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "users"), {
        name: name,
        email: email,
        age: age,
      });
      alert("Data added successfully!");
      setName("");
      setEmail("");
      setAge("");
      fetchUsers(); // Refresh user list after adding
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  const fetchUsers = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "users"));
      const userList = [];
      querySnapshot.forEach((doc) => {
        userList.push({ id: doc.id, ...doc.data() }); // Store user data
      });
      setUsers(userList);
    } catch (error) {
      console.error("Error fetching documents: ", error);
    }
  };

  return (
    <div className="form-container">
      <h1 className="form-title">Firebase CRUD Application</h1>{" "}
      {/* Page title */}
      <form onSubmit={handleSubmit} className="form">
        <label className="input-label">
          Name:
          <input
            type="text"
            value={name}
            onChange={handleNameChange}
            className="input-field"
            required
          />
        </label>
        <label className="input-label">
          Email:
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            className="input-field"
            required
          />
        </label>
        <label className="input-label">
          Age:
          <input
            type="number"
            value={age}
            onChange={handleAgeChange}
            className="input-field"
            required
          />
        </label>
        <button type="submit" className="submit-button">
          Add to Collection
        </button>
      </form>

      {/* Display Users */}
      <h2>User List</h2>
      <ul className="user-list">
        {users.map((user) => (
          <li key={user.id}>
            Name: {user.name}, Email: {user.email}, Age: {user.age}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
