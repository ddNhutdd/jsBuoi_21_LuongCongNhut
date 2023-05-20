const CHUC_VU = {
    GD: 'Giám Đốc',
    TP: 'Trưởng Phòng',
    NV: 'Nhân Viên'
}
const EMPLOYEERANKED = {
    XS: 'Xuất Sắc',
    G: 'Giỏi',
    K: 'Khá',
    TB: 'Trung Bình'
}
function NhanVien(account, hoTen, email, matKhau, ngayLam, luongCoBan, chucVu, gioLamTrongThang, tongLuong, loaiNhanVien) {
    // properties
    this.account = account;
    this.hoTen = hoTen;
    this.email = email;
    this.matKhau = matKhau;
    this.ngayLam = ngayLam;
    this.luongCoBan = luongCoBan;
    this.chucVu = chucVu;
    this.gioLamTrongThang = gioLamTrongThang;
    this.tongLuong = tongLuong;
    this.loaiNhanVien = loaiNhanVien;
    // methods
    /**
     * caclTotalSalary: phương thức dựa vào thông tin nội bộ của nhân viên để cập nhật thuộc tính lương của nhân viên
     */
    this.caclTotalSalary = function () {
        if (this.chucVu === CHUC_VU.GD) {
            this.tongLuong = this.luongCoBan * 3;
            return;
        }
        if (this.chucVu === CHUC_VU.TP) {
            this.tongLuong = this.luongCoBan * 2;
            return;
        }
        if (this.chucVu === CHUC_VU.NV) {
            this.tongLuong = this.luongCoBan;
            return;
        }
    }
    /**
     * employee rating: xếp loại nhân viên dựa vào tổng số giờ làm trong tháng
     */
    this.ratingEmployee = function () {
        if (this.gioLamTrongThang >= 192) {
            this.loaiNhanVien = EMPLOYEERANKED.XS
            return
        }
        if (this.gioLamTrongThang >= 176) {
            this.loaiNhanVien = EMPLOYEERANKED.G
            return
        }
        if (this.gioLamTrongThang >= 160) {
            this.loaiNhanVien = EMPLOYEERANKED.K
            return
        }
        this.loaiNhanVien = EMPLOYEERANKED.TB
    }
}