const fs = require('fs');
const path = require('path');

const files = [
    'src/app/buy/page.tsx',
    'src/app/commercial/page.tsx',
    'src/app/plots/page.tsx',
    'src/app/projects/page.tsx',
    'src/app/properties/page.tsx',
];

const targetPattern = /style=\{\{\s*minHeight:\s*"100vh",\s*display:\s*"flex",\s*alignItems:\s*"center",\s*justifyContent:\s*"center"\s*\}\}/g;

files.forEach(f => {
    const p = path.resolve(__dirname, '..', f);
    if (fs.existsSync(p)) {
        let content = fs.readFileSync(p, 'utf8');
        content = content.replace(targetPattern, 'className="page-loading-fallback"');
        fs.writeFileSync(p, content, 'utf8');
        console.log(`Updated ${f}`);
    }
});

