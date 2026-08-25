/**
 * RExchange Type Definitions Matrix
 */

export interface StudentSeller {
  name: string;
  avatar: string;
  dept: string;
  year: string;
  college: string;
  rating: string;
  exchanges: number;
  responseTime: string;
  preferredTrade: string;
  verified: boolean;
}

export interface CatalogResource {
  id: number;
  title: string;
  category: 'Books' | 'Electronics' | 'Notes' | 'Tickets' | 'Tools';
  image: string;
  condition: string;
  value: string;
  type: string;
  campus: string;
  rating: string;
  postedDate: string;
  description: string;
  specs: string[];
  seller: StudentSeller;
  isCustom?: boolean;
}

export interface StudentPassportData {
  name: string;
  regNo: string;
  department: string;
  year: string;
  college: string;
  photoUrl: string | null;
}

export interface SecurityValidationResult {
  valid: boolean;
  error?: string;
}
