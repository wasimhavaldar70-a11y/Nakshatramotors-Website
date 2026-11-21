import { useState, useEffect } from 'react';
import { Enquiry, FAQItem, ScooterModel, SiteSettings, Testimonial } from '../types';
import {
  INITIAL_FAQS,
  INITIAL_SCOOTERS,
  INITIAL_SETTINGS,
  INITIAL_TESTIMONIALS,
} from '../data/seedData';
import { getSupabase, isSupabaseConfigured } from './supabaseClient';

const STORAGE_KEYS = {
  SCOOTERS: 'nakshatra_scooters',
  SCOOTERS_LINEUP_MIGRATION: 'nakshatra_scooters_lineup_v6',
  ENQUIRIES: 'nakshatra_enquiries',
  TESTIMONIALS: 'nakshatra_testimonials',
  FAQS: 'nakshatra_faqs',
  SETTINGS: 'nakshatra_settings',
  ADMIN_AUTH: 'nakshatra_admin_authenticated',
};

const LEGACY_SCOOTER_IDS = new Set([
  'hestur-dyno-flagship',
  'hestur-dyno-160',
  'hestur-werewolf',
  'hestur-werewolf-plus',
  'hestur-v200-flagship',
  'hestur-v100-pro',
  'hestur-v80-lite',
  'hestur-cargo-delivery',
]);

// Initial sample inquiries for realistic demonstration
const INITIAL_ENQUIRIES: Enquiry[] = [
  {
    id: 'enq-1',
    fullName: 'Arun Varma',
    mobile: '9845112233',
    email: 'arun.varma@gmail.com',
    scooterModel: 'Hestur Werewolf+',
    enquiryType: 'Test Ride',
    message: 'Interested in booking a weekend test ride for the Werewolf+ in Crimson Red.',
    preferredDate: '2026-11-15',
    status: 'New',
    createdAt: new Date(Date.now() - 3600000 * 4).toISOString(),
    notes: 'Requested morning slot around 10:30 AM.',
  },
  {
    id: 'enq-2',
    fullName: 'Sneha Patel',
    mobile: '9900123456',
    email: 'sneha.p@outlook.com',
    scooterModel: 'Hestur Dyno',
    enquiryType: 'Price Enquiry',
    message: 'Could you share the on-road price and GST details for the non-RTO Hestur Dyno?',
    status: 'Contacted',
    createdAt: new Date(Date.now() - 3600000 * 28).toISOString(),
    notes: 'Quotation sent over WhatsApp. Follow up on Saturday.',
  },
];

// In-memory cache + pub/sub listeners
type Listener = () => void;
const listeners = new Set<Listener>();

function notifyListeners() {
  listeners.forEach((l) => l());
}

// Helpers for localStorage
function getLocalItem<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (e) {
    console.error(`Error reading ${key} from storage:`, e);
    return fallback;
  }
}

function setLocalItem<T>(key: string, value: T): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
    notifyListeners();
  } catch (e) {
    console.error(`Error writing ${key} to storage:`, e);
  }
}

