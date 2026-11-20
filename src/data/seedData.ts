import { FAQItem, ScooterModel, SiteSettings, Testimonial } from '../types';

export const INITIAL_SCOOTERS: ScooterModel[] = [
  {
    id: 'hestur-dyno-flagship',
    slug: 'hestur-dyno',
    name: 'Hestur Dyno',
    series: 'Non-RTO Electric Scooter',
    tagline: 'No Registration. No Licence. 60–80 km Range at 25 km/h.',
    description:
      'The Hestur Energy Dyno is a low-speed, non-RTO electric scooter requiring no registration, no number plate, no insurance, and no driving licence. Powered by a 1000 W motor with a 4-year warranty setup and smart urban convenience features.',
    price: 0,
    certifiedRange: 80,
    topSpeed: 25,
    batteryCapacity: '4-Yr Warranty',
    chargingTime: 'Home Socket',
    batteryChemistry: 'EV Battery Pack (4-Year Warranty Setup)',
    motorPower: '1000 W Motor',
    torque: 'High-Efficiency City Drive',
    acceleration: 'Smooth Non-RTO Pickup',
    brakes: 'Front & Rear Commuter Brakes',
    suspension: 'Telescopic Front & Dual Rear Springs',
    curbWeight: 'Lightweight Non-RTO Chassis',
    bootSpace: 'Under-Seat Storage',
    warranty: {
      vehicle: '4 Years Warranty Setup',
      battery: '4 Years Battery Warranty Setup',
    },
    features: [
      'Non-RTO Electric Scooter — No Registration, Number Plate, Insurance or Driving Licence Required',
      '1000 W Motor with 25 km/h Top Speed (Low-Speed Non-RTO Category)',
      '60 to 80 km Driving Range per Charge',
      'Anti-Theft Alarm & Keyless Entry',
      'Digital Instrument Display',
      'Built-in USB Smartphone Charging',
      'Day/Night LED Lights',
    ],
    colors: [
      { name: 'Metallic Crimson Red', hex: '#DC2626' },
      { name: 'Stealth Black', hex: '#18181B' },
      { name: 'Glacier White', hex: '#F8FAFC' },
    ],
    image: '/assets/aistudio/image_3fa52802.png',
    gallery: [
      '/assets/aistudio/image_3fa52802.png',
      '/assets/aistudio/1920x1080_3_545056cd.jpg',
    ],
    featured: true,
    displayOrder: 1,
    status: 'available',
  },
  {
    id: 'hestur-werewolf',
    slug: 'hestur-werewolf',
    name: 'Hestur Werewolf',
    series: 'High-Range Performance',
    tagline: 'Up to 180 km Range (up to 300 km in Eco mode) · ~65 km/h.',
    description:
      'Engineered for long-distance riders, the Hestur Werewolf delivers up to 180 km range (or up to 300 km depending on riding mode/configuration such as Eco mode), around 65 km/h top speed, a removable NMC lithium-ion battery (~5-hour charging time), dual disc brakes, hill hold/assist, and a 7 years / 70,000 km warranty.',
    price: 0,
    certifiedRange: 180,
    topSpeed: 65,
    batteryCapacity: 'Removable NMC',
    chargingTime: '~5 hrs',
    batteryChemistry: 'Removable NMC Lithium-Ion Battery',
    motorPower: 'High-Torque Electric Motor',
    torque: 'Hill-Assist Tuned Torque',
    acceleration: 'Instant Electric Throttle Response',
    brakes: 'Dual Disc Brakes (Front & Rear)',
    suspension: 'Telescopic Front & Dual Hydraulic Rear',
    curbWeight: 'Balanced Touring Frame',
    bootSpace: 'Under-Seat + Removable Battery Pack',
    warranty: {
      vehicle: '7 Years / 70,000 km Warranty',
      battery: '7 Years / 70,000 km Battery Warranty',
    },
    features: [
      'Up to 180 km Range (Up to 300 km in Eco Mode / Configuration)',
      'Top Speed Around 65 km/h',
      'Removable NMC Lithium-Ion Battery (~5-Hour Charging Time)',
      'Dual Disc Brakes',
      'Hill Hold / Hill Assist',
      'Reverse Gear Assist',
      'Anti-Theft Security System',
      'Smart Digital Display',
      '7 Years / 70,000 km Warranty',
    ],
    colors: [
      { name: 'Hyper Crimson Red', hex: '#DC2626' },
      { name: 'Solar Yellow', hex: '#EAB308' },
      { name: 'Stealth Obsidian', hex: '#18181B' },
    ],
    image: '/assets/scooters/hestur-werewolf.webp',
    gallery: [
      '/assets/scooters/hestur-werewolf.webp',
      '/assets/aistudio/1920x1080_2_89056914.jpg',
    ],
    featured: true,
    displayOrder: 2,
    status: 'available',
  },
  {
    id: 'hestur-werewolf-plus',
    slug: 'hestur-werewolf-plus',
    name: 'Hestur Werewolf+',
    series: 'Flagship Urban & Touring',
    tagline: 'Up to 120 km Range (up to 300 km in Eco mode) · ~65 km/h.',
    description:
      'The Hestur Werewolf+ pairs signature styling with high-efficiency capability—offering up to 120 km range (or up to 300 km depending on riding mode/configuration like Eco mode), around 65 km/h top speed, removable NMC lithium-ion battery (~5-hour charging time), dual disc brakes, hill hold/assist, and a 7 years / 70,000 km warranty.',
    price: 0,
    certifiedRange: 120,
    topSpeed: 65,
    batteryCapacity: 'Removable NMC',
    chargingTime: '~5 hrs',
    batteryChemistry: 'Removable NMC Lithium-Ion Battery',
    motorPower: 'High-Efficiency Electric Drive',
    torque: 'Hill-Assist Tuned Torque',
    acceleration: 'Smooth City & Highway Pickup',
    brakes: 'Dual Disc Brakes (Front & Rear)',
    suspension: 'Telescopic Front & Hydraulic Rear',
    curbWeight: 'Balanced Urban Chassis',
    bootSpace: 'Under-Seat + Removable Battery Pack',
    warranty: {
      vehicle: '7 Years / 70,000 km Warranty',
      battery: '7 Years / 70,000 km Battery Warranty',
    },
    features: [
      'Up to 120 km Range (Up to 300 km in Eco Mode / Configuration)',
      'Top Speed Around 65 km/h',
      'Removable NMC Lithium-Ion Battery (~5-Hour Charging Time)',
      'Dual Disc Brakes',
      'Hill Hold / Hill Assist',
      'Reverse Gear Assist',
      'Anti-Theft Security System',
      'Smart Digital Display',
      '7 Years / 70,000 km Warranty',
    ],
    colors: [
      { name: 'Crimson Red', hex: '#DC2626' },
      { name: 'Pearl Frost White', hex: '#F8FAFC' },
      { name: 'Midnight Onyx', hex: '#0F172A' },
    ],
    image: '/assets/scooters/hestur-werewolf-plus.jpg',
    gallery: [
      '/assets/scooters/hestur-werewolf-plus.jpg',
      '/assets/scooters/hestur-werewolf-plus-front.jpg',
      '/assets/aistudio/1920x1080_bfe514b2.jpg',
    ],
    featured: true,
    displayOrder: 3,
    status: 'available',
  },
];

