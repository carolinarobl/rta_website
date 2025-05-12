declare global {
    interface Window {
      gtag?: (...args: any[]) => void;
    }
  }
  
  export const gtag = (...args: any[]) => {
    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
      window.gtag(...args);
    }
  };
  
  export {};