export interface Paper {
  id: string;
  title: string;
  abstract: string;
  content: string;
  author: string;
  dateSubmitted: string;
  status: 'pending' | 'reviewed' | 'approved';
  reviews: Review[];
  tags?: string[];
}

export interface Review {
  id: string;
  reviewerId: string;
  paperId: string;
  comment: string;
  rating?: number;
  dateSubmitted: string;
}

export interface User {
  id: string;
  address?: string;
  balance?: number;
  submissions: Paper[];
}