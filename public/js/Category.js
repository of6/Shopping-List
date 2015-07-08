window.Category = Backbone.Model.extend({
  idAttribute: "_id",
  url: function () {
    return this.get('_id') ? '/category/' + this.get('_id') : '/categories';
  },
  
  defaults: function(){
    return {
      name: "untitled"
    }
  }
});

window.CategoryCollection = Backbone.Collection.extend({
  model: Category,
  url: '/categories'
});