import { apiRequest, withMockFallback } from "./api.js";

const fallbackContact = {
    id: 1,
    eyebrow: "GET IN TOUCH",
    title: "Connect With Our Property Advisors",
    cardEyebrow: "PUNE PROPERTY INVESTORS",
    cardTitle: "Start your Pune property journey today",
    cardSubtitle: "Complete the form and get a personalized list of verified properties within 24 hours.",
    officeLocation: "Gera Imperium Alpha, Kharadi",
    phoneNumber: "+91 73981 74444",
    whatsappNumber: "917398174444",
    backgroundImage: "/images/luxury-villa-bg.jpg",
    isActive: true,
};

let memoryContact = { ...fallbackContact };

export const contactSettingService = {
    async get() {
        return withMockFallback(
            () => apiRequest("/contact-settings"),
            () => ({ ...memoryContact })
        );
    },

    async update(payload) {
        return withMockFallback(
            () =>
                apiRequest("/contact-settings", {
                    method: "PUT",
                    body: JSON.stringify(payload),
                }),
            () => {
                memoryContact = { ...memoryContact, ...payload };
                return { ...memoryContact };
            }
        );
    },
};

export default contactSettingService;
