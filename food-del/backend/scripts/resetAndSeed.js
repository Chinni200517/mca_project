import "dotenv/config";
import { resetAndSeedData } from '../seedData.js';

resetAndSeedData()
  .then(() => {
    console.log('Database reset complete');
    process.exit(0);
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
