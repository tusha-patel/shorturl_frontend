import { Link, useNavigate } from "@tanstack/react-router";
import { logoutUser } from "../api/user.api";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/slice/authSlice";
export default function Navbar() {

    const { isAuthenticated } = useSelector((state) => state.auth)
    const navigate = useNavigate();
    console.log(isAuthenticated);
    const dispatch = useDispatch();
    const handleLogout = () => {
        logoutUser();
        navigate({ to: "/auth" });
        dispatch(logout());
    }
    return (
        <header className="bg-blue-600 text-white shadow">
            <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                {/* Left side: Logo or Title */}
                <Link to={"/"} className="text-xl font-semibold">
                    Url shortner
                </Link>

                {/* Right side: Auth Buttons */}
                <div className="space-x-4">
                    {isAuthenticated ? (
                        <button onClick={handleLogout}
                            className="bg-white text-black px-4 py-1 rounded hover:bg-gray-100 cursor-pointer"
                        >
                            Logout
                        </button>
                    ) : (
                        <>
                            <Link to={"/auth"} className="bg-white text-black px-4 py-1 rounded hover:bg-gray-100 cursor-pointer">
                                Login
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
}
