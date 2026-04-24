const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'src', 'data', 'items.json');
let items = JSON.parse(fs.readFileSync(filePath, 'utf8'));

// Find last ID
let maxId = 0;
items.forEach(i => {
  const num = parseInt(i.id.replace('item_', ''));
  if (num > maxId) maxId = num;
});

const relationships = ['partner', 'parent', 'friend', 'colleague', 'child', 'sibling', 'other'];
const occasions = ['birthday', 'anniversary', 'holiday', 'just-because', 'graduation', 'wedding', 'other'];
const tags = ['outdoorsy', 'bookworm', 'foodie', 'tech-lover', 'artist', 'homebody', 'wellness', 'gamer', 'traveller', 'music-lover'];

function rPick(arr, min = 1, max = 3) {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, Math.floor(Math.random() * (max - min + 1)) + min);
}

const templates = [
  // Child / Games / Art
  { name: 'Lego Creator Expert Set', price: [4000, 15000], cat: 'games', rels: ['child', 'sibling', 'partner'], occs: ['birthday', 'holiday'], tags: ['gamer', 'homebody'] },
  { name: 'Premium Telescope', price: [8000, 25000], cat: 'tech', rels: ['child', 'partner', 'friend'], occs: ['birthday', 'graduation'], tags: ['tech-lover', 'outdoorsy', 'bookworm'] },
  { name: 'Hoverboard', price: [12000, 30000], cat: 'outdoor', rels: ['child', 'sibling'], occs: ['birthday', 'holiday'], tags: ['outdoorsy', 'gamer', 'traveller'] },
  { name: 'Interactive Robotics Kit', price: [6000, 15000], cat: 'tech', rels: ['child', 'sibling'], occs: ['birthday', 'graduation', 'holiday'], tags: ['tech-lover', 'gamer'] },
  { name: 'Watercolour Paint Set', price: [2000, 8000], cat: 'art', rels: ['child', 'friend', 'partner', 'sibling'], occs: ['birthday', 'just-because'], tags: ['artist', 'homebody'] },
  { name: 'Microscope for Kids', price: [3000, 9000], cat: 'tech', rels: ['child'], occs: ['birthday', 'graduation'], tags: ['tech-lover', 'bookworm'] },
  
  // Luxury / Partner
  { name: 'Diamond Tennis Bracelet', price: [45000, 99000], cat: 'jewellery', rels: ['partner'], occs: ['anniversary', 'wedding'], tags: ['artist', 'traveller', 'homebody'] },
  { name: 'Designer Silk Scarf', price: [8000, 18000], cat: 'fashion', rels: ['partner', 'parent', 'friend'], occs: ['birthday', 'anniversary', 'holiday'], tags: ['artist', 'traveller'] },
  { name: 'Luxury Spa Weekend', price: [20000, 45000], cat: 'experience', rels: ['partner', 'parent'], occs: ['anniversary', 'wedding', 'birthday'], tags: ['wellness', 'homebody'] },
  { name: 'Couples Cooking Masterclass', price: [5000, 12000], cat: 'experience', rels: ['partner', 'friend'], occs: ['anniversary', 'birthday', 'just-because'], tags: ['foodie', 'homebody'] },
  { name: 'Solid Gold Hoop Earrings', price: [15000, 35000], cat: 'jewellery-personal', rels: ['partner', 'sibling'], occs: ['birthday', 'anniversary'], tags: ['artist', 'traveller'] },
  { name: 'Massage Chair Pad', price: [9000, 22000], cat: 'wellness', rels: ['partner', 'parent', 'colleague'], occs: ['birthday', 'holiday', 'graduation'], tags: ['wellness', 'homebody'] },

  // Tech / Colleague / Friend / Sibling
  { name: 'Noise-Cancelling Headphones Pro', price: [15000, 35000], cat: 'tech', rels: ['partner', 'sibling', 'friend', 'colleague'], occs: ['birthday', 'graduation', 'holiday'], tags: ['tech-lover', 'music-lover', 'traveller'] },
  { name: 'Smart Coffee Maker', price: [12000, 28000], cat: 'kitchen', rels: ['partner', 'colleague', 'friend', 'parent'], occs: ['wedding', 'anniversary', 'birthday'], tags: ['foodie', 'tech-lover', 'homebody'] },
  { name: 'Ergonomic Office Chair', price: [18000, 40000], cat: 'home-decor', rels: ['partner', 'colleague', 'friend'], occs: ['birthday', 'graduation', 'just-because'], tags: ['tech-lover', 'wellness', 'gamer'] },
  { name: 'E-Reader Premium Edition', price: [14000, 26000], cat: 'tech', rels: ['partner', 'parent', 'sibling', 'friend', 'colleague'], occs: ['birthday', 'graduation', 'holiday'], tags: ['bookworm', 'tech-lover', 'traveller'] },
  { name: 'Mechanical Keyboard Custom', price: [8000, 20000], cat: 'tech', rels: ['sibling', 'friend', 'colleague', 'partner'], occs: ['birthday', 'just-because'], tags: ['tech-lover', 'gamer', 'artist'] },
  
  // Outdoors / Travel
  { name: 'Premium Backpacking Tent', price: [15000, 45000], cat: 'outdoor', rels: ['partner', 'friend', 'sibling'], occs: ['birthday', 'wedding', 'anniversary'], tags: ['outdoorsy', 'traveller'] },
  { name: 'Action Camera 4K', price: [18000, 38000], cat: 'tech', rels: ['partner', 'sibling', 'child', 'friend'], occs: ['birthday', 'graduation', 'holiday'], tags: ['outdoorsy', 'tech-lover', 'traveller'] },
  { name: 'Travel Duffel Bag', price: [4000, 12000], cat: 'fashion', rels: ['partner', 'colleague', 'friend', 'sibling'], occs: ['birthday', 'graduation'], tags: ['traveller'] },
  { name: 'Portable Espresso Maker', price: [5000, 14000], cat: 'kitchen', rels: ['colleague', 'friend', 'partner', 'sibling'], occs: ['birthday', 'holiday', 'just-because'], tags: ['foodie', 'traveller', 'outdoorsy'] },
  { name: 'Survival Gear Kit', price: [3000, 9000], cat: 'outdoor', rels: ['friend', 'sibling', 'colleague'], occs: ['birthday', 'holiday'], tags: ['outdoorsy', 'traveller'] },
  
  // Home / Parents
  { name: 'Robotic Vacuum Cleaner', price: [18000, 48000], cat: 'tech', rels: ['parent', 'partner', 'sibling'], occs: ['anniversary', 'wedding', 'holiday'], tags: ['homebody', 'tech-lover', 'wellness'] },
  { name: 'Luxury Egyptian Cotton Sheets', price: [8000, 20000], cat: 'home-decor', rels: ['parent', 'partner'], occs: ['wedding', 'anniversary'], tags: ['homebody', 'wellness'] },
  { name: 'Smart Herb Garden', price: [6000, 15000], cat: 'gardening', rels: ['parent', 'partner', 'friend', 'colleague'], occs: ['birthday', 'holiday', 'anniversary'], tags: ['foodie', 'homebody', 'outdoorsy', 'tech-lover'] },
  { name: 'Wine Tasting Experience', price: [7000, 18000], cat: 'experience', rels: ['parent', 'partner', 'friend', 'colleague'], occs: ['anniversary', 'wedding', 'birthday'], tags: ['foodie', 'music-lover'] },
  { name: 'Ceramic Cookware Set', price: [12000, 35000], cat: 'kitchen', rels: ['parent', 'partner', 'friend'], occs: ['wedding', 'anniversary', 'birthday'], tags: ['foodie', 'homebody'] },
  
  // Fun / Casual
  { name: 'Retro Record Player', price: [8000, 22000], cat: 'music', rels: ['friend', 'sibling', 'child', 'partner'], occs: ['birthday', 'graduation', 'holiday'], tags: ['music-lover', 'homebody', 'artist'] },
  { name: 'Vinyl Record Collection', price: [3000, 10000], cat: 'music', rels: ['friend', 'sibling', 'partner'], occs: ['birthday', 'just-because'], tags: ['music-lover', 'artist'] },
  { name: 'Concert Tickets', price: [6000, 25000], cat: 'experience', rels: ['partner', 'friend', 'sibling', 'child'], occs: ['birthday', 'anniversary', 'graduation'], tags: ['music-lover', 'traveller'] },
  { name: 'Premium Fountain Pen', price: [4000, 16000], cat: 'stationery', rels: ['colleague', 'friend', 'partner', 'parent'], occs: ['graduation', 'birthday', 'working'], tags: ['bookworm', 'artist', 'homebody'] },
  { name: 'VR Headset', price: [25000, 48000], cat: 'tech', rels: ['child', 'sibling', 'partner', 'friend'], occs: ['birthday', 'holiday', 'graduation'], tags: ['gamer', 'tech-lover', 'homebody'] }
];

