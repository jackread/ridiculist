var task = Backbone.Model.extend({
    defaults: {
        "checked" : false,
    },
    validate: function(attrs, options) {
        if (!attrs || !attrs.title || !attrs.description || !attrs.assigned) {
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