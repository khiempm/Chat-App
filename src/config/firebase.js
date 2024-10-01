
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";


const firebaseConfig = {
  apiKey: "AIzaSyAfqzdpIEFzK06dAnm7y6vhDO6aqs15AWY",
  authDomain: "chat-app-5396e.firebaseapp.com",
  projectId: "chat-app-5396e",
  storageBucket: "chat-app-5396e.appspot.com",
  messagingSenderId: "30357547888",
  appId: "1:30357547888:web:b1f337ef5271f78a25bdb5",
  measurementId: "G-15J84L6KTP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (username, email, password) => {
    try {
        const res= await createUserWithEmailAndPassword(auth, email,password)
        const user = res.user
        await setDoc(doc(db,"users",user.uid),{
          id:user.uid,
          username:username.toLowerCase(),
          email,
          name:"",
          avatar:"",
          bio:"ok, first time",
          lastSeen:Date.now()
        })
        await setDoc(doc(db,"chats",user.uid),{
          chatData:[]
        })
    } catch (error) {
      console.error(error)
      toast.error(error.code.split('/')[1].split('-').join(" ")) 
    }
}

const login = async(email, password) => {
  try {
    await signInWithEmailAndPassword(auth,email,password)
  } catch (error) {
    console.error(error)
    toast.error(error.code.split('/')[1].split('-').join(" "))
  }
}

const logout = async () =>{
  try {
    await signOut(auth)
    
  } catch (error) {
    console.error(error)
    toast.error(error.code.split('/')[1].split('-').join(" "))
  }
}
export {signup, login, logout, auth, db}