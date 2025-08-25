import ReactGA from "react-ga4";

interface IEvent {
    action: string,
    category: string,
    label?: string,
    value?: number
}

export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID || ""; // ID GA4

// Initialize GA
export function initGA() {
    if (GA_TRACKING_ID) {
        ReactGA.initialize(GA_TRACKING_ID);
        console.log("GA Initialized with ID:", GA_TRACKING_ID);
    }
};

// Track page view
export function pageview(url: string) {
    if (GA_TRACKING_ID) {
        ReactGA.send({ hitType: "pageview", page: url });
    }
};

// Track custom event
export function event({ action, category, label, value }: IEvent) {
    if (GA_TRACKING_ID) {
        ReactGA.event({ action, category, label, value });
    }
};