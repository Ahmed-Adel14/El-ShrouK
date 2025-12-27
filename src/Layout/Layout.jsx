import Navbar from "./Navbar";
import Footer from "./Footer";
import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";

export default function Layout() {
    const { pathname } = useLocation(); // بنعرف إحنا في أي صفحة
    const isHome = pathname === "/";

    // Scroll to top on route change
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return (
        <>
            <Navbar transparent={isHome} />
            <Outlet />
            <Footer />
        </>
    );
}
