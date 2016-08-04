var Vue = require('vue');
var $ = require('jquery');
var app = new Vue({
  el: '#app',
  data: {
    layoutConfig: {
      left_width: '230px',
      btn_class: 'left',
      btn_width: '50px'
    },
    btn: true,
  },
  methods: {
    changepage: function (e) {
      var _this = e.currentTarget
      var url = $(_this).data('url');
      var fileName = $(_this).data('file');
      if (!$(e.currentTarget).hasClass('active')) {
        $('.main_right').hide();
        $(_this).addClass('active').siblings('li').removeClass('active');
        $.post(url, function (data) {
          $('.main_right').html(data);
        })
          .done(function () {
            $.ajax({
              url: '/static/dist/js/' + fileName + '.js',
              dataType: 'script',
              cache: true,
            })
              .done(function () {
                console.log('加载完成');
                $('.main_right').fadeIn('200');
              })
          })
      }
    },
    changeLayout: function () {
      app.btn = !app.btn;
      if (app.btn) {
        app.layoutConfig.left_width = '230px';
        app.layoutConfig.btn_class = 'left';
        app.layoutConfig.btn_width = '50px';
      } else {
        app.layoutConfig.left_width = '70px';
        app.layoutConfig.btn_class = 'right';
        app.layoutConfig.btn_width = '70px';
      }
    }
  },
  ready: function () {
    $('.list_group').find('li').eq(0).addClass('active');
    var url = $('.list_group').find('li').eq(0).data('url');
    var fileName = $('.list_group').find('li').eq(0).data('file');
    $.post(url, function (data) {
      $('.main_right').html(data);
    })
      .done(function () {
        if (fileName) {
          $.ajax({
            url: '/static/dist/js/' + fileName + '.js',
            dataType: 'script',
            cache: true,
          })
            .done(function () {
              console.log('加载完成');
              $('.main_right').fadeIn('200');
            })
        } else {
          $('.main_right').fadeIn('200');
        }

      });
    $('.loginout').on('click', function (e) {
      e.preventDefault();
      $('#login_out_form').submit();
    })
  }
})
