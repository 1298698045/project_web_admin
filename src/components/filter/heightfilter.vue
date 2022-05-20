<template>
        <div class="heightfilter-btn ">
        <div>
            <el-popover 
            popper-class="noleftpadding"
            placement="bottom"
            trigger="click">
            <div slot="reference" class="head-operate-item svgiconbtn" @click="itemactive='list'">
                     <svgicon style="color:#000" class="icon" name="shaixuan"/>
                     <span class="title" v-if="filterchecklist.length+filtersearch.length==0">筛选</span>
                     <span class="title" v-else>已应用{{filterchecklist.length+filtersearch.length}}个筛选器</span>
            </div>
            <div class="container">
            <div  v-show="!morefilter">
                <div class="quickfilter">
                    <div>快速筛选器</div>
                    <div class="clearfilter" @click="clearfilter" v-if="filterchecklist.length+filtersearch.length>0">清除筛选器</div>
                </div>
                <div @click="handleCommand(1)" class="el-dropdown-menu__item">
                    <div>
                        <svgicon name="yifenpeigeiwo"/>
                        <span>已分配给我</span>
                    </div>
                    <i class="el-icon-check" v-if="filterchecklist.filter((item)=>{return item=='1'}).length>0"></i>
                </div>
                <div @click="handleCommand(2)" class="el-dropdown-menu__item">
                    <div>
                        <svgicon name="benzhoudaoqi"/>
                        <span>本周到期</span>
                    </div>
                    <i class="el-icon-check"  v-if="filterchecklist.filter((item)=>{return item=='2'}).length>0"></i>
                </div>
                <div @click="handleCommand(3)" class="el-dropdown-menu__item">
                    <div>
                        <svgicon name="yiwanchengxiangmu"/>
                        <span>已完成项目</span>
                    </div>
                    <i class="el-icon-check" v-if="filterchecklist.filter((item)=>{return item=='3'}).length>0"></i>
                </div>
                <div class="el-dropdown-footer">
<div class="heightfilter" @click="morefilter = true">
                    <i class="el-icon-plus"></i>
                    <span>更多筛选器</span>
                </div>
                </div>
            </div>
            <div v-show="morefilter">
                <div class="quickfilter returnquickfilter">
                    <i class="el-icon-arrow-left" @click="morefilter = false"></i> 筛选方式</div>
                    <div class="heightfilter-body">
                    <div class="item-container" v-for="item in filterdata" :key="item.id">
                        <div class="item-label">
                            {{item.name}}
                        </div>
                        <div class="item-value" v-if="item.type=='user'">
                            <checkboxdrop 
                                v-model="item.value"
                                class="dropbtn btn" 
                                :ref="item.column"
                                :checkboxdroptype="'user'"
                                :filtertable="true"
                                :numbertype="1"
                                :referencedEntityObjectTypeCode="8">
                            </checkboxdrop>
                        </div>
                        <div class="item-value" v-if="item.type=='status'">
                            <checkboxdrop 
                                v-model="item.value"
                                class="dropbtn btn" 
                                :ref="item.fieldId"
                                :shownumber="false"
                                :numbertype="1"
                                :picklistValues="item.picklistValues.length>0?item.picklistValues:['全部']"
                                :filterdata="item.statuss.nodes"
                                :format="{
                                    value:'statusId',
                                    label:'name'
                                }">
                                </checkboxdrop>
                        </div>
                        <div class="item-value" v-if="item.type=='priority'">
                                <checkboxdrop 
                                v-model="item.value"
                                class="dropbtn btn" 
                                :ref="item.fieldId"
                                :shownumber="false"
                                :numbertype="1"
                                :picklistValues="item.picklistValues.length>0?item.picklistValues:['全部']"
                                :filterdata="item.priorities.nodes"
                                :format="{
                                    value:'id',
                                    label:'name'
                                }">
                                </checkboxdrop>
                        </div>
                        <div class="item-value" v-if="item.type=='datetime'||item.type=='date'">
                            <div class="dropbtn btn">
                                <el-popover 
                                    trigger="click"
                                    :append-to-body="false">
                                    <div slot="reference">
                                    <span class="el-dropdown-link">
                                        <span class="el-dropdown-link-text" 
                                            v-if="item.value&&item.value.length>0">
                                            {{item.value[0]}}-{{item.value[1]}}
                                        </span>
                                        <span v-else>全部</span>
                                        <i class="el-icon-arrow-down el-icon--right"></i>
                                    </span>
                                    </div>
                                    <div>
                                        <div v-if="item.type=='datetime'" class="date-container">
                                            <el-date-picker
                                                type="daterange"
                                                range-separator="至"
                                                v-model="item.value"
                                                value-format="yyyy-MM-dd"
                                                placeholder="选择日期">
                                                </el-date-picker>
                                        </div>
                                        <div v-else-if="item.type=='date'" class="date-container">
                                                <el-date-picker
                                                type="daterange"
                                                range-separator="至"
                                                v-model="item.value"
                                                value-format="yyyy-MM-dd"
                                                placeholder="选择日期">
                                                </el-date-picker>
                                        </div>
                                    </div>
                                </el-popover>
                            </div>
                        </div>
                        </div>
                    </div>
                    <div class="heightfilter-footer">
                        <el-button @click="save" type="primary" size="small">应用</el-button>
                        <el-button type="text" size="small" style="color:#999" @click="clear">清除</el-button>
                    </div>
            </div>
            </div>
    </el-popover>                 

            </div>
    </div>
    
