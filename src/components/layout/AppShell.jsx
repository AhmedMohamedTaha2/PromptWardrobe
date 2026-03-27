import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useAuth } from "../../hooks/useAuth";
import { supabase } from "../../lib/supabase";
import { exportPrompts, importPrompts } from "../../lib/exportImport";
import { Button } from "../ui/Button";
import { BellIcon } from "./BellIcon";
import {
  Bookmark as BookmarkIcon,
  Menu,
  X,
  LogOut,
  Download,
  Upload,
  User,
  Settings,
} from "lucide-react";

import { useNotificationRealtime } from "../../hooks/useNotificationRealtime";

export function AppShell({ children }) {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const routerState = useRouterState({ select: (s) => s.location });
  const queryClient = useQueryClient();
  useNotificationRealtime(user?.id);
  const fileInputRef = useRef(null);
  const [isExporting, setIsExporting] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleExport = async () => {
    if (!user?.id) {
      toast.error("Not logged in");
      return;
    }
    try {
      setIsExporting(true);
      const count = await exportPrompts(supabase, user.id);
      toast.success(`Exported ${count} prompt${count !== 1 ? "s" : ""}`);
    } catch (error) {
      toast.error(error.message ?? "Export failed");
    } finally {
      setIsExporting(false);
    }
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleLogout = async () => {
    try {
      await signOut();
      toast.success("Logged out");
      navigate({ to: "/auth/login" });
    } catch (error) {
      toast.error(error.message ?? "Logout failed");
    }
  };

  const handleFileSelect = async (event) => {
    const file = event.target.files?.[0];
    if (!file || !user?.id) {
      toast.error("No file selected or not logged in");
      return;
    }

    try {
      setIsImporting(true);
      const result = await importPrompts(file, supabase, user.id);
      queryClient.invalidateQueries({ queryKey: ["prompts"] });
      toast.success(
        `Imported ${result?.length ?? 0} prompt${result?.length !== 1 ? "s" : ""}`,
      );
    } catch (error) {
      toast.error(error.message ?? "Import failed");
    } finally {
      setIsImporting(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const NavLink = ({ to, children, className, onClick }) => (
    <Link
      to={to}
      className={`${navClass(routerState.pathname, to)} ${className || ""}`}
      onClick={() => {
        setIsMobileMenuOpen(false);
        onClick?.();
      }}
    >
      {children}
    </Link>
  );

  const isLandingPage = routerState.pathname === "/";

  return (
    <div className="min-h-screen bg-transparent">
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-black/5 shadow-sm text-brand-soft-black">
        <div className="mx-auto px-4 py-3 w-full max-w-7xl">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link
              to="/"
              className="group flex items-center gap-3 font-black tracking-tighter hover:scale-105 transition-all duration-200 text-[#1A1A1A]"
            >
              <div className="w-10 h-10 bg-[#F5C518] border-[3px] border-[#1A1A1A] shadow-[3px_3px_0_#1A1A1A] flex items-center justify-center text-xl font-black -rotate-3 transition-transform group-hover:rotate-3">
                P
              </div>
              <span className="text-xl md:text-2xl hidden sm:inline-block uppercase tracking-widest drop-shadow-[1px_1px_0_rgba(255,255,255,1)] text-[#1A1A1A] font-black group-hover:translate-x-1 transition-transform">
                Wardrobe
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-2 text-sm font-bold">
              <NavLink to="/public">Public Feed</NavLink>
              {user && (
                <>
                  <NavLink to="/dashboard">Dashboard</NavLink>
                  <NavLink to="/dashboard/new">New Prompt</NavLink>
                </>
              )}

              {user && (
                <>
                  <div className="w-px h-6 bg-gray-300 mx-2" />
                  <NavLink to="/bookmarks" className="flex items-center gap-2">
                    <BookmarkIcon size={16} />
                    <span className="hidden xl:inline">Bookmarks</span>
                  </NavLink>
                  <NavLink
                    to={`/profile/${user.id}`}
                    className="flex items-center gap-2"
                  >
                    <User size={16} />
                    <span className="hidden xl:inline">Profile</span>
                  </NavLink>
                  <BellIcon userId={user.id} />
                </>
              )}
            </nav>

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center gap-3">
              {user ? (
                <>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleExport}
                      isLoading={isExporting}
                      aria-label="Export prompts"
                      className="px-2!"
                    >
                      <Download size={18} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleImportClick}
                      isLoading={isImporting}
                      aria-label="Import prompts"
                      className="px-2!"
                    >
                      <Upload size={18} />
                    </Button>
                  </div>

                  <Link to="/settings" aria-label="Open settings">
                    <Button variant="ghost" size="sm" className="px-2!">
                      <Settings size={18} />
                    </Button>
                  </Link>

                  <Button variant="secondary" size="sm" onClick={handleLogout}>
                    Logout
                  </Button>
                </>
              ) : (
                <div className="flex gap-2">
                  <Link to="/auth/login">
                    <Button variant="ghost" size="sm">
                      Log in
                    </Button>
                  </Link>
                  <Link to="/auth/signup">
                    <Button variant="primary" size="sm">
                      Sign up
                    </Button>
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center gap-4 lg:hidden">
              {user && <BellIcon userId={user.id} />}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-full border border-black/10 bg-white hover:bg-gray-50 transition-colors"
                aria-label={
                  isMobileMenuOpen
                    ? "Close navigation menu"
                    : "Open navigation menu"
                }
                aria-expanded={isMobileMenuOpen}
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-black/5 bg-white/95 backdrop-blur-md p-4 flex flex-col gap-4 max-h-[85vh] overflow-y-auto">
            <nav className="flex flex-col gap-3 font-semibold">
              <NavLink to="/public" className="w-full text-center">
                Public Feed
              </NavLink>
              {user && (
                <>
                  <NavLink to="/dashboard" className="w-full text-center">
                    Dashboard
                  </NavLink>
                  <NavLink to="/dashboard/new" className="w-full text-center">
                    New Prompt
                  </NavLink>
                </>
              )}

              {user && (
                <>
                  <div className="h-px bg-gray-200 my-1" />
                  <NavLink
                    to="/bookmarks"
                    className="w-full justify-center flex items-center gap-2"
                  >
                    <BookmarkIcon size={18} /> Bookmarks
                  </NavLink>
                  <NavLink
                    to={`/profile/${user.id}`}
                    className="w-full justify-center flex items-center gap-2"
                  >
                    <User size={18} /> Profile
                  </NavLink>
                  <NavLink
                    to="/settings"
                    className="w-full justify-center flex items-center gap-2"
                  >
                    <Settings size={18} /> Settings
                  </NavLink>
                </>
              )}
            </nav>

            {user ? (
              <div className="flex flex-col gap-3 pt-2 border-t-2 border-dashed border-gray-300">
                <div className="grid grid-cols-2 gap-3">
                  <Button
                    variant="ghost"
                    onClick={handleExport}
                    isLoading={isExporting}
                    className="w-full justify-center"
                  >
                    <Download size={16} className="mr-2" /> Export
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={handleImportClick}
                    isLoading={isImporting}
                    className="w-full justify-center"
                  >
                    <Upload size={16} className="mr-2" /> Import
                  </Button>
                </div>
                <Button
                  variant="secondary"
                  onClick={handleLogout}
                  className="w-full justify-center"
                >
                  <LogOut size={16} className="mr-2" /> Logout
                </Button>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                <Link
                  to="/auth/login"
                  className="w-full"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Button variant="ghost" className="w-full justify-center">
                    Log in
                  </Button>
                </Link>
                <Link
                  to="/auth/signup"
                  className="w-full"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Button variant="primary" className="w-full justify-center">
                    Sign up
                  </Button>
                </Link>
              </div>
            )}
          </div>
        )}

        {/* Hidden File Input */}
        <input
          ref={fileInputRef}
          type="file"
          accept=".json"
          onChange={handleFileSelect}
          className="hidden"
          aria-label="Import JSON file"
        />
      </header>
      <main
        className={`mx-auto flex flex-col w-full ${isLandingPage ? "max-w-none px-0 py-0" : "px-4 py-8 gap-6 max-w-7xl"}`}
      >
        {children}
      </main>
    </div>
  );
}

function navClass(pathname, href) {
  // Exact match for dashboard to avoid highlighting on sub-routes unless intended
  const active =
    href === "/dashboard" ? pathname === href : pathname.startsWith(href);

  return `px-4 py-2 rounded-full text-sm font-bold transition-all outline-none focus:ring-2 focus:ring-brand-yellow focus:ring-offset-2 ${
    active
      ? "bg-brand-yellow text-brand-soft-black"
      : "text-brand-soft-black/70 hover:bg-black/5 hover:text-brand-soft-black"
  }`;
}
