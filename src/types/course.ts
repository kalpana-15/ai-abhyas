export interface Course {
  id: string;
  title: string;
  description: string;
  level?: string;
  mode?: string;
  status?: string;
  duration?: string;
  fee?: string;
  eligibility?: string;
  skills?: string[];
  highlights?: string[];
  students?: string | number;
  rating?: number;
  certificateIncluded?: boolean;
  image?: string;
  tags?: string[];
  instructor?: any;
  [key: string]: any;
}
