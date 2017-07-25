function _getChildren(nodeId, typename, callback) {
    $.ajax({
        method: 'GET',
        url: getUrl('/api/nodes/' + nodeId + '/' + typename),
        success: function (data, status, xhr) {
            callback(data, status, xhr);
        },
        error: function (xhr, status) {
            callback(null, status, xhr);
        }
    });
}

function deleteFolder(id, deletechildren, callback) {
    deleteOne(id, 'folders', deletechildren, callback);
}

function postFolder(object, callback) {
    postOne(object, 'folders', callback);
}

function postOrganization(object, callback) {
    postOne(object, 'organizations', callback);
}

function getChildrenNodes(nodeId, callback) {
    _getChildren(nodeId, 'nodes', callback);
}

function getChildrenDocuments(nodeId, callback) {
    _getChildren(nodeId, 'documents', callback);
}

function getChildrenFolders(nodeId, callback) {
    _getChildren(nodeId, 'folders', callback);
}

function getChildrenOrganizations(nodeId, callback) {
    _getChildren(nodeId, 'organizations', callback);
}