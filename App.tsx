import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { CourseViewer } from './components/CourseViewer';
import { courseData } from './data';
import { Menu, X } from 'lucide-react';

const App: React.FC = () => {
  const [activeChapterId, setActiveChapterId] = useState(courseData.chapters[0].id);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const activeChapter = courseData.chapters.find(c => c.id === activeChapterId) || courseData.chapters[0];

  const handleSelectChapter = (id: string) => {
    setActiveChapterId(id);
    setIsSidebarOpen(false); // Close sidebar on mobile after selection
    window.scrollTo(0, 0);
  };

  return (
    <div className="flex h-screen bg-slate-50 font-sans text-slate-900 overflow-hidden">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-20 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar - responsive behavior */}
      <div className={`fixed inset-y-0 left-0 z-30 transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <Sidebar 
          chapters={courseData.chapters} 
          activeChapterId={activeChapterId} 
          onSelectChapter={handleSelectChapter} 
        />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full overflow-hidden w-full relative">
        {/* Mobile Header */}
        <header className="md:hidden bg-white border-b border-slate-200 p-4 flex items-center justify-between sticky top-0 z-10 shadow-sm">
          <span className="font-bold text-slate-800 truncate pr-4">{courseData.title}</span>
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 text-slate-600 hover:bg-slate-100 rounded-md focus:outline-none"
          >
            {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </header>

        {/* Scrollable Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8 scroll-smooth">
          <CourseViewer chapter={activeChapter} />
          
          <div className="max-w-4xl mx-auto mt-8 mb-12 text-center text-slate-400 text-sm">
            <p>&copy; {new Date().getFullYear()} Digital Marketing Masterclass. All rights reserved.</p>
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
