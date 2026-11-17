import {
    FaElevator,
    FaSquareParking,
    FaShieldHalved,
    FaDumbbell,
    FaPersonSwimming,
    FaTree,
    FaBolt,
    FaWifi,
    FaChildren,
    FaRoad,
    FaCar,
    FaDroplet,
    FaTableTennisPaddleBall,
    FaVideo,
    FaHouseUser,
    FaCircleCheck,
} from "react-icons/fa6";
import "./PropertyAmenities.css";

const amenityIcons = {
    lift: FaElevator,
    elevator: FaElevator,
    parking: FaSquareParking,
    car: FaCar,
    security: FaShieldHalved,
    guard: FaShieldHalved,
    cctv: FaVideo,
    gym: FaDumbbell,
    fitness: FaDumbbell,
    workout: FaDumbbell,
    swimming: FaPersonSwimming,
    pool: FaPersonSwimming,
    garden: FaTree,
    park: FaTree,
    power: FaBolt,
    backup: FaBolt,
    electricity: FaBolt,
    children: FaChildren,
    kid: FaChildren,
    play: FaChildren,
    wifi: FaWifi,
    internet: FaWifi,
    water: FaDroplet,
    road: FaRoad,
    sports: FaTableTennisPaddleBall,
    tennis: FaTableTennisPaddleBall,
    clubhouse: FaHouseUser,
    club: FaHouseUser,
    playing: FaChildren,
    plyaing: FaChildren,
};

function getAmenityIcon(amenity) {
    const text = String(amenity).toLowerCase();
    const match = Object.keys(amenityIcons).find((key) => text.includes(key));
    return match ? amenityIcons[match] : FaCircleCheck;
}

function PropertyAmenities({ amenities = [], showHeader = false }) {
    const items = Array.isArray(amenities) ? amenities.filter(Boolean) : [];

    return (
        <div className="property-amenities">
            {showHeader && (
                <div className="property-amenities__heading">
                    <span className="property-amenities__eyebrow">Property Features</span>
                    <h2>Amenities & Facilities</h2>
                    <p>Explore the facilities listed for this property.</p>
                </div>
            )}

            {items.length > 0 ? (
                <div className="property-amenities__grid">
                    {items.map((amenity, index) => {
                        const Icon = getAmenityIcon(amenity);

                        return (
                            <div
                                className="property-amenities__item"
                                key={`${amenity}-${index}`}
                            >
                                <span className="property-amenities__icon">
                                    <Icon size={15} />
                                </span>
                                <span className="property-amenities__name">{amenity}</span>
                            </div>
                        );
                    })}
                </div>
            ) : (
                <p className="property-amenities__empty">
                    Contact us to learn more about the available amenities.
                </p>
            )}
        </div>
    );
}

export default PropertyAmenities;
