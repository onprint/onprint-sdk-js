function postDocument(file, document, async, callback) {
    var boundary = getBoundary();
    
    var contentForm = createFormContent(document, "document", boundary);
    var contentFile = createFileContent(file.name, "file", file.type, boundary);
    
    var blob = new Blob([contentForm, contentFile, file, createEndContent(boundary)]);

    $.ajax({
        method: 'POST',
        url: getUrl('/api/documents?async=' + async),
        data: blob,
        contentType: 'multipart/form-data; boundary="' + boundary + '"',
        dataType: 'json',
        processData: false,
        success: function (data, status, xhr) {
            callback(data, status, xhr)
        },
        error: function (xhr, status) {
            callback(null, status, xhr)
        }
    });
}

function getImages(docid, callback) {
     $.ajax({
        method: 'GET',
        url: getUrl('/api/documents/' + docid + '/images'),
        success: function (data, status, xhr) {
            callback(data, status, xhr);
        },
        error: function (xhr, status) {
            callback(null, status, xhr);
        }
    });
}

function postAction(action, callback) {
    postOne(action, 'actions', callback);
}

function putTitle(title, callback) {
    putOne(title, 'titles', callback);
}

function activateDocument(docid, callback) {
    var doc = {
        Status : 'Active'
    };
    $.ajax({
        method: 'PATCH',
        url: getUrl('/api/documents?id=' + docid),
        data: JSON.stringify(doc),
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