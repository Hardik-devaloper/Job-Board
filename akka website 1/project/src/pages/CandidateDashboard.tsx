import React, { useState } from 'react';
import { 
  User, 
  FileText, 
  Bookmark, 
  Bell, 
  Settings, 
  Upload,
  Edit3,
  Eye,
  CheckCircle,
  Clock,
  X
} from 'lucide-react';
import { Button } from '../components/common/Button';
import { useAuth } from '../contexts/AuthContext';

export function CandidateDashboard() {
  const { userProfile } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');

  const applications = [
    {
      id: '1',
      jobTitle: 'Senior Frontend Developer',
      company: 'TechCorp',
      status: 'pending',
      appliedDate: '2024-01-15',
      salary: '$120k - $160k',
    },
    {
      id: '2',
      jobTitle: 'React Developer',
      company: 'StartupCo',
      status: 'reviewed',
      appliedDate: '2024-01-12',
      salary: '$90k - $130k',
    },
    {
      id: '3',
      jobTitle: 'Full Stack Developer',
      company: 'BigTech',
      status: 'rejected',
      appliedDate: '2024-01-10',
      salary: '$140k - $180k',
    },
  ];

  const savedJobs = [
    {
      id: '1',
      title: 'UX Designer',
      company: 'Design Studio',
      location: 'New York, NY',
      salary: '$85k - $115k',
      type: 'full-time',
    },
    {
      id: '2',
      title: 'Product Manager',
      company: 'InnovateCo',
      location: 'Austin, TX',
      salary: '$130k - $170k',
      type: 'full-time',
    },
  ];

  const getStatusColor = (status: string) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800',
      reviewed: 'bg-blue-100 text-blue-800',
      accepted: 'bg-green-100 text-green-800',
      rejected: 'bg-red-100 text-red-800',
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-4 h-4" />;
      case 'reviewed':
        return <Eye className="w-4 h-4" />;
      case 'accepted':
        return <CheckCircle className="w-4 h-4" />;
      case 'rejected':
        return <X className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'applications', label: 'My Applications', icon: FileText },
    { id: 'saved', label: 'Saved Jobs', icon: Bookmark },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {userProfile?.full_name || 'User'}!
          </h1>
          <p className="text-gray-600">Manage your job search and track your applications</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {userProfile?.full_name || 'User'}
                </h3>
                <p className="text-sm text-gray-600">Software Developer</p>
              </div>

              <nav className="space-y-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors duration-200 ${
                      activeTab === tab.id
                        ? 'bg-blue-50 text-blue-600 border-l-4 border-blue-600'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <tab.icon className="w-5 h-5" />
                    <span className="font-medium">{tab.label}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {activeTab === 'profile' && (
              <div className="space-y-6">
                {/* Profile Header */}
                <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">Profile Information</h2>
                    <Button icon={Edit3} variant="outline">
                      Edit Profile
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name
                      </label>
                      <p className="text-gray-900">{userProfile?.full_name || 'Not provided'}</p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email
                      </label>
                      <p className="text-gray-900">{userProfile?.email || 'Not provided'}</p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Phone
                      </label>
                      <p className="text-gray-900">+1 (555) 123-4567</p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Location
                      </label>
                      <p className="text-gray-900">San Francisco, CA</p>
                    </div>
                  </div>
                </div>

                {/* Resume Section */}
                <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-semibold text-gray-900">Resume</h3>
                    <Button icon={Upload} variant="outline">
                      Upload Resume
                    </Button>
                  </div>

                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                    <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 mb-2">No resume uploaded yet</p>
                    <p className="text-sm text-gray-500">Upload your resume to apply for jobs quickly</p>
                  </div>
                </div>

                {/* Skills Section */}
                <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-semibold text-gray-900">Skills</h3>
                    <Button icon={Edit3} variant="outline">
                      Edit Skills
                    </Button>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {['React', 'TypeScript', 'Node.js', 'Python', 'AWS', 'Docker'].map((skill) => (
                      <span
                        key={skill}
                        className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'applications' && (
              <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">My Applications</h2>

                <div className="space-y-4">
                  {applications.map((application) => (
                    <div
                      key={application.id}
                      className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors duration-200"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-900 mb-1">
                            {application.jobTitle}
                          </h3>
                          <p className="text-gray-600 mb-2">{application.company}</p>
                          <p className="text-sm text-gray-500">
                            Applied on {new Date(application.appliedDate).toLocaleDateString()}
                          </p>
                          <p className="text-sm font-medium text-gray-700 mt-1">
                            {application.salary}
                          </p>
                        </div>

                        <div className="flex items-center space-x-4">
                          <div className={`flex items-center space-x-2 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(application.status)}`}>
                            {getStatusIcon(application.status)}
                            <span className="capitalize">{application.status}</span>
                          </div>
                          
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {applications.length === 0 && (
                  <div className="text-center py-12">
                    <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No applications yet</h3>
                    <p className="text-gray-600 mb-4">Start applying to jobs to see your applications here</p>
                    <Button>Browse Jobs</Button>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'saved' && (
              <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Saved Jobs</h2>

                <div className="space-y-4">
                  {savedJobs.map((job) => (
                    <div
                      key={job.id}
                      className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors duration-200"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-900 mb-1">
                            {job.title}
                          </h3>
                          <p className="text-gray-600 mb-1">{job.company}</p>
                          <p className="text-sm text-gray-500">{job.location}</p>
                          <p className="text-sm font-medium text-gray-700 mt-1">
                            {job.salary}
                          </p>
                        </div>

                        <div className="flex items-center space-x-3">
                          <Button variant="outline" size="sm">
                            View Job
                          </Button>
                          <Button size="sm">
                            Apply Now
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {savedJobs.length === 0 && (
                  <div className="text-center py-12">
                    <Bookmark className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No saved jobs</h3>
                    <p className="text-gray-600 mb-4">Save jobs you're interested in to view them later</p>
                    <Button>Browse Jobs</Button>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'notifications' && (
              <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Notifications</h2>

                <div className="space-y-4">
                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                      <div className="flex-1">
                        <p className="text-gray-900 font-medium">New job recommendation</p>
                        <p className="text-gray-600 text-sm">
                          Based on your profile, we found 3 new jobs that match your skills
                        </p>
                        <p className="text-gray-500 text-xs mt-1">2 hours ago</p>
                      </div>
                    </div>
                  </div>

                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                      <div className="flex-1">
                        <p className="text-gray-900 font-medium">Application status update</p>
                        <p className="text-gray-600 text-sm">
                          Your application for Frontend Developer at TechCorp has been reviewed
                        </p>
                        <p className="text-gray-500 text-xs mt-1">1 day ago</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="space-y-6">
                <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Account Settings</h2>

                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Email Preferences</h3>
                      <div className="space-y-3">
                        <label className="flex items-center">
                          <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" defaultChecked />
                          <span className="ml-2 text-gray-700">Job recommendations</span>
                        </label>
                        <label className="flex items-center">
                          <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" defaultChecked />
                          <span className="ml-2 text-gray-700">Application status updates</span>
                        </label>
                        <label className="flex items-center">
                          <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                          <span className="ml-2 text-gray-700">Weekly job digest</span>
                        </label>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Privacy Settings</h3>
                      <div className="space-y-3">
                        <label className="flex items-center">
                          <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" defaultChecked />
                          <span className="ml-2 text-gray-700">Make profile visible to employers</span>
                        </label>
                        <label className="flex items-center">
                          <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                          <span className="ml-2 text-gray-700">Allow employers to contact me directly</span>
                        </label>
                      </div>
                    </div>

                    <div className="pt-6 border-t border-gray-200">
                      <Button variant="outline" className="text-red-600 border-red-300 hover:bg-red-50">
                        Delete Account
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}