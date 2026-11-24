const fs = require('fs');
const path = require('path');

const baseDir = path.resolve(__dirname, '..');

function updateFile(relPath, transformFn) {
    const fullPath = path.join(baseDir, relPath);
    if (!fs.existsSync(fullPath)) {
        console.warn(`File not found: ${relPath}`);
        return;
    }
    const original = fs.readFileSync(fullPath, 'utf8');
    const updated = transformFn(original);
    if (original !== updated) {
        fs.writeFileSync(fullPath, updated, 'utf8');
        console.log(`Updated: ${relPath}`);
    } else {
        console.log(`No change needed for: ${relPath}`);
    }
}

// 1. HeroSection.css
updateFile('src/components/home/HeroSection.css', (content) => {
    let res = content;
    
    // Eyebrow
    res = res.replace(
        /\.hero-eyebrow\s*\{([^}]+)\}/,
        (m, p1) => {
            if (!p1.includes('font-family:')) {
                return `.hero-eyebrow {\n    font-family: var(--font-sans);${p1}}`;
            }
            return m;
        }
    );
    
    // H1
    res = res.replace(
        /\.hero-banner__content\s+h1\s*\{([^}]+)\}/,
        (m, p1) => {
            let inner = p1;
            if (!inner.includes('font-family:')) {
                inner = `\n    font-family: var(--font-serif);${inner}`;
            }
            inner = inner.replace(/color:\s*#ffffff;/, 'color: var(--text-white, #ffffff);');
            return `.hero-banner__content h1 {${inner}}`;
        }
    );
    
    // Paragraph
    res = res.replace(
        /\.hero-banner__content\s*>\s*p\s*\{([^}]+)\}/,
        (m, p1) => {
            let inner = p1;
            if (!inner.includes('font-family:')) {
                inner = `\n    font-family: var(--font-sans);${inner}`;
            }
            inner = inner.replace(/color:\s*rgba\(255,\s*255,\s*255,\s*0\.94\);/, 'color: var(--text-white-muted, rgba(255, 255, 255, 0.94));');
            return `.hero-banner__content > p {${inner}}`;
        }
    );
    
    // Highlights
    res = res.replace(
        /\.hero-banner__highlights\s*span\s*\{([^}]+)\}/,
        (m, p1) => {
            let inner = p1;
            if (!inner.includes('font-family:')) {
                inner = `\n    font-family: var(--font-sans);${inner}`;
            }
            inner = inner.replace(/color:\s*#ffffff;/, 'color: var(--text-white, #ffffff);');
            return `.hero-banner__highlights span {${inner}}`;
        }
    );
    
    // Search tab
    res = res.replace(
        /\.search-tab\s*\{([^}]+)\}/,
        (m, p1) => {
            let inner = p1;
            inner = inner.replace(/font-family:\s*inherit;/, 'font-family: var(--font-sans);');
            inner = inner.replace(/color:\s*#485875;/, 'color: var(--text-secondary, #334155);');
            return `.search-tab {${inner}}`;
        }
    );
    
    // Search tab active
    res = res.replace(
        /\.search-tab\.active\s*\{([^}]+)\}/,
        (m, p1) => {
            let inner = p1.replace(/color:\s*#142b50;/, 'color: var(--text-primary, #0f172a);');
            return `.search-tab.active {${inner}}`;
        }
    );
    
    // Search field label
    res = res.replace(
        /\.search-field\s+label\s*\{([^}]+)\}/,
        (m, p1) => {
            let inner = p1;
            if (!inner.includes('font-family:')) {
                inner = `\n    font-family: var(--font-sans);${inner}`;
            }
            inner = inner.replace(/color:\s*#454545;/, 'color: var(--text-primary, #0f172a);');
            return `.search-field label {${inner}}`;
        }
    );
    
    // Field control
    res = res.replace(
        /\.field-control\s*\{([^}]+)\}/,
        (m, p1) => {
            let inner = p1;
            if (!inner.includes('font-family:')) {
                inner = `\n    font-family: var(--font-sans);${inner}`;
            }
            inner = inner.replace(/color:\s*#485875;/, 'color: var(--text-primary, #0f172a);');
            return `.field-control {${inner}}`;
        }
    );
    
    // Field control inputs
    res = res.replace(
        /\.field-control\s+input,\s*\.field-control\s+select\s*\{([^}]+)\}/,
        (m, p1) => {
            let inner = p1;
            inner = inner.replace(/font-family:\s*inherit;/, 'font-family: var(--font-sans);');
            inner = inner.replace(/color:\s*#333333;/, 'color: var(--text-primary, #0f172a);');
            return `.field-control input,\n.field-control select {${inner}}`;
        }
    );
    
    // Placeholder
    res = res.replace(
        /\.field-control\s+input::placeholder\s*\{([^}]+)\}/,
        (m, p1) => {
            let inner = p1.replace(/color:\s*#888888;/, 'color: var(--text-muted, #64748b);');
            return `.field-control input::placeholder {${inner}}`;
        }
    );
    
    // Search submit button
    res = res.replace(
        /\.search-submit-button\s*\{([^}]+)\}/,
        (m, p1) => {
            let inner = p1;
            inner = inner.replace(/font-family:\s*inherit;/, 'font-family: var(--font-sans);');
            inner = inner.replace(/color:\s*#ffffff;/, 'color: var(--text-white, #ffffff);');
            return `.search-submit-button {${inner}}`;
        }
    );
    
    // Search footer
    res = res.replace(
        /\.search-footer\s*\{([^}]+)\}/,
        (m, p1) => {
            let inner = p1;
            if (!inner.includes('font-family:')) {
                inner = `\n    font-family: var(--font-sans);${inner}`;
            }
            inner = inner.replace(/color:\s*#69758b;/, 'color: var(--text-muted, #64748b);');
            return `.search-footer {${inner}}`;
        }
    );
    
    // Search footer button
    res = res.replace(
        /\.search-footer\s+button\s*\{([^}]+)\}/,
        (m, p1) => {
            let inner = p1;
            inner = inner.replace(/font-family:\s*inherit;/, 'font-family: var(--font-sans);');
            inner = inner.replace(/color:\s*#485875;/, 'color: var(--text-secondary, #334155);');
            return `.search-footer button {${inner}}`;
        }
    );
    
    return res;
});

