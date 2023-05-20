/* variable
-------------------------------------------------- */
const VALIDATOR = new Validation();
const LSTNHANVIEN = new ListNhanVien();
const ERROR_MESSAGE = {
    maNhanVien_empty: 'Mã nhân viên không được để trống',
    maNhanVien_length: 'Chiều dài mã nhân viên phải nằm trong khoảng 4 đến 6 kí tự',
    maNhanVien_numberic: 'Mã nhân viên chỉ chứa số và không có khoảng trắng',
    hoTen_empty: 'Họ tên nhân viên không được bỏ trống',
    hoTen_alpha_space: 'Họ tên chỉ chấp nhận khoảng trắng và kí tự chữ',
    email: 'Email không hợp lệ',
    matKhau_empty: 'Mật khẩu không được bỏ trống',
    matKhau_length: 'Mật khẩu phải từ 6 đến 10 kí tự',
    matKhau_strong: 'Mật khẩu phải chứa ít nhất một kí tự hoa, một kí tự số, một kí tự đặc biệt',
    ngayLamViec: 'Ngày không hợp lệ',
    luongCoBan_numberic: 'Lương cơ bản phải là số và không có khoảng trắng',
    luongCoBan_rangedValue: 'Lương cơ bản phải từ 1000000 đến 20000000',
    luongCoBan_empty: 'Lương cơ bản không được bỏ trống',
    chucVu: 'Chức vụ không hợp lệ',
    gioLam_empty: 'Số giờ làm trong tháng không được bỏ trống',
    gioLam_numberic: 'Số giờ làm phải là số',
    gioLam_range: 'Số giờ làm trong tháng phải nằm trong khoản 80 đến 200 giờ'
}
const COMMON_MESSAGE = {
    success: 'Thành công'
}
/* function
-------------------------------------------------- */
/**
 * in ra danh sách nhân viên, phần tử html nếu có data sẽ bị xoá và thay thế bằng dữ liệu mới
 * @lstNhanVien {array NhanVien}: mảng nhân viên cần dc hiển thị
 * @htmlElement {object html}: đối tượng table html
 */
function printListNhanVien(lstNhanVien, htmlElement = '#tableDanhSach') {
    var htmlEle = querySelector(htmlElement)
    htmlEle.innerHTML = ''
    var htmlText = ''
    lstNhanVien.forEach(nv => {
        htmlText += '<tr><td>' + nv.account + '</td><td>' + nv.hoTen + '</td><td>' + nv.email + '</td><td>' + nv.ngayLam + '</td><td> ' + nv.chucVu + ' </td><td>' + nv.tongLuong.toLocaleString() + '</td><td>' + nv.loaiNhanVien + '</td><td><Button class="btn btn-danger" onclick="deleteNhanVien(' + nv.account + ')">Xoá</Button></td></tr>'
    });
    htmlEle.innerHTML = htmlText
}
/**
 * selector phần tử html
 * @selec {string}: css selector đến phần tử cần lấy
 * @return {phần tử html} phần tử html được tìm thấy
 */
function querySelector(selec) {
    return document.querySelector(selec);
}
/**
 * showErrorMessage hiển thị thông báo lỗi
 * @mess {string} nội dung thông báo lỗi
 * @htmlElemtn {string }: phần tử html cần hiển thị thông báo
 */
function showErrorMessage(mess, htmlElemen) {
    var temp = querySelector(htmlElemen)
    temp.innerHTML = mess
    temp.classList.add("d-block");
}
/**
 * hidenHtmlElement: ẩn phần tử html
 * @htmlElemen {string}: phần tử html cần ẩn đi
 */
function hidenHtmlElement(htmlElemen) {
    var temp = querySelector(htmlElemen)
    temp.classList.remove('d-block')
    temp.classList.add('d-none')
}
/**
 * hiddem error message: ẩn phần thông báo lỗi của popup thêm, update nhân viên
 */
