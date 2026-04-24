const fs = require('fs');
const path = require('path');

const itemsPath = path.join(__dirname, '../src/data/items.json');
const items = require(itemsPath);

const categoryAdjectives = {
  'tech': 'An innovative and high-quality',
  'kitchen': 'A premium and practical',
  'wellness': 'A relaxing and rejuvenating',
  'books': 'An engaging and thought-provoking',
  'home-decor': 'A beautiful and stylish',
  'fashion': 'A trendy and comfortable',
  'outdoor': 'A durable and adventurous',
  'stationery': 'An elegant and creative',
  'food-drink': 'A delicious and gourmet',
  'experience': 'A memorable and exciting',
  'jewellery': 'A stunning and elegant',
  'jewellery-personal': 'A meaningful and personalized',
  'intimate-apparel': 'A comfortable and luxurious',
  'personal-care': 'A nourishing and refreshing',
  'games': 'A fun and entertaining',
  'music': 'A melodic and inspiring',
  'art': 'A creative and expressive',
  'gardening': 'A fresh and vibrant',
};

items.forEach(item => {
  if (!item.description) {
    const adj = categoryAdjectives[item.category] || 'A wonderful';
    item.description = `${adj} ${item.name.toLowerCase()} that is exceptionally well-suited for the occasion.`;
  }
});

fs.writeFileSync(itemsPath, JSON.stringify(items, null, 2));
console.log('Done adding descriptions to items.json.');
