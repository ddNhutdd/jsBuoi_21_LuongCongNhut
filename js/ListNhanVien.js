function ListNhanVien() {
    // properties
    this.lstNhanVien = [];
    // methods
    /**
     * Thêm một nhân viên mới vào danh sách nhân viên
     * @nv {NhanVien}: nhân viên mới được thêm vào danh sách nhân viên
     * @return: không có dữ liệu trả về
     */
    this.add = function (nv) {
        this.lstNhanVien.push(nv)
    }
    /**
     * xoá nhân viên
     * @account {string}: mã nhân viên của nhân viên cần xoá ra khỏi list nhân viên
     * @return  {Number}: số lượng phần tử đã xoá
     */
    this.remove = function (account) {
        var deleted = 0;
        for (var i = 0; i < this.lstNhanVien.length; i++) {
            const element = this.lstNhanVien[i];
            if (element.account == account) {
                this.lstNhanVien.splice(i, 1)
                deleted++
            }
        }
        return deleted;
    }
    /**
     * cập nhật thông tin nhân viên theo mã nhân viên (account), nếu có nhiều nhân viên trong mảng có cùng mã nhân viên thì hàm sẽ cập nhật all
     * @nv {NhanVien} : nv chứa thông tin nhân viên cần thay đổi, hàm sẽ tìm nhân viên có sẵn trong mảng theo account sau đó cập nhật những thông tin khác
     * @return không có dữ liệu trả về
     */
    this.update = function (nv) {
        var count = 0
        this.lstNhanVien.forEach(ele => {
            if (ele.account == nv.account) {
                ele.hoTen = nv.hoTen
                ele.email = nv.email
                ele.matKhau = nv.matKhau
                ele.ngayLam = nv.ngayLam
                ele.luongCoBan = nv.luongCoBan
                ele.chucVu = nv.chucVu
                ele.gioLamTrongThang = nv.gioLamTrongThang
                ele.caclTotalSalary()
                ele.ratingEmployee()
                count++
            }
        });
        return count
    }
    /**
     * lọc nhân viên theo loại nhân viên
     * @condition {string}: điều kiện để tìm nhân viên
     * @return {array NhanVien}: mảng nhân viên đáp ứng được điều kiện 
     */
    this.filter = function (cond) {
        if (cond == 'All') {
            return this.lstNhanVien
        }
        if (cond == EMPLOYEERANKED.XS) {
            var result = this.lstNhanVien.filter(n => n.loaiNhanVien == EMPLOYEERANKED.XS)
            return result
        }
        if (cond == EMPLOYEERANKED.G) {
            var result = this.lstNhanVien.filter(n => n.loaiNhanVien == EMPLOYEERANKED.G)
            return result
        }
        if (cond == EMPLOYEERANKED.K) {
            var result = this.lstNhanVien.filter(n => n.loaiNhanVien == EMPLOYEERANKED.K)
            return result
        }
        if (cond == EMPLOYEERANKED.TB) {
            var result = this.lstNhanVien.filter(n => n.loaiNhanVien == EMPLOYEERANKED.TB)
            return result
        }
    }
}