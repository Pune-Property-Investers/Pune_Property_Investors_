const fs = require('fs');
const path = require('path');

const files = [
    'src/app/commercial/page.tsx',
    'src/app/plots/page.tsx',
    'src/app/projects/page.tsx',
];

files.forEach(f => {
    const p = path.resolve(__dirname, '..', f);
    if (fs.existsSync(p)) {
        let content = fs.readFileSync(p, 'utf8');
        content = content.replace(/<div\s+style=\{\{[\s\S]*?\}\}\s*>\s*([\s\S]*?)\s*<\/div>/, '<div className="page-loading-fallback">$1</div>');
        fs.writeFileSync(p, content, 'utf8');
        console.log(`Updated ${f}`);
    }
});

