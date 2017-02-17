-- admin.sql

CREATE TABLE `admin` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '自增主键',
  `nickname` varchar(20) NOT NULL DEFAULT '' COMMENT 'nickname',
  `password` varchar(50) NOT NULL DEFAULT '' COMMENT 'password',
  `mobile` varchar(11) NOT NULL DEFAULT '' COMMENT '用户手机号',
  `level` tinyint(1) unsigned NOT NULL DEFAULT '0' COMMENT '用户等级',
  `role` tinyint(1) unsigned NOT NULL DEFAULT '0' COMMENT '用户角色',
  `note` varchar(100) NOT NULL DEFAULT '' COMMENT '用户备注',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8;




INSERT INTO `admin` (`nickname`, `password`, `mobile`, `level`, `role`, `note`) VALUES (  'admin', '557b2ecb297d3d13a5cdc494a5e95f036166a45b', '13911062866', '9', '9', 'Note');



