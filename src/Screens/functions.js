import { auth } from "../../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

const register = async (email, password, setErrorMsg, navigation) => {
  try {
    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        setErrorMsg("success register");
        navigation.push("Home");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        setErrorMsg(errorMessage);
      });
  } catch (error) {
    console.error(error);
  }
};

const login = async (emailVal, passwordVal, setErrorMsg, navigation) => {
  try {
    await signInWithEmailAndPassword(auth, emailVal, passwordVal)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        setErrorMsg("success login");
        navigation.push("Home");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        setErrorMsg(errorMessage);
      });
  } catch (error) {
    console.error(error);
  }
};

export { register, login };
