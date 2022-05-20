<template>
    <div class="dropbtn">
        <el-dropdown trigger="click"
            :hide-on-click="false">
            <span>
            <span class="el-dropdown-link" v-if="numbertype!=1">
                <slot>请选择</slot>
                <span v-if="shownumber!=false">{{picklistValues[0]?picklistValues[0]:checkListlabel[0]}}</span>
                <span class="checkListnumber" v-if="shownumber!=false&&checkList.length>1">
                    +{{checkList.length-1}}
                </span>
                <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <span class="el-dropdown-link" v-if="numbertype==1&&filterdata">
                <span class="el-dropdown-link-text" v-if="checkList.length==1">
                {{computedfilterdata.find((item)=>{return item.name == checkList[0]}).label}}
                </span>
                <span class="el-dropdown-link-text" v-else-if="checkList.length>1">
               {{computedfilterdata.find((item)=>{return item.name == checkList[0]}).label}}和其他
                {{checkList.length-1}}
                    个值
                </span>
                <span v-else>全部</span>
            </span>
            <span class="el-dropdown-link" v-else-if="numbertype==1&&!filterdata">
                <span class="el-dropdown-link-text" v-if="checkList.length==1">
                {{search.list.find((item)=>{return item.ID == checkList[0]}).Name}}
                </span>
                <span class="el-dropdown-link-text" v-else-if="checkList.length>1">
               {{search.list.find((item)=>{return item.ID == checkList[0]}).Name}}和其他
                {{checkList.length-1}}
                    个值
                </span>
                <span v-else>全部</span>
            </span>
            </span>
            <el-dropdown-menu slot="dropdown">
                    <div class="dropdown-search">
                        <el-input @input="searchdata" placeholder="搜索" size="mini" v-model="searchtext" clearable>
                            <i slot="prefix" class="el-input__icon el-icon-search"></i>
                        </el-input>
                    </div>
                    <el-checkbox-group
                    @input="$emit('input', checkList);"
                    v-model="checkList">
                        <div v-if="filterdata">
                            <el-dropdown-item v-for="item in filterdatashow" :key="item.name">
                                <el-checkbox :label="item.name">
                                    <div class="label-container">
                                        <div v-if="showicon">
                                            <svgicon :name="item.type" />
                                        </div>
                                        <div>{{item.label}}</div>
                                    </div>
                                </el-checkbox>
                            </el-dropdown-item>
                        </div>
                        <div v-else-if="filtertable">
                            <el-dropdown-item v-for="item in search.list" :key="item.ID">
                                <el-checkbox :label="item.ID">
                                    <div v-if="checkboxdroptype=='U'" class="user-container">
                                        <div>
                                            <Userhead height="16px" width="16px" :url="item.url"/>
                                        </div>
                                        <div>{{item.Name}}</div>
                                    </div>
                                    <div v-else-if="checkboxdroptype=='status'">
                                        {{item.Name}}
                                    </div>
                                    <div v-else>{{item.Name}}</div>
                                </el-checkbox>
                            </el-dropdown-item>
                        </div>
                        <div v-else>
                        <el-dropdown-item>
                            <el-checkbox label="OA1.0"></el-checkbox></el-dropdown-item>
                            <el-dropdown-item><el-checkbox label="OA2.0"></el-checkbox></el-dropdown-item>
                            <el-dropdown-item><el-checkbox label="OA3.0"></el-checkbox></el-dropdown-item> 
                        </div>     
                    </el-checkbox-group>
            </el-dropdown-menu>
        </el-dropdown>
    </div>
</template>
<script>
import './dropbtn.css'
import Userhead from '@/components/Userheadphoto.vue'
import svgicon from '@/icon/icon.vue'

export default {
    data(){
        return{
            checkList:this.value,
            searchtext:'',
            search:{
                list:[]
            },
            checkListlabel:[],
            defaultsearch:{
                list:[]
            },
        }
    },
    computed:{
        computedfilterdata(){
            return JSON.parse(JSON.stringify(this.filterdata))
        },
        filterdatashow(){
            this.computedfilterdata.forEach((item)=>{
                if(this.format&&(!item.label||!item.name)){
                    item.label = item[this.format.label]
                    item.name = item[this.format.value]
                }
            })
            return this.computedfilterdata.filter((item)=>{
                return item.label&&item.label.indexOf(this.searchtext)!=-1
            })
        }
    },
    components:{
        Userhead,svgicon
    },
    props:['filterdata','value','shownumber','filtertable',
    'referencedEntityObjectTypeCode','picklistValues','operands',
    'checkboxdroptype','numbertype','format','showicon','iconformat'],
    watch:{
        value(){
            this.checkList = this.value
        },
        checkList(){
            if(this.filtertable){
                this.defaultsearch.list.forEach((item,index)=>{
                    if(!this.checkList.find((element)=>{return element==item.ID})){
                        this.defaultsearch.list.splice(index,1)
                        this.checkListlabel.splice(index,1)
                    }
                })
                this.checkList.forEach((element)=>{
                    if(!this.defaultsearch.list.find((item)=>{return item.ID==element})){
                        const label = this.search.list.find((item)=>{return item.ID==element}).Name
                        this.defaultsearch.list.push({
                            ID:element,
                            Name:label
                        })
                        this.checkListlabel.push(label)
                    }
                })
            }
            this.$emit('change',this.checkList,this.checkListlabel)
        }
        
    },
    created(){
        if(this.filtertable){
            if(this.checkList.length>0){
                this.checkList.forEach((element,index)=>{
                    const label = this.picklistValues[index]
                    this.defaultsearch.list.push({
                        ID:element,
                        Name:label
                    })
                    this.checkListlabel.push(label)
                })
            }else{
                this.checkList = []
            }
            this.getlookup(this.referencedEntityObjectTypeCode,'list')
        }else{
            if(this.checkList.length>0){
                // console.log(this.checkList)
                // console.log(this.filterdatashow)
                this.checkList.forEach((element,index)=>{
                    const label = this.filterdatashow.find((item)=>{
                        if(item.name==element){
                            return true
                        }
                        if(item.fieldId==element){
                            return true
                        }
                    }).label
                    this.checkListlabel.push(label)
                })
            }else{
                this.checkList = []
            }
        }
    },
    methods:{
        searchdata(){
            if(this.filtertable){
                this.searchlookup(this.searchtext,this.referencedEntityObjectTypeCode,'list')
            }
            else{

            }
        }
    }
}
</script>
<style scoped>
.dropdown-search{
    padding: 0 10px;
    border-bottom: 2px solid #eceaea;
}
.el-input>>>.el-input__inner{
    outline: none;
    border: 0;
}
.el-checkbox-group{
    max-height: 300px;
    overflow: auto;
}
.user-container,.el-checkbox{
    display: flex;
    align-items: center;
    line-height: 32px;
    height: 32px;
}
.user-container>div{
    margin-right: 5px;
}
.user-container>>>.item-img{
    line-height: 18px;
}
.label-container{
    display: flex;
    align-items: center;
    color:#172B4D;
}
.label-container>div{
    margin-right: 5px;
}
</style>
