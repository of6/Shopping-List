window.ShopItem = Backbone.Model.extend({
  idAttribute: '_id',
  url: function() {
    return this.get('_id') ? '/shopitem/' + this.get('_id') : '/shopitems';
  },
  
  defaults: function() {
    return {
      purchased: false,
      category: null
    };
  },
  
  parse: function(response) {
    response.category = new Category(response.category);
    return response;
  }
  
});

window.ShoppingList = Backbone.Collection.extend({
  model: ShopItem,
  url: '/shopitems',
  purchased: function() {
    return new ShoppingList(this.where({purchased:true}));
  },
  productCategories: function() {
    var categories = [];
    this.purchased().sort().each(function(shopItem){
      if(shopItem.get('category')) {
        categories.push({item: shopItem.get('name'), category: shopItem.get('category').get('name')});
      }
    }, this);
    return _.uniq(categories, false, function(i) { return i.item })
  },
  getCategory: function(productName) {
    var r = _.find(this.productCategories(), function(i){ return i.item == productName });
    return (r) ? r.category : '';
  },
  toBuy: function() {
    return new ShoppingList(this.where({purchased:false}));
  }
});

window.ShoppingList.prototype.comparator = function(item) {
  return (99999999999999 - new Date(Date.parse(item.get('created_at'))).getTime());
}