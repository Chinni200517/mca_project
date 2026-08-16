import "dotenv/config";
import foodModel from './models/foodModel.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { connectDB } from './config/db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const seedFoods = [
  {
    name: 'Greek Salad',
    description: 'Fresh greens with feta and olives.',
    price: 12,
    category: 'Salad',
    image: 'food_1.png'
  },
  {
    name: 'Veg Salad',
    description: 'Crisp vegetables and house dressing.',
    price: 18,
    category: 'Salad',
    image: 'food_2.png'
  },
  {
    name: 'Chicken Rolls',
    description: 'Soft rolls packed with grilled chicken.',
    price: 20,
    category: 'Rolls',
    image: 'food_7.png'
  },
  {
    name: 'Vanilla Ice Cream',
    description: 'Classic creamy vanilla scoop.',
    price: 12,
    category: 'Deserts',
    image: 'food_12.png'
  },
  {
    name: 'Chicken Sandwich',
    description: 'Grilled chicken sandwich with fresh toppings.',
    price: 12,
    category: 'Sandwich',
    image: 'food_13.png'
  },
  {
    name: 'Cheese Pasta',
    description: 'Creamy pasta topped with melted cheese.',
    price: 12,
    category: 'Pasta',
    image: 'food_25.png'
  }
];

export const resetAndSeedData = async () => {
  await connectDB();
  await foodModel.deleteMany({});

  const uploadDir = path.join(__dirname, 'uploads');
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  const imageFiles = fs.readdirSync(uploadDir);
  for (const file of imageFiles) {
    if (file.endsWith('.png') || file.endsWith('.jpg') || file.endsWith('.jpeg')) {
      fs.unlinkSync(path.join(uploadDir, file));
    }
  }

  const frontendAssetsDir = path.join(__dirname, '..', 'frontend', 'src', 'assets');
  for (const item of seedFoods) {
    const sourcePath = path.join(frontendAssetsDir, item.image);
    const destinationPath = path.join(uploadDir, item.image);
    if (fs.existsSync(sourcePath)) {
      fs.copyFileSync(sourcePath, destinationPath);
    }
  }

  const inserted = await foodModel.insertMany(seedFoods);
  return inserted;
};
