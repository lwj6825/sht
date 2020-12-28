// import EntryTzCq from '@/components/standingBookCq/entryTzCq'
// import SaleTzCq from '@/components/standingBookCq/saleTzCq'
// import AddEntryTzCq from '@/components/standingBookCq/addEntryTzCq'
// import imgUploadCq from '../components/standingBookCq/imgUploadCq.vue'
// import viewEntryTzCq from '../components/standingBookCq/viewEntryTzCq.vue'
// import addSaleTzCq from '../components/standingBookCq/addSaleTzCq.vue'
// import viewSaleTzCq from '../components/standingBookCq/viewSaleTzCq.vue'

export default [
    {
        path: 'standingBookCq/entryTzCq',
        component: resolve => require(['@/components/standingBookCq/entryTzCq'],resolve),
        name:"EntryTzCq",
        meta:{
            id:'614',
            node:'standingBookCq',
            url:'entryTzCq',
        }
    },
    {
        path: 'standingBookCq/saleTzCq',
        component: resolve => require(['@/components/standingBookCq/saleTzCq'],resolve),
        name:"SaleTzCq",
        meta:{
            id:'619',
            node:'standingBookCq',
            url:'saleTzCq',
        }
    },
    {
        path: 'standingBookCq/addEntryTzCq',
        component: resolve => require(['@/components/standingBookCq/addEntryTzCq'],resolve),
        name:'AddEntryTzCq',
        meta:{
            id:'615',
            node:'standingBookCq',
            url:'addEntryTzCq',
        }
    },
    {
        path: 'standingBookCq/imgUploadCq',
        component: resolve => require(['@/components/standingBookCq/imgUploadCq'],resolve),
        name:'ImgUploadCq',
        meta:{
            id:'617',
            node:'standingBookCq',
            url:'imgUploadCq',
        }
    },
    {
        path: 'standingBookCq/viewEntryTzCq',
        component: resolve => require(['@/components/standingBookCq/viewEntryTzCq'],resolve),
        name:'ViewEntryTzCq',
        meta:{
            id:'616',
            node:'standingBookCq',
            url:'viewEntryTzCq',
        }
    },
    {
        path: 'standingBookCq/addSaleTzCq',
        component: resolve => require(['@/components/standingBookCq/addSaleTzCq'],resolve),
        name:'AddSaleTzCq',
        meta:{
            id:'620',
            node:'standingBookCq',
            url:'addSaleTzCq',
        }
    },
    {
        path: 'standingBookCq/viewSaleTzCq',
        component: resolve => require(['@/components/standingBookCq/viewSaleTzCq'],resolve),
        name:'ViewSaleTzCq',
        meta:{
            id:'621',
            node:'standingBookCq',
            url:'viewSaleTzCq',
        }
    },
]
