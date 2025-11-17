import('./header.js').then(module => {
  module.defineHeader();
  window.__header_exposed = { defineHeader: module.defineHeader };
});
