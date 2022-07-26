export const BACKEND_DOMAIN =  ( !process.env.NODE_ENV || process.env.NODE_ENV === 'development')  ?  "localhost:3000" : "api.bodegaliquidation.com";
export const BACKEND_URL =  `${ ( !process.env.NODE_ENV || process.env.NODE_ENV === 'development') ? 'http' : 'https'}://${BACKEND_DOMAIN}`;


// Landing Page Types
export const INITIALIZE_LANDING_PAGE_ROUTE = `${BACKEND_URL}/initialize-landing-page`;
export const INITIALIZE_LANDING_PAGE = "initialize_landing_page";
export const INITIALIZE_LANDING_PAGE_COMPLETE = "initialize_landing_page_complete";

// User Pages Types
export const GET_HEADER_CATEGORIES_ROUTE = `${BACKEND_URL}/get-header-categories`;
export const INITIALIZE_USER_PAGES = "initialize_user_pages";
export const INITIALIZE_USER_PAGES_COMPLETE = "initialize_user_pages_complete";