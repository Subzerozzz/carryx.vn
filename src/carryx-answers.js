import { formatBackpackPrice, roadmap } from './catalog.js';

const normalize = (value) => value.toLowerCase().normalize('NFD')
  .replace(/\p{Diacritic}/gu, '').replaceAll('đ', 'd')
  .replace(/[^a-z0-9]+/g, ' ').trim();

const aliases = {
  'Smart Tracker': /\b(tracker|thiet bi tim do|the dinh vi)\b/,
  'Tech Organizer': /\b(tui phu kien|tui dung cap)\b/,
  'Smart Carry-on': /\b(vali|va li)\b/,
  'RFID Wallet': /\b(rfid|vi bao ve the)\b/,
  'Power Bank': /\b(sac du phong)\b/,
};

const plannedProducts = roadmap.flatMap(({ year, items }) => items.map(([name, description]) => ({
  year, name, description, alias: aliases[name],
})));

const topics = [
  [/\b(gia|bao nhieu tien|bao tien|chi phi)\b/, `Giá dự kiến của CarryX Smart Backpack là ${formatBackpackPrice('black')} ₫ cho màu Đen và ${formatBackpackPrice('brown')} ₫ cho màu Nâu. Bạn có thể nhắn Zalo để hỏi tình trạng đặt hàng.`],
  [/\b(mau|den hay nau|den va nau)\b/, 'Smart Backpack có hai màu Đen và Nâu. Trang Sản phẩm có ảnh chụp thật cho cả hai màu.'],
  [/\b(bao hanh|doi tra)\b/, 'CarryX dự kiến bảo hành 6 tháng cho khóa vân tay trên cả hai màu và cổng USB trên balo Đen với lỗi kỹ thuật từ nhà sản xuất. Bạn có thể quét mã QR trên thẻ để kích hoạt bảo hành điện tử. Với đổi trả, bạn nhắn Zalo để nhóm tư vấn theo đơn nhé.'],
  [/\b(laptop|may tinh|inch|chong soc)\b/, 'Ngăn laptop của Smart Backpack có đệm chống sốc, phù hợp với laptop tối đa 15,6 inch.'],
  [/\b(khang nuoc|chong nuoc|di mua|troi mua|gap mua|da pu|chat lieu|polyester|ve sinh|giat)\b/, 'Vỏ balo làm từ da PU kháng nước, lót polyester. Khi gặp mưa, bạn lau khô bằng khăn mềm. Tránh ngâm balo trong nước.'],
  [/\b(day deo|quai deo|tro luc)\b/, 'Cả balo Đen và Nâu đều có dây đeo trợ lực có đệm để mang thoải mái hơn.'],
  [/\b(van tay|khoa|mo khoa|bao mat)\b/, 'Ngăn chính dùng khóa vân tay đã đăng ký. Trong hộp có hướng dẫn đăng ký và sạc khóa. Bạn có thể nhắn Zalo để nhóm hướng dẫn thiết lập hoặc xử lý lỗi nhận vân tay.'],
  [/\b(usb|sac dien thoai|cong sac)\b|\bbalo\b.*\bsac du phong\b/, 'Cổng USB chỉ có trên balo Đen. Cổng này kết nối với sạc dự phòng bạn đặt bên trong, để sạc điện thoại từ bên ngoài.'],
  [/\b(mua o dau|muon mua|mua the nao|mua hang|dat hang|con hang|giao hang|van chuyen|ship|thanh toan|lien he|hotline|zalo|ra mat)\b/, 'Bạn có thể nhắn Zalo hoặc gọi CarryX qua số 0378 319 358 để hỏi tình trạng hàng, cách đặt và giao nhận.'],
  [/\b(fpt|nhom sang lap|thuong hieu|carryx la gi)\b/, 'CarryX là dự án của nhóm sinh viên Đại học FPT, phát triển balo và phụ kiện giúp sắp xếp, bảo vệ đồ dùng hằng ngày.'],
];

const overview = 'CarryX Smart Backpack có hai màu Đen và Nâu, khóa vân tay ở ngăn chính, ngăn laptop tối đa 15,6 inch và dây đeo trợ lực. Cổng USB dùng cùng sạc dự phòng có trên balo Đen. Bạn muốn tìm hiểu giá, cách dùng hay bảo hành?';
const yearWords = { mot: 1, hai: 2, ba: 3, bon: 4, tu: 4, nam: 5 };

export function createCarryResponder() {
  let lastProduct;

  return (message) => {
    const query = normalize(message);
    const yearMatch = query.match(/\b(?:nam|year) ([1-5]|mot|hai|ba|bon|tu|nam)\b/);
    const year = yearMatch && (yearWords[yearMatch[1]] ?? Number(yearMatch[1]));
    const exactProduct = plannedProducts.find(({ name }) => ` ${query} `.includes(` ${normalize(name)} `));
    const mainProduct = /\b(smart backpack|balo (den|nau|chu luc)|balo carryx)\b/.test(query);
    const accessory = plannedProducts.find(({ alias }) => alias?.test(query));
    const asksAboutCharging = /\b(usb|cong sac)\b|\bbalo\b.*\bsac du phong\b/.test(query);
    const product = exactProduct ?? (!mainProduct && !asksAboutCharging ? accessory : undefined);
    const availability = /\b(gia|bao tien|bao nhieu tien|mua o dau|mua duoc|co the mua|muon mua|da ban|co ban|dang ban|ban chua|mo ban|dat hang|co hang|con hang|ra mat|bao hanh|khi nao)\b/.test(query);

    if (product || (!year && !mainProduct && availability && lastProduct && !/\bbalo\b/.test(query))) {
      lastProduct = product ?? lastProduct;
      const { name, description, year: productYear } = lastProduct;
      return availability
        ? `CarryX ${name} nằm trong danh mục dự kiến Năm ${productYear}. Mầm chưa có thông tin xác nhận về giá, thời điểm mở bán hoặc bảo hành của mẫu này.`
        : `CarryX ${name} dự kiến thuộc Năm ${productYear}. ${description}`;
    }

    lastProduct = undefined;
    const stage = roadmap.find((entry) => entry.year === year);
    if (stage) return `Năm ${stage.year} · ${stage.title}\n${stage.items.map(([name]) => `• CarryX ${name}`).join('\n')}\nCác mẫu trên nằm trong lộ trình dự kiến.`;
    if (/\b(lo trinh|cac nam|san pham tuong lai|sap toi)\b/.test(query)) {
      return `Lộ trình dự kiến của CarryX\n${roadmap.map(({ year: stageYear, title }) => `• Năm ${stageYear}: ${title}`).join('\n')}\nBạn muốn xem danh sách sản phẩm năm nào?`;
    }

    const answers = topics.filter(([pattern]) => pattern.test(query)).map(([, answer]) => answer);
    if (answers.length) return answers.slice(0, 2).join('\n\n');
    if (year === 1 || mainProduct || /\b(balo|san pham chinh)\b/.test(query)) return overview;
    if (/^(chao|xin chao|hello|hi|alo)\b/.test(query)) return 'Chào bạn! Mầm có thể giúp bạn xem giá, màu, tính năng, bảo hành hoặc lộ trình sản phẩm CarryX.';
    if (/\b(cam on|thanks)\b/.test(query)) return 'Mầm rất vui được giúp bạn!';
    return 'Mầm chưa có thông tin này. Bạn có thể hỏi về balo, bảo hành hoặc sản phẩm từng năm, hoặc nhắn Zalo để nhóm CarryX hỗ trợ trực tiếp.';
  };
}