// 2. FeaturedProperties.css
updateFile('src/components/home/FeaturedProperties.css', (content) => {
    let res = content;
    res = res.replace(/"DM Sans",\s*Arial,\s*sans-serif/g, 'var(--font-sans)');
    res = res.replace(/"Playfair Display",\s*Georgia,\s*serif/g, 'var(--font-serif)');
    res = res.replace(/color:\s*#252b29;/g, 'color: var(--text-primary);');
    res = res.replace(/color:\s*#777e78;/g, 'color: var(--text-secondary);');
    return res;
});

// 3. PropertyCard.css
updateFile('src/components/properties/PropertyCard.css', (content) => {
    let res = content;
    // Price
    res = res.replace(
        /\.property-card__price\s*\{([^}]+)\}/,
        (m, p1) => {
            let inner = p1;
            if (!inner.includes('font-family:')) {
                inner = `\n    font-family: var(--font-serif);${inner}`;
            }
            inner = inner.replace(/color:\s*var\(--secondary-color\);/, 'color: var(--text-primary);');
            return `.property-card__price {${inner}}`;
        }
    );
    // Name
    res = res.replace(
        /\.property-card__name\s*\{([^}]+)\}/,
        (m, p1) => {
            let inner = p1;
            if (!inner.includes('font-family:')) {
                inner = `\n    font-family: var(--font-serif);${inner}`;
            }
            inner = inner.replace(/color:\s*var\(--text-primary\);/, 'color: var(--text-primary);');
            return `.property-card__name {${inner}}`;
        }
    );
    // Location
    res = res.replace(
        /\.property-card__location\s*\{([^}]+)\}/,
        (m, p1) => {
            let inner = p1;
            if (!inner.includes('font-family:')) {
                inner = `\n    font-family: var(--font-sans);${inner}`;
            }
            return `.property-card__location {${inner}}`;
        }
    );
    // Spec
    res = res.replace(
        /\.property-card__spec\s*\{([^}]+)\}/,
        (m, p1) => {
            let inner = p1;
            if (!inner.includes('font-family:')) {
                inner = `\n    font-family: var(--font-sans);${inner}`;
            }
            return `.property-card__spec {${inner}}`;
        }
    );
    // Badge
    res = res.replace(
        /\.property-card__badge\s*\{([^}]+)\}/,
        (m, p1) => {
            let inner = p1;
            if (!inner.includes('font-family:')) {
                inner = `\n    font-family: var(--font-sans);${inner}`;
            }
            return `.property-card__badge {${inner}}`;
        }
    );
    return res;
});

