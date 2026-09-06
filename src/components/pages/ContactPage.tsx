import React, { useState } from 'react';
import { Phone, Mail, MapPin, MessageSquare, Clock, Send, CheckCircle2, ShieldCheck } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const ContactPage: React.FC = () => {
  const { showToast } = useStore();
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    inquiryType: 'general',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.message) {
      showToast('Please fill in required fields (Name, Phone, Message)', 'error');
      return;
    }

    setSubmitted(true);
    showToast('Your message has been sent successfully! Our team will contact you within 2 hours.', 'success');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:py-12 space-y-12" id="contact-page">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="text-xs font-bold text-[#D85A30] uppercase tracking-widest bg-[#FAEEDA] px-3 py-1 rounded-full">
          GET IN TOUCH • যোগাযোগ করুন
        </span>
        <h1 className="text-3xl sm:text-4xl font-bold font-serif-bangla text-[#3A2A1E]">
          We’d Love to Hear From You (আমাদের সাথে যোগাযোগ)
        </h1>
        <p className="text-xs sm:text-sm text-[#888780] leading-relaxed">
          Have questions regarding an order, bulk festival gifts, or rural artisan collaborations? Reach out to our dedicated support team.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Contact Details Cards */}
        <div className="lg:col-span-5 space-y-4">
          
          {/* Phone / WhatsApp */}
          <div className="bg-[#FAF6EE] p-6 rounded-3xl border border-[#D85A30]/20 space-y-3 shadow-sm">
            <div className="w-10 h-10 rounded-2xl bg-[#D85A30] text-[#FAF6EE] flex items-center justify-center">
              <Phone className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold font-serif-bangla text-[#3A2A1E]">
              Direct Helpline & WhatsApp
            </h3>
            <p className="text-xs text-[#888780]">
              Available every day from 9:00 AM to 10:00 PM (Bangladesh Time).
            </p>
            <div className="space-y-1 text-sm font-black text-[#D85A30]">
              <a href="tel:+8801712345678" className="block hover:underline">
                +880 1712-345678 (Hotline)
              </a>
              <a href="https://wa.me/8801712345678" target="_blank" rel="noreferrer" className="block text-[#639922] hover:underline flex items-center gap-1">
                <MessageSquare className="w-4 h-4" />
                WhatsApp: +880 1712-345678
              </a>
            </div>
          </div>

          {/* Email */}
          <div className="bg-[#FAF6EE] p-6 rounded-3xl border border-[#D85A30]/20 space-y-3 shadow-sm">
            <div className="w-10 h-10 rounded-2xl bg-[#639922] text-[#FAF6EE] flex items-center justify-center">
              <Mail className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold font-serif-bangla text-[#3A2A1E]">
              Email Us (ইমেইল)
            </h3>
            <p className="text-xs text-[#888780]">
              For corporate partnerships, bulk gift packages, and supplier queries.
            </p>
            <div className="space-y-1 text-xs sm:text-sm font-bold text-[#3A2A1E]">
              <div>orders@aghranfoods.com</div>
              <div className="text-[#888780]">support@aghranfoods.com</div>
            </div>
          </div>

          {/* Office & Village Kitchen Locations */}
          <div className="bg-[#FAF6EE] p-6 rounded-3xl border border-[#D85A30]/20 space-y-3 shadow-sm text-xs text-[#3A2A1E]">
            <div className="w-10 h-10 rounded-2xl bg-[#FAC775] text-[#3A2A1E] flex items-center justify-center">
              <MapPin className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold font-serif-bangla text-[#3A2A1E]">
              Our Locations (ঠিকানা)
            </h3>
            <div>
              <strong className="block text-[#D85A30]">Dhaka Distribution Hub:</strong>
              <p className="text-[#888780] mt-0.5">House 42, Road 7/A, Dhanmondi, Dhaka-1209</p>
            </div>
            <div>
              <strong className="block text-[#639922]">Rural Processing Kitchen:</strong>
              <p className="text-[#888780] mt-0.5">Sherpur Upazila, Bogura & Pabna Sadar, Bangladesh</p>
            </div>
          </div>

        </div>

        {/* Right Column: Contact Form */}
        <div className="lg:col-span-7">
          <div className="bg-[#FAF6EE] rounded-3xl border-2 border-[#D85A30]/20 p-6 sm:p-10 shadow-md">
            {submitted ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#639922]/20 text-[#639922] flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold font-serif-bangla text-[#3A2A1E]">
                  ধন্যবাদ! আপনার বার্তাটি পৌঁছেছে
                </h3>
                <p className="text-xs text-[#888780] max-w-sm mx-auto">
                  Thank you for getting in touch. Our representative will contact you shortly.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="text-xs font-bold text-[#D85A30] hover:underline"
                >
                  Send another message →
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h2 className="text-xl font-bold font-serif-bangla text-[#3A2A1E] pb-2 border-b border-[#D85A30]/15">
                  Send Us a Message (বার্তা পাঠান)
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-[#3A2A1E] block">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="e.g. Anisur Rahman"
                      className="w-full bg-[#FAEEDA] text-xs px-3.5 py-3 rounded-xl border border-[#D85A30]/20 focus:outline-none focus:border-[#D85A30]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-[#3A2A1E] block">
                      Mobile Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder="017XXXXXXXX"
                      className="w-full bg-[#FAEEDA] text-xs px-3.5 py-3 rounded-xl border border-[#D85A30]/20 focus:outline-none focus:border-[#D85A30]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-[#3A2A1E] block">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="name@example.com"
                      className="w-full bg-[#FAEEDA] text-xs px-3.5 py-3 rounded-xl border border-[#D85A30]/20 focus:outline-none focus:border-[#D85A30]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-[#3A2A1E] block">
                      Inquiry Type
                    </label>
                    <select
                      value={form.inquiryType}
                      onChange={(e) => setForm({ ...form, inquiryType: e.target.value })}
                      className="w-full bg-[#FAEEDA] text-xs px-3.5 py-3 rounded-xl border border-[#D85A30]/20 focus:outline-none focus:border-[#D85A30]"
                    >
                      <option value="general">General Query (সাধারণ প্রশ্ন)</option>
                      <option value="order">Order Tracking / Delay</option>
                      <option value="corporate">Corporate / Festival Gifts (কর্পোরেট উপহার)</option>
                      <option value="artisan">Artisan / Producer Partnership</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#3A2A1E] block">
                    Your Message / Requirement *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Write your questions or bulk order requirements here..."
                    className="w-full bg-[#FAEEDA] text-xs p-3.5 rounded-xl border border-[#D85A30]/20 focus:outline-none focus:border-[#D85A30]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-[#D85A30] text-[#FAF6EE] hover:bg-[#c24e27] rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 shadow-md"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Message (বার্তা পাঠান)</span>
                </button>
              </form>
            )}
          </div>
        </div>

      </div>

    </div>
  );
};
