// Client facing scripts here
$(document).ready ( function (){

  //  "Estimated time" button click
  $('.time').on('click', function() {
    const estimatedTime = $('.time').val();
    alert(`Estimated time set to: ${estimatedTime} minutes`);
  });

  // Ready button click
  $('.Ready').on('click', function() {
    alert('Order is ready!');
  });
})