</template>
<script>
import checkboxdrop from '@/components/dropbtn/checkboxdrop.vue'
 import svgicon from '@/icon/icon.vue'
// import { getToken } from '@/utils/auth'
import { showWeekFirstDay,showWeekLastDay } from '@/utils/formatdate.js'
import {GlobalIssueListHeaderLoad} from '@/api/projectapi.js'
export default {
    data(){
        return {
            filterchecklist:[],
            morefilter:false,
            filteroptions:[],
            filtersearchstr:'',
            filtersearch:[],
            filtercolumndata:[]
        }
    },
    props:['columndata'],
    watch:{
        columndata(a,b){
            this.filtercolumndata = this.columndata
        }
    },
    computed:{
        filterdata:{
            get(){
                let filterdata = this.filtercolumndata.filter((item)=>{
                    return item.type=='date'||item.type=='datetime'||item.type=='status'||item.type=='user'||item.type=='priority'
                })
                filterdata.forEach((item)=>{
                    if(!item.value){
                        this.$set(item,'value',[])
                        this.$set(item,'picklistValues',[])
                    }
                })
                return filterdata
            },
            set(){}
        },
        quitefilteroptions(){
            return{
                1:'OwningUser\teq-userid',
                2:'ScheduledEnd\tbetween\t'+showWeekFirstDay()+','+showWeekLastDay(),
                3:'StateCode\teq\t10011'
            }
        }
    },
    components:{
        checkboxdrop,svgicon
    },
    created(){
        if(this.columndata){
            this.filtercolumndata = this.columndata
        }else{
            this.getfilter()
        }
    },
    methods:{
        getfilter(){
            return GlobalIssueListHeaderLoad({
                projectId:this.$route.query.id
            }).then((data)=>{
                const res = data.data.issueListFields.fields.nodes
                this.filtercolumndata = res
            })
        },
        clearfilter(){
            this.filteroptions = []
            this.filterchecklist = []
            this.clear()
            this.change()

        },
        clear(){
            this.filterdata.forEach((item)=>{
                item.value = []
            })
        },
        save(){
            let filtersearch = []
            this.filterdata.forEach((item)=>{
                if(item.value.length>0){
                    if(item.type=='date'||item.type=='datetime'){
                        filtersearch.push(item.fieldId+'\tbetween\t'+item.value.join(','))
                    }else{
                        filtersearch.push(item.fieldId+'\teq\t'+item.value.join(','))
                    }
                }
            })
            this.filtersearch = filtersearch
            this.change()
        },
        handleCommand(command){
            if(this.filterchecklist.filter((item)=>{return item==command}).length>0){
                this.filterchecklist = this.filterchecklist.filter((item)=>{return item!=command})
            }else{
                this.filterchecklist.push(command)
            }
            this.filteroptions = []
            this.filterchecklist.forEach((item)=>{
                if(this.quitefilteroptions[item]){
                    this.filteroptions.push(this.quitefilteroptions[item])
                }
            })
            this.change()
        },
        change(){
            this.filtersearchstr = this.filtersearch.join('\n') +'\n'+ this.filteroptions.join('\n')
            // this.$emit('input',this.filterchecklist.length+this.filtersearch.length)
            this.$emit('change',this.filtersearchstr)
        }
    }
}
</script>
<style scoped>
.container{
        color: #172b4d;
        max-height: 350px;
        overflow: auto;
        width: 367px;
}
.quickfilter{
        padding: 10px 15px;
        display: flex;
        justify-content: space-between;
        font-size: 12px;
        width: 320px;
    }
    .heightfilter{
        padding: 10px 15px;
        cursor: pointer;
        margin-top: 5px;
    }
    .el-dropdown-footer{
        border-top: 2px solid #dedede;
        margin-top: 5px;
    }
    .heightfilter:hover{
        background-color: #f2f2f2;
    }
    .el-dropdown-menu{
        padding-bottom: 5px !important;
    }
    .el-dropdown-menu__item{
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .el-dropdown-menu__item .el-icon-check{
        font-weight: 700;
        color: #409eff;
    }
    .heightfilter-btn>>>.btn{
        height: 32px;
        box-sizing: border-box;
    }
    .returnquickfilter i{
        font-weight: 700;
        border-radius: 50%;
        padding: 5px;
    }
    .returnquickfilter i:hover{
        cursor: pointer;
        background-color: #e2e1e1;
    }
    .item-container{
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 10px 0;
    }
    .heightfilter-body{
        padding: 0 15px;
        
    }
    .item-value{
        width: 220px;
    }
    .item-value .dropbtn {
        height: 40px;
        line-height: 30px;
    }
    .dropdown-search{
    padding: 0 10px;
    border-bottom: 2px solid #eceaea;
}
.el-input>>>.el-input__inner{
    outline: none;
    border: 0;
}
.dropbtn{
    width: 100%;
    box-sizing: border-box;
}
.dropbtn .el-dropdown{
    width: 100%;
    box-sizing: border-box;
}
.dropbtn .el-dropdown-link{
    width: 100%;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.el-dropdown-link-text{
    display: inline-block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 100%;
}
.item-value>>>.el-dropdown-link-text{
    display: inline-block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 100%;
}
.dropbtn>>>.el-popover{
    padding: 10px 0 !important;
}
.date-container{
    display: flex;
}
.date-container>>>.el-date-editor{
    width: 240px;
    background-color: #F4F5F7;
}
.date-container{
    padding: 10px;
}
.date-container>>>.el-range-input{
    background-color: #F4F5F7;
}
.heightfilter-footer{
    padding: 15px;
}
.item-value>>>.el-dropdown{
    width: 100%;
}
.item-value>>>.el-dropdown-link{
    width: 100%;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.el-dropdown-menu__item>div{
    display: flex;
    align-items: center;
    color: #172B4D !important;
}
.el-dropdown-menu__item>div>span{
    margin-right: 10px;
}
.el-icon-plus{
    font-weight: 700;
    font-size: 14px;
    margin:0 10px;
}
.clearfilter{
    color: #6B778C;
}
.clearfilter:hover{
    text-decoration: underline;
    cursor: pointer;
}
</style>