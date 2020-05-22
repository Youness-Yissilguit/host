$(function () {
  $('[data-toggle="tooltip"]').tooltip();
  //show the search input
  $('#searsh-icon').click(function () {
    $('.searsh-input').fadeToggle(300);
  });
  //open the navbar
  let bigNav = $('#fixed-navbar');
  let smallNav = $('#fixed-navbar .the-navbar');
  $('nav .humbergur').click(function () {
    bigNav.addClass('open');
    smallNav.addClass('show');
  });
  //close the nav bar
  $('#fixed-navbar, #fixed-navbar .the-navbar .close').click(function () {
    bigNav.removeClass('open');
    smallNav.removeClass('show');
  });
  $('#fixed-navbar .the-navbar').click(function (e){
    e.stopPropagation();
  });

  //main product hover effect
  $('.main-product .image-container img').hover(function (){
    $(this).attr('src', 'images/main-p2.jpg');
  });
  $('.main-product .image-container img').mouseleave(function (){
    $(this).attr('src', 'images/main-p.jpg');
  });

  //Call The Slider
  $('.owl-carousel').owlCarousel({
      loop:true,
      margin:10,
      responsiveClass:true,
      dots: false,
      loop: true,
      responsive:{
          0:{
              items:2,
              nav:true
          },
          567:{
              items:3,
              nav:false
          },
          768:{
              items:4,
              nav:true,
              loop:false
          }
      }
  });

  //switch between sign up and the sign in section
  let span = $('.account .titles span');
  $('.account .up-btn').click(function() {
    $(this).addClass('active');
    $('.account .in-btn').removeClass('active');
    $('.account #sign-in').fadeOut(100);
    $('.account #sign-up').delay(500).fadeIn(500);
  });
  $('.account .in-btn').click(function() {
    $(this).addClass('active');
    $('.account .up-btn').removeClass('active');
    $('.account #sign-up').fadeOut(100);
    $('.account #sign-in').delay(500).fadeIn(500);
  });

  //give the small box cart a top margin
  var top = $('nav').innerHeight();
  $('.small-cart').css('top', top)

  //show the small cart
  $('.cart').hover(function () {
    $('.small-cart').fadeIn(100)
  });
  $('.cart').mouseleave(function () {
    $('.small-cart').fadeOut(100)
  });

  //Show Products Details
  $('.veiw').click(function () {
    let name = $(this).data('name');
    let price = $(this).data('price');
    let src = $(this).data('src');
    let old = $(this).data('old');
    $('.view-product .p-img img').attr('src', src);
    $('.view-product .p-name').text(name);
    $('.view-product .p-price').html('$' + price +' <span>$' + old+ '</span>');
    //Add to Cart Button Attribute
    $('.view-product .add-to-cart').attr('data-name', name);
    $('.view-product .add-to-cart').attr('data-price', price);
    $('.view-product .add-to-cart').attr('data-src', src);
  });

  //Display Cart
  $('.add-to').click(function (){
    var name = $(this).data('name');
    var price = $(this).data('price');
    var src = $(this).data('src');

    addItem(name, price, src, 1);
    displayCart();

  });

  /**/
  function displayCart() {
    var cartArray = listCart();
    var output = '';
    for(var i in cartArray){
      output += `<tr>
            <td class="p-image">
            <div><img class="img-fluid" src="${cartArray[i].src}" alt="product picture" /></div>
            </td>
            <td class="name">${cartArray[i].name}</td>
            <td class="price">$${cartArray[i].price}</td>
            <td class="counter">${cartArray[i].count}</td>
            <td class="total">${(cartArray[i].price * cartArray[i].count).toFixed(2)}</td>
            <td>
            <button class="add-one" data-name="${cartArray[i].name}">+</button>
            <button class="remove-one" data-name="${cartArray[i].name}">-</button>
            </td>
            <td><i class="fas fa-trash-alt remove-item" data-toggle="tooltip" data-placement="top" title="Remove" data-name="${cartArray[i].name}"></i></td>
        </tr>`
    };
    $('#cart-Items').html(output);
    $('.cart-details .total-price').text('$' + totalCost());
    $('#has-item').text(cartCount());
    saveCart();
    //small cart
    var smallOutPut = '';
    if(output === ''){
      smallOutPut = '<p>cart Is Empty</p>'
    } else {
      for(var i in cartArray){
        smallOutPut += `<li><img src="${cartArray[i].src}" alt="product picture" />${cartArray[i].name}<span>$${cartArray[i].price}</sapn></li>`
      }
    }
    $('.small-cart').html(smallOutPut);
  };

  /**/
  $('#cart-Items').on('click', '.remove-item', function (e){
    e.preventDefault();
    var name = $(this).data('name');
    removeTheItem(name);
    displayCart();
  });
  /**/
  $('#cart-Items').on('click', '.remove-one', function (e){
    e.preventDefault();
    var name = $(this).data('name');
    removeOneItem(name);
    displayCart();
  });
  /**/
  $('#cart-Items').on('click', '.add-one', function (e){
    e.preventDefault();
    var name = $(this).data('name');
    addItem(name, 0, 1);
    displayCart();
  });

  displayCart();

});//closing bracket

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
  if(localStorage.getItem('theShoopingCart') === null){
    cart = [];
  } else{
    cart = JSON.parse(localStorage.getItem("theShoopingCart"));
  }
};

loadCart();
