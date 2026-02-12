import React, { useState, useMemo } from 'react';
import { courses } from '../data';
import { CourseCard } from '../components/CourseCard';
import { FocusArea } from '../types';
import { Search } from 'lucide-react';

export const Home: React.FC = () => {
  const [selectedFocus, setSelectedFocus] = useState<FocusArea>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCourses = useMemo(() => {
    return courses.filter(course => {
      const matchesFocus = selectedFocus === 'All' || course.focusArea === selectedFocus;
      const matchesSearch = course.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            course.number.includes(searchQuery);
      return matchesFocus && matchesSearch;
    });
  }, [selectedFocus, searchQuery]);

  const focusAreas: FocusArea[] = ['All', 'Automation', 'Data and AI', 'Z', 'Security', 'PowerVS', 'Power11'];

  return (
    <div className="min-h-screen pb-20">
      <div className="bg-ibm-dark text-white py-12 px-6">
        <div className="container mx-auto">
          <h1 className="text-4xl md:text-5xl font-light mb-4">Explore SPGI Training</h1>
          <p className="text-gray-300 max-w-2xl text-lg">
            Discover technical workshops, enablement sessions, and user groups scheduled for 2026 across SPGI markets.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-6 -mt-8">
        <div className="bg-white p-6 shadow-md border border-gray-200">
          <div className="flex flex-col md:flex-row gap-6 justify-between items-center">
            
            <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 hide-scrollbar">
              {focusAreas.map(area => (
                <button
                  key={area}
                  onClick={() => setSelectedFocus(area)}
                  className={`px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors ${
                    selectedFocus === area
                      ? 'bg-ibm-blue text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {area}
                </button>
              ))}
            </div>

            <div className="relative w-full md:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search courses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 focus:outline-none focus:border-ibm-blue focus:ring-1 focus:ring-ibm-blue transition-all"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 mt-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-light text-gray-900">
            {filteredCourses.length} {filteredCourses.length === 1 ? 'Result' : 'Results'}
          </h2>
        </div>

        {filteredCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredCourses.map(course => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white border border-dashed border-gray-300">
            <p className="text-gray-500 text-lg">No courses found matching your criteria.</p>
            <button 
              onClick={() => {setSelectedFocus('All'); setSearchQuery('');}}
              className="mt-4 text-ibm-blue hover:underline"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};