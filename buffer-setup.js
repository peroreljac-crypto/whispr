// /buffer-setup.js
(function () {
  try {
    if (window.buffer && window.buffer.Buffer) {
      window.Buffer = window.buffer.Buffer;
      globalThis.Buffer = window.buffer.Buffer;
    }
    if (!window.global)  window.global  = window;
    if (!window.process) window.process = { env: {} };
  } catch (e) { console.error('[whispr] buffer-setup error', e); }
})();
