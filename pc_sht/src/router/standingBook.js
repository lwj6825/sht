// import StandingBook from '@/components/standingBook/standingBook'
// import EntryTz from '@/components/standingBook/entryTz'
// import SaleTz from '@/components/standingBook/saleTz'
// import AddEntryTz from '@/components/standingBook/addEntryTz'
// import AddSaleTz from '@/components/standingBook/addSaleTz'
// import CheckTz from '@/components/standingBook/checkTz'
// import AddCheckTz from '@/components/standingBook/addCheckTz'
// import imgUpload from '../components/standingBook/imgUpload.vue'
// import viewCheckTz from '../components/standingBook/viewCheckTz.vue'
// import viewEntryTz from '../components/standingBook/viewEntryTz.vue'

export default [
    {
        path: 'standingBook/entryTz',
        component: resolve => require(['@/components/standingBook/entryTz'],resolve),
        name:"EntryTz",
        meta:{
            id:'111',
            node:'standingBook',
            url:'entryTz',
        }
    },
    {
        path: 'standingBook/saleTz',
        component: resolve => require(['@/components/standingBook/saleTz'],resolve),
        name:"SaleTz",
        meta:{
            id:'114',
            node:'standingBook',
            url:'saleTz',
        }
    },

  {
        path: 'standingBook/checkTz',
        component: resolve => require(['@/components/standingBook/checkTz'],resolve),
        name:"CheckTz",
        meta:{
            id:'208',
            node:'standingBook',
            url:'checkTz',
        }
    },
  {
        path: 'standingBook/addCheckTz',
        component: resolve => require(['@/components/standingBook/addCheckTz'],resolve),
        name:"AddCheckTz",
        meta:{
            id:'209',
            node:'standingBook',
            url:'addCheckTz',
        }
    },
    {
        path: 'standingBook/addEntryTz',
        component: resolve => require(['@/components/standingBook/addEntryTz'],resolve),
        name:'AddEntryTz',
        meta:{
            id:'112',
            node:'standingBook',
            url:'addEntryTz',
        }
    },
    {
        path: 'standingBook/addSaleTz',
        component: resolve => require(['@/components/standingBook/addSaleTz'],resolve),
        name:'AddSaleTz',
        meta:{
            id:'115',
            node:'standingBook',
            url:'addSaleTz',
        }
    },
    {
        path: 'standingBook/imgUpload',
        component: resolve => require(['@/components/standingBook/imgUpload'],resolve),
        name:'ImgUpload',
        meta:{
            id:'265',
            node:'standingBook',
            url:'imgUpload',
        }
    },
    {
        path: 'standingBook/viewCheckTz',
        component: resolve => require(['@/components/standingBook/viewCheckTz'],resolve),
        name:'ViewCheckTz',
        meta:{
            id:'446',
            node:'standingBook',
            url:'viewCheckTz',
        }
    },
    {
        path: 'standingBook/viewEntryTz',
        component: resolve => require(['@/components/standingBook/viewEntryTz'],resolve),
        name:'ViewEntryTz',
        meta:{
            id:'445',
            node:'standingBook',
            url:'viewEntryTz',
        }
    },
]
