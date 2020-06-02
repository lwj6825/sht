import addrCompare from '../components/compare/addrCompare.vue' // 产地对照管理
import allGood from '../components/compare/allGood.vue' // 查看全部商品
import bizCompare from '../components/compare/bizCompare.vue' // 商户对照管理
import compareList from '../components/compare/compareList.vue' // 对照管理
import defectCompare from '../components/compare/defectCompare.vue' // 缺失对照商品
import editAddrCompare from '../components/compare/editAddrCompare.vue' // 编辑产地对照管理
import editAllGood from '../components/compare/editAllGood.vue' // 编辑商品
import editBizCompare from '../components/compare/editBizCompare.vue' // 编辑商户对照管理
import editGoodCompare from '../components/compare/editGoodCompare.vue' // 编辑商品对照管理
import editNecessaries from '../components/compare/editNecessaries.vue' // 编辑生活必需品商品库管理
import editNodeCompare from '../components/compare/editNodeCompare.vue' // 编辑节点对照管理
import editNodeExtraction from '../components/compare/editNodeExtraction.vue' // 编辑价格抽取节点管理
import goodCompare from '../components/compare/goodCompare.vue' // 商品对照管理
import necessaries from '../components/compare/necessaries.vue' // 生活必需品商品库管理
import newAddrCompare from '../components/compare/newAddrCompare.vue' // 新增产地对照管理
import newBizCompare from '../components/compare/newBizCompare.vue' // 新增商户对照管理
import newGoodCompare from '../components/compare/newGoodCompare.vue' // 新增商品对照管理
import newNecessaries from '../components/compare/newNecessaries.vue' // 新增生活必需品商品库管理
import newNodeCompare from '../components/compare/newNodeCompare.vue' // 新增节点对照管理
import newNodeExtraction from '../components/compare/newNodeExtraction.vue' // 新增价格抽取节点管理
import nodeCompare from '../components/compare/nodeCompare.vue' // 节点对照管理
import nodeExtraction from '../components/compare/nodeExtraction.vue' // 价格抽取节点管理
import nodeGood from '../components/compare/nodeGood.vue' // 对照列表 点击 节点商品对照
import nodeGoodGl from '../components/compare/nodeGoodGl.vue' // 价格抽取管理  点击  节点商品对照
import priceExtraction from '../components/compare/priceExtraction.vue' // 价格抽取对照管理
import proposalGood from '../components/compare/proposalGood.vue' // 建议上报商品
import reportGood from '../components/compare/reportGood.vue' // 已上报商品
import viewNodeExtraction from '../components/compare/viewNodeExtraction.vue' // 查看价格抽取节点管理
import viewNodeGood from '../components/compare/viewNodeGood.vue' // 节点商品对照  查看明细
import viewtAllGood from '../components/compare/viewtAllGood.vue' // 查看明细
import warningGood from '../components/compare/warningGood.vue' // 预警商品

