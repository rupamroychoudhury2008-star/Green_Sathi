import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";

function MainLayout() {
  const { pathname } = useLocation();

  // 1. Auto Scroll-To-Top on route change
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth", // Smooth scrolling
    });
  }, [pathname]);

  return (
    <div className="main-layout">
      <style>{`
        /* --- ADVANCED LAYOUT STYLING --- */

        /* 1. Sticky Footer Setup */
        .main-layout {
          display: flex;
          flex-direction: column;
          min-height: 100vh; /* Forces layout to take full screen height */
          background-color: #09090b; /* Consistent Dark Theme Background */
          font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
        }

        /* 2. Content Wrapper */
        .content-wrapper {
          flex: 1; /* Pushes footer down if content is short */
          width: 100%;
          position: relative;
          z-index: 1;
          /* Advanced Padding: Less on mobile, more on desktop */
          padding: 20px 40px; 
        }

        /* 3. Smooth Page Transitions */
        .page-transition {
          animation: fadeSlideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        @keyframes fadeSlideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Responsive Adjustments */
        @media (max-width: 768px) {
          .content-wrapper {
            padding: 20px 15px; /* Tighter padding on mobile */
          }
        }
      `}</style>

      <Navbar />
      
      <main className="content-wrapper">
        {/* Key prop triggers animation on route change */}
        <div key={pathname} className="page-transition">
          <Outlet />
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default MainLayout;