import React from 'react';
import { Search } from 'lucide-react';

interface SearchBarProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
}

export const SearchBar = React.memo<SearchBarProps>(({
  placeholder = 'Search tokens...',
  value,
  onChange,
  className = '',
}) => {
  return (
    <div className={`relative ${className}`}>
      <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        className="w-full bg-[#0f1012] border border-white/5 rounded-md text-sm py-2.5 pl-10 pr-4 text-gray-300 placeholder:text-gray-500 focus:outline-none focus:border-indigo-500/50 focus:bg-[#151618] transition-all"
      />
    </div>
  );
});

SearchBar.displayName = 'SearchBar';
