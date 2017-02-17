module.exports = {
  development: {
    mysql: {
      cms: {
        connectionLimit: 5,
        host: '192.168.3.160',
        port: 3306,
        database: 'cms',
        user: 'dev_web',
        password: 'dev@666vcg',
        debug: ['ComQueryPacket', 'RowDataPacket']
      },
      micro_web_other: {
        connectionLimit: 5,
        host: '192.168.3.160',
        port: 3306,
        database: 'micro_web_other',
        user: 'dev_web',
        password: 'dev@666vcg',
        debug: ['ComQueryPacket', 'RowDataPacket']
      },
      micro_users_auth:{
        connectionLimit: 5,
        host: '192.168.3.160',
        port: 3306,
        database: 'micro_users_auth',
        user: 'dev_web',
        password: 'dev@666vcg',
        debug: ['ComQueryPacket', 'RowDataPacket']
      }
    },
    'Redis': {
      'RDS_HOST': '192.168.3.204',
      'RDS_PORT': 6379,
      'RDS_OPTS': {
        auth_pass: ''
      },
      'PASSWORD': '',
      'POOL': {
        'MAX_IDLE': 8,
        'MIN_IDLE': 0,
        'MAX_ACTIVE': 8,
        'MAX_WAIT': -1
      }
    },
    'javaApi': {
      "findImgById": "http://192.168.3.203:6010", //康明刚的接口地址
      'url': "http://111.200.62.68:8091", //java接口数据源接口
      'userUrl': "http://192.168.3.203:6009", //java接口用户接口
      'ucToken': "ff05f8ef2433785ec6467be1ba44e2301", //java接口取用户信息所需要的token
      'contentUrl': "http://test.edgeservice.content.vcg.com"
    }
  },
  production: {
    mysql: {
      cms: {
        connectionLimit: 5,
        host: '192.168.3.160',
        port: 3306,
        database: 'cms',
        user: 'dev_web',
        password: 'dev@666vcg'
      },
      micro_web_other: {
        connectionLimit: 5,
        host: '192.168.3.160',
        port: 3306,
        database: 'micro_web_other',
        user: 'dev_web',
        password: 'dev@666vcg'
      },
      micro_users_auth:{
        connectionLimit: 5,
        host: '192.168.3.160',
        port: 3306,
        database: 'micro_users_auth',
        user: 'dev_web',
        password: 'dev@666vcg',
        debug: ['ComQueryPacket', 'RowDataPacket']
      }
    },
    'Redis': {
      'RDS_HOST': '192.168.3.204',
      'RDS_PORT': 6379,
      'RDS_OPTS': {
        auth_pass: ''
      },
      'PASSWORD': '',
      'POOL': {
        'MAX_IDLE': 8,
        'MIN_IDLE': 0,
        'MAX_ACTIVE': 8,
        'MAX_WAIT': -1
      }
    },
    'javaApi': {
      "findImgById": "http://192.168.3.203:6010", //康明刚的接口地址
      'url': "http://111.200.62.68:8091", //java接口数据源接口
      'userUrl': "http://test.passport.content.vcg.com", //java接口用户接口
      'ucToken': "ff05f8ef2433785ec6467be1ba44e2301", //java接口取用户信息所需要的token
      'contentUrl': "http://test.edgeservice.content.vcg.com"
    }
  }
};
