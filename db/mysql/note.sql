-- note.sql

CREATE TABLE `note` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '自增主键',
  `timestamp` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '单条记录的时间戳',
  `type` tinyint(1) NOT NULL DEFAULT '0' COMMENT 'note信息类型0=all,1=system[begin-init],2=note,3=noticelog,4=watchReach,5=socket,6=mysql,7=other,8=error,9=unknow',
  `level` tinyint(1) NOT NULL DEFAULT '0' COMMENT 'level信息等级0=all,',
  `title` varchar(200) NOT NULL DEFAULT '' COMMENT 'title信息',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='备注信息数据表';