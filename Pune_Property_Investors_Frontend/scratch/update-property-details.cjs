const fs = require('fs');
const path = require('path');

const targetFile = path.resolve(__dirname, '../src/components/pages/PropertyDetails.jsx');
let content = fs.readFileSync(targetFile, 'utf8');

// 1. Add imports if missing
if (!content.includes('PropertyHeroHead')) {
    content = content.replace(
        'import PropertyGallery from "../property-details/PropertyGallery";',
        'import PropertyHeroHead from "../property-details/PropertyHeroHead";\nimport PropertyGallery from "../property-details/PropertyGallery";'
    );
}
if (!content.includes('PageHeroBanner')) {
    content = content.replace(
        'import AdvertisementSidebar from "../common/AdvertisementSidebar";',
        'import AdvertisementSidebar from "../common/AdvertisementSidebar";\nimport PageHeroBanner from "../common/PageHeroBanner";'
    );
}

// 2. Update Not-Found section to include PageHeroBanner
const oldNotFound = `    if (!property) {
        return (
            <>
                <Header />

                <main className="property-details__not-found">
                    <Home size={44} strokeWidth={1.5} />

                    <span className="property-details__eyebrow">
                        PROPERTY NOT AVAILABLE
                    </span>

                    <h1>Property Not Found</h1>

                    <p>
                        We couldn't find this property. It may have been
                        removed or the link may be incorrect.
                    </p>

                    <Link
                        href="/buy"
                        className="property-details__back-button"
                    >
                        <ArrowLeft size={17} />
                        Browse Properties
                    </Link>
                </main>

                <Footer />
            </>
        );
    }`;

const newNotFound = `    if (!property) {
        return (
            <>
                <Header />

                <PageHeroBanner
                    title="Property"
                    titleAccent="Not Found"
                    eyebrow="PROPERTY ADVISORY"
                    description="We couldn't find this property. It may have been sold, archived, or the link may be incorrect."
                    breadcrumbs={[
                        { label: "Home", href: "/" },
                        { label: "Buy Properties", href: "/buy" },
                        { label: "Not Found" },
                    ]}
                />

                <main className="property-details__not-found">
                    <Home size={44} strokeWidth={1.5} />

                    <span className="property-details__eyebrow">
                        PROPERTY NOT AVAILABLE
                    </span>

                    <h1>Property Not Found</h1>

                    <p>
                        We couldn't find this property. It may have been
                        removed or the link may be incorrect.
                    </p>

                    <Link
                        href="/buy"
                        className="property-details__back-button"
                    >
                        <ArrowLeft size={17} />
                        Browse Verified Properties
                    </Link>
                </main>

                <Footer />
            </>
        );
    }`;

if (content.includes(oldNotFound)) {
    content = content.replace(oldNotFound, newNotFound);
} else {
    // If CRLF vs LF:
    const normalizedContent = content.replace(/\r\n/g, '\n');
    const normalizedOld = oldNotFound.replace(/\r\n/g, '\n');
    if (normalizedContent.includes(normalizedOld)) {
        content = normalizedContent.replace(normalizedOld, newNotFound);
    }
}

// 3. Inject PropertyHeroHead right after <Header /> and remove duplicate lower breadcrumbs & project-header
const mainReturnRegex = /return\s*\(\s*<>\s*<Header\s*\/>\s*<main className="property-details">[\s\S]*?<section className="property-details__gallery-section">/;

const newHeadInjection = `return (
        <>
            <Header />

            {/* Premium Full-Width Head Section for View Details */}
            <PropertyHeroHead
                property={property}
                title={title}
                price={price}
                location={location}
                configuration={configuration}
                area={area}
                whatsappMessage={whatsappMessage}
                whatsappNumber={WHATSAPP_NUMBER}
                advisorPhone={ADVISOR_PHONE}
                backgroundImage={uniqueImages[0] || property.image}
            />

            <main className="property-details">
                <div className="property-details__container">
                    {/* Property gallery */}
                    <section className="property-details__gallery-section">`;

content = content.replace(mainReturnRegex, newHeadInjection);

fs.writeFileSync(targetFile, content, 'utf8');
console.log('Successfully updated PropertyDetails.jsx with PropertyHeroHead!');

