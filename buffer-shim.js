// buffer-shim.js — minimalni Buffer za browser, dovoljan za web3.js transfer
(function () {
  if (typeof window === 'undefined') return;

  // Ako već postoji ispravan Buffer s .from, ne diraj
  if (typeof window.Buffer !== 'undefined' && typeof window.Buffer.from === 'function') {
    globalThis.Buffer = window.Buffer;
    return;
  }

  function hexToU8(hex) {
    const len = hex.length / 2;
    const out = new Uint8Array(len);
    for (let i = 0; i < len; i++) out[i] = parseInt(hex.substr(i * 2, 2), 16);
    return out;
  }
  function strToU8(str) {
    try { return new TextEncoder().encode(str); } catch (_) {
      // fallback
      const arr = new Uint8Array(str.length);
      for (let i = 0; i < str.length; i++) arr[i] = str.charCodeAt(i);
      return arr;
    }
  }
  function base64ToU8(b64) {
    const bin = atob(b64);
    const out = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
    return out;
  }

  const B = {};
  B.from = function (input, enc) {
    if (input == null) return new Uint8Array(0);

    if (Array.isArray(input)) return Uint8Array.from(input);
    if (input instanceof ArrayBuffer) return new Uint8Array(input);
    if (ArrayBuffer.isView(input)) return new Uint8Array(input.buffer, input.byteOffset, input.byteLength);

    if (typeof input === 'string') {
      if (enc === 'hex') return hexToU8(input.trim());
      if (enc === 'base64') return base64ToU8(input.trim());
      return strToU8(input);
    }

    // broj / objekt → probaj konverziju
    try { return Uint8Array.from(input); } catch (_) { return strToU8(String(input)); }
  };

  B.alloc = function (size, fill = 0) {
    const a = new Uint8Array(size >>> 0);
    if (fill) a.fill(fill);
    return a;
  };

  B.isBuffer = function (v) { return v instanceof Uint8Array; };

  // izloži globalno
  window.Buffer = B;
  globalThis.Buffer = B;

  // korisno za neke libove
  if (!window.global)  window.global  = window;
  if (!window.process) window.process = { env: {} };
})();
