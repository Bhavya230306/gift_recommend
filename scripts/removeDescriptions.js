const fs = require('fs');
const path = require('path');

const itemsPath = path.join(__dirname, '../src/data/items.json');
const items = require(itemsPath);

items.forEach(item => {
  if (item.description !== undefined) {
    delete item.description;
  }
});

fs.writeFileSync(itemsPath, JSON.stringify(items, null, 2));
console.log('Done removing descriptions from items.json.');