// 4. BrowseLocations.css
updateFile('src/components/home/BrowseLocations.css', (content) => {
    let res = content;
    res = res.replace(
        /\.browse-locations__eyebrow\s*\{([^}]+)\}/,
        (m, p1) => {
            let inner = p1;
            if (!inner.includes('font-family:')) {
                inner = `\n    font-family: var(--font-sans);${inner}`;
            }
            return `.browse-locations__eyebrow {${inner}}`;
        }
    );
    res = res.replace(
        /\.browse-locations__heading\s+h2\s*\{([^}]+)\}/,
        (m, p1) => {
            let inner = p1;
            if (!inner.includes('font-family:')) {
                inner = `\n    font-family: var(--font-serif);${inner}`;
            }
            inner = inner.replace(/color:\s*#25202a;/, 'color: var(--text-primary);');
            return `.browse-locations__heading h2 {${inner}}`;
        }
    );
    res = res.replace(
        /\.browse-locations__heading\s+p\s*\{([^}]+)\}/,
        (m, p1) => {
            let inner = p1;
            if (!inner.includes('font-family:')) {
                inner = `\n    font-family: var(--font-sans);${inner}`;
            }
            inner = inner.replace(/color:\s*#74707a;/, 'color: var(--text-secondary);');
            return `.browse-locations__heading p {${inner}}`;
        }
    );
    res = res.replace(
        /\.browse-locations__view-all\s*\{([^}]+)\}/,
        (m, p1) => {
            let inner = p1;
            if (!inner.includes('font-family:')) {
                inner = `\n    font-family: var(--font-sans);${inner}`;
            }
            return `.browse-locations__view-all {${inner}}`;
        }
    );
    res = res.replace(
        /\.location-card__content\s+h3\s*\{([^}]+)\}/,
        (m, p1) => {
            let inner = p1;
            if (!inner.includes('font-family:')) {
                inner = `\n    font-family: var(--font-serif);${inner}`;
            }
            inner = inner.replace(/color:\s*#ffffff;/, 'color: var(--text-white, #ffffff);');
            return `.location-card__content h3 {${inner}}`;
        }
    );
    res = res.replace(
        /\.location-card__content\s+p\s*\{([^}]+)\}/,
        (m, p1) => {
            let inner = p1;
            if (!inner.includes('font-family:')) {
                inner = `\n    font-family: var(--font-sans);${inner}`;
            }
            inner = inner.replace(/color:\s*rgba\(255,\s*255,\s*255,\s*0\.88\);/, 'color: var(--text-white-muted, rgba(255, 255, 255, 0.88));');
            return `.location-card__content p {${inner}}`;
        }
    );
    res = res.replace(
        /\.location-card__label\s*\{([^}]+)\}/,
        (m, p1) => {
            let inner = p1;
            if (!inner.includes('font-family:')) {
                inner = `\n    font-family: var(--font-sans);${inner}`;
            }
            return `.location-card__label {${inner}}`;
        }
    );
    res = res.replace(
        /\.location-card__link\s*\{([^}]+)\}/,
        (m, p1) => {
            let inner = p1;
            if (!inner.includes('font-family:')) {
                inner = `\n    font-family: var(--font-sans);${inner}`;
            }
            return `.location-card__link {${inner}}`;
        }
    );
    return res;
});

