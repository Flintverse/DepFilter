// generate-products.js
// Usage: node generate-products.js
// Output: products.js  (100 auto-generated automotive parts products)

const fs = require('fs');

// ── Vehicle data ──────────────────────────────────────────────────────────
const MAKES_MODELS = {
  Toyota:     { models: ['Camry', 'RAV4', 'Corolla'],           years: ['2018','2019','2020','2021','2022','2023'] },
  Honda:      { models: ['Civic', 'Accord', 'CR-V'],            years: ['2017','2018','2019','2020','2021','2022'] },
  Ford:       { models: ['F-150', 'Mustang', 'Explorer'],       years: ['2018','2019','2020','2021','2022','2023'] },
  Chevrolet:  { models: ['Silverado', 'Equinox', 'Malibu'],     years: ['2017','2018','2019','2020','2021','2022'] },
  BMW:        { models: ['3-Series', 'X5', '5-Series'],         years: ['2019','2020','2021','2022','2023'] },
  Volkswagen: { models: ['Golf', 'Tiguan', 'Jetta'],            years: ['2018','2019','2020','2021','2022'] },
  Mazda:      { models: ['Mazda3', 'CX-5'],                     years: ['2019','2020','2021','2022','2023'] },
  Nissan:     { models: ['Altima', 'Rogue'],                    years: ['2019','2020','2021','2022'] },
  Subaru:     { models: ['Outback', 'Forester'],                years: ['2018','2019','2020','2021','2022'] },
  Hyundai:    { models: ['Elantra', 'Tucson'],                  years: ['2019','2020','2021','2022','2023'] },
};

// ── Parts catalog ─────────────────────────────────────────────────────────
const PARTS = [
  { collection:'Braking',      type:'Brake',       part:'Front Brake Pads',       vendor:'Bosch',     color:'Black',  size:'Standard', price:89  },
  { collection:'Braking',      type:'Brake',       part:'Rear Brake Pads',        vendor:'Brembo',    color:'Black',  size:'Standard', price:79  },
  { collection:'Braking',      type:'Brake',       part:'Brake Rotor Set',        vendor:'TRW',       color:'Silver', size:'Standard', price:125 },
  { collection:'Filters',      type:'Filter',      part:'Performance Air Filter', vendor:'K&N',       color:'Red',    size:'Standard', price:49  },
  { collection:'Filters',      type:'Filter',      part:'Oil Filter',             vendor:'Fram',      color:'Orange', size:'Standard', price:12  },
  { collection:'Filters',      type:'Filter',      part:'Cabin Air Filter',       vendor:'Bosch',     color:'White',  size:'Standard', price:22  },
  { collection:'Suspension',   type:'Suspension',  part:'Front Shock Absorber',   vendor:'Bilstein',  color:'Blue',   size:'Standard', price:189 },
  { collection:'Suspension',   type:'Suspension',  part:'Strut Assembly',         vendor:'Monroe',    color:'Silver', size:'Standard', price:145 },
  { collection:'Engine',       type:'Ignition',    part:'Spark Plug Set',         vendor:'NGK',       color:'White',  size:'Standard', price:38  },
  { collection:'Engine',       type:'Belt',        part:'Timing Belt Kit',        vendor:'Gates',     color:'Black',  size:'Standard', price:95  },
  { collection:'Electrical',   type:'Electrical',  part:'OEM Alternator',         vendor:'Denso',     color:'Silver', size:'Standard', price:210 },
  { collection:'Electrical',   type:'Electrical',  part:'12V Battery',            vendor:'ACDelco',   color:'Black',  size:'Standard', price:145 },
  { collection:'Lighting',     type:'Lighting',    part:'LED Headlight Assembly', vendor:'Hella',     color:'Clear',  size:'Standard', price:175 },
  { collection:'Lighting',     type:'Lighting',    part:'LED Tail Light',         vendor:'Hella',     color:'Red',    size:'Standard', price:95  },
  { collection:'Exhaust',      type:'Exhaust',     part:'Catalytic Converter',    vendor:'MagnaFlow', color:'Silver', size:'Standard', price:299 },
  { collection:'Exhaust',      type:'Exhaust',     part:'High-Flow O2 Sensor',    vendor:'Bosch',     color:'Silver', size:'Standard', price:65  },
  { collection:'Drivetrain',   type:'Drivetrain',  part:'CV Axle Shaft',          vendor:'SKF',       color:'Silver', size:'Standard', price:155 },
  { collection:'Drivetrain',   type:'Drivetrain',  part:'Wheel Bearing Kit',      vendor:'Timken',    color:'Silver', size:'Standard', price:85  },
  { collection:'Cooling',      type:'Cooling',     part:'Water Pump',             vendor:'Gates',     color:'Silver', size:'Standard', price:75  },
  { collection:'Cooling',      type:'Cooling',     part:'Performance Radiator',   vendor:'Mishimoto', color:'Black',  size:'Standard', price:225 },
];

// ── Build vehicle list ────────────────────────────────────────────────────
const vehicles = [];
for (const [make, { models, years }] of Object.entries(MAKES_MODELS)) {
  for (const model of models) {
    for (const year of years) {
      vehicles.push({ make, model, year });
    }
  }
}

// ── Generate 100 products by interleaving vehicles × parts ───────────────
// Stride by prime-ish offset to ensure variety across makes AND part types
const products = [];
for (let i = 0; i < 100; i++) {
  const v = vehicles[i % vehicles.length];
  const p = PARTS[i % PARTS.length];
  products.push({
    id: i + 1,
    title: p.part + ' – ' + v.make + ' ' + v.model,
    collection: p.collection,
    vendor:     p.vendor,
    color:      p.color,
    size:       p.size,
    type:       p.type,
    year:       v.year,
    make:       v.make,
    model:      v.model,
    price:      p.price,
  });
}

// ── Write output ──────────────────────────────────────────────────────────
const output = [
  '// Auto-generated by generate-products.js — ' + new Date().toISOString(),
  '// Re-run: node generate-products.js',
  'window.DEMO_PRODUCTS = ' + JSON.stringify(products, null, 2) + ';',
  '',
].join('\n');

fs.writeFileSync('products.js', output, 'utf8');
console.log('Generated ' + products.length + ' products → products.js');

// Print summary
const byMake = {};
const byCollection = {};
products.forEach(p => {
  byMake[p.make] = (byMake[p.make] || 0) + 1;
  byCollection[p.collection] = (byCollection[p.collection] || 0) + 1;
});
console.log('\nBy make:', JSON.stringify(byMake));
console.log('By collection:', JSON.stringify(byCollection));
