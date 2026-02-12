import React from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'lucide-react';

export const Navbar: React.FC = () => {
  return (
    <nav className="bg-ibm-dark text-white border-b-4 border-ibm-blue h-16 flex items-center px-6 sticky top-0 z-50">
      <div className="flex items-center gap-4">
        <button className="lg:hidden">
          <Menu className="w-6 h-6" />
        </button>
        <Link to="/" className="flex items-center gap-2 group">
          <span className="font-bold text-xl tracking-tighter">IBM</span>
          <span className="font-light text-xl">SPGI Education 2026</span>
        </Link>
      </div>
      <div className="ml-auto flex items-center gap-6 text-sm font-medium">
        <Link to="/" className="hover:text-ibm-blue transition-colors">Catalog</Link>
        <a href="mailto:francisco.lopezminaya@es.ibm.com" className="hover:text-ibm-blue transition-colors">Contact</a>
      </div>
    </nav>
  );
};