// 5. NewLaunchProjects.css
updateFile('src/components/home/NewLaunchProjects.css', (content) => {
    let res = content;
    res = res.replace(/--launch-ink:\s*#252b29;/, '--launch-ink: var(--text-primary, #0f172a);');
    res = res.replace(/--launch-muted:\s*#777e78;/, '--launch-muted: var(--text-secondary, #334155);');
    res = res.replace(/"Playfair Display",\s*Georgia,\s*serif/g, 'var(--font-serif)');
    res = res.replace(
        /\.new-launch__eyebrow\s*\{([^}]+)\}/,
        (m, p1) => {
            if (!p1.includes('font-family:')) return `.new-launch__eyebrow {\n    font-family: var(--font-sans);${p1}}`;
            return m;
        }
    );
    res = res.replace(
        /\.new-launch__intro\s+p\s*\{([^}]+)\}/,
        (m, p1) => {
            if (!p1.includes('font-family:')) return `.new-launch__intro p {\n    font-family: var(--font-sans);${p1}}`;
            return m;
        }
    );
    res = res.replace(
        /\.new-launch__view-all\s*\{([^}]+)\}/,
        (m, p1) => {
            if (!p1.includes('font-family:')) return `.new-launch__view-all {\n    font-family: var(--font-sans);${p1}}`;
            return m;
        }
    );
    res = res.replace(
        /\.launch-card__developer\s*\{([^}]+)\}/,
        (m, p1) => {
            if (!p1.includes('font-family:')) return `.launch-card__developer {\n    font-family: var(--font-sans);${p1}}`;
            return m;
        }
    );
    res = res.replace(
        /\.launch-card__location\s*\{([^}]+)\}/,
        (m, p1) => {
            if (!p1.includes('font-family:')) return `.launch-card__location {\n    font-family: var(--font-sans);${p1}}`;
            return m;
        }
    );
    res = res.replace(
        /\.launch-card__status\s*\{([^}]+)\}/,
        (m, p1) => {
            if (!p1.includes('font-family:')) return `.launch-card__status {\n    font-family: var(--font-sans);${p1}}`;
            return m;
        }
    );
    return res;
});

