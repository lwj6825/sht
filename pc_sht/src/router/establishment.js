// import establishmentList from '../components/establishment/establishmentList.vue'

export default [
    { 
        path: 'establishment/establishmentList', 
        component: resolve => require(['@/components/establishment/establishmentList'],resolve),
        name:'EstablishmentList',
        meta:{
            id:'593',
            node:'establishment',
            url:'establishmentList',
        }
    },
]
