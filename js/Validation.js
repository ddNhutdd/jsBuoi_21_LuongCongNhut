function Validation() {
    // common methods
    /**
     * check string rỗng: hàm sẽ xoá các khoảng trắng thừa ở đầu, cuối và giữa các từ trong chuỗi
     * @str {string}: chuỗi cần kiểm tra thông tin 
     * @return {array[newString, boolean]}: nếu chuỗi rỗng thì boolean là false, nếu chuỗi không rỗng thì boolean là true và newString là string mới đã được xoá các khoản trắng thừa
     */
    this.isEmptyString = function (str) {
        try {
            var arrChar = str.split(' ')
            var newString = arrChar.filter(n => n != '').join(' ').trim()
            if (newString == '') {
                return [newString, false]
            }
            return [newString, true]
        } catch (error) {
            return ['newString', false]
        }
    }
    /**
     * rangeNumber: số phải n nằm trong minNumber <= n <= maxNumber
     * @n {number}: số cần kiểm tra
     * @minNumber {number}: điều kiện kiểm tra
     * @maxNumber {number}: điều kiện kiểm tra
     * @return {boolean} true nếu minNumber <= n <= maxNumber
    */
    this.rangeNumber = function (n, minNumber, maxNumber) {
        if (n < minNumber || n > maxNumber) {
            return false;
        }
        return true;
    }
    /**
     * rangeLength: kiểm tra chiều dài của mảng
     * @arr {array}: mảng cần kiểm tra length
     * @minLength {number}: chiều dài thấp nhất
     * @maxLength {number}: chiều dài lớn nhất
     * @return {boolean} true nếu minLength <= arr.Length <= maxLength
     */
    this.rangeLength = function (arr, minLength, maxLength) {
        var le = arr.length;
        return this.rangeNumber(le, minLength, maxLength);
    }
    /**
     * hàm kiểm tra xem chuỗi toàn chứa kí tự và khoản trắng hay không. bao gồm cả kí tự tiếng Việt có dấu 
     * @str {string}: chuỗi cần kiểm tra
     * @return {boolean}: true nếu chuỗi chỉ chứa kí tự và khoảng trắng
     */
    this.isAllAlphabetsOrWhiteSpace = function (str) {
        return str.match(/^[\p{L}\s]+$/u) !== null;
    }
    /**
     * hàm kiểm tra xem chuỗi toàn chứa kí tự số và không chứa khoản trắng 
     * @str {string}: chuỗi cần kiểm tra
     * @return {boolean}: true nếu chuỗi chỉ chứa kí số và không chứa khoảng trắng
     */
    this.isNumeric = function (str) {
        return /^[0-9]*$/.test(str)
    }
    /**
     * isStrongPassword: kiểm tra chuỗi phải chứa ít nhất một kí tự số, một kí tự in hoa, một kí tự đặt biệt
     * 
     */
    this.isStrongPassword = function (str) {
        return /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]*$/.test(str)
    }
    /**
     * emai validator: kiểm tra chuỗi truyền vào có đúng định dạng email hay không
     * @str {string}: chuỗi cần kiểm tra có định dạng email hay không
     * @return {boolean} true nếu chuỗi có định dạng email, ngược lại trả về false 
     */
    this.isEmail = function (str) {
        var temp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (str.match(temp)) {
            return true;
        }
        return false;
    }
    /**
     * string date valid : kiểm tra chuỗi ngày có hợp lệ hay không
     * @str {string}: chuỗi ngày cần kiểm tra
     * @return {boolean}: true nếu chuỗi ngày hợp lệ
     */
    this.isStringDateInvalid = function (str) {
        try {
            var da = str.split('/')
            if (da.length != 3) {
                return false
            }
            var day = Number(da[1])
            var month = Number(da[0])
            if (!this.rangeNumber(month, 1, 12)) {
                return false
            }
            if (!this.rangeNumber(day, 1, 31)) {
                return false
            }
            if (month == 4 || month == 6 || month == 9 || month == 11) {
                if (day > 30) {
                    return false
                }
            }
            if (month == 2 && day > 28) {
                if (this.leapYear(da[2]) == false) {
                    return false
                }
            }
            // check chuỗi ngày hợp lệ
            return true;
        } catch (e) {
            return false
        }
    }
    /**
     * hàm kiểm tra năm nhuận
     * @year {number}: năm cần kiểm tra năm nhuận
     * @return {boolean} true nếu là năm nhuận ngược lại là false
     */
    this.leapYear = function (year) {
        return ((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0);
    }
}