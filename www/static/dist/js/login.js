webpackJsonp([5],[function(o,n,t){"use strict";function c(){i.post("/user/login",i("#formpost").serialize(),function(o){200==o.code?window.location.reload():alert(o.msg)})}var i=t(4);i(function(){i(".btnSub").on("click",function(){c()}),i(document.body).on("keydown",function(o){13==o.keyCode&&c()})})}]);
//# sourceMappingURL=login.js.map