window.ShoppingView = Backbone.View.extend({
  template: '#shoppingView',
  events: {
    'click .js-addtolist': 'addToList'
  },
  initialize: function() {
    _.bindAll(this, 'render', 'addToList');
    this.collection = new ShoppingList();
    this.collection.bind('reset', this.render);
    this.collection.bind('add', this.render);
    this.collection.fetch();
    this.options.categories.bind('all', this.render);
  },

  addToList: function() {
    var items = $(this.el).find('.listbox').val().split('\n');
    _.each(items, function(i){
      var c = this.options.categories.where({name: this.collection.getCategory(i)});
      var category = (c.length > 0) ? c[0] : null;
      this.collection.create({name: i, category: category});
    }, this);
  },

  render: function() {
    $(this.el).html($(this.template).html());
    this.collection.toBuy().each(function(shopItem){
      var viewModels = {model: shopItem, categories: this.options.categories};
      var view = new ShopItemView(viewModels);
      $(this.el).find('.shoppinglist').append(view.render().el);
    }, this);
  }
});