function hideErrorMessageFromAddOrUpdateNhanVienPopup() {
    // var biến
    const idTbTKNV = '#tbTKNV'
    const idTbTen = '#tbTen'
    const idTbEmail = '#tbEmail'
    const idTbMatKhau = '#tbMatKhau'
    const idTbNgay = '#tbNgay'
    const idLuongCoBan = '#tbLuongCB'
    const idTbChucVu = '#tbChucVu'
    const idTbSoGioLam = '#tbGiolam'
    // process
    hidenHtmlElement(idTbTKNV)
    hidenHtmlElement(idTbTen)
    hidenHtmlElement(idTbEmail)
    hidenHtmlElement(idTbMatKhau)
    hidenHtmlElement(idTbNgay)
    hidenHtmlElement(idLuongCoBan)
    hidenHtmlElement(idTbChucVu)
    hidenHtmlElement(idTbSoGioLam)
}
/**
 * validation nhân viên: kiểm tra thông tin nếu có một trường dữ liệu không hợp lệ thì sẽ xuất thông báo vả trả về false
 * @maNhanVien {string}: chuỗi cần kiểm tra có phải là mã nhân viên hay không
 * @hoTen {string}: chuỗi cần kiểm tra có phải là họ tên của nhân viên hay không
 * @email {string}: kiểm tra email có hợp lệ hay không
 * @matKhau {string}: kiểm tra mật khẩu có hợp lệ hay không
 * @ngayLam {string}: kiểm tra ngày làm có hợp lệ hay không
 * @luongCoBan {string}: kiểm tra lương cơ bản có hợp lệ hay không
 * @chucVu {string}: kiểm tra chức vụ có hợp lệ hay không
 * @gioLamTrongThang {string}: kiểm tra giờ làm có hợp lệ hay không
 * @return {boolean} nếu có một trường bị sai thì trả về false ngược lại trả về true
 */
function validNhanVien(maNhanVien, hoTen, email, matKhau, ngayLamViec, luongCoBan, chucVu, soGioLam) {
    // var biến
    const idTbTKNV = '#tbTKNV'
    const idTbTen = '#tbTen'
    const idTbEmail = '#tbEmail'
    const idTbMatKhau = '#tbMatKhau'
    const idTbNgay = '#tbNgay'
    const idLuongCoBan = '#tbLuongCB'
    const idTbChucVu = '#tbChucVu'
    const idTbSoGioLam = '#tbGiolam'
    // hiden all thông báo lỗi
    hideErrorMessageFromAddOrUpdateNhanVienPopup()
    // mã nhân viên
    if (!maNhanVien) {
        showErrorMessage(ERROR_MESSAGE.maNhanVien_empty, idTbTKNV)
        return false
    }
    var accValid2 = VALIDATOR.rangeLength(maNhanVien, 4, 6)
    if (!accValid2) {
        showErrorMessage(ERROR_MESSAGE.maNhanVien_length, idTbTKNV)
        return false
    }
    var accValid3 = VALIDATOR.isNumeric(maNhanVien)
    if (!accValid3) {
        showErrorMessage(ERROR_MESSAGE.maNhanVien_numberic, idTbTKNV)
        return
    }
    // tên nhân viên
    var isNameEmpty = VALIDATOR.isEmptyString(hoTen)
    if (!isNameEmpty[1]) {
        showErrorMessage(ERROR_MESSAGE.hoTen_empty, idTbTen)
        return false
    }
    var isAlpha = VALIDATOR.isAllAlphabetsOrWhiteSpace(isNameEmpty[0])
    if (!isAlpha) {
        showErrorMessage(ERROR_MESSAGE.hoTen_alpha_space, idTbTen)
        return false
    }
    // email
    var isEmail = VALIDATOR.isEmail(email)
    if (!isEmail) {
        showErrorMessage(ERROR_MESSAGE.email, idTbEmail)
        return false
    }
    // mật khẩu
    if (!matKhau) {
        showErrorMessage(ERROR_MESSAGE.matKhau_empty, idTbMatKhau)
        return
    }
    var isPassValid1 = VALIDATOR.rangeLength(matKhau, 6, 10)
    if (!isPassValid1) {
        showErrorMessage(ERROR_MESSAGE.matKhau_length, idTbMatKhau)
        return false
    }
    var isPassValid2 = VALIDATOR.isStrongPassword(matKhau)
    if (!isPassValid2) {
        showErrorMessage(ERROR_MESSAGE.matKhau_strong, idTbMatKhau)
        return false
    }
    // ngày làm việc
    var isDateValid = VALIDATOR.isStringDateInvalid(ngayLamViec)
    if (!isDateValid) {
        showErrorMessage(ERROR_MESSAGE.ngayLamViec, idTbNgay)
        return false
    }
    // lương cơ bản
    if (!luongCoBan) {
        showErrorMessage(ERROR_MESSAGE.luongCoBan_empty, idLuongCoBan)
        return false
    }
    var isLuongCoBan1 = VALIDATOR.isNumeric(luongCoBan)
    if (!isLuongCoBan1) {
        showErrorMessage(ERROR_MESSAGE.luongCoBan_numberic, idLuongCoBan)
    }
    var luongCoBanNumber = Number(luongCoBan)
    var isLuongCoBan2 = VALIDATOR.rangeNumber(luongCoBanNumber, 1000000, 20000000)
    if (!isLuongCoBan2) {
        showErrorMessage(ERROR_MESSAGE.luongCoBan_rangedValue, idLuongCoBan)
        return false
    }
    // chức vụ
    if (chucVu != CHUC_VU.GD && chucVu != CHUC_VU.TP && chucVu != CHUC_VU.NV) {
        showErrorMessage(ERROR_MESSAGE.chucVu, idTbChucVu)
        return false
    }
    //số giờ làm
    if (!soGioLam) {
        showErrorMessage(ERROR_MESSAGE.gioLam_empty, idTbSoGioLam)
        return false
    }
    var gioLamValid = VALIDATOR.isNumeric(soGioLam)
    if (!gioLamValid) {
        showErrorMessage(ERROR_MESSAGE.gioLam_numberic)
        return false
    }
    var gioLamValid2 = VALIDATOR.rangeNumber(Number(soGioLam), 80, 200)
    if (!gioLamValid2) {
        showErrorMessage(ERROR_MESSAGE.gioLam_range, idTbSoGioLam)
        return false
    }
    // thông tin hợp lệ
    return true
}
/**
 * xoá nhân viên khỏi mảng: hàm thực hiện xoá nhân viên theo mã nhân viên, nếu trong mảng có nhiều nhân viên trùng max (account) thì hàm sẽ xoá hết các nhân viên đó
 * @account {string}: mã nhân viên cần xoá
 */
