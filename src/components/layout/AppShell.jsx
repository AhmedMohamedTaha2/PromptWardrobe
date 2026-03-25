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

  return (
    <div className="min-h-screen bg-transparent">
      <header className="sticky top-0 z-40 border-b-4 border-black bg-white shadow-[0_4px_0_rgba(0,0,0,1)] text-[#1A1A1A]">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link
              to="/dashboard"
              className="flex items-center gap-2 font-black tracking-tight hover:opacity-80 transition-opacity text-[#1A1A1A]"
            >
              <div className="w-8 h-8 bg-yellow-400 border-2 border-black shadow-[2px_2px_0_#000] flex items-center justify-center text-lg">
                P
              </div>
              <span className="text-xl md:text-2xl hidden sm:inline-block">
                Prompts Wardrobe
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-2 text-sm font-bold">
              <NavLink to="/dashboard">Dashboard</NavLink>
              <NavLink to="/dashboard/new">New Prompt</NavLink>
              <NavLink to="/public">Public Feed</NavLink>

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
                      title="Export prompts"
                      className="!px-2"
                    >
                      <Download size={18} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleImportClick}
                      isLoading={isImporting}
                      title="Import prompts"
                      className="!px-2"
                    >
                      <Upload size={18} />
                    </Button>
                  </div>

                  <Link to="/settings">
                    <Button variant="ghost" size="sm" className="!px-2">
                      <Settings size={18} />
                    </Button>
                  </Link>

                  <Button variant="secondary" size="sm" onClick={handleLogout}>
                    Logout
                  </Button>
                </>
              ) : (
                <Link to="/auth/login">
                  <Button variant="primary" size="sm">
                    Login
                  </Button>
                </Link>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center gap-4 lg:hidden">
              {user && <BellIcon userId={user.id} />}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 border-2 border-black bg-white hover:bg-yellow-100 active:translate-y-0.5 active:shadow-none shadow-[4px_4px_0_#000] transition-all"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t-2 border-black bg-white p-4 flex flex-col gap-4 max-h-[85vh] overflow-y-auto">
            <nav className="flex flex-col gap-3 font-semibold">
              <NavLink to="/dashboard" className="w-full text-center">
                Dashboard
              </NavLink>
              <NavLink to="/dashboard/new" className="w-full text-center">
                New Prompt
              </NavLink>
              <NavLink to="/public" className="w-full text-center">
                Public Feed
              </NavLink>

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
              <Link
                to="/auth/login"
                className="w-full"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Button variant="primary" className="w-full justify-center">
                  Login
                </Button>
              </Link>
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
      <main className="container mx-auto px-4 py-8 flex flex-col gap-6 max-w-7xl">
        {children}
      </main>
    </div>
  );
}

function navClass(pathname, href) {
  // Exact match for dashboard to avoid highlighting on sub-routes unless intended
  const active =
    href === "/dashboard" ? pathname === href : pathname.startsWith(href);

  return `px-3 py-2 border-2 border-black text-sm font-bold transition-all outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 ${
    active
      ? "bg-yellow-300 shadow-[2px_2px_0_#000] translate-y-px text-black"
      : "bg-white hover:bg-yellow-100 hover:-translate-y-0.5 hover:shadow-[4px_4px_0_#000] active:translate-y-px active:shadow-none text-black"
  }`;
}
