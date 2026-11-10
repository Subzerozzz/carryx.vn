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
const realPhotos = { black: ['black', 'black-angle', 'black-back', 'inside', 'water-black'], brown: ['brown', 'fingerprint', 'brown-back', 'usb-brown', 'water-brown'] };

function viewer(color = 'black', compact = false) {
  return `<div class="product-viewer ${compact ? 'is-compact' : ''}" data-viewer data-color="${color}" data-compact="${compact}" data-mode="photo" data-photo="0">
    <div class="viewer-top"><span class="viewer-badge"><span class="orbit-icon">◌</span> 360°</span><button class="icon-button" data-view-action="fullscreen" aria-label="Mở xem sản phẩm toàn màn hình"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" aria-hidden="true"><path d="M8 3H3v5m13-5h5v5M3 16v5h5m13-5v5h-5"/></svg></button></div>
    <div class="viewer-stage"><img class="viewer-photo" src="/images/${color}.webp" alt="CarryX Smart Backpack màu ${colorName(color)} — ảnh thật" loading="lazy"/><div class="viewer-loading"><span></span>Đang chuẩn bị không gian 3D</div><div class="drag-hint"><svg viewBox="0 0 48 16" fill="none" stroke="currentColor" aria-hidden="true"><path d="m6 3-5 5 5 5m36-10 5 5-5 5M1 8h46"/></svg>Kéo để khám phá</div></div>
    <div class="viewer-bottom"><div class="viewer-controls"><button class="icon-button" data-view-action="left" aria-label="Ảnh trước">←</button><button class="icon-button" data-view-action="auto" aria-label="Tự xoay sản phẩm" aria-pressed="false"><span aria-hidden="true">▷</span></button><button class="icon-button" data-view-action="right" aria-label="Ảnh tiếp theo">→</button><button class="icon-button reset-view" data-view-action="reset" aria-label="Về góc nhìn ban đầu">↺</button></div><div class="view-mode" role="group" aria-label="Chế độ xem"><button data-view-mode="3d" aria-pressed="false">Xoay 3D</button><button class="active" data-view-mode="photo" aria-pressed="true">Ảnh thật</button></div></div><p class="viewer-note">Ảnh thật · Chọn Xoay 3D để khám phá 360°</p>
  </div>`;
}

function productCards() {
  return `<div class="product-grid">${['black', 'brown'].map((c, i) => `<article class="product-card" data-reveal style="--reveal-delay:${i * 100}ms">${viewer(c, true)}<div class="product-card-heading"><h3>Smart Backpack</h3><span class="color-label"><i class="color-dot ${c}"></i>${colorName(c)}</span></div><p class="card-spec">Khóa vân tay <span>·</span> USB <span>·</span> Ngăn laptop 15.6”</p><p class="price">Giá dự kiến <strong>${formatBackpackPrice(c)} ₫</strong></p>${button(`Khám phá màu ${colorName(c).toLowerCase()}`, `#/san-pham/smart-backpack?mau=${c === 'brown' ? 'nau' : 'den'}`, 'button-outline')}</article>`).join('')}</div>`;
}

