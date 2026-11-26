"use client";

function SvgBase({ size = 28, className = "", children }) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 32 32"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
            aria-hidden="true"
        >
            {children}
        </svg>
    );
}

export function SwimmingPoolIcon(props) {
    return (
        <SvgBase {...props}>
            <path d="M4 21c2-1.5 4-1.5 6 0s4 1.5 6 0 4-1.5 6 0 4 1.5 6 0" />
            <path d="M4 25c2-1.5 4-1.5 6 0s4 1.5 6 0 4-1.5 6 0 4 1.5 6 0" />
            <path d="M9 19V9a2 2 0 0 1 4 0v1" />
            <path d="M13 19v-7a2 2 0 0 1 4 0" />
            <path d="M9 14h4M9 17h4" />
            <path d="M23 19V11" />
            <path d="M18 11c1.5-3 8.5-3 10 0H18Z" />
        </SvgBase>
    );
}

export function ClubHouseIcon(props) {
    return (
        <SvgBase {...props}>
            <path d="M4 26h24" />
            <path d="M6 26V14h20v12" />
            <path d="M11 14v-3a5 5 0 0 1 10 0v3" />
            <circle cx="16" cy="10.5" r="1.5" />
            <rect x="9" y="18" width="4" height="8" />
            <rect x="19" y="18" width="4" height="8" />
            <path d="M15 18h2v3h-2z" />
        </SvgBase>
    );
}

export function KidsPlayIcon(props) {
    return (
        <SvgBase {...props}>
            <path d="M4 26h24" />
            <path d="M7 26V12l5-4 5 4v14" />
            <path d="M17 17l7 9" />
            <path d="M10 26v-6h4v6" />
            <path d="M21 15h6v11" />
            <path d="M23 15v5M25 15v5" />
            <path d="M22.5 20h3" />
        </SvgBase>
    );
}

export function GardenIcon(props) {
    return (
        <SvgBase {...props}>
            <path d="M3 26c3-3 7-3 10 0" />
            <path d="M15 26c4-4 10-4 14 0" />
            <path d="M10 24v-6" />
            <circle cx="10" cy="13" r="4.5" />
            <path d="M22 23v-7" />
            <path d="M22 8c-3 0-5 2.5-5 5.5S19 18 22 18s5-1.5 5-4.5S25 8 22 8Z" />
        </SvgBase>
    );
}

export function MultiCourtIcon(props) {
    return (
        <SvgBase {...props}>
            <rect x="3" y="8" width="26" height="16" rx="1" />
            <path d="M16 8v16" />
            <circle cx="16" cy="16" r="3" />
            <path d="M3 12h4a4 4 0 0 1 0 8H3" />
            <path d="M29 12h-4a4 4 0 0 0 0 8h4" />
        </SvgBase>
    );
}

export function SeniorCitizenIcon(props) {
    return (
        <SvgBase {...props}>
            <path d="M4 25h24" />
            <circle cx="10" cy="10" r="2" />
            <path d="M10 12v6l-2 5" />
            <path d="M10 15l3 2v6" />
            <path d="M6 19h5" />
            <circle cx="21" cy="10" r="2" />
            <path d="M21 12l-1 6 3 4" />
            <path d="M17 21c2 2 6 2 8 0" />
            <path d="M18 14v5h5" />
        </SvgBase>
    );
}

export function KidsPoolIcon(props) {
    return (
        <SvgBase {...props}>
            <path d="M4 22c2-1.5 4-1.5 6 0s4 1.5 6 0 4-1.5 6 0 4 1.5 6 0" />
            <path d="M4 26c2-1.5 4-1.5 6 0s4 1.5 6 0 4-1.5 6 0 4 1.5 6 0" />
            <circle cx="12" cy="12" r="2" />
            <path d="M8 15l4 2 4-2" />
            <path d="M12 17v4" />
            <circle cx="22" cy="14" r="3" />
            <path d="M20 12.5c1.5 1 2.5 2 3.5 3" />
        </SvgBase>
    );
}

export function FlowerGardenIcon(props) {
    return (
        <SvgBase {...props}>
            <rect x="6" y="18" width="20" height="8" rx="1" />
            <path d="M6 22h20" />
            <path d="M10 18v-5M16 18v-6M22 18v-5" />
            <circle cx="10" cy="10" r="2.2" />
            <circle cx="16" cy="9" r="2.5" />
            <circle cx="22" cy="10" r="2.2" />
            <path d="M8 15l2 1 2-1M14 14l2 1 2-1M20 15l2 1 2-1" />
        </SvgBase>
    );
}

export function CricketNetIcon(props) {
    return (
        <SvgBase {...props}>
            <path d="M6 25V9a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v16" />
            <path d="M6 13h20M11 7v12M16 7v11M21 7v12" />
            <circle cx="16" cy="22" r="4" />
            <path d="M13.5 19.5c2 1.5 3.5 3 5 5" />
        </SvgBase>
    );
}

export function LawnMowerIcon(props) {
    return (
        <SvgBase {...props}>
            <path d="M5 25h22" />
            <path d="M8 22h11l-2-5h-7l-2 5Z" />
            <circle cx="9" cy="23" r="2.5" />
            <circle cx="19" cy="23" r="2.5" />
            <path d="M18 19l6-10h3" />
        </SvgBase>
    );
}

