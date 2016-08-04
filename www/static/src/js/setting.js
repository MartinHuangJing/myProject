var Vue = require('vue');
var $ = require('jquery');
var Swiper = require('Swiper');
var oldAuth = '';
var setting = new Vue({
  el: '#setting',
  data: {
    settingList: [],
    pageList: [],
    keyword: '',
    pageNo: 1,
    pageCount: 1,
    detailConfig: {
      active: false,
      right: '-500px',
      opacity: 0,
      addCon:false,
    },
    userInfo:{},
    thisAuth:[],
    allowAuth:[],
    oldAuth:[],
  },
  methods: {
    removeAuthFn:function(e){
      var _this = e.currentTarget;
      var menu_id = $(_this).data('menu_id');
      var index = $(_this).data('index');
      var item = setting.thisAuth[index];
      setting.thisAuth.$remove(item);
      setting.allowAuth.push(item);
    },
    addAuthFn:function(e){
      if(setting.detailConfig.addCon){
        setting.detailConfig.addCon = false;
      }else{
        setting.detailConfig.addCon = true;
      }
      if(setting.detailConfig.addCon){
        $('.allAuth').slideDown(200);
      }else{
        $('.allAuth').slideUp(200);
      }
    },
    addThisAuth:function(e){
      var _this = e.currentTarget;
      var menu_id = $(_this).data('menu_id');
      var index = $(_this).data('index');
      var item = setting.allowAuth[index];
      setting.thisAuth.push(item);
      setting.allowAuth.$remove(item);
      setting.detailConfig.addCon = false;
      $('.allAuth').hide();
      
      var thisAuth = JSON.stringify(setting.thisAuth);
      console.log(thisAuth==oldAuth);
    },
    detailAction: function (e) {
      var _this = e.currentTarget;
      var user_id = $(_this).data('id');
      var role_id = $(_this).data('role');
      setting.$set('userInfo',{});
      $.post('/admin/detail', { 'user_id': user_id ,'role_id':role_id}, function (data, textStatus, xhr) {
        setting.userInfo = data.user_info;
        setting.thisAuth = data.this_auth;
        oldAuth = JSON.stringify(data.this_auth);
        setting.allowAuth = data.allow_auth;
        setting.detailConfig.active = true;
        setting.detailConfig.right = '0px';
        setting.detailConfig.opacity = 1;
      });
    },
    closeDetail: function () {
      setting.detailConfig.active = false;
      setting.detailConfig.right = '-500px';
      setting.detailConfig.opacity = 0;
      $('.allAuth').hide();
    },
    searchSub: function () {
      if (setting.keyword != '') {
        pageFn({
          'page': 1,
          'username': setting.keyword
        });
      } else {
        alert('请输入手机号码查询用户');
      }

    },
    pageFn: function (e) {
      var page = parseInt($(e.currentTarget).text());
      if (!$(e.currentTarget).hasClass('active')) {
        if (setting.keyword == '') {
          pageFn({
            'page': page
          });
        } else {
          pageFn({
            'page': page,
            'username': setting.keyword
          });
        }
      }
    },
    closeSearch: function () {
      setting.keyword = '';
      pageFn({ 'page': 1 });
    },
    prev: function () {
      if (setting.pageNo == 1 || setting.pageCount == 0) {
        return false;
      } else {
        var page = setting.pageNo - 1;
        if (setting.keyword == '') {
          pageFn({
            'page': page
          });
        } else {
          pageFn({
            'page': page,
            'username': setting.keyword
          });
        }
      }
    },
    next: function () {
      if (setting.pageNo == setting.pageCount || setting.pageCount == 0) {
        return false;
      } else {
        var page = setting.pageNo + 1;
        if (setting.keyword == '') {
          pageFn({
            'page': page
          });
        } else {
          pageFn({
            'page': page,
            'username': setting.keyword
          });
        }
      }
    },
    savaAuth:function(){
      var userInfo = JSON.stringify(setting.userInfo);
      var thisAuth = JSON.stringify(setting.thisAuth);
      console.log(thisAuth==oldAuth);
      $.post('/admin/sava',{
        'userInfo':userInfo,
        'thisAuth':thisAuth,
        'oldAuth':oldAuth
      },function(res){
        if(res.code==200){
          alert('保存成功');
          setting.detailConfig.active = false;
          setting.detailConfig.right = '-500px';
          setting.detailConfig.opacity = 0;
          $('.allAuth').hide();
        }
      })
    }
  },
  ready: function () {
    var arr = [];
    $.post('/admin/user', { page: 1 }, function (res) {
      for (var i = 0; i < res.totalPages; i++) {
        arr.push(i + 1);
      }
      setting.$set('pageList', arr);
      setting.$set('pageCount', res.totalPages);
      setting.$set('pageNo', res.currentPage);
      setting.$set('settingList', res.data);

    })
    var swiper = new Swiper('.swiper-container', {
      scrollbar: '.swiper-scrollbar',
      direction: 'vertical',
      slidesPerView: 'auto',
      mousewheelControl: true,
      freeMode: true,
      observer: true
    });
  },
  watch: {
    'pageNo': function (n, o) {
      $('.pageNum').eq(n - 1).addClass('active').siblings('.pageNum').removeClass('active');
      if (n == 1) {
        $('.Previous').addClass('disabled');
      } else if (n == setting.pageCount) {
        $('.Next').addClass('disabled');
      } else {
        $('.Previous').removeClass('disabled');
        $('.Next').removeClass('disabled');
      }
    },
    'pageList': function (n, o) {
      $('.pageNum').eq(0).addClass('active');
    }
  }
})

function pageFn(data) {
  $.post('/admin/user', data, function (res) {
    var arr = [];
    for (var i = 0; i < res.totalPages; i++) {
      arr.push(i + 1);
    }
    setting.$set('pageList', arr);
    setting.$set('pageCount', res.totalPages);
    setting.$set('pageNo', res.currentPage);
    setting.$set('settingList', res.data);
    $('.pageNum').eq(res.currentPage - 1).addClass('active').siblings('.pageNum').removeClass('active');
    if (res.totalPages == 1 || res.count == 0) {
      $('.Next').addClass('disabled');
    } else {
      $('.Next').removeClass('disabled');
    }
    if (res.currentPage == 1) {
      $('.Previous').addClass('disabled');
    } else {
      $('.Previous').removeClass('disabled');
    }
  })
}