// 6. TrendingProjects.css
updateFile('src/components/home/TrendingProjects.css', (content) => {
    let res = content;
    res = res.replace(/"DM Sans",\s*Arial,\s*sans-serif/g, 'var(--font-sans)');
    res = res.replace(/"Playfair Display",\s*Georgia,\s*serif/g, 'var(--font-serif)');
    res = res.replace(/color:\s*#252b29;/g, 'color: var(--text-primary);');
    res = res.replace(/color:\s*#737a75;/g, 'color: var(--text-secondary);');
    return res;
});

// 7. PuneRealEstateContent.css
updateFile('src/components/home/PuneRealEstateContent.css', (content) => {
    let res = content;
    res = res.replace(/"DM Sans",\s*Arial,\s*sans-serif/g, 'var(--font-sans)');
    res = res.replace(/"Playfair Display",\s*Georgia,\s*serif/g, 'var(--font-serif)');
    res = res.replace(/color:\s*#30243a;/g, 'color: var(--text-primary);');
    res = res.replace(/color:\s*#625b66;/g, 'color: var(--text-secondary);');
    return res;
});

// 8. TrustStats.css
updateFile('src/components/home/TrustStats.css', (content) => {
    let res = content;
    res = res.replace(/"DM Sans",\s*Arial,\s*sans-serif/g, 'var(--font-sans)');
    res = res.replace(/"Playfair Display",\s*Georgia,\s*serif/g, 'var(--font-serif)');
    res = res.replace(/color:\s*#4b2184;/g, 'color: var(--text-primary);'); // Purple replaced!
    res = res.replace(/color:\s*#30243a;/g, 'color: var(--text-primary);');
    // For label specifically:
    res = res.replace(
        /\.trust-stats__label\s*\{([^}]+)\}/,
        (m, p1) => {
            let inner = p1.replace(/color:\s*var\(--text-primary\);/, 'color: var(--text-secondary);');
            return `.trust-stats__label {${inner}}`;
        }
    );
    return res;
});

// 9. Testimonials.css
updateFile('src/components/home/Testimonials.css', (content) => {
    let res = content;
    res = res.replace(/"Playfair Display",\s*Georgia,\s*serif/g, 'var(--font-serif)');
    res = res.replace(/color:\s*#30243a;/g, 'color: var(--text-primary);');
    res = res.replace(/color:\s*#746d79;/g, 'color: var(--text-secondary);');
    res = res.replace(
        /\.testimonials__eyebrow\s*\{([^}]+)\}/,
        (m, p1) => {
            if (!p1.includes('font-family:')) return `.testimonials__eyebrow {\n    font-family: var(--font-sans);${p1}}`;
            return m;
        }
    );
    res = res.replace(
        /\.testimonial-card__text\s*\{([^}]+)\}/,
        (m, p1) => {
            if (!p1.includes('font-family:')) return `.testimonial-card__text {\n    font-family: var(--font-sans);${p1}}`;
            return m;
        }
    );
    res = res.replace(
        /\.testimonial-card__author\s+h3\s*\{([^}]+)\}/,
        (m, p1) => {
            let inner = p1;
            if (!inner.includes('font-family:')) inner = `\n    font-family: var(--font-serif);${inner}`;
            return `.testimonial-card__author h3 {${inner}}`;
        }
    );
    res = res.replace(
        /\.testimonial-card__author\s+span\s*\{([^}]+)\}/,
        (m, p1) => {
            let inner = p1;
            if (!inner.includes('font-family:')) inner = `\n    font-family: var(--font-sans);${inner}`;
            inner = inner.replace(/color:\s*var\(--text-secondary\);/, 'color: var(--text-muted);');
            return `.testimonial-card__author span {${inner}}`;
        }
    );
    return res;
});

// 10. WhyChooseUs.css
updateFile('src/components/home/WhyChooseUs.css', (content) => {
    let res = content;
    res = res.replace(/"Playfair Display",\s*Georgia,\s*serif/g, 'var(--font-serif)');
    res = res.replace(/color:\s*#30243a;/g, 'color: var(--text-primary);');
    res = res.replace(/color:\s*#746d79;/g, 'color: var(--text-secondary);');
    res = res.replace(
        /\.why-choose-us__eyebrow\s*\{([^}]+)\}/,
        (m, p1) => {
            if (!p1.includes('font-family:')) return `.why-choose-us__eyebrow {\n    font-family: var(--font-sans);${p1}}`;
            return m;
        }
    );
    res = res.replace(
        /\.why-card__content\s+p\s*\{([^}]+)\}/,
        (m, p1) => {
            if (!p1.includes('font-family:')) return `.why-card__content p {\n    font-family: var(--font-sans);${p1}}`;
            return m;
        }
    );
    return res;
});

// 11. AdvertisementSidebar.css
updateFile('src/components/common/AdvertisementSidebar.css', (content) => {
    let res = content;
    res = res.replace(/"Playfair Display",\s*Georgia,\s*serif/g, 'var(--font-serif)');
    res = res.replace(/color:\s*#252b29;/g, 'color: var(--text-primary);');
    res = res.replace(/color:\s*#737a75;/g, 'color: var(--text-secondary);');
    res = res.replace(
        /\.partner-spotlight-sidebar\s*\{([^}]+)\}/,
        (m, p1) => {
            let inner = p1.replace(/font-family:\s*inherit;/, 'font-family: var(--font-sans);');
            return `.partner-spotlight-sidebar {${inner}}`;
        }
    );
    res = res.replace(
        /\.partner-spotlight-card__content\s+h3\s*\{([^}]+)\}/,
        (m, p1) => {
            let inner = p1;
            if (!inner.includes('font-family:')) inner = `\n    font-family: var(--font-serif);${inner}`;
            return `.partner-spotlight-card__content h3 {${inner}}`;
        }
    );
    return res;
});

// 12. PageHeroBanner.css
updateFile('src/components/common/PageHeroBanner.css', (content) => {
    let res = content;
    res = res.replace(/"Playfair Display",\s*Georgia,\s*serif/g, 'var(--font-serif)');
    res = res.replace(
        /\.page-hero\s+h1\s*\{([^}]+)\}/,
        (m, p1) => {
            let inner = p1;
            inner = inner.replace(/color:\s*#ffffff;/, 'color: var(--text-white, #ffffff);');
            return `.page-hero h1 {${inner}}`;
        }
    );
    res = res.replace(
        /\.page-hero__description\s*\{([^}]+)\}/,
        (m, p1) => {
            let inner = p1;
            if (!inner.includes('font-family:')) inner = `\n    font-family: var(--font-sans);${inner}`;
            inner = inner.replace(/color:\s*rgba\(255,\s*255,\s*255,\s*0\.8\);/, 'color: var(--text-white-muted, rgba(255, 255, 255, 0.88));');
            return `.page-hero__description {${inner}}`;
        }
    );
    res = res.replace(
        /\.page-hero__eyebrow\s*\{([^}]+)\}/,
        (m, p1) => {
            if (!p1.includes('font-family:')) return `.page-hero__eyebrow {\n    font-family: var(--font-sans);${p1}}`;
            return m;
        }
    );
    res = res.replace(
        /\.page-hero__breadcrumb\s*\{([^}]+)\}/,
        (m, p1) => {
            if (!p1.includes('font-family:')) return `.page-hero__breadcrumb {\n    font-family: var(--font-sans);${p1}}`;
            return m;
        }
    );
    return res;
});

