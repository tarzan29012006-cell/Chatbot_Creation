import React, { useState } from 'react';
import { CheckCircle2, Calendar, FileText, IndianRupee, Send, Sparkles, AlertCircle } from 'lucide-react';

export default function AdmissionsPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    course_interest: 'B.E. Computer Science and Engineering',
    message: '',
    type: 'admissions'
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone) {
      alert('Please fill out all required fields.');
      return;
    }

    setSubmitting(true);
    setSubmitStatus(null);

    try {
      const res = await fetch('/api/enquiries/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (res.ok) {
        setSubmitStatus({
          success: true,
          msg: data.message || 'Your application enquiry has been received successfully!'
        });
        setFormData({
          name: '',
          email: '',
          phone: '',
          course_interest: 'B.E. Computer Science and Engineering',
          message: '',
          type: 'admissions'
        });
      } else {
        setSubmitStatus({
          success: false,
          msg: 'Please check your inputs and try again.'
        });
      }
    } catch (err) {
      setSubmitStatus({
        success: false,
        msg: 'Connection error while submitting. Please retry or email admissions@mycollege.edu directly.'
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Page Header */}
      <section className="bg-gradient-to-r from-[#0b1a30] via-[#0c2340] to-[#1254cf] text-white py-20 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-semibold uppercase tracking-wider">
            Admissions 2026 - 2027 • TNEA Counselling Code: 1219
          </div>
          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-white">
            Undergraduate & Postgraduate Admissions
          </h1>
          <p className="text-lg text-slate-200 max-w-2xl font-light">
            Step into a world-class autonomous learning community. Explore our admission quotas, eligibility criteria, and fee structures.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-16 space-y-20">
        
        {/* Admission Quotas Strip */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8" id="process">
          {/* Government Quota */}
          <div className="p-8 rounded-3xl bg-blue-50/70 border border-blue-200/80 space-y-4">
            <span className="text-xs font-bold px-3 py-1 bg-[#1254cf] text-white rounded-full">
              65% of Total Seats
            </span>
            <h2 className="text-2xl font-serif font-bold text-[#0c2340]">
              Government Quota (TNEA Counselling)
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              Administered through Tamil Nadu Engineering Admissions (TNEA) single-window online counselling conducted by Anna University.
            </p>
            <ul className="space-y-2 text-xs text-slate-700">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span><strong>SVCE TNEA Counselling Code:</strong> 1219</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Eligibility: 10+2 with Physics, Chemistry & Mathematics</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Min aggregate: OC: 50%, BC/BCM: 45%, MBC: 40%, SC/ST: 40%</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Annual Tuition: ₹55,000 (Govt fixed)</span>
              </li>
            </ul>
          </div>

          {/* Management Quota */}
          <div className="p-8 rounded-3xl bg-amber-50/60 border border-amber-200/80 space-y-4" id="management">
            <span className="text-xs font-bold px-3 py-1 bg-[#d97706] text-white rounded-full">
              35% of Total Seats
            </span>
            <h2 className="text-2xl font-serif font-bold text-[#0c2340]">
              Management Quota (Direct Merit)
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              Merit-based direct admission administered directly by the college admissions committee based on 10+2 marks.
            </p>
            <ul className="space-y-2 text-xs text-slate-700">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-600 flex-shrink-0" />
                <span>Direct application submission online or on campus</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-600 flex-shrink-0" />
                <span>High cut-off merit evaluation & academic counselling</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-600 flex-shrink-0" />
                <span>Annual Tuition: ₹1,45,000</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-600 flex-shrink-0" />
                <span>Merit scholarships available for top performers</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Annual Fee Breakdown & Scholarships */}
        <section className="space-y-6" id="fees">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-3xl font-serif font-bold text-[#0c2340]">Fee Structure & Scholarships</h2>
            <p className="text-slate-600 text-sm">Transparent fee schedule approved by Tamil Nadu Fee Fixation Committee.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
              <div className="text-xs font-bold text-slate-500 uppercase">Tuition Fees</div>
              <div className="text-3xl font-serif font-bold text-[#1254cf]">₹55,000 <span className="text-xs text-slate-500 font-sans">/ year (Govt)</span></div>
              <div className="text-sm text-slate-600">₹1,45,000 / year (Management Quota)</div>
              <p className="text-xs text-slate-500 pt-2 border-t border-slate-100">
                Covers academic lectures, computational laboratory access, Wi-Fi, and digital library subscriptions.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
              <div className="text-xs font-bold text-slate-500 uppercase">Hostel & Dining</div>
              <div className="text-3xl font-serif font-bold text-[#1254cf]">₹85,000 <span className="text-xs text-slate-500 font-sans">/ year</span></div>
              <div className="text-sm text-slate-600">2/3 Sharing • 4 Nutritious Meals</div>
              <p className="text-xs text-slate-500 pt-2 border-t border-slate-100">
                Includes room, South/North Indian steam-cooked mess, evening snacks, laundry, gym, and 24/7 solar hot water.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
              <div className="text-xs font-bold text-slate-500 uppercase">Founder's Scholarships</div>
              <div className="text-3xl font-serif font-bold text-amber-600">Up to 100% <span className="text-xs text-slate-500 font-sans">Waiver</span></div>
              <div className="text-sm text-slate-600">Merit, Sports & Need-Based</div>
              <p className="text-xs text-slate-500 pt-2 border-t border-slate-100">
                Over ₹2.5 Crores awarded annually. 100% waiver for TNEA rank &lt; 1000 or national athletes.
              </p>
            </div>
          </div>
        </section>

        {/* Interactive Application / Enquiry Form (SRS FR-W5) */}
        <section className="bg-slate-50 rounded-3xl p-8 sm:p-12 border border-slate-200/90 shadow-sm" id="apply">
          <div className="max-w-3xl mx-auto space-y-8">
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-serif font-bold text-[#0c2340]">
                Apply for Admission / Send an Enquiry
              </h2>
              <p className="text-slate-600 text-sm">
                Submit your details below and our admissions counsellor will connect with you within 24 hours.
              </p>
            </div>

            {submitStatus && (
              <div
                className={`p-4 rounded-2xl text-sm flex items-start gap-3 ${
                  submitStatus.success
                    ? 'bg-emerald-50 border border-emerald-200 text-emerald-800'
                    : 'bg-red-50 border border-red-200 text-red-800'
                }`}
              >
                {submitStatus.success ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                )}
                <div>{submitStatus.msg}</div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Ramesh Kumar"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-blue-500 bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="ramesh@gmail.com"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-blue-500 bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Phone / WhatsApp Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-blue-500 bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Program of Interest *
                  </label>
                  <select
                    value={formData.course_interest}
                    onChange={(e) => setFormData({ ...formData, course_interest: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-blue-500 bg-white"
                  >
                    <option>B.E. Computer Science and Engineering</option>
                    <option>B.Tech Artificial Intelligence and Data Science</option>
                    <option>B.E. Electronics and Communication</option>
                    <option>B.Tech Information Technology</option>
                    <option>B.E. Mechanical Engineering</option>
                    <option>B.Tech Biotechnology</option>
                    <option>B.E. Civil Engineering</option>
                    <option>Master of Business Administration (MBA)</option>
                    <option>Postgraduate M.E. / M.Tech Programs</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  12th Marks / Cut-Off Score / Any Specific Query
                </label>
                <textarea
                  rows="3"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Mention your 12th board marks, cut-off score, or quota preferences..."
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-blue-500 bg-white"
                />
              </div>

              <div className="text-center pt-2">
                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex items-center justify-center gap-2 bg-[#1254cf] hover:bg-[#0b44aa] disabled:opacity-50 text-white font-medium px-8 py-3.5 rounded-full transition-colors text-sm shadow-md active:scale-95"
                >
                  <Send className="w-4 h-4" />
                  <span>{submitting ? 'Submitting Application...' : 'Submit Application Form'}</span>
                </button>
              </div>
            </form>
          </div>
        </section>

      </div>
    </div>
  );
}