const generated = [];
for (let i = 0; i < 150; i++) {
  const tmpl = templates[i % templates.length];
  maxId++;
  const price = Math.floor(Math.random() * (tmpl.price[1] - tmpl.price[0])) + tmpl.price[0];
  
  // Introduce variance in names
  const suffix = ['Pro', 'Elite', 'V2', 'Edition', 'Set', 'Bundle', 'Premium'][Math.floor(Math.random() * 7)];
  let finalName = tmpl.name;
  if (Math.random() > 0.5) {
      finalName += ' ' + suffix;
  }
  
  // slightly modify tags/rels
  const extraRel = rPick(relationships, 0, 1);
  const extraOcc = rPick(occasions, 0, 1);
  const extraCat = [...new Set([...tmpl.rels, ...extraRel])];
  const occCats = [...new Set([...tmpl.occs, ...extraOcc])];

  generated.push({
    id: `item_${maxId.toString().padStart(3, '0')}`,
    name: finalName,
    price_inr: Math.round(price / 100) * 100, // round to 100s
    category: tmpl.cat,
    occasion_tags: occCats,
    relationship_tags: extraCat,
    personality_tags: tmpl.tags,
    image_url: "/placeholder.jpg",
    shop_url: "#",
    avg_rating: (Math.random() * 1.5 + 3.5).toFixed(1), // 3.5 to 5.0
    interaction_count: 0
  });
}

const newItems = [...items, ...generated];
fs.writeFileSync(filePath, JSON.stringify(newItems, null, 2), 'utf8');
console.log(`Added ${generated.length} new items. Total is now ${newItems.length}.`);
