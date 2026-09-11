import fs from 'fs';
import path from 'path';

const INPUT_DIR = 'D:\\aavjo\\aavjo-photos';
const OUTPUT_DIR = 'D:\\aavjo\\aavjo-photos-ready';
const OUTPUT_JSON = 'D:\\aavjo\\scripts\\generated-products.json';

// Create output dir if not exists
if (fs.existsSync(OUTPUT_DIR)) {
  fs.rmSync(OUTPUT_DIR, { recursive: true, force: true });
}
fs.mkdirSync(OUTPUT_DIR, { recursive: true });

function slugify(text) {
  return text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
}

const products = [];
const departments = fs.readdirSync(INPUT_DIR).filter(d => fs.statSync(path.join(INPUT_DIR, d)).isDirectory());

for (const dept of departments) {
  const deptSlug = slugify(dept);
  const deptPath = path.join(INPUT_DIR, dept);
  
  const categories = fs.readdirSync(deptPath).filter(c => fs.statSync(path.join(deptPath, c)).isDirectory());
  
  for (const cat of categories) {
    const catSlug = slugify(cat);
    const catPath = path.join(deptPath, cat);
    
    const items = fs.readdirSync(catPath);
    
    for (const item of items) {
      const itemPath = path.join(catPath, item);
      const isDir = fs.statSync(itemPath).isDirectory();
      
      const itemName = path.parse(item).name;
      const productSlug = `${catSlug}-${itemName}`; // e.g. kurta-sets-1 or kurta-sets-4
      
      const outProductDir = path.join(OUTPUT_DIR, deptSlug, catSlug, productSlug);
      fs.mkdirSync(outProductDir, { recursive: true });
      
      const productObj = {
        name: `Aavjo ${cat} ${itemName}`,
        slug: productSlug,
        description: `Beautiful ${cat} ${itemName} by Aavjo.`,
        department: deptSlug,
        category: catSlug, // Note: In DB it might be kurta-sets
        price: 2499,
        compare_at_price: null,
        fabric: "100% Cotton",
        care_instructions: "Hand wash cold.",
        is_featured: true,
        is_new_arrival: true,
        is_published: true, // We will publish them since photos exist
        variants: [
          { size: "M", colour: "Default", sku: `AAV-${deptSlug[0].toUpperCase()}-${productSlug.toUpperCase()}-M`, stock: 10 }
        ],
        images: []
      };

      if (isDir) {
        const images = fs.readdirSync(itemPath).filter(i => i.endsWith('.jpg') || i.endsWith('.jpeg') || i.endsWith('.png'));
        let sortOrder = 0;
        for (const img of images) {
          const ext = path.extname(img);
          const outImgName = sortOrder === 0 ? `front${ext}` : `${sortOrder}${ext}`;
          
          fs.copyFileSync(path.join(itemPath, img), path.join(outProductDir, outImgName));
          
          productObj.images.push({
            urlPath: `${deptSlug}/${catSlug}/${productSlug}/${outImgName}`,
            alt: `${productObj.name} view ${sortOrder + 1}`,
            sort_order: sortOrder,
            is_primary: sortOrder === 0
          });
          sortOrder++;
        }
      } else {
        const ext = path.extname(item);
        if (!['.jpg', '.jpeg', '.png'].includes(ext.toLowerCase())) continue;
        
        const outImgName = `front${ext}`;
        fs.copyFileSync(itemPath, path.join(outProductDir, outImgName));
        
        productObj.images.push({
          urlPath: `${deptSlug}/${catSlug}/${productSlug}/${outImgName}`,
          alt: `${productObj.name} front view`,
          sort_order: 0,
          is_primary: true
        });
      }
      
      if (productObj.images.length > 0) {
        products.push(productObj);
      }
    }
  }
}

fs.writeFileSync(OUTPUT_JSON, JSON.stringify(products, null, 2));
console.log(`Successfully processed ${products.length} products.`);
console.log(`Clean images ready at: ${OUTPUT_DIR}`);
console.log(`Product JSON generated at: ${OUTPUT_JSON}`);
