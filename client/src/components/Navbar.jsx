import { useState } from "react";

export default function Navbar({ onSearch, cartCount = 0, onCartClick }) {
  const [term, setTerm] = useState("");
  const [open, setOpen] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    onSearch && onSearch(term.trim());
    // đóng menu mobile sau khi search
    setOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-black/95 backdrop-blur border-b border-white/10">
      {/* Top bar */}
      <div className="w-full px-4 sm:px-6 lg:px-8 h-16 flex items-center gap-4">
        {/* Brand */}
        <a
          href="/"
          className="text-white font-semibold text-lg tracking-tight select-none whitespace-nowrap"
        >
          Group<span className="text-rose-500">4</span>
        </a>

        {/* Primary nav (desktop) */}
        <nav className="hidden md:flex items-center gap-6 ml-4">
          <a href="/" className="text-sm text-white/80 hover:text-white">Trang chủ</a>
          <a href="/about" className="text-sm text-white/80 hover:text-white">About us</a>
          <a href="/orders" className="text-sm text-white/80 hover:text-white">Đơn hàng</a>
        </nav>

        {/* Search (desktop) */}
        <form onSubmit={submit} className="hidden md:block flex-1 mx-4">
          <input
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            placeholder="Tìm món ăn..."
            className="w-full rounded-full bg-neutral-900 border border-neutral-800 px-4 py-2 text-sm text-white placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-white/20"
          />
        </form>

        {/* Actions (desktop) */}
        <div className="hidden md:flex items-center gap-3 ml-auto">
          <button
            onClick={onCartClick}
            className="relative rounded-full bg-neutral-900 border border-neutral-800 text-white px-3 py-1.5 text-sm hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-white/20"
          >
            Giỏ hàng
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 min-w-5 h-5 inline-flex items-center justify-center rounded-full bg-rose-500 text-white text-xs px-1">
                {cartCount}
              </span>
            )}
          </button>

          <a
            href="/auth"
            className="rounded-full bg-white text-black px-3 py-1.5 text-sm font-semibold hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-black/20"
          >
            Đăng nhập
          </a>

          {/* Mobile menu button */}
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="md:hidden ml-auto inline-flex items-center justify-center rounded-md p-2 text-white/80 hover:text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/20"
          aria-label="Toggle menu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-6 w-6"
          >
            {open ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile panel */}
      {open && (
        <div className="md:hidden px-4 pb-4 border-t border-white/10">
          <nav className="flex flex-col gap-2 py-3">
            <a href="/" className="px-2 py-2 rounded-md text-white/90 hover:bg-white/10">Trang chủ</a>
            <a href="/about" className="px-2 py-2 rounded-md text-white/90 hover:bg-white/10">About us</a>
            <a href="/orders" className="px-2 py-2 rounded-md text-white/90 hover:bg-white/10">Đơn hàng</a>
          </nav>

          <form onSubmit={submit} className="py-2">
            <input
              value={term}
              onChange={(e) => setTerm(e.target.value)}
              placeholder="Tìm món ăn..."
              className="w-full rounded-full bg-neutral-900 border border-neutral-800 px-4 py-2 text-sm text-white placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-white/20"
            />
          </form>

          <div className="flex items-center gap-3 pt-2">
            <button
              onClick={() => {
                onCartClick && onCartClick();
                setOpen(false);
              }}
              className="relative flex-1 rounded-full bg-neutral-900 border border-neutral-800 text-white px-3 py-2 text-sm hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-white/20"
            >
              Giỏ hàng
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 min-w-5 h-5 inline-flex items-center justify-center rounded-full bg-rose-500 text-white text-xs px-1">
                  {cartCount}
                </span>
              )}
            </button>

            <a
              href="/auth"
              className="flex-1 text-center rounded-full bg-white text-black px-3 py-2 text-sm font-semibold hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-black/20"
              onClick={() => setOpen(false)}
            >
              Đăng nhập
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