export function AmphitheaterIcon(props) {
    return (
        <SvgBase {...props}>
            <path d="M4 18c4 5 20 5 24 0" />
            <path d="M6 14c3.5 4 16.5 4 20 0" />
            <path d="M9 10c2.5 3 11.5 3 14 0" />
            <path d="M4 18v5c4 5 20 5 24 0v-5" />
            <path d="M11 21v4M21 21v4" />
        </SvgBase>
    );
}

export function MeditationIcon(props) {
    return (
        <SvgBase {...props}>
            <circle cx="16" cy="15" r="10" strokeDasharray="2 2" />
            <circle cx="16" cy="10" r="2" />
            <path d="M12 15c1.5-2 6.5-2 8 0l2 4h-4l-2-2-2 2H10l2-4Z" />
            <path d="M10 21c2 1.5 10 1.5 12 0" />
        </SvgBase>
    );
}

export function SeatingAreaIcon(props) {
    return (
        <SvgBase {...props}>
            <rect x="6" y="11" width="20" height="8" rx="1.5" />
            <path d="M12.5 11v8M19.5 11v8" />
            <path d="M5 19h22v4H5z" />
            <path d="M7 23v3M25 23v3" />
        </SvgBase>
    );
}

export function PoolDeckIcon(props) {
    return (
        <SvgBase {...props}>
            <path d="M6 24h18" />
            <path d="M8 24l4-5h11l-2 5" />
            <path d="M12 19l-3-5" />
            <path d="M16 19V9" />
            <path d="M10 10c2-3.5 10-3.5 12 0H10Z" />
        </SvgBase>
    );
}

export function CrecheIcon(props) {
    return (
        <SvgBase {...props}>
            <rect x="5" y="15" width="9" height="9" rx="1" />
            <path d="M8 21l1.5-4 1.5 4M8.5 19.5h2" />
            <rect x="17" y="15" width="9" height="9" rx="1" />
            <path d="M20 17h2a1.5 1.5 0 0 1 0 3h-2v2h2a1.5 1.5 0 0 0 0-3" />
            <rect x="11" y="6" width="9" height="9" rx="1" />
            <path d="M17 9.5a1.8 1.8 0 1 0 0 2.5" />
        </SvgBase>
    );
}

export function StarGazingIcon(props) {
    return (
        <SvgBase {...props}>
            <path d="M8 17l13-7 2 4-13 7-2-4Z" />
            <path d="M15 17l-4 9M15 17l4 9M15 17v9" />
            <path d="M6 9l.8 1.5L8.5 11l-1.7.5L6 13l-.8-1.5L3.5 11l1.7-.5L6 9Z" />
            <circle cx="25" cy="7" r="1" />
        </SvgBase>
    );
}

export function PartyLawnIcon(props) {
    return (
        <SvgBase {...props}>
            <path d="M5 14l11-8 11 8" />
            <path d="M7 13v13h18V13" />
            <circle cx="12.5" cy="17" r="1.5" />
            <circle cx="19.5" cy="17" r="1.5" />
            <path d="M10 24c0-2 5-2 5 0M17 24c0-2 5-2 5 0" />
            <path d="M16 14v5" />
        </SvgBase>
    );
}

export function GymnasiumIcon(props) {
    return (
        <SvgBase {...props}>
            <rect x="5" y="7" width="22" height="19" rx="1" />
            <path d="M5 19h22" />
            <rect x="13" y="21" width="6" height="5" />
            <path d="M10 13h12M9 11v4M23 11v4M7.5 12v2M24.5 12v2" />
        </SvgBase>
    );
}

export function SkyCinemaIcon(props) {
    return (
        <SvgBase {...props}>
            <rect x="4" y="6" width="24" height="14" rx="1.5" />
            <circle cx="16" cy="13" r="3.5" />
            <path d="M15 11.5l2.5 1.5-2.5 1.5v-3Z" />
            <circle cx="11" cy="23" r="1.5" />
            <circle cx="21" cy="23" r="1.5" />
            <path d="M8 27c0-2 6-2 6 0M18 27c0-2 6-2 6 0" />
        </SvgBase>
    );
}

export function JoggingTrackIcon(props) {
    return (
        <SvgBase {...props}>
            <circle cx="17" cy="7" r="2" />
            <path d="M13 13l4-2 3 3 3-1" />
            <path d="M16 11l-2 6 4 3-1 5" />
            <path d="M14 17l-4 4" />
            <path d="M4 26h24" />
        </SvgBase>
    );
}

export function CyclingTrackIcon(props) {
    return (
        <SvgBase {...props}>
            <circle cx="8" cy="21" r="4" />
            <circle cx="24" cy="21" r="4" />
            <path d="M8 21l5-8h6l5 8" />
            <path d="M13 13l2 8h-7" />
            <path d="M17 10h4" />
        </SvgBase>
    );
}

