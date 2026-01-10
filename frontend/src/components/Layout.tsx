import React, { useState } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import { CustomCursor } from "./CustomCursor";
import {
  ShieldAlert,
  Activity,
  MessageSquare,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Home,
} from "lucide-react";
import { clsx } from "clsx";
import { motion } from "framer-motion";
import MadMaxChatOrb from "./MadMaxChatOrb";

/* =========================
   Sidebar Item
========================= */
const SidebarItem = ({
  to,
  icon: Icon,
  label,
  active,
  onClick,
  collapsed,
}: {
  to?: string;
  icon: any;
  label: string;
  active: boolean;
  onClick?: () => void;
  collapsed: boolean;
}) => {
  const content = (
    <div
      className={clsx(
        "relative flex items-center gap-3 px-5 py-3 font-mono text-xs tracking-widest uppercase transition-all cursor-pointer",
        active
          ? "text-red-500 bg-red-950/30 border-l-4 border-red-600"
          : "text-gray-400 hover:text-red-400 hover:bg-red-950/10 border-l-4 border-transparent",
        collapsed && "justify-center px-3"
      )}
      onClick={onClick}
    >
      <Icon className={clsx("w-4 h-4", active && "text-red-500")} />
      {!collapsed && <span>{label}</span>}

      {active && (
        <motion.div
          layoutId="active-glow"
          className="absolute inset-y-0 left-0 w-1 bg-red-600 shadow-[0_0_12px_rgba(255,0,0,0.6)]"
        />
      )}
    </div>
  );

  return to ? (
    <Link to={to} title={collapsed ? label : undefined}>
      {content}
    </Link>
  ) : (
    <div title={collapsed ? label : undefined}>{content}</div>
  );
};

/* =========================
   Layout
========================= */
export const Layout = () => {
  const location = useLocation();
  const isAuthPage = ["/login", "/signup"].includes(location.pathname);
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-black text-gray-200 font-mono overflow-hidden">
      <CustomCursor />

      {/* CRT / Analog Effects */}
      <div className="pointer-events-none fixed inset-0 z-50 mix-blend-overlay opacity-10 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:100%_3px]" />
      <div className="pointer-events-none fixed inset-0 z-40 bg-gradient-to-b from-black/40 via-transparent to-black/60" />

      {isAuthPage ? (
        <Outlet />
      ) : (
        <div className="flex h-screen">
          {/* =========================
              SIDEBAR
          ========================= */}
          <motion.aside
            animate={{ width: collapsed ? 80 : 288 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="hidden md:flex flex-col bg-black border-r border-red-900/40 z-30 relative"
          >
            {/* Toggle Button */}
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="absolute -right-3 top-6 z-50 w-6 h-6 rounded-full bg-red-900/80 border border-red-600/50 flex items-center justify-center text-red-400 hover:bg-red-800 hover:text-red-300 transition-all shadow-lg hover:shadow-red-600/50"
            >
              {collapsed ? (
                <ChevronRight className="w-3 h-3" />
              ) : (
                <ChevronLeft className="w-3 h-3" />
              )}
            </button>

            {/* Header */}
            <div className="px-6 py-5 border-b border-red-900/40">
              {!collapsed ? (
                <>
                  <h1 className="text-2xl font-bold tracking-[0.25em] text-red-600">
                    MADMAX
                  </h1>
                  <p className="text-[10px] text-gray-500 mt-1 tracking-widest">
                    HAWKINS NATIONAL LAB
                  </p>
                  <p className="text-[10px] text-gray-600 tracking-widest">
                    CLASSIFIED INTERFACE
                  </p>
                </>
              ) : (
                <div className="flex justify-center">
                  <div className="w-10 h-10 rounded-full bg-red-600/20 border-2 border-red-600 flex items-center justify-center">
                    <span className="text-red-600 font-bold text-sm">MM</span>
                  </div>
                </div>
              )}
            </div>

            {/* Navigation */}
            <nav className="flex-1 py-6 space-y-1">
              <SidebarItem
                to="/home"
                icon={Home}
                label="Home Page"
                active={location.pathname === "/home"}
                collapsed={collapsed}
              />

              <SidebarItem
                to="/home/deepfake"
                icon={Activity}
                label="Command Center"
                active={location.pathname === "/home/deepfake"}
                collapsed={collapsed}
              />

              <SidebarItem
                to="/home/misinfo"
                icon={ShieldAlert}
                label="Threat Assessment"
                active={location.pathname === "/home/misinfo"}
                collapsed={collapsed}
              />

              <SidebarItem
                to="/home/settings"
                icon={Settings}
                label="System Controls"
                active={location.pathname === "/home/settings"}
                collapsed={collapsed}
              />
            </nav>

            {/* Footer */}
            <div className="px-6 py-4 border-t border-red-900/40">
              {!collapsed ? (
                <>
                  <div className="flex items-center gap-2 text-[10px] text-gray-500 tracking-widest mb-3">
                    <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
                    SYSTEM STATUS: ACTIVE
                  </div>

                  <Link
                    to="/login"
                    className="flex items-center gap-2 text-gray-400 hover:text-red-500 transition-colors text-xs tracking-widest"
                  >
                    <LogOut className="w-4 h-4" />
                    TERMINATE SESSION
                  </Link>
                </>
              ) : (
                <div className="flex flex-col items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
                  <Link
                    to="/login"
                    title="Terminate Session"
                    className="text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                  </Link>
                </div>
              )}
            </div>
          </motion.aside>

          {/* =========================
              MAIN CONTENT
          ========================= */}
          <main className="flex-1 relative z-10 p-6 md:p-10 overflow-y-auto">
            {/* Ambient red glow */}
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,0,0,0.08),transparent_60%)]" />
            <Outlet />
          </main>

          {/* =========================
              GLOBAL CHATBOT
          ========================= */}
          <MadMaxChatOrb />
        </div>
      )}
    </div>
  );
};