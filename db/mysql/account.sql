-- CREATE TABLE `account` (
--   `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT 'Info=AccountInfo_账户信息-id主键Primary-key',
--   `timestamp` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '单条记录的时间戳',
--   `httptime` smallint(5) unsigned NOT NULL DEFAULT '0' COMMENT '账户信息数据请求总时间',
--   `last` float(10,2) unsigned NOT NULL DEFAULT '0.00' COMMENT '最新成交价',
--   `total` float(10,2) unsigned NOT NULL DEFAULT '0.00' COMMENT '账户总资产',
--   `net` float(10,2) unsigned NOT NULL DEFAULT '0.00' COMMENT '账户净资产',
--   `rmb` float(10,2) unsigned NOT NULL DEFAULT '0.00' COMMENT '账户RMB数量',
--   `btc` float(10,4) unsigned NOT NULL DEFAULT '0.0000' COMMENT '账户BTC数量',
--   `ltc` float(10,4) unsigned NOT NULL DEFAULT '0.0000' COMMENT '账户LTC数量',
--   `frmb` float(10,2) unsigned NOT NULL DEFAULT '0.00' COMMENT '冻结RMB数量',
--   `fbtc` float(10,4) unsigned NOT NULL DEFAULT '0.0000' COMMENT '冻结BTC数量',
--   `fltc` float(10,4) unsigned NOT NULL DEFAULT '0.0000' COMMENT '冻结LTC数量',
--   `lrmb` float(10,2) unsigned NOT NULL DEFAULT '0.00' COMMENT '借款RMB数量',
--   `lbtc` float(10,4) unsigned NOT NULL DEFAULT '0.0000' COMMENT '借款BTC数量',
--   `lltc` float(10,4) unsigned NOT NULL DEFAULT '0.0000' COMMENT '借款LTC数量',
--   `profit` float(10,4) NOT NULL DEFAULT '0.0000' COMMENT '当前净利润 profit',
--   `rate` float(10,4) NOT NULL DEFAULT '0.0000' COMMENT '比上一天的环比增加值 百分比%',
--   `type` tinyint(2) unsigned NOT NULL DEFAULT '0' COMMENT '记录类型,0=全部，1=按10分钟，2=按小时，3=按每6小时，4=按天 ， 5按每周周日零点 ',
--   PRIMARY KEY (`id`)
-- ) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `account` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT 'Info=AccountInfo_账户信息-id主键Primary-key',
  `timestamp` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '单条记录的时间戳',
  `httptime` smallint(5) unsigned NOT NULL DEFAULT '0' COMMENT '账户信息数据请求总时间',
  `btc_last` float(10,2) unsigned NOT NULL DEFAULT '0.00' COMMENT 'BTC 最新成交价',
  `ltc_last` float(10,2) unsigned NOT NULL DEFAULT '0.00' COMMENT 'LTC 最新成交价',
  `total` float(10,2) unsigned NOT NULL DEFAULT '0.00' COMMENT '账户总资产',
  `net` float(10,2) unsigned NOT NULL DEFAULT '0.00' COMMENT '账户净资产',
  `rmb` float(10,2) unsigned NOT NULL DEFAULT '0.00' COMMENT '账户RMB数量',
  `btc` float(10,4) unsigned NOT NULL DEFAULT '0.0000' COMMENT '账户BTC数量',
  `ltc` float(10,4) unsigned NOT NULL DEFAULT '0.0000' COMMENT '账户LTC数量',
  `frmb` float(10,2) unsigned NOT NULL DEFAULT '0.00' COMMENT '冻结RMB数量',
  `fbtc` float(10,4) unsigned NOT NULL DEFAULT '0.0000' COMMENT '冻结BTC数量',
  `fltc` float(10,4) unsigned NOT NULL DEFAULT '0.0000' COMMENT '冻结LTC数量',
  `lrmb` float(10,2) unsigned NOT NULL DEFAULT '0.00' COMMENT '借款RMB数量',
  `lbtc` float(10,4) unsigned NOT NULL DEFAULT '0.0000' COMMENT '借款BTC数量',
  `lltc` float(10,4) unsigned NOT NULL DEFAULT '0.0000' COMMENT '借款LTC数量',
  `type` tinyint(2) unsigned NOT NULL DEFAULT '0' COMMENT '记录类型,0=全部，1=按1分钟， 2=按10分钟，3=按小时，4=按每4小时，5=按天 ， 6按每周周日零点 , 7 启动',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;