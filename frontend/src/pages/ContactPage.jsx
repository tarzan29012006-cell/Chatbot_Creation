import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2, AlertCircle, Building } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    course_interest: '',
    message: '',
    type: 'contact'
  });
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone || !formData.message) {
      alert('Please fill out all required fields.');
      return;
    }

    setSubmitting(true);
    setStatus(null);

    try {
      const res = await fetch('/api/enquiries/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (res.ok) {
        setStatus({
          success: true,
          msg: data.message || 'Thank you! Your message has been sent successfully. Our team will contact you shortly.'
        });
        setFormData({
          name: '',
          email: '',
          phone: '',
          course_interest: '',
          message: '',
          type: 'contact'
        });
      } else {
        setStatus({
          success: false,
          msg: 'Please check your information and try again.'
        });
      }
    } catch (err) {
      setStatus({
        success: false,
        msg: 'Connection error while submitting. Please call +91 98765 43210 or email admissions@mycollege.edu directly.'
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <section className="bg-gradient-to-r from-[#0b1a30] via-[#0c2340] to-[#1254cf] text-white py-20 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-200 text-xs font-semibold uppercase tracking-wider">
            Campus Helpdesk • Admissions & General Enquiries
          </div>
          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-white">
            Contact & Directions
          </h1>
          <p className="text-lg text-slate-200 max-w-2xl font-light">
            We are here to help prospective students, parents, and visitors. Connect with our admissions desk or visit our 95-acre campus.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-16 space-y-16">
        
        {/* Contact Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#1254cf] flex items-center justify-center mb-3">
              <MapPin className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-slate-800 text-sm">Postal Address</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Sri Venkateswara College of Engineering<br />
              Post Bag No. 1, Pennalur,<br />
              Sriperumbudur Taluk, Tamil Nadu - 602117
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3">
              <Phone className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-slate-800 text-sm">Admissions Helpline</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              +91 98765 43210<br />
              +91 44 2715 2000<br />
              Toll Free: 1800 425 2026
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-3">
              <Mail className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-slate-800 text-sm">Official Email</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Admissions: admissions@mycollege.edu<br />
              Principal: principal@svce.ac.in<br />
              Controller of Exams: coe@svce.ac.in
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-3">
              <Clock className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-slate-800 text-sm">Office Hours</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Monday - Saturday: 8:30 AM – 4:30 PM<br />
              Sunday: Closed<br />
              Campus Tours: Prior booking recommended
            </p>
          </div>
        </div>

        {/* Contact Form & Location Map Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Enquiry Form */}
          <div className="lg:col-span-7 bg-slate-50 p-8 sm:p-10 rounded-3xl border border-slate-200/90 shadow-sm space-y-6">
            <div>
              <h3 className="text-2xl font-serif font-bold text-[#0c2340]">Send Us a Message</h3>
              <p className="text-xs text-slate-500 mt-1">
                Have specific queries regarding admissions, transport routes, or verification? Write to us directly.
              </p>
            </div>

            {status && (
              <div
                className={`p-4 rounded-xl text-xs flex items-start gap-2.5 ${
                  status.success
                    ? 'bg-emerald-50 border border-emerald-200 text-emerald-800'
                    : 'bg-red-50 border border-red-200 text-red-800'
                }`}
              >
                {status.success ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                )}
                <div>{status.msg}</div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Your Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter your full name"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:outline-none focus:border-blue-500 bg-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@example.com"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:outline-none focus:border-blue-500 bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:outline-none focus:border-blue-500 bg-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Subject / Department</label>
                  <input
                    type="text"
                    value={formData.course_interest}
                    onChange={(e) => setFormData({ ...formData, course_interest: e.target.value })}
                    placeholder="e.g. Admission Inquiry, Hostel, Bus Route"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:outline-none focus:border-blue-500 bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Message *</label>
                <textarea
                  rows="4"
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Type your question or query in detail..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:outline-none focus:border-blue-500 bg-white"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="inline-flex items-center gap-2 bg-[#1254cf] hover:bg-[#0b44aa] text-white px-6 py-2.5 rounded-full text-xs font-medium transition-colors shadow-xs active:scale-95 disabled:opacity-50"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{submitting ? 'Sending...' : 'Send Message'}</span>
              </button>
            </form>
          </div>

          {/* Location & Directions Card */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-3xl overflow-hidden border border-slate-200 shadow-md bg-white">
              {/* Map Illustration / Visual */}
              <div className="h-64 bg-slate-100 relative flex items-center justify-center overflow-hidden">
                <iframe
                  title="SVCE Campus Location Map"
                  src="https://maps.google.com/maps?q=Sri%20Venkateswara%20College%20of%20Engineering%20Pennalur%20Sriperumbudur&t=&z=13&ie=UTF8&iwloc=&output=embed"
                  className="w-full h-full border-0"
                  loading="lazy"
                />
              </div>
              <div className="p-6 space-y-4">
                <h4 className="font-bold text-slate-800 text-base">How to Reach SVCE Campus</h4>
                <div className="space-y-2.5 text-xs text-slate-600">
                  <p>
                    <strong>By Road:</strong> Situated along the Chennai-Bengaluru National Highway (NH 48) at Pennalur, just 5 km past the Rajiv Gandhi Memorial in Sriperumbudur.
                  </p>
                  <p>
                    <strong>From Airport:</strong> 30 km from Chennai International Airport (MAA) via NH 48 (approx 45 minutes by taxi or college transport).
                  </p>
                  <p>
                    <strong>From Railway:</strong> 35 km from Chennai Central and Tambaram railway stations with direct MTC bus connectivity.
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
