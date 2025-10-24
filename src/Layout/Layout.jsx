import Navbar from "./Navbar";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";
export default function Layout() {
    const { pathname } = useLocation(); // بنعرف إحنا في أنهي صفحة
    const isHome = pathname === "/";
    return (
        <>
            <Navbar transparent={isHome} />
            <Outlet />
            <Footer />
        </>
    );
    
}
