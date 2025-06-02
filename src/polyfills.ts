// Ensure global is defined
if (typeof global === 'undefined') {
  (window as any).global = window;
}

// Ensure crypto is available
if (typeof window !== 'undefined' && !window.crypto) {
  (window as any).crypto = {
    getRandomValues: function(buffer: Uint8Array) {
      return crypto.getRandomValues(buffer);
    }
  };
} 