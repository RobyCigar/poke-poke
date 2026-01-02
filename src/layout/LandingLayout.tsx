import React, { useState, useEffect } from "react";
import {
  ChevronDown,
  Menu,
  X,
  MapPin,
  LogIn,
  Search,
  FileText,
  Map,
  Building,
} from "lucide-react";
import { Link, useNavigate } from "react-router";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { Outlet } from "react-router";
import SocialButton from "../components/SocialButton";

const LandingLayout = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeMenu, setActiveMenu] = useState(null);
    const [openMobileSubMenu, setOpenMobileSubMenu] = useState(null);
    const [openSearch, setOpenSearch] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
      const down = (e) => {
        if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
          e.preventDefault();
          setOpenSearch((open) => !open);
        }
      };
      document.addEventListener("keydown", down);
      return () => document.removeEventListener("keydown", down);
    }, []);

    const handleMobileSubMenuToggle = (itemName) => {
      setOpenMobileSubMenu(openMobileSubMenu === itemName ? null : itemName);
    };

    const runCommand = (command) => {
      setOpenSearch(false);
      command();
    };

    return (
      <div className="main-layout font-sans bg-gray-50">
        <Navigation />

        <main>
          <Outlet />
          {/* <WrappedComponent {...props} /> */}
                <SocialButton/>
          
        </main>
        <Footer />
      </div>
    );
};

export default LandingLayout;
