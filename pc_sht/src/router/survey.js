import surveyList from '../components/survey/surveyList.vue'

export default [
    { 
        path: 'survey/surveyList',
        component: resolve => require(['@/components/survey/surveyList'],resolve),
        name:'SurveyList',
        meta:{
            id:'591',
            node:'survey',
            url:'surveyList',
        }
    },
]