function home() {
  return `<section class="hero"><div class="container"><div class="hero-grid"><div class="hero-copy"><span class="eyebrow hero-enter">SMART CARRY, SAFE LIFE</span><h1><span class="hero-line">Balo thông minh</span> <span class="hero-line">mang theo</span> <span class="hero-line">cuộc sống hiện đại</span></h1><p class="hero-enter hero-description">Từ giảng đường đến văn phòng. Một chiếc balo gọn gàng, tiện lợi và an tâm hơn cho mỗi ngày bạn đi.</p><div class="hero-actions hero-enter"><button class="button" data-scroll="colors">Khám phá hai màu balo ${arrow}</button>${button('Câu chuyện CarryX', '#/ve-carryx', 'button-text')}</div><span class="soft-label hero-enter">Đen & Nâu <span>·</span> Smart Backpack</span></div><div class="hero-visual hero-enter">${photo('hero-original', 'Balo CarryX màu đen trong một ngày di chuyển thực tế', '', true)}<div class="photo-caption"><span>01 / YOUR EVERYDAY COMPANION</span><span>CarryX in real life ↗</span></div></div></div><div class="essential-strip">${[['fingerprint', 'Khóa vân tay'], ['laptop', 'Ngăn laptop 15.6”'], ['water', 'Da PU kháng nước']].map(([ic, label], i) => `<div><span class="essential-number">0${i + 1}</span>${icon(ic)}<span>${label}</span></div>`).join('')}</div></div></section>
  <section class="section section-white colors-section" id="colors"><div class="container">${heading('HAI MÀU SẮC. CÙNG MỘT TINH THẦN.', 'Chọn sắc màu của bạn.', 'Một thiết kế thông minh, hai cách thể hiện phong cách mỗi ngày.')}<div class="section-annotation" data-reveal><span class="small-orbit">↔</span><span>Chọn Xoay 3D rồi kéo hoặc vuốt để xem từng góc.</span></div>${productCards()}</div></section>
  <section class="section"><div class="container">${heading('THIẾT THỰC TRONG TỪNG CHI TIẾT', 'Được nghĩ cho ngày của bạn.')}<div class="feature-grid">${[['fingerprint', 'Chạm nhẹ. An tâm hơn.', 'Khóa vân tay giúp bạn kiểm soát quyền mở ngăn chính.', 'fingerprint'], ['inside', 'Mọi thứ có chỗ riêng.', 'Ngăn laptop có đệm và nhiều ngăn nhỏ để sắp xếp gọn gàng.', 'laptop'], ['water-black', 'Sẵn sàng trước cơn mưa.', 'Bề mặt da PU kháng nước, dễ chăm sóc trong nhịp sống thường ngày.', 'water']].map(([img, title, desc, ic]) => `<article class="feature-card" data-reveal><div class="image-wrap">${photo(img, title)}</div><span class="feature-icon">${icon(ic)}</span><h3>${title}</h3><p>${desc}</p></article>`).join('')}</div></div></section>
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
  return `<section class="section page-intro"><div class="container">${heading('BỘ SƯU TẬP CARRYX', 'Hai sắc màu.<br/>Một người bạn đồng hành.', 'Khám phá hai phiên bản Smart Backpack dành cho học tập, công việc và nhịp sống mỗi ngày.', 'large-heading')}<p class="intro-360" data-reveal>Xem ảnh chụp thật hoặc chọn Xoay 3D để khám phá từng góc.</p>${productCards()}</div></section><section class="section section-white"><div class="container detail-invitation"><div class="image-wrap" data-reveal>${photo('together', 'Hai màu balo CarryX trong đời sống thực tế')}</div><div data-reveal><span class="eyebrow">NHÌN GẦN HƠN</span><h2>Chọn màu.<br/>Xem từng góc.</h2><p>Khám phá khóa vân tay, cổng USB, ngăn laptop và chất liệu của cả hai phiên bản.</p>${button('Xem chi tiết sản phẩm', '#/san-pham/smart-backpack', 'button-outline')}</div></div></section><section class="section roadmap-section"><div class="container">${heading('HỆ SINH THÁI ĐANG PHÁT TRIỂN', 'Cho nhiều cách di chuyển hơn.', '19 ý tưởng sản phẩm trong lộ trình Năm 2–5. Từng bước mở rộng, bắt đầu từ nhu cầu thực tế.')}<div class="roadmap-tabs" role="tablist" aria-label="Lộ trình sản phẩm" data-reveal>${roadmap.map((r, i) => `<button id="year-tab-${i}" role="tab" aria-selected="${i === 0}" aria-controls="roadmap-panel" tabindex="${i === 0 ? '0' : '-1'}" data-year="${i}"><span>Năm ${r.year}</span><small>${['Nhịp sống trẻ', 'Phụ kiện', 'Công sở', 'Du lịch'][i]}</small></button>`).join('')}</div><div id="roadmap-panel" class="roadmap-panel" role="tabpanel" tabindex="0" aria-labelledby="year-tab-0" data-reveal>${roadmapPanel()}</div><p class="roadmap-note">Các dòng sản phẩm trên đang ở giai đoạn định hướng, chưa phải danh mục đang bán. Tính năng và thời điểm ra mắt có thể được điều chỉnh.</p></div></section>${cta()}`;
}

function productDetail(color) {
  return `<section class="section detail-section"><div class="container"><a class="breadcrumb" href="#/san-pham">Sản phẩm <span>/</span> Smart Backpack</a><div class="detail-grid"><div class="detail-viewer-column" data-reveal>${viewer(color)}<div class="photo-thumbnails" role="group" aria-label="Chọn ảnh sản phẩm">${realPhotos[color].map((p, i) => `<button data-photo-index="${i}" class="${i === 0 ? 'selected' : ''}" aria-label="Xem ảnh thật ${['tổng thể', 'chi tiết', 'mặt sau', 'tiện ích', 'kháng nước'][i]}" aria-pressed="${i === 0}">${photo(`thumbs/${p}`, '')}</button>`).join('')}</div><p class="model-disclosure">Mô phỏng 3D giúp khám phá hình dáng và vị trí tính năng. Đối chiếu ảnh chụp thật để xem hoàn thiện, màu sắc sản phẩm.</p></div><div class="detail-copy" data-reveal><span class="soft-label">DÒNG BALO CHỦ LỰC</span><h1>CarryX<br/>Smart Backpack</h1><p class="detail-tagline">Mang theo gọn gàng. Di chuyển an tâm.</p><p>Thiết kế hiện đại với khóa vân tay cho ngăn chính, ngăn laptop có đệm và cổng USB tiện dụng. Hai phiên bản Đen và Nâu cho nhịp sống mỗi ngày.</p><div class="detail-price"><span>Giá dự kiến</span><strong><span class="detail-price-amount">${formatBackpackPrice(color)}</span> <small>₫</small></strong></div><fieldset class="color-field"><legend>Màu sắc: <strong class="current-color">${colorName(color)}</strong></legend><div class="color-choices">${['black', 'brown'].map(c => `<button class="color-choice ${c === color ? 'selected' : ''}" data-select-color="${c}" aria-pressed="${c === color}"><i class="color-dot ${c}"></i>${colorName(c)}<span class="color-check">✓</span></button>`).join('')}</div></fieldset><dl class="spec-list">${[['Bảo vệ', 'Khóa vân tay cho ngăn chính'], ['Sắp xếp', 'Ngăn laptop tối đa 15.6 inch'], ['Kết nối', 'USB dùng cùng sạc dự phòng'], ['Chất liệu', 'Da PU kháng nước · Lót polyester']].map(([dt, dd]) => `<div><dt>${dt}</dt><dd>${dd}</dd></div>`).join('')}</dl><div class="detail-actions">${button('Nhắn Zalo để được tư vấn', 'https://zalo.me/0378319358', '', 'target="_blank" rel="noopener noreferrer"')}${button('Gọi 0378 319 358', 'tel:0378319358', 'button-outline')}</div><p class="warranty-line">${icon('fingerprint')} Bảo hành 6 tháng cho khóa vân tay và cổng USB.</p></div></div></div></section>
  <section class="section section-white"><div class="container">${heading('NHÌN GẦN HƠN, HIỂU RÕ HƠN', 'Từng chi tiết. Cả hai sắc màu.', 'Ảnh chụp sản phẩm thực tế của CarryX.')}<div class="detail-features">${[['01 / KHÓA VÂN TAY', 'Chạm để kiểm soát.', 'Hỗ trợ kiểm soát quyền mở ngăn chính bằng vân tay đã đăng ký.', 'fingerprint', 'black-lock'], ['02 / CỔNG USB', 'Kết nối khi cần.', 'Kết nối cổng USB với sạc dự phòng bên trong để sạc điện thoại.', 'usb-brown', 'black-usb'], ['03 / DA PU KHÁNG NƯỚC', 'An tâm với thời tiết.', 'Bề mặt kháng nước, dễ lau sạch. Lau khô sau mưa và tránh ngâm nước.', 'water-brown', 'water-black']].map(([ey, title, text, brown, black]) => `<article class="detail-feature-row" data-reveal><div><span class="eyebrow">${ey}</span><h3>${title}</h3><p>${text}</p></div><figure><div class="image-wrap">${photo(black, `${title} — phiên bản Đen`)}</div><figcaption>Phiên bản Đen</figcaption></figure><figure><div class="image-wrap">${photo(brown, `${title} — phiên bản Nâu`)}</div><figcaption>Phiên bản Nâu</figcaption></figure></article>`).join('')}</div></div></section><section class="section"><div class="container detail-invitation"><div class="image-wrap" data-reveal>${photo('inside', 'Các ngăn bên trong balo CarryX')}</div><div data-reveal><span class="eyebrow">MỌI THỨ CÓ CHỖ RIÊNG</span><h2>Gọn gàng từ bên trong.</h2><p>Ngăn laptop có đệm chống sốc, ngăn ẩn và các ngăn phụ cho đồ dùng cá nhân. Đệm lưng và quai đeo hỗ trợ sự thoải mái khi di chuyển.</p><div class="packing-list"><span>Laptop</span><span>Tài liệu</span><span>Điện thoại</span><span>Phụ kiện cá nhân</span></div></div></div></section><section class="section section-sand"><div class="container">${heading('ĐỒNG HÀNH SAU KHI MUA', 'Bắt đầu dễ dàng. Dùng bền lâu.')}<div class="care-list">${[['Đăng ký vân tay', 'Nhóm CarryX hướng dẫn thiết lập khóa và cách sử dụng khi bạn nhận sản phẩm.'], ['Kết nối sạc dự phòng', 'Đặt sạc dự phòng của bạn bên trong, kết nối điện thoại qua cổng USB.'], ['Chăm sóc chất liệu', 'Lau bằng khăn mềm, làm khô sau mưa; tránh ngâm nước và tác động mạnh.'], ['Khi cần hỗ trợ', 'Liên hệ nhóm để được tư vấn sử dụng và kiểm tra khóa, cổng USB.']].map(([title, text], i) => `<div data-reveal><span class="list-number">0${i + 1}</span><h3>${title}</h3><p>${text}</p></div>`).join('')}</div></div></section>${cta()}`;
}

function about() {
  return `<section class="section page-intro"><div class="container">${heading('XIN CHÀO, CHÚNG MÌNH LÀ CARRYX', 'Từ những điều gần gũi,<br/>nghĩ về hành trình dài.', 'Chúng mình tin rằng công nghệ hữu ích bắt đầu từ những nhu cầu rất đời thường.', 'large-heading')}<div class="about-hero image-wrap" data-reveal>${photo('team', 'Gian hàng CarryX với balo Đen và Nâu')}</div><div class="story-grid"><h2 data-reveal>Một chiếc balo,<br/>một khởi đầu chung.</h2><div data-reveal><p>CarryX được phát triển bởi nhóm 5 sinh viên Đại học FPT tại Hà Nội. Từ việc mang laptop đến lớp, đi làm hay gặp gỡ bạn bè, chúng mình nhận ra một nhu cầu chung: giữ đồ dùng gọn gàng, thuận tiện và an tâm hơn.</p><p>Vì vậy, CarryX chọn bắt đầu với khóa vân tay và những tiện ích có ích thật sự trong quá trình sử dụng mỗi ngày.</p></div></div></div></section><section class="section section-white"><div class="container">${heading('ĐIỀU CARRYX HƯỚNG ĐẾN', 'Công nghệ thiết thực.<br/>Giá trị dài lâu.')}<div class="mission-grid">${[['01 / TẦM NHÌN', 'Đi xa hơn một chiếc balo.', 'Trở thành thương hiệu balo thông minh được tin tưởng tại Việt Nam, kết hợp công nghệ và thiết kế để mang đến giải pháp di chuyển an toàn, tiện lợi.', 'Trong dài hạn, CarryX hướng đến hệ sinh thái Smart Mobility Accessories: túi xách, vali và phụ kiện hỗ trợ di chuyển. Mỗi bước mở rộng đều bắt đầu từ nhu cầu thực tế của người dùng.'], ['02 / SỨ MỆNH', 'Để bạn an tâm mang theo.', 'Cung cấp những chiếc balo thông minh, an toàn và tiện lợi, giúp người dùng tăng cường khả năng bảo vệ tài sản trên mỗi hành trình.', 'CarryX đưa nhận diện vân tay vào một thao tác đơn giản, dễ sử dụng. Chúng mình ưu tiên công nghệ phù hợp, dễ tiếp cận và tạo giá trị rõ ràng trong cuộc sống thường ngày.']].map(([ey, title, p1, p2]) => `<article data-reveal><span class="eyebrow">${ey}</span><h3>${title}</h3><p>${p1}</p><p>${p2}</p></article>`).join('')}</div></div></section><section class="section"><div class="container">${heading('NỀN TẢNG CỦA CARRYX', 'Điều chúng mình cùng giữ.')}<div class="values-list">${[['An toàn', 'Đặt sự an tâm của người dùng ở trung tâm.'], ['Đổi mới', 'Ứng dụng công nghệ cho những nhu cầu có thật.'], ['Chất lượng', 'Chú trọng độ bền và tính ổn định.'], ['Chính trực', 'Nói rõ những gì sản phẩm có thể làm.'], ['Hợp tác', 'Lắng nghe và cùng nhau phát triển.']].map(([title, text], i) => `<div data-reveal><span>0${i + 1}</span><h3>${title}</h3><p>${text}</p></div>`).join('')}</div></div></section><section class="section section-white"><div class="container detail-invitation"><div class="image-wrap" data-reveal>${photo('together', 'Cùng CarryX trên hành trình mỗi ngày')}</div><div data-reveal><span class="eyebrow">CÙNG MỘT ĐỊNH HƯỚNG</span><h2>Nhóm nhỏ.<br/>Mục tiêu chung.</h2><p>Phát triển sản phẩm hữu ích, lắng nghe phản hồi thật và cải thiện từng chi tiết.</p><p class="team-names">Vũ Ngọc Diệu · Vũ Việt Cường<br/>Hà Thị Thanh Lan · Nguyễn Thùy Linh<br/>Nguyễn Anh Minh</p><div class="team-contact"><span>Đầu mối trao đổi: Vũ Ngọc Diệu</span><span>CarryX · Hà Nội, Việt Nam</span></div>${button('Kết nối với nhóm', '#/lien-he', 'button-outline')}</div></div></section>${cta()}`;
}

const questions = [['Mình muốn chọn màu và xem balo thực tế.', 'Bạn có thể xem ảnh của hai phiên bản Đen và Nâu ở trang sản phẩm. Nhắn Zalo hoặc gọi CarryX để được tư vấn màu sắc và cách trải nghiệm sản phẩm.'], ['Cổng USB có tự sạc điện thoại không?', 'Cổng USB kết nối với sạc dự phòng đặt bên trong balo. Bạn sử dụng sạc dự phòng của mình; balo không tự tạo ra nguồn điện.'], ['Chất liệu có chống nước hoàn toàn không?', 'Da PU có khả năng kháng nước. Bạn nên lau khô sau khi gặp mưa và không ngâm balo trong nước.'], ['CarryX hỗ trợ bảo hành như thế nào?', 'Khóa vân tay và cổng USB được bảo hành 6 tháng với lỗi kỹ thuật từ nhà sản xuất. Liên hệ nhóm để được hướng dẫn kiểm tra và hỗ trợ.'], ['Các sản phẩm Năm 2–5 đã có thể mua chưa?', 'Những dòng này nằm trong lộ trình phát triển dự kiến. Hiện website tập trung giới thiệu CarryX Smart Backpack với hai phiên bản Đen và Nâu.']];
function contact() {
  return `<section class="section page-intro contact-intro"><div class="container">${heading('CARRYX LUÔN SẴN SÀNG LẮNG NGHE', 'Bạn hỏi.<br/>Chúng mình cùng giải đáp.', 'Chọn balo, tìm hiểu tính năng hay cần hỗ trợ sau mua — bắt đầu bằng một cuộc trò chuyện với nhóm CarryX.', 'large-heading')}</div></section><section class="section section-white"><div class="container contact-grid"><div data-reveal><div class="contact-photo image-wrap">${photo('team', 'Khách tham quan tại gian hàng CarryX')}</div><h2 class="contact-heading">Kết nối trực tiếp với CarryX.</h2><div class="contact-channel"><span class="eyebrow">01 / GỌI ĐIỆN</span><a class="channel-title" href="tel:0378319358">0378 319 358</a><p>Tư vấn sản phẩm và thông tin mua hàng.</p>${button('Gọi cho CarryX', 'tel:0378319358', 'button-outline')}</div><div class="contact-channel"><span class="eyebrow">02 / NHẮN ZALO</span><h3>Hỏi điều bạn đang quan tâm.</h3><p>Gửi ảnh, câu hỏi hoặc nhu cầu sử dụng để nhóm tư vấn cụ thể hơn.</p>${button('Mở Zalo CarryX', 'https://zalo.me/0378319358', '', 'target="_blank" rel="noopener noreferrer"')}</div><p class="location">Hà Nội, Việt Nam<br/>Nhóm dự án CarryX · Đại học FPT</p></div><div class="enquiry-panel" data-reveal><span class="eyebrow">MỘT CUỘC TRÒ CHUYỆN DỄ DÀNG HƠN</span><h2>Chúng mình<br/>có thể giúp gì?</h2><p>Chuẩn bị một lời nhắn để chia sẻ nhu cầu của bạn với CarryX qua Zalo.</p><form id="enquiry-form"><label>Tên của bạn <span>*</span><input name="name" autocomplete="name" placeholder="CarryX nên gọi bạn là gì?" required maxlength="80" /></label><label>Màu sắc bạn thích<select name="color"><option>Đang cân nhắc cả hai màu</option><option>Đen</option><option>Nâu</option></select></label><label>Nhu cầu sử dụng<select name="purpose"><option>Đi học</option><option>Đi làm</option><option>Di chuyển hằng ngày</option><option>Hỗ trợ sử dụng / bảo hành</option><option>Hợp tác cùng CarryX</option></select></label><label>Câu hỏi của bạn <span>*</span><textarea name="question" rows="4" placeholder="Ví dụ: Balo có vừa laptop của mình không?" required maxlength="1500"></textarea></label><button class="button" type="submit">Chuẩn bị lời nhắn ${arrow}</button></form><div id="message-result" class="message-result" hidden><span class="success-label">✓ Lời nhắn đã sẵn sàng</span><p>Sao chép nội dung bên dưới rồi gửi cho CarryX trong Zalo nhé.</p><textarea id="prepared-message" readonly rows="7" aria-label="Lời nhắn đã chuẩn bị"></textarea><div class="message-actions"><button class="button" data-copy-message>Sao chép lời nhắn ${arrow}</button>${button('Mở Zalo', 'https://zalo.me/0378319358', 'button-outline', 'target="_blank" rel="noopener noreferrer"')}</div><button class="text-link" data-edit-message>← Sửa lại lời nhắn</button></div></div></div></section><section class="section"><div class="container">${heading('DỄ BẮT ĐẦU, DỄ TRAO ĐỔI', 'Từ câu hỏi đến lựa chọn phù hợp.')}<div class="steps-grid">${[['Chia sẻ nhu cầu', 'Cho CarryX biết bạn cần mang theo những gì mỗi ngày.'], ['Cùng xem chi tiết', 'Nhóm giải đáp về tính năng, hai màu và cách sử dụng.'], ['Chọn cách đồng hành', 'Trao đổi thông tin mua hàng hoặc nhận hỗ trợ sau mua.']].map(([title, text], i) => `<article data-reveal><span class="list-number">0${i + 1}</span><h3>${title}</h3><p>${text}</p></article>`).join('')}</div></div></section><section class="section section-sand"><div class="container faq-container">${heading('CÓ THỂ BẠN ĐANG BĂN KHOĂN', 'Một vài câu trả lời<br/>trước khi kết nối.')}<div class="faq-list">${questions.map(([q, a], i) => `<article class="faq-item ${i === 0 ? 'open' : ''}" data-reveal><h3><button aria-expanded="${i === 0}" aria-controls="faq-answer-${i}">${q}<span class="faq-plus" aria-hidden="true"></span></button></h3><div class="faq-answer" id="faq-answer-${i}" ${i === 0 ? '' : 'inert'}><div><p>${a}</p></div></div></article>`).join('')}</div></div></section>`;
}

let renderId = 0, revealObserver, viewerModule;
const viewerInstances = new Map();
const viewerLoads = new WeakMap();
const dialog = $('#viewer-dialog');
let lastFocus;
function initViewer(el) {
  if (viewerLoads.has(el)) return viewerLoads.get(el);
  viewerModule ||= import('./viewer.js');
  const load = viewerModule.then(async ({ ProductViewer }) => {
    // Paint the loading state before starting WebGL and building the scene.
    await new Promise(resolve => requestAnimationFrame(() => setTimeout(resolve, 0)));
    if (!el.isConnected || el.dataset.mode !== '3d') return;
    const viewer = new ProductViewer(el, { color: el.dataset.color, compact: el.dataset.compact === 'true' });
    viewerInstances.set(el, viewer);
    viewer.setPaused(dialog.open && main.contains(el));
    return viewer;
  }).catch(error => {
    if (!el.isConnected) return;
    setMode(el, 'photo');
    el.classList.add('viewer-unavailable');
    $('[data-view-mode="3d"]', el).disabled = true;
    $('[data-view-action="auto"]', el).disabled = true;
    $('.viewer-note', el).textContent = 'Chưa tải được 3D. Bạn vẫn có thể xem ảnh thật.';
    console.error('CarryX viewer:', error);
  }).finally(() => viewerLoads.delete(el));
  viewerLoads.set(el, load);
  return load;
}
function observeContent() {
  revealObserver?.disconnect();
  if (reducedMotion.matches) return;
  revealObserver = new IntersectionObserver(entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('revealed'); revealObserver.unobserve(e.target); } }), { threshold: .09 });
  $$('[data-reveal]', main).forEach(el => { el.classList.add('will-reveal'); revealObserver.observe(el); });
}
function disposeViewers(root = document) { for (const [el, v] of viewerInstances) if (root.contains(el)) { v.dispose(); viewerInstances.delete(el); } }
function closeMenu() { $('.menu-toggle').setAttribute('aria-expanded', 'false'); $('#mobile-menu').inert = true; document.body.classList.remove('menu-open'); }
function route() {
  const current = ++renderId; closeMenu(); if (dialog.open) dialog.close(); disposeViewers();
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
  document.title = `${({ home: 'Balo thông minh mang theo cuộc sống hiện đại', products: 'Bộ sưu tập', about: 'Câu chuyện CarryX', contact: 'Kết nối cùng CarryX', detail: 'Smart Backpack — Xem 360°' })[page]} | CarryX`;
  $$('.desktop-nav a').forEach(a => { const active = a.dataset.route === (page === 'detail' ? 'products' : page); a.classList.toggle('active', active); if (active) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current'); });
  window.scrollTo({ top: 0, behavior: 'instant' });
  observeContent();
  requestAnimationFrame(() => { if (current === renderId) document.dispatchEvent(new Event('carryx:ready')); });
}
function setMode(el, mode) {
  if (mode === '3d' && el.classList.contains('viewer-unavailable')) return;
  el.dataset.mode = mode;
  $$('[data-view-mode]', el).forEach(b => { const active = b.dataset.viewMode === mode; b.classList.toggle('active', active); b.setAttribute('aria-pressed', String(active)); });
  $('[data-view-action="left"]', el).setAttribute('aria-label', mode === '3d' ? 'Xoay sản phẩm sang trái' : 'Ảnh trước');
  $('[data-view-action="right"]', el).setAttribute('aria-label', mode === '3d' ? 'Xoay sản phẩm sang phải' : 'Ảnh tiếp theo');
  if (!el.classList.contains('viewer-unavailable')) $('.viewer-note', el).textContent = mode === '3d' ? 'Mô phỏng 3D · Kéo/vuốt để xoay 360°' : 'Ảnh thật · Chọn Xoay 3D để khám phá 360°';
  const viewer = viewerInstances.get(el);
  if (mode === 'photo') viewer?.setAuto(false);
  viewer?.syncActivity();
  if (mode === '3d') return viewer ?? initViewer(el);
}
function setPhoto(el, index) {
  const sources = realPhotos[el.dataset.color]; const i = ((index % sources.length) + sources.length) % sources.length;
  el.dataset.photo = i; const img = $('.viewer-photo', el); img.src = `/images/${sources[i]}.webp`; img.alt = `CarryX màu ${colorName(el.dataset.color)} — ảnh thật ${i + 1}`;
  if (main.contains(el)) $$('.photo-thumbnails button').forEach(b => { const selected = Number(b.dataset.photoIndex) === i; b.classList.toggle('selected', selected); b.setAttribute('aria-pressed', String(selected)); });
}
function toast(message) { const t = $('#toast'); t.textContent = message; t.classList.add('visible'); clearTimeout(toast.timer); toast.timer = setTimeout(() => t.classList.remove('visible'), 2600); }

document.addEventListener('click', async e => {
  if (e.target.closest('.skip-link')) { e.preventDefault(); main.focus(); main.scrollIntoView({ behavior: 'instant' }); return; }
  const menu = e.target.closest('.menu-toggle'); if (menu) { const open = menu.getAttribute('aria-expanded') !== 'true'; menu.setAttribute('aria-expanded', String(open)); $('#mobile-menu').inert = !open; document.body.classList.toggle('menu-open', open); }
  if (e.target.closest('#mobile-menu a')) closeMenu();
  const scroll = e.target.closest('[data-scroll]'); if (scroll) document.getElementById(scroll.dataset.scroll)?.scrollIntoView({ behavior: reducedMotion.matches ? 'instant' : 'smooth', block: 'start' });
  const modeButton = e.target.closest('[data-view-mode]'); if (modeButton) setMode(modeButton.closest('[data-viewer]'), modeButton.dataset.viewMode);
  const action = e.target.closest('[data-view-action]');
  if (action) {
    const el = action.closest('[data-viewer]'), v = viewerInstances.get(el), a = action.dataset.viewAction;
    if (a === 'fullscreen') {
      lastFocus = action;
      $('.dialog-content').innerHTML = viewer(el.dataset.color);
      const expanded = $('[data-viewer]', dialog);
      setPhoto(expanded, Number(el.dataset.photo));
      dialog.showModal();
      for (const instance of viewerInstances.values()) instance.setPaused(true);
      if (el.dataset.mode === '3d') setMode(expanded, '3d');
    }
    else if (a === 'left' || a === 'right') { const d = a === 'left' ? -1 : 1; if (el.dataset.mode === 'photo') setPhoto(el, Number(el.dataset.photo) + d); else { const instance = v ?? await initViewer(el); if (el.isConnected && el.dataset.mode === '3d') instance?.rotate(d); } }
    else if (a === 'auto') { const instance = await setMode(el, '3d'); if (el.isConnected && el.dataset.mode === '3d') instance?.setAuto(!instance.auto); }
    else if (a === 'reset') { v?.reset(); setPhoto(el, 0); }
  }
  if (e.target.closest('.dialog-close')) dialog.close();
  const thumb = e.target.closest('[data-photo-index]'); if (thumb) { const el = $('[data-viewer]', main); setMode(el, 'photo'); setPhoto(el, Number(thumb.dataset.photoIndex)); }
  const colorButton = e.target.closest('[data-select-color]');
  if (colorButton) {
    const color = colorButton.dataset.selectColor, el = $('[data-viewer]', main); el.dataset.color = color; viewerInstances.get(el)?.setColor(color); setPhoto(el, 0);
    $$('.color-choice').forEach(b => { const selected = b === colorButton; b.classList.toggle('selected', selected); b.setAttribute('aria-pressed', String(selected)); }); $('.current-color').textContent = colorName(color);
    $$('.photo-thumbnails img').forEach((img, i) => img.src = `/images/thumbs/${realPhotos[color][i]}.webp`);
    $('.detail-price-amount').textContent = formatBackpackPrice(color);
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
dialog.addEventListener('click', e => { if (e.target === dialog) { const r = dialog.getBoundingClientRect(); if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) dialog.close(); } });
dialog.addEventListener('close', () => { disposeViewers(dialog); $('.dialog-content').innerHTML = ''; for (const viewer of viewerInstances.values()) viewer.setPaused(false); if (lastFocus?.isConnected) lastFocus.focus(); });
window.addEventListener('hashchange', route);
window.addEventListener('scroll', () => $('#site-header').classList.toggle('scrolled', scrollY > 18), { passive: true });
$('#year').textContent = new Date().getFullYear();
route();
