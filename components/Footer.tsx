import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-100 py-12 border-t border-gray-200 mt-auto">
      <div className="container mx-auto px-6 text-sm text-gray-600">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <p className="font-bold text-gray-900">IBM SPGI Education Team</p>
            <p className="mt-1">For internal and partner training coordination.</p>
          </div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-ibm-blue">Privacy</a>
            <a href="#" className="hover:text-ibm-blue">Terms of Use</a>
            <a href="#" className="hover:text-ibm-blue">Accessibility</a>
          </div>
        </div>
        <div className="mt-8 text-xs text-gray-500">
          © 2026 IBM Corporation. All rights reserved.
        </div>
      </div>
    </footer>
  );
};