// Image override helper for Anamay static site.
// Replace files in assets/images/ with the same filename to update images site-wide.
(function(){
  const imageMap = {
  "818b5c_6c3c3a6eaad040ebaa1ab05528bb9894": "brand/anamay-logo.png",
  "818b5c_ff8efe9e819549718539ad216da3a196": "banners/collection-hero.png",
  "818b5c_c4ceeae018ad4b7e9fd09c40e509cf0d": "banners/home-hero-botanicals.jpg",
  "818b5c_bfc40a96594e41c5835cd80dec4b6aa7": "about/team-member-01.jpg",
  "818b5c_972e330a46494b3dae8618bea297657b": "about/team-member-02.jpg",
  "818b5c_964cc0ee472e4b029e2ca7b57f83e387": "about/team-member-03.jpg",
  "818b5c_6d233a48ad4c41c09e6566fb2ae4f588": "about/team-member-04.jpg",
  "818b5c_6c7e028006b346aea78cf9759ce42443": "about/team-member-05.jpg",
  "818b5c_08dfa8e436ce4f4ebaf3d19833a3a16b": "about/soap-workshop.jpg",
  "818b5c_aee6e4e799454fa2abc155813a3edcfb": "products/jasmine/jasmine-soap-main.png",
  "818b5c_bc2d8cf557ed44f983eb719bd7a2df59": "products/turmeric/turmeric-soap-main.png",
  "818b5c_3fbabd70d51e4a1386974d146b4064be": "products/turmeric/turmeric-soap-lifestyle.jpg",
  "818b5c_0079ae4193d44356a56fb0148ab3ff5f": "products/turmeric/turmeric-soap-detail.jpg",
  "818b5c_2ff7a5450def4b34a6f02144c86c2d9a": "products/original/original-soap-main.png",
  "818b5c_4abe1961895046a3988cb810f2e1ce5f": "products/original/original-soap-lifestyle.jpg",
  "818b5c_bace189eee6d4844bd5dd06978579522": "home/home-soap-with-leaves.png",
  "818b5c_bda2a6ac2e654f648a3d82f181401830": "home/removed-img-5229.jpg",
  "818b5c_c2d9cfa6a83d41a7bce2d850f5f8f2b3": "home/original-soap-square.png",
  "818b5c_9621f0a1fde04b34ad8f72ff9cc29379": "home/bathroom-product-scene.png",
  "818b5c_90d32d6424d447d6a71c6e1289bc22e5": "home/colorful-soaps-row.jpg",
  "818b5c_8be820ac3ff24b53ab648fad75a617d8": "home/soap-making-table.png",
  "818b5c_715ccb50837d4647841a3b6dd8c43ecb": "home/original-soap-display.png",
  "818b5c_6f11bda0398b47799bbb7dc77e2c8fe4": "home/original-soap-honey.png",
  "818b5c_234ea286a57641be9405fd2905f20224": "home/product-flatlay-leaves.png",
  "818b5c_1592de3706f543ea9a587b2fb8db62ce": "home/soap-bars-stack.jpg",
  "818b5c_0aac45446bab4f35a3bde373f92fcc0b": "home/jasmine-soap-square.png",
  "818b5c_b7d69d5122de4a4eb0a236da4b15486f": "home/jasmine-soap-pair.jpg"
};
  function assetsBase(){
    const s = document.currentScript || Array.from(document.scripts).find(x => (x.src||'').includes('/assets/js/image-overrides.js'));
    if (!s || !s.src) return 'assets/';
    return s.src.replace(/assets\/js\/image-overrides\.js.*$/, 'assets/');
  }
  const base = assetsBase();
  function pathFor(hash){ return base + 'images/' + imageMap[hash]; }
  function findHash(str){
    if(!str) return null;
    for (const hash of Object.keys(imageMap)) {
      if (str.includes(hash)) return hash;
    }
    return null;
  }
  function replaceImageElement(img, hash){
    if(!img || !hash) return;
    const newSrc = pathFor(hash);
    if (img.src !== newSrc) {
      img.removeAttribute('srcset');
      img.src = newSrc;
    }
  }
  function applyImageOverrides(){
    document.querySelectorAll('img, source').forEach(el => {
      const hash = findHash(el.getAttribute('src')) || findHash(el.getAttribute('srcset')) || findHash(el.getAttribute('data-src'));
      if (hash) {
        el.removeAttribute('srcset');
        el.setAttribute(el.tagName.toLowerCase() === 'source' ? 'srcset' : 'src', pathFor(hash));
      }
    });
    document.querySelectorAll('[data-image-info]').forEach(box => {
      const hash = findHash(box.getAttribute('data-image-info'));
      if(hash){
        const img = box.querySelector('img');
        replaceImageElement(img, hash);
      }
    });
    document.querySelectorAll('[style]').forEach(el => {
      const style = el.getAttribute('style') || '';
      const hash = findHash(style);
      if(hash){
        el.style.backgroundImage = 'url("' + pathFor(hash) + '")';
      }
    });
  }
  window.AnamayImageMap = imageMap;
  document.addEventListener('DOMContentLoaded', applyImageOverrides);
  window.addEventListener('load', applyImageOverrides);
  setTimeout(applyImageOverrides, 500);
  setTimeout(applyImageOverrides, 1500);
  new MutationObserver(applyImageOverrides).observe(document.documentElement, { childList:true, subtree:true, attributes:true, attributeFilter:['src','srcset','style','data-image-info'] });
})();
