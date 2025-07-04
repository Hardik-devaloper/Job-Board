import React, { useEffect, useState } from 'react';
import { Filter, SortDesc, Grid, List } from 'lucide-react';
import { SearchBar } from '../components/common/SearchBar';
import { JobCard } from '../components/jobs/JobCard';
import { Button } from '../components/common/Button';
import { supabase } from '../lib/supabase';
import { Job } from '../types';

export function Jobs() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filters, setFilters] = useState({
    type: '',
    location: '',
    salaryRange: '',
  });

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const { data, error } = await supabase
        .from('jobs')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching jobs:', error);
        setJobs(getMockJobs());
      } else {
        setJobs(data || getMockJobs());
      }
    } catch (error) {
      console.error('Error:', error);
      setJobs(getMockJobs());
    } finally {
      setLoading(false);
    }
  };

  const getMockJobs = (): Job[] => [
    {
      id: '1',
      title: 'Senior Frontend Developer',
      company: 'TechCorp',
      location: 'San Francisco, CA',
      type: 'full-time',
      salary_range: '$120k - $160k',
      description: 'Join our dynamic team building cutting-edge web applications using React, TypeScript, and modern development practices.',
      requirements: ['React', 'TypeScript', 'Node.js', 'GraphQL'],
      benefits: ['Health Insurance', 'Remote Work', '401k', 'Stock Options'],
      is_featured: true,
      employer_id: '1',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: '2',
      title: 'UX/UI Designer',
      company: 'Design Studio',
      location: 'New York, NY',
      type: 'full-time',
      salary_range: '$90k - $120k',
      description: 'Create beautiful and intuitive user experiences for our digital products. Work with cross-functional teams to deliver exceptional design solutions.',
      requirements: ['Figma', 'Adobe Creative Suite', 'User Research', 'Prototyping'],
      benefits: ['Health Insurance', 'Flexible Hours', 'Professional Development', 'Creative Freedom'],
      is_featured: false,
      employer_id: '2',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: '3',
      title: 'Product Manager',
      company: 'InnovateCo',
      location: 'Austin, TX',
      type: 'full-time',
      salary_range: '$130k - $170k',
      description: 'Lead product development and strategy for our flagship products. Drive cross-functional collaboration and deliver impactful features.',
      requirements: ['Product Management', 'Analytics', 'Agile', 'Roadmapping'],
      benefits: ['Equity', 'Health Insurance', 'Remote Work', 'Learning Budget'],
      is_featured: true,
      employer_id: '3',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: '4',
      title: 'Backend Engineer',
      company: 'CloudTech',
      location: 'Seattle, WA',
      type: 'full-time',
      salary_range: '$110k - $150k',
      description: 'Build scalable backend systems and APIs. Work with modern cloud technologies and distributed systems.',
      requirements: ['Python', 'AWS', 'Docker', 'Microservices'],
      benefits: ['Health Insurance', 'Stock Options', 'Flexible PTO', 'Remote Work'],
      is_featured: false,
      employer_id: '4',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: '5',
      title: 'Data Scientist',
      company: 'AI Innovations',
      location: 'Boston, MA',
      type: 'full-time',
      salary_range: '$125k - $165k',
      description: 'Apply machine learning and statistical analysis to solve complex business problems. Work with large datasets and build predictive models.',
      requirements: ['Python', 'Machine Learning', 'SQL', 'Statistics'],
      benefits: ['Health Insurance', 'Research Time', 'Conference Budget', 'Stock Options'],
      is_featured: false,
      employer_id: '5',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: '6',
      title: 'DevOps Engineer',
      company: 'Infrastructure Pro',
      location: 'Denver, CO',
      type: 'full-time',
      salary_range: '$115k - $155k',
      description: 'Manage and improve our infrastructure and deployment pipelines. Ensure high availability and performance of our systems.',
      requirements: ['Kubernetes', 'AWS', 'Terraform', 'CI/CD'],
      benefits: ['Health Insurance', 'Remote Work', '401k', 'Flexible Hours'],
      is_featured: false,
      employer_id: '6',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
  ];

  const handleSearch = (query: string, location: string) => {
    // Filter jobs based on search criteria
    let filteredJobs = getMockJobs();
    
    if (query) {
      filteredJobs = filteredJobs.filter(job =>
        job.title.toLowerCase().includes(query.toLowerCase()) ||
        job.company.toLowerCase().includes(query.toLowerCase()) ||
        job.description.toLowerCase().includes(query.toLowerCase())
      );
    }
    
    if (location) {
      filteredJobs = filteredJobs.filter(job =>
        job.location.toLowerCase().includes(location.toLowerCase())
      );
    }
    
    setJobs(filteredJobs);
  };

  const jobTypes = ['full-time', 'part-time', 'contract', 'internship'];
  const locations = ['San Francisco, CA', 'New York, NY', 'Austin, TX', 'Seattle, WA', 'Boston, MA', 'Denver, CO'];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Find Your Next Job</h1>
          <p className="text-gray-600">Discover opportunities that match your skills and interests</p>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <SearchBar onSearch={handleSearch} />
        </div>

        {/* Filters and View Toggle */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar Filters */}
          <div className="lg:w-64 space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Filter className="w-5 h-5 mr-2" />
                Filters
              </h3>
              
              {/* Job Type Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Job Type</label>
                <select
                  value={filters.type}
                  onChange={(e) => setFilters({ ...filters, type: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">All Types</option>
                  {jobTypes.map(type => (
                    <option key={type} value={type}>
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              {/* Location Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                <select
                  value={filters.location}
                  onChange={(e) => setFilters({ ...filters, location: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">All Locations</option>
                  {locations.map(location => (
                    <option key={location} value={location}>{location}</option>
                  ))}
                </select>
              </div>

              {/* Salary Range Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Salary Range</label>
                <select
                  value={filters.salaryRange}
                  onChange={(e) => setFilters({ ...filters, salaryRange: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Any Salary</option>
                  <option value="0-75k">$0 - $75k</option>
                  <option value="75k-100k">$75k - $100k</option>
                  <option value="100k-150k">$100k - $150k</option>
                  <option value="150k+">$150k+</option>
                </select>
              </div>

              <Button variant="outline" className="w-full">
                Clear Filters
              </Button>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Results Header */}
            <div className="flex items-center justify-between mb-6 bg-white p-4 rounded-xl shadow-md border border-gray-200">
              <div className="flex items-center space-x-4">
                <span className="text-gray-700 font-medium">
                  {jobs.length} jobs found
                </span>
                <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm">
                  <option>Sort by: Most Recent</option>
                  <option>Sort by: Salary (High to Low)</option>
                  <option>Sort by: Salary (Low to High)</option>
                  <option>Sort by: Company A-Z</option>
                </select>
              </div>
              
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg transition-colors duration-200 ${
                    viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <Grid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg transition-colors duration-200 ${
                    viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Job Listings */}
            {loading ? (
              <div className={`grid ${viewMode === 'grid' ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1'} gap-6`}>
                {[...Array(6)].map((_, index) => (
                  <div key={index} className="bg-white rounded-xl shadow-md border border-gray-200 p-6 animate-pulse">
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-3"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2 mb-4"></div>
                    <div className="space-y-2">
                      <div className="h-3 bg-gray-200 rounded"></div>
                      <div className="h-3 bg-gray-200 rounded w-5/6"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className={`grid ${viewMode === 'grid' ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1'} gap-6`}>
                {jobs.map((job) => (
                  <JobCard key={job.id} job={job} />
                ))}
              </div>
            )}

            {jobs.length === 0 && !loading && (
              <div className="text-center py-12">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <SortDesc className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No jobs found</h3>
                <p className="text-gray-600 mb-4">Try adjusting your search criteria or filters</p>
                <Button onClick={() => setJobs(getMockJobs())}>
                  Show All Jobs
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}