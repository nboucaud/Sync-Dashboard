export interface Profile {
  id: number;
  full_name: string;
  phone_number: string | null;
  business_address: string | null;
  postal_code: string | null;
  bio: string | null;
  city: string | null;
  country: string | null;
  currency: string | null;
  time_zone: string | null;
  in_person_payments: boolean;
  online_payments: boolean;
  ai_voice_agent: boolean;
  is_verified: boolean;
  timer_expiration: string;
}
