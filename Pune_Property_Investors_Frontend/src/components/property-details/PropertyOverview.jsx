import {
    MapPin,
    BedDouble,
    Bath,
    Ruler,
    CalendarCheck,
    ShieldCheck,
} from "lucide-react";
import "./PropertyOverview.css";

function PropertyOverview({ property }) {
    if (!property) return null;

    const formatPrice = (price) => {
        if (typeof price !== "number") {
            return property.priceLabel || "Price on Request";
        }

        if (price >= 10000000) {
            return `₹${(price / 10000000).toFixed(2).replace(/\.?0+$/, "")} Crore`;
        }

        if (price >= 100000) {
            return `₹${(price / 100000).toFixed(2).replace(/\.?0+$/, "")} Lakh`;
        }

        return `₹${price.toLocaleString("en-IN")}`;
    };

    return (
        <section className="property-overview">
            <div className="property-overview__top">
                <div className="property-overview__heading">
                    {property.projectName && (
                        <p className="property-overview__project">
                            {property.projectName}
                        </p>
                    )}

                    <h1>{property.title || property.name || "Property Details"}</h1>

                    <p className="property-overview__location">
                        <MapPin size={17} aria-hidden="true" />
                        <span>
              {property.location ||
                  property.locality ||
                  property.city ||
                  "Pune"}
            </span>
                    </p>
                </div>

                {property.verified && (
                    <span className="property-overview__verified">
            <ShieldCheck size={16} />
            Verified
          </span>
                )}
            </div>

            <div className="property-overview__price-row">
                <div>
                    <span className="property-overview__label">Asking Price</span>
                    <p className="property-overview__price">
                        {property.priceLabel || formatPrice(property.price)}
                    </p>
                </div>

                {property.pricePerSqFt && (
                    <div className="property-overview__rate">
                        <span className="property-overview__label">Price per sq. ft.</span>
                        <p>₹{Number(property.pricePerSqFt).toLocaleString("en-IN")}</p>
                    </div>
                )}
            </div>

            <div className="property-overview__specifications">
                <div className="property-overview__spec">
                    <BedDouble size={21} />
                    <div>
                        <strong>{property.bhk || property.bedrooms || "—"}</strong>
                        <span>Bedrooms</span>
                    </div>
                </div>

                <div className="property-overview__spec">
                    <Bath size={21} />
                    <div>
                        <strong>{property.bathrooms ?? "—"}</strong>
                        <span>Bathrooms</span>
                    </div>
                </div>

                <div className="property-overview__spec">
                    <Ruler size={21} />
                    <div>
                        <strong>
                            {property.area
                                ? Number(property.area).toLocaleString("en-IN")
                                : "—"}
                        </strong>
                        <span>{property.areaUnit || "sq. ft."}</span>
                    </div>
                </div>

                <div className="property-overview__spec">
                    <CalendarCheck size={21} />
                    <div>
                        <strong>{property.possession || "Contact Us"}</strong>
                        <span>Possession</span>
                    </div>
                </div>
            </div>

            {property.description && (
                <div className="property-overview__description">
                    <h2>About This Property</h2>
                    <p>{property.description}</p>
                </div>
            )}
        </section>
    );
}

export default PropertyOverview;