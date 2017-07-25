var baseurlenrich = "https://api.onprint.com"; 
var baseurlscan = "http://api.onprint.com";

function getUrl(relativeurl, secure = true) {
    if(secure) {
        return baseurlenrich.concat(relativeurl);
    }
    else {
        return baseurlscan.concat(relativeurl);
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



function importFull(docFile, actionsFile, pathfile, activate, typemime) {
    var boundary = getBoundary();
    
    var contentPath = createFileContent(pathfile.name, "pathfile", pathfile.type, boundary);
    var contentDoc = createFileContent(docfile.name, "docfile", docfile.type, boundary);
    var contentActions = createFileContent(actionsFile.name, "actionsfile", actionsFile.type, boundary);

    var blob = new Blob([contentPath, pathfile, contentDoc, docFile, contentActions, actionsFile, createEndContent(boundary)]);

    $.ajax({
        method: 'POST',
        url: getUrl('/services/Automation/FullImport?activate=' + activate + '&typemime=' + typemime),
        data: blob,
        contentType: 'multipart/form-data; boundary="' + boundary + '"',
        dataType: 'json',
        processData: false,
        success: function (data, status) {
            //showAlert('fullimport-alert', 'Document Imported!', true);
        },
        error: function (xhr, status) {
            //showAlert('fullimport-alert', 'Cannot upload: ' + JSON.parse(xhr.responseText).error, false);
        }
    });
}

function putDocument(file, documentId, async) {
    //On crée une "borne" pour séparer les variables
    var boundary = getBoundary();

    var contentFile = createFileContent(file.name, "file", file.type, boundary);
    
    var blob = new Blob([contentFile, file, createEndContent(boundary)]);

    $.ajax({
        method: 'PUT',
        url: getUrl('/api/documents/' + documentId + '?async=' + async),
        data: blob,
        contentType: 'multipart/form-data; boundary="' + boundary + '"',
        dataType: 'json',
        processData: false,
        success: function (data, status) {
            //showAlert('document-change-alert', 'Document changed!', true);
        },
        error: function (xhr, status) {
            //showAlert('document-change-alert', 'Cannot upload: ' + JSON.parse(xhr.responseText).error, false);
        }
    });
}

function postIcon(file, icon) {
    var boundary = getBoundary();

    var contentForm = createFormContent(icon, "icon", boundary);
    var contentFile = createFileContent(file.name, "file", file.type, boundary);
    
    var blob = new Blob([contentForm, contentFile, file, createEndContent(boundary)]);

    $.ajax({
        method: 'POST',
        url: getUrl('/api/icons'),
        data: blob,
        contentType: 'multipart/form-data; boundary="' + boundary + '"',
        dataType: 'json',
        processData: false,
        success: function (data, status) {
            //showAlert('icon-upload-alert', 'Icon Imported!', true);
        },
        error: function (xhr, status) {
            //showAlert('icon-upload-alert', 'Cannot upload: ' + JSON.parse(xhr.responseText).error, false);
        }
    });
}

function putLogo(file, orgId) {
    var boundary = getBoundary();

    var contentFile = createFileContent(file.name, "file", file.type, boundary);
    
    var blob = new Blob([contentFile, file, createEndContent(boundary)]);
    
    $.ajax({
        method: 'PUT',
        url: getUrl('/api/logo/' + orgId),
        data: blob,
        contentType: 'multipart/form-data; boundary="' + boundary + '"',
        dataType: 'json',
        processData: false,
        success: function (data, status) {
            //showAlert('logo-upload-alert', 'logo Changed!', true);
        },
        error: function (xhr, status) {
            //showAlert('logo-upload-alert', 'Cannot upload: ' + JSON.parse(xhr.responseText).error, false);
        }
    });
}

function deleteLogo(orgId) {
    $.ajax({
        method: 'DELETE',
        url: getUrl('/api/logo/' + orgId),
        success: function (data, status) {
            //showAlert('logo-delete-alert', 'logo Deleted!', true);
        },
        error: function (xhr, status) {
            //showAlert('logo-delete-alert', 'Cannot delete: ' + JSON.parse(xhr.responseText).error, false);
        }
    });
}
