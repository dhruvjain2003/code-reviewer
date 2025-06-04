"use client";
import Link from 'next/link';
import { Menu, X, Code2 } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setIsMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  return (
    <header className="backdrop-blur-md bg-white/90 border-b border-slate-200/50 sticky top-0 z-50 shadow-sm">
      <div className="mx-auto px-8 sm:px-6 lg:px-16 ">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
              <Code2 size={18} className="text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent group-hover:from-indigo-600 group-hover:to-purple-600 transition-all duration-300">
              CodeReviewer
            </span>
          </Link>
          
          <nav className="hidden lg:flex items-center space-x-1">
            {['About', 'Features'].map((item) => (
              <a 
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={(e) => handleNavClick(e, `#${item.toLowerCase()}`)}
                className="px-3 py-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100/50 rounded-lg font-medium transition-all duration-200"
              >
                {item}
              </a>
            ))}
            <div className="w-px h-6 bg-slate-300 mx-4" />
            <Link 
              href="/login" 
              className="px-3 py-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100/50 rounded-lg font-medium transition-all duration-200"
            >
              Sign In
            </Link>
            <Link 
              href="/signup" 
              className="ml-2 px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-lg font-medium shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 transition-all duration-200 transform hover:scale-105"
            >
              Get Started
            </Link>
          </nav>
          
          <button 
            className="lg:hidden p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100/50 rounded-lg transition-all duration-200"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
        
        <div 
          className={`fixed inset-0 bg-black/20 backdrop-blur-sm transition-all duration-300 lg:hidden z-40 ${
            isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
          onClick={() => setIsMenuOpen(false)}
          aria-hidden="true"
        />
        
      </div>
    </header>
  );
}