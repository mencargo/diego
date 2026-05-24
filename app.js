const modal     = document.getElementById('modal');
const modalTitle = document.getElementById('modal-title');
const modalLogo  = document.getElementById('modal-logo');
const modalLink  = document.getElementById('modal-link');
const modalDate  = document.getElementById('modal-date');
const modalDesc  = document.getElementById('modal-desc');

const h1 = document.querySelector('h1');
const h1Original = h1.textContent;
const getData = () => h1Original.toLowerCase().replace(' ', '\u002e') + '\u0040gm' + 'ai' + 'l\u002ecom';
h1.addEventListener('mouseenter', () => h1.textContent = getData());
h1.addEventListener('mouseleave', () => h1.textContent = h1Original);
h1.addEventListener('click', () => {
  const email = getData();
  navigator.clipboard.writeText(email);
  modalTitle.textContent = 'contact';
  modalLogo.innerHTML = '';
  modalLink.textContent = email;
  modalLink.removeAttribute('href');
  modalLink.classList.remove('not-found');
  modalDate.textContent = '';
  modalDesc.textContent = 'contact data copied to clipboard ✓';
  modal.removeAttribute('hidden');
});

document.querySelector('.grid') && document.querySelectorAll('.grid a').forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();

    const name = a.closest('div').querySelector('h3')?.textContent ?? '';
    const href = a.getAttribute('href');
    const desc = a.getAttribute('title') ?? '';
    const date = a.dataset.date ?? '';

    modalTitle.textContent = name;

    // logo: clone first img or svg inside the anchor
    const logoEl = a.querySelector('img, svg');
    modalLogo.innerHTML = '';
    if (logoEl) modalLogo.appendChild(logoEl.cloneNode(true));

    // link
    if (href && href.startsWith('#') && href.length > 1) {
      const domain = href.slice(1);
      modalLink.textContent = `${domain} [410:gone]`;
      modalLink.removeAttribute('href');
      modalLink.classList.add('not-found');
    } else if (!href || href === '#') {
      modalLink.textContent = '';
      modalLink.removeAttribute('href');
      modalLink.classList.remove('not-found');
    } else {
      modalLink.textContent = href;
      modalLink.href = href;
      modalLink.classList.remove('not-found');
    }

    modalDate.textContent = date ? `${date}` : '';
    modalDesc.textContent = desc ? `${desc}` : '';

    modal.removeAttribute('hidden');
  });
});

document.getElementById('modal-close').addEventListener('click', closeModal);
modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

// Draggable
const bar = document.getElementById('modal-bar');
const win = document.getElementById('modal-window');

bar.addEventListener('mousedown', e => {
  if (e.target === document.getElementById('modal-close')) return;

  // Switch to absolute positioning anchored to current position
  if (!win.style.left) {
    const r = win.getBoundingClientRect();
    win.style.position = 'absolute';
    win.style.left = r.left + 'px';
    win.style.top  = r.top  + 'px';
    win.style.margin = '0';
  }

  const startX = e.clientX - win.offsetLeft;
  const startY = e.clientY - win.offsetTop;

  function onMove(e) {
    win.style.left = (e.clientX - startX) + 'px';
    win.style.top  = (e.clientY - startY) + 'px';
  }

  function onUp() {
    document.removeEventListener('mousemove', onMove);
    document.removeEventListener('mouseup',   onUp);
  }

  document.addEventListener('mousemove', onMove);
  document.addEventListener('mouseup',   onUp);
});

// Reset position when modal is closed so it re-centers on next open
function closeModal() {
  modal.setAttribute('hidden', '');
  win.style.position = '';
  win.style.left = '';
  win.style.top  = '';
  win.style.margin = '';
}
