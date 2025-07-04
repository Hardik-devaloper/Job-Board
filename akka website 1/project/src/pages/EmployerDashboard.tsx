import React, { useState } from 'react';
import { 
  Plus, 
  Building, 
  Users, 
  FileText, 
  Settings, 
  Edit3,
  Eye,
  MoreHorizontal,
  Calendar,
  MapPin,
  DollarSign
} from 'lucide-react';
import { Button } from '../components/common/Button';
import { useAuth } from '../contexts/AuthContext';

export function EmployerDashboard() {
  const { userProfile } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  const stats = [
    { label: 'Active Jobs', value: '5', icon: FileText, color: 'bg-blue-500' },
    { label: 'Total Applications', value: '142', icon: Users, color: 'bg-green-500' },
    { label: 'Candidates Hired', value: '8', icon: Building, color: 'bg-purple-500' },
    { label: 'Interview Scheduled', value: '12', icon: Calendar, color: 'bg-orange-500' },
  ];

  const jobs = [
    {
      id: '1',
      title: 'Senior Frontend Developer',
      location: 'San Francisco, CA',
      type: 'Full-time',
      salary: '$120k - $160k',
      applications: 24,
      status: 'active',
      postedDate: '2024-01-15',
    },
    {
      id: '2',
      title: 'Product Manager',
      location: 'New York, NY',
      type: 'Full-time',
      salary: '$130k - $170k',
      applications: 18,
      status: 'active',
      postedDate: '2024-01-12',
    },
    {
      id: '3',
      title: 'UX Designer',
      location: 'Austin, TX',
      type: 'Full-time',
      salary: '$90k - $120k',
      applications: 31,
      status: 'paused',
      postedDate: '2024-01-10',
    },
  ];

  const recentApplications = [
    {
      id: '1',
      candidateName: 'Sarah Johnson',
      jobTitle: 'Senior Frontend Developer',
      appliedDate: '2024-01-20',
      status: 'pending',
      experience: '5 years',
    },
    {
      id: '2',
      candidateName: 'Michael Chen',
      jobTitle: 'Product Manager',
      appliedDate: '2024-01-19',
      status: 'reviewed',
      experience: '7 years',
    },
    {
      id: '3',
      candidateName: 'Emily Davis',
      jobTitle: 'UX Designer',
      appliedDate: '2024-01-18',
      status: 'interviewed',
      experience: '4 years',
    },
  ];

  const getStatusColor = (status: string) => {
    const colors = {
      active: 'bg-green-100 text-green-800',
      paused: 'bg-yellow-100 text-yellow-800',
      closed: 'bg-red-100 text-red-800',
      pending: 'bg-yellow-100 text-yellow-800',
      reviewed: 'bg-blue-100 text-blue-800',
      interviewed: 'bg-purple-100 text-purple-800',
      hired: 'bg-green-100 text-green-800',
      rejected: 'bg-red-100 text-red-800',
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Building },
    { id: 'jobs', label: 'Job Postings', icon: FileText },
    { id: 'applications', label: 'Applications', icon: Users },
    { id: 'company', label: 'Company Profile', icon: Building },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Employer Dashboard
              </h1>
              <p className="text-gray-600">Manage your job postings and applications</p>
            </div>
            <Button icon={Plus} size="lg">
              Post New Job
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Building className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">TechCorp</h3>
                <p className="text-sm text-gray-600">Technology Company</p>
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
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {stats.map((stat, index) => (
                    <div key={index} className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
                      <div className="flex items-center">
                        <div className={`${stat.color} p-3 rounded-lg`}>
                          <stat.icon className="w-6 h-6 text-white" />
                        </div>
                        <div className="ml-4">
                          <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                          <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Recent Activity */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Recent Applications */}
                  <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-xl font-semibold text-gray-900">Recent Applications</h3>
                      <Button variant="outline" size="sm">View All</Button>
                    </div>

                    <div className="space-y-4">
                      {recentApplications.map((application) => (
                        <div key={application.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                          <div>
                            <p className="font-medium text-gray-900">{application.candidateName}</p>
                            <p className="text-sm text-gray-600">{application.jobTitle}</p>
                            <p className="text-xs text-gray-500">{application.experience} experience</p>
                          </div>
                          <div className="text-right">
                            <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(application.status)}`}>
                              {application.status}
                            </span>
                            <p className="text-xs text-gray-500 mt-1">
                              {new Date(application.appliedDate).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Active Jobs */}
                  <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-xl font-semibold text-gray-900">Active Job Postings</h3>
                      <Button variant="outline" size="sm">Manage Jobs</Button>
                    </div>

                    <div className="space-y-4">
                      {jobs.filter(job => job.status === 'active').map((job) => (
                        <div key={job.id} className="p-3 border border-gray-200 rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium text-gray-900">{job.title}</h4>
                            <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                              {job.applications} applications
                            </span>
                          </div>
                          <p className="text-sm text-gray-600">{job.location}</p>
                          <p className="text-sm text-gray-500">Posted {new Date(job.postedDate).toLocaleDateString()}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'jobs' && (
              <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Job Postings</h2>
                  <Button icon={Plus}>Post New Job</Button>
                </div>

                <div className="space-y-4">
                  {jobs.map((job) => (
                    <div key={job.id} className="border border-gray-200 rounded-lg p-6 hover:bg-gray-50 transition-colors duration-200">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="text-lg font-semibold text-gray-900">{job.title}</h3>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(job.status)}`}>
                              {job.status}
                            </span>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm text-gray-600">
                            <div className="flex items-center space-x-1">
                              <MapPin className="w-4 h-4" />
                              <span>{job.location}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Building className="w-4 h-4" />
                              <span>{job.type}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <DollarSign className="w-4 h-4" />
                              <span>{job.salary}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Users className="w-4 h-4" />
                              <span>{job.applications} applications</span>
                            </div>
                          </div>
                          
                          <p className="text-sm text-gray-500 mt-2">
                            Posted on {new Date(job.postedDate).toLocaleDateString()}
                          </p>
                        </div>

                        <div className="flex items-center space-x-3">
                          <Button variant="outline" size="sm" icon={Eye}>
                            View
                          </Button>
                          <Button variant="outline" size="sm" icon={Edit3}>
                            Edit
                          </Button>
                          <button className="p-2 text-gray-400 hover:text-gray-600">
                            <MoreHorizontal className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'applications' && (
              <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">All Applications</h2>

                <div className="space-y-4">
                  {recentApplications.map((application) => (
                    <div key={application.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors duration-200">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-900 mb-1">
                            {application.candidateName}
                          </h3>
                          <p className="text-gray-600 mb-1">Applied for: {application.jobTitle}</p>
                          <p className="text-sm text-gray-500">
                            {application.experience} experience • Applied {new Date(application.appliedDate).toLocaleDateString()}
                          </p>
                        </div>

                        <div className="flex items-center space-x-4">
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(application.status)}`}>
                            {application.status}
                          </span>
                          
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">
                              View Resume
                            </Button>
                            <Button size="sm">
                              Review
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'company' && (
              <div className="space-y-6">
                <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">Company Profile</h2>
                    <Button icon={Edit3} variant="outline">Edit Profile</Button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
                      <p className="text-gray-900">TechCorp</p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Industry</label>
                      <p className="text-gray-900">Technology</p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Company Size</label>
                      <p className="text-gray-900">201-500 employees</p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                      <p className="text-gray-900">San Francisco, CA</p>
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Company Description</label>
                      <p className="text-gray-900">
                        TechCorp is a leading technology company focused on building innovative solutions 
                        that transform how businesses operate. We're passionate about creating products 
                        that make a real difference in people's lives.
                      </p>
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
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Notification Preferences</h3>
                      <div className="space-y-3">
                        <label className="flex items-center">
                          <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" defaultChecked />
                          <span className="ml-2 text-gray-700">New applications</span>
                        </label>
                        <label className="flex items-center">
                          <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" defaultChecked />
                          <span className="ml-2 text-gray-700">Application status updates</span>
                        </label>
                        <label className="flex items-center">
                          <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                          <span className="ml-2 text-gray-700">Weekly hiring reports</span>
                        </label>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Billing Information</h3>
                      <div className="bg-gray-50 rounded-lg p-4">
                        <p className="text-gray-700 mb-2">Current Plan: <span className="font-medium">Professional</span></p>
                        <p className="text-gray-600 text-sm">Next billing date: February 15, 2024</p>
                        <Button variant="outline" className="mt-3">Manage Billing</Button>
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