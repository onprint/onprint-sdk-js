function login(username, password, apikey, callback) {

    if (username == '' || password == '') {
        alert('missing username or password');
        return;
    }
    var url = getUrl("/token");
    var formData = "grant_type=password&username=" + encodeURIComponent(username) + "&password=" + encodeURIComponent(password);
    $.ajax({
        url: url,
        type: 'POST',
        accept: 'application/json',
        headers: {
            'ApiKey': apikey
        },
        contentType: "application/x-www-form-urlencoded",
        data: formData,
        success: function (data, status) {
            $.ajaxSetup({ beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', 'bearer ' + data.access_token);
            } });
            callback(data, status);
        },
        error: function (xhr, status) {
            callback(xhr, status);
        }
    });
}