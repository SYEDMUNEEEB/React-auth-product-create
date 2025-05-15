import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "./firebase";

export const login = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential;
  } catch (error) {
    if (error.code === "auth/user-not-found") {
      throw new Error("User not registered");
    } else if (error.code === "auth/wrong-password") {
      throw new Error("Incorrect password");
    } else {
      throw new Error("Login failed");
    }
  }
};

export const register = async (email, password, username) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Update the user's profile with the username
    await updateProfile(user, { displayName: username });
    console.log(user);
  } catch (error) {
    console.error("Error registering:", error.message);
  }
};