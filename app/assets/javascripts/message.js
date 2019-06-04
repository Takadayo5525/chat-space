$(function(){
  function buildHTML(message){
    var image = ""
    if(message.image !== null){
      image = `<img src = ${message.image} class ='lower-message__image'></img>`
    }
    var html =`<div class="message__block" data-message-id=${message.id}>
    <div class="message__block__information">
      <div class="message__block__information__user-name">
        ${message.user_name}
      </div>
      <div class="message__block__information__date">
        ${message.date}
      </div>
    </div>
    <p class="message__block__comment">
        ${message.content}
    </p>
    ${image}  
  </div>`

    return html;
  }
  $('#new_message').on('submit',function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.main-message').append(html)
      $('#new_message')[0].reset();
      $('.main-message').animate({scrollTop: $('.main-message')[0].scrollHeight}); 
    })
    .fail(function(){
      alert('error');
    })
    return false;
    
  });
})