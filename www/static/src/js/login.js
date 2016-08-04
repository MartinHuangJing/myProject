var $ = require('jquery');

function login() {
  $.post('/user/login',$('#formpost').serialize(),function(data){
    if(data.code==200){
      window.location.reload()
    }else{
      alert(data.msg)
    }
  })
}
$(function(){
  $('.btnSub').on('click',function(){
    login();
  });

  $(document.body).on('keydown',function (e) {
    if(e.keyCode==13){
      login();
    }
  })
});
