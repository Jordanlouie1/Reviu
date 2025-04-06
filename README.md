## Reviu
![image](https://github.com/user-attachments/assets/0d82db4a-a8f3-428d-8d3a-4e8e24afbcd9)

## Anonymous Peer Review Platform

This is a modern, responsive web application for scholars to submit and review papers annoymously. Qualified annoynomous reviewers are verified using zero knowledge proofs based off previous work

### 🎯 Problem
Peer review is the backbone of academic and technical innovation — yet the current system is outdated, opaque, and exclusionary.
  Reviews often take months, and are locked behind journal walls.
  Independent researchers and interdisciplinary thinkers are ignored due to institutional gatekeeping.
  Reviewers do unpaid work and get no lasting reputation or proof of their contributions.
  There’s little to no transparency in who reviews what, and no way to match papers to the right experts at scale.

### Features

- Dashboard with pending reviews
- Top reviewed papers section
- Paper submission system
- User profile with MetaMask integration
- Responsive design
- Mock data integration

### Getting Started
## Frontend Setup

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to the local server URL

### Project Structure

- `src/components`: React components
- `src/types`: TypeScript type definitions
- `src/data`: Mock data
- `src/hooks`: Custom React hooks

### Technologies Used

- React
- TypeScript
- Tailwind CSS
- Lucide React (icons)

##Backend setup

Feel free to submit issues and pull requests.
Backend setup:
Hardhat Local ETH Network
docker build -t ethnet . && docker run -p 8545:8545 -it ethnet bash then npx hardhat node

In another terminal window: docker ps then docker exec -it container_id bash then npx hardhat ignition deploy ignition/modules/dPairReview.js --network localhost
