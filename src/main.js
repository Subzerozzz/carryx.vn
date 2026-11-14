import { formatBackpackPrice, roadmap } from './catalog.js';
import './carryx-assistant.js';

const $ = (s, root = document) => root.querySelector(s);
const $$ = (s, root = document) => [...root.querySelectorAll(s)];
const main = $('#main');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const arrow = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';
const icons = {
  fingerprint: '<path d="M8 15v-4a4 4 0 0 1 8 0v4m-5 6c2-3 2-6 2-9m-8 4V11a7 7 0 0 1 14 0v3m-11 7c2-3 2-6 2-9m7 6c-1 2-1 3-2 4"/>',
  laptop: '<rect x="4" y="4" width="16" height="12" rx="2"/><path d="M2 20h20M9 16v4m6-4v4"/>',
  water: '<path d="M12 2c-2 4-7 9-7 13a7 7 0 0 0 14 0c0-4-5-9-7-13Z"/><path d="M8 15a4 4 0 0 0 4 4"/>',
  usb: '<path d="M12 22V3m-3 3 3-3 3 3M12 16l-5-4V8m5 5 5-4V7"/><circle cx="7" cy="6" r="2"/><path d="M15 3h4v4h-4"/>',
};
const icon = (name) => `<svg class="line-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${icons[name] || icons.fingerprint}</svg>`;
const button = (label, href, style = '', attrs = '') => `<a class="button ${style}" href="${href}" ${attrs}>${label}${arrow}</a>`;
const photo = (name, alt, cls = '', eager = false) => `<img class="${cls}" src="/images/${name}.webp" alt="${alt}" ${eager ? 'fetchpriority="high" loading="eager"' : 'loading="lazy"'} decoding="async" />`;
const heading = (eyebrow, title, text = '', cls = '') => { const tag = cls.includes('large-heading') ? 'h1' : 'h2'; return `<div class="section-heading ${cls}" data-reveal><span class="eyebrow">${eyebrow}</span><${tag}>${title}</${tag}>${text ? `<p>${text}</p>` : ''}</div>`; };
const cta = () => `<section class="cta-section"><div class="container cta-inner" data-reveal><div><span class="eyebrow">CÙNG BẠN TRÊN MỖI HÀNH TRÌNH</span><h2>Chọn chiếc balo hợp với bạn.</h2><p>Nhóm CarryX sẵn sàng tư vấn về màu sắc, tính năng và cách sử dụng.</p></div>${button('Nhắn Zalo cho CarryX', 'https://zalo.me/0378319358', '', 'target="_blank" rel="noopener noreferrer"')}</div></section>`;
const colorName = color => color === 'brown' ? 'Nâu' : 'Đen';
const productPhotos = {
  black: [
    ['black-angle', 'Tổng thể'],
    ['black-fingerprint', 'Khóa vân tay'],
    ['black-usb', 'Cổng USB'],
    ['black-back', 'Dây đeo trợ lực'],
    ['water-black', 'Bề mặt kháng nước'],
  ],
  brown: [
    ['brown', 'Tổng thể'],
    ['brown-back', 'Dây đeo trợ lực'],
    ['fingerprint', 'Khóa vân tay'],
    ['water-brown', 'Bề mặt kháng nước'],
  ],
};

function galleryImage(color, index = 0) {
  const [image, label] = productPhotos[color][index];
  return photo(image, `CarryX màu ${colorName(color)} · ${label}`);
}

function galleryButtons(color) {
  return productPhotos[color].map(([image, label], index) => `
    <button type="button" data-photo-index="${index}" class="${index === 0 ? 'selected' : ''}"
      aria-label="${label}" aria-pressed="${index === 0}">
      ${photo(`thumbs/${image}`, '')}
    </button>`).join('');
}

function backpackSpecs(color) {
  const specs = [
    ['Bảo vệ', 'Khóa vân tay cho ngăn chính'],
    ['Sắp xếp', 'Ngăn laptop tối đa 15,6 inch'],
    ['Kết nối', 'USB dùng cùng sạc dự phòng', 'black'],
    ['Dây đeo', 'Dây đeo trợ lực có đệm'],
    ['Chất liệu', 'Da PU kháng nước · Lót polyester'],
  ];
  return specs.filter(([, , version]) => !version || version === color)
    .map(([term, description]) => `<div><dt>${term}</dt><dd>${description}</dd></div>`).join('');
}

