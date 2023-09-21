// Client facing scripts here
$(document).ready ( function (){

  //  "Estimated time" button click
  $('.time').on('click', function() {

    const time = $(this).prev().val()
    $.post( '/time', { time: time} );

  });

  // Ready button click
  $('.Ready').on('click', function() {
    $.post( '/Ready');
  });


 //Order now button
  $('.order_now').on('click', function() {
    $.post( '/order_now');
  });
})

