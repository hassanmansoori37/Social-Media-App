import { store } from "../store/states"
import { Link } from "react-router-dom"

const Header = () => {
    const { globalLogout, user } = store()

    const logout = () => {
        localStorage.removeItem("token")
        globalLogout()
    }

    return (
        <header className="w-full bg-white/80 backdrop-blur-xl border-b border-gray-200 shadow-sm sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">

                {/* ============ LEFT: Profile ============ */}
                <Link
                    to="/profile"
                    className="flex items-center gap-3 group"
                >
                    {/* Avatar with gradient ring */}
                    <div className="relative">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#1877F2] to-[#764ba2] text-white flex items-center justify-center font-bold text-lg shadow-md shadow-[#1877F2]/30 group-hover:scale-105 transition-transform duration-200">
                            {user?.firstname?.charAt(0)?.toUpperCase() || "U"}
                        </div>
                        {/* Online dot */}
                        <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
                    </div>

                    <span className="font-bold text-gray-800 group-hover:text-[#1877F2] transition-colors text-[15px]">
                        {user?.firstname} {user?.lastname}
                    </span>
                </Link>
                {/* Center - Navigation (optional) */}
<nav className="hidden md:flex items-center gap-1">
  <Link to="/" className="px-5 py-2 rounded-xl text-gray-600 font-medium hover:bg-[#1877F2]/10 hover:text-[#1877F2] transition-all">
    Home
  </Link>
  <Link to="/chat" className="px-5 py-2 rounded-xl text-gray-600 font-medium hover:bg-[#1877F2]/10 hover:text-[#1877F2] transition-all">
    Chat
  </Link>
</nav>

                {/* ============ RIGHT: Logout ============ */}
                <button
                    onClick={logout}
                    className="px-6 py-2.5 rounded-xl
                    bg-gradient-to-r from-[#1877F2] to-[#0A66C2]
                    text-white font-semibold text-sm
                    shadow-md shadow-[#1877F2]/30
                    hover:shadow-lg hover:shadow-[#1877F2]/40 hover:-translate-y-0.5
                    active:scale-95 active:translate-y-0
                    transition-all duration-200
                    cursor-pointer"
                >
                    Logout
                </button>

            </div>
        </header>
    )
}

export default Header