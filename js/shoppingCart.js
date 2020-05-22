/*Start The Cart Functions*/

var cart = [];
var Item = function (name, price, src, count) {
  this.name = name;
  this.price = price;
  this.src = src;
  this.count = count;
};

/*Add Itemes function*/
function addItem(name, price, src, count) {
  for(var i in cart){
    if(cart[i].name === name){
      cart[i].count ++;
      return;
    };
  };
  var item = new Item(name, price, src, count);
  cart.push(item);
  saveCart();
};

/*Remove One Item From Cart*/
function removeOneItem(name){
  for(var i in cart){
    if(cart[i].name === name){
      cart[i].count --;
    };
    if(cart[i].count === 0){
      cart.splice(i, 1);
    };
  };
  saveCart();
};

/*remove The Items All*/
function removeTheItem(name) {
  for(var i in cart){
    if(cart[i].name === name){
      cart.splice(i, 1);
      break;
    };
  };
  saveCart();
};

/*Clear Cart*/
function clearCart() {
  cart = [];
  saveCart();
};

/*Cart count*/
function cartCount(){
  var totalCount = 0;
  for(var i in cart){
    totalCount += cart[i].count;
  }
  return totalCount;
};

/*total Cart*/
function totalCost() {
  var totalPrice = 0;
  for (var i in cart){
    totalPrice += Number(cart[i].price) * cart[i].count;
  };
  return totalPrice.toFixed(2);
};

/*list cart*/
function listCart() {
  var cartCopy = [];
  for(var i in cart){
    var item = cart[i];
    var itemCopy = {};
    for(var p in item){
      itemCopy[p] = item[p];
    }
    cartCopy.push(itemCopy);
  }
  return cartCopy;
};

/*Save Cart*/
function saveCart() {
  localStorage.setItem("theShoopingCart", JSON.stringify(cart))
};
/*load Cart*/
function loadCart() {
  cart = JSON.parse(localStorage.getItem("theShoopingCart"));
};
loadCart();
