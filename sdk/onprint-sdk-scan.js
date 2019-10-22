function searchImage(file, searchQuery, callback) {
    var query = {
        Language : searchQuery.Language
    };
    var boundary = getBoundary();

    var contentForm = createFormContent(query, "query", boundary);
    var contentFile = createFileContent(file.name, "file", file.type, boundary);
    
    
    var blob = new Blob([contentForm, contentFile, file, createEndContent(boundary)]);
    $.ajax({
        method: 'POST',
        url: getUrl('/api/EnrichedImages', false),
        data: blob,
        contentType: 'multipart/form-data; boundary="' + boundary + '"',
        dataType: 'json',
        processData: false,
        headers: {
            'ApplicationInstanceId': searchQuery.ApplicationInstanceId,
            'ApplicationName': searchQuery.ApplicationName,
            'ApplicationVersion': searchQuery.ApplicationVersion,
            'ApiKey': searchQuery.ApiKey,
            'DeviceName': searchQuery.DeviceName,
            'DeviceSystemVersion': searchQuery.DeviceSystemVersion,
            'DeviceSystemVersionName': searchQuery.DeviceSystemVersionName,
            'SdkName': searchQuery.SdkName,
            'SdkVersion': searchQuery.SdkVersion,
            'Latitude': searchQuery.Latitude,
            'Longitude': searchQuery.Longitude
        },
        success: function (data, status, xhr) {
            if (xhr.status == 200) {
            }
            if (xhr.status == 204) {
            }
            callback(data, status, xhr);
        },
        error: function (xhr, status) {
            callback(null, status, xhr);
        }
    });
}

function searchPicture(file, searchQuery, callback) {
    var query = {
        Keywords : searchQuery.Keywords
    };
    var boundary = getBoundary();

    var contentForm = createFormContent(query, "query", boundary);
    var contentFile = createFileContent(file.name, "file", file.type, boundary);
    
    
    var blob = new Blob([contentForm, contentFile, file, createEndContent(boundary)]);
    $.ajax({
        method: 'POST',
        url: getUrl('/api/Pictures/Search', true),
        data: blob,
        contentType: 'multipart/form-data; boundary="' + boundary + '"',
        dataType: 'json',
        processData: false,
        headers: {
            'ApplicationInstanceId': searchQuery.ApplicationInstanceId,
            'ApplicationName': searchQuery.ApplicationName,
            'ApplicationVersion': searchQuery.ApplicationVersion,
            'ApiKey': searchQuery.ApiKey,
            'DeviceName': searchQuery.DeviceName,
            'DeviceSystemVersion': searchQuery.DeviceSystemVersion,
            'DeviceSystemVersionName': searchQuery.DeviceSystemVersionName,
            'SdkName': searchQuery.SdkName,
            'SdkVersion': searchQuery.SdkVersion
        },
        success: function (data, status, xhr) {
            if (xhr.status == 200) {
            }
            if (xhr.status == 204) {
            }
            callback(data, status, xhr);
        },
        error: function (xhr, status, xhr2) {
            callback(null, status, xhr);
        }
    });
}

function searchImageId(imageId, searchQuery, callback) {
    var language = searchQuery.Language;

    $.ajax({
        method:'GET',
        url: getUrl('/api/EnrichedImages?id=' + imageId + '&languageCode=' + language, false),
        headers: {
            'ApplicationInstanceId': searchQuery.ApplicationInstanceId,
            'ApplicationName': searchQuery.ApplicationName,
            'ApplicationVersion': searchQuery.ApplicationVersion,
            'ApiKey': searchQuery.ApiKey,
            'DeviceName': searchQuery.DeviceName,
            'DeviceSystemVersion': searchQuery.DeviceSystemVersion,
            'DeviceSystemVersionName': searchQuery.DeviceSystemVersionName,
            'SdkName': searchQuery.SdkName,
            'SdkVersion': searchQuery.SdkVersion,
            'Latitude': searchQuery.Latitude,
            'Longitude': searchQuery.Longitude
        },
        
        success: function (data, status, xhr) {
            if (xhr.status == 200) {
            }
            if (xhr.status == 204) {
            }
            callback(data, status, xhr);
        },
        error: function (xhr, status) {
            callback(null, status, xhr);
        }
    });
}

function clickAction(actionId, headers, callback) {
    $.ajax({
        method: 'PUT',
        headers: {
            'ApplicationInstanceId': headers.ApplicationInstanceId,
            'ApplicationName': headers.ApplicationName,
            'ApplicationVersion': headers.ApplicationVersion,
            'ApiKey': headers.ApiKey,
            'DeviceName': headers.DeviceName,
            'DeviceSystemVersion': headers.DeviceSystemVersion,
            'DeviceSystemVersionName': headers.DeviceSystemVersionName,
            'SdkName': headers.SdkName,
            'SdkVersion': headers.SdkVersion,
            'SessionId': headers.SessionId
        },
        url: getUrl('/api/Clicks?actionId=' + actionId, false),
        success: function (data, status, xhr) {
            callback(data, status, xhr);
        },
        error: function (xhr, status) {
            callback(null, status, xhr);
        }
    });
}