export const INITIAL_TESTIMONIALS: Testimonial[] = [
  {
    id: 't-1',
    name: 'Vikramaditya Hegde',
    city: 'Peth Vadgaon',
    scooterModel: 'Hestur V200 Flagship',
    rating: 5,
    comment:
      'Bought my Hestur V200 from Nakshatra Motors 6 months ago. The claimed 160 km range is remarkably realistic—I easily get 145 km in normal city traffic. My monthly fuel expenditure dropped from ₹4,500 on my old 125cc scooter to barely ₹350 in electricity!',
    date: 'February 2026',
    verified: true,
  },
  {
    id: 't-2',
    name: 'Pooja Kulkarni',
    city: 'Kolhapur',
    scooterModel: 'Hestur V100 Pro',
    rating: 5,
    comment:
      'The dealership experience at Nakshatra Motors was top tier. The team arranged a comprehensive 45-minute test ride, explained the battery thermal safety, and delivered the scooter within 3 days with complete registration assistance. Highly recommend!',
    date: 'January 2026',
    verified: true,
  },
  {
    id: 't-3',
    name: 'Suresh Patil',
    city: 'Peth Vadgaon',
    scooterModel: 'Hestur V200 Flagship',
    rating: 5,
    comment:
      'Solid automotive build quality. No rattling plastic parts, supreme suspension dampening over speed breakers, and the digital console navigation is bright even in direct sunlight. Excellent after-sales service checkup by Nakshatra Motors.',
    date: 'December 2025',
    verified: true,
  },
];

