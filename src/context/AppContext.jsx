import { doc, getDoc, updateDoc } from "firebase/firestore";
import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AppContext = createContext();

const AppContextProvider = (props) => {
    const navigate = useNavigate();
    const loadUserData = async (uid) => {
        try {
            const userRef = doc(db, 'users', uid)
            const userSnap = await getDoc(userRef)
            const userData = userSnap.data()
            setUserData(userData)
            if (userData.avatar && userData.name) {
                navigate('/Chat')
            }
            else{
                navigate('/profile')
            }
            await updateDoc(userRef,{
                lastSeen:Date.now()
            })
            setInterval(async () => {
                if(auth.chatUser) {
                    await updateDoc(userRef,{
                        lastSeen:Date.now()
                    })
                }
            }, 60000)
        } catch (error) {
            
        }
    }
    const [userData, setUserData] = useState(null);
    const [chatData, setChatData] = useState(null);
    const value = {
        userData,setUserData,
        chatData,setChatData,
        loadUserData
    }
    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider