import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { courses } from '../data';
import { Calendar, Clock, MapPin, Users, Mail, ArrowLeft, CheckCircle, Shield } from 'lucide-react';

export const CourseDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const course = courses.find(c => c.id === id);
  const [isRegistered, setIsRegistered] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    role: ''
  });

  if (!course) {
    return (
      <div className="container mx-auto px-6 py-20 text-center">
        <h2 className="text-2xl font-bold mb-4">Course not found</h2>
        <Link to="/" className="text-ibm-blue hover:underline">Return to Catalog</Link>
      </div>
    );
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate sending email via console and mailto fallback construction
    console.log("Registration Submitted:", { course: course.name, ...formData });
    
    // Construct Mailto for demonstration of intent
    const subject = encodeURIComponent(`Registration: ${course.name} (${course.number})`);
    const body = encodeURIComponent(
      `New Registration for ${course.name}\n\n` +
      `Attendee: ${formData.firstName} ${formData.lastName}\n` +
      `Email: ${formData.email}\n` +
      `Company: ${formData.company}\n` +
      `Role: ${formData.role}\n\n` +
      `Course ID: ${course.id}\n` +
      `Date: ${course.startDate}`
    );

    const mailtoUrl = `mailto:francisco.lopezminaya@es.ibm.com?subject=${subject}&body=${body}`;

    // Fix for SecurityError/TypeError in sandboxed environments:
    // Instead of window.location.href, create a temporary link and click it.
    try {
      const link = document.createElement('a');
      link.href = mailtoUrl;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error("Failed to open mail client automatically", err);
    }
    
    setIsRegistered(true);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-6 py-8">
          <Link to="/" className="inline-flex items-center text-sm text-gray-500 hover:text-ibm-blue mb-6">
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back to Catalog
          </Link>
          
          <div className="flex flex-col lg:flex-row justify-between gap-8">
            <div className="max-w-3xl">
              <div className="flex gap-2 mb-4">
                <span className="bg-gray-100 text-gray-800 text-xs font-bold px-2 py-1 uppercase tracking-wider">
                  {course.focusArea}
                </span>
                {course.containsWatsonx && (
                  <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                    watsonx
                  </span>
                )}
              </div>
              <h1 className="text-3xl md:text-4xl font-light text-gray-900 mb-4">{course.name}</h1>
              <p className="text-lg text-gray-600 mb-6">
                Market: {course.market} • ID: {course.number}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Left Column: Details */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white p-8 border border-gray-200 shadow-sm">
              <h3 className="text-xl font-medium mb-6">Event Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-blue-50 text-ibm-blue">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Date</p>
                    <p className="font-medium">{course.startDate}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-2 bg-blue-50 text-ibm-blue">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Duration</p>
                    <p className="font-medium">{course.duration}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-2 bg-blue-50 text-ibm-blue">
                    <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Audience</p>
                    <p className="font-medium">{course.audience}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-2 bg-blue-50 text-ibm-blue">
                    <Shield className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Expected Attendees</p>
                    <p className="font-medium">{course.attendees}</p>
                  </div>
                </div>

                 <div className="flex items-start gap-4">
                  <div className="p-2 bg-blue-50 text-ibm-blue">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Contact</p>
                    <p className="font-medium break-all">{course.contactEmail}</p>
                  </div>
                </div>
              </div>

              {course.cost && (
                <div className="mt-8 pt-8 border-t border-gray-100">
                  <p className="text-sm text-gray-500">Projected Cost</p>
                  <p className="text-2xl font-light text-gray-900">${course.cost}</p>
                </div>
              )}
            </div>

            <div className="bg-blue-50 p-6 border border-blue-100 text-sm text-blue-900">
               <strong>Note:</strong> This registration system notifies the SPGI team. Confirmations will be sent separately once the session schedule is finalized.
            </div>
          </div>

          {/* Right Column: Registration Form */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 border-t-4 border-ibm-blue shadow-lg sticky top-24">
              
              {!isRegistered ? (
                <>
                  <h3 className="text-xl font-medium mb-2">Register Now</h3>
                  <p className="text-gray-500 text-sm mb-6">Secure your spot for this enablement session.</p>
                  
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">First Name</label>
                        <input 
                          type="text" 
                          name="firstName"
                          required
                          value={formData.firstName}
                          onChange={handleInputChange}
                          className="w-full p-2 border border-gray-300 focus:border-ibm-blue focus:ring-1 focus:ring-ibm-blue outline-none transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Last Name</label>
                        <input 
                          type="text" 
                          name="lastName"
                          required
                          value={formData.lastName}
                          onChange={handleInputChange}
                          className="w-full p-2 border border-gray-300 focus:border-ibm-blue focus:ring-1 focus:ring-ibm-blue outline-none transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Email Address</label>
                      <input 
                        type="email" 
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 focus:border-ibm-blue focus:ring-1 focus:ring-ibm-blue outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Company / Partner</label>
                      <input 
                        type="text" 
                        name="company"
                        required
                        value={formData.company}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 focus:border-ibm-blue focus:ring-1 focus:ring-ibm-blue outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Job Title</label>
                      <input 
                        type="text" 
                        name="role"
                        required
                        value={formData.role}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 focus:border-ibm-blue focus:ring-1 focus:ring-ibm-blue outline-none transition-colors"
                      />
                    </div>

                    <div className="pt-2">
                      <button 
                        type="submit"
                        className="w-full bg-ibm-blue text-white font-medium py-3 hover:bg-ibm-hover transition-colors flex items-center justify-center gap-2"
                      >
                        Complete Registration
                      </button>
                    </div>
                    <p className="text-xs text-gray-400 text-center mt-2">
                      Clicking register will open your email client to send details to francisco.lopezminaya@es.ibm.com
                    </p>
                  </form>
                </>
              ) : (
                <div className="text-center py-10">
                  <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Registration Initiated!</h3>
                  <p className="text-gray-600 mb-6">
                    We have opened your email client with the registration details. Please hit "Send" to complete the process with the SPGI team.
                  </p>
                  <button 
                    onClick={() => setIsRegistered(false)}
                    className="text-ibm-blue font-medium hover:underline"
                  >
                    Register another person
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};