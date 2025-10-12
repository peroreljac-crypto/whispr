// /buffer-setup.js
(function () {
  try {
    // 1) Ako je polyfill tu, NA TVRDO ga mapiraj na globalne
    if (window.buffer && window.buffer.Buffer) {
      window.Buffer = window.buffer.Buffer;
      globalThis.Buffer = window.buffer.Buffer;
    }

    // 2) Ako je netko prepisao Buffer pa fali from/alloc — dopuni iz polyfila
    if (window.buffer && window.buffer.Buffer) {
      if (typeof Buffer.from  !== 'function') Buffer.from  = window.buffer.Buffer.from.bind(window.buffer.Buffer);
      if (typeof Buffer.alloc !== 'function') Buffer.alloc = window.buffer.Buffer.alloc.bind(window.buffer.Buffer);
      if (typeof Buffer.isBuffer !== 'function') Buffer.isBuffer = window.buffer.Buffer.isBuffer.bind(window.buffer.Buffer);
    }

    // 3) Sitni shimovi
    if (!window.global)  window.global  = window;
    if (!window.process) window.process = { env: {} };
  } catch (e) {
    console.error('[whispr] buffer-setup error', e);
  }
})();