export default [
    { 
        path: 'compare/addrCompare',
        component: resolve => require(['@/components/compare/addrCompare'],resolve),
        name:'AddrCompare',
        meta:{
            id:'527',
            node:'compare',
            url:'addrCompare',
        }
    },
    { 
        path: 'compare/allGood',
        component: resolve => require(['@/components/compare/allGood'],resolve),
        name:'AllGood',
        meta:{
            id:'540',
            node:'compare',
            url:'allGood',
        }
    },
    { 
        path: 'compare/bizCompare',
        component: resolve => require(['@/components/compare/bizCompare'],resolve),
        name:'BizCompare',
        meta:{
            id:'521',
            node:'compare',
            url:'bizCompare',
        }
    },
    { 
        path: 'compare/compareList',
        component: resolve => require(['@/components/compare/compareList'],resolve),
        name:'CompareList',
        meta:{
            id:'514',
            node:'compare',
            url:'compareList',
        }
    },
    { 
        path: 'compare/defectCompare',
        component: resolve => require(['@/components/compare/defectCompare'],resolve),
        name:'DefectCompare',
        meta:{
            id:'518',
            node:'compare',
            url:'defectCompare',
        }
    },
    { 
        path: 'compare/editAddrCompare',
        component: resolve => require(['@/components/compare/editAddrCompare'],resolve),
        name:'EditAddrCompare',
        meta:{
            id:'529',
            node:'compare',
            url:'editAddrCompare',
        }
    },
    { 
        path: 'compare/editAllGood',
        component: resolve => require(['@/components/compare/editAllGood'],resolve),
        name:'EditAllGood',
        meta:{
            id:'541',
            node:'compare',
            url:'editAllGood',
        }
    },
    { 
        path: 'compare/editBizCompare',
        component: resolve => require(['@/components/compare/editBizCompare'],resolve),
        name:'EditBizCompare',
        meta:{
            id:'523',
            node:'compare',
            url:'editBizCompare',
        }
    },
    { 
        path: 'compare/editGoodCompare',
        component: resolve => require(['@/components/compare/editGoodCompare'],resolve),
        name:'EditGoodCompare',
        meta:{
            id:'517',
            node:'compare',
            url:'editGoodCompare',
        }
    },
    { 
        path: 'compare/editNecessaries',
        component: resolve => require(['@/components/compare/editNecessaries'],resolve),
        name:'EditNecessaries',
        meta:{
            id:'534',
            node:'compare',
            url:'editNecessaries',
        }
    },
    { 
        path: 'compare/editNodeCompare',
        component: resolve => require(['@/components/compare/editNodeCompare'],resolve),
        name:'EditNodeCompare',
        meta:{
            id:'526',
            node:'compare',
            url:'editNodeCompare',
        }
    },
    { 
        path: 'compare/editNodeExtraction',
        component: resolve => require(['@/components/compare/editNodeExtraction'],resolve),
        name:'EditNodeExtraction',
        meta:{
            id:'537',
            node:'compare',
            url:'editNodeExtraction',
        }
    },
    { 
        path: 'compare/goodCompare',
        component: resolve => require(['@/components/compare/goodCompare'],resolve),
        name:'GoodCompare',
        meta:{
            id:'515',
            node:'compare',
            url:'goodCompare',
        }
    },
    { 
        path: 'compare/necessaries',
        component: resolve => require(['@/components/compare/necessaries'],resolve),
        name:'Necessaries',
        meta:{
            id:'532',
            node:'compare',
            url:'necessaries',
        }
    },
    { 
        path: 'compare/newAddrCompare',
        component: resolve => require(['@/components/compare/newAddrCompare'],resolve),
        name:'NewAddrCompare',
        meta:{
            id:'528',
            node:'compare',
            url:'newAddrCompare',
        }
    },
    { 
        path: 'compare/newBizCompare',
        component: resolve => require(['@/components/compare/newBizCompare'],resolve),
        name:'NewBizCompare',
        meta:{
            id:'522',
            node:'compare',
            url:'newBizCompare',
        }
    },
    { 
        path: 'compare/newGoodCompare',
        component: resolve => require(['@/components/compare/newGoodCompare'],resolve),
        name:'NewGoodCompare',
        meta:{
            id:'516',
            node:'compare',
            url:'newGoodCompare',
        }
    },
    { 
        path: 'compare/newNecessaries',
        component: resolve => require(['@/components/compare/newNecessaries'],resolve),
        name:'NewNecessaries',
        meta:{
            id:'533',
            node:'compare',
            url:'newNecessaries',
        }
    },
    { 
        path: 'compare/newNodeCompare',
        component: resolve => require(['@/components/compare/newNodeCompare'],resolve),
        name:'NewNodeCompare',
        meta:{
            id:'525',
            node:'compare',
            url:'newNodeCompare',
        }
    },
    { 
        path: 'compare/newNodeExtraction',
        component: resolve => require(['@/components/compare/newNodeExtraction'],resolve),
        name:'NewNodeExtraction',
        meta:{
            id:'536',
            node:'compare',
            url:'newNodeExtraction',
        }
    },
    { 
        path: 'compare/nodeCompare',
        component: resolve => require(['@/components/compare/nodeCompare'],resolve),
        name:'NodeCompare',
        meta:{
            id:'524',
            node:'compare',
            url:'nodeCompare',
        }
    },
    { 
        path: 'compare/nodeExtraction',
        component: resolve => require(['@/components/compare/nodeExtraction'],resolve),
        name:'NodeExtraction',
        meta:{
            id:'535',
            node:'compare',
            url:'nodeExtraction',
        }
    },
    { 
        path: 'compare/nodeGood',
        component: resolve => require(['@/components/compare/nodeGood'],resolve),
        name:'NodeGood',
        meta:{
            id:'519',
            node:'compare',
            url:'nodeGood',
        }
    },
    { 
        path: 'compare/nodeGoodGl',
        component: resolve => require(['@/components/compare/nodeGoodGl'],resolve),
        name:'NodeGoodGl',
        meta:{
            id:'539',
            node:'compare',
            url:'nodeGoodGl',
        }
    },
    { 
        path: 'compare/priceExtraction',
        component: resolve => require(['@/components/compare/priceExtraction'],resolve),
        name:'PriceExtraction',
        meta:{
            id:'530',
            node:'compare',
            url:'priceExtraction',
        }
    },
    { 
        path: 'compare/proposalGood',
        component: resolve => require(['@/components/compare/proposalGood'],resolve),
        name:'ProposalGood',
        meta:{
            id:'544',
            node:'compare',
            url:'proposalGood',
        }
    },
    { 
        path: 'compare/reportGood',
        component: resolve => require(['@/components/compare/reportGood'],resolve),
        name:'ReportGood',
        meta:{
            id:'542',
            node:'compare',
            url:'reportGood',
        }
    },
    { 
        path: 'compare/viewNodeExtraction',
        component: resolve => require(['@/components/compare/viewNodeExtraction'],resolve),
        name:'ViewNodeExtraction',
        meta:{
            id:'538',
            node:'compare',
            url:'viewNodeExtraction',
        }
    },
    { 
        path: 'compare/viewNodeGood',
        component: resolve => require(['@/components/compare/viewNodeGood'],resolve),
        name:'ViewNodeGood',
        meta:{
            id:'520',
            node:'compare',
            url:'viewNodeGood',
        }
    },
    { 
        path: 'compare/viewtAllGood',
        component: resolve => require(['@/components/compare/viewtAllGood'],resolve),
        name:'ViewtAllGood',
        meta:{
            id:'543',
            node:'compare',
            url:'viewtAllGood',
        }
    },
    { 
        path: 'compare/warningGood',
        component: resolve => require(['@/components/compare/warningGood'],resolve),
        name:'WarningGood',
        meta:{
            id:'545',
            node:'compare',
            url:'warningGood',
        }
    },
]