var InMemoryWebStorage = [];

function WebStorageFactory(storage) {
    try {
        window[storage].setItem('storageAvailable', true);
        return window[storage];
    } catch (ignored) {
        if (!InMemoryWebStorage[storage]) InMemoryWebStorage[storage] = new InMemoryStorage();
        return InMemoryWebStorage[storage];
    }

    function InMemoryStorage() {
        var self = this;

        this.setItem = function (k, v) {
            self[k] = '' + v
        };

        this.getItem = function (k) {
            return self[k] || null;
        };

        this.removeItem = function (k) {
            delete self[k];
        }
    }
}