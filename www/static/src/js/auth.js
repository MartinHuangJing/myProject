var Vue = require('vue');
var $ = require('jquery');
var Swiper = require('Swiper');
require('../../frame/bootstrap/js/bootstrap.js');
var auth = new Vue({
  el: '#auth',
  data:{
    authList: [],
    pageList: [],
    userDetail:{},
    keyword: '',
    pageNo:1,
    searchkey:'username',
    pageCount:1,
    detailConfig:{
      active:false,
      right:'-500px',
      opacity:0,
    },
  },
  methods:{
    detailAction:function(e){
      var _this = e.currentTarget;
      var user_id = $(_this).data('id');
      var username = $(_this).data('username');
      $.post('/authapi/detail', {'user_id':user_id}, function(data, textStatus, xhr) {
        data.username =username;
        auth.userDetail = data;
        auth.detailConfig.active = true;
        auth.detailConfig.right = '0px';
        auth.detailConfig.opacity = 1;
      });
    },
    closeDetail:function(){
      auth.detailConfig.active = false;
      auth.detailConfig.right = '-500px';
      auth.detailConfig.opacity = 0;
    },
    searchSub: function() {
      if (auth.keyword != '') {
        var thiskey = auth.searchkey;
        var thisval = auth.keyword;
        pageFn({
          'page': 1,
          'KEY': thiskey,
          'VAL':thisval
        });
      } else {
        alert('请输入关键字');
      }

    },
    pageFn: function(e) {
      var page = parseInt($(e.currentTarget).text());
      if (!$(e.currentTarget).hasClass('active')) {
        if (auth.keyword == '') {
          pageFn({
            'page': page
          });
        } else {
          var thiskey = auth.searchkey;
          var thisval = auth.keyword;
          pageFn({
            'page': page,
            'KEY': thiskey,
            'VAL':thisval
          });
        }
      }
    },
    closeSearch: function() {
      auth.keyword = '';
      pageFn({'page': 1});
    },
    prev:function(){
      if(auth.pageNo==1||auth.pageCount==0){
        return false;
      }else{
        var page = auth.pageNo-1;
        if (auth.keyword == '') {
          pageFn({
            'page': page
          });
        } else {
          var thiskey = auth.searchkey;
          var thisval = auth.keyword;
          pageFn({
            'page': page,
            'KEY': thiskey,
            'VAL':thisval
          });
        }
      }
    },
    next:function(){
      if(auth.pageNo==auth.pageCount||auth.pageCount==0){
        return false;
      }else{
        var page = auth.pageNo+1;
        if (auth.keyword == '') {
          pageFn({
            'page': page
          });
        } else {
          var thiskey = auth.searchkey;
          var thisval = auth.keyword;
          pageFn({
            'page': page,
            'KEY': thiskey,
            'VAL':thisval
          });
        }
      }
    }
  },
  ready:function(){
    var arr=[];
    $.post('/authapi/auth', {page:1}, function(res) {
      for(var i=0; i<res.totalPages;i++){
        arr.push(i+1);
      }
      auth.$set('pageList',arr);
      auth.$set('pageCount',res.totalPages);
      auth.$set('pageNo',res.currentPage);
      auth.$set('authList',res.data);
    })
    $('.dropdown-menu').find('li').on('click',function(){
        $('.searchkey').text($(this).text());
        auth.searchkey = $(this).data('info');
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
  watch:{
    'pageNo':function(n,o){
      $('.pageNum').eq(n-1).addClass('active').siblings('.pageNum').removeClass('active');
      if(n==1){
        $('.Previous').addClass('disabled');
      }else if(n==auth.pageCount){
        $('.Next').addClass('disabled');
      }else{
        $('.Previous').removeClass('disabled');
        $('.Next').removeClass('disabled');
      }
    },
    'pageList':function(n,o){
      $('.pageNum').eq(0).addClass('active');
    }
  }
})

function pageFn(data) {
  $.post('/authapi/auth', data, function(res) {
    var arr=[];
    for(var i=0; i<res.totalPages;i++){
        arr.push(i+1);
    }
    auth.$set('pageList',arr);
    auth.$set('pageCount',res.totalPages);
    auth.$set('pageNo',res.currentPage);
    auth.$set('authList',res.data);
    $('.pageNum').eq(res.currentPage-1).addClass('active').siblings('.pageNum').removeClass('active');
    if(res.totalPages==1||res.count==0){
        $('.Next').addClass('disabled');
    }else{
        $('.Next').removeClass('disabled');
    }
    if(res.currentPage==1){
        $('.Previous').addClass('disabled');
    }else{
        $('.Previous').removeClass('disabled');
    }
  })
}
