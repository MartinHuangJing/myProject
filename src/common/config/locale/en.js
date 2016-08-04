'use strict';

export default {
  validate_required: "{name} 不能为空",
  SUCCESS:[200,'操作成功'],
  LIMIT:[1000,'非法登陆'],
  ACCOUNT_ERROR:[1001,"用户名或密码错误"],
  ACCOUNT_EMPTY:[1002,"账号密码不能为空"],
  PURVIEW_ERROR:[1003,"用户权限错误"],
  LOGIN_ERROR:[1004,"登陆信息失效"],
  PARSE_ERROR:[1005,"参数错误"],
};
