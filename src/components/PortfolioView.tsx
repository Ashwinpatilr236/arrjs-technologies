import React, { useState } from 'react';
import { DEMO_PROJECTS } from '../data/portfolio';
import { DemoProject, PageView } from '../types';
import { 
  Briefcase, 
  ExternalLink, 
  CheckCircle2, 
  X, 
  Laptop, 
  Smartphone, 
  Sparkles,
  PhoneCall,
  ArrowRight
} from 'lucide-react';

interface PortfolioViewProps {
  setCurrentView: (view: PageView) => void;
  onOpenConsultationWithService: (serviceName: string) => void;
}

export const PortfolioView: React.FC<PortfolioViewProps> = ({
  setCurrentView,
  onOpenConsultationWithService
}) => {
  const [selectedProject, setSelectedProject] = useState<DemoProject | null>(null);
  const [selectedFilter, setSelectedFilter] = useState<string>('all');

  const categories = ['all', 'Website Development', 'Website Redesign'];

  const filteredProjects = DEMO_PROJECTS.filter(p => 
    selectedFilter === 'all' || p.category === selectedFilter
  );

  return (
    <div className="space-y-12 pb-16">
      
      {/* Header Banner */}
      <section className="bg-slate-900 text-white py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-1.5 bg-amber-500/20 text-amber-300 text-xs font-semibold px-3.5 py-1 rounded-full border border-amber-400/30">
            <Briefcase className="w-4 h-4 text-amber-400" /> Demo Showcase
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            Website Concepts & Layout Demos
          </h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Examine our modern design standards, responsive mobile layouts, and conversion-focused structures crafted for local businesses.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Strict Demo Project Disclaimer Banner */}
        <div className="bg-amber-50 border border-amber-300 p-5 rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1 text-xs sm:text-sm text-amber-950">
            <p className="font-extrabold flex items-center gap-2">
              <span className="bg-amber-500 text-slate-950 px-2 py-0.5 rounded-md text-[10px] font-bold uppercase">
                Notice
              </span>
              Demo Showcase Disclaimer
            </p>
            <p className="text-amber-900 leading-relaxed">
              All projects in this portfolio are <strong>Demo Projects</strong> created to showcase our design capabilities, speed optimization, and responsive user experience until real client portfolio items become available.
            </p>
          </div>

          <button
            onClick={() => onOpenConsultationWithService('Custom Website Development')}
            className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-colors shrink-0 shadow-xs cursor-pointer"
          >
            Request Custom Demo
          </button>
        </div>

        {/* Category Filters */}
        <div className="flex items-center justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedFilter(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedFilter === cat 
                  ? 'bg-blue-600 text-white shadow-2xs' 
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              {cat === 'all' ? 'All Demo Projects' : cat}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-2xs hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div>
                {/* Image & Demo Tag */}
                <div className="relative h-48 bg-slate-100 overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  
                  {/* Strict Demo Project Tag */}
                  <span className="absolute top-3 left-3 bg-amber-500 text-slate-950 font-extrabold text-[10px] px-2.5 py-1 rounded-md shadow-md uppercase tracking-wider">
                    Demo Project
                  </span>

                  <span className="absolute bottom-3 right-3 bg-slate-900/80 backdrop-blur-xs text-white text-[10px] font-semibold px-2 py-0.5 rounded-md">
                    {project.category}
                  </span>
                </div>

                {/* Content */}
                <div className="p-5 space-y-3">
                  <span className="text-[11px] font-bold text-blue-600 uppercase tracking-wider">
                    {project.industry}
                  </span>
                  
                  <h3 className="text-lg font-bold text-slate-900">
                    {project.title}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                    {project.description}
                  </p>

                  <div className="pt-2 border-t border-slate-100 space-y-1.5">
                    <p className="text-[11px] font-bold text-slate-800">Included Demo Features:</p>
                    <ul className="space-y-1 text-xs text-slate-600">
                      {project.features.slice(0, 3).map((feat, idx) => (
                        <li key={idx} className="flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                          <span className="truncate">{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Action */}
              <div className="p-5 pt-0">
                <button
                  onClick={() => setSelectedProject(project)}
                  className="w-full bg-slate-900 hover:bg-blue-600 text-white font-semibold text-xs py-2.5 rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs"
                >
                  <span>Explore Demo Architecture</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          ))}
        </div>

      </section>

      {/* Demo Project Breakdown Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div 
            className="bg-white rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl border border-slate-200 max-h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="bg-slate-900 text-white p-5 sm:p-6 flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="bg-amber-500 text-slate-950 font-extrabold text-[10px] px-2 py-0.5 rounded-md uppercase">
                    Demo Project
                  </span>
                  <span className="text-xs text-slate-300 font-medium">
                    {selectedProject.industry}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white">
                  {selectedProject.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedProject(null)}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-5 sm:p-6 overflow-y-auto space-y-5 text-xs sm:text-sm text-slate-700">
              
              <div className="h-56 rounded-2xl overflow-hidden bg-slate-100 relative">
                <img 
                  src={selectedProject.image} 
                  alt={selectedProject.title} 
                  className="w-full h-full object-cover" 
                />
              </div>

              <div className="space-y-2">
                <h4 className="font-bold text-slate-900 text-base">Project Challenge & Objective</h4>
                <p className="text-slate-600 leading-relaxed">
                  {selectedProject.demoDetails.challenge}
                </p>
              </div>

              <div className="bg-blue-50 p-4 rounded-2xl border border-blue-200 space-y-2">
                <h4 className="font-bold text-blue-900 text-sm">Design & Conversion Solution</h4>
                <p className="text-blue-950 leading-relaxed text-xs">
                  {selectedProject.demoDetails.solution}
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-bold text-slate-900 text-sm">Key Layout Highlights</h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {selectedProject.demoDetails.highlights.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                      <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-2 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="text-xs text-slate-500">
                  Like this layout structure for your business?
                </div>

                <button
                  onClick={() => {
                    const name = selectedProject.title;
                    setSelectedProject(null);
                    onOpenConsultationWithService(`Website Development based on ${name}`);
                  }}
                  className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs py-3 px-5 rounded-xl flex items-center justify-center gap-2 shadow-xs cursor-pointer"
                >
                  <PhoneCall className="w-4 h-4" />
                  <span>Request Similar Site For My Business</span>
                </button>
              </div>

            </div>

          </div>
        </div>
      )}

    </div>
  );
};
