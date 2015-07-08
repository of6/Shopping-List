window.PurchasedView = Backbone.View.extend({
  template: '#purchasedView',
  events: {},
  initialize: function() {
    _.bindAll(this, 'render');
    this.options.categories.bind('all', this.render);
    this.collection = new ShoppingList();
    this.collection.fetch();
    this.collection.bind('reset', this.render);
  },
  
  render: function() {
    $(this.el).html($(this.template).html());
    this.collection.purchased().each(function(shopItem){
      var viewModels = {model: shopItem, categories: this.options.categories};
      var view = new ShopItemView(viewModels);
      $(this.el).find('.shoppinglist').append(view.render().el);
    }, this);
  }
});