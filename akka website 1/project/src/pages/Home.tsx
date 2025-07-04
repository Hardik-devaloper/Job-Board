import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Users, Building, Award, ArrowRight, CheckCircle, Star, Briefcase } from 'lucide-react';
import { SearchBar } from '../components/common/SearchBar';
import { JobCard } from '../components/jobs/JobCard';
import { Button } from '../components/common/Button';
import { supabase } from '../lib/supabase';
import { Job } from '../types';

export function Home() {
  const [featuredJobs, setFeaturedJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeaturedJobs();
  }, []);

  const fetchFeaturedJobs = async () => {
    try {
      const { data, error } = await supabase
        .from('jobs')
        .select('*')
        .eq('is_featured', true)
        .limit(6)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching featured jobs:', error);
        // Use mock data for now
        setFeaturedJobs(getMockJobs());
      } else {
        setFeaturedJobs(data || getMockJobs());
      }
    } catch (error) {
      console.error('Error:', error);
      setFeaturedJobs(getMockJobs());
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
      description: 'Join our dynamic team building cutting-edge web applications...',
      requirements: ['React', 'TypeScript', 'Node.js'],
      benefits: ['Health Insurance', 'Remote Work', '401k'],
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
      description: 'Create beautiful and intuitive user experiences...',
      requirements: ['Figma', 'Adobe Creative Suite', 'User Research'],
      benefits: ['Health Insurance', 'Flexible Hours', 'Professional Development'],
      is_featured: true,
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
      description: 'Lead product development and strategy...',
      requirements: ['Product Management', 'Analytics', 'Agile'],
      benefits: ['Equity', 'Health Insurance', 'Remote Work'],
      is_featured: true,
      employer_id: '3',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
  ];

  const handleSearch = (query: string, location: string) => {
    // Navigate to jobs page with search parameters
    const params = new URLSearchParams();
    if (query) params.set('q', query);
    if (location) params.set('location', location);
    window.location.href = `/jobs?${params.toString()}`;
  };

  const stats = [
    { icon: Briefcase, label: 'Active Jobs', value: '12,543' },
    { icon: Users, label: 'Registered Users', value: '45,678' },
    { icon: Building, label: 'Companies', value: '2,134' },
    { icon: Award, label: 'Success Stories', value: '8,901' },
  ];

  const features = [
    {
      icon: Search,
      title: 'Smart Job Search',
      description: 'Find your perfect job with our advanced search and filtering system.',
    },
    {
      icon: Users,
      title: 'Top Employers',
      description: 'Connect with leading companies looking for talented professionals.',
    },
    {
      icon: CheckCircle,
      title: 'Easy Apply',
      description: 'Apply to multiple jobs with just one click using your saved profile.',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Find Your{' '}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Dream Job
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Connect with top employers and discover opportunities that match your skills and passion. 
              Start your career journey today.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-4xl mx-auto mb-8">
              <SearchBar onSearch={handleSearch} />
            </div>
            
            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="bg-gradient-to-r from-blue-600 to-purple-600 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                  <div className="text-gray-600 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Jobs Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Jobs</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover hand-picked opportunities from top companies actively hiring talented professionals.
            </p>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {featuredJobs.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          )}

          <div className="text-center">
            <Link to="/jobs">
              <Button size="lg" icon={ArrowRight} iconPosition="right">
                View All Jobs
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose JobBoard Pro?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We make job searching and hiring simple, efficient, and effective for everyone.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center p-6 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors duration-200">
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Get Started?</h2>
          <p className="text-blue-100 text-lg mb-8">
            Join thousands of professionals who have found their dream jobs through our platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/auth?signup=true&role=candidate">
              <Button variant="secondary" size="lg">
                Find Jobs
              </Button>
            </Link>
            <Link to="/auth?signup=true&role=employer">
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-blue-600">
                Hire Talent
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}