import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Star, 
  Clock, 
  Eye, 
  Lock, 
  Heart,
  Crown, 
  Stethoscope,
  Brain,
  Bone,
  Activity,
  Shield,
  Check
} from 'lucide-react';

const HealthBlog = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showPricing, setShowPricing] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);

  const categories = [
    { id: 'all', name: 'All Categories', icon: Activity },
    { id: 'cardiology', name: 'Cardiology', icon: Heart },
    { id: 'neurology', name: 'Neurology', icon: Brain },
    { id: 'orthopedics', name: 'Orthopedics', icon: Bone },
    { id: 'general', name: 'General Medicine', icon: Stethoscope },
  ];

  const subscriptions = [
    {
      name: 'Basic',
      price: 19,
      features: [
        'Access to 5 premium articles/month',
        'Basic health recommendations',
        'Community support',
        'Mobile app access'
      ]
    },
    {
      name: 'Professional',
      price: 30,
      features: [
        'Unlimited premium articles',
        'Direct specialist consultation',
        'Personalized health plans',
        'Priority support',
        'Advanced health analytics'
      ],
      popular: true
    },
    {
      name: 'Enterprise',
      price: 50,
      features: [
        'All Professional features',
        'Team collaboration tools',
        'Custom health protocols',
        'API access',
        'Dedicated account manager'
      ]
    }
  ];

  const handlePlanSelect = (plan) => {
    setSelectedPlan(plan);
    setShowPricing(true);
  };

  const blogPosts = [
    {
      id: '1',
      title: 'Managing Hypertension: A Comprehensive Guide to Blood Pressure Control',
      excerpt: 'Learn evidence-based strategies for managing high blood pressure through lifestyle modifications, medication adherence, and regular monitoring.',
      author: {
        name: 'Dr. Sarah Johnson',
        specialty: 'Cardiologist',
        rating: 4.9,
        avatar: 'https://images.pexels.com/photos/5327580/pexels-photo-5327580.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
        verified: true
      },
      category: 'cardiology',
      readTime: 8,
      views: 2450,
      isPremium: true,
      publishedAt: '2025-01-10',
      tags: ['hypertension', 'cardiovascular', 'prevention']
    },
    {
      id: '2',
      title: 'Managing Hypertension: A Comprehensive Guide to Blood Pressure Control',
      excerpt: 'Learn evidence-based strategies for managing high blood pressure through lifestyle modifications, medication adherence, and regular monitoring.',
      author: {
        name: 'Dr. Sarah Johnson',
        specialty: 'Cardiologist',
        rating: 4.9,
        avatar: 'https://images.pexels.com/photos/5327580/pexels-photo-5327580.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
        verified: true
      },
      category: 'cardiology',
      readTime: 8,
      views: 2450,
      isPremium: true,
      publishedAt: '2025-01-10',
      tags: ['hypertension', 'cardiovascular', 'prevention']
    },
    {
      id: '3',
      title: 'Managing Hypertension: A Comprehensive Guide to Blood Pressure Control',
      excerpt: 'Learn evidence-based strategies for managing high blood pressure through lifestyle modifications, medication adherence, and regular monitoring.',
      author: {
        name: 'Dr. Sarah Johnson',
        specialty: 'Cardiologist',
        rating: 4.9,
        avatar: 'https://images.pexels.com/photos/5327580/pexels-photo-5327580.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
        verified: true
      },
      category: 'cardiology',
      readTime: 8,
      views: 2450,
      isPremium: true,
      publishedAt: '2025-01-10',
      tags: ['hypertension', 'cardiovascular', 'prevention']
    },
    {
      id: '4',
      title: 'Understanding Migraine Triggers and Prevention Strategies',
      excerpt: 'Explore the latest research on migraine causes and discover practical approaches to reduce frequency and severity of migraine episodes.',
      author: {
        name: 'Dr. Michael Chen',
        specialty: 'Neurologist',
        rating: 4.8,
        avatar: 'https://images.pexels.com/photos/5452201/pexels-photo-5452201.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
        verified: true
      },
      category: 'neurology',
      readTime: 6,
      views: 1890,
      isPremium: false,
      publishedAt: '2025-01-09',
      tags: ['migraine', 'neurology', 'pain management']
    },
    {
      id: '5',
      title: 'Understanding Migraine Triggers and Prevention Strategies',
      excerpt: 'Explore the latest research on migraine causes and discover practical approaches to reduce frequency and severity of migraine episodes.',
      author: {
        name: 'Dr. Michael Chen',
        specialty: 'Neurologist',
        rating: 4.8,
        avatar: 'https://images.pexels.com/photos/5452201/pexels-photo-5452201.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
        verified: true
      },
      category: 'neurology',
      readTime: 6,
      views: 1890,
      isPremium: false,
      publishedAt: '2025-01-09',
      tags: ['migraine', 'neurology', 'pain management']
    },
    // Add more posts as needed
  ];

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const PricingModal = () => (
    <div className="fixed inset-0 bg-blue-500 bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">Choose Your Plan</h2>
            <button 
              onClick={() => setShowPricing(false)}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              ×
            </button>
          </div>
          <p className="text-gray-600 mt-2">Get unlimited access to premium medical content from verified specialists</p>
        </div>
        <div className="p-6">
          <div className="grid md:grid-cols-3 gap-6">
            {subscriptions.map((plan) => (
              <div 
                key={plan.name}
                className={`border rounded-lg p-6 relative ${plan.popular ? 'border-blue-500 shadow-lg scale-105' : 'border-gray-200 hover:border-gray-300'} transition-all duration-200`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                      Most Popular
                    </span>
                  </div>
                )}
                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <div className="flex items-baseline justify-center">
                    <span className="text-3xl font-bold text-gray-900">${plan.price}</span>
                    <span className="text-gray-600 ml-1">/month</span>
                  </div>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                <button 
                  className={`w-full py-3 rounded-lg font-medium transition-colors ${plan.popular ? 'bg-blue-500 hover:bg-blue-600 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-900'}`}
                  onClick={() => handlePlanSelect(plan)}
                >
                  Get Started
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center">
                <Stethoscope className="w-8 h-8 text-blue-500 mr-3" />
                Medical Insights
              </h1>
              <p className="text-gray-600 mt-2">Expert medical advice from verified specialists</p>
            </div>
            <button 
              onClick={() => setShowPricing(true)}
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg flex items-center transition-colors"
            >
              <Crown className="w-5 h-5 mr-2" />
              Upgrade to Premium
            </button>
          </div>
        </div>
      </div>

      {/* Search & Categories */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search medical topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <Filter className="w-5 h-5 mr-2 text-gray-500" />
              Advanced Filters
            </button>
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center px-4 py-2 rounded-full text-sm font-medium transition-colors ${selectedCategory === category.id ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'}`}
                >
                  <Icon className="w-4 h-4 mr-2" />
                  {category.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* Blog Posts */}
        <div className="grid lg:grid-cols-2 gap-8">
          {filteredPosts.map((post) => (
            <article key={post.id} className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-200 overflow-hidden">
              <div className="p-6">
                {/* Title & Premium */}
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-xl font-bold text-gray-900">{post.title}</h2>
                  {post.isPremium && <Lock className="w-5 h-5 text-yellow-500 ml-2" />}
                </div>

                {/* Excerpt */}
                <p className="text-gray-600 mb-4">{post.excerpt}</p>

                {/* Author info */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <img src={post.author.avatar} alt={post.author.name} className="w-10 h-10 rounded-full mr-3" />
                    <div>
                      <p className="text-gray-900 font-medium">{post.author.name}</p>
                      <p className="text-gray-500 text-sm">{post.author.specialty}</p>
                    </div>
                    {post.author.verified && <Shield className="w-4 h-4 text-blue-500 ml-2" />}
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Star className="w-4 h-4 text-yellow-400 mr-1" /> {post.author.rating}
                  </div>
                </div>

                {/* Stats */}
                <div className="flex items-center justify-between text-gray-500 text-sm mb-4">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" /> {post.readTime} min read
                  </div>
                  <div className="flex items-center gap-2">
                    <Eye className="w-4 h-4" /> {post.views.toLocaleString()} views
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.map((tag, idx) => (
                    <span key={idx} className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Upgrade Button for Premium */}
                {post.isPremium && (
                  <button
                    onClick={() => setShowPricing(true)}
                    className="w-full py-2 rounded-lg bg-yellow-500 text-white font-medium hover:bg-yellow-600 transition-colors"
                  >
                    Upgrade to Premium
                  </button>
                )}
              </div>
            </article>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <Stethoscope className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No articles found</h3>
            <p className="text-gray-600">Try adjusting your search terms or filters</p>
          </div>
        )}
      </div>

      {/* Pricing Modal */}
      {showPricing && <PricingModal />}
    </div>
  );
};

export default HealthBlog;