export const INITIAL_FAQS: FAQItem[] = [
  {
    id: 'faq-1',
    question: 'What is the real-world driving range of Hestur electric scooters?',
    answer:
      'Hestur Werewolf offers up to 180 km range and Hestur Werewolf+ offers up to 120 km range (or up to 300 km depending on riding mode/configuration such as Eco mode). The low-speed non-RTO Hestur Dyno provides ~60 to 80 km per charge.',
    category: 'range',
    displayOrder: 1,
  },
  {
    id: 'faq-2',
    question: 'How long does the battery take to charge?',
    answer:
      'Hestur Werewolf and Werewolf+ feature a removable NMC lithium-ion battery with an approximate 5-hour charging time on a standard household socket, allowing convenient charging at home or work.',
    category: 'charging',
    displayOrder: 2,
  },
  {
    id: 'faq-3',
    question: 'What is the battery warranty and expected lifespan?',
    answer:
      'Hestur Werewolf and Werewolf+ come with a 7 years / 70,000 km warranty across official platform listings, while the non-RTO Hestur Dyno features a 4-year warranty setup.',
    category: 'battery',
    displayOrder: 3,
  },
  {
    id: 'faq-4',
    question: 'What is the maximum scooter speed across models?',
    answer:
      'Hestur Werewolf and Werewolf+ deliver a top speed of around 65 km/h. The Hestur Energy Dyno is a low-speed non-RTO electric scooter with a 25 km/h top speed requiring no registration, number plate, insurance, or driving licence.',
    category: 'range',
    displayOrder: 4,
  },
  {
    id: 'faq-5',
    question: 'What is the approximate charging cost per full charge?',
    answer:
      'A full charge of the 3.4 kWh battery consumes approximately 3.4 to 3.8 units of electricity. At an average domestic tariff of ₹7 to ₹8 per unit in Maharashtra, a complete full charge costs only ₹25 to ₹30, yielding an operating running cost of under ₹0.20 per kilometre (compared to ₹2.40 per km for petrol).',
    category: 'charging',
    displayOrder: 5,
  },
  {
    id: 'faq-6',
    question: 'Can I book a test ride at Nakshatra Motors?',
    answer:
      'Yes, absolutely! We encourage all prospective riders to experience the instantaneous torque and quiet ride firsthand. You can book an appointment online through our website, via direct WhatsApp, or by visiting our showroom directly. Please bring a valid Driving License.',
    category: 'purchase',
    displayOrder: 6,
  },
  {
    id: 'faq-7',
    question: 'Where is Nakshatra Motors dealership located?',
    answer:
      'Our flagship authorized dealership is located at: Front of Vadgaon Highschool, Hatkanagale Road, Peth Vadgaon, Maharashtra (416112). We are open Monday to Saturday from 9:30 AM to 8:00 PM and Sundays from 10:00 AM to 6:00 PM.',
    category: 'purchase',
    displayOrder: 7,
  },
  {
    id: 'faq-8',
    question: 'How can I purchase a scooter? What financing options are available?',
    answer:
      'You can book online or visit our showroom. We have partnerships with leading EV financing institutions (HDFC, IDFC First, Kotak, L&T Finance) offering low down-payment options starting from ₹9,999 with flexible EMI tenures of 12 to 48 months. Same-day loan approval and old petrol vehicle exchange facilities are available.',
    category: 'purchase',
    displayOrder: 8,
  },
  {
    id: 'faq-9',
    question: 'What after-sales service and maintenance support is provided?',
    answer:
      'Nakshatra Motors houses an official authorized Hestur service bay staffed by factory-certified technicians. We offer complimentary scheduled periodic inspections, genuine OEM spare parts, tyre and brake service, software and firmware updates, and roadside assistance.',
    category: 'service',
    displayOrder: 9,
  },
];

export const INITIAL_SETTINGS: SiteSettings = {
  dealerName: 'Nakshatra Motors',
  brandAffiliation: 'Authorized Hestur Energy Dealer',
  heroHeadline: 'Move Beyond Ordinary. Ride Electric.',
  heroSupportingText:
    'Discover a smarter, cleaner and more exciting way to travel with Hestur Energy electric scooters at Nakshatra Motors.',
  phone: '+91 7972131513 / +91 7350142525',
  whatsappNumber: '+917972131513',
  email: 'nakshatramotors24@gmail.com',
  address: 'Front of Vadgaon Highschool, Hatkanagale Road',
  city: 'Peth Vadgaon',
  state: 'Maharashtra',
  pincode: '416112',
  operatingHours: 'Mon - Sat: 9:30 AM – 8:00 PM | Sun: 10:00 AM – 6:00 PM',
  happyCustomersCount: 128,
  showroomLocationUrl:
    'https://maps.google.com/?q=Front+of+Vadgaon+Highschool,+Hatkanagale+Road,+Peth+Vadgaon,+Maharashtra+416112',
  batteryChemistryHighlight: 'Automotive Grade LFP with Smart Thermal Matrix',
  batteryWarrantyHighlight: '3 Years / Unlimited km Battery Warranty',
};
