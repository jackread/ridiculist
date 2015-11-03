var task = Backbone.Model.extend({
    defaults: {
        "checked" : false,
    },
    validate: function(attrs, options) {
        if (!attrs || !attrs.title || !attrs.para || !attrs.assigned) {
            var msg = "missing required fields";
            console.log(attrs);
            new alertView({
                msg:  "Missing required fields.",
                type: 'warning',
            });
            return msg;
        }
    },
});

//var collection = Backbone.Collection.extend({
var collection = Backbone.Firebase.Collection.extend({
    comparator: "id",
    storageKey: "RIDICULIST-TODO",
    model: task,
    url: "https://ridiculistapp.firebaseio.com",
    /*initialize: function(models, options) {     
        this.on("add", this.saveToDB, this);
        this.on("remove", this.saveToDB, this);

        this.add(DB.read('RIDICULIST-TODO'));
    },
    saveToDB: function(model, val, options) {
        DB.write(this.storageKey, this.models);
    },
    destroy: function() {
        this.reset();
        DB.remove(this.storageKey); 
    }*/
});