// C:\PoliceAI-Command-Center\client\src\components\Navbar.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Bell,
  ShieldCheck,
  Wifi,
  UserCircle,
  LogOut,
} from "lucide-react";

import { useAuth } from "../context/AuthContext";
import socket from "../services/socket";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const [time, setTime] = useState(
    new Date().toLocaleTimeString("en-IN")
  );

  const [notificationCount, setNotificationCount] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString("en-IN"));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleAlert = () => {
      setNotificationCount((prev) => prev + 1);
    };

    socket.on("crime_alert", handleAlert);

    return () => socket.off("crime_alert", handleAlert);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header
      className="
        sticky
        top-0
        z-30
        h-20
        bg-slate-900/95
        backdrop-blur-md
        border-b
        border-slate-800
        flex
        items-center
        justify-between
        px-8
        text-white
      "
    >
      {/* ================= Left Section ================= */}

      <div className="flex items-center gap-4">
        <div className="p-3 rounded-xl bg-blue-600/20">
          <ShieldCheck
            size={34}
            className="text-blue-400"
          />
        </div>

        <div>
          <h1 className="text-xl font-bold">
            Police AI Command Center
          </h1>

          <p className="text-xs text-slate-400">
            AI Powered Security System
          </p>
        </div>
      </div>

      {/* ================= Right Section ================= */}

      <div className="flex items-center gap-6">
        {/* System Status */}

        <div className="hidden lg:flex items-center gap-2 text-green-400">
          <Wifi size={18} />

          <span>System Active</span>
        </div>

        {/* Live Time */}

        <div className="hidden md:block text-slate-400">
          {time}
        </div>

        {/* Notifications */}

        <button
          onClick={() => setNotificationCount(0)}
          className="
            relative
            p-2
            rounded-lg
            hover:bg-slate-800
            transition
          "
        >
          <Bell size={24} />

          {notificationCount > 0 && (
            <span
              className="
                absolute
                -top-1
                right-0
                w-5
                h-5
                rounded-full
                bg-red-500
                text-xs
                flex
                items-center
                justify-center
              "
            >
              {notificationCount > 9 ? "9+" : notificationCount}
            </span>
          )}
        </button>

        {/* User */}

        <div
          className="
            flex
            items-center
            gap-3
            border-l
            border-slate-700
            pl-5
          "
        >
          <UserCircle
            size={34}
            className="text-blue-400"
          />

          <div>
            <p className="font-semibold">
              {user?.name || "Admin Officer"}
            </p>

            <p className="text-xs text-slate-400">
              {user?.role || "Control Room"}
            </p>
          </div>
        </div>

        {/* Logout */}

        <button
          onClick={handleLogout}
          className="
            flex
            items-center
            gap-2
            px-4
            py-2
            rounded-lg
            bg-red-500/10
            hover:bg-red-500/20
            text-red-400
            transition
          "
        >
          <LogOut size={18} />

          <span>Logout</span>
        </button>
      </div>
    </header>
  );
};

export default Navbar;