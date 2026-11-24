import type { Metadata } from "next";
import PropertyDetails from "../../../components/pages/PropertyDetails";
import { findProperty } from "../../../lib/propertyUtils";
import propertyListingsData from "../../../data/propertyListingsData.js";

type PageProps = {
    params: Promise<{ id: string }>;
};

export function generateStaticParams() {
    return propertyListingsData.map((item) => ({
        id: String(item.id),
    }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { id } = await params;
    const property = findProperty(id);

    if (!property) {
        return {
            title: "Property Details | Pune Property Investors",
            description: "Explore verified real estate properties in Pune.",
        };
    }

    const title = property.title || property.name || "Property in Pune";
    const description =
        property.description ||
        `Explore ${title} located in ${property.location || "Pune"}. Check pricing, configurations, and amenities.`;

    const images = [
        ...(Array.isArray(property.images) ? property.images : []),
        property.image,
    ].filter(Boolean);

    return {
        title: `${title} | Pune Property Investors`,
        description,
        alternates: {
            canonical: `/property/${id}`,
        },
        openGraph: {
            title: `${title} | Pune Property Investors`,
            description,
            images: images[0] ? [{ url: images[0] }] : [],
        },
    };
}

export default async function PropertyIdPage({ params }: PageProps) {
    const { id } = await params;
    const property = findProperty(id);

    const jsonLd = property
        ? {
              "@context": "https://schema.org",
              "@type": "RealEstateListing",
              name: property.title || property.name,
              description: property.description,
              image: property.image,
              address: {
                  "@type": "PostalAddress",
                  addressLocality: property.locality || property.location || "Pune",
                  addressRegion: "Maharashtra",
                  addressCountry: "IN",
              },
              offers: property.price
                  ? {
                        "@type": "Offer",
                        price: property.price,
                        priceCurrency: "INR",
                    }
                  : undefined,
          }
        : null;

    return (
        <>
            {jsonLd && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                />
            )}
            <PropertyDetails propertyId={id} />
        </>
    );
}
