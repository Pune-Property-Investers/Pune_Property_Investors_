const fs = require('fs');
const path = require('path');

const file = path.resolve(__dirname, '../src/components/pages/PropertyDetails.css');
let css = fs.readFileSync(file, 'utf8');

css = css.replace(
    /--pd-green:\s*#252b29;/,
    '--pd-green: var(--text-primary, #0f172a);'
);
css = css.replace(
    /--pd-text:\s*#303632;/,
    '--pd-text: var(--text-secondary, #334155);'
);
css = css.replace(
    /--pd-muted:\s*#737a75;/,
    '--pd-muted: var(--text-muted, #64748b);'
);
css = css.replace(
    /padding:\s*32px\s*0\s*70px;/,
    'padding: 38px 0 70px;'
);

fs.writeFileSync(file, css, 'utf8');
console.log('Updated PropertyDetails.css');

