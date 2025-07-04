import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Clock, DollarSign, Building, Star } from 'lucide-react';
import { Job } from '../../types';

interface JobCardProps {
  job: Job;
}

export function JobCard({ job }: JobCardProps) {
  const formatSalary = (salary: string) => {
    return salary || 'Salary not disclosed';
  };

  const getJobTypeColor = (type: string) => {
    const colors = {
      'full-time': 'bg-green-100 text-green-800',
      'part-time': 'bg-blue-100 text-blue-800',
      'contract': 'bg-purple-100 text-purple-800',
      'internship': 'bg-orange-100 text-orange-800',
    };
    return colors[type as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200 group">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              {job.is_featured && (
                <div className="flex items-center space-x-1 bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium">
                  <Star className="w-3 h-3" />
                  <span>Featured</span>
                </div>
              )}
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getJobTypeColor(job.type)}`}>
                {job.type.charAt(0).toUpperCase() + job.type.slice(1)}
              </span>
            </div>
            
            <Link 
              to={`/jobs/${job.id}`}
              className="block group-hover:text-blue-600 transition-colors duration-200"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-1 line-clamp-2">
                {job.title}
              </h3>
            </Link>
            
            <div className="flex items-center space-x-1 text-gray-600 mb-2">
              <Building className="w-4 h-4" />
              <span className="font-medium">{job.company}</span>
            </div>
          </div>
        </div>

        {/* Job Details */}
        <div className="space-y-3 mb-4">
          <div className="flex items-center space-x-2 text-gray-600">
            <MapPin className="w-4 h-4" />
            <span className="text-sm">{job.location}</span>
          </div>
          
          <div className="flex items-center space-x-2 text-gray-600">
            <DollarSign className="w-4 h-4" />
            <span className="text-sm">{formatSalary(job.salary_range)}</span>
          </div>
          
          <div className="flex items-center space-x-2 text-gray-600">
            <Clock className="w-4 h-4" />
            <span className="text-sm">
              Posted {new Date(job.created_at).toLocaleDateString()}
            </span>
          </div>
        </div>

        {/* Description Preview */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {job.description}
        </p>

        {/* Skills/Requirements Preview */}
        {job.requirements && job.requirements.length > 0 && (
          <div className="mb-4">
            <div className="flex flex-wrap gap-2">
              {job.requirements.slice(0, 3).map((requirement, index) => (
                <span
                  key={index}
                  className="bg-gray-100 text-gray-700 px-2 py-1 rounded-md text-xs"
                >
                  {requirement}
                </span>
              ))}
              {job.requirements.length > 3 && (
                <span className="bg-gray-100 text-gray-500 px-2 py-1 rounded-md text-xs">
                  +{job.requirements.length - 3} more
                </span>
              )}
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <Link
            to={`/jobs/${job.id}`}
            className="text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors duration-200"
          >
            View Details
          </Link>
          
          <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 text-sm font-medium">
            Apply Now
          </button>
        </div>
      </div>
    </div>
  );
}