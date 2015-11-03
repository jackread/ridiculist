var alertView = Backbone.View.extend({
    el: '#alerts',
    initialize: function(options) {
        if($('.modal.in .modalAlerts').length > 0) {
            this.$el = $('.modal.in .modalAlerts');
        }
        else if($('.modalAlerts').length > 0) {
            this.$el = $('.modalAlerts');
        }
        this.options = options;
        this.render();
    },
    render:function(){
        if(this.options.msg){
            var type = this.options.type || 'success';
            var msg = '<div class="alert alert-dismissable alert-'+ type +'">' +
                      '<button type="button" class="close" data-dismiss="alert"' +
                      'aria-hidden="true">&times;</button>' + this.options.msg +'</div>';
            
            this.$el.append(msg);
            this.hideMsg();
        }
    },
    hideMsg: function() {
        var _this = this;
        setTimeout(function() {
            _this.$el.find('.alert').remove();
        }, 4000);
    }
});