function warranty(color) {
  return `${icon('fingerprint')} Bảo hành 6 tháng cho khóa vân tay${color === 'black' ? ' và cổng USB' : ''}.`;
}

function productCards() {
  return `<div class="product-grid">${['black', 'brown'].map((color, index) => `
    <article class="product-card" data-reveal style="--reveal-delay:${index * 100}ms">
      <div class="product-cover image-wrap">${galleryImage(color)}</div>
      <div class="product-card-heading"><h3>Smart Backpack</h3><span class="color-label"><i class="color-dot ${color}"></i>${colorName(color)}</span></div>
      <p class="card-spec">Khóa vân tay <span>·</span> ${color === 'black' ? 'USB <span>·</span> ' : ''}Ngăn laptop 15,6”</p>
      <p class="price">Giá dự kiến <strong>${formatBackpackPrice(color)} ₫</strong></p>
      ${button(`Khám phá màu ${colorName(color).toLowerCase()}`, `#/san-pham/smart-backpack?mau=${color === 'brown' ? 'nau' : 'den'}`, 'button-outline')}
    </article>`).join('')}</div>`;
}

function home() {
  return `<section class="hero"><div class="container"><div class="hero-grid"><div class="hero-copy"><span class="eyebrow hero-enter">SMART CARRY, SAFE LIFE</span><h1><span class="hero-line">Balo thông minh</span> <span class="hero-line">mang theo</span> <span class="hero-line">cuộc sống hiện đại</span></h1><p class="hero-enter hero-description">Từ giảng đường đến văn phòng. Một chiếc balo gọn gàng, tiện lợi và an tâm hơn cho mỗi ngày bạn đi.</p><div class="hero-actions hero-enter"><button class="button" data-scroll="colors">Khám phá hai màu balo ${arrow}</button>${button('Câu chuyện CarryX', '#/ve-carryx', 'button-text')}</div><span class="soft-label hero-enter">Đen & Nâu <span>·</span> Smart Backpack</span></div><div class="hero-visual hero-enter"><img
      src="/images/hero-facebook-960.webp"
      srcset="/images/hero-facebook-960.webp 960w, /images/hero-facebook-1366.jpg 1366w"
      sizes="(max-width: 760px) calc(100vw - 48px), (max-width: 1440px) 50vw, 720px"
      width="960" height="1440" fetchpriority="high" decoding="async"
      alt="Balo CarryX màu đen trong một ngày di chuyển thực tế"
    /><div class="photo-caption"><span>01 / YOUR EVERYDAY COMPANION</span><span>CarryX in real life ↗</span></div></div></div></div></section>
  <section class="section section-white colors-section" id="colors"><div class="container">${heading('HAI MÀU SẮC. CÙNG MỘT TINH THẦN.', 'Chọn sắc màu của bạn.', 'Một thiết kế thông minh, hai cách thể hiện phong cách mỗi ngày.')}${productCards()}</div></section>
  <section class="section"><div class="container">${heading('THIẾT THỰC TRONG TỪNG CHI TIẾT', 'Được nghĩ cho ngày của bạn.')}<div class="feature-grid">${[['black-fingerprint', 'Chạm nhẹ. An tâm hơn.', 'Khóa vân tay giúp bạn kiểm soát quyền mở ngăn chính.', 'fingerprint'], ['inside', 'Mọi thứ có chỗ riêng.', 'Ngăn laptop có đệm và nhiều ngăn nhỏ để sắp xếp gọn gàng.', 'laptop'], ['water-black', 'Sẵn sàng trước cơn mưa.', 'Bề mặt da PU kháng nước, dễ chăm sóc trong nhịp sống thường ngày.', 'water']].map(([img, title, desc, ic]) => `<article class="feature-card" data-reveal><div class="image-wrap">${photo(img, title)}</div><span class="feature-icon">${icon(ic)}</span><h3>${title}</h3><p>${desc}</p></article>`).join('')}</div></div></section>
  <section class="section section-white story-section"><div class="container"><div class="story-photo image-wrap" data-reveal>${photo('journey', 'Hai người bạn mang balo CarryX Đen và Nâu trên đường đi')}</div><div class="story-grid"><div data-reveal><span class="eyebrow">NHỮNG NGƯỜI THẬT. NHỮNG HÀNH TRÌNH THẬT.</span><h2>Từ một ý tưởng nhỏ,<br/>đến người bạn mỗi ngày.</h2></div><div data-reveal><p>CarryX bắt đầu từ nhóm sinh viên Đại học FPT và một mong muốn gần gũi: giúp việc mang theo đồ dùng mỗi ngày trở nên tiện lợi và an tâm hơn.</p>${button('Gặp gỡ CarryX', '#/ve-carryx', 'button-outline')}</div></div></div></section>${cta()}`;
}

