declare module 'crypto-browserify' {
  const crypto: typeof window.crypto;
  export default crypto;
} 