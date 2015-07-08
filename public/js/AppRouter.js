window.AppRouter = Backbone.Router.extend({
  routes: {
    "home":        "home",
    "purchased":  "purchased",
    "categories":  "categories",
    "*default":     "default_route"
  },
  home: function() {
    this.categoryView.hide();
    $('.nav li.active').removeClass('active');
    $('.home').addClass('active');
    var view = new ShoppingView({categories: this.categories});
    $('#app').html(view.el);
  },
  purchased: function() {
    this.categoryView.hide();
    $('.nav li.active').removeClass('active');
    $('.showpurchased').addClass('active');
    var view = new PurchasedView({categories: this.categories});
    $('#app').html(view.el);
  },
  categories: function() {
    this.categoryView.show();
  },
  default_route: function() {
    this.navigate('home', {trigger: true});
  },
  initialize: function(){
    this.categories = new CategoryCollection();
    this.categoryView = new CategoryView({collection: this.categories});
    $('#categorymodal').html(this.categoryView.render().el);
    var t = this;
    $('#categorymodal').on('hide.bs.modal', function(){
      t.navigate('home', {trigger: true});
    })
  }
});