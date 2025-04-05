import { Paper, User } from '../types';

export const mockPapers: Paper[] = [
  {
    id: '1',
    title: 'Quantum Computing: A New Paradigm',
    abstract: 'This paper explores the fundamentals of quantum computing and its implications for future technology.',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
    author: '0x1234...5678',
    dateSubmitted: '2024-03-15',
    status: 'pending',
    reviews: [],
    tags: ['quantum', 'computing', 'technology']
  },
  {
    id: '2',
    title: 'Blockchain in Healthcare',
    abstract: 'An analysis of blockchain technology applications in healthcare systems.',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
    author: '0x8765...4321',
    dateSubmitted: '2024-03-14',
    status: 'pending',
    reviews: [],
    tags: ['blockchain', 'healthcare']
  },
  {
    id: '3',
    title: 'AI Ethics and Society',
    abstract: 'Examining the ethical implications of artificial intelligence in modern society.',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
    author: '0x9876...1234',
    dateSubmitted: '2024-03-13',
    status: 'pending',
    reviews: [],
    tags: ['AI', 'ethics', 'society']
  }
];

export const topReviewedPapers: Paper[] = [
  {
    id: '4',
    title: 'Machine Learning in Finance',
    abstract: 'A comprehensive study of ML applications in financial markets.',
    content: 'Lorem ipsum dolor sit amet...',
    author: '0x2468...1357',
    dateSubmitted: '2024-03-10',
    status: 'approved',
    reviews: [
      {
        id: 'r1',
        reviewerId: '0x1111',
        paperId: '4',
        comment: 'Excellent analysis of ML applications in finance.',
        rating: 5,
        dateSubmitted: '2024-03-12'
      }
    ],
    tags: ['ML', 'finance']
  }
];

export const mockUser: User = {
  id: '1',
  submissions: [
    {
      id: '5',
      title: 'Web3 Development Patterns',
      abstract: 'Analysis of common development patterns in Web3.',
      content: 'Lorem ipsum dolor sit amet...',
      author: '0x3333...4444',
      dateSubmitted: '2024-03-08',
      status: 'reviewed',
      reviews: [],
      tags: ['web3', 'development']
    }
  ]
};