function roadmapPanel(index = 0) {
  const r = roadmap[index];
  const cards = r.items.map(([name, desc, conceptImage]) => {
    const image = name.toLowerCase().replaceAll(' ', '-');
    const illustration = conceptImage
      ? `<img src="/images/roadmap/${conceptImage}" alt="Minh họa ý tưởng CarryX ${name}" loading="lazy" decoding="async" />`
      : photo(`roadmap/${image}`, `Minh họa CarryX ${name}`);
    return `<li class="roadmap-card">
      <div class="roadmap-card-image">${illustration}</div>
      <div class="roadmap-card-copy"><h4>CarryX ${name}</h4>${conceptImage ? '<span class="roadmap-concept-label">Minh họa ý tưởng</span>' : ''}<p>${desc}</p></div>
    </li>`;
  });
  return `<div class="roadmap-year">
    <div class="roadmap-visual">${photo(r.photo, '')}</div>
    <div class="roadmap-content"><span class="eyebrow">DỰ KIẾN / NĂM ${r.year}</span><h3>${r.title}</h3><p>${r.desc}</p></div>
  </div>
  <p class="roadmap-image-label">Ảnh minh họa sản phẩm dự kiến</p>
  <ul class="roadmap-list" role="list">${cards.join('')}</ul>`;
}
function products() {
  return `<section class="section page-intro"><div class="container">${heading('BỘ SƯU TẬP CARRYX', 'Hai sắc màu.<br/>Một người bạn đồng hành.', 'Khám phá hai phiên bản Smart Backpack dành cho học tập, công việc và nhịp sống mỗi ngày.', 'large-heading')}${productCards()}</div></section><section class="section section-white"><div class="container detail-invitation"><div class="image-wrap" data-reveal>${photo('together', 'Hai màu balo CarryX trong đời sống thực tế')}</div><div data-reveal><span class="eyebrow">NHÌN GẦN HƠN</span><h2>Chọn màu.<br/>Xem từng góc.</h2><p>Xem khóa vân tay, dây đeo trợ lực và chất liệu của hai phiên bản, cùng cổng USB trên balo Đen.</p>${button('Xem chi tiết sản phẩm', '#/san-pham/smart-backpack', 'button-outline')}</div></div></section><section class="section roadmap-section"><div class="container">${heading('HỆ SINH THÁI ĐANG PHÁT TRIỂN', 'Cho nhiều cách di chuyển hơn.', '19 ý tưởng sản phẩm trong lộ trình Năm 2–5. Từng bước mở rộng, bắt đầu từ nhu cầu thực tế.')}<div class="roadmap-tabs" role="tablist" aria-label="Lộ trình sản phẩm" data-reveal>${roadmap.map((r, i) => `<button id="year-tab-${i}" role="tab" aria-selected="${i === 0}" aria-controls="roadmap-panel" tabindex="${i === 0 ? '0' : '-1'}" data-year="${i}"><span>Năm ${r.year}</span><small>${['Nhịp sống trẻ', 'Phụ kiện', 'Công sở', 'Du lịch'][i]}</small></button>`).join('')}</div><div id="roadmap-panel" class="roadmap-panel" role="tabpanel" tabindex="0" aria-labelledby="year-tab-0" data-reveal>${roadmapPanel()}</div><p class="roadmap-note">Các dòng sản phẩm trên đang ở giai đoạn định hướng, chưa phải danh mục đang bán. Tính năng và thời điểm ra mắt có thể được điều chỉnh.</p></div></section>${cta()}`;
}

