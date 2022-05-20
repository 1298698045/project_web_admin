<template>
    <div>
        <boardhead :name=name title="面板">
            <template slot="rightbtn">
                <sharepopup></sharepopup>
                <heightfilter 
                @change="filterdata" 
                style="margin-right: 10px"></heightfilter>
            </template>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>管理工作流</el-dropdown-item>
                <el-dropdown-item>配置看板</el-dropdown-item>
            </el-dropdown-menu>
        </boardhead>
        <Searchcontainer @search="search" :grouplist="grouplist"/>
        <div class="container">
            <div class="container-flexbox">
                <div class="leftshelterbox"></div>
                <div class="main-container-body">
                    <Board
                    v-if="load"
                    @reloadlist="getboarddata"
                    :grouptype="grouptype" 
                    :grouplist="grouplist" 
                    :listdata="boarddata"
                    @savetask="savetask"
                    @savelist="savelist"
                    @deletelist="deletelist"/>
                </div>
                <div class="rightshelterbox"></div>
            </div>
        </div>
    </div>
</template>

<script>
import  {getboardgroupdata,getboardlist} from './require'
import Board from '@/components/board/board.vue'
import boardhead from '@/components/head/boardhead.vue';
import Searchcontainer from './search.vue'
import {getprojectboardtasklist,getprojectboardtask,projecttaskchangelist} from "@/api/projectapi.js"
import commonapi from "@/api/commonapi.js"
import heightfilter from "@/components/filter/heightfilter.vue";
import sharepopup from "@/components/popup/share.vue";
export default {
    data(){
        return {
            grouptype:'无',
            name:'',
            userid:'',
            grouplist:[{
                name:'',
                label:'无',
                list:[]
            },{
                name:'OwningUser',
                label:'被分配人',
                type:'search',
                list:[]
            },{
                name:'PriorityCode',
                label:'优先级',
                type:'select',
                list:[]
            }],
            boarddata:[],
            filteroption:'',
            load:false,
        }
    },
    components:{
        Board,Searchcontainer,heightfilter,sharepopup,
        boardhead
    },
    created(){
        this.$store.state.showleftNavbar = true
        if(this.$route.params.projectname){
            this.name = this.$route.params.projectname
        }
        //面板数据
        //分组
        this.getboarddata()
    },
    watch:{
        showClosedItem(){
            this.getboarddata()
        }
    },
    methods:{
        search(val,searchtext,userid){
            this.grouptype = val
            this.searchtext = searchtext
            this.userid = this.userid == userid?'':userid
            this.getboarddata()
        },
        filterdata(filter){
            this.filteroption = filter
            this.getboarddata()
        },
        getboarddata(){
            //this.boarddata = getboardlist()
            //this.grouplist = getboardgroupdata()
            //console.log(this.boarddata)
            //console.log(this.grouplist)
            // getprojectboardtasklist({
            //     projectId:this.$route.query.id
            // }).then((data)=>{
            //     this.grouplist = data.listData
            // })
            // var filterquery = ''
            // if(this.userid!=''){
            //     filterquery = 'OwningUser'
            // }
            getprojectboardtask({
                projectId:this.$route.query.id,
                search:this.searchtext,
                OwningUser:this.userid,
                filterQuery:this.filteroption
            }).then((res)=>{
                this.$store.boardpermissions = res.data.boardScope.currentUser.permissions
                let data = {
                    listData:[]
                }
                res.data.boardScope.board.columns.forEach((list)=>{
                    let listitem = {
                        ListId:list.id,
                        Name:list.name,
                        Tasks:[],
                        maxIssueCount:list.maxIssueCount,
                        status:list.status
                    }
                    list.cards.forEach((task)=>{
                        const taskitem = {
                            Name:task.summary,
                            Subject:task.summary,
                            priority:task.priority,
                            PriorityCode:task.priority.id,
                            PriorityCodeName:task.priority.name,
                            dueDate:task.dueDate,
                            ActivityId:task.id,
                            ListId:list.id,
                            issueType:task.issueType,
                            issueId:task.issueId,
                            childIssuesMetadata:task.childIssuesMetadata,
                            status:task.status,
                            OwningUserName:task.assignee.displayName,
                            OwningUser:task.assignee.accountId,
                            assignee:task.assignee
                        }
                        listitem.Tasks.push(taskitem)
                    })
                    data.listData.push(listitem)
                })
                
                data.listData.forEach(listData => {
                    listData.Tasks.forEach(item=>{
                        this.grouplist.forEach(groupitem=>{
                            if(!groupitem.list.find(listitem => listitem.id==item[groupitem.name])){
                                const name = item[groupitem.name+'Name']?item[groupitem.name+'Name']:item[groupitem.name]
                                groupitem.list.push({
                                    id:item[groupitem.name],
                                    name:name,
                                    show:groupitem.list.length==0?true:false
                                })
                            }
                        })
                    })
                });
                this.boarddata = data.listData
                this.load = true
            })
        },
        savetask(fields,group){
            const deffields = {}
            if(this.grouptype&&this.grouptype!='无'){
                const groupitem = this.grouplist.find((item)=>{return item.label==this.grouptype})
                if(groupitem.type=='search'){
                    deffields[groupitem.name] = {Id:group.id}
                } else{
                    deffields[groupitem.name] = group.id
                }
            }
            commonapi.entitysaverecord({
                ActivityTypeCode:4212,
                RegardingObjectId:{Id:this.$route.query.id},
                ...fields.fields,
                ...deffields
            },4200).then((res)=>{
                const id = res.recordRep.id
                return this.projecttaskchangelist(id,fields.fields.ListId.Id)
            }).then(()=>{
                this.getboarddata()
            })
        },
        projecttaskchangelist(ActivityId,listId){
            console.log(ActivityId)
            console.log(listId)
            return projecttaskchangelist({
                ActivityId:ActivityId,
                listId:listId
            })
        },
        savelist(fields){
            commonapi.entitysaverecord({
                ProjectId:{Id:this.$route.query.id},
                ...fields.fields
            },20315,fields.id).then(()=>{
                this.getboarddata()
            })
        },
        deletelist(id){
            commonapi.entitydelete(20315,id).then(()=>{
                this.getboarddata()
            })
        },
    }
};
</script>
<style scoped>
    .leftshelterbox,.rightshelterbox{
        position: sticky;
        width: 40px;
        background-color: #fff;
        z-index: 3;
    }
    .leftshelterbox{
        left: 0;
    }
    .rightshelterbox{
        right: 0;
    }
    .container{
        overflow: auto;
        height: calc(100vh - 230px);
        /* width: calc(100vw - 241px); */
        margin-top: 20px;
        box-sizing: border-box;
        position: relative;
    }
    .container-flexbox{
        width: fit-content;
        display: flex;
        padding-bottom: 50px;
    }
    .main-container-body{
        flex: 1;
    }
    .head{
        margin-top: 0px;
        padding: 0 40px;
    }
</style>