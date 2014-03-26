describe('Angular Serializer', function () {
    beforeEach(module('linclark.serializer'));

    describe('serializer', function () {
        it('should pass Content-Type: application/json through', inject(function (lcSerializer) {
            var config = {
                data: {
                    'title': 'bar'
                }
            };

            expect(lcSerializer.request(config).data).toBe(config.data);
        }));
        it('should delegate Content-Type: application/x-www-form-urlencoded to the form urlencoded serializer', inject(function (lcSerializer) {
            var config = {
                data: {
                    'title': 'bar'
                },
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            };

            expect(lcSerializer.request(config).data).toBe('title=bar');
        }));
    });

    describe('form urlencoded serializer', function () {
        var serializer;

        beforeEach(inject(function ($injector) {
            serializer = $injector.get('lcFormUrlencodedSerializer');
        }));

        it('should serialize an object', function () {
            var data = {
                'title': 'Test object'
            };
            expect(serializer.serialize(data)).toBe('title=Test+object');
        });

        it('should serialize a nested object', function () {
            var data = {
                'list': {
                    'title': 'Test nested object'
                }
            };
            expect(serializer.serialize(data)).toBe('list%5Btitle%5D=Test+nested+object');
        });
    });
});
