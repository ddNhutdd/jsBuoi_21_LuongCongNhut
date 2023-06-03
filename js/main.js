/* variable
-------------------------------------------------- */
const VALIDATOR = new Validation();
const LSTNHANVIEN = new ListNhanVien();
const ERROR_MESSAGE = {
    maNhanVien_empty: 'Mã nhân viên không được để trống',
    maNhanVien_length: 'Chiều dài mã nhân viên phải nằm trong khoảng 4 đến 6 kí tự',
    maNhanVien_numberic: 'Mã nhân viên chỉ chứa số và không có khoảng trắng',
    maNhanVien_dupplicate: 'Mã nhân viên đã tồn tại trong hệ thống',
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
    success: 'Thành công',
    valid: 'Hợp lệ'
}
const DAILOG = {
    title_add: "Add",
    title_update: "Update"
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
        htmlText += '<tr><td>' + nv.account + '</td><td>' + nv.hoTen + '</td><td>' + nv.email + '</td><td>' + nv.ngayLam + '</td><td> ' + nv.chucVu + ' </td><td>' + nv.tongLuong.toLocaleString() + '</td><td>' + nv.loaiNhanVien + '</td><td><Button class="btn btn-danger" onclick="deleteNhanVien(' + nv.account + ')">Xoá</Button> <Button class="btn btn-success" onclick="showDetailNhanVien(' + nv.account + ')">Chi tiết</Button></td></tr>'
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
 * validation mã nhân viên: kiểm tra tính hợp lệ của mã nhân viên. phải từ 4-6 kí số và không bỏ trống
 * @maNhanVien {string}: mã nhân viên
 * @isCheckDuplicate {boolean}: true thì kiểm tra xem mã nhân viên có tồn tại hay chưa, false thì sẽ không kiểm tra
 * @return {array} : mảng chứa hai giá trị nếu, giá trị đầu mang giá trị true nếu maNhanVien là hợp lệ, mang giá trị false nếu maNhanVien không hợp lệ. giá trị thứ hai trong mảng kết quả là thông báo 
 */
function validNhanVien_maNhanVien(maNhanVien, isAdd = false) {
    if (!maNhanVien) {
        return [false, ERROR_MESSAGE.maNhanVien_empty]
    }
    var accValid2 = VALIDATOR.rangeLength(maNhanVien, 4, 6)
    if (!accValid2) {
        return [false, ERROR_MESSAGE.maNhanVien_length]
    }
    var accValid3 = VALIDATOR.isNumeric(maNhanVien)
    if (!accValid3) {
        return [false, ERROR_MESSAGE.maNhanVien_numberic]
    }
    if (isAdd) {
        var accValid4 = LSTNHANVIEN.search(maNhanVien)
        if (accValid4 != undefined) {
            return [false, ERROR_MESSAGE.maNhanVien_dupplicate]
        }
    }
    return [true, COMMON_MESSAGE.valid]
}
/**
 * validation tên nhân viên: kiểm tra tính hợp lệ của tên nhân viên. phải là chữ và không để trống
 * @hoTen {string}: họ tên nhân viên
 * @return {array} : mảng chứa hai giá trị nếu, giá trị đầu mang giá trị true nếu họ tên nhân viên là hợp lệ, mang giá trị false nếu họ tên nhân viên không hợp lệ. giá trị thứ hai trong mảng kết quả là thông báo
 */
function validNhanVien_hoTenNhanVien(hoTen) {
    var isNameEmpty = VALIDATOR.isEmptyString(hoTen)
    if (!isNameEmpty[1]) {
        return [false, ERROR_MESSAGE.hoTen_empty]
    }
    var isAlpha = VALIDATOR.isAllAlphabetsOrWhiteSpace(isNameEmpty[0])
    if (!isAlpha) {
        return [false, ERROR_MESSAGE.hoTen_alpha_space]
    }
    return [true, COMMON_MESSAGE.valid]
}
/**
 * validation mật khẩu: kiểm tra tính hợp lệ của mật khẩu. mật khẩu phải từ 6-10 kí tự, chứa ít nhất một chữa số, 1 chứ in, 1 kí tự đặc biệt và không được để trống
 * @matKhau {string}: mật khẩu cần kiểm tra
 * @return {array} : mảng chứa hai giá trị nếu, giá trị đầu mang giá trị true nếu mật khẩu là hợp lệ, mang giá trị false nếu mật khẩu không hợp lệ. giá trị thứ hai trong mảng là thông báo kết quả
 */
function validNhanVien_matKhau(matKhau) {
    if (!matKhau) {
        return [false, ERROR_MESSAGE.matKhau_empty]
    }
    var isPassValid1 = VALIDATOR.rangeLength(matKhau, 6, 10)
    if (!isPassValid1) {
        return [false, ERROR_MESSAGE.matKhau_length]
    }
    var isPassValid2 = VALIDATOR.isStrongPassword(matKhau)
    if (!isPassValid2) {
        return [false, ERROR_MESSAGE.matKhau_strong]
    }
    return [true, COMMON_MESSAGE.valid]
}
/**
 *  validation lương cơ bản: kiểm tra tính hợp lệ của lương cơ bản. lương cơ bản phải từ 1 000 000 - 20 000 000 và không được để trống
 * @luongCoBan {string}: lương cơ bản
 * @return {array} : mảng chứa hai giá trị nếu, giá trị đầu mang giá trị true nếu lương cơ bản là hợp lệ, mang giá trị false nếu lương cơ bản không hợp lệ. giá trị thứ hai trong mảng là thông báo kết quả
 */
function validNhanVien_luongCoBan(luongCoBan) {
    if (!luongCoBan) {
        return [false, ERROR_MESSAGE.luongCoBan_empty]
    }
    var isLuongCoBan1 = VALIDATOR.isNumeric(luongCoBan)
    if (!isLuongCoBan1) {
        return [false, ERROR_MESSAGE.luongCoBan_numberic]
    }
    var luongCoBanNumber = Number(luongCoBan)
    var isLuongCoBan2 = VALIDATOR.rangeNumber(luongCoBanNumber, 1000000, 20000000)
    if (!isLuongCoBan2) {
        return [false, ERROR_MESSAGE.luongCoBan_rangedValue]
    }
    return [true, COMMON_MESSAGE.valid]
}
/**
 * kiểm tra tính hợp lệ của số giờ làm số giờ làm phải tử 80-200 và không được bỏ trống
 * @soGioLam {string}: số giờ làm
 * @return {[boolean, notify]}: boolean xem có hợp lệ hay không, notify là thông báo trả về
 */
function validNhanVien_soGioLam(soGioLam) {
    if (!soGioLam) {
        return [false, ERROR_MESSAGE.gioLam_empty]
    }
    var gioLamValid = VALIDATOR.isNumeric(soGioLam)
    if (!gioLamValid) {
        return [false, ERROR_MESSAGE.gioLam_numberic]
    }
    var gioLamValid2 = VALIDATOR.rangeNumber(Number(soGioLam), 80, 200)
    if (!gioLamValid2) {
        return [false, ERROR_MESSAGE.gioLam_range]
    }
    return [true, COMMON_MESSAGE.valid]
}
/**
 * validation nhân viên: kiểm tra thông tin nếu có một trường dữ liệu không hợp lệ thì sẽ xuất thông báo vả trả về false
 * @maNhanVien {string}: chuỗi cần kiểm tra có phải là mã nhân viên hay không
 * @hoTen {string}: chuỗi cần kiểm tra có phải là họ tên của nhân viên hay không
 * @email {string}: kiểm tra email có hợp lệ hay không
 * @matKhau {string}: kiểm tra mật khẩu có hợp lệ hay không
 * @ngayLamViec {string}: kiểm tra ngày làm có hợp lệ hay không
 * @luongCoBan {string}: kiểm tra lương cơ bản có hợp lệ hay không
 * @chucVu {string}: kiểm tra chức vụ có hợp lệ hay không
 * @soGioLam {string}: kiểm tra giờ làm có hợp lệ hay không
 * @isAdd {boolean}: nếu là true thì kiểm tra xem maNhanVien có trùng lặp không, giá trị mặc định là false 
 * @return {boolean} nếu có một trường bị sai thì trả về false ngược lại trả về true
 */
function validNhanVien(maNhanVien, hoTen, email, matKhau, ngayLamViec, luongCoBan, chucVu, soGioLam, isAdd = false) {
    var isEveryThingOk = true;
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
    var temp = validNhanVien_maNhanVien(maNhanVien, isAdd)
    if (!temp[0]) {
        isEveryThingOk &= temp[0]
        showErrorMessage(temp[1], idTbTKNV)
    }
    // tên nhân viên
    temp = validNhanVien_hoTenNhanVien(hoTen)
    if (!temp[0]) {
        isEveryThingOk &= temp[0]
        showErrorMessage(temp[1], idTbTen)
    }
    // email
    var isEmail = VALIDATOR.isEmail(email)
    if (!isEmail) {
        isEveryThingOk &= false
        showErrorMessage(ERROR_MESSAGE.email, idTbEmail)
    }
    // mật khẩu
    temp = validNhanVien_matKhau(matKhau)
    if (!temp[0]) {
        isEveryThingOk &= temp[0]
        showErrorMessage(temp[1], idTbMatKhau)
    }
    // ngày làm việc
    var isDateValid = VALIDATOR.isStringDateInvalid(ngayLamViec)
    if (!isDateValid) {
        isEveryThingOk &= false
        showErrorMessage(ERROR_MESSAGE.ngayLamViec, idTbNgay)
    }
    // lương cơ bản
    temp = validNhanVien_luongCoBan(luongCoBan)
    if (!temp[0]) {
        isEveryThingOk &= temp[0]
        showErrorMessage(temp[1], idLuongCoBan)
    }
    // chức vụ
    if (chucVu != CHUC_VU.GD && chucVu != CHUC_VU.TP && chucVu != CHUC_VU.NV) {
        isEveryThingOk &= false
        showErrorMessage(ERROR_MESSAGE.chucVu, idTbChucVu)
    }
    //số giờ làm
    temp = validNhanVien_soGioLam(soGioLam)
    if (!temp[0]) {
        isEveryThingOk &= temp[0]
        showErrorMessage(temp[1], idTbSoGioLam)
    }
    // thông tin hợp lệ
    return isEveryThingOk;
}
/**
 * xoá nhân viên khỏi mảng: hàm thực hiện xoá nhân viên theo mã nhân viên, nếu trong mảng có nhiều nhân viên trùng max (account) thì hàm sẽ xoá hết các nhân viên đó
 * @account {string}: mã nhân viên cần xoá
 */
function deleteNhanVien(account) {
    LSTNHANVIEN.remove(account)
    printListNhanVien(LSTNHANVIEN.lstNhanVien)
}
/**
 * hiển thị chi tiết sinh viên: mở model sinh viên điền thông tin sinh viên lên các trường trong model
 * @account {string}: mã nhân viên cần hiển thị
 */
function showDetailNhanVien(account) {
    hideErrorMessageFromAddOrUpdateNhanVienPopup()
    editDailog(DAILOG.title_update, true)
    //tìm kiếm nhân viên
    var nv = LSTNHANVIEN.search(account)
    if (nv == undefined) {
        return;
    }
    // show model thêm / cập nhật thông tin nhân viên
    $('#myModal').modal('toggle')
    //load dữ liệu lên model
    querySelector('#tknv').value = nv.account
    querySelector('#name').value = nv.hoTen
    querySelector('#email').value = nv.email
    querySelector('#password').value = nv.matKhau
    querySelector('#datepicker').value = nv.ngayLam
    querySelector('#luongCB').value = nv.luongCoBan
    querySelector('#chucvu').value = nv.chucVu
    querySelector('#gioLam').value = nv.gioLamTrongThang
}
/**
 * chỉnh sử thông tin dailog: nếu thêm thì hiển thị title là add, nếu update thì hiển thị title là update, và disable input id
 * @title {string}: tiêu đề của dialog
 * @disableId {boolean}: disable input id hay không
 * @return {null} hàm không có giá trị trả về
 */
function editDailog(title = DAILOG.title_add, disableId = false) {
    var titleEle = querySelector('#header-title')
    titleEle.innerHTML = title;
    var tknvEle = querySelector('#tknv')
    tknvEle.disabled = disableId
    if (title === DAILOG.title_add) {
        hidenHtmlElement('#btnCapNhat')
        querySelector('#btnThemNV').classList.add('d-block')
        return
    }
    if (title === DAILOG.title_update) {
        hidenHtmlElement('#btnThemNV')
        querySelector('#btnCapNhat').classList.add('d-block')
    }
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
    var isNhanVienValid = validNhanVien(maNhanVien, hoTen, email, matKhau, ngayLam, luongCoBan, chucVu, gioLam, true)
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
    querySelector('#formNV').reset();
}
/**
 * sự kiện update thông tin nhân viên, update all nhân viên có cùng mã nhân viên (account) trong mảng
 */
querySelector('#btnCapNhat').onclick = function () {
    hideErrorMessageFromAddOrUpdateNhanVienPopup()
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
/**
 * sự kiện hiển thị dailog khi người dùng click vào nút thêm
 */
querySelector('#btnThem').onclick = function () {
    editDailog();
    querySelector('#formNV').reset();
    hideErrorMessageFromAddOrUpdateNhanVienPopup()
}
