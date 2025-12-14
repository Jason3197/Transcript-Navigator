import React from 'react';
import { Chapter } from '../types';
import { BookOpen, CheckCircle } from 'lucide-react';

interface SidebarProps {
  chapters: Chapter[];
  activeChapterId: string;
  onSelectChapter: (id: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ chapters, activeChapterId, onSelectChapter }) => {
  return (
    <div className="w-full md:w-80 bg-slate-900 text-slate-100 flex-shrink-0 h-screen overflow-y-auto border-r border-slate-700">
      <div className="p-6 border-b border-slate-700 bg-slate-950 sticky top-0 z-10">
        <h1 className="text-xl font-bold flex items-center gap-2 text-white">
          <BookOpen className="w-6 h-6 text-blue-400" />
          <span>Course Navigator</span>
        </h1>
        <p className="text-xs text-slate-400 mt-2 uppercase tracking-wider font-semibold">Table of Contents</p>
      </div>
      <nav className="p-4">
        <ul className="space-y-1">
          {chapters.map((chapter) => (
            <li key={chapter.id}>
              <button
                onClick={() => onSelectChapter(chapter.id)}
                className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 flex items-center justify-between group ${
                  activeChapterId === chapter.id
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20'
                    : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <span className="truncate pr-2">{chapter.title}</span>
                {activeChapterId === chapter.id && <CheckCircle className="w-4 h-4 flex-shrink-0" />}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};
