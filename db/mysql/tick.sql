
 
CREATE TABLE `tick` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT 'costa-ltc_tick主键',
  `timestamp` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '时间戳',
  `httptime` smallint(5) unsigned NOT NULL DEFAULT '0' COMMENT 'socket接收到数据的时间差',
  `btc_buy` float(10,2) unsigned NOT NULL DEFAULT '0.00'  COMMENT 'BTC Buy 买一价',
  `btc_sell` float(10,2) unsigned NOT NULL DEFAULT '0.00'  COMMENT 'BTC Sell 卖一价',
  `btc_last` float(10,2) unsigned NOT NULL DEFAULT '0.00'  COMMENT 'BTC 成交价', 
  `ltc_buy` float(10,2) unsigned NOT NULL DEFAULT '0.00'  COMMENT 'LTC Buy 买一价',
  `ltc_sell` float(10,2) unsigned NOT NULL DEFAULT '0.00'  COMMENT 'LTC Sell 卖一价',
  `ltc_last` float(10,2) unsigned NOT NULL DEFAULT '0.00'  COMMENT 'LTC 成交价', 
  `rate` float(10,4) unsigned NOT NULL DEFAULT '0.0000' COMMENT '汇率，比特币兑换莱特币的汇率 last/last ',
  `plus` float(10,4) unsigned NOT NULL DEFAULT '0.0000' COMMENT '汇率，比特币兑换莱特币的汇率 btc_buy/ltc_sell ',
  `minus` float(10,4) unsigned NOT NULL DEFAULT '0.0000' COMMENT '汇率，比特币兑换莱特币的汇率 btc_sell/ltc_buy ',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