export function SecurityIcon(props) {
    return (
        <SvgBase {...props}>
            <path d="M16 5l9 3.5v7c0 5.5-3.8 9.5-9 11.5-5.2-2-9-6-9-11.5v-7L16 5Z" />
            <path d="M12.5 16l2.5 2.5 5-5" />
        </SvgBase>
    );
}

export function ElevatorIcon(props) {
    return (
        <SvgBase {...props}>
            <rect x="6" y="5" width="20" height="22" rx="1.5" />
            <path d="M16 11v16" />
            <path d="M13 8l1.5-1.5L16 8M18 7l1.5 1.5L21 7" />
            <rect x="9" y="12" width="14" height="15" />
        </SvgBase>
    );
}

export function EvChargingIcon(props) {
    return (
        <SvgBase {...props}>
            <rect x="7" y="6" width="12" height="20" rx="1.5" />
            <path d="M5 26h16" />
            <path d="M13 11l-2.5 4h3l-1.5 4 3.5-5h-3l.5-3Z" />
            <path d="M19 12h3v8a2 2 0 0 0 4 0v-6l-2-2" />
        </SvgBase>
    );
}

export function ParkingIcon(props) {
    return (
        <SvgBase {...props}>
            <rect x="5" y="5" width="22" height="22" rx="3" />
            <path d="M12 22V10h5a3.5 3.5 0 0 1 0 7h-5" />
        </SvgBase>
    );
}

export function KitchenIcon(props) {
    return (
        <SvgBase {...props}>
            <rect x="4" y="16" width="24" height="10" rx="1" />
            <path d="M12 16v10M20 16v10" />
            <path d="M6 16v-3h6v3" />
            <path d="M15 7h10v5H15z" />
            <path d="M18 12v4" />
        </SvgBase>
    );
}

export function SmartLockIcon(props) {
    return (
        <SvgBase {...props}>
            <rect x="7" y="13" width="18" height="14" rx="2" />
            <path d="M11 13V9a5 5 0 0 1 10 0v4" />
            <circle cx="16" cy="20" r="2" />
        </SvgBase>
    );
}

export function VideoIntercomIcon(props) {
    return (
        <SvgBase {...props}>
            <rect x="6" y="5" width="20" height="22" rx="2" />
            <rect x="9" y="8" width="14" height="10" rx="1" />
            <circle cx="16" cy="13" r="2" />
            <circle cx="12" cy="22" r="1" />
            <circle cx="16" cy="22" r="1" />
            <circle cx="20" cy="22" r="1" />
        </SvgBase>
    );
}

export function SanitaryIcon(props) {
    return (
        <SvgBase {...props}>
            <path d="M16 6c4 5 7 9 7 13a7 7 0 1 1-14 0c0-4 3-8 7-13Z" />
            <path d="M13 20a3 3 0 0 0 3 3" />
        </SvgBase>
    );
}

export function AcCoolingIcon(props) {
    return (
        <SvgBase {...props}>
            <rect x="4" y="7" width="24" height="10" rx="2" />
            <path d="M8 13h16" />
            <path d="M10 21c-1 2 1 3 0 5M16 21c-1 2 1 3 0 5M22 21c-1 2 1 3 0 5" />
        </SvgBase>
    );
}

export function WindowGlassIcon(props) {
    return (
        <SvgBase {...props}>
            <rect x="5" y="6" width="22" height="20" rx="1" />
            <path d="M16 6v20M5 16h22" />
        </SvgBase>
    );
}

export function PowerBackupIcon(props) {
    return (
        <SvgBase {...props}>
            <path d="M17 4L8 17h7l-1 11 9-13h-7l1-11Z" />
        </SvgBase>
    );
}

export function BuildingIcon(props) {
    return (
        <SvgBase {...props}>
            <rect x="6" y="5" width="14" height="22" rx="1" />
            <path d="M20 12h6v15h-6" />
            <path d="M10 9h2M14 9h2M10 13h2M14 13h2M10 17h2M14 17h2" />
            <path d="M11 27v-5h4v5" />
        </SvgBase>
    );
}

export function WaterSupplyIcon(props) {
    return (
        <SvgBase {...props}>
            <path d="M4 12c3-2 5-2 8 0s5 2 8 0 5-2 8 0" />
            <path d="M4 18c3-2 5-2 8 0s5 2 8 0 5-2 8 0" />
            <path d="M4 24c3-2 5-2 8 0s5 2 8 0 5-2 8 0" />
        </SvgBase>
    );
}

export function RoadInfraIcon(props) {
    return (
        <SvgBase {...props}>
            <path d="M10 5L4 27M22 5l6 22" />
            <path d="M16 7v4M16 15v4M16 23v4" />
        </SvgBase>
    );
}

export function CompassVastuIcon(props) {
    return (
        <SvgBase {...props}>
            <circle cx="16" cy="16" r="10.5" />
            <path d="M19 13l-2 5-5 2 2-5 5-2Z" />
        </SvgBase>
    );
}

export function CheckFloorIcon(props) {
    return (
        <SvgBase {...props}>
            <rect x="5" y="5" width="22" height="22" rx="3" />
            <path d="M11 16.5l3.5 3.5L21 12.5" />
        </SvgBase>
    );
}
