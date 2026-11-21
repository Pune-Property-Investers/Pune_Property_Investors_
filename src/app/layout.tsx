import type { Metadata, Viewport } from "next";
import "./globals.css";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

export const viewport: Viewport = {
    width: "device-width",
    initialScale: 1,
    themeColor: "#0c1017",
};

export const metadata: Metadata = {
    metadataBase: new URL("https://punepropertyinvestor.com"),
    title: {
        default: "Pune Property Investors | Verified Properties & Real Estate in Pune",
        template: "%s | Pune Property Investors",
    },
    description:
        "Discover residential properties, new launches, luxury apartments, and investment opportunities in Kharadi, Baner, Wakad, Hinjewadi, and across Pune.",
    keywords: [
        "Pune Real Estate",
        "Properties in Pune",
        "Buy Flat in Pune",
        "Kharadi Properties",
        "Baner Apartments",
        "Wakad Real Estate",
        "Hinjewadi Homes",
        "Pune Property Investors",
    ],
    authors: [{ name: "Pune Property Investors" }],
    creator: "Pune Property Investors",
    publisher: "Pune Property Investors",
    icons: {
        icon: [
            { url: `${basePath}/logo/logo.png`, type: "image/png" },
        ],
        shortcut: `${basePath}/logo/logo.png`,
        apple: `${basePath}/logo/logo.png`,
    },
    openGraph: {
        type: "website",
        locale: "en_IN",
        url: "https://punepropertyinvestor.com",
        siteName: "Pune Property Investors",
        title: "Pune Property Investors | Real Estate Advisory in Pune",
        description:
            "Find verified residential properties, newly launched projects, and premium apartments across Pune.",
        images: [
            {
                url: `${basePath}/images/logo.png`,
                width: 800,
                height: 800,
                alt: "Pune Property Investors Logo",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Pune Property Investors",
        description:
            "Find verified residential properties, newly launched projects, and premium apartments across Pune.",
        images: [`${basePath}/images/logo.png`],
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
        },
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html
            lang="en"
            data-scroll-behavior="smooth"
            suppressHydrationWarning
        >
            <head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link
                    href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&display=swap"
                    rel="stylesheet"
                />
                <link rel="icon" type="image/png" href={`${basePath}/logo/logo.png`} />
                <link rel="shortcut icon" href={`${basePath}/logo/logo.png`} />
                <link rel="apple-touch-icon" href={`${basePath}/logo/logo.png`} />
            </head>
            <body suppressHydrationWarning>{children}</body>
        </html>
    );
}
