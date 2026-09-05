import { store } from "../store/states"
import Button from "./Button"
import { Link } from "react-router-dom"


const Header = () => {
    const {globalLogout, user} = store()
    const logout = () => {
        localStorage.removeItem("token")
        globalLogout()
    }

    return(
        <div className="w-full border-b p-4 flex justify-between items-center">
            <Link to="/profile">{user.firstname} {user.lastname}</Link>
         
            <Button onClick={logout}>Logout</Button>
        </div>
    )
}

export default Header