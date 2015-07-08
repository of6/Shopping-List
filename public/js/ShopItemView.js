window.ShopItemView = Backbone.View.extend({
  tagName: 'tr',
  template: '#shopitemView',
  events: {
    'click .purchase'       : 'purchase',
    'click .delete'         : 'destroy',
    'click .dropdown-menu a': 'setCategory'
  },
  initialize: function(){
    _.bindAll(this, 'render');
    this.model.bind('change', this.render);
    this.options.categories.bind('all', this.render);
  },

  purchase: function(e) {
    e.preventDefault();
    this.model.off();
    this.model.set('purchased', true);
    this.model.save();
    var el = this.el;
    $(this.el).fadeOut('slow', function(e){
      el.remove();
    })
  },

  destroy: function(e) {
    e.preventDefault();
    this.model.collection.remove(this.model);
    this.model.destroy();
    $(this.el).remove();
  },

  setCategory: function(e) {
    e.preventDefault();
    var id = $(e.target).data('id');
    var c = this.options.categories.where({_id:id})[0];
    this.model.set('category', c);
    this.model.save();
  },

  render: function() {
    $(this.el).html(_.template($(this.template).html(), { model: this.model, categories:this.options.categories }));
    return this;
  }
});