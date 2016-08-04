var Vue = require('vue');
var $ = require('jquery');
var Swiper = require('Swiper');

var account = new Vue({
  el: '#account',
  data: {
    accountList: [],
    pageList: [],
    userDetail: {},
    keyword: '',
    pageNo: 1,
    pageCount: 1,
    detailConfig: {
      active: false,
      right: '-500px',
      opacity: 0,
    },
  },
  methods: {
    detailAction: function (e) {
      var _this = e.currentTarget;
      var user_id = $(_this).data('id');
      var username = $(_this).data('username');
      $.post('/accountapi/detail', { 'user_id': user_id }, function (data, textStatus, xhr) {
        data.username = username;
        account.userDetail = data;
        account.detailConfig.active = true;
        account.detailConfig.right = '0px';
        account.detailConfig.opacity = 1;
      });
    },
    closeDetail: function () {
      account.detailConfig.active = false;
      account.detailConfig.right = '-500px';
      account.detailConfig.opacity = 0;
    },
    searchSub: function () {
      if (account.keyword != '') {
        pageFn({
          'page': 1,
          'username': account.keyword
        });
      } else {
        alert('请输入手机号码查询用户');
      }

    },
    pageFn: function (e) {
      var page = parseInt($(e.currentTarget).text());
      if (!$(e.currentTarget).hasClass('active')) {
        if (account.keyword == '') {
          pageFn({
            'page': page
          });
        } else {
          pageFn({
            'page': page,
            'username': account.keyword
          });
        }
      }
    },
    closeSearch: function () {
      account.keyword = '';
      pageFn({ 'page': 1 });
    },
    prev: function () {
      if (account.pageNo == 1 || account.pageCount == 0) {
        return false;
      } else {
        var page = account.pageNo - 1;
        if (account.keyword == '') {
          pageFn({
            'page': page
          });
        } else {
          pageFn({
            'page': page,
            'username': account.keyword
          });
        }
      }
    },
    next: function () {
      if (account.pageNo == account.pageCount || account.pageCount == 0) {
        return false;
      } else {
        var page = account.pageNo + 1;
        if (account.keyword == '') {
          pageFn({
            'page': page
          });
        } else {
          pageFn({
            'page': page,
            'username': account.keyword
          });
        }
      }
    }
  },
  ready: function () {
    var arr = [];
    $.post('/accountapi/account', { page: 1 }, function (res) {
      for (var i = 0; i < res.totalPages; i++) {
        arr.push(i + 1);
      }
      account.$set('pageList', arr);
      account.$set('pageCount', res.totalPages);
      account.$set('pageNo', res.currentPage);
      account.$set('accountList', res.data);

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
      } else if (n == account.pageCount) {
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
  $.post('/accountapi/account', data, function (res) {
    var arr = [];
    for (var i = 0; i < res.totalPages; i++) {
      arr.push(i + 1);
    }
    account.$set('pageList', arr);
    account.$set('pageCount', res.totalPages);
    account.$set('pageNo', res.currentPage);
    account.$set('accountList', res.data);
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
