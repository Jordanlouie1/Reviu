import { Paper, User } from '../types';

export const mockPapers: Paper[] = [
  {
    id: '1',
    title: 'Blockchain for Federated Learning in the Internet of Things: Trustworthy Adaptation, Standards, and the Road Ahead',
    abstract: 'This article proposes a blockchain-enhanced Federated Learning framework to meet the low-latency, trust, and energy efficiency demands of next-generation IoT and 6G networks, highlighting current standardization efforts and demonstrating its effectiveness using IOTA Tangle.',
    content: 'As edge computing gains prominence in Internet of Things (IoTs), smart cities, and autonomous systems, the demand for real-time machine intelligence with low latency and model reliability continues to grow. Federated Learning (FL) addresses these needs by enabling distributed model training without centralizing user data, yet it remains reliant on centralized servers and lacks built-in mechanisms for transparency and trust. Blockchain and Distributed Ledger Technologies (DLTs) can fill this gap by introducing immutability, decentralized coordination, and verifiability into FL workflows. This article presents current standardization efforts from 3GPP, ETSI, ITU-T, IEEE, and O-RAN that steer the integration of FL and blockchain in IoT ecosystems. We then propose a blockchain-based FL framework that replaces the centralized aggregator, incorporates reputation monitoring of IoT devices, and minimizes overhead via selective on-chain storage of model updates. We validate our approach with IOTA Tangle, demonstrating stable throughput and block confirmations, even under increasing FL workloads. Finally, we discuss architectural considerations and future directions for embedding trustworthy and resource-efficient FL in emerging 6G networks and vertical IoT applications. Our results underscore the potential of DLT-enhanced FL to meet stringent trust and energy requirements of next-generation IoT deployments.',
    author: '0x1234...5678',
    dateSubmitted: '2024-03-15',
    status: 'pending',
    reviews: [],
    tags: 'AI, IoT, Blockchain'
  },
  {
    id: '2',
    title: 'Corporate Finance in the Age of Fintech: Scenarios and Challenges',
    abstract: 'Blockchain has the potential to transform financial markets and corporate finance by offering innovative alternatives to traditional systems, but its widespread adoption will depend on overcoming regulatory, environmental, and efficiency challenges, leading to a more transparent and regulated future that still resembles conventional finance.',
    content: 'Blockchain is a technological innovation that has the potential to radically change our financial markets by providing an alternative management approach to the “promise market”, which is the foundation of our financial systems. Its disruptive potential also extends to corporate finance, where blockchain is beginning to influence valuation methods and capital allocation strategies, offering new perspectives on how companies are assessed and financed. However, for a new financial architecture based on blockchain and advancements in technology—what is commonly referred to as Fintech—to replace, in whole or in part, traditional finance, it will need to overcome significant challenges such as regulation, environmental sustainability, its association with illegal activities, and achieving greater efficiency in cryptocurrency markets. For this reason, the future of Fintech is likely to be more conventional—yet also more transparent, efficient, and regulated—ultimately evolving to resemble the traditional finance we know.',
    author: '0x8765...4321',
    dateSubmitted: '2024-03-14',
    status: 'pending',
    reviews: [],
    tags: 'Finance, Blockchain'
  },
  {
    id: '3',
    title: 'HQViT: Hybrid Quantum Vision Transformer for Image Classification',
    content: 'Transformer-based architectures have revolutionized the landscape of deep learning. In computer vision domain, Vision Transformer demonstrates remarkable performance on par with or even surpassing that of convolutional neural networks. However, the quadratic computational complexity of its self-attention mechanism poses challenges for classical computing, making model training with high-dimensional input data, e.g., images, particularly expensive. To address such limitations, we propose a Hybrid Quantum Vision Transformer (HQViT), that leverages the principles of quantum computing to accelerate model training while enhancing model performance. HQViT introduces whole-image processing with amplitude encoding to better preserve global image information without additional positional encoding. By leveraging quantum computation on the most critical steps and selectively handling other components in a classical way, we lower the cost of quantum resources for HQViT. The qubit requirement is minimized to O(log2N) and the number of parameterized quantum gates is only O(log2d), making it well-suited for Noisy Intermediate-Scale Quantum devices. By offloading the computationally intensive attention coefficient matrix calculation to the quantum framework, HQViT reduces the classical computational load by O(T2d). Extensive experiments across various computer vision datasets demonstrate that HQViT outperforms existing models, achieving a maximum improvement of up to 10.9% (on the MNIST 10-classification task) over the state of the art. This work highlights the great potential to combine quantum and classical computing to cope with complex image classification tasks.',
    abstract: 'The Hybrid Quantum Vision Transformer (HQViT) combines quantum and classical computing to overcome the computational challenges of self-attention in Vision Transformers, enabling more efficient and accurate image classification with significantly reduced resource requirements, and achieving up to 10.9% performance gains over state-of-the-art models.',
    author: '0x9876...1234',
    dateSubmitted: '2024-03-13',
    status: 'pending',
    reviews: [],
    tags: 'AI, Quantum, Computer Vision'
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
    tags: 'ML, finance'
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
      tags: 'web3, development'
    }
  ]
};