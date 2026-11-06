# CarryX website

Website giới thiệu CarryX, triển khai từ bản thiết kế nền sáng và ảnh khách cung cấp.

## Chạy và build

```sh
npm ci
npm run dev
npm run build
npm run preview
```

Bản production là thư mục `dist/`, có thể phục vụ bằng static hosting. Các trang sử dụng hash routing nên không cần cấu hình rewrite phía server.

## Chức năng

- Trang chủ, sản phẩm, chi tiết Smart Backpack, giới thiệu và liên hệ.
- Viewer Three.js xoay đủ 360° bằng kéo/vuốt, nút đổi góc, tự xoay, reset và phóng lớn.
- Đổi màu Đen/Nâu trong trang chi tiết; chọn ảnh chụp thật bằng thumbnail.
- Lộ trình Năm 2–5 trình bày bằng tab, giữ rõ nhãn dự kiến.
- Form tạo lời nhắn ngay trên trình duyệt; người dùng sao chép và tự gửi qua Zalo. Không có máy chủ thu thập nội dung form.
- Animation khi cuộn, chuyển trang, hover, menu và FAQ; hỗ trợ `prefers-reduced-motion`.

## Lưu ý về 360°

Mô hình trong `src/viewer.js` được dựng bằng hình học 3D theo ảnh tham khảo, không phải bản quét chính xác của sản phẩm. Giao diện luôn ghi rõ “Mô phỏng 3D” và cung cấp ảnh chụp thật để đối chiếu. Khi có file GLB/GLTF chuẩn của CarryX, có thể thay hàm `createBag()` bằng mô hình đó và giữ các điều khiển hiện tại.

## Nội dung và ảnh

Ảnh trong `public/images/` là ảnh khách đã chia sẻ, được tối ưu sang WebP. Logo lấy từ bộ nhận diện sẵn có. Giá dự kiến, số liên hệ và thông tin bảo hành được giữ theo bản thiết kế/report; cần xác nhận lại trước khi công bố bán hàng chính thức.

Website không có giỏ hàng hoặc thanh toán. Điện thoại và Zalo dùng số `0378319358`.

## Kiểm tra đã thực hiện

Kiểm tra trực tiếp trên trình duyệt ở desktop và viewport 390px: xoay 3D, đổi màu, chuyển ảnh thật, mở/đóng viewer phóng lớn, menu mobile, tab lộ trình, FAQ, tạo lời nhắn, ảnh lỗi và tràn ngang. Kiểm tra cú pháp JavaScript, build production và audit dependencies.