const detailFeatures = [
  ['KHÓA VÂN TAY', 'Chạm để kiểm soát.', 'Mở ngăn chính bằng vân tay đã đăng ký.', [
    ['black-fingerprint', 'Phiên bản Đen'], ['fingerprint', 'Phiên bản Nâu'],
  ]],
  ['CỔNG USB', 'Kết nối khi cần.', 'Cổng USB trên balo Đen dùng cùng sạc dự phòng đặt bên trong để sạc điện thoại.', [
    ['black-usb', 'Phiên bản Đen'],
  ]],
  ['DA PU KHÁNG NƯỚC', 'An tâm với thời tiết.', 'Bề mặt kháng nước, dễ lau sạch. Lau khô sau mưa và tránh ngâm nước.', [
    ['water-black', 'Phiên bản Đen'], ['water-brown', 'Phiên bản Nâu'],
  ]],
  ['DÂY ĐEO TRỢ LỰC', 'Thoải mái khi mang theo.', 'Dây đeo có đệm trên cả hai phiên bản giúp giảm áp lực lên vai.', [
    ['black-back', 'Phiên bản Đen'], ['brown-back', 'Phiên bản Nâu'],
  ]],
  ['NGĂN CHỨA', 'Gọn gàng từ bên trong.', 'Ngăn laptop có đệm chống sốc, ngăn ẩn và các ngăn phụ giúp sắp xếp đồ dùng cá nhân.', [
    ['inside', 'Bên trong balo CarryX'],
  ]],
];

function featureRows() {
  return detailFeatures.map(([label, title, description, photos], index) => `
    <article class="detail-feature-row${photos.length === 1 ? ' detail-feature-single' : ''}" data-reveal>
      <div><span class="eyebrow">0${index + 1} / ${label}</span><h3>${title}</h3><p>${description}</p></div>
      ${photos.map(([image, caption]) => `
        <figure><div class="image-wrap">${photo(image, `${label} · ${caption}`)}</div><figcaption>${caption}</figcaption></figure>
      `).join('')}
    </article>`).join('');
}

function productDetail(color) {
  return `
    <section class="section detail-section">
      <div class="container">
        <a class="breadcrumb" href="#/san-pham">Sản phẩm <span>/</span> Smart Backpack</a>
        <div class="detail-grid">
          <div class="detail-gallery-column" data-reveal>
            <div class="product-gallery image-wrap">${galleryImage(color)}</div>
            <div class="photo-thumbnails" role="group" aria-label="Chọn ảnh sản phẩm">${galleryButtons(color)}</div>
          </div>
          <div class="detail-copy" data-reveal>
            <span class="soft-label">DÒNG BALO CHỦ LỰC</span>
            <h1>CarryX<br/>Smart Backpack</h1>
            <p class="detail-tagline">Mang theo gọn gàng. Di chuyển an tâm.</p>
            <p>Hai phiên bản Đen và Nâu đều có khóa vân tay, ngăn laptop có đệm và dây đeo trợ lực.</p>
            <div class="detail-price"><span>Giá dự kiến</span><strong><span class="detail-price-amount">${formatBackpackPrice(color)}</span> <small>₫</small></strong></div>
            <fieldset class="color-field">
              <legend>Màu sắc: <strong class="current-color">${colorName(color)}</strong></legend>
              <div class="color-choices">
                ${['black', 'brown'].map(version => `
                  <button class="color-choice ${version === color ? 'selected' : ''}" data-select-color="${version}" aria-pressed="${version === color}">
                    <i class="color-dot ${version}"></i>${colorName(version)}<span class="color-check" aria-hidden="true">✓</span>
                  </button>`).join('')}
              </div>
            </fieldset>
            <dl class="spec-list">${backpackSpecs(color)}</dl>
            <div class="detail-actions">
              ${button('Nhắn Zalo để được tư vấn', 'https://zalo.me/0378319358', '', 'target="_blank" rel="noopener noreferrer"')}
              ${button('Gọi 0378 319 358', 'tel:0378319358', 'button-outline')}
            </div>
            <p class="warranty-line">${warranty(color)}</p>
          </div>
        </div>
      </div>
    </section>
    <section class="section section-white">
      <div class="container">
        ${heading('NHÌN GẦN HƠN, HIỂU RÕ HƠN', 'Từng chi tiết. Cả hai sắc màu.', 'Ảnh chụp sản phẩm thực tế của CarryX.')}
        <div class="detail-features">${featureRows()}</div>
      </div>
    </section>
    <section class="section section-sand">
      <div class="container">
        ${heading('ĐỒNG HÀNH SAU KHI MUA', 'Bắt đầu dễ dàng. Dùng bền lâu.')}
        <div class="care-list">${[
          ['Đăng ký vân tay', 'Nhóm CarryX hướng dẫn thiết lập khóa và cách sử dụng khi bạn nhận sản phẩm.'],
          ['Kết nối sạc dự phòng', 'Với balo Đen, đặt sạc dự phòng bên trong và kết nối điện thoại qua cổng USB.'],
          ['Chăm sóc chất liệu', 'Lau bằng khăn mềm, làm khô sau mưa và tránh ngâm nước hoặc tác động mạnh.'],
          ['Khi cần hỗ trợ', 'Liên hệ nhóm để được tư vấn cách sử dụng và bảo hành.'],
        ].map(([title, text], i) => `<div data-reveal><span class="list-number">0${i + 1}</span><h3>${title}</h3><p>${text}</p></div>`).join('')}</div>
      </div>
    </section>${cta()}`;
}

