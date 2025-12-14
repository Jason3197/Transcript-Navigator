import React from 'react';
import { Chapter } from '../types';

interface CourseViewerProps {
  chapter: Chapter;
}

export const CourseViewer: React.FC<CourseViewerProps> = ({ chapter }) => {
  // Simple markdown-to-html parser for the specific structure of our data
  // This handles Headers (#, ##) and bold text (**text**) and lists
  const renderContent = (text: string) => {
    return text.split('\n').map((line, index) => {
      if (line.startsWith('# ')) {
        return <h1 key={index} className="text-3xl font-extrabold text-slate-900 mt-8 mb-6 pb-2 border-b border-slate-200">{line.replace('# ', '')}</h1>;
      }
      if (line.startsWith('## ')) {
        return <h2 key={index} className="text-2xl font-bold text-slate-800 mt-8 mb-4">{line.replace('## ', '')}</h2>;
      }
      if (line.startsWith('**') && line.endsWith('**')) { // Bold headers acting as sub-sections
         return <h3 key={index} className="text-lg font-bold text-slate-700 mt-6 mb-2">{line.replace(/\*\*/g, '')}</h3>;
      }
      if (line.trim().startsWith('* ')) {
        return (
          <li key={index} className="ml-6 list-disc text-slate-700 mb-1 pl-1 marker:text-blue-500">
            {parseInlineStyles(line.replace('* ', ''))}
          </li>
        );
      }
      if (line.trim().match(/^\d+\./)) {
         return (
           <li key={index} className="ml-6 list-decimal text-slate-700 mb-1 pl-1 marker:text-blue-500">
             {parseInlineStyles(line.replace(/^\d+\.\s/, ''))}
           </li>
         );
      }
      if (line.trim() === '') {
        return <br key={index} />;
      }
      return <p key={index} className="mb-4 text-slate-700 leading-relaxed">{parseInlineStyles(line)}</p>;
    });
  };

  const parseInlineStyles = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={i} className="font-bold text-slate-900">{part.replace(/\*\*/g, '')}</strong>;
      }
      return part;
    });
  };

  return (
    <div className="max-w-4xl mx-auto bg-white min-h-screen shadow-xl rounded-xl overflow-hidden my-8 border border-slate-200">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 px-8 py-10 text-white">
         <div className="uppercase tracking-widest text-xs font-bold mb-2 opacity-80">Module Content</div>
         <h1 className="text-3xl md:text-4xl font-bold">{chapter.title}</h1>
      </div>
      <div className="p-8 md:p-12">
        <div className="markdown-body">
          {renderContent(chapter.content)}
        </div>
      </div>
    </div>
  );
};
