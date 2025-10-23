import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const GoogleAnalytics = () => {
  const location = useLocation();
  const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;

  useEffect(() => {
    if (!GA_MEASUREMENT_ID) {
      console.warn('Google Analytics ID not configured');
      return;
    }

    // Load Google Analytics script
    const script = document.createElement('script');
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    script.async = true;
    document.head.appendChild(script);

    // Initialize gtag
    window.dataLayer = window.dataLayer || [];
    function gtag() {
      window.dataLayer.push(arguments);
    }
    window.gtag = gtag;
    
    gtag('js', new Date());
    gtag('config', GA_MEASUREMENT_ID, {
      page_path: location.pathname + location.search,
      send_page_view: true
    });

    return () => {
      // Cleanup if needed
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, [GA_MEASUREMENT_ID]);

  // Track page views on route change
  useEffect(() => {
    if (window.gtag && GA_MEASUREMENT_ID) {
      window.gtag('config', GA_MEASUREMENT_ID, {
        page_path: location.pathname + location.search,
      });
      
      // Send page view event
      window.gtag('event', 'page_view', {
        page_title: document.title,
        page_location: window.location.href,
        page_path: location.pathname + location.search,
      });
    }
  }, [location, GA_MEASUREMENT_ID]);

  return null;
};

// Helper functions for tracking events
export const trackEvent = (eventName, eventParams = {}) => {
  if (window.gtag) {
    window.gtag('event', eventName, eventParams);
  }
};

export const trackProductView = (product) => {
  trackEvent('view_item', {
    currency: 'UZS',
    value: product.price,
    items: [{
      item_id: product._id,
      item_name: product.name,
      item_category: product.category?.name,
      price: product.price,
      quantity: 1
    }]
  });
};

export const trackAddToCart = (product, quantity = 1) => {
  trackEvent('add_to_cart', {
    currency: 'UZS',
    value: product.price * quantity,
    items: [{
      item_id: product._id,
      item_name: product.name,
      item_category: product.category?.name,
      price: product.price,
      quantity: quantity
    }]
  });
};

export const trackPurchase = (order) => {
  trackEvent('purchase', {
    transaction_id: order._id,
    value: order.totalPrice,
    currency: 'UZS',
    shipping: order.shippingCost || 0,
    items: order.items.map(item => ({
      item_id: item.product._id,
      item_name: item.product.name,
      item_category: item.product.category?.name,
      price: item.price,
      quantity: item.quantity
    }))
  });
};

export const trackSearch = (searchTerm) => {
  trackEvent('search', {
    search_term: searchTerm
  });
};

export default GoogleAnalytics;
