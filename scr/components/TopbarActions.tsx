'use client';

import React, { useState } from 'react';
import { Search, Bell, User, Command } from 'lucide-react';

export default function TopbarActions() {
  const [searchFocused, setSearchFocused] = useState(false);

  return (
    <div className="flex items-center gap-3">
      <div className={`
        flex items-center gap-2 px-3 py-1.5 rounded-md border bg-muted text-sm
        transition-all duration-200
        ${searchFocused ? 'border-primary/50 w-56' : 'border-border w-44'}
      `}>
        <Search size={14} className="text-muted-foreground flex-shrink-0" />
        <input
          type="text"
          placeholder="Search papers..."
          onFocus={() => setSearchFocused(true)}
          onBlur={() => setSearchFocused(false)}
          className="bg-transparent outline-none text-foreground placeholder:text-muted-foreground text-xs flex-1 min-w-0"
        />
        <span className="flex items-center gap-0.5 text-2xs text-muted-foreground flex-shrink-0">
          <Command size={10} /><span>K</span>
        </span>
      </div>

      <button className="relative p-2 rounded-md text-muted-foreground hover:bg-secondary hover:text-foreground transition-all duration-150">
        <Bell size={16} />
        <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-warning" />
      </button>

      <button className="flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-secondary transition-all duration-150">
        <div className="w-7 h-7 rounded-full bg-primary/20 flex items-center justify-center">
          <User size={14} className="text-primary" />
        </div>
        <span className="text-xs font-medium text-foreground hidden sm:block">Dr. Chen</span>
      </button>
    </div>
  );
}