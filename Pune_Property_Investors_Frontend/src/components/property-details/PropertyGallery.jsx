"use client";

import { useEffect, useState } from "react";
import {
    ChevronLeft,
    ChevronRight,
    Image as ImageIcon,
    X,
    Expand,
} from "lucide-react";

import "./PropertyGallery.css";

function PropertyGallery({ images = [], title = "Property" }) {
    const [activeIndex, setActiveIndex] = useState(0);
    const [lightboxOpen, setLightboxOpen] = useState(false);

    const validImages = [...new Set(images.filter(Boolean))];

    const [prevImages, setPrevImages] = useState(images);
    if (images !== prevImages) {
        setPrevImages(images);
        setActiveIndex(0);
    }

    useEffect(() => {
        if (!lightboxOpen) return;

        const handleKeyDown = (event) => {
            if (event.key === "Escape") {
                setLightboxOpen(false);
            }

            if (event.key === "ArrowRight" && validImages.length > 1) {
                setActiveIndex((current) => (current + 1) % validImages.length);
            }

            if (event.key === "ArrowLeft" && validImages.length > 1) {
                setActiveIndex(
                    (current) =>
                        (current - 1 + validImages.length) % validImages.length
                );
            }
        };

        document.addEventListener("keydown", handleKeyDown);
        document.body.style.overflow = "hidden";

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
            document.body.style.overflow = "";
        };
    }, [lightboxOpen, validImages.length]);

    if (validImages.length === 0) {
        return (
            <div className="property-gallery__empty">
                <ImageIcon size={38} strokeWidth={1.5} />
                <h3>Photos coming soon</h3>
                <p>Property images will appear here when available.</p>
            </div>
        );
    }

    const previousImage = () => {
        setActiveIndex(
            (current) =>
                (current - 1 + validImages.length) % validImages.length
        );
    };

    const nextImage = () => {
        setActiveIndex((current) => (current + 1) % validImages.length);
    };

    const openLightbox = (index = activeIndex) => {
        setActiveIndex(index);
        setLightboxOpen(true);
    };

    return (
        <>
            <section
                className="property-gallery"
                aria-label={`${title} photo gallery`}
            >
                <div className="property-gallery__layout">
                    <div className="property-gallery__main">
                        <img
                            src={validImages[activeIndex]}
                            alt={`${title} - photo ${activeIndex + 1}`}
                            onClick={() => openLightbox()}
                        />

                        <div className="property-gallery__image-label">
                            <ImageIcon size={15} />
                            Property Photos
                        </div>

                        {validImages.length > 1 && (
                            <>
                                <button
                                    type="button"
                                    className="property-gallery__arrow property-gallery__arrow--left"
                                    onClick={previousImage}
                                    aria-label="Previous image"
                                >
                                    <ChevronLeft size={23} />
                                </button>

                                <button
                                    type="button"
                                    className="property-gallery__arrow property-gallery__arrow--right"
                                    onClick={nextImage}
                                    aria-label="Next image"
                                >
                                    <ChevronRight size={23} />
                                </button>
                            </>
                        )}

                        {/* Floating bottom overlay on main photo with counter, thumbnails, and corner view-all icon */}
                        <div className="property-gallery__main-overlay-bottom">
                            <div className="property-gallery__main-bottom-row">
                                <span className="property-gallery__counter">
                                    {activeIndex + 1} / {validImages.length} Photos
                                </span>
                            </div>

                            <div className="property-gallery__bottom-track-row">
                                {validImages.length > 1 && (
                                    <div className="property-gallery__thumbnails">
                                        {validImages.map((image, index) => (
                                            <button
                                                type="button"
                                                key={`${image}-${index}`}
                                                className={`property-gallery__thumbnail ${activeIndex === index
                                                        ? "property-gallery__thumbnail--active"
                                                        : ""
                                                    }`}
                                                onClick={() => setActiveIndex(index)}
                                                aria-label={`View photo ${index + 1}`}
                                                aria-pressed={activeIndex === index}
                                            >
                                                <img src={image} alt="" />
                                            </button>
                                        ))}
                                    </div>
                                )}

                                <button
                                    type="button"
                                    className="property-gallery__view-all-corner-btn"
                                    onClick={() => openLightbox()}
                                    aria-label="View all photos"
                                    title="View all photos"
                                >
                                    <Expand size={18} strokeWidth={2.2} />
                                </button>
                            </div>
                        </div>
                    </div>

                    {validImages.length > 1 && (
                        <div className="property-gallery__side">
                            {validImages.slice(0, 2).map((image, index) => {
                                const actualIndex = index + 1;

                                return (
                                    <button
                                        type="button"
                                        key={`${image}-${actualIndex}`}
                                        className={`property-gallery__side-image ${activeIndex === actualIndex
                                                ? "property-gallery__side-image--active"
                                                : ""
                                            }`}
                                        onClick={() =>
                                            setActiveIndex(actualIndex)
                                        }
                                        aria-label={`View photo ${actualIndex + 1}`}
                                    >
                                        <img
                                            src={image}
                                            alt={`${title} photo ${actualIndex + 1}`}
                                        />

                                        {index === 1 &&
                                            validImages.length > 3 && (
                                                <span className="property-gallery__more-overlay">
                                                    +{validImages.length - 3} photos
                                                </span>
                                            )}
                                    </button>
                                );
                            })}
                        </div>
                    )}
                </div>
            </section>

            {lightboxOpen && (
                <div
                    className="property-gallery__lightbox"
                    role="dialog"
                    aria-modal="true"
                    aria-label={`${title} photo viewer`}
                    onMouseDown={(event) => {
                        if (event.target === event.currentTarget) {
                            setLightboxOpen(false);
                        }
                    }}
                >
                    <div className="property-gallery__lightbox-header">
                        <div>
                            <strong>{title}</strong>
                            <span>
                                Photo {activeIndex + 1} of {validImages.length}
                            </span>
                        </div>

                        <button
                            type="button"
                            onClick={() => setLightboxOpen(false)}
                            aria-label="Close photo viewer"
                        >
                            <X size={24} />
                        </button>
                    </div>

                    <div className="property-gallery__lightbox-content">
                        {validImages.length > 1 && (
                            <button
                                type="button"
                                className="property-gallery__lightbox-arrow"
                                onClick={previousImage}
                                aria-label="Previous photo"
                            >
                                <ChevronLeft size={30} />
                            </button>
                        )}

                        <img
                            src={validImages[activeIndex]}
                            alt={`${title} - photo ${activeIndex + 1}`}
                        />

                        {validImages.length > 1 && (
                            <button
                                type="button"
                                className="property-gallery__lightbox-arrow"
                                onClick={nextImage}
                                aria-label="Next photo"
                            >
                                <ChevronRight size={30} />
                            </button>
                        )}
                    </div>

                    {validImages.length > 1 && (
                        <div className="property-gallery__lightbox-thumbnails">
                            {validImages.map((image, index) => (
                                <button
                                    type="button"
                                    key={`${image}-lightbox-${index}`}
                                    className={
                                        activeIndex === index
                                            ? "property-gallery__lightbox-thumbnail property-gallery__lightbox-thumbnail--active"
                                            : "property-gallery__lightbox-thumbnail"
                                    }
                                    onClick={() => setActiveIndex(index)}
                                    aria-label={`View photo ${index + 1}`}
                                >
                                    <img src={image} alt="" />
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </>
    );
}

export default PropertyGallery;