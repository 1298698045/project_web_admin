import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/Layout'

Vue.use(Router)
export default new Router({
  // mode:'history',
  routes: [
    {
      path:'/testcomponents',
      component:()=>import('@/alert/Worklog.vue'),
      name: '测试',
        meta:{title:'测试'},
    },
    {
      path: '/login',
      component: () => import('@/views/login/index'),
        name: 'login',
        meta:{
          title:'登录',power:false
      },
    },
    {
      path: '/forgetpassword',
      component: () => import('@/views/seeting/user/view/editpassword.vue'),
        name: 'forgetpassword',
        meta:{title:'忘记密码',power:false},
    },
    {
      path: '/register',
      component: () => import('@/views/login/register.vue'),
        name: 'register',
        meta:{title:'注册',power:false},
    },
    {
      path: '/',
      name: '',
      redirect: '/work',
      component: Layout,
      children: [{
        path: 'work',
        component: () => import('@/views/projects/home/home.vue'),
        name: 'work',
        meta:{title:'你的工作',activeTopNav:'work',showleftNavbar:false},
      },{
        path: 'mycalendar',
        component: () => import('@/views/projects/personal/mycalendar.vue'),
        name: 'mycalendar',
        meta:{
          title:'个人日历',
          activeLeftNav:'work',
          activeTopNav:'work',
          showleftNavbar:true,
          onlyleftNavbarchildren:true,
          activechildrenLeftNav:'mycalendar'
        },
      },{
        path: 'daily',
        component: () => import('@/views/projects/personal/daily.vue'),
        name: 'daily',
        meta:{
          title:'日报',
          activeLeftNav:'work',
          activeTopNav:'work',
          showleftNavbar:true,
          onlyleftNavbarchildren:true,
          activechildrenLeftNav:'daily'
        },
      }
      // ,{
      //   path: 'mytask/:itemname',
      //   component: () => import('@/views/projects/filter/filter.vue'),
      //   name: 'mytask',
      //   meta:{ 
      //     title:'我的事务',
      //     activeTopNav:'work',
      //     showleftNavbar:true,
      //     activechildrenLeftNav:'firstitem',
      //     onlyleftNavbarchildren:true,
      //     activeLeftNav:'projectsfilter'
      //   },
      // }
      ,{
        path: 'mytask',
        component: () => import('@/views/projects/filter/filter.vue'),
        name: 'mytask',
        meta:{ 
          title:'我的事务',
          activeTopNav:'work',
          activeLeftNav:'work',
          showleftNavbar:true,
          onlyleftNavbarchildren:true,
          activechildrenLeftNav:'mytask'

        },
      }
    ]
    },
    {
      path: '/projects',
      name: '',
      component: Layout,
      children: [{
        path: 'board/:projectname',
        component: () => import('@/views/projects/board/index.vue'),
        name: 'Board',
        meta:{ title:'面板',activeLeftNav:'board',activeTopNav:'projects',showleftNavbar:true },
      },{
        path: 'list',
        component: () => import('@/views/projects/list/index'),
        name: 'List',
        meta:{ title:'项目列表',activeLeftNav:'list',activeTopNav:'projects',showleftNavbar:false },
      },{
        path: 'ganttchart/:projectname',
        component: () => import('@/views/projects/ganttchart/index'),
        name: 'Ganttchart',
        meta:{ title:'甘特图',activeLeftNav:'ganttchart',activeTopNav:'projects',showleftNavbar:true },
      },{
        path: 'detail/:projectname',
        component: () => import('@/views/projects/detail/detailview.vue'),
        name: 'detail',
        meta:{ title:'详情页',activeLeftNav:'detail',activeTopNav:'projects',showleftNavbar:true },
      },{
        path: 'abstract/:projectname',
        component: () => import('@/views/projects/abstract/abstract.vue'),
        name: 'abstract',
        meta:{ title:'摘要',activeLeftNav:'abstract',activeTopNav:'projects' ,showleftNavbar:true},
      },{
        path: 'calendar/:projectname',
        component: () => import('@/views/projects/calendar/calendar.vue'),
        name: 'calendar/:projectname',
        meta:{ title:'日历',activeLeftNav:'calendar',activeTopNav:'projects' ,showleftNavbar:true},
      },{
        path: 'worklist/:projectname',
        component: () => import('@/views/projects/list/worklist.vue'),
        name: 'worklist/:projectname',
        meta:{ title:'任务列表',activeLeftNav:'worklist',activeTopNav:'projects' ,showleftNavbar:true},
      },{
        path: 'filter/:projectname/:itemname',
        component: () => import('@/views/projects/filter/filter.vue'),
        name: 'filter',
        meta:{ title:'查询页',activeLeftNav:'filter',
        activeTopNav:'projects' ,
        showleftNavbar:true,
        activechildrenLeftNav:'firstitem'},
      },{
        path: 'file/:projectname',
        component: () => import('@/views/projects/file/filelist.vue'),
        name: 'filter',
        meta:{ title:'文件管理',activeLeftNav:'file',activeTopNav:'projects' ,showleftNavbar:true},
      },
      {
        path: 'seeting/:projectname',
        redirect: '/projects/seeting/:projectname/seetinginformation',
        component: () => import('@/views/projects/seeting/index.vue'),
        name: 'seeting/:projectname',
        meta:{ title:'设置页',activeLeftNav:'seeting',activeTopNav:'projects' ,showleftNavbar:true},
        children:[{
          path: 'seetinginformation',
          component: () => import('@/views/projects/seeting/information.vue'),
          name: 'seetinginformation',
          meta:{ title:'详细信息',activeLeftNav:'seeting',activechildrenLeftNav:'seetinginformation',activeTopNav:'projects',showleftNavbar:true },
        },{
          path: 'seetingboard',
          component: () => import('@/views/projects/seeting/seetingboard.vue'),
          name: 'seetingboard',
          meta:{ title:'看板',activeLeftNav:'seeting',activechildrenLeftNav:'seetingboard',activeTopNav:'projects',showleftNavbar:true },
        },{
          path: 'seetingpermission',
          component: () => import('@/views/projects/seeting/seetingpermission.vue'),
          name: 'seetingpermission',
          meta:{ title:'人员',activeLeftNav:'seeting',activechildrenLeftNav:'seetingpermission',activeTopNav:'projects',showleftNavbar:true },
        },{
          path: 'seetingnotice',
          component: () => import('@/views/projects/seeting/seetingnotice.vue'),
          name: 'seetingnotice',
          meta:{ title:'通知',activeLeftNav:'seeting',activechildrenLeftNav:'seetingnotice',activeTopNav:'projects',showleftNavbar:true },
        },]
      }]
    },
    {
      path: '/filter',
      name: '',
      component: Layout,
      children: [{
        path: 'list',
        component: () => import('@/views/filter/list/index'),
        name: 'List',
        meta:{ title:'项目列表',activeLeftNav:'list',activeTopNav:'filter',showleftNavbar:false },
      },{
        path: 'filter/:projectname/:filterid',
        component: () => import('@/views/projects/filter/filter.vue'),
        name: 'filter',
        meta:{ title:'查询页',activeLeftNav:'filter',activeTopNav:'filter',activechildrenLeftNav:'filter',showleftNavbar:true,onlyleftNavbarchildren:true },
      }]
    },
    {
      path: '/knowledgebase',
      name: '',
      component: Layout,
      children: [{
        path: 'index',
        component: () => import('@/views/knowledgebase/index.vue'),
        name: 'knowledgebase',
        meta:{title:'知识库-主页',activeTopNav:'knowledgebase',showleftNavbar:false},
      },{
        path: 'space',
        component: () => import('@/views/knowledgebase/spacelist.vue'),
        name: 'spacelist',
        meta:{title:'知识库-空间',activeTopNav:'space',showleftNavbar:false},
      },{
        path: 'articletemplate',
        component: () => import('@/views/knowledgebase/articletemplate.vue'),
        name: 'articletemplate',
        meta:{title:'知识库-模板',activeTopNav:'articletemplate',showleftNavbar:false},
      },{
        path: 'spacedetail',
        redirect: '/knowledgebase/spacedetail/spacesummary',
        component: () => import('@/views/knowledgebase/spacedetail.vue'),
        name: 'spacedetail',
        meta:{title:'知识库-空间',activeTopNav:'space',showleftNavbar:true},
        children:[{
          path: 'spacesummary',
          component: () => import('@/views/knowledgebase/summary/summary.vue'),
          name: 'spacesummary',
          meta:{title:'知识库-空间概述',activeTopNav:'space',showleftNavbar:true,activeLeftNav:'abstract'},
        },{
          path: 'spaceblog',
          component: () => import('@/views/knowledgebase/Blog/Blog.vue'),
          name: 'spaceblog',
          meta:{title:'知识库-空间博客',activeTopNav:'space',showleftNavbar:true,activeLeftNav:'spaceblog'},
        },{
          path: 'seetinginformation',
          component: () => import('@/views/knowledgebase/seeting/seetinginformation.vue'),
          name: 'seetinginformation',
          meta:{ title:'空间设置-详情',
            activeLeftNav:'spaceseeting',
            activechildrenLeftNav:'seetinginformation',
            activeTopNav:'space',
            showleftNavbar:true 
          },
        },{
          path: 'seetingpermission',
          component: () => import('@/views/knowledgebase/seeting/seetingpermission.vue'),
          name: 'seetingpermission',
          meta:{ title:'空间设置-详情',
            activeLeftNav:'spaceseeting',
            activechildrenLeftNav:'seetingpermission',
            activeTopNav:'space',
            showleftNavbar:true 
          },
        },
        {
          path: 'pagelist',
          component: () => import('@/views/knowledgebase/pagelist.vue'),
          name: 'pagelist',
          meta:{title:'知识库-页面',activeTopNav:'space',showleftNavbar:true,activeLeftNav:'spacepage',},
        }]
      }]
    },
    {
      path: '/newarticle',
      name: 'newarticle',
      component: () => import('@/components/newarticle.vue'),
    },
    {
      path: '/team',
      name: 'team',
      component: Layout,
      children:[
        {
          path: 'teamsearch',
          component: () => import('@/views/team/teamsearch.vue'),
          name: 'teamsearch',
          meta:{ 
            activeTopNav:'personnel',
            showleftNavbar:false, },
        },
        {
          path: 'teamdetail',
          component: () => import('@/views/team/teamdetail.vue'),
          name: 'teamdetail',
          meta:{ 
            activeTopNav:'personnel',
            showleftNavbar:false, },
        }
      ]
    },
    {
      path: '/people',
      name: 'people',
      component: Layout,
      children:[
        {
          path: 'information',
          component: () => import('@/views/people/information.vue'),
          name: 'information',
          meta:{ 
            activeTopNav:'personnel',
            showleftNavbar:false, },
        }
      ]
    },
    {
      path: '/seeting',
      name: 'seeting',
      component: Layout,
      children: [{
        path: 'user',
        redirect: '/seeting/user/personaldocument',
        component: () => import('@/views/seeting/user/index.vue'),
        name: 'user',
        meta:{ 
         },
         children:[{
          path: 'personaldocument',
          component: () => import('@/views/seeting/user/view/personaldocument.vue'),
          name: 'personaldocument',
          meta:{ 
            title:'个人资料',
            activeLeftNav:'userseeting',
            activechildrenLeftNav:'personaldocument',
            activeTopNav:'user',
            showleftNavbar:true,
            onlyleftNavbarchildren:true  },
        },{
          path: 'personalemail',
          component: () => import('@/views/seeting/user/view/personalemail.vue'),
          name: 'personalemail',
          meta:{
             title:'电子邮件',
             activeLeftNav:'userseeting',
             activechildrenLeftNav:'personalemail',
             activeTopNav:'user',
             showleftNavbar:true,
             onlyleftNavbarchildren:true  },
        },{
          path: 'editpassword',
          component: () => import('@/views/seeting/user/view/editpassword.vue'),
          name: 'editpassword',
          meta:{
             title:'更改密码',
             activeLeftNav:'userseeting',
             activechildrenLeftNav:'editpassword',
             activeTopNav:'user',
             showleftNavbar:true,
             onlyleftNavbarchildren:true  },
        },]
      },{
        path: 'tasksettings',
        redirect: '/seeting/tasksettings/priority',
        component: () => import('@/views/seeting/tasksettings/index.vue'),
        name: 'tasksettings',
        meta:{ 
        },
         children:[{
          path: 'priority',
          component: () => import('@/views/seeting/tasksettings/priority.vue'),
          name: 'priority',
          meta:{ 
            title:'优先级',
            activeLeftNav:'tasksettings',
            activechildrenLeftNav:'priority',
            activeTopNav:'tasksettings',
            showleftNavbar:true,
            onlyleftNavbarchildren:true  },
        },{
          path: 'state',
          component: () => import('@/views/seeting/tasksettings/state.vue'),
          name: 'state',
          meta:{ 
            title:'状态',
            activeLeftNav:'tasksettings',
            activechildrenLeftNav:' ',
            activeTopNav:'tasksettings',
            showleftNavbar:true,
            onlyleftNavbarchildren:true},
        }]
      },{
        path: 'system',
        redirect: '/seeting/system/ViewApplicationProperties',
        component: () => import('@/views/seeting/system/index.vue'),
        name: 'system',
        meta:{ 
        },
         children:[{
          path: 'ViewApplicationProperties',
          component: () => import('@/views/seeting/system/view/ViewApplicationProperties.vue'),
          name: 'ViewApplicationProperties',
          meta:{ 
            title:'常规配置',
            activeLeftNav:'systemseeting',
            activechildrenLeftNav:'ViewApplicationProperties',
            activeTopNav:'system',
            showleftNavbar:true,
            onlyleftNavbarchildren:true  },
        }]
      }]
    },
  ]
})