function about() {
  return `<section class="section page-intro"><div class="container">${heading('XIN CHÀO, CHÚNG MÌNH LÀ CARRYX', 'Từ những điều gần gũi,<br/>nghĩ về hành trình dài.', 'Chúng mình tin rằng công nghệ hữu ích bắt đầu từ những nhu cầu rất đời thường.', 'large-heading')}<div class="about-hero image-wrap" data-reveal>${photo('team-portrait', 'Năm thành viên nhóm CarryX')}</div><div class="story-grid"><h2 data-reveal>Một chiếc balo,<br/>một khởi đầu chung.</h2><div data-reveal><p>CarryX được phát triển bởi nhóm 5 sinh viên Đại học FPT tại Hà Nội. Từ việc mang laptop đến lớp, đi làm hay gặp gỡ bạn bè, chúng mình nhận ra một nhu cầu chung: giữ đồ dùng gọn gàng, thuận tiện và an tâm hơn.</p><p>Vì vậy, CarryX chọn bắt đầu với khóa vân tay và những tiện ích có ích thật sự trong quá trình sử dụng mỗi ngày.</p></div></div></div></section><section class="section section-white"><div class="container">${heading('ĐIỀU CARRYX HƯỚNG ĐẾN', 'Công nghệ thiết thực.<br/>Giá trị dài lâu.')}<div class="mission-grid">${[['01 / TẦM NHÌN', 'Đi xa hơn một chiếc balo.', 'Trở thành thương hiệu balo thông minh được tin tưởng tại Việt Nam, kết hợp công nghệ và thiết kế để mang đến giải pháp di chuyển an toàn, tiện lợi.', 'Trong dài hạn, CarryX hướng đến hệ sinh thái Smart Mobility Accessories: túi xách, vali và phụ kiện hỗ trợ di chuyển. Mỗi bước mở rộng đều bắt đầu từ nhu cầu thực tế của người dùng.'], ['02 / SỨ MỆNH', 'Để bạn an tâm mang theo.', 'Cung cấp những chiếc balo thông minh, an toàn và tiện lợi, giúp người dùng tăng cường khả năng bảo vệ tài sản trên mỗi hành trình.', 'CarryX đưa nhận diện vân tay vào một thao tác đơn giản, dễ sử dụng. Chúng mình ưu tiên công nghệ phù hợp, dễ tiếp cận và tạo giá trị rõ ràng trong cuộc sống thường ngày.']].map(([ey, title, p1, p2]) => `<article data-reveal><span class="eyebrow">${ey}</span><h3>${title}</h3><p>${p1}</p><p>${p2}</p></article>`).join('')}</div></div></section><section class="section"><div class="container">${heading('NỀN TẢNG CỦA CARRYX', 'Điều chúng mình cùng giữ.')}<div class="values-list">${[['An toàn', 'Đặt sự an tâm của người dùng ở trung tâm.'], ['Đổi mới', 'Ứng dụng công nghệ cho những nhu cầu có thật.'], ['Chất lượng', 'Chú trọng độ bền và tính ổn định.'], ['Chính trực', 'Nói rõ những gì sản phẩm có thể làm.'], ['Hợp tác', 'Lắng nghe và cùng nhau phát triển.']].map(([title, text], i) => `<div data-reveal><span>0${i + 1}</span><h3>${title}</h3><p>${text}</p></div>`).join('')}</div></div></section><section class="section section-white"><div class="container detail-invitation"><div class="image-wrap" data-reveal>${photo('together', 'Cùng CarryX trên hành trình mỗi ngày')}</div><div data-reveal><span class="eyebrow">CÙNG MỘT ĐỊNH HƯỚNG</span><h2>Nhóm nhỏ.<br/>Mục tiêu chung.</h2><p>Phát triển sản phẩm hữu ích, lắng nghe phản hồi thật và cải thiện từng chi tiết.</p><div class="team-contact"><span>CarryX · Hà Nội, Việt Nam</span></div>${button('Kết nối với nhóm', '#/lien-he', 'button-outline')}</div></div></section>${cta()}`;
}

