describe('Onprint Sdk Tests', function () {
    describe('Login to Onprint', function () {
        it('should login Robert Tester', function (done) {
            login(testconfig.testerlogin, testconfig.testerpassword, testconfig.apikey, function (data, status) {
                if (status == "success") {
                    $.data(window, "orgid", data.organizationId);
                    done();
                }
                else {
                    done(status);
                }
            });
        });
    });

    describe('Search for an image', function () {
        it('should return actions', function (done) {
            this.timeout(5000);
            var searchQuery = {
                ApplicationInstanceId: '123',
                ApplicationName: 'Mocha Sdk Test',
                ApplicationVersion: '1.0.0',
                ApiKey: testconfig.apikey,
                DeviceName: 'PC',
                DeviceSystemVersion: '10.0.0',
                DeviceSystemVersionName: 'Windows 10',
                SdkName: 'Onprint JS Sdk',
                SdkVersion: '1.0.0',
                Language: 'fr-FR',
                Longitude: '68',
                Latitude: '47'
            };

            $.ajax({
                method: 'GET',
                url: 'joconde.png',
                dataType: 'binary',
                success: function (data) {

                    var file = new File([data], 'joconde.png', {
                        type: 'image/png'
                    });
                    searchImage(file, searchQuery, function (data, status, xhr) {
                        if (xhr.status == 200) {
                            $.data(window, 'firstactjocid', data.Actions[0].Id);
                            $.data(window, 'sessionid', data.SessionId);
                            done();
                        }
                        else {
                            done(xhr);
                        }
                    });
                }
            });
        });

        it('should register a click on the first action', function (done) {
            var headers = {
                ApplicationInstanceId: '123',
                ApplicationName: 'Mocha Sdk Test',
                ApplicationVersion: '1.0.0',
                ApiKey: testconfig.apikey,
                DeviceName: 'PC',
                DeviceSystemVersion: '10.0.0',
                DeviceSystemVersionName: 'Windows 10',
                SdkName: 'Onprint JS Sdk',
                SdkVersion: '1.0.0',
                SessionId: $.data(window, 'sessionid'),
                Longitude: 'toto'
            };
            clickAction($.data(window, 'firstactjocid'), headers, function (data, status, xhr) {
                if (xhr.status == 204) {
                    done();
                }
                else {
                    done(xhr.status);
                }
            });
        });
    });

    describe('Enrich an image', function () {
        it('should find who are my children nodes', function (done) {
            getChildrenNodes($.data(window, "orgid"), function (data, status, xhr) {
                if (status == "success") {
                    if (data[0].Name == 'TouCho') {
                        done();
                    }
                    done(data[0].Name);
                }
                else {
                    done(status);
                }
            })
        });
        it('should get children documents', function (done) {
            getChildrenDocuments($.data(window, "orgid"), function (docs, statusd, xhr) {
                if (statusd == 'success' && docs.length > 2) {
                    done();
                }
                else {
                    done('docs length: ' + docs.length);
                }
            });
        });
        it('should create a new Folder', function (done) {
            var folder = {
                ParentId: $.data(window, 'orgid'),
                Name: 'Unit Tests JS SDK'
            };
            postFolder(folder, function (data, status, xhr) {
                if (status == 'success') {
                    $.data(window, 'folderid', data.Id);
                    done();
                }
                else {
                    done(status);
                }
            })
        });
        it('should create a new Document', function (done) {

            var document = {
                DefaultLanguage: 'fr-FR',
                Name: 'Test Rabbit',
                ParentId: $.data(window, 'folderid'),
                ContentType: 'image/jpeg'
            };

            $.ajax({
                method: 'GET',
                url: 'rabbits.jpg',
                dataType: 'binary',
                success: function (data) {
                    var file = new File([data], 'rabbits.jpg', {
                        type: 'image/jpeg'
                    });
                    postDocument(file, document, false, function (data, status, xhr) {
                        if (status == 'success') {
                            $.data(window, 'docid', data.Id);
                            done();
                        }
                        else {
                            done(xhr);
                        }
                    });
                }
            });
        });
        it('should get the images of a document', function (done) {
            getImages($.data(window, 'docid'), function (data, status, xhr) {
                if (status == 'success' && data.length > 0) {
                    $.data(window, 'firstpageid', data[0].Id);
                    done();
                }
                else {
                    done(status);
                }
            });
        });
        it('should create a new action on the document', function (done) {
            var action = {
                NodeId: $.data(window, 'firstpageid'),
                Name: 'Tout sur les lapins!',
                LanguageCode: 'fr-FR',
                Type: 'URL',
                Content: JSON.stringify({
                    Url: 'https://wamiz.com/rongeurs/lapin-3/guide',
                    ContentType: 'text/html'
                })
            };
            postAction(action, function (data, status, xhr) {
                if (status == 'success') {
                    done();
                }
                else {
                    done(status);
                }
            });
        });
        it('should set a title for the image', function (done) {
            var title = {
                LanguageCode: 'fr-FR',
                NodeId: $.data(window, 'firstpageid'),
                Value: 'Deux adorables lapins'
            };
            putTitle(title, function (data, status, xhr) {
                if (status == 'nocontent') {
                    done();
                }
                else {
                    done(status);
                }
            });
        });
        it('should activate the document', function (done) {
            activateDocument($.data(window, 'docid'), function (data, status, xhr) {
                if (status == 'nocontent') {
                    done();
                }
                else {
                    done(status);
                }
            });
        });
    });

    describe('Add a zone and actions to the activated image', function() {
        it('should add a zone to the image', function(done) {
            var zone = {
                ImageId: $.data(window, 'firstpageid'),
                PositionX: 20,
                PositionY:20,
                Width:40,
                Height:60
            };
            postZone(zone, function(data, status, xhr) {
                if(status == 'success') {
                    $.data(window, 'zoneid', data.Id);
                    done();
                }
                else {
                    done(status);
                }
            });
        });

        it('should create a new action on the zone', function (done) {
            var action = {
                NodeId: $.data(window, 'zoneid'),
                Name: 'Une zone pleine de lapins',
                LanguageCode: 'fr-FR',
                Type: 'URL',
                Content: JSON.stringify({
                    Url: 'https://wamiz.com/rongeurs/lapin-3/guide',
                    ContentType: 'text/html'
                })
            };
            postAction(action, function (data, status, xhr) {
                if (status == 'success') {
                    done();
                }
                else {
                    done(status);
                }
            });
        });
    });

    describe('Search the created image', function () {
        it('should now find the rabbit image and return 2 actions', function (done) {
            this.timeout(5000);
            var searchQuery = {
                ApplicationInstanceId: '123',
                ApplicationName: 'Mocha Sdk Test',
                ApplicationVersion: '1.0.0',
                ApiKey: testconfig.apikey,
                DeviceName: 'PC',
                DeviceSystemVersion: '10.0.0',
                DeviceSystemVersionName: 'Windows 10',
                SdkName: 'Onprint JS Sdk',
                SdkVersion: '1.0.0',
                Language: 'fr-FR',
                Longitude:'129.570001',
                Latitude:'-27.164763'
            };

            $.ajax({
                method: 'GET',
                url: 'rabbitszone.jpg',
                dataType: 'binary',
                success: function (data) {

                    var file = new File([data], 'rabbits.jpg', {
                        type: 'image/jpeg'
                    });
                    searchImage(file, searchQuery, function (data, status, xhr) {
                        if (xhr.status == 200) {
                            if(data.Actions.length > 2) {
                                done('Actions count = ' + data.Actions.length);
                            }
                            else {
                                done();
                            }
                        }
                        else {
                            done(status);
                        }
                    });
                }
            });
        });
    });
    
    describe('Cleanup', function () {
        it('should delete the test folder and what was inside', function (done) {
            deleteFolder($.data(window, 'folderid'), true, function (data, status, xhr) {
                if (status == 'nocontent') {
                    done();
                }
                else {
                    done(status);
                }
            });
        });
    });
});