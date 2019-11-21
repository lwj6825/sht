const menu = [
//     {
//       id:'10',
//       name:'用户',
//       url:'user',
//       node:'user',
//       icon:'icon-tongji',
//       level:1,
//       children:{
//           nav_title:'用户管理',
//           nodeList:[
//               {
//                   id:'1000',
//                   parentId:'10',
//                   name:'用户列表',
//                   type:'',
//                   node:'user',
//                   level:2,
//                   children:{
//                       nodeList:[
//                           {
//                               id:'100000',
//                               parentId:'1000',
//                               name:'用户列表',
//                               url:'userList',
//                               node:'user',
//                               level:3,
//                               children:{
//                                   nodeList:[
//                                       {
//                                           id:'10000000',
//                                           parentId:'100000',
//                                           name:'新建用户',
//                                           url:'addUser',
//                                           node:'user',
//                                           level:4,
//                                           children:{
//                                               nodeList:[]
//                                           }
//                                       },
//                                       {
//                                           id:'10000001',
//                                           parentId:'100000',
//                                           name:'查看',
//                                           url:'lookInfo',
//                                           node:'user',
//                                           level:4,
//                                           children:{
//                                               nodeList:[]
//                                           }
//                                       }
//                                   ]
//                               }
//                           }
//                       ]
//                   }
//               }
//           ]
//       }
//   },
//   {
//       id:'11',
//       name:'角色',
//       url:'role',
//       node:'role',
//       icon:'icon-tongji',
//       level:1,
//       children:{
//           nav_title:'角色管理',
//           id:'1100',
//           parentId:'11',
//           node:"role",
//           url:'roleManagement',
//           level:2,
//           nodeList:[
//               {
//                   id:'110000',
//                   parentId:'1100',
//                   name:'创建角色',
//                   node:'role',
//                   url:'editRole',
//                   level:3,
//                   children:{
//                       nodeList:[]
//                   }
//               },
//               {
//                   id:'110001',
//                   parentId:'1100',
//                   name:'编辑',
//                   node:'role',
//                   url:'editRole',
//                   level:3,
//                   children:{
//                       nodeList:[]
//                   }
//               },
//           ]
//       }
//   },
//   {
//       id:'12',
//       name:'功能',
//       url:'fun',
//       node:'fun',
//       icon:'icon-tongji',
//       level:1,
//       children:{
//           nav_title:'功能管理',
//           id:'1200',
//           parentId:'12',
//           node:"fun",
//           url:'funManagement',
//           level:2,
//           nodeList:[
//               {
//                   id:'120000',
//                   parentId:'1200',
//                   name:'新增功能模块',
//                   node:'fun',
//                   url:'editFun',
//                   level:3,
//                   children:{
//                       nodeList:[]
//                   }
//               },
//               {
//                   id:'120001',
//                   parentId:'1200',
//                   name:'编辑',
//                   node:'fun',
//                   url:'editFun',
//                   level:3,
//                   children:{
//                       nodeList:[]
//                   }
//               },
//           ]
//       }
//   },
  {
    id:'20',
    name:'报修',
    url:'repair',
    node:'repair',
    icon:'icon-tongji',
    level:1,
    children:{
        nodeList:[
              {
                id:'2000',
                parentId:'20',
                name:'报修管理',
                url:'repairMsg',
                node:'repair',
                level:2,
                children:{
                   nodeList:[
                      {
                        id:'02000101',
                        parentId:'2000',
                        name:'查看报修任务',
                        url:'repairTask',
                        node:'repair',
                        level:3,
                      }
                   ]
                }
              },
        ],
    }
  },
  {
    id:'01',
    name:'统计',
    url:'statistical',
    node:'statistical',
    icon:'icon-tongji',
    level:1,
    shop_name:'水屯批发市场',
    children:{
        nodeList:[
              {
                id:'02000101',
                parentId:'010000',
                name:'交易额',
                url:'totalTransaction',
                node:'statistical',
                level:3,
              },
        ],
        nodeList:[
              {
                id:'02000102',
                parentId:'010000',
                name:'商品交易额',
                url:'commodityMoney',
                node:'statistical',
                level:3,
              },
        ],
        nodeList:[
              {
                id:'02000103',
                parentId:'010000',
                name:'商户交易额',
                url:'merchantMoney',
                node:'statistical',
                level:3,
              },
        ],
        nodeList:[
            {
              id:'02000104',
              parentId:'010000',
              name:'销售台账',
              url:'statisticalTz',
              node:'statistical',
              level:3,
            },
      ]
    }
  },
  {
    id:'02',
    name:'台账',
    url:'standingBook',
    node:'standingBook',
    icon:'icon-taizhang',
    level:1,
    children:{
      nav_title:'台账管理',
      nodeList:[
        {
          id:'0200',
          parentId:'02',
          name:'进货台账',
          type:'进货管理',
          node:'standingBook',
          level:2,
          children:{
            nodeList:[
              {
                id:'020000',
                parentId:'0200',
                name:'进货台账',
                url:'entryTz',
                node:'standingBook',
                level:3,
                children:{
                  nodeList:[
                    {
                      id:'02000100',
                      parentId:'020000',
                      name:'新增进货台账',
                      url:'addEntryTz',
                      node:'standingBook',
                      level:4,
                    },
                    // {
                    //     id:'02000101',
                    //     parentId:'020000',
                    //     name:'查看',
                    //     url:'addEntryTz',
                    //     node:'standingBook',
                    //     level:4,
                    // },
                  ]
                }
              }
            ]
          }
        },
        {
          id:'0201',
          parentId:'02',
          name:'销售台账',
          type:'销售管理',
          node:'standingBook',
          level:2,
          children:{
            nodeList:[
              {
                id:'020100',
                parentId:'0201',
                name:'销售台账',
                url:'saleTz',
                node:'standingBook',
                level:3,
                children:{
                  nodeList:[
                    {
                      id:'02010000',
                      parentId:'020100',
                      name:'新增销售台账',
                      url:'',
                      node:'standingBook',
                      level:4,
                    },
                  ]
                }
              }
            ]
          }
        },
        {
          id:'0202',
          parentId:'02',
          name:'检测信息',
          type:'检测管理',
          node:'standingBook',
          level:2,
          children:{
            nodeList:[
              {
                id:'020200',
                parentId:'0202',
                name:'检测信息',
                url:'checkTz',
                node:'standingBook',
                level:3,
                children:{
                  nodeList:[
                    {
                      id:'02020000',
                      parentId:'020200',
                      name:'新增检测信息',
                      url:'addCheckTz',
                      node:'standingBook',
                      level:4,
                    },
                  ]
                }
              }
            ]
          }
        }
      ]
    }
  },
  {
    id:'03',
    name:'订单',
    url:'order',
    node:'order',
    icon:'icon-order',
    level:1,
  },
  {
    id:'04',
    name:'管理',
    url:'management',
    node:'management',
    icon:'icon-guanli',
    level:1,
    children:{
      nav_title:'联系人管理',
      nodeList:[
        {
          id:'0400',
          parentId:'04',
          name:'商户列表',
          type:'商户管理',
          node:'management',
          level:2,
          children:{
            nodeList:[
              {
                id:'040000',
                parentId:'0400',
                name:'商户管理',
                url:'merchantsMgm',
                node:'management',
                level:3,
                children:{
                  nodeList:[
                    {
                      id:'04000000',
                      parentId:'040000',
                      name:'新增商户',
                      url:'newCommodity',
                      node:'management',
                      level:4,
                    },
                    {
                      id:'04000001',
                      parentId:'040000',
                      name:'管理供应商',
                      url:'manageSuppliers',
                      node:'management',
                      level:4,
                    },
                    {
                      id:'04000002',
                      parentId:'040000',
                      name:'管理商品',
                      url:'manageGoods',
                      node:'management',
                      level:4,
                    },
                    {
                      id:'04000003',
                      parentId:'040000',
                      name:'详情',
                      url:'merchantsInfor',
                      node:'management',
                      level:4,
                    }
                  ]
                }
              }
            ]
          }
        },
        {
          id:'0401',
          parentId:'04',
          name:'邀请商户',
          type:'商户管理',
          node:'management',
          level:2,
          children:{
            nodeList:[
              {
                id:'040100',
                parentId:'0401',
                name:'邀请商户',
                url:'invitationMerchants',
                node:'management',
                level:3,
                children:{
                  nodeList:[]
                }
              }
            ]
          }
        },
        {
          id:'0402',
          parentId:'04',
          name:'供应商管理',
          type:'联系人管理',
          node:'management',
          level:2,
          children:{
            nodeList:[
              {
                id:'040200',
                parentId:'0402',
                name:'供应商管理',
                url:'supplierMgm',
                node:'management',
                level:3,
                children:{
                  nodeList:[
                    {
                      id:'04020000',
                      parentId:'040200',
                      name:'新增供应商',
                      url:'newSupplier',
                      node:'management',
                      level:4,
                    },
                    {
                      id:'04020001',
                      parentId:'040200',
                      name:'查看',
                      url:'newSupplier',
                      node:'management',
                      level:4,
                    },
                    {
                      id:'04020002',
                      parentId:'040200',
                      name:'修改',
                      url:'editSupplier',
                      node:'management',
                      level:4,
                    },
                  ]
                }
              }
            ]
          }
        },
        {
          id:'0403',
          parentId:'04',
          name:'客户管理',
          type:'联系人管理',
          node:'management',
          level:2,
          children:{
            nodeList:[
              {
                id:'040300',
                parentId:'0403',
                name:'客户管理',
                url:'clientMgm',
                node:'management',
                level:3,
                children:{
                  nodeList:[
                    {
                      id:'04030000',
                      parentId:'040300',
                      name:'新增客户',
                      url:'newClient',
                      node:'management',
                      level:4,
                    },
                    {
                      id:'04030001',
                      parentId:'040300',
                      name:'查看',
                      url:'viewClient',
                      node:'management',
                      level:4,
                    },
                    {
                      id:'04030002',
                      parentId:'040300',
                      name:'修改',
                      url:'editClient',
                      node:'management',
                      level:4,
                    },
                  ]
                }
              }
            ]
          }
        },
      ],
    }
  },
  {
    id:'05',
    name:'商品',
    url:'goods',
    node:'goods',
    icon:'icon-goods',
    level:1,
    children:{
      nav_title:'商品管理',
      nodeList:[
        {
          id:'0500',
          parentId:'05',
          name:'进货商品',
          node:'goods',
          level:2,
          children:{
            nodeList:[
              {
                id:'050000',
                parentId:'0500',
                name:'进货商品',
                url:'stocks',
                node:'goods',
                level:3,
                children:{
                  nodeList:[
                    {
                      id:'05000000',
                      parentId:'050000',
                      name:'新增进货商品',
                      url:'editStocks',
                      node:'goods',
                      level:4,
                    },
                    {
                      id:'05000001',
                      parentId:'050000',
                      name:'查看',
                      url:'viewStocks',
                      node:'goods',
                      level:4,
                    },
                    {
                      id:'05000002',
                      parentId:'050000',
                      name:'编辑',
                      url:'editStocks',
                      node:'goods',
                      level:4,
                    },
                  ]
                }
              },
            ]
          }
        },
        {
          id:'0501',
          parentId:'05',
          name:'销售商品',
          node:'goods',
          level:2,
          children:{
            nodeList:[
              {
                id:'050100',
                parentId:'0501',
                name:'销售商品',
                url:'market',
                node:'goods',
                level:3,
                children:{
                  nodeList:[
                    {
                      id:'05010000',
                      parentId:'050100',
                      name:'新增进货商品',
                      url:'market',
                      node:'goods',
                      level:4,
                    },
                    {
                      id:'05010001',
                      parentId:'050100',
                      name:'查看',
                      url:'viewMarket',
                      node:'goods',
                      level:4,
                    },
                    {
                      id:'05010002',
                      parentId:'050100',
                      name:'编辑',
                      url:'editMarket',
                      node:'goods',
                      level:4,
                    },
                  ]
                }
              },
            ]
          }
        },
      ]
    }
  },
  {
    id:'06',
    name:'设置',
    url:'settings',
    node:'settings',
    icon:'icon-setings',
    level:1,
    children:{
      nav_title:'设置中心',
      nodeList:[
        {
          id:'0600',
          parentId:'06',
          name:'企业信息',
          node:'settings',
          type:'企业设置',
          level:2,
          children:{
            nodeList:[
              {
                id:'060000',
                parentId:'0600',
                name:'企业信息',
                url:'enterpriseInfo',
                node:'settings',
                level:3,
                children:{
                  nodeList:[]
                }
              },
            ]
          }
        },
        {
          id:'0601',
          parentId:'06',
          name:'账号设置',
          node:'settings',
          type:'企业设置',
          level:2,
          children:{
            nodeList:[
              {
                id:'060100',
                parentId:'0601',
                name:'账号设置',
                url:'accountSeting',
                node:'settings',
                level:3,
                children:{
                  nodeList:[]
                }
              },
            ]
          }
        },
        {
          id:'0602',
          parentId:'06',
          name:'员工设置',
          node:'settings',
          type:'企业设置',
          level:2,
          children:{
            nodeList:[
              {
                id:'060200',
                parentId:'0602',
                name:'员工设置',
                url:'workersSeting',
                node:'settings',
                level:3,
                children:{
                  nodeList:[]
                }
              },
              {
                id:'060201',
                parentId:'0602',
                name:'角色权限',
                url:'',
                node:'settings',
                level:3,
                children:{
                  nodeList:[]
                }
              },
              {
                id:'060202',
                parentId:'0602',
                name:'待定邀请',
                url:'',
                node:'settings',
                level:3,
                children:{
                  nodeList:[]
                }
              },
            ]
          }
        },
        {
          id:'0603',
          parentId:'06',
          name:'自定义设置',
          type:'基础信息设置',
          node:'settings',
          level:2,
          children:{
            nodeList:[
              {
                id:'060300',
                parentId:'0603',
                name:'商品类型',
                url:'customSeting',
                node:'settings',
                level:3,
                children:{
                  nodeList:[]
                }
              },
              {
                id:'060301',
                parentId:'0603',
                name:'台账类型',
                url:'standingBookMsg',
                node:'settings',
                level:3,
                children:{
                  nodeList:[
                    {
                      id:'06030200',
                      parentId:'060301',
                      name:'编辑进货台账',
                      url:'editEntryTz',
                      node:'settings',
                      level:4,
                      children:{
                        nodeList:[]
                      }
                    },
                    {
                      id:'06030301',
                      parentId:'060301',
                      name:'编辑销售台账',
                      url:'editSaleTz',
                      node:'settings',
                      level:4,
                      children:{
                        nodeList:[]
                      }
                    },
                  ]
                }
              },
            ]
          }
        },
        {
          id:'0604',
          parentId:'06',
          name:'摊位管理',
          node:'settings',
          type:'基础信息设置',
          level:2,
          children:{
            nodeList:[
              {
                id:'060400',
                parentId:'0604',
                name:'摊位管理',
                url:'boothManagement',
                node:'settings',
                level:3,
                children:{
                  nodeList:[]
                }
              },
            ]
          }
        },
        {
          id:'0605',
          parentId:'06',
          name:'设备管理',
          node:'settings',
          type:'基础信息设置',
          level:2,
          children:{
            nodeList:[
              {
                id:'060500',
                parentId:'0605',
                name:'设备管理',
                url:'equipmentMsg',
                node:'settings',
                level:3,
                children:{
                  nodeList:[]
                }
              },
              {
                id:'060501',
                parentId:'0605',
                name:'新增设备信息',
                url:'equipmentMsg',
                node:'settings',
                level:3,
                children:{
                  nodeList:[]
                }
              },
            ]
          }
        }
      ]
    }
  },
  {
    id:'07',
    name:'区域',
    url:'district',
    node:'district',
    icon:'icon-setings',
    level:1,
    children:{
      nav_title:'市场区域管理',
      id:'0700',
      parentId:'07',
      node:"district",
      url:'market',
      level:2,
      nodeList:[
        {
          id:'070000',
          parentId:'0700',
          name:'新增市场区域',
          node:'district',
          url:'addMarket',
          level:3,
          children:{
            nodeList:[]
          }
        },
        {
          id:'070001',
          parentId:'0700',
          name:'管理商户',
          node:'district',
          url:'glMerchants',
          level:3,
          children:{
            nodeList:[
              {
                id:'07000100',
                parentId:'070001',
                name:'新增商户',
                url:'addMerchants',
                node:'district',
                level:4,
                children:{
                  nodeList:[]
                }
              },
              {
                id:'07000101',
                parentId:'070001',
                name:'详情',
                url:'merchantsXq',
                node:'district',
                level:4,
                children:{
                  nodeList:[]
                }
              },
              {
                id:'07000102',
                parentId:'070001',
                name:'绑定供应商',
                url:'addMerchants',
                node:'district',
                level:4,
                children:{
                  nodeList:[]
                }
              },
              {
                id:'07000103',
                parentId:'070001',
                name:'绑定商品',
                url:'addMerchants',
                node:'district',
                level:4,
                children:{
                  nodeList:[]
                }
              },
            ]
          }
        },
        {
          id:'070002',
          parentId:'0700',
          name:'管理供应商',
          node:'district',
          url:'glSupplier',
          level:3,
          children:{
            nodeList:[
              {
                id:'07000200',
                parentId:'070002',
                name:'新增供应商',
                url:'addSupplier',
                node:'district',
                level:4,
                children:{
                  nodeList:[]
                }
              },
              {
                id:'07000201',
                parentId:'070002',
                name:'查看',
                url:'supplierXq',
                node:'district',
                level:4,
                children:{
                  nodeList:[]
                }
              },
            ]
          }
        },
        {
          id:'070003',
          parentId:'0700',
          name:'管理商品',
          node:'district',
          url:'glCommodity',
          level:3,
          children:{
            nodeList:[
              {
                id:'07000300',
                parentId:'070003',
                name:'新增进货商品',
                url:'addEntry',
                node:'district',
                level:4,
                children:{
                  nodeList:[]
                }
              },
              {
                id:'07000301',
                parentId:'070003',
                name:'查看',
                url:'entryXq',
                node:'district',
                level:4,
                children:{
                  nodeList:[]
                }
              },
              {
                id:'07000302',
                parentId:'070003',
                name:'新增销售商品',
                url:'addSell',
                node:'district',
                level:4,
                children:{
                  nodeList:[]
                }
              },
              {
                id:'07000303',
                parentId:'070003',
                name:'查看',
                url:'sellXq',
                node:'district',
                level:4,
                children:{
                  nodeList:[]
                }
              },
            ]
          }
        },
        {
          id:'070004',
          parentId:'0700',
          name:'管理台账',
          node:'settings',
          url:'glStandingBook',
          level:3,
          children:{
            nodeList:[
              {
                id:'07000400',
                parentId:'070004',
                name:'查看',
                url:'',
                node:'settings',
                level:4,
                children:{
                  nodeList:[]
                }
              },
            ]
          }
        },
        {
          id:'070005',
          parentId:'0700',
          name:'修改',
          node:'settings',
          url:'redact',
          level:3,
          children:{
            nodeList:[]
          }
        }
      ]
    }
  },
  {
    id:'08',
    name:'农事',
    url:'farmwork',
    node:'farmwork',
    icon:'icon-guanli',
    level:1,
    children:{
      nav_title:'农事管理',
      nodeList:[
        {
          id:'0800',
          parentId:'08',
          name:'农事记录',
          node:'farmwork',
          level:2,
          children:{
            nodeList:[
              {
                id:'080000',
                parentId:'0800',
                name:'农事记录',
                url:'recording',
                node:'farmwork',
                level:3,
                children:{
                  nodeList:[
                    {
                      id:'08000000',
                      parentId:'080000',
                      name:'查看农事记录',
                      url:'viewrecord',
                      node:'management',
                      level:4,
                    },
                  ]
                }
              }
            ]
          }
        }
      ]
    }
  },
  {
    id:'09',
    name:'溯源',
    url:'farmworksy',
    node:'farmworksy',
    icon:'icon-guanli',
    level:1,
    children:{
      nav_title:'溯源管理',
      nodeList:[
        {
          id:'0900',
          parentId:'09',
          name:'溯源码申请',
          node:'farmworksy',
          level:2,
          children:{
            nodeList:[
              {
                id:'090000',
                parentId:'0900',
                name:'溯源码申请',
                url:'sycodeapplication',
                node:'farmworksy',
                level:3,
                children:{
                  nodeList:[]
                }
              }
            ]
          }
        },
        {
          id:'0901',
          parentId:'09',
          name:'溯源码查询',
          node:'farmworksy',
          level:2,
          children:{
            nodeList:[
              {
                id:'090100',
                parentId:'0901',
                name:'溯源码查询',
                url:'sycodesearch',
                node:'farmworksy',
                level:3,
                children:{
                  nodeList:[]
                }
              }
            ]
          }
        }
      ]
    }
  },
  {
    id:'13',
    name:'管理',
    url:'cropManagement',
    node:'crop',
    icon:'icon-guanli',
    level:1,
    children:{
      nav_title:'合作社管理',
      id:'1300',
      parentId:'13',
      node:'crop',
      url:'managementCrop',
      level:2,
      nodeList:[
        {
          id:'130000',
          parentId:'1300',
          name:'新增合作社',
          node:'crop',
          url:'addCrop',
          level:3,
          children:{
            nodeList:[]
          }
        },
        {
          id:'130001',
          parentId:'1300',
          name:'详情',
          node:'crop',
          url:'infoCrop',
          level:3,
          children:{
            nodeList:[]
          }
        },
        {
          id:'130002',
          parentId:'1300',
          name:'修改',
          node:'crop',
          url:'editCrop',
          level:3,
          children:{
            nodeList:[]
          }
        }
      ]
    }
  },

  {
    id: '14',
    name: '商品',
    url: 'farmworkcommodity',
    node: 'farmworkcommodity',
    icon: 'icon-guanli',
    level: 1,
    children: {
      nav_title: '商品管理',
      nodeList: [
        {
          id: '1400',
          parentId: '14',
          name: '商品品种',
          node: 'farmworkcommodity',
          level: 2,
          children: {
            nodeList: [
              {
                id: '140000',
                parentId: '1400',
                name: '商品品种',
                url: 'comvariety',
                node: 'farmworkcommodity',
                level: 3,
                children:{
                  nodeList:[]
                }
              }
            ]
          }
        }
      ]
    }
  },
  {
    id: '15',
    name: '审核',
    url: 'farmworkreview',
    node: 'farmworkreview',
    icon: 'icon-guanli',
    level: 1,
    children: {
      nav_title: '溯源码审核',
      nodeList: [
        {
          id: '1500',
          parentId: '15',
          name: '溯源码审核',
          node: 'farmworkreview',
          level: 2,
          children: {
            nodeList: [
              {
                id: '150000',
                parentId: '1500',
                name: '溯源码审核',
                url: 'symreview',
                node: 'farmworkreview',
                level: 3,
                children:{
                  nodeList:[]
                }
              }
            ]
          }
        }
      ]
    }
  },

]
export default menu