const questions = [['Mình muốn chọn màu và xem balo thực tế.', 'Bạn có thể xem ảnh của hai phiên bản Đen và Nâu ở trang sản phẩm. Nhắn Zalo hoặc gọi CarryX để được tư vấn màu sắc và cách trải nghiệm sản phẩm.'], ['Cổng USB có tự sạc điện thoại không?', 'Cổng USB trên balo Đen dùng cùng sạc dự phòng đặt bên trong để sạc điện thoại.'], ['Chất liệu có chống nước hoàn toàn không?', 'Da PU có khả năng kháng nước. Bạn nên lau khô sau khi gặp mưa và không ngâm balo trong nước.'], ['CarryX hỗ trợ bảo hành như thế nào?', 'CarryX bảo hành 6 tháng cho khóa vân tay trên cả hai màu và cổng USB trên balo Đen đối với lỗi kỹ thuật từ nhà sản xuất. Liên hệ nhóm để được hướng dẫn kiểm tra và hỗ trợ.'], ['Các sản phẩm Năm 2–5 đã có thể mua chưa?', 'Những dòng này nằm trong lộ trình phát triển dự kiến. Hiện website tập trung giới thiệu CarryX Smart Backpack với hai phiên bản Đen và Nâu.']];
function contact() {
  return `<section class="section page-intro contact-intro"><div class="container">${heading('CARRYX LUÔN SẴN SÀNG LẮNG NGHE', 'Bạn hỏi.<br/>Chúng mình cùng giải đáp.', 'Chọn balo, tìm hiểu tính năng hay cần hỗ trợ sau mua — bắt đầu bằng một cuộc trò chuyện với nhóm CarryX.', 'large-heading')}</div></section><section class="section section-white"><div class="container contact-grid"><div data-reveal><div class="contact-photo image-wrap">${photo('team', 'Khách tham quan tại gian hàng CarryX')}</div><h2 class="contact-heading">Kết nối trực tiếp với CarryX.</h2><div class="contact-channel"><span class="eyebrow">01 / GỌI ĐIỆN</span><a class="channel-title" href="tel:0378319358">0378 319 358</a><p>Tư vấn sản phẩm và thông tin mua hàng.</p>${button('Gọi cho CarryX', 'tel:0378319358', 'button-outline')}</div><div class="contact-channel"><span class="eyebrow">02 / NHẮN ZALO</span><h3>Hỏi điều bạn đang quan tâm.</h3><p>Gửi ảnh, câu hỏi hoặc nhu cầu sử dụng để nhóm tư vấn cụ thể hơn.</p>${button('Mở Zalo CarryX', 'https://zalo.me/0378319358', '', 'target="_blank" rel="noopener noreferrer"')}</div><p class="location">Hà Nội, Việt Nam<br/>Nhóm dự án CarryX · Đại học FPT</p></div><div class="enquiry-panel" data-reveal><span class="eyebrow">MỘT CUỘC TRÒ CHUYỆN DỄ DÀNG HƠN</span><h2>Chúng mình<br/>có thể giúp gì?</h2><p>Chuẩn bị một lời nhắn để chia sẻ nhu cầu của bạn với CarryX qua Zalo.</p><form id="enquiry-form"><label>Tên của bạn <span>*</span><input name="name" autocomplete="name" placeholder="CarryX nên gọi bạn là gì?" required maxlength="80" /></label><label>Màu sắc bạn thích<select name="color"><option>Đang cân nhắc cả hai màu</option><option>Đen</option><option>Nâu</option></select></label><label>Nhu cầu sử dụng<select name="purpose"><option>Đi học</option><option>Đi làm</option><option>Di chuyển hằng ngày</option><option>Hỗ trợ sử dụng / bảo hành</option><option>Hợp tác cùng CarryX</option></select></label><label>Câu hỏi của bạn <span>*</span><textarea name="question" rows="4" placeholder="Ví dụ: Balo có vừa laptop của mình không?" required maxlength="1500"></textarea></label><button class="button" type="submit">Chuẩn bị lời nhắn ${arrow}</button></form><div id="message-result" class="message-result" hidden><span class="success-label">✓ Lời nhắn đã sẵn sàng</span><p>Sao chép nội dung bên dưới rồi gửi cho CarryX trong Zalo nhé.</p><textarea id="prepared-message" readonly rows="7" aria-label="Lời nhắn đã chuẩn bị"></textarea><div class="message-actions"><button class="button" data-copy-message>Sao chép lời nhắn ${arrow}</button>${button('Mở Zalo', 'https://zalo.me/0378319358', 'button-outline', 'target="_blank" rel="noopener noreferrer"')}</div><button class="text-link" data-edit-message>← Sửa lại lời nhắn</button></div></div></div></section><section class="section"><div class="container">${heading('DỄ BẮT ĐẦU, DỄ TRAO ĐỔI', 'Từ câu hỏi đến lựa chọn phù hợp.')}<div class="steps-grid">${[['Chia sẻ nhu cầu', 'Cho CarryX biết bạn cần mang theo những gì mỗi ngày.'], ['Cùng xem chi tiết', 'Nhóm giải đáp về tính năng, hai màu và cách sử dụng.'], ['Chọn cách đồng hành', 'Trao đổi thông tin mua hàng hoặc nhận hỗ trợ sau mua.']].map(([title, text], i) => `<article data-reveal><span class="list-number">0${i + 1}</span><h3>${title}</h3><p>${text}</p></article>`).join('')}</div></div></section><section class="section section-sand"><div class="container faq-container">${heading('CÓ THỂ BẠN ĐANG BĂN KHOĂN', 'Một vài câu trả lời<br/>trước khi kết nối.')}<div class="faq-list">${questions.map(([q, a], i) => `<article class="faq-item ${i === 0 ? 'open' : ''}" data-reveal><h3><button aria-expanded="${i === 0}" aria-controls="faq-answer-${i}">${q}<span class="faq-plus" aria-hidden="true"></span></button></h3><div class="faq-answer" id="faq-answer-${i}" ${i === 0 ? '' : 'inert'}><div><p>${a}</p></div></div></article>`).join('')}</div></div></section>`;
}