function deleteNhanVien(account) {
    LSTNHANVIEN.remove(account)
    printListNhanVien(LSTNHANVIEN.lstNhanVien)
}
/* event
-------------------------------------------------- */
/**
 * sự kiện click nút thêm người dùng
 */
querySelector('#btnThemNV').onclick = function () {
    // validation
    var maNhanVien = querySelector('#tknv').value
    var hoTen = querySelector('#name').value
    var email = querySelector('#email').value
    var matKhau = querySelector('#password').value
    var ngayLam = querySelector('#datepicker').value
    var luongCoBan = querySelector('#luongCB').value
    var chucVu = querySelector('#chucvu').value
    var gioLam = querySelector('#gioLam').value
    var isNhanVienValid = validNhanVien(maNhanVien, hoTen, email, matKhau, ngayLam, luongCoBan, chucVu, gioLam)
    if (!isNhanVienValid) {
        return
    }
    // thêm phần tử 
    var nhanVien = new NhanVien(maNhanVien, hoTen, email, matKhau, ngayLam, luongCoBan, chucVu, gioLam, 0, EMPLOYEERANKED.TB)
    nhanVien.caclTotalSalary()
    nhanVien.ratingEmployee()
    LSTNHANVIEN.add(nhanVien)
    // hiện kết quả
    printListNhanVien(LSTNHANVIEN.lstNhanVien)
    // xuất thông báo ra màn hình
    alert(COMMON_MESSAGE.success)
    hideErrorMessageFromAddOrUpdateNhanVienPopup()
}
/**
 * sự kiện update thông tin nhân viên, update all nhân viên có cùng mã nhân viên (account) trong mảng
 */
querySelector('#btnCapNhat').onclick = function () {
    // validation
    var maNhanVien = querySelector('#tknv').value
    var hoTen = querySelector('#name').value
    var email = querySelector('#email').value
    var matKhau = querySelector('#password').value
    var ngayLam = querySelector('#datepicker').value
    var luongCoBan = querySelector('#luongCB').value
    var chucVu = querySelector('#chucvu').value
    var gioLam = querySelector('#gioLam').value
    var isNhanVienValid = validNhanVien(maNhanVien, hoTen, email, matKhau, ngayLam, luongCoBan, chucVu, gioLam)
    if (!isNhanVienValid) {
        return
    }
    //update thông tin
    var nhanVien = new NhanVien(maNhanVien, hoTen, email, matKhau, ngayLam, luongCoBan, chucVu, gioLam, 0, EMPLOYEERANKED.TB)
    var cou = LSTNHANVIEN.update(nhanVien)
    alert(COMMON_MESSAGE.success + '(' + cou + ')')
    printListNhanVien(LSTNHANVIEN.lstNhanVien)
    // ẩn thông báo lỗi nếu có
    hideErrorMessageFromAddOrUpdateNhanVienPopup()
}
/**
 * sự kiện cho nút tìm kiếm
 */
querySelector('#btnTimNV').onclick = function () {
    // lấy dữ liệu tìm kiếm
    var con = querySelector('#searchName').value
    // tìm kiếm 
    var result = LSTNHANVIEN.filter(con)
    // show kết quả
    printListNhanVien(result)
}