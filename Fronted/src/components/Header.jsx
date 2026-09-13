import { store } from "../store/states"
import Button from "./Button"
import { Link } from "react-router-dom"


const Header = () => {
    const {globalLogout, user} = store()
    const logout = () => {
        localStorage.removeItem("token")
        globalLogout()
    }

    const headerOption = [
        {
            label: "Home",
            path: "/"
        },
        {
            label: "Chat",
            path: "/chat"
        }
    ]

    return(
        <div className="w-full border-b p-4 flex justify-between items-center">
            <Link to="/profile">{user.firstname} {user.lastname}</Link>

            <div className="flex gap-2">
               {headerOption.map((option, i) => {
                return(
                     <Link key={i} to={option.path}>{option.label}</Link>
                )
               })}

            </div>
         
            <Button onClick={logout}>Logout</Button>
        </div>
    )
}

export default Header