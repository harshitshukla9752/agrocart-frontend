import React from 'react';
import { Leaf, Users, Globe, Award } from 'lucide-react';

const About = () => {
  const stats = [
    {
      icon: <Users className="w-6 h-6 text-green-600" />,
      value: '10,000+',
      label: 'Happy Customers'
    },
    {
      icon: <Globe className="w-6 h-6 text-green-600" />,
      value: '50+',
      label: 'Countries Served'
    },
    {
      icon: <Leaf className="w-6 h-6 text-green-600" />,
      value: '5,000+',
      label: 'Products'
    },
    {
      icon: <Award className="w-6 h-6 text-green-600" />,
      value: '15+',
      label: 'Years Experience'
    }
  ];

  const team = [
    {
      name: 'John Smith',
      role: 'CEO & Founder',
      image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg',
      bio: 'With over 20 years of experience in agriculture'
    },
    {
      name: 'Sarah Johnson',
      role: 'Head of Operations',
      image: 'https://images.pexels.com/photos/3771839/pexels-photo-3771839.jpeg',
      bio: 'Expert in sustainable farming practices'
    },
    {
      name: 'Mike Wilson',
      role: 'Product Specialist',
      image: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg',
      bio: 'Agricultural engineer with focus on innovation'
    }
  ];

  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <div className="relative py-20 bg-green-600">
        <div className="container mx-auto px-4 text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About AgroMart</h1>
          <p className="text-xl max-w-2xl mx-auto">
            Your trusted partner in agricultural excellence since 2010
          </p>
        </div>
      </div>

      {/* Mission Section */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Mission</h2>
            <p className="text-gray-600 text-lg mb-8">
              At AgroMart, we're committed to empowering farmers and agricultural businesses 
              with premium products and innovative solutions. Our mission is to promote 
              sustainable farming practices while ensuring food security for future generations.
            </p>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mb-4">
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold text-gray-800 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Leadership Team</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Meet the experts behind AgroMart's success
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm overflow-hidden">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-1">{member.name}</h3>
                  <p className="text-green-600 mb-3">{member.role}</p>
                  <p className="text-gray-600">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Values</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Leaf className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Sustainability</h3>
              <p className="text-gray-600">
                Committed to environmental stewardship and sustainable farming practices
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Quality</h3>
              <p className="text-gray-600">
                Providing only the highest quality products and services
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Community</h3>
              <p className="text-gray-600">
                Supporting and empowering farming communities worldwide
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;