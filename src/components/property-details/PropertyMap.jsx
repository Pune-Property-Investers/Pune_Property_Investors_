"use client";

import {
    MapPin,
    Navigation,
    Plane,
    Train,
    Building2,
    Hospital,
    GraduationCap,
    ShoppingBag,
    ExternalLink,
} from "lucide-react";
import "./PropertyMap.css";

export default function PropertyMap({ property }) {
    if (!property) return null;

    const locationName =
        property.location ||
        property.locality ||
        property.city ||
        "Pune, Maharashtra";

    const queryLocation = `${locationName}, Pune, Maharashtra, India`;
    const mapEmbedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(
        queryLocation
    )}&t=&z=14&ie=UTF8&iwloc=&output=embed`;

    const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
        queryLocation
    )}`;

    // Connectivity highlights tailored to Pune corridors
    const isEastPune =
        /kharadi|wagholi|hadapsar|viman|kalyani|magarpatta|mundhwa/i.test(
            locationName
        );
    const isWestPune =
        /hinjewadi|wakad|baner|balewadi|bavdhan|ravet|tathawade|punawale/i.test(
            locationName
        );

    const connectivity = isEastPune
        ? [
              {
                  icon: <Plane size={16} />,
                  label: "Pune International Airport",
                  time: "15 Mins",
                  distance: "8.5 km",
              },
              {
                  icon: <Building2 size={16} />,
                  label: "EON IT Park & WTC Kharadi",
                  time: "6 Mins",
                  distance: "2.8 km",
              },
              {
                  icon: <Train size={16} />,
                  label: "Ramwadi Metro Station",
                  time: "8 Mins",
                  distance: "4.2 km",
              },
              {
                  icon: <ShoppingBag size={16} />,
                  label: "Phoenix Marketcity & Seasons Mall",
                  time: "10 Mins",
                  distance: "5.5 km",
              },
              {
                  icon: <Hospital size={16} />,
                  label: "Manipal / Columbia Asia Hospital",
                  time: "7 Mins",
                  distance: "3.5 km",
              },
              {
                  icon: <GraduationCap size={16} />,
                  label: "The Lexicon International School",
                  time: "5 Mins",
                  distance: "2.1 km",
              },
          ]
        : isWestPune
        ? [
              {
                  icon: <Building2 size={16} />,
                  label: "Hinjewadi IT Park (Phase 1, 2, 3)",
                  time: "5 Mins",
                  distance: "2.2 km",
              },
              {
                  icon: <Train size={16} />,
                  label: "Metro Line 3 (Hinjewadi-Civil Court)",
                  time: "4 Mins",
                  distance: "1.5 km",
              },
              {
                  icon: <Navigation size={16} />,
                  label: "Mumbai-Pune Expressway Toll",
                  time: "10 Mins",
                  distance: "6.0 km",
              },
              {
                  icon: <Hospital size={16} />,
                  label: "Jupiter Hospital Baner",
                  time: "12 Mins",
                  distance: "7.5 km",
              },
              {
                  icon: <ShoppingBag size={16} />,
                  label: "Westend Mall & High Street Balewadi",
                  time: "12 Mins",
                  distance: "6.8 km",
              },
              {
                  icon: <GraduationCap size={16} />,
                  label: "Indira Group of Institutes / Vibgyor",
                  time: "7 Mins",
                  distance: "3.8 km",
              },
          ]
        : [
              {
                  icon: <Plane size={16} />,
                  label: "Pune International Airport",
                  time: "20 Mins",
                  distance: "12.0 km",
              },
              {
                  icon: <Train size={16} />,
                  label: "Pune Central Railway Station",
                  time: "15 Mins",
                  distance: "8.0 km",
              },
              {
                  icon: <Building2 size={16} />,
                  label: "Prominent IT & Financial Corridor",
                  time: "8 Mins",
                  distance: "4.5 km",
              },
              {
                  icon: <Hospital size={16} />,
                  label: "Multi-Speciality Healthcare Centers",
                  time: "6 Mins",
                  distance: "3.0 km",
              },
              {
                  icon: <ShoppingBag size={16} />,
                  label: "Retail Promenades & High Street",
                  time: "8 Mins",
                  distance: "4.0 km",
              },
              {
                  icon: <GraduationCap size={16} />,
                  label: "Top CBSE & IB International Schools",
                  time: "6 Mins",
                  distance: "2.5 km",
              },
          ];

    return (
        <section className="property-map-section">
            <div className="property-map-section__header">
                <div>
                    <span className="property-map-section__eyebrow">
                        CONNECTIVITY & SURROUNDINGS
                    </span>
                    <h2 className="property-map-section__title">
                        Location & Neighbourhood Map
                    </h2>
                    <p className="property-map-section__desc">
                        Explore road connectivity, strategic landmarks, and transit routes around {property.title || property.name || locationName}.
                    </p>
                </div>

                <a
                    href={directionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="property-map__directions-btn"
                >
                    <Navigation size={15} />
                    <span>Get Directions</span>
                    <ExternalLink size={13} />
                </a>
            </div>

            {/* Address Bar */}
            <div className="property-map__address-bar">
                <div className="address-bar__left">
                    <MapPin size={18} className="text-gold" />
                    <strong>{locationName}</strong>
                    <span>• Prime Corridor, Pune, Maharashtra</span>
                </div>
                <span className="address-bar__badge">Verified Locus</span>
            </div>

            {/* Embedded Google Map Frame */}
            <div className="property-map__frame-wrapper">
                <iframe
                    title={`Google Map showing ${locationName}`}
                    src={mapEmbedUrl}
                    className="property-map__iframe"
                    loading="lazy"
                    allowFullScreen
                    referrerPolicy="no-referrer-when-downgrade"
                />
            </div>

            {/* Strategic Landmarks Connectivity Grid */}
            <div className="property-map__landmarks">
                <h3 className="landmarks__heading">Strategic Neighborhood Connectivity</h3>
                <div className="landmarks__grid">
                    {connectivity.map((item, idx) => (
                        <div className="landmark-chip" key={idx}>
                            <div className="landmark-chip__icon">{item.icon}</div>
                            <div className="landmark-chip__details">
                                <span className="landmark-chip__name">{item.label}</span>
                                <div className="landmark-chip__metrics">
                                    <strong className="landmark-chip__time">{item.time}</strong>
                                    <span className="landmark-chip__dot">•</span>
                                    <span className="landmark-chip__dist">{item.distance}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
