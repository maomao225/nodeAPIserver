
CREATE TABLE `chip` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '主键',
  `timestamp` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '时间戳',
  `auth` tinyint(2) unsigned NOT NULL DEFAULT '0' COMMENT '交易执行者, 1=机器，2=人工',
  `mode` tinyint(2) unsigned DEFAULT '0' COMMENT '生成交易的指令模型，1=人工操作 2=追涨 diff，3=杀跌 bala，4=斩仓 repa， 5=未知模型',
  `type` tinyint(2) unsigned NOT NULL DEFAULT '0' COMMENT '交易类型,1=buy,2=sell',
  `market_code` tinyint(2) unsigned NOT NULL DEFAULT '0' COMMENT '交易 市场代码,1=okcoin,2=huobi，3=btcchina',
  `coin_type_code` tinyint(2) unsigned NOT NULL DEFAULT '0' COMMENT '交易币种类型,1=btc,2=ltc',
  `amount` float(10,4) unsigned NOT NULL DEFAULT '0.0000' COMMENT '交易数量',
  `price` float(10,4) unsigned NOT NULL DEFAULT '0.0000' COMMENT '交易价格',
  `money` float(10,4) unsigned NOT NULL DEFAULT '0.0000' COMMENT '交易总金额',
  `order_id` bigint(18) unsigned NOT NULL DEFAULT '0' COMMENT '交易order_ID',
  `final_amount` float(10,4) unsigned NOT NULL DEFAULT '0.0000' COMMENT '最总成交数量',
  `final_price` float(10,4) unsigned NOT NULL DEFAULT '0.0000' COMMENT '最终成交价格',
  `final_money` float(10,4) unsigned NOT NULL DEFAULT '0.0000' COMMENT '最终成交额度',
  `net` float(10,4) unsigned NOT NULL DEFAULT '0.0000' COMMENT '当前净资产',
  `update_time` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '更新时间',
  `status` tinyint(2) unsigned NOT NULL DEFAULT '0' COMMENT '状态子码 0=初次插入数据，1==完全成交，2=部分成交，3=完全没有成交，4=部分扯单，5=全部扯单',
  `is_final` tinyint(2) unsigned NOT NULL DEFAULT '1' COMMENT '标记本条是否已经更新存档的记录， 0=全部，1=尚未存档， 2=已经存档',
  PRIMARY KEY (`id`),
  KEY `chip_index_order_id` (`order_id`) USING HASH
) ENGINE=InnoDB  DEFAULT CHARSET=utf8;


INSERT INTO chip ( timestamp, auth, mode, type, market_code, coin_type_code, amount, price, money, order_id ) VALUES(1483893319,2
,1,1,1,1,0.015,5500.25,55.0025,7880504004)


ALTER TABLE `chip` CHANGE `order_id` `order_id` BIGINT(18) UNSIGNED NOT NULL DEFAULT '0' COMMENT '交易order_ID';


--添加一个最终实际成交汇率的的标记
ALTER TABLE `chip` ADD `rate` FLOAT(10,4) UNSIGNED NOT NULL DEFAULT '0.0000' COMMENT '最终实际成交的汇率' AFTER `final_money`;


--把rate改为当前净资产
ALTER TABLE `chip` CHANGE `rate` `net` FLOAT(10,4) UNSIGNED NOT NULL DEFAULT '0.0000' COMMENT '当前净资产';