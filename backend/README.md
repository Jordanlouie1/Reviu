# Hardhat Local ETH Network

1. `docker build -t ethnet . && docker run -p 8545:8545 -it ethnet bash` then `npx hardhat node`

2. In another terminal window: `docker ps` then `docker exec -it container_id bash` then `npx hardhat ignition deploy ignition/modules/dPairReview.js --network localhost`
