// Client facing scripts here
$(document).ready ( function (){
  $('.slider').hide();

  //  "Estimated time" button click
  $('.time').on('click', function() {

    const time = $(this).prev().val()
    $.post( '/time', { time: time} );

  });

  // Ready button click
  $('.Ready').on('click', function() {
    const order_item_id = $(this).parent().find('.order_item_id').val()
    $.post( '/Ready', {order_item_id});
  });


 //Order now button
  $('.order_now').on('click', function(event) {
    event.preventDefault();
    setTimeout(function (){
      $.post( '/order_now');
      $('.slider').slideDown('slow');
    }, 2000)
    setTimeout(function (){
      $('.slider').hide();
    }, 4000)
  });

})


