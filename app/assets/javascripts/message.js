$(function(){
  var reloadMessages = function() {
    last_message_id = $('.message:last').data("message-id");
    $.ajax({
      url: "api/messages",
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      if (messages.length !== 0) {
      var insertHTML = '';
      $.each(messages, function(i, message) {
        insertHTML += buildHTML(message)
      });
      $('.main_chat__message-view').append(insertHTML);
      $('.main_chat__message-view').animate({ scrollTop: $('.main_chat__message-view')[0].scrollHeight});
      $("#new_message")[0].reset();
      $(".main_chat__new-message__form__send").prop("disabled", false);
    }
    })
    .fail(function() {
      alert('自動更新が正常に行われませんでした。');
    });
  };

  var buildHTML  = function(message) {
    if ( message.content && message.image ) {
      var html =
       `<div class="main_chat__message-view__box" data-message-id=${message.id}>
          <div class="main_chat__message-view__box__info">
            <div class="main_chat__message-view__box__info__post-name">
              ${message.user_name}
            </div>
            <div class="main_chat__message-view__box__info__post-date">
              ${message.created_at}
            </div>
          </div>
          <div class="main_chat__message-view__box__message">
            <div class="main_chat__message-view__box__message__content">
              ${message.content}
            </div>
          </div>
          <img src=${message.image} >
        </div>`

    } else if (message.content) {
      var html =
       `<div class="main_chat__message-view__box" data-message-id=${message.id}>
          <div class="main_chat__message-view__box__info">
            <div class="main_chat__message-view__box__info__post-name">
              ${message.user_name}
            </div>
            <div class="main_chat__message-view__box__info__post-date">
              ${message.created_at}
            </div>
          </div>
          <div class="main_chat__message-view__box__message">
            <div class="main_chat__message-view__box__message__content">
              ${message.content}
            </div>
          </div>
        </div>`
    } else if (message.image) {
      var html =
        `<div class="main_chat__message-view__box" data-message-id=${message.id}>
          <div class="main_chat__message-view__box__info">
            <div class="main_chat__message-view__box__info__post-name">
              ${message.user_name}
            </div>
            <div class="main_chat__message-view__box__info__post-date">
              ${message.created_at}
            </div>
          </div>
          <div class="main_chat__message-view__box__message">
            <img src=${message.image} >
          </div>
        </div>`
    }
    return html;
    };
  $('#new_message').on('submit', function(e){
    e.preventDefault()
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $('.main_chat__new-message__form__send').removeAttr('data-disable-with');
    $.ajax({
      url: url,
      type: 'POST',
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.main_chat__message-view').append(html);
      $('.main_chat__message-view').animate({ scrollTop: $('.main_chat__message-view')[0].scrollHeight}); 
      $('form')[0].reset();
    })
    .fail(function(){
      alert('メッセージを入力してください');
  });
  });
  if (document.location.href.match(/\/groups\/\d+\/messages/)) {
    setInterval(reloadMessages, 7000);
  };
});