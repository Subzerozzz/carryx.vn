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
- Xem ảnh chụp thật, đổi màu Đen/Nâu và chọn chi tiết qua ảnh thu nhỏ.
- Lộ trình Năm 2–5 trình bày bằng tab, giữ rõ nhãn dự kiến.
- Form tạo lời nhắn ngay trên trình duyệt; người dùng sao chép và tự gửi qua Zalo. Không có máy chủ thu thập nội dung form.
- Animation khi cuộn, chuyển trang, hover, menu và FAQ; hỗ trợ `prefers-reduced-motion`.

## Nội dung và ảnh

Ảnh trong `public/images/` là ảnh khách đã chia sẻ, được tối ưu sang WebP. Logo lấy từ bộ nhận diện sẵn có. Giá dự kiến, số liên hệ và thông tin bảo hành được giữ theo bản thiết kế/report; cần xác nhận lại trước khi công bố bán hàng chính thức.

Website không có giỏ hàng hoặc thanh toán. Điện thoại và Zalo dùng số `0378319358`.

## Kiểm tra đã thực hiện

Kiểm tra trực tiếp trên trình duyệt ở desktop và viewport 390px: đổi màu, chọn ảnh sản phẩm, menu mobile, tab lộ trình, FAQ, tạo lời nhắn, ảnh lỗi và tràn ngang. Kiểm tra cú pháp JavaScript, build production và audit dependencies.
