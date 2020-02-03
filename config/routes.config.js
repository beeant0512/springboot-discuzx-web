export default [
  {
    path: '/user',
    component: '../layouts/UserLayout',
    routes: [
      {
        name: 'login',
        path: '/user/login',
        component: './user/login',
      },
    ],
  },
  {
    path: '/',
    redirect: '/admin',
  },
  {
    path: '/admin',
    component: '../layouts/SecurityLayout',
    routes: [
      {
        path: '/admin',
        component: '../layouts/BasicLayout',
        routes: [
          {
            path: '/admin',
            redirect: '/admin/welcome',
          },
          {
            path: '/admin/welcome',
            name: '首页',
            component: './admin/index',
          },
          {
            path: '/admin/setting',
            name: '全局',
            routes: [
              {
                path: '/admin/setting/basic',
                name: '站点信息',
                component: './admin/setting/basic',
              },
              {
                path: '/admin/setting/access',
                name: '注册与访问控制',
                component: './admin/setting/access',
              },
            ]
          },
          {
            path: '/admin/nav',
            name: '界面',
            component: './admin/index',
          },
          {
            path: '/admin/moderate',
            name: '内容',
            component: './admin/index',
          },
          {
            path: '/admin/members',
            name: '用户',
            component: './admin/index',
          },
          {
            path: '/admin/portalcategory',
            name: '门户',
            component: './admin/index',
          },
          {
            path: '/admin/forums',
            name: '论坛',
            component: './admin/index',
          },
          {
            path: '/admin/group',
            name: '群组',
            component: './admin/index',
          },
          {
            path: '/admin/sec',
            name: '防灌水',
            component: './admin/index',
          },
          {
            path: '/admin/announce',
            name: '运营',
            component: './admin/index',
          },
          {
            path: '/admin/plugins',
            name: '应用',
            component: './admin/index',
          },
          {
            path: '/admin/tools',
            name: '工具',
            component: './admin/index',
          },
          {
            path: '/admin/founder',
            name: '站长',
            component: './admin/index',
          },
          {
            component: './404',
          },
        ],
      },
      {
        component: './404',
      },
    ],
  },
  {
    component: './404',
  },
]
