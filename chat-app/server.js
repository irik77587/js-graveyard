// Declaring functions and variables before any execution
var sender = 'Nice1';
var sent = 'col-md-8 col-sm-12 mb-3 pt-3 bg-primary text-white ml-auto rounded';
var recieve = 'col-md-8 col-sm-12 mb-3 pt-3 bg-light border rounded';
function send_message()
{
  var message = $('#send-input').val();
  if (message.toString())
  {
    var format = `<div class="${sent}"><p>${sender}</p><p>${message}</p></div>`;
    $(format).appendTo('#conversation');
    $(document).scrollTop($(document).height());
    $('#send-input').val('');
  }
  return true;
}

$('#button-send').click(send_message);

$('#send-input').keyup((event) => {
  if(event.which == 13)
    send_message();
  return false;
});

$(() => {
  $.post('/chat-app/conversation', (data) => {
    $.each(data.conversation, (key,value) => {
      var msgtyp = value.user == sender ? sent : recieve ;
      var format = `<div class="${msgtyp}"><p>${value.user}</p><p>${value.text}</p></div>`;
      $(format).appendTo('#conversation');
    });
    $(document).scrollTop($(document).height());
  },'json');
});
