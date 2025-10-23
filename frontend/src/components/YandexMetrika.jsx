import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const YandexMetrika = () => {
  const location = useLocation();
  const YANDEX_COUNTER_ID = import.meta.env.VITE_YANDEX_METRIKA_ID;

  useEffect(() => {
    if (!YANDEX_COUNTER_ID) {
      console.warn('Yandex Metrika ID not configured');
      return;
    }

    // Initialize Yandex Metrika
    (function(m,e,t,r,i,k,a){
      m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
      m[i].l=1*new Date();
      for (var j = 0; j < document.scripts.length; j++) {
        if (document.scripts[j].src === r) { return; }
      }
      k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
    })(window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

    window.ym(YANDEX_COUNTER_ID, "init", {
      clickmap: true,
      trackLinks: true,
      accurateTrackBounce: true,
      webvisor: true,
      ecommerce: "dataLayer"
    });

    // Noscript fallback
    const noscript = document.createElement('noscript');
    const div = document.createElement('div');
    const img = document.createElement('img');
    img.src = `https://mc.yandex.ru/watch/${YANDEX_COUNTER_ID}`;
    img.style.position = 'absolute';
    img.style.left = '-9999px';
    img.alt = '';
    div.appendChild(img);
    noscript.appendChild(div);
    document.body.appendChild(noscript);

    return () => {
      if (noscript.parentNode) {
        noscript.parentNode.removeChild(noscript);
      }
    };
  }, [YANDEX_COUNTER_ID]);

  // Track page views on route change
  useEffect(() => {
    if (window.ym && YANDEX_COUNTER_ID) {
      window.ym(YANDEX_COUNTER_ID, 'hit', window.location.href, {
        title: document.title
      });
    }
  }, [location, YANDEX_COUNTER_ID]);

  return null;
};

// Helper functions for tracking events
export const ymReachGoal = (target, params = {}) => {
  const YANDEX_COUNTER_ID = import.meta.env.VITE_YANDEX_METRIKA_ID;
  if (window.ym && YANDEX_COUNTER_ID) {
    window.ym(YANDEX_COUNTER_ID, 'reachGoal', target, params);
  }
};

export const ymTrackProductView = (product) => {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    "ecommerce": {
      "detail": {
        "products": [{
          "id": product._id,
          "name": product.name,
          "price": product.price,
          "brand": product.brand || "OptoMarket",
          "category": product.category?.name
        }]
      }
    }
  });
  ymReachGoal('product_view');
};

export const ymTrackAddToCart = (product, quantity = 1) => {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    "ecommerce": {
      "add": {
        "products": [{
          "id": product._id,
          "name": product.name,
          "price": product.price,
          "brand": product.brand || "OptoMarket",
          "category": product.category?.name,
          "quantity": quantity
        }]
      }
    }
  });
  ymReachGoal('add_to_cart');
};

export const ymTrackPurchase = (order) => {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    "ecommerce": {
      "purchase": {
        "actionField": {
          "id": order._id,
          "revenue": order.totalPrice
        },
        "products": order.items.map(item => ({
          "id": item.product._id,
          "name": item.product.name,
          "price": item.price,
          "brand": item.product.brand || "OptoMarket",
          "category": item.product.category?.name,
          "quantity": item.quantity
        }))
      }
    }
  });
  ymReachGoal('purchase', { order_id: order._id, revenue: order.totalPrice });
};

export const ymTrackSearch = (searchTerm) => {
  ymReachGoal('search', { search_term: searchTerm });
};

export default YandexMetrika;
