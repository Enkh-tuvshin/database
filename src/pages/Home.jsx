import axios from "axios";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../config";

export const Home = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful
        navigate("/");
        console.log("Signed out successfully");
      })
      .catch((error) => {
        // An error happened
      });
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      console.log(user);
      if (user) {
        setUser(user);
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        console.log(user);
        // ...
        console.log("uid", uid);
      } else {
        // User is signed out
        // ...
        console.log("user is logged out");
      }
    });
  }, []);

  const createPlaylist = () => {
    axios.post("http:/.localhost:3000/playlists", {
      title: "Ganaa",
      description: "String",
      creatorId: user.uid,
      isPrivate: true,
    });
  };

  return (
    <div>
      Welcome to home page
      {user && <p>{user.email}</p>}
      <div>
        <button onClick={handleLogout}>Logout</button>
        <button onClick={createPlaylist}>Create playlist</button>
      </div>
    </div>
  );
};
