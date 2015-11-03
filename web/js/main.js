var AppRouter = Backbone.Router.extend ({
    routes: {
        "*actions" : "transition",
    },
    transition: function (path) {

        if (path == 'logout') {
            ref.unauth();
            Backbone.history.navigate('/login', true);
            return;
        }

        var defaultView = user ? 'list' : 'login';

        // all not founds could be a short URL
        var view = path ? path.split('/')[0].replace('-', '_') : defaultView;

        if (views && !views[view + "Page"]) view = defaultView;

        // kill some zombies
        if (active) active.kill();

        // handle 404
        if (!views[view + "Page"]) {
            notFound();
            return;
        }

        // add the view to the page
        var active = new views[view + "Page"]({ el: "#content" });

        // scroll to top
        $(document).scrollTop(0);
    },
});

function notFound() {
    alert('not found!');
    return;
}

var ref       = new Firebase("https://ridiculistapp.firebaseio.com/");
    authData  = ref.getAuth();
    user      = null;

ref.onAuth(function(authData) {
    user = authData;
    if (authData) console.log("User " + authData.uid + " is logged in with " + authData.provider);
    else console.log("User is logged out");
});

// find a suitable name based on the meta info given by each provider
function getName(authData) {
  switch(authData.provider) {
     case 'password':
       return authData.password.email.replace(/@.*/, '');
     case 'twitter':
       return authData.twitter.displayName;
     case 'facebook':
       return authData.facebook.displayName;
  }
}

// start routing
var app = new AppRouter;
Backbone.history.start({ pushState: true });

// the splash is gone
var splashIsGone = false;
setTimeout(function() {
    splashIsGone = true;
}, 3000);

// override link clicks to use push state
$(document).on('click', 'a:not([data-bypass])', function(e){
    var href = $(this).prop('href')
    var root = location.protocol+'//'+location.host+'/'
    if (root===href.slice(0,root.length)){
        e.preventDefault();
        Backbone.history.navigate(href.slice(root.length), true);
    }
});

function doLogin(email, password, callback) {
    ref.authWithPassword({
        email    : email,
        password : password
    }, function (error, authData) {
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
                        msg:  "The specified user account password is incorrect.",
                        type: 'warning',
                    });
                    break;
                case "INVALID_USER":
                    new alertView({
                        msg:  "The specified user account does not exist.",
                        type: 'warning',
                    });
                    break;
                default:
                    console.log("Error logging user in:", error);
                    new alertView({
                        msg:  "We couldn't log you in at this time. Please try again.",
                        type: 'warning',
                    });

                callback(true);
            }
        }
        else callback(false);
    });
}

/** DEFINE THE API **/
/*window.RIDICULIST = {
    addItem : function(payload) {
        payload['id'] = done.length + doing.length + 1;
        payload['created'] = new Date().getTime();
        var model = new task();
        model.set(payload, { validate:true });
        todo.add(model);
    },
    removeItem : function(model_id) {
        var model = todo.get(model_id);
        todo.remove(model);
    },
    destroy: function() {
        todo.destroy();
        window.location.reload();
    }
}*/