// 13. Header.css
updateFile('src/components/layouts/Header.css', (content) => {
    let res = content;
    res = res.replace(
        /\.header-brand__name\s*\{([^}]+)\}/,
        (m, p1) => {
            let inner = p1;
            if (!inner.includes('font-family:')) inner = `\n    font-family: var(--font-serif);${inner}`;
            inner = inner.replace(/color:\s*#ffffff;/, 'color: var(--text-white, #ffffff);');
            return `.header-brand__name {${inner}}`;
        }
    );
    res = res.replace(
        /\.header-brand__subtitle\s*\{([^}]+)\}/,
        (m, p1) => {
            if (!p1.includes('font-family:')) return `.header-brand__subtitle {\n    font-family: var(--font-sans);${p1}}`;
            return m;
        }
    );
    res = res.replace(
        /\.header-nav-link\s*\{([^}]+)\}/,
        (m, p1) => {
            let inner = p1;
            if (!inner.includes('font-family:')) inner = `\n    font-family: var(--font-sans);${inner}`;
            inner = inner.replace(/color:\s*#ffffff;/, 'color: var(--text-white, #ffffff);');
            return `.header-nav-link {${inner}}`;
        }
    );
    return res;
});

// 14. Footer.css
updateFile('src/components/layouts/Footer.css', (content) => {
    let res = content;
    res = res.replace(/"DM Sans",\s*Arial,\s*sans-serif/g, 'var(--font-sans)');
    res = res.replace(
        /\.footer-brand__name\s*\{([^}]+)\}/,
        (m, p1) => {
            let inner = p1;
            if (!inner.includes('font-family:')) inner = `\n    font-family: var(--font-serif);${inner}`;
            inner = inner.replace(/color:\s*#ffffff;/, 'color: var(--text-white, #ffffff);');
            return `.footer-brand__name {${inner}}`;
        }
    );
    res = res.replace(
        /\.footer-description\s*\{([^}]+)\}/,
        (m, p1) => {
            let inner = p1;
            if (!inner.includes('font-family:')) inner = `\n    font-family: var(--font-sans);${inner}`;
            inner = inner.replace(/color:\s*#c4bbc5;/, 'color: var(--text-white-muted, #c4bbc5);');
            return `.footer-description {${inner}}`;
        }
    );
    return res;
});

// 15. PropertySearch.css
updateFile('src/components/home/PropertySearch.css', (content) => {
    let res = content;
    res = res.replace(/"DM Sans",\s*Arial,\s*sans-serif/g, 'var(--font-sans)');
    res = res.replace(/--search-charcoal:\s*#252b29;/, '--search-charcoal: var(--text-primary, #0f172a);');
    res = res.replace(/--search-muted:\s*#777e78;/, '--search-muted: var(--text-secondary, #334155);');
    return res;
});

console.log('Typography & Black/White Text Color Theme applied successfully!');

