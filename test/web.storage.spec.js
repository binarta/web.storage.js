it('when localStorage is available', function () {
    var storage = WebStorageFactory('localStorage');
    storage.setItem('id', 'test');
    expect(storage.getItem('id')).toEqual('test');
    expect(storage.storageAvailable).toBeTruthy();
});

it('when sessionStorage is available', function () {
    var storage = WebStorageFactory('sessionStorage');
    storage.setItem('id', 'test');
    expect(storage.getItem('id')).toEqual('test');
    expect(storage.storageAvailable).toBeTruthy();
});

it('when requesting unknown storage type', function () {
    var storage = WebStorageFactory('unknown');
    expect(storage.storageAvailable).toBeFalsy();
    expect(storage.setItem).toBeDefined();
    expect(storage.getItem).toBeDefined();
    expect(storage.removeItem).toBeDefined();
});

describe('when storage is disabled', function () {
    var storage;

    beforeEach(function () {
        window.localStorage.setItem = function () {
            throw new Error();
        };
        storage = WebStorageFactory('localStorage');
    });

    it('web storage is unavailable', function () {
        expect(storage.storageAvailable).toBeFalsy();
    });

    it('return same in-memory instance', function () {
        storage.setItem('id', 'test');
        var sameStorage = new WebStorageFactory('localStorage');
        expect(sameStorage.storageAvailable).toBeFalsy();
        expect(sameStorage.getItem('id')).toEqual('test');
    });

    it('in-memory instance is specific for localStorage', function () {
        storage.setItem('id', 'test');
        var otherStorage = WebStorageFactory('otherStorage');
        expect(storage.getItem('id')).toEqual('test');
        expect(otherStorage.getItem('id')).toBeNull();
    });

    it('delete item', function () {
        storage.setItem('id', 'test');
        storage.removeItem('id');
        expect(storage.getItem('id')).toBeNull();
    });
});