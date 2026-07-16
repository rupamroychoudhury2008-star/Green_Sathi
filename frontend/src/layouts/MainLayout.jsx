import { useEffect, useState } from "react";
import { useLocation, Outlet } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function MainLayout() {
  const { pathname } = useLocation();

  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") !== "light";
  });

  // Scroll to top
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [pathname]);

  // Apply theme
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-theme");
      document.body.classList.remove("light-theme");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.add("light-theme");
      document.body.classList.remove("dark-theme");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <div className={`main-layout ${darkMode ? "dark-theme" : "light-theme"}`}>
      <style>{`
        *{
          transition:
          background .3s ease,
          color .3s ease,
          border-color .3s ease;
        }

        body.dark-theme{
          background:#09090b;
          color:white;
        }

        body.light-theme{
          background:#f5f7fa;
          color:#222;
        }

        .main-layout{
          display:flex;
          flex-direction:column;
          min-height:100vh;
          font-family:'Segoe UI',sans-serif;
        }

        .content-wrapper{
          flex:1;
          width:100%;
          padding:20px 40px;
        }

        .page-transition{
          animation:fadeSlide .45s ease;
        }

        @keyframes fadeSlide{
          from{
            opacity:0;
            transform:translateY(18px);
          }
          to{
            opacity:1;
            transform:translateY(0);
          }
        }

        @media(max-width:768px){
          .content-wrapper{
            padding:15px;
          }
        }
      `}</style>

      <Navbar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />

      <main className="content-wrapper">
        <div key={pathname} className="page-transition">
          <Outlet />
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default MainLayout;