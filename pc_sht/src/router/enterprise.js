import enterprise from '../components/enterprise/enterprise.vue'
import enterpriseMsg from '../components/enterprise/enterpriseMsg.vue'
import newEnterprise from '../components/enterprise/newEnterprise.vue'

export default [
    {
        path: 'enterprise/enterprise',
        component: resolve => require(['@/components/enterprise/enterprise'],resolve),
        name:"Enterprise",
        meta:{
            id:'466',
            node:'enterprise',
            url:'enterprise',
        }
    },
    {
        path: 'enterprise/enterpriseMsg',
        component: resolve => require(['@/components/enterprise/enterpriseMsg'],resolve),
        name:"EnterpriseMsg",
        meta:{
            id:'468',
            node:'enterprise',
            url:'enterpriseMsg',
        }
    },
    {
        path: 'enterprise/newEnterprise',
        component: resolve => require(['@/components/enterprise/newEnterprise'],resolve),
        name:"NewEnterprise",
        meta:{
            // id:'390',
            node:'enterprise',
            url:'newEnterprise',
        }
    },
]