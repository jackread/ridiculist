var DB = {
    read: function(key, type){
        var storage = type === 'session' ? sessionStorage : localStorage,
            data    = storage.getItem(key);

        try{
            return JSON.parse(data);
        } catch(e) {
            return data;
        }
    },
    write: function(key, value, type) {
        var storage = type === 'session' ? sessionStorage : localStorage;

        if(typeof(value) == 'Array' || typeof(value) == 'object') {
            value = JSON.stringify(value);
        }

        try {
            storage.setItem(key, value);
        } catch (e) {
            alert("Uh Oh! Please turn off private browsing and try again.");
        }
    },
    remove: function(key, type) {
        var storage = type === 'session' ? sessionStorage : localStorage;
        storage.removeItem(key);
    },
    clear: function() {
        sessionStorage.clear();
        localStorage.clear();
    },
    listen: function(key, callback) {
        $(window).bind('storage', function(e) {
            if(e.originalEvent.key == key) {
                callback(e.originalEvent);
            }
        });
    }
};
