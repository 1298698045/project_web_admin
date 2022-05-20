import Vue from 'vue'
import request from '@/utils/request.js'
import commonapi from '@/api/commonapi.js'
const qs = require('qs');
//获取通用列表数据
function getentitygridlist(query) {
    query.cmd = 'entitygrid.list'
    return request({
        url: rootUrl,
        method: 'get',
        params: query
    })
}
Vue.prototype.defaultsearch = null
Vue.prototype.getlookup = function (Lktp,name,type,cmd,parentid) {
    const d = {
        Lktp: Lktp,
        cmd: 'entity.lookup'
    }
    if(type=='group'){
        d.cmd = 'LookupProjects'
    }
    if(Lktp==8){
        d.cmd = 'ProjectMemberLoad'
        d.projectId = parentid?parentid:this.$route.query.id
    }
    if(type=='groups'){
        d.cmd = cmd
    }
    request({
        url: '',
        method: 'get',
        params: d
    }).then((data) => {
        if(type=='group'){
            this.search[name] = data.data
            if(this.defaultsearch&&this.defaultsearch[name]){
                this.search[name].recentProjects.nodes = this.defaultsearch[name].filter((item)=>{return !this.search[name].recentProjects.nodes.find((items)=>{return items.ID==item.ID})}).concat(this.search[name].recentProjects.nodes)
            }
        }else if(type=='groups'){
            this.search[name] = data.data
            // if(this.defaultsearch&&this.defaultsearch[name]){
            //     this.search[name].nodes = this.defaultsearch[name].filter((item)=>{return !this.search[name].recentProjects.nodes.find((items)=>{return items.ID==item.ID})}).concat(this.search[name].recentProjects.nodes)
            // }
        }else{
            if(this.defaultsearch&&this.defaultsearch[name]){
                this.search[name] = this.defaultsearch[name].filter((item)=>{return !data.listData.find((items)=>{return items.ID==item.ID})}).concat(data.listData)
            }else{
                this.search[name] = data.listData
            }
        }
        
        // var id = getQueryString('id')
        // if (id != null) {
        //     var ID = this.list[name].Id
        //     var Name = this.list[name].Name
        //     var newlist = {
        //         ID: ID,
        //         Name: Name
        //     }
        //     if (ID) {
        //         if (JSON.stringify(this.search[name]).indexOf(JSON.stringify(newlist.ID)) == -1) {
        //             this.search[name].push(newlist)
        //         }
        //     }
        // }
    })
}
Vue.prototype.searchlookup = function (query, Lktp, name,type,cmd,parentid) {
    var d = {
        Lktp: Lktp,
        Lksrch: query,
        cmd: 'entity.lookup'
    }
    if(type=='group'){
        d.cmd = 'LookupProjects'
    }
    if(Lktp==8){
        d.cmd = 'ProjectMemberLoad'
        d.projectId = parentid?parentid:this.$route.query.id
        d.search = query
    }
    if(type=='groups'){
        d.cmd = cmd
        d.search = query
    }
    request({
        url: '',
        method: 'get',
        params: d
    }).then((data) => {
        if(type=='group'){
            this.search[name] = data.data
            if(this.defaultsearch&&this.defaultsearch[name]&&query==''){
                this.search[name].recentProjects.nodes = this.defaultsearch[name].filter((item)=>{return !this.search[name].recentProjects.nodes.find((items)=>{return items.ID==item.ID})}).concat(this.search[name].recentProjects.nodes)
            }
        }else if(type=='groups'){
            this.search[name] = data.data
            // if(this.defaultsearch&&this.defaultsearch[name]){
            //     this.search[name].nodes = this.defaultsearch[name].filter((item)=>{return !this.search[name].recentProjects.nodes.find((items)=>{return items.ID==item.ID})}).concat(this.search[name].recentProjects.nodes)
            // }
        }
        else{
            if(query!=''){
                this.search[name] = data.listData
            }else{
                if(this.defaultsearch&&this.defaultsearch[name]){
                    this.search[name] = this.defaultsearch[name].filter((item)=>{return !data.listData.find((items)=>{return items.ID==item.ID})}).concat(data.listData)
                }else{
                    this.search[name] = data.listData
                }
            }
        }
    })
}
Vue.prototype.getdetail = function (objTypeCode,id ) {
    return request({
        url: '',
        method: 'get',
        params:{
            objTypeCode:objTypeCode,
            id:id,
            cmd:'entity.detail.get'
        }
    }).then((data) => {
        this.select = data.context.picklistValuesMap
        return data
    })
}
Vue.prototype.entitydelete = function(obj,id){
    return this.$confirm('是否确定删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        return commonapi.entitydelete(obj,id).then(()=>{
            this.$message({
                type: 'success',
                message: '删除成功!'
            });
        })
      })
}