let renderId = 0, revealObserver;
function observeContent() {
  revealObserver?.disconnect();
  if (reducedMotion.matches) return;
  revealObserver = new IntersectionObserver(entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('revealed'); revealObserver.unobserve(e.target); } }), { threshold: .09 });
  $$('[data-reveal]', main).forEach(el => { el.classList.add('will-reveal'); revealObserver.observe(el); });
}
function closeMenu() { $('.menu-toggle').setAttribute('aria-expanded', 'false'); $('#mobile-menu').inert = true; document.body.classList.remove('menu-open'); }
function route() {
  const current = ++renderId; closeMenu();
  const [path, query] = (location.hash.slice(1) || '/').split('?'); const params = new URLSearchParams(query);
  const color = params.get('mau') === 'nau' ? 'brown' : 'black';
  let page = 'home', html;
  if (path === '/san-pham/smart-backpack') { page = 'detail'; html = productDetail(color); }
  else if (path === '/san-pham') { page = 'products'; html = products(); }
  else if (path === '/ve-carryx') { page = 'about'; html = about(); }
  else if (path === '/lien-he') { page = 'contact'; html = contact(); }
  else if (path === '/') html = home();
  else html = `<section class="section empty-state container"><span class="eyebrow">CARRYX / 404</span><h1>Một lối rẽ khác.</h1><p>Trang bạn đang tìm chưa có ở đây.</p>${button('Trở về trang chủ', '#/')}</section>`;
  main.innerHTML = html; document.body.dataset.page = page;
  document.title = `${({ home: 'Balo thông minh mang theo cuộc sống hiện đại', products: 'Bộ sưu tập', about: 'Câu chuyện CarryX', contact: 'Kết nối cùng CarryX', detail: 'Smart Backpack' })[page]} | CarryX`;
  $$('.desktop-nav a').forEach(a => { const active = a.dataset.route === (page === 'detail' ? 'products' : page); a.classList.toggle('active', active); if (active) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current'); });
  window.scrollTo({ top: 0, behavior: 'instant' });
  observeContent();
  requestAnimationFrame(() => { if (current === renderId) document.dispatchEvent(new Event('carryx:ready')); });
}
function selectPhoto(color, index) {
  $('.product-gallery', main).innerHTML = galleryImage(color, index);
  $$('.photo-thumbnails button', main).forEach(button => {
    const selected = Number(button.dataset.photoIndex) === index;
    button.classList.toggle('selected', selected);
    button.setAttribute('aria-pressed', String(selected));
  });
}

function toast(message) { const t = $('#toast'); t.textContent = message; t.classList.add('visible'); clearTimeout(toast.timer); toast.timer = setTimeout(() => t.classList.remove('visible'), 2600); }

document.addEventListener('click', async e => {
  if (e.target.closest('.skip-link')) { e.preventDefault(); main.focus(); main.scrollIntoView({ behavior: 'instant' }); return; }
  const menu = e.target.closest('.menu-toggle'); if (menu) { const open = menu.getAttribute('aria-expanded') !== 'true'; menu.setAttribute('aria-expanded', String(open)); $('#mobile-menu').inert = !open; document.body.classList.toggle('menu-open', open); }
  if (e.target.closest('#mobile-menu a')) closeMenu();
  const scroll = e.target.closest('[data-scroll]'); if (scroll) document.getElementById(scroll.dataset.scroll)?.scrollIntoView({ behavior: reducedMotion.matches ? 'instant' : 'smooth', block: 'start' });
  const thumbnail = e.target.closest('[data-photo-index]');
  if (thumbnail) selectPhoto($('.color-choice.selected', main).dataset.selectColor, Number(thumbnail.dataset.photoIndex));

  const colorButton = e.target.closest('[data-select-color]');
  if (colorButton) {
    const color = colorButton.dataset.selectColor;
    $$('.color-choice', main).forEach(button => {
      const selected = button === colorButton;
      button.classList.toggle('selected', selected);
      button.setAttribute('aria-pressed', String(selected));
    });
    $('.current-color', main).textContent = colorName(color);
    $('.detail-price-amount', main).textContent = formatBackpackPrice(color);
    $('.spec-list', main).innerHTML = backpackSpecs(color);
    $('.warranty-line', main).innerHTML = warranty(color);
    $('.photo-thumbnails', main).innerHTML = galleryButtons(color);
    selectPhoto(color, 0);
    history.replaceState(null, '', `#/san-pham/smart-backpack?mau=${color === 'brown' ? 'nau' : 'den'}`);
  }
  const year = e.target.closest('[data-year]'); if (year) { const i = Number(year.dataset.year); $$('[data-year]').forEach(b => { const selected = b === year; b.setAttribute('aria-selected', String(selected)); b.tabIndex = selected ? 0 : -1; }); const panel = $('#roadmap-panel'); panel.innerHTML = roadmapPanel(i); panel.setAttribute('aria-labelledby', year.id); if (!reducedMotion.matches) panel.animate([{ opacity: 0, transform: 'translateY(10px)' }, { opacity: 1, transform: 'translateY(0)' }], { duration: 320, easing: 'ease-out' }); }
  const q = e.target.closest('.faq-item h3 button'); if (q) { const item = q.closest('.faq-item'), open = q.getAttribute('aria-expanded') !== 'true'; q.setAttribute('aria-expanded', String(open)); item.classList.toggle('open', open); $('.faq-answer', item).inert = !open; }
  if (e.target.closest('[data-copy-message]')) { const text = $('#prepared-message').value; try { await navigator.clipboard.writeText(text); toast('Đã sao chép. Bạn có thể gửi lời nhắn trong Zalo.'); } catch { $('#prepared-message').focus(); $('#prepared-message').select(); toast('Hãy sao chép nội dung đang được chọn.'); } }
  if (e.target.closest('[data-edit-message]')) { $('#message-result').hidden = true; $('#enquiry-form').hidden = false; $('#enquiry-form input').focus(); }
});
document.addEventListener('submit', e => {
  if (e.target.id !== 'enquiry-form') return; e.preventDefault(); const data = new FormData(e.target);
  $('#prepared-message').value = `Chào CarryX, mình là ${data.get('name').trim()}.\nMàu sắc quan tâm: ${data.get('color')}.\nNhu cầu: ${data.get('purpose')}.\n\n${data.get('question').trim()}`;
  e.target.hidden = true; $('#message-result').hidden = false; $('#prepared-message').focus();
});
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeMenu();
  const tab = e.target.closest('[data-year]'); if (!tab || !['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(e.key)) return;
  e.preventDefault(); let i = Number(tab.dataset.year); i = e.key === 'Home' ? 0 : e.key === 'End' ? 3 : (i + (e.key === 'ArrowRight' ? 1 : 3)) % 4; const next = $(`[data-year="${i}"]`); next.click(); next.focus();
});
window.addEventListener('hashchange', route);
window.addEventListener('scroll', () => $('#site-header').classList.toggle('scrolled', scrollY > 18), { passive: true });
$('#year').textContent = new Date().getFullYear();
route();
