import('header/Header')
  .then(() => import('footer/Footer'))
  .then(() => {
    const headerHolder = document.getElementById('header-placeholder');
    const footerHolder = document.getElementById('footer-placeholder');

    const h = document.createElement('app-header');
    h.setAttribute('title', 'Host consume Header');
    headerHolder.appendChild(h);

    const f = document.createElement('app-footer');
    footerHolder.appendChild(f);
  })
  .catch(err => {
    console.error('Error cargando microfrontales remotos', err);
    const root = document.getElementById('root');
    const msg = document.createElement('pre');
    msg.textContent = 'Error cargando remotes: ' + err;
    root.appendChild(msg);
  });
