import { useNavigate } from "react-router-dom";
import { auth, signOut } from "../firebase/config.js";

export const useAuth = () => {
    const navigate = useNavigate();

    const handleLogOut = () => {
        signOut(auth).then(() => {
            console.log("Sign-out successful.");

            setTimeout(() => {
                navigate("/")
            }, 500);
        }).catch((error) => {
            console.log(error);

        });
    }

    return {
        handleLogOut
    }
}