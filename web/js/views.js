var views = {}

views.loginPage = Backbone.View.extend({
    initialize: function(options) {
        this.options = options;
        this.render();
    },
    render: function() {
        this.$el.html(_.template($('#loginTPL').html(), { 'options': this.options }));
    },
    events: {
        "submit #login-form" : "loginUser",
    },
    loginUser: function(e) {
        //boneboiler.msg.empty();
        e.preventDefault();
        var _this     = this,
            $email    = _this.$el.find('#loginEmailAddress'),
            $password = _this.$el.find('#loginPassword');

        // reset errors
        _this.$el.find('.has-error').removeClass('has-error');

        if(!$email.val() || !$password.val()) {
            new alertView({
                msg:  'missing required fields',
                type: 'warning',
            });
            if(!$email.val()) $email.parent().addClass('has-error');
            if(!$password.val()) $password.parent().addClass('has-error');
        }
        else if(!_this.inProgress) {
            _this.inProgress = true;
            var el = _this.$el.find('#login-form button[type="submit"]'),
                existing = el.html();

            el.html("<i class='icon-spinner icon-spin'></i> Please wait...");
            
            doLogin($email.val(), $password.val(), function(){
                Backbone.history.navigate('/list', true);
            });
        }
    },
});

views.signupPage = Backbone.View.extend({
    initialize: function(options) {
        this.options = options;
        this.render();
    },
    render: function() {
        this.$el.html(_.template($('#signupTPL').html(), { 'options': this.options }));
    },
    events: {
        "submit #signup-form" : "signupUser",
    },
    signupUser: function(e) {
        //boneboiler.msg.empty();
        e.preventDefault();
        var _this     = this,
            $email    = _this.$el.find('#signupEmailAddress'),
            $password = _this.$el.find('#signupPassword');

        // reset errors
        _this.$el.find('.has-error').removeClass('has-error');

        if(!$email.val() || !$password.val()) {
            new alertView({
                msg:  'missing required fields',
                type: 'warning',
            });
            if(!$email.val()) $email.parent().addClass('has-error');
            if(!$password.val()) $password.parent().addClass('has-error');
        }
        else if(!_this.inProgress) {
            _this.inProgress = true;
            var el = _this.$el.find('#signup-form button[type="submit"]'),
                existing = el.html();

            el.html("<i class='icon-spinner icon-spin'></i> Please wait...");

            ref.createUser({
                email    : $email.val(),
                password : $password.val()
            }, function (error) {
                if (error) {
                    switch (error.code) {
                        case "INVALID_EMAIL":
                            new alertView({
                                msg:  "The specified user account email is invalid.",
                                type: 'warning',
                            });
                            break;
                        case "INVALID_PASSWORD":
                            new alertView({
                                msg:  "The specified user account password is invalid.",
                                type: 'warning',
                            });
                            break;
                        default:
                            console.log("Error singing up:", error);
                            new alertView({
                                msg:  "We couldn't create an account for you at this time. Please try again.",
                                type: 'warning',
                            });
                    }
                }
                else {
                    doLogin($email.val(), $password.val(), function(){
                        Backbone.history.navigate('/list', true);
                    });
                }
            });
        }
    },
});

views.listPage = Backbone.View.extend({
    initialize: function(options) {
        this.options = options;
        this.render();
    },
    render: function() {

        this.$el.html(_.template($('#listTPL').html(), { 'options': this.options }));

        new views.doingView({ collection: todo, checked: false, });
        new views.doneView({ collection: todo, checked: true, });
        new views.progressView({ 
            collection   : todo,
            successText  : ["Eff Yeah!", "Oh Snap!", "SHOTS!"],
            successAudio : ["final-countdown", "Shots"],
            winText      : "MONEY!",
            winAudio     : ["Shots"],
        });
    }
});

