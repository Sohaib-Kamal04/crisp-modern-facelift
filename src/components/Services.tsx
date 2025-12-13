"use client";

import { 
  Home, Building2, ChevronLeft, ChevronRight, Minus, Plus, 
  CheckCircle2, MapPin, User, Mail, Phone, CreditCard, Loader2
} from "lucide-react";
import { useState, useEffect } from "react";

// --- IMPORTS FROM UTILS ---
import { 
  calculatePricing, 
  CLEANING_TYPE_PRICES,
  HOME_DETAIL_PRICES,
  EXTRA_PRICES, 
  FREQUENCY_DISCOUNTS, 
  type PricingRequest, 
  type PricingResponse,
  type CleaningType,
  type Extra,
  type Frequency
} from "@/utils/pricing";

import { getCurrentAddress } from "@/utils/geolocation"; // Adjust path as needed


// --- LOCAL COMPONENT HELPERS ---
const servicesList = [
  { id: "residential", icon: Home, title: "Residential", description: "Perfect for houses and apartments." },
  { id: "commercial", icon: Building2, title: "Commercial", description: "Offices, schools, and businesses." },
];

const Services = () => {
  const totalSteps = 5;
  const [currentStep, setCurrentStep] = useState(1);
  
  // State: Form Data
  const [formData, setFormData] = useState<PricingRequest & {
    serviceCategory: string; // purely for Step 1 UI selection
    selectedDate: Date | undefined;
    selectedTime: string;
    instructions: { entry: string; parking: string; pets: string; notes: string };
    contact: { firstName: string; lastName: string; email: string; phone: string; address: string };
  }>({
    serviceCategory: "", 
    cleaningType: "Regular", 
    homeDetails: { bedrooms: 0, bathrooms: 0, kitchens: 0, other: 0 },
    extras: [],
    frequency: "One time",
    selectedDate: undefined,
    selectedTime: "08:00 AM - 10:00 AM",
    instructions: { entry: "", parking: "", pets: "", notes: "" },
    contact: { firstName: "", lastName: "", email: "", phone: "", address: "" }
  });

  const [pricingResult, setPricingResult] = useState<PricingResponse | null>(null);
  const [isLoadingLoc, setIsLoadingLoc] = useState(false);

  // Effect: Recalculate price whenever relevant data changes
  useEffect(() => {
    try {
      const result = calculatePricing({
        cleaningType: formData.cleaningType,
        homeDetails: formData.homeDetails,
        extras: formData.extras,
        frequency: formData.frequency,
        actionTakerDiscount: false 
      });
      setPricingResult(result);
    } catch (e) {
      console.error("Pricing Error", e);
    }
  }, [formData.cleaningType, formData.homeDetails, formData.extras, formData.frequency]);

  // Handler: Location Click
  const handleUseCurrentLocation = async () => {
    setIsLoadingLoc(true);
    try {
      const addressData = await getCurrentAddress();
      setFormData(prev => ({ 
        ...prev, 
        contact: { ...prev.contact, address: addressData.fullAddress } 
      }));
    } catch (error) {
      alert("Could not fetch location. Please enter manually.");
    } finally {
      setIsLoadingLoc(false);
    }
  };

  // Handlers: Navigation
  const handleNext = () => currentStep < totalSteps && setCurrentStep(prev => prev + 1);
  const handlePrev = () => currentStep > 1 && setCurrentStep(prev => prev - 1);

  // Handlers: Form Updates
  const updateRooms = (key: keyof typeof formData.homeDetails, change: number) => {
    setFormData(prev => ({
      ...prev,
      homeDetails: {
        ...prev.homeDetails,
        [key]: Math.max(0, (prev.homeDetails[key] || 0) + change)
      }
    }));
  };

  const toggleExtra = (extraKey: Extra) => {
    setFormData(prev => {
      const currentExtras = prev.extras || [];
      const exists = currentExtras.includes(extraKey);
      return {
        ...prev,
        extras: exists 
          ? currentExtras.filter(e => e !== extraKey) 
          : [...currentExtras, extraKey]
      };
    });
  };

  // --- RENDER STEPS ---

  // STEP 1
  const renderStep1 = () => (
    <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto animate-in fade-in slide-in-from-right duration-500">
      {servicesList.map((service) => (
        <div
          key={service.id}
          onClick={() => {
            setFormData({ ...formData, serviceCategory: service.id });
            handleNext();
          }}
          className={`group glass-card border-2 rounded-3xl p-8 cursor-pointer transition-all duration-300 relative overflow-hidden
            ${formData.serviceCategory === service.id 
              ? "bg-primary/5 border-primary shadow-xl scale-[1.02]" 
              : "bg-secondary/10 border-transparent hover:border-primary/20 hover:scale-[1.02]"
            }`}
        >
          <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-sm transition-colors duration-300
            ${formData.serviceCategory === service.id ? "bg-primary text-white" : "bg-white text-primary"}`}>
            <service.icon className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-display font-semibold mb-3">{service.title}</h3>
          <p className="text-muted-foreground leading-relaxed text-sm">{service.description}</p>
          <div className={`absolute top-6 right-6 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all
            ${formData.serviceCategory === service.id ? "border-primary bg-primary" : "border-gray-300"}`}>
            {formData.serviceCategory === service.id && <CheckCircle2 className="w-4 h-4 text-white" />}
          </div>
        </div>
      ))}
    </div>
  );

  // STEP 2
  const renderStep2 = () => (
    <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-right duration-500 space-y-10">
      {/* Clean Type Selector */}
      <div className="flex flex-wrap justify-center gap-4">
        {Object.keys(CLEANING_TYPE_PRICES).map((type) => (
          <button
            key={type}
            onClick={() => setFormData({ ...formData, cleaningType: type as CleaningType })}
            className={`px-6 py-3 rounded-full text-sm font-semibold transition-all border
              ${formData.cleaningType === type 
                ? "bg-primary text-white border-primary shadow-lg scale-105" 
                : "bg-white text-gray-600 border-gray-200 hover:border-primary/50"}`}
          >
            {type} Clean
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-12">
        {/* Rooms Counters */}
        <div className="space-y-6">
          <h3 className="font-display font-semibold text-xl mb-4 text-center md:text-left">Room Details</h3>
          <div className="space-y-3">
             <RoomCounter label="Bedrooms" count={formData.homeDetails.bedrooms || 0} onUpdate={(v) => updateRooms('bedrooms', v)} />
             <RoomCounter label="Bathrooms" count={formData.homeDetails.bathrooms || 0} onUpdate={(v) => updateRooms('bathrooms', v)} />
             <RoomCounter label="Kitchens" count={formData.homeDetails.kitchens || 0} onUpdate={(v) => updateRooms('kitchens', v)} />
             <RoomCounter label="Other Areas" count={formData.homeDetails.other || 0} onUpdate={(v) => updateRooms('other', v)} />
          </div>
        </div>

        {/* Extras Grid */}
        <div>
          <h3 className="font-display font-semibold text-xl mb-4 text-center md:text-left">Extras</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {(Object.keys(EXTRA_PRICES) as Extra[]).map((extra) => (
              <button
                key={extra}
                onClick={() => toggleExtra(extra)}
                className={`p-3 text-xs font-medium rounded-xl border transition-all truncate
                  ${formData.extras?.includes(extra)
                    ? "bg-primary/10 border-primary text-primary"
                    : "bg-white border-gray-100 text-gray-500 hover:border-primary/30"
                  }`}
              >
                {extra}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => {
    const today = new Date();
    const currentMonth = formData.selectedDate ? formData.selectedDate.getMonth() : today.getMonth();
    const currentYear = formData.selectedDate ? formData.selectedDate.getFullYear() : today.getFullYear();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
    const monthName = new Date(currentYear, currentMonth).toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

    const handleDateSelect = (day: number) => {
      const newDate = new Date(currentYear, currentMonth, day);
      if (newDate >= today) {
        setFormData(prev => ({ ...prev, selectedDate: newDate }));
      }
    };

    const isDateSelected = (day: number) => {
      if (!formData.selectedDate) return false;
      return formData.selectedDate.getDate() === day && 
             formData.selectedDate.getMonth() === currentMonth &&
             formData.selectedDate.getFullYear() === currentYear;
    };

    const isPastDate = (day: number) => {
      const date = new Date(currentYear, currentMonth, day);
      const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());
      return date < todayStart;
    };

    return (
    <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-right duration-500">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Calendar */}
        <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <span className="font-bold text-lg">Select Date</span>
            <span className="text-sm text-gray-500">{monthName}</span>
          </div>
          <div className="grid grid-cols-7 gap-2 text-center text-sm mb-2 text-gray-400">
            {['S','M','T','W','T','F','S'].map((d, i) => <div key={`${d}-${i}`}>{d}</div>)}
          </div>
          <div className="grid grid-cols-7 gap-2">
            {/* Empty cells for days before the first of the month */}
            {Array.from({length: firstDayOfMonth}).map((_, i) => (
              <div key={`empty-${i}`} className="h-8 w-8" />
            ))}
            {Array.from({length: daysInMonth}).map((_, i) => {
              const day = i + 1;
              const past = isPastDate(day);
              const selected = isDateSelected(day);
              return (
                <button 
                  key={day}
                  onClick={() => !past && handleDateSelect(day)}
                  disabled={past}
                  className={`h-8 w-8 rounded-full flex items-center justify-center text-sm transition-all
                    ${selected ? "bg-primary text-white shadow-md" : ""}
                    ${past ? "text-gray-300 cursor-not-allowed" : "hover:bg-gray-100 text-gray-600"}
                  `}
                >
                  {day}
                </button>
              );
            })}
          </div>
          {formData.selectedDate && (
            <div className="mt-4 text-sm text-primary font-medium">
              Selected: {formData.selectedDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
            </div>
          )}
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Time Preference</label>
            <select 
              className="w-full p-3 bg-gray-50 rounded-xl border-none text-gray-600 outline-none"
              value={formData.selectedTime}
              onChange={(e) => setFormData(prev => ({ ...prev, selectedTime: e.target.value }))}
            >
              <option>08:00 AM - 10:00 AM</option>
              <option>10:00 AM - 12:00 PM</option>
              <option>12:00 PM - 02:00 PM</option>
            </select>
          </div>
        </div>

        {/* Frequency Selection */}
        <div className="space-y-4 flex flex-col justify-center">
          <h3 className="font-display font-semibold text-xl mb-2">How Often?</h3>
          {(Object.entries(FREQUENCY_DISCOUNTS) as [Frequency, number][]).map(([key, discount]) => (
            <div
              key={key}
              onClick={() => setFormData({ ...formData, frequency: key })}
              className={`p-4 rounded-2xl border-2 cursor-pointer flex items-center justify-between transition-all
                ${formData.frequency === key
                  ? "border-primary bg-primary/5 shadow-md" 
                  : "border-transparent bg-gray-50 hover:bg-gray-100"}`}
            >
              <div className="flex flex-col">
                <span className={`font-bold ${formData.frequency === key ? "text-primary" : "text-gray-700"}`}>
                  {key}
                </span>
                {discount > 0 && <span className="text-xs text-gray-500">Save {discount}%</span>}
              </div>
              {discount > 0 ? (
                 <span className="text-xs font-semibold px-3 py-1 bg-white rounded-full shadow-sm text-gray-600">
                   {discount}% OFF
                 </span>
              ) : (
                <span className="text-xs font-semibold px-3 py-1 bg-white rounded-full shadow-sm text-gray-600">Standard</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
  };

  // STEP 4
  const renderStep4 = () => (
    <div className="max-w-2xl mx-auto animate-in fade-in slide-in-from-right duration-500 space-y-6">
      {[
        { id: 'entry', label: 'How will we get inside?', options: ['I will be home', 'Hidden Key', 'Lockbox Code', 'Other'] },
        { id: 'parking', label: 'Where should we park?', options: ['Driveway', 'Street Parking', 'Visitor Spot', 'Other'] },
        { id: 'pets', label: 'Do you have pets?', options: ['No Pets', 'Dog(s)', 'Cat(s)', 'Other'] },
      ].map((field) => (
        <div key={field.id} className="bg-gray-50 p-6 rounded-2xl">
          <label className="block text-sm font-bold text-gray-800 mb-4">{field.label}</label>
          <div className="flex flex-wrap gap-3">
            {field.options.map((opt) => (
              <button
                key={opt}
                onClick={() => setFormData({ ...formData, instructions: { ...formData.instructions, [field.id]: opt } })}
                className={`px-4 py-2 text-sm rounded-lg border transition-all
                  ${(formData.instructions as any)[field.id] === opt 
                    ? "bg-primary text-white border-primary shadow-md" 
                    : "bg-white text-gray-600 border-gray-200 hover:border-primary/30"}`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      ))}
      <div>
        <label className="block text-sm font-bold text-gray-800 mb-2 ml-1">Additional Comments</label>
        <textarea 
          className="w-full p-4 bg-gray-50 rounded-2xl border-transparent focus:border-primary focus:ring-0 outline-none resize-none h-32"
          placeholder="Gate codes, specific focus areas, etc..."
          value={formData.instructions.notes}
          onChange={(e) => setFormData({...formData, instructions: {...formData.instructions, notes: e.target.value}})}
        />
      </div>
    </div>
  );

  // STEP 5
  // STEP 5: Summary
  const renderStep5 = () => (
    <div className="max-w-5xl mx-auto animate-in fade-in slide-in-from-right duration-500">
      <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-start">
        
        {/* Contact Form (Left Side) */}
        <div className="space-y-4 order-2 md:order-1">
          <h3 className="text-2xl font-display font-bold mb-6">Contact Details</h3>
          <div className="grid grid-cols-2 gap-4">
             <InputField icon={User} label="First Name" placeholder="John" 
               value={formData.contact.firstName} onChange={(v: string) => setFormData(p => ({...p, contact: {...p.contact, firstName: v}}))} />
             <InputField icon={User} label="Last Name" placeholder="Doe" 
               value={formData.contact.lastName} onChange={(v: string) => setFormData(p => ({...p, contact: {...p.contact, lastName: v}}))} />
          </div>
          
          <InputField icon={Mail} label="Email Address" placeholder="john@example.com" type="email"
             value={formData.contact.email} onChange={(v: string) => setFormData(p => ({...p, contact: {...p.contact, email: v}}))} />
          
          <InputField icon={Phone} label="Phone Number" placeholder="+61 ..." type="tel"
             value={formData.contact.phone} onChange={(v: string) => setFormData(p => ({...p, contact: {...p.contact, phone: v}}))} />

          <div className="space-y-2">
            <label className="text-xs font-semibold text-gray-500 uppercase">Service Address</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <input 
                type="text" 
                className="w-full pl-10 pr-12 py-2.5 bg-gray-50 rounded-xl outline-none focus:ring-2 focus:ring-primary/20 transition-all" 
                placeholder="123 Clean St..." 
                value={formData.contact.address}
                onChange={(e) => setFormData(p => ({...p, contact: {...p.contact, address: e.target.value}}))}
              />
              <button 
                onClick={handleUseCurrentLocation}
                disabled={isLoadingLoc}
                className="absolute right-2 top-2 p-1.5 hover:bg-gray-200 rounded-lg transition-colors text-gray-500"
                title="Use Current Location"
              >
                {isLoadingLoc ? <Loader2 className="w-4 h-4 animate-spin" /> : <MapPin className="w-4 h-4" />}
              </button>
            </div>
          </div>
          
          <button className="w-full mt-6 bg-primary text-white py-4 rounded-xl font-bold shadow-lg shadow-primary/25 hover:shadow-xl hover:scale-[1.02] transition-all flex items-center justify-center gap-2">
            Book Now & Pay
            <CreditCard className="w-4 h-4" />
          </button>
        </div>

        {/* Summary Card (Right Side) */}
        <div className="bg-gray-900 text-white rounded-3xl p-8 shadow-2xl order-1 md:order-2 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
          
          <h3 className="text-xl font-display font-bold mb-6 relative z-10">Booking Summary</h3>
          
          <div className="space-y-4 relative z-10 text-gray-300 text-sm">
            <div className="flex justify-between border-b border-white/10 pb-4">
              <span>Service Type</span>
              <span className="text-white font-medium capitalize">{formData.cleaningType} Clean</span>
            </div>
            
            <div className="flex justify-between border-b border-white/10 pb-4">
              <span>Frequency</span>
              <span className="text-white font-medium capitalize">{formData.frequency}</span>
            </div>

            <div className="py-2">
              <span className="block mb-2 text-xs uppercase tracking-wider text-gray-500">Breakdown</span>
              
              {/* MANUAL LISTING to avoid Key Mismatch Crash */}
              {(formData.homeDetails.bedrooms || 0) > 0 && (
                <div className="flex justify-between mb-1">
                  <span>{formData.homeDetails.bedrooms}x Bedroom</span>
                  <span>${HOME_DETAIL_PRICES.Bedroom * (formData.homeDetails.bedrooms || 0)}</span>
                </div>
              )}
              {(formData.homeDetails.bathrooms || 0) > 0 && (
                <div className="flex justify-between mb-1">
                  <span>{formData.homeDetails.bathrooms}x Bathroom</span>
                  <span>${HOME_DETAIL_PRICES.Bathroom * (formData.homeDetails.bathrooms || 0)}</span>
                </div>
              )}
              {(formData.homeDetails.kitchens || 0) > 0 && (
                <div className="flex justify-between mb-1">
                  <span>{formData.homeDetails.kitchens}x Kitchen</span>
                  <span>${HOME_DETAIL_PRICES.Kitchen * (formData.homeDetails.kitchens || 0)}</span>
                </div>
              )}
              {(formData.homeDetails.other || 0) > 0 && (
                <div className="flex justify-between mb-1">
                  <span>{formData.homeDetails.other}x Other Area</span>
                  <span>${HOME_DETAIL_PRICES.Other * (formData.homeDetails.other || 0)}</span>
                </div>
              )}

              {/* Extras */}
              {pricingResult?.breakdown.extras.items.map(e => (
                 <div key={e.name} className="flex justify-between mb-1">
                   <span>+ {e.name}</span>
                   <span>${e.price}</span>
                 </div>
              ))}
            </div>

            <div className="pt-4 mt-4 border-t border-white/20">
               {pricingResult?.discounts.frequency && (
                <div className="flex justify-between text-green-400 mb-2">
                  <span>Discount ({pricingResult.discounts.frequency.name})</span>
                  <span>-${pricingResult.discounts.frequency.amount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between items-end">
                <span className="text-lg">Total Estimate</span>
                {/* Fallback to 0 if pricingResult is null to prevent crash */}
                <span className="text-3xl font-display font-bold text-primary">
                  ${(pricingResult?.total || 0).toFixed(2)}
                </span>
              </div>
              <p className="text-[10px] text-gray-500 mt-2 text-right">*Final price may vary upon inspection</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <section id="services" className="py-24 relative overflow-hidden bg-gray-50/50">
      {/* Background Decor */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-x-1/2" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-accent/5 rounded-full blur-3xl translate-x-1/3" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="bg-white rounded-[3rem] shadow-2xl relative overflow-hidden max-w-6xl mx-auto min-h-[700px] flex flex-col py-12 px-6 md:px-16 transition-all duration-500">
          
          {/* Nav & Header */}
          {currentStep > 1 && (
            <button 
              onClick={handlePrev}
              className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-12 h-12 bg-white hover:bg-gray-50 border border-gray-100 rounded-full flex items-center justify-center shadow-lg transition-all z-20 group hover:scale-110"
            >
              <ChevronLeft className="w-6 h-6 text-gray-400 group-hover:text-gray-900" />
            </button>
          )}
          
          {currentStep < totalSteps && (
            <button 
              onClick={handleNext}
              disabled={currentStep === 1 && !formData.serviceCategory}
              className={`absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all z-20 group
                ${(currentStep === 1 && !formData.serviceCategory) 
                  ? "bg-gray-100 cursor-not-allowed opacity-50" 
                  : "bg-black hover:bg-gray-800 hover:scale-110 cursor-pointer"}`}
            >
              <ChevronRight className={`w-6 h-6 ${currentStep === 1 && !formData.serviceCategory ? "text-gray-400" : "text-white"}`} />
            </button>
          )}

          <div className="relative z-10 flex-grow flex flex-col justify-center">
            <div className="text-center mb-10">
              <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider rounded-full mb-4">
                Step {currentStep} of {totalSteps}
              </span>
              <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">
                {currentStep === 1 && <><span className="text-primary">Free</span> Quote</>}
                {currentStep === 2 && "Property Details"}
                {currentStep === 3 && "Schedule Cleaning"}
                {currentStep === 4 && "Special Instructions"}
                {currentStep === 5 && "Finalize Booking"}
              </h2>
            </div>

            <div className="min-h-[400px]">
              {currentStep === 1 && renderStep1()}
              {currentStep === 2 && renderStep2()}
              {currentStep === 3 && renderStep3()}
              {currentStep === 4 && renderStep4()}
              {currentStep === 5 && renderStep5()}
            </div>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-3 mt-12 relative z-20">
            {Array.from({ length: totalSteps }).map((_, index) => (
              <div
                key={index}
                className={`h-2 rounded-full transition-all duration-500 ease-out
                  ${index + 1 === currentStep ? "w-10 bg-black" : "w-2 bg-gray-200"}`}
              />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

// --- SUBCOMPONENTS ---

const RoomCounter = ({ label, count, onUpdate }: { label: string, count: number, onUpdate: (val: number) => void }) => (
  <div className="flex items-center justify-between bg-gray-50 p-4 rounded-2xl">
    <span className="capitalize font-medium text-gray-700">{label}</span>
    <div className="flex items-center gap-4">
      <button onClick={() => onUpdate(-1)} className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center text-gray-600 hover:bg-red-50 hover:text-red-500 transition-colors"><Minus className="w-4 h-4" /></button>
      <span className="w-6 text-center font-bold text-lg">{count}</span>
      <button onClick={() => onUpdate(1)} className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center text-gray-600 hover:bg-green-50 hover:text-green-500 transition-colors"><Plus className="w-4 h-4" /></button>
    </div>
  </div>
);

const InputField = ({ label, icon: Icon, value, onChange, ...props }: any) => (
  <div className="space-y-2">
    <label className="text-xs font-semibold text-gray-500 uppercase">{label}</label>
    <div className="relative">
      <Icon className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
      <input 
        className="w-full pl-10 pr-4 py-2.5 bg-gray-50 rounded-xl outline-none focus:ring-2 focus:ring-primary/20 transition-all" 
        value={value}
        onChange={(e) => onChange(e.target.value)}
        {...props} 
      />
    </div>
  </div>
);

export default Services;
