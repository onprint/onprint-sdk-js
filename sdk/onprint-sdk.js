function getUrl(relativeurl, secure = true) {
    if(secure) {
        return config.baseurlenrich.concat(relativeurl);
    }
    else {
        return config.baseurlscan.concat(relativeurl);
    }
}

function getBoundary() {
    return "XXX" + (new Date).getTime() + "XXX";
}

function createFileContent(filename, attachmentname, filetype, boundary) {
    var contentFile = '--' + boundary + '\r\n';
    contentFile += 'Content-Disposition: attachment; name=' + attachmentname + '; filename="' + filename + '"\r\n';
    contentFile += 'Content-Type: ' + filetype + '\r\n';
    contentFile += '\r\n';
    return contentFile;
}

function createFormContent(object, objectname, boundary) {
    var contentForm = '--' + boundary + '\r\n';
    contentForm += 'Content-Type: application/json; charset=utf-8\r\n';
    contentForm += 'Content-Disposition: form-data; name=' + objectname + '\r\n';
    contentForm += '\r\n';
    contentForm += JSON.stringify(object) + '\r\n';
    return contentForm;
}

function createEndContent(boundary) {
    var contentEnd = '\r\n';
    contentEnd += '--' + boundary + '--';
    return contentEnd;
}

function getOne(nodeId, typename, callback) {
    $.ajax({
        method: 'GET',
        url: getUrl('/api/' + typename + '/' + nodeId),
        success: function (data, status, xhr) {
            callback(data, status, xhr);
        },
        error: function (xhr, status) {
            callback(null, status, xhr);
        }
    });
}

function _postorput(object, typename, postorput, callback) {
    $.ajax({
        method: postorput,
        url: getUrl('/api/' + typename),
        data: JSON.stringify(object),
        contentType: 'application/json',
        dataType: 'json',
        success: function (data, status, xhr) {
            callback(data, status, xhr);
        },
        error: function (xhr, status) {
            callback(null, status, xhr);
        }
    });
}

function postOne(object, typename, callback) {
    _postorput(object, typename, 'POST', callback);
}

function putOne(object, typename, callback) {
    _postorput(object, typename, 'PUT', callback);
}

function deleteOne(id, typename, recursive, callback) {
    $.ajax({
        method: 'DELETE',
        url: getUrl('/api/'+ typename + '/' + id + '?deletechildren=' + recursive),
        success: function (data, status, xhr) {
            callback(data, status, xhr);
        },
        error: function (xhr, status) {
            callback(null, status, xhr);
        }
    });
}