views.listView = Backbone.View.extend({
    initialize: function(options) {
        var _this = this;

        if (options.collection) this.collection = options.collection;
        this.checked = options.checked;

        this.$itemTpl = this.$el.find('li.tpl');
        this.$itemTpl.remove();

        // bind UI to collection events
        if(this.collection) {
            this.listenTo(this.collection, 'add', this.changeItem);
            this.listenTo(this.collection, 'remove', this.changeItem);
            this.listenTo(this.collection, 'change', this.changeItem);

            var frag = document.createDocumentFragment();
            _.each(_this.collection.models, function(model) {
                frag.appendChild(_this.renderItem(model)[0]);
            });

            this.$el.find("ul").html(frag);
        }
    },
    renderItem: function(model) {
        var $node = this.$itemTpl.clone();
        $node.attr("data-id", model.get("id"));
        $node.find("h2").text(model.get("title"));
        $node.find("p").html(model.get("para") + " <strong><small>" + model.get("assigned") + "</small></strong>");
        if (model.get("checked")) {
            $node.addClass("faded")
            $node.find("i.fa").replaceWith("<i class='fa fa-check-circle-o white'></i>");
        }
        return $node;
    },
    changeItem: function(model) {
        if (model.get('checked') == this.checked) this.addItem(model);
        else this.removeItem(model);
    },
    addItem: function (model) {
        this.$el.removeClass("hidden");
        var $node = this.renderItem(model),
            m_id  = "";

        _.each(this.collection.models, function(m) {
            if (!m_id && m.get("id") > model.get("id")) {
                m_id = m.get("id");
            }
        });

        if (m_id) {
            var $elder = this.$el.find(".checkbox[data-id='"+ m_id +"']");
            $node.insertBefore($elder);
        }
        else {
            this.$el.find("ul").append($node);
        }

    },
    removeItem: function (model) {
        this.$el.find(".checkbox[data-id='"+ model.get("id") +"']").remove();
        if (this.collection.length == 0) this.$el.addClass("hidden")
    },
    events: {
        "click .checkbox" : "toggleChecked",
    },
    toggleChecked: function(e) {
        var $item = $(e.currentTarget);
        var model = this.collection.get($item.attr('data-id'));
        var _this = this;
        model.set("checked", !model.get("checked"));
    },
});

views.doneView = views.listView.extend({
    el: "#done",
    renderItem: function(model) {
        var $node = this.$itemTpl.clone();
        $node.attr("data-id", model.get("id"));
        $node.find("h4").text(model.get("title"));

        return $node;
    },
});

views.doingView = views.listView.extend({
    el: "#doing",
    renderItem: function(model) {
        var $node = this.$itemTpl.clone();
        $node.attr("data-id", model.get("id"));
        $node.find("h2").text(model.get("title"));
        $node.find("p").text(model.get("para"));
        $node.find(".assigned").html("<small>" + model.get("assigned") + "</small>");

        return $node;
    },
});

views.progressView = Backbone.View.extend({
    el: "#progress",
    percent: 0,
    initialize: function(options) {
        this.collection   = options.collection;
        this.successText  = options.successText;
        this.successAudio = options.successAudio;
        this.winText      = options.winText;
        this.winAudio     = options.winAudio;
        this.player       = $('.player');

        if (this.collection) this.listenTo(this.collection, 'change', this.update);
        this.update({}, { silent: true });
    },
    update: function(model, options) {

        var doing = this.collection.where({ checked: false }),
            done  = this.collection.where({ checked: true });

        var total   = this.collection.length,
            percent = parseInt((100/total) * done.length) || 0;

        // update the progress indicator
        this.$el.find('.progress-inner').css("width", percent + "%");
        this.$el.find('.progress-percent').text(percent + "%");

        // show a success message
        if (!options.silent && percent == 100) this.complete();
        else if (!options.silent && this.percent < percent) this.checked();

        // keep track of progress
        this.percent = percent;
    },
    checked: function() {
        var _this = this,
            i     = _.random(0, this.successText.length-1),
            x     = _.random(0, this.successAudio.length-1);

        // play a song
        this.playTrack(this.successAudio[x]);

        // show some text
        this.$el.find('.success-msg').html("<span class='pump-it'>" + this.successText[i] + "</span>").addClass('active');

        this.player.on('ended', function() {
            _this.$el.find('.success-msg').removeClass('active');
        });
    },
    complete: function() {
        var _this = this;

        // play a song
        this.playTrack(this.winAudio);

        // show some text
        this.$el.find('.win-msg').html("<span class='pump-it'>" + this.winText + "</span>").addClass('active');

        this.player.on('ended', function() {
            _this.$el.find('.win-msg').removeClass('active');
        });
    },
    playTrack: function(track) {
        var source= document.createElement('source');
        if (this.player[0].canPlayType('audio/mpeg;')) {
            source.type= 'audio/mpeg';
            source.src= '/audio/'+ track +'.mp3';
        } else {
            source.type= 'audio/ogg';
            source.src= '/audio/'+ track +'.ogg';
        }

        this.player.empty();
        this.player[0].appendChild(source);
        this.player[0].load();
        this.player[0].play();
    }
});