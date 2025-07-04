import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  MapPin, 
  Clock, 
  DollarSign, 
  Building, 
  Star, 
  Share2, 
  Bookmark,
  ArrowLeft,
  CheckCircle,
  Users,
  Calendar
} from 'lucide-react';
import { Button } from '../components/common/Button';
import { useAuth } from '../contexts/AuthContext';
import { Job } from '../types';

export function JobDetail() {
  const { id } = useParams<{ id: string }>();
  const { user, userProfile } = useAuth();
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [isApplying, setIsApplying] = useState(false);

  useEffect(() => {
    if (id) {
      fetchJob(id);
    }
  }, [id]);

  const fetchJob = async (jobId: string) => {
    try {
      // For now, use mock data
      const mockJob: Job = {
        id: jobId,
        title: 'Senior Frontend Developer',
        company: 'TechCorp',
        location: 'San Francisco, CA',
        type: 'full-time',
        salary_range: '$120k - $160k',
        description: `We are seeking a passionate Senior Frontend Developer to join our growing team. You will be responsible for building user-facing features and ensuring the technical feasibility of UI/UX designs.

In this role, you'll work closely with our design and backend teams to create seamless user experiences. We value clean code, performance optimization, and staying up-to-date with the latest web technologies.

Key Responsibilities:
• Develop new user-facing features using React and TypeScript
• Build reusable components and front-end libraries for future use
• Ensure the technical feasibility of UI/UX designs
• Optimize applications for maximum speed and scalability
• Collaborate with team members and stakeholders`,
        requirements: [
          'React',
          'TypeScript',
          'Node.js',
          'GraphQL',
          'HTML/CSS',
          'Git',
          'REST APIs',
          'Testing (Jest, Cypress)'
        ],
        benefits: [
          'Health, dental, and vision insurance',
          'Flexible work arrangements (remote/hybrid)',
          '401(k) with company matching',
          'Stock options',
          'Professional development budget',
          'Unlimited PTO',
          'Top-tier equipment',
          'Catered lunches'
        ],
        is_featured: true,
        employer_id: '1',
        created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        updated_at: new Date().toISOString(),
      };
      
      setJob(mockJob);
    } catch (error) {
      console.error('Error fetching job:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleApply = async () => {
    if (!user) {
      // Redirect to auth page
      window.location.href = '/auth?redirect=/jobs/' + id;
      return;
    }

    setIsApplying(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      alert('Application submitted successfully!');
    } catch (error) {
      console.error('Error applying:', error);
    } finally {
      setIsApplying(false);
    }
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
            <div className="bg-white rounded-xl shadow-md p-8">
              <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2 mb-6"></div>
              <div className="space-y-4">
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                <div className="h-4 bg-gray-200 rounded w-4/6"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Job not found</h1>
          <p className="text-gray-600 mb-8">The job you're looking for doesn't exist or has been removed.</p>
          <Link to="/jobs">
            <Button>
              Back to Jobs
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Link 
          to="/jobs"
          className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-8 transition-colors duration-200"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Jobs
        </Link>

        {/* Job Header */}
        <div className="bg-white rounded-xl shadow-md border border-gray-200 p-8 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-4">
                {job.is_featured && (
                  <div className="flex items-center space-x-1 bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
                    <Star className="w-4 h-4" />
                    <span>Featured</span>
                  </div>
                )}
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getJobTypeColor(job.type)}`}>
                  {job.type.charAt(0).toUpperCase() + job.type.slice(1)}
                </span>
              </div>
              
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{job.title}</h1>
              
              <div className="flex items-center space-x-2 text-gray-600 mb-4">
                <Building className="w-5 h-5" />
                <span className="text-lg font-medium">{job.company}</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-gray-600">
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4" />
                  <span>{job.location}</span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <DollarSign className="w-4 h-4" />
                  <span>{job.salary_range}</span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4" />
                  <span>Posted {new Date(job.created_at).toLocaleDateString()}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 mt-6 lg:mt-0">
              <Button variant="outline" icon={Share2}>
                Share
              </Button>
              <Button variant="outline" icon={Bookmark}>
                Save
              </Button>
              <Button 
                onClick={handleApply}
                loading={isApplying}
                size="lg"
                className="px-8"
              >
                Apply Now
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Job Description */}
            <div className="bg-white rounded-xl shadow-md border border-gray-200 p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Job Description</h2>
              <div className="prose prose-gray max-w-none">
                {job.description.split('\n').map((paragraph, index) => (
                  <p key={index} className="mb-4 text-gray-700 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            {/* Requirements */}
            <div className="bg-white rounded-xl shadow-md border border-gray-200 p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Requirements</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {job.requirements.map((requirement, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">{requirement}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Benefits */}
            <div className="bg-white rounded-xl shadow-md border border-gray-200 p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Benefits & Perks</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {job.benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-blue-500 flex-shrink-0" />
                    <span className="text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Apply Card */}
            <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Ready to Apply?</h3>
              <p className="text-gray-600 text-sm mb-6">
                Submit your application and we'll get back to you within 2-3 business days.
              </p>
              <Button 
                onClick={handleApply}
                loading={isApplying}
                className="w-full mb-3"
              >
                Apply for this Job
              </Button>
              {!user && (
                <p className="text-xs text-gray-500 text-center">
                  <Link to="/auth" className="text-blue-600 hover:underline">
                    Sign in
                  </Link> to save your application progress
                </p>
              )}
            </div>

            {/* Company Info */}
            <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">About {job.company}</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Users className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-600">Company Size</p>
                    <p className="font-medium">201-500 employees</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Building className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-600">Industry</p>
                    <p className="font-medium">Technology</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-600">Headquarters</p>
                    <p className="font-medium">San Francisco, CA</p>
                  </div>
                </div>
              </div>
              
              <Button variant="outline" className="w-full mt-6">
                View Company Profile
              </Button>
            </div>

            {/* Similar Jobs */}
            <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Similar Jobs</h3>
              <div className="space-y-4">
                {['Frontend Developer', 'React Developer', 'UI Developer'].map((title, index) => (
                  <div key={index} className="border-b border-gray-100 pb-3 last:border-b-0">
                    <h4 className="font-medium text-gray-900 hover:text-blue-600 cursor-pointer">
                      {title}
                    </h4>
                    <p className="text-sm text-gray-600">TechCorp • San Francisco, CA</p>
                  </div>
                ))}
              </div>
              
              <Link to="/jobs">
                <Button variant="outline" className="w-full mt-4">
                  View All Jobs
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}