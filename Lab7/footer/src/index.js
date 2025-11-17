import('./footer.js').then(module => {
  module.defineFooter();
  window.__footer_exposed = { defineFooter: module.defineFooter };
});