export const store = {
  // SCOOTERS
  getScooters(): ScooterModel[] {
    const stored = getLocalItem<ScooterModel[]>(STORAGE_KEYS.SCOOTERS, []);
    let list = stored.length > 0 ? stored : INITIAL_SCOOTERS;

    // One-time migration to the official lineup (Hestur Dyno 80 km, Dyno 160 km, Werewolf 150 km, Werewolf+)
    if (
      stored.length > 0 &&
      typeof window !== 'undefined' &&
      localStorage.getItem(STORAGE_KEYS.SCOOTERS_LINEUP_MIGRATION) !== 'done'
    ) {
      const customScooters = stored.filter((s) => !LEGACY_SCOOTER_IDS.has(s.id));
      list = [...INITIAL_SCOOTERS, ...customScooters];
      try {
        localStorage.setItem(STORAGE_KEYS.SCOOTERS, JSON.stringify(list));
        localStorage.setItem(STORAGE_KEYS.SCOOTERS_LINEUP_MIGRATION, 'done');
      } catch (e) {
        console.error('Error migrating scooter lineup in storage:', e);
      }
    }

    return list.filter((s) => s.id !== 'hestur-v80-lite' && s.id !== 'hestur-cargo-delivery');
  },

  getScooterBySlug(slug: string): ScooterModel | undefined {
    const list = this.getScooters();
    return list.find((s) => s.slug === slug || s.id === slug);
  },

  saveScooter(model: ScooterModel): void {
    const list = this.getScooters();
    const index = list.findIndex((s) => s.id === model.id);
    let updated: ScooterModel[];
    if (index >= 0) {
      updated = [...list];
      updated[index] = model;
    } else {
      updated = [...list, model];
    }
    setLocalItem(STORAGE_KEYS.SCOOTERS, updated);

    // Sync to Supabase if configured
    if (isSupabaseConfigured()) {
      const supabase = getSupabase();
      if (supabase) {
        supabase
          .from('scooters')
          .upsert({
            id: model.id,
            slug: model.slug,
            name: model.name,
            series: model.series,
            tagline: model.tagline,
            description: model.description,
            price: model.price,
            certified_range: model.certifiedRange,
            top_speed: model.topSpeed,
            battery_capacity: model.batteryCapacity,
            charging_time: model.chargingTime,
            battery_chemistry: model.batteryChemistry,
            motor_power: model.motorPower,
            torque: model.torque,
            acceleration: model.acceleration,
            brakes: model.brakes,
            suspension: model.suspension,
            curb_weight: model.curbWeight,
            boot_space: model.bootSpace,
            warranty_vehicle: model.warranty.vehicle,
            warranty_battery: model.warranty.battery,
            features: model.features,
            colors: model.colors,
            image: model.image,
            gallery: model.gallery,
            featured: model.featured,
            display_order: model.displayOrder,
            status: model.status,
            updated_at: new Date().toISOString(),
          })
          .then(({ error }) => {
            if (error) console.error('Supabase scooter upsert error:', error);
          });
      }
    }
  },

  deleteScooter(id: string): void {
    const list = this.getScooters();
    const updated = list.filter((s) => s.id !== id);
    setLocalItem(STORAGE_KEYS.SCOOTERS, updated);

    if (isSupabaseConfigured()) {
      const supabase = getSupabase();
      if (supabase) {
        supabase.from('scooters').delete().eq('id', id).then();
      }
    }
  },

  // ENQUIRIES
  getEnquiries(): Enquiry[] {
    return getLocalItem<Enquiry[]>(STORAGE_KEYS.ENQUIRIES, INITIAL_ENQUIRIES);
  },

  addEnquiry(enquiry: Omit<Enquiry, 'id' | 'createdAt' | 'status'> & { status?: Enquiry['status'] }): Enquiry {
    const newEnquiry: Enquiry = {
      ...enquiry,
      id: 'enq-' + Date.now().toString(36) + Math.random().toString(36).substring(2, 6),
      status: enquiry.status || 'New',
      createdAt: new Date().toISOString(),
    };
    const list = this.getEnquiries();
    const updated = [newEnquiry, ...list];
    setLocalItem(STORAGE_KEYS.ENQUIRIES, updated);

    // Sync to Supabase
    if (isSupabaseConfigured()) {
      const supabase = getSupabase();
      if (supabase) {
        supabase
          .from('enquiries')
          .insert({
            full_name: newEnquiry.fullName,
            mobile: newEnquiry.mobile,
            email: newEnquiry.email || null,
            scooter_model: newEnquiry.scooterModel,
            enquiry_type: newEnquiry.enquiryType,
            message: newEnquiry.message,
            preferred_date: newEnquiry.preferredDate || null,
            status: newEnquiry.status,
            notes: newEnquiry.notes || null,
          })
          .then(({ error }) => {
            if (error) console.error('Supabase enquiry insert error:', error);
          });
      }
    }

    return newEnquiry;
  },

  updateEnquiry(id: string, updates: Partial<Enquiry>): void {
    const list = this.getEnquiries();
    const updated = list.map((e) => (e.id === id ? { ...e, ...updates } : e));
    setLocalItem(STORAGE_KEYS.ENQUIRIES, updated);

    if (isSupabaseConfigured()) {
      const supabase = getSupabase();
      if (supabase) {
        supabase
          .from('enquiries')
          .update({
            status: updates.status,
            notes: updates.notes,
            updated_at: new Date().toISOString(),
          })
          .eq('id', id)
          .then();
      }
    }
  },

  deleteEnquiry(id: string): void {
    const list = this.getEnquiries();
    const updated = list.filter((e) => e.id !== id);
    setLocalItem(STORAGE_KEYS.ENQUIRIES, updated);

    if (isSupabaseConfigured()) {
      const supabase = getSupabase();
      if (supabase) {
        supabase.from('enquiries').delete().eq('id', id).then();
      }
    }
  },

  // TESTIMONIALS
  getTestimonials(): Testimonial[] {
    const stored = getLocalItem<Testimonial[]>(STORAGE_KEYS.TESTIMONIALS, []);
    return stored.length > 0 ? stored : INITIAL_TESTIMONIALS;
  },

  saveTestimonial(testimonial: Testimonial): void {
    const list = this.getTestimonials();
    const index = list.findIndex((t) => t.id === testimonial.id);
    let updated: Testimonial[];
    if (index >= 0) {
      updated = [...list];
      updated[index] = testimonial;
    } else {
      updated = [testimonial, ...list];
    }
    setLocalItem(STORAGE_KEYS.TESTIMONIALS, updated);
  },

  deleteTestimonial(id: string): void {
    const list = this.getTestimonials();
    const updated = list.filter((t) => t.id !== id);
    setLocalItem(STORAGE_KEYS.TESTIMONIALS, updated);
  },

  // FAQS
  getFaqs(): FAQItem[] {
    const stored = getLocalItem<FAQItem[]>(STORAGE_KEYS.FAQS, []);
    return stored.length > 0 ? stored : INITIAL_FAQS;
  },

  saveFaq(faq: FAQItem): void {
    const list = this.getFaqs();
    const index = list.findIndex((f) => f.id === faq.id);
    let updated: FAQItem[];
    if (index >= 0) {
      updated = [...list];
      updated[index] = faq;
    } else {
      updated = [...list, faq];
    }
    setLocalItem(STORAGE_KEYS.FAQS, updated);
  },

  deleteFaq(id: string): void {
    const list = this.getFaqs();
    const updated = list.filter((f) => f.id !== id);
    setLocalItem(STORAGE_KEYS.FAQS, updated);
  },

  // SETTINGS
  getSettings(): SiteSettings {
    const stored = getLocalItem<SiteSettings>(STORAGE_KEYS.SETTINGS, INITIAL_SETTINGS);
    // Auto-migrate if stored settings contain old demo numbers or old city
    if (
      stored &&
      (stored.phone?.includes('98450') ||
        stored.city === 'Bengaluru' ||
        stored.address?.includes('Outer Ring Road') ||
        !stored.phone?.includes('7972131513'))
    ) {
      setLocalItem(STORAGE_KEYS.SETTINGS, INITIAL_SETTINGS);
      return INITIAL_SETTINGS;
    }
    return stored;
  },

  saveSettings(settings: SiteSettings): void {
    setLocalItem(STORAGE_KEYS.SETTINGS, settings);

    if (isSupabaseConfigured()) {
      const supabase = getSupabase();
      if (supabase) {
        supabase
          .from('site_settings')
          .upsert({
            id: 'default_settings',
            dealer_name: settings.dealerName,
            brand_affiliation: settings.brandAffiliation,
            hero_headline: settings.heroHeadline,
            hero_supporting_text: settings.heroSupportingText,
            phone: settings.phone,
            whatsapp_number: settings.whatsappNumber,
            email: settings.email,
            address: settings.address,
            city: settings.city,
            state: settings.state,
            pincode: settings.pincode,
            operating_hours: settings.operatingHours,
            happy_customers_count: settings.happyCustomersCount,
            showroom_location_url: settings.showroomLocationUrl,
            battery_chemistry_highlight: settings.batteryChemistryHighlight,
            battery_warranty_highlight: settings.batteryWarrantyHighlight,
            updated_at: new Date().toISOString(),
          })
          .then();
      }
    }
  },

  // ADMIN AUTH
  isAdminLoggedIn(): boolean {
    if (typeof window === 'undefined') return false;
    return localStorage.getItem(STORAGE_KEYS.ADMIN_AUTH) === 'true';
  },

  setAdminLoggedIn(status: boolean): void {
    if (typeof window === 'undefined') return;
    if (status) {
      localStorage.setItem(STORAGE_KEYS.ADMIN_AUTH, 'true');
    } else {
      localStorage.removeItem(STORAGE_KEYS.ADMIN_AUTH);
    }
    notifyListeners();
  },

  // RESET
  resetDefaults(): void {
    setLocalItem(STORAGE_KEYS.SCOOTERS, INITIAL_SCOOTERS);
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEYS.SCOOTERS_LINEUP_MIGRATION, 'done');
    }
    setLocalItem(STORAGE_KEYS.SETTINGS, INITIAL_SETTINGS);
    setLocalItem(STORAGE_KEYS.FAQS, INITIAL_FAQS);
    setLocalItem(STORAGE_KEYS.TESTIMONIALS, INITIAL_TESTIMONIALS);
    setLocalItem(STORAGE_KEYS.ENQUIRIES, INITIAL_ENQUIRIES);
  },
};

// React Hook for automatic re-renders on state changes
export function useStore() {
  const [, setTick] = useState(0);

  useEffect(() => {
    const onUpdate = () => setTick((t) => t + 1);
    listeners.add(onUpdate);
    return () => {
      listeners.delete(onUpdate);
    };
  }, []);

  return store;
}
