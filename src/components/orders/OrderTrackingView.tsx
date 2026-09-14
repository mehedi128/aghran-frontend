import React, { useState } from 'react';
import { Search, Truck, CheckCircle2, Clock, MapPin, Package, Phone, MessageSquare, AlertCircle } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { Order } from '../../types';

export const OrderTrackingView: React.FC = () => {
  const { recentOrders, activeOrder, navigateTo } = useStore();
  const [searchQuery, setSearchQuery] = useState(activeOrder?.orderNumber || '');
  const [searchedOrder, setSearchedOrder] = useState<Order | null>(activeOrder || recentOrders[0] || null);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    const cleanQuery = searchQuery.trim().toUpperCase();
    const found = recentOrders.find(
      (o) => o.orderNumber.toUpperCase() === cleanQuery || o.customer.phone.includes(searchQuery.trim())
    );

    if (found) {
      setSearchedOrder(found);
      setErrorMessage('');
    } else {
      // If not in recent local orders, simulate a demo match for testing
      if (cleanQuery.startsWith('AGH-') || cleanQuery.length >= 6) {
        const mockFound: Order = {
          id: 'demo-order',
          orderNumber: cleanQuery,
          createdAt: new Date().toISOString(),
          customer: {
            fullName: 'Rafiqul Islam',
            phone: '01711223344',
            division: 'Dhaka',
            district: 'Dhaka City',
            upazilaOrArea: 'Dhanmondi',
            streetAddress: 'House 14, Road 5',
            deliveryZone: 'dhaka',
            paymentMethod: 'cod'
          },
          items: [],
          subtotal: 650,
          shippingFee: 70,
          discount: 0,
          total: 720,
          status: 'In Kitchen Preparation',
          trackingSteps: [
            { title: 'Confirmed', description: 'Order verified', completed: true, date: new Date().toISOString() },
            { title: 'In Kitchen Preparation', description: 'Cooking in rural kitchen', completed: true, date: new Date().toISOString() },
            { title: 'Dispatched', description: 'Handed to courier', completed: false },
            { title: 'Delivered', description: 'Delivered to door', completed: false }
          ]
        };
        setSearchedOrder(mockFound);
        setErrorMessage('');
      } else {
        setErrorMessage('No order found with this tracking ID. Please verify your order number.');
        setSearchedOrder(null);
      }
    }
  };

  const steps = [
    { title: 'Order Confirmed', bangla: 'অর্ডার গৃহীত হয়েছে', icon: CheckCircle2, desc: 'Your order details have been verified' },
    { title: 'Handcrafting in Kitchen', bangla: 'রান্নাঘরে প্রস্তুত হচ্ছে', icon: Clock, desc: 'Fresh homemade preparation with authentic ingredients' },
    { title: 'Out for Delivery', bangla: 'ডেলিভারিতে রয়েছে', icon: Truck, desc: 'Handed over to cold-chain/express courier' },
    { title: 'Delivered', bangla: 'ডেলিভারি সম্পন্ন', icon: Package, desc: 'Safely delivered to your doorstep' }
  ];

  // Current active step index (0 to 3)
  const currentStep = searchedOrder?.status === 'Delivered' 
    ? 3 
    : searchedOrder?.status === 'Dispatched' 
    ? 2 
    : searchedOrder?.status === 'In Kitchen Preparation'
    ? 1
    : 0;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8" id="order-tracking-page">
      
      {/* Header */}
      <div className="text-center space-y-2 max-w-xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold font-serif-bangla text-[#3A2A1E]">
          Track Your Order (অর্ডার ট্র্যাকিং)
        </h1>
        <p className="text-xs sm:text-sm text-[#888780]">
          Enter your Aghran Order Tracking Number (e.g. <strong className="text-[#D85A30]">AGH-89241</strong>) or phone number to check live packaging and delivery status.
        </p>
      </div>

      {/* Search Input Box */}
      <div className="bg-[#FAF6EE] p-6 rounded-3xl border border-[#D85A30]/20 shadow-sm max-w-2xl mx-auto">
        <form onSubmit={handleSearch} className="flex gap-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-[#888780] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Enter Order ID (e.g. AGH-89241) or Phone..."
              className="w-full bg-[#FAEEDA] text-[#3A2A1E] text-xs sm:text-sm pl-10 pr-4 py-3 rounded-xl border border-[#D85A30]/20 focus:outline-none focus:border-[#D85A30]"
            />
          </div>
          <button
            type="submit"
            className="bg-[#D85A30] text-[#FAF6EE] text-xs sm:text-sm font-bold px-6 py-3 rounded-xl hover:bg-[#c24e27] transition-colors"
          >
            Track Status
          </button>
        </form>

        {errorMessage && (
          <div className="mt-3 flex items-center gap-2 text-xs text-red-500 bg-red-50 p-2.5 rounded-xl border border-red-200">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}
      </div>

      {/* Tracking Result Card */}
      {searchedOrder && (
        <div className="bg-[#FAF6EE] rounded-3xl border-2 border-[#D85A30]/20 p-6 sm:p-8 shadow-md space-y-8 animate-in fade-in">
          
          {/* Order Header Summary */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#D85A30]/15">
            <div>
              <span className="text-xs text-[#888780]">Tracking Order</span>
              <h3 className="text-xl font-black text-[#D85A30] tracking-wider mt-0.5">
                {searchedOrder.orderNumber}
              </h3>
              <div className="text-xs text-[#3A2A1E] mt-1">
                Recipient: <strong>{searchedOrder.customer.fullName}</strong> ({searchedOrder.customer.district})
              </div>
            </div>

            <div className="sm:text-right">
              <span className="text-xs font-bold px-3 py-1 bg-[#639922]/15 text-[#639922] rounded-full uppercase">
                Status: In Preparation (রান্নাঘরে প্রস্তুত হচ্ছে)
              </span>
              <div className="text-[11px] text-[#888780] mt-1">
                Est. Delivery: Within 48-72 Hours
              </div>
            </div>
          </div>

          {/* Stepper Progress Bar */}
          <div className="py-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
              {steps.map((step, index) => {
                const IconComponent = step.icon;
                const isCompleted = index <= currentStep;
                const isCurrent = index === currentStep;

                return (
                  <div
                    key={index}
                    className={`flex flex-col items-center text-center p-4 rounded-2xl border transition-all ${
                      isCurrent
                        ? 'bg-[#FAEEDA] border-[#D85A30] shadow-md ring-2 ring-[#D85A30]/30'
                        : isCompleted
                        ? 'bg-[#FAF6EE] border-[#639922]/40'
                        : 'bg-[#FAF6EE]/50 border-gray-200 opacity-60'
                    }`}
                  >
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                        isCurrent
                          ? 'bg-[#D85A30] text-[#FAF6EE]'
                          : isCompleted
                          ? 'bg-[#639922] text-[#FAF6EE]'
                          : 'bg-gray-200 text-gray-400'
                      }`}
                    >
                      <IconComponent className="w-5 h-5" />
                    </div>

                    <h4 className="text-xs font-bold text-[#3A2A1E]">
                      {step.title}
                    </h4>
                    <p className="text-[11px] font-serif-bangla text-[#D85A30] font-semibold mt-0.5">
                      {step.bangla}
                    </p>
                    <p className="text-[10px] text-[#888780] mt-1 leading-snug">
                      {step.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Help & Support Callout */}
          <div className="bg-[#FAEEDA] p-4 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#3A2A1E]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#D85A30] text-[#FAF6EE] flex items-center justify-center flex-shrink-0">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <strong className="block text-[#3A2A1E]">Need direct help with your order?</strong>
                <span className="text-[#888780]">Our customer care team is available 9 AM - 10 PM daily.</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <a
                href="tel:+8801712345678"
                className="bg-[#3A2A1E] text-[#FAF6EE] px-4 py-2 rounded-xl font-bold hover:bg-[#D85A30] transition-colors"
              >
                Call: 01712-345678
              </a>
              <a
                href="https://wa.me/8801712345678"
                target="_blank"
                rel="noreferrer"
                className="bg-[#639922] text-[#FAF6EE] px-4 py-2 rounded-xl font-bold hover:bg-[#52811a] transition-colors flex items-center gap-1"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                WhatsApp
              </a>
            </div>
          </div>

        </div>
      )}

    </div>
  );
};
