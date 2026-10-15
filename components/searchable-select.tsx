"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ChevronDown, Loader2, Search } from "lucide-react";

interface SearchableSelectProps {
  placeholder: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  /** Show a brief loading state while options are being (re)computed — keeps the UI consistent if option lists ever move behind an async/server call as the dataset grows. */
  loading?: boolean;
  className?: string;
}

/**
 * Searchable, keyboard-navigable dropdown used for every step of the vehicle
 * selector (Year/Make/Model/Trim/Engine/Drive/Body). A plain <select> can't
 * be filtered by typing or styled with a large touch-friendly option list,
 * which matters once any one of these lists has dozens+ entries.
 */
export default function SearchableSelect({
  placeholder, options, value, onChange, disabled = false, loading = false, className = "",
}: SearchableSelectProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [highlighted, setHighlighted] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const filtered = useMemo(() => {
    if (!query.trim()) return options;
    const q = query.trim().toLowerCase();
    return options.filter((o) => o.toLowerCase().includes(q));
  }, [options, query]);

  useEffect(() => {
    function handleOutside(e: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
        setQuery("");
      }
    }
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, []);

  useEffect(() => {
    if (open) {
      setHighlighted(0);
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const el = listRef.current?.children[highlighted] as HTMLElement | undefined;
    el?.scrollIntoView({ block: "nearest" });
  }, [highlighted, open]);

  function selectOption(option: string) {
    onChange(option);
    setOpen(false);
    setQuery("");
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlighted((h) => Math.min(h + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlighted((h) => Math.max(h - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (filtered[highlighted]) selectOption(filtered[highlighted]);
    } else if (e.key === "Escape") {
      setOpen(false);
      setQuery("");
    }
  }

  return (
    <div ref={rootRef} className={`relative ${className}`}>
      <button
        type="button"
        disabled={disabled}
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between gap-2 rounded-lg border border-zinc-600 bg-zinc-700 text-white px-3 py-3 text-sm text-left focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
      >
        <span className={value ? "text-white truncate" : "text-zinc-400 truncate"}>
          {value || placeholder}
        </span>
        {loading ? (
          <Loader2 className="h-4 w-4 text-zinc-400 animate-spin shrink-0" />
        ) : (
          <ChevronDown className={`h-4 w-4 text-zinc-400 shrink-0 transition-transform ${open ? "rotate-180" : ""}`} />
        )}
      </button>

      {open && !disabled && (
        <div className="absolute z-50 top-full left-0 mt-1 w-full min-w-[220px] rounded-lg border border-zinc-600 bg-zinc-800 shadow-2xl shadow-black/60 overflow-hidden">
          <div className="relative border-b border-zinc-700">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-zinc-500 pointer-events-none" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={`Search ${placeholder.replace(/^Select /i, "").toLowerCase()}…`}
              className="w-full bg-transparent text-white placeholder:text-zinc-500 pl-8 pr-3 py-2.5 text-sm focus:outline-none"
            />
          </div>

          {loading ? (
            <div className="flex items-center justify-center gap-2 py-6 text-sm text-zinc-500">
              <Loader2 className="h-4 w-4 animate-spin" /> Loading…
            </div>
          ) : filtered.length === 0 ? (
            <p className="px-3 py-4 text-sm text-zinc-500">No matches</p>
          ) : (
            <ul ref={listRef} className="max-h-60 overflow-y-auto py-1" role="listbox">
              {filtered.map((option, i) => (
                <li key={option} role="option" aria-selected={option === value}>
                  <button
                    type="button"
                    onMouseEnter={() => setHighlighted(i)}
                    onClick={() => selectOption(option)}
                    className={`w-full text-left px-3 py-2 text-sm transition-colors ${
                      i === highlighted
                        ? "bg-red-600 text-white"
                        : option === value
                        ? "text-red-400 bg-zinc-700/60"
                        : "text-zinc-200 hover:bg-zinc-700"
                    }`}
                  >
                    {option}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
