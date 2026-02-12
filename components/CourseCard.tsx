import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, MapPin, Users } from 'lucide-react';
import { Course } from '../types';

interface CourseCardProps {
  course: Course;
}

export const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  const isWatsonx = course.containsWatsonx;
  
  return (
    <Link 
      to={`/course/${course.id}`}
      className="block bg-white border border-gray-200 hover:border-ibm-blue hover:shadow-lg transition-all duration-200 h-full flex flex-col group"
    >
      <div className="p-5 flex-grow">
        <div className="flex justify-between items-start mb-3">
          <span className={`text-xs font-bold px-2 py-1 uppercase tracking-wider ${
            course.focusArea === 'Automation' ? 'bg-purple-100 text-purple-800' :
            course.focusArea === 'Data and AI' ? 'bg-blue-100 text-blue-800' :
            course.focusArea === 'Security' ? 'bg-red-100 text-red-800' :
            'bg-gray-100 text-gray-800'
          }`}>
            {course.focusArea}
          </span>
          {isWatsonx && (
            <span className="text-[10px] font-bold px-2 py-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full">
              watsonx
            </span>
          )}
        </div>
        
        <h3 className="text-lg font-medium text-gray-900 mb-4 group-hover:text-ibm-blue line-clamp-2 min-h-[3.5rem]">
          {course.name}
        </h3>

        <div className="space-y-2 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-gray-400" />
            <span>{course.startDate}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-gray-400" />
            <span>{course.duration}</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-gray-400" />
            <span className="truncate">{course.audience}</span>
          </div>
        </div>
      </div>
      
      <div className="bg-gray-50 px-5 py-3 border-t border-gray-100 flex justify-between items-center text-sm">
        <span className="text-gray-500">ID: {course.number}</span>
        <span className="text-ibm-blue font-medium flex items-center gap-1 group-hover:translate-x-1 transition-transform">
          Register →
        </span>
      </div>
    </Link>
  );
};