window.global = {
    token: '',
    updateToken(t) {
        var token = t ? t : window.util.getStor('token');
        if (!token) {
            window.util.jump('/login');
        }
        this.token = token;
    },
    setToken(token) {
        this.token = token;
    },
}

var badTokenCode = window.config.badTokenCode;
var httpIds = [];
var noHandle = false;
window.util.interceptor(function(req, next) {
    let hid = new Date().getTime();
    httpIds[httpIds.length] = hid;
    next(function(res) {
        if (res.body && res.body.code == badTokenCode) {
            noHandle = true;
        }
        httpIds.forEach((id, index) => {
            if (id == hid) {
                httpIds.splice(index, 1);
            }
        });
        if (!httpIds.length) {
            noHandle = false;
        }
        res.noHandle = noHandle;
        return res;
    })
});
