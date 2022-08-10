export const BACKEND_DOMAIN =  ( !process.env.NODE_ENV || process.env.NODE_ENV === 'development')  ?  "localhost:3000" : "api.bodegaliquidation.com";
export const BACKEND_URL =  `${ ( !process.env.NODE_ENV || process.env.NODE_ENV === 'development') ? 'http' : 'https'}://${BACKEND_DOMAIN}`;

// Product Types
export const VIEW_PRODUCT_ROUTE = `${BACKEND_URL}/user-view-product`;
export const FETCH_PRODUCT_DATA = "fetch_product_data";
export const FETCH_PRODUCT_DATA_COMPLETE = "fetch_product_data_complete";
export const CLEAR_PRODUCT_PAGE_STATE = "clear_product_page_state";

// Category Types
export const VIEW_CATEGORY_ROUTE = `${BACKEND_URL}/user-view-category`;
export const FETCH_CATEGORY_DATA = "fetch_category_data";
export const FETCH_CATEGORY_DATA_COMPLETE = "fetch_category_data_complete";
export const CLEAR_CATEGORY_PAGE_STATE = "clear_category_page_state";

// SearchProductTypes
export const SEARCH_PRODUCT_ROUTE = `${BACKEND_URL}/user-search-product`;
export const SEARCH_PRODUCT = "search_product";
export const SEARCH_PRODUCT_SUCCESS = "search_product_success";
export const SEARCH_PRODUCT_FAILURE = "search_product_failure";
export const CLEAR_PRODUCT_NAME_SEARCH = "clear_product_name_search";
export const PRODUCT_NAME_CHANGED = "product_name_changed";
export const CLEAR_SEARCH_PRODUCT_STATE = "clear_search_product_state";
export const SEARCH_RESULTS_FOUND_CHANGED = "search_results_found_changed";

// Landing Page Types
export const INITIALIZE_LANDING_PAGE_ROUTE = `${BACKEND_URL}/initialize-landing-page`;
export const INITIALIZE_LANDING_PAGE = "initialize_landing_page";
export const INITIALIZE_LANDING_PAGE_COMPLETE = "initialize_landing_page_complete";

// User Pages Types
export const GET_HEADER_CATEGORIES_ROUTE = `${BACKEND_URL}/get-header-categories`;
export const INITIALIZE_USER_PAGES = "initialize_user_pages";
export const INITIALIZE_USER_PAGES_COMPLETE = "initialize_user_pages_complete";