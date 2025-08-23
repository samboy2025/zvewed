// Content Security Policy Configuration
// This file contains the CSP directives for your Next.js app

const cspConfig = {
  // Default source restrictions
  'default-src': ["'self'"],
  
  // Script sources - More permissive for development
  'script-src': [
    "'self'",
    "'unsafe-inline'",
    "'unsafe-eval'",
    "'wasm-unsafe-eval'",
    "chrome-extension://9a3fb90a-e7ab-49bd-b0e9-ba06d2fd8ccd/",
    // Add any external scripts you need
  ],
  
  // Style sources
  'style-src': [
    "'self'",
    "'unsafe-inline'",
    // Add any external stylesheets you need
  ],
  
  // Image sources
  'img-src': [
    "'self'",
    "data:",
    "https:",
    // Add specific image domains if needed
  ],
  
  // Font sources
  'font-src': [
    "'self'",
    "data:",
    // Add any external font sources
  ],
  
  // Connection sources (HTTP, WebSocket, etc.)
  'connect-src': [
    "'self'",
    "https:",
    "wss:", // WebSocket secure
    "wss://courteous-koala-82.convex.cloud", // Your Convex WebSocket
    "https://courteous-koala-82.convex.cloud", // Your Convex HTTP
    // Add any other API endpoints you need
  ],
  
  // Frame sources
  'frame-src': [
    "'self'",
    // Add any iframe sources you need
  ],
  
  // Object sources
  'object-src': ["'none'"],
  
  // Base URI
  'base-uri': ["'self'"],
  
  // Form action
  'form-action': ["'self'"],
  
  // Media sources (if you have video/audio)
  'media-src': [
    "'self'",
    "https:",
  ],
  
  // Worker sources (if you use web workers)
  'worker-src': [
    "'self'",
    "blob:",
  ],
  
  // Add nonce support for inline scripts
  'nonce-source': ["'nonce-${nonce}'"],
};

// Convert to CSP string format
function generateCSP(nonce = '') {
  return Object.entries(cspConfig)
    .map(([key, values]) => {
      if (key === 'nonce-source') {
        return `script-src ${values.join(' ')}`;
      }
      return `${key} ${values.join(' ')}`;
    })
    .join('; ');
}

// Export for use in next.config.mjs
export { generateCSP, cspConfig };

// For direct use
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { generateCSP, cspConfig };
}