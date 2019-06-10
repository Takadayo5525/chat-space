$(document).on('turbolinks:load', function() {

$(function(){
  var search_list = $("#user-search-result");

  function appendUser(user){
    var html = `
                <div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${user.name}</p>
                  <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id='${user.id}' data-user-name='${user.name}'>追加</div>
                </div>`
    search_list.append(html);
  }
  function appendErrMsgToHTML(msg){
    var html = `
                <div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${ msg }</p>
                </div>`
    search_list.append(html);
  }

  $('#user-search-field').on("keyup",function(){
    var input = $('#user-search-field').val();


  $.ajax({
    url: '/users',
    type: 'GET',
    data: { keyword: input },
    ProcessData: false,
    contentType: false,
    dataType: 'json'
  })

  .done(function(users){
    $("#user-search-result").empty();
    if (users.length !== 0){
      users.forEach(function(user){
        appendUser(user);
      });
    }
    else{
      appendErrMsgToHTML("一致する名前はありません");
    }
  })
  .fail(function(){
    alert('ユーザー検索に失敗しました');
  })
});
  var menber_list = $('#chat-group-users');
  function appendUserToMember(name,user_id){
  var html = `
              <div class='chat-group-user clearfix js-chat-member' id='${user_id}'>
                <input name='group[user_ids][]' type='hidden' value='${user_id}'>
                <p class='chat-group-user__name'>${name}</p>
              <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</div>
              </div>
            `
  menber_list.append(html);
  }
  $(function(){
    $(document).on("click",".chat-group-user__btn--add",function(){
      var name = $(this).data("user-name");
      var user_id = $(this).data("user-id");
      $(this).parent().remove();
      appendUserToMember(name,user_id);
    })
  });
  $(document).on("click",".js-remove-btn",function(){
    $(this).parent().remove();
  });
});
});
