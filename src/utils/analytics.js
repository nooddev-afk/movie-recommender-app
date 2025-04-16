// src/utils/analytics.js

export const GA_EVENTS = {
    GET_RECOMMENDATIONS_CLICKED: 'get_recommendations_clicked',
    GET_RECOMMENDATIONS_SUCCESS: 'get_recommendations_success',
    GET_RECOMMENDATIONS_FAILED: 'get_recommendations_failed',
    CLICKED_TRENDING: 'clicked_trending',
    CLICKED_BLOG: 'clicked_blog',
  };
  
  export const sendAnalyticsEvent = (eventName, params = {}) => {
    if (window.gtag) {
      window.gtag('event', eventName, params);
    } else {
      console.warn(`[Analytics] gtag not found for event: ${eventName}`, params);
    }
  };
  