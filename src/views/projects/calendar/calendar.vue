<template>
<div class="calendar" ref="calendar" :class="{'filtered':filternumber>0}">
    <boardhead :hiddenbread="hiddenbread" :name="$route.params.projectname" title="日历">
        <template slot="rightbtn">
            <div class="userfiltercontainer" v-if="!calendartype">
                <div class="item-container">
                    <filteruser @search="userchose" />
                </div>
                <div class="item-container">
                    <adduser />
                </div>
            </div>
            <sharepopup></sharepopup>
            <heightfilter
                @change="filterchange" 
                style="margin-right: 10px">
            </heightfilter>
        </template>
        <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>
          <el-switch v-model="showClosedItem" inactive-text="显示已完成的项目"></el-switch>
        </el-dropdown-item>
      </el-dropdown-menu>
    </boardhead>
    <div class="calender-container">
        <FullCalendar  :editable="true" :options="calendarOptions" /> 
    </div>
    <!--<el-calendar>
  <template
    slot="dateCell"
    slot-scope="{date,data}">
    <div @click="newwork(data)" class="calendar-item">
    <p :class="data.isSelected ? 'is-selected' : ''">
      {{ data.day.split('-').slice(1).join('-') }} {{ data.isSelected ? '✔️' : ''}}
    </p>
    <div @click.stop="openitemdetail" v-for="item in calendardata(data)" :key="item.id" class="calendaritem">
        <img src="/static/img/svg/viewavatar.svg" alt="">
        <span>{{item.title}}</span>
    </div>
    </div>
  </template>
</el-calendar> -->
<el-dialog title="任务详情" :visible.sync="detaildialog" width="80%" top="5vh">
        <itemdetail :itemid="detailtaskid" @close="detaildialog=false"></itemdetail>
    </el-dialog>
    <el-dialog :show-close="false" :visible.sync="newworkdialog" width="55%" top="5vh">
        <newworkpopup></newworkpopup>
    </el-dialog>
    <div @keydown.13="finishquitecreated" 
    class="quitenewtask" v-if="quitenewtaskcontainer.show" 
    :style="{'left':quitenewtaskcontainer.left+'px','top'
    :quitenewtaskcontainer.top+'px'}">
        <el-input :rows="1" resize="none"
         v-model="quitenewtaskcontainer.value"  
        @blur="quitenewtaskcontainer.show = false;removenewcontainer()" 
        placeholder="请输入标题" type="textarea" ref="quitenewtaskref"></el-input>
        <img src="/static/img/svg/viewavatar.svg" alt="">
    </div>
    
</div>
</template>



<script>
import boardhead from '@/components/head/boardhead.vue';
import itemdetail from "@/views/projects/detail/detail.vue"
import newworkpopup from "@/alert/newwork.vue"
import heightfilter from "@/components/filter/heightfilter.vue"
import sharepopup from "@/components/popup/share.vue";
import adduser from "@/components/adduser.vue";
import filteruser from '@/components/filteruser.vue'

import FullCalendar from '@fullcalendar/vue'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'

import {getprojecttaskcalendar} from '@/api/projectapi.js'
import commonapi from '@/api/commonapi.js'
import Userhead from '@/components/Userheadphoto.vue'

var getcaldata
function savedata(data){
const start = data.event.startStr
var end
if(data.event.endStr!=null){
    end = data.event.endStr
}else{
    end = start
}
commonapi.entitysaverecord({
    ScheduledStart:start+' '+data.event._def.extendedProps.starttime,
    ScheduledEnd:end+' '+data.event._def.extendedProps.endtime
},4200,data.event.id)
}
var opendetail

export default {
    data(){
        return {
            userid:'',
            filternumber:0,
            addpeopledialog:false,
            start:'',
            end:'',
            left:'8558',
            detailtaskid:'',
            filteroption:'',
            calendarOptions: {
                firstDay: 1,
                plugins: [ dayGridPlugin, interactionPlugin ],
                height:'auto',
                editable: true,
                dayMaxEvents:3,
                locale:"zh-cn",
                initialView: 'dayGridMonth',
                dateClick:this.quitenewwork,
                buttonText:{
                    today:'今天'
                },
                eventContent(event){
                    const element = event.event._def
                    if(element.extendedProps.type=='newcontainer'){
                        const dom1 = document.createElement('div')
                        dom1.className = 'fc-event-main-frame newcontainer'
                        return {
                            domNodes:[dom1]
                        }
                    }else{
                        const dom1 = document.createElement('div')
                        let itemstatus = element.extendedProps.StateCode.statusCategoryId
                        if(itemstatus!=3&&event.event.end<new Date()){
                            itemstatus = 4
                        }
                        dom1.className = 'fc-event-main-frame itemstatus'+itemstatus
                        const dom2 = document.createElement('div')
                        dom2.className = 'fc-event-title-container'
                        const dom3 = document.createElement('div')
                        dom3.className = 'fc-event-title fc-sticky'
                        dom3.setAttribute('title',element.title)
                        const typeicon = document.createElement('img')
                        const iconUrl = element.extendedProps.IssueType.iconUrl
                        typeicon.setAttribute('src',iconUrl&&iconUrl!=null?'/static/img'+iconUrl:'/static/img/svg/viewavatar.svg')
                        typeicon.className = 'typeicon'
                        dom3.innerHTML = element.title

                        const dom4 = document.createElement('div')
                        dom4.className = 'fc-event-main-frame-rightcontainer'
                        
                        const dom5 = document.createElement('div')
                        dom5.className = 'fc-event-rightcontainer-owninguser'
                        const OwningUser = element.extendedProps.OwningUser.userValue.value
                        if(OwningUser&&OwningUser!=''){
                            const Userhead = document.createElement('img')
                            const UserheadUrl = element.extendedProps.OwningUser.userValue.avatarUrl
                            const OwningUserName = element.extendedProps.OwningUser.userValue.displayName
                            Userhead.setAttribute('src',UserheadUrl&&UserheadUrl!=null&&UserheadUrl!=''?UserheadUrl:'/static/img/svg/userphoto.svg')
                            Userhead.setAttribute('title',OwningUserName)
                            Userhead.className = 'Userhead'
                            dom5.appendChild(Userhead)
                        }
                        

                        const dom6 = document.createElement('div')
                        dom6.className = 'fc-event-rightcontainer-status'
                        if(itemstatus==3){
                            const dom7 = document.createElement('img')
                            dom7.setAttribute('src','/static/img/svg/finish.svg')
                            dom6.appendChild(dom7)
                        }
                        dom4.appendChild(dom6)
                        dom4.appendChild(dom5)

                        dom2.appendChild(typeicon)
                        dom2.appendChild(dom3)
                        dom1.appendChild(dom2)
                        dom1.appendChild(dom4)
                        return {
                            domNodes:[dom1]
                        }
                    }
                    
                },
                eventClassNames(event){
                    
                },
                dayCellContent(event){
                   event.dayNumberText = event.dayNumberText.slice(0,event.dayNumberText.length-1)
                },
                datesSet(date){
                    getcaldata(date.startStr.split('T')[0],date.endStr.split('T')[0])
                },
                eventDrop(data){
                    savedata(data)

                },
                eventResize(data){
                    savedata(data)
                },
                eventClick(data){
                    opendetail(data)
                },
                events: [
                    {   title: 'event 1', 
                        start: '2022-01-04',
                        end: '2022-01-06',
                        backgroundColor:'rgb(255, 235, 230)',
                        textColor:'rgb(191, 38, 0)'
                    },
                    { title: 'event 2', date: '2022-01-03'},
                    { title: 'event 2', date: '2022-01-03'},
                    { title: 'event 2', date: '2022-01-03'},
                    { title: 'event 2', date: '2022-01-03'},
                    { title: 'event 2', date: '2022-01-03'},
                    { title: 'event 2', date: '2022-01-03'}
                ],
            },
            quitenewtaskcontainer:{
                show:false,
                left:'',
                top:''
            },
            activecelldata:{},
            showClosedItem:false,
            name:'oa',
            detaildialog:false,
            newworkdialog:false,
            calendarlist:[{
                day:'2021-10-18',
                title:'前端开发',
            }],
        }
    },
    props:['calendartype','hiddenbread'],
    computed:{
        calendardata(){
            return (date)=>{
                return this.calendarlist.filter((item)=>{
                    return item.day == date.day
                })
            }
        }
    },
    watch:{
        showClosedItem(){
            this.getdata(this.start,this.end)
        }
    },
    components:{
        filteruser,adduser,
        boardhead,itemdetail,
        newworkpopup,heightfilter,
        sharepopup,FullCalendar,Userhead
    },
    created(){
        getcaldata = (start,end)=>{
            if(this.start!=start){
                this.start = start
                this.end = end
                this.getdata(start,end)
            }
        }
        opendetail= (data)=>{
            this.detaildialog = true
            this.detailtaskid = data.event.id
        }
    },
    mounted(){
    },
    methods:{
        filterchange(filteroption){
            this.filteroption = filteroption
            this.getdata(this.start,this.end)
        },
        getdata(start,end){

            let filterQuery= this.filteroption 
            if(!this.showClosedItem){
                filterQuery +='\nStatusCategoryId\tneq\t3'
            }
            //默认显示未完成的
            if(this.calendartype=='my'){
                filterQuery += '\nOwningUser\teq-userid'
            }
            getprojecttaskcalendar({
                RegardingObjectId:this.$route.query.id,
                scheduledStart:start,
                ScheduledEnd:end,
                showClosedItem: this.showClosedItem,
                filterQuery:filterQuery,
                owningUser:this.userid
            }).then((res)=>{
                const data = res.data.list.nodes
                this.calendarOptions.events = []
                data.forEach(item => {
                    const listitem = {
                        id:item.id
                    }
                    item.fields.forEach(fields=>{
                        listitem[fields.fieldKey] = fields
                    })
                    let start = ''
                    let end = ''
                    let starttime = ''
                    let endtime = ''
                    if(listitem.ScheduledStart.dateTime!=null&&listitem.ScheduledEnd.dateTime!=null){
                        start = listitem.ScheduledStart.dateTime.split(' ')[0]
                        end = listitem.ScheduledEnd.dateTime.split(' ')[0]
                        starttime = listitem.ScheduledStart.dateTime.split(' ')[1]
                        endtime = listitem.ScheduledEnd.dateTime.split(' ')[1]
                    }else if(listitem.ScheduledEnd.dateTime!=null){
                        start = end = listitem.ScheduledEnd.dateTime.split(' ')[0]
                        starttime = endtime = listitem.ScheduledEnd.dateTime.split(' ')[1]
                    }
                    this.calendarOptions.events.push({
                        title: listitem.Subject.textValue, 
                        start: start,
                        end:end,
                        id:listitem.id,
                        starttime:starttime,
                        endtime:endtime,
                        OwningUser:listitem.OwningUser,
                        IssueType:listitem.IssueType,
                        StateCode:listitem.StateCode
                    })
                })
            })
        },
        openitemdetail(){
            this.detaildialog = true
        },
        newwork(date){
            console.log(date)
            this.newworkdialog = true
        },
        quitenewwork(data){
            const dayEl = data.dayEl
            this.activecelldata = data
            // if(data.dayEl.className.indexOf('fc-day-other')!=-1){
            //     return
            // }
            this.quitenewtaskcontainer.show = true
            const width = this.$parent.showleft ? 240 : 20;
            const diffwidth = (dayEl.clientWidth - 190)/2
            // var left = data.jsEvent.pageX 
            var left = dayEl.offsetLeft + width + 40 + diffwidth
            if(left+200>document.body.clientWidth){
                left = document.body.clientWidth - 200
            }
            left = left-width
            // var top = data.jsEvent.pageY 
            var top = dayEl.offsetTop + 70
            var scrollTop = this.$refs.calendar.scrollTop
            if(top<scrollTop){
                top += 150
            }
            // top = top + scrollTop - 50
            this.quitenewtaskcontainer.left = left
            this.quitenewtaskcontainer.top = top 
            this.removenewcontainer()
            this.calendarOptions.events.unshift({
                title: '', 
                start: data.date,
                id:'',
                type:'newcontainer'
            })
            this.$nextTick(()=>{
                this.$refs.quitenewtaskref.focus()
            })
        },
        finishquitecreated(e){
            commonapi.entitysaverecord({
                RegardingObjectId:{Id:this.$route.query.id},
                Subject:this.quitenewtaskcontainer.value,
                ScheduledStart:this.activecelldata.dateStr+' 00:00:00',
                ScheduledEnd:this.activecelldata.dateStr+' 23:59:59',
                ActivityTypeCode:'4021'
            },4200).then(()=>{
                this.getdata(this.start,this.end)
                this.quitenewtaskcontainer.value = ''
                this.quitenewtaskcontainer.show = false
            })
        },
        removenewcontainer(){
            if(this.calendarOptions.events[0]&&this.calendarOptions.events[0].type=='newcontainer'){
                console.log('newcontainer')
                this.calendarOptions.events.shift()
            }
        },
        userchose(id){
            this.userid = id
            this.getdata(this.start,this.end)
        },
        addpeople(){
            this.addpeopledialog  = true
        }
    }
}
</script>
<style scoped>
    .head-operate-item{
        margin-right: 10px;
        height:32px;
        box-sizing: border-box;
    }
    
    .calendaritem{
        background-color: rgb(223, 225, 230);
        color: rgb(66, 82, 110);
        padding: 3px 5px;
        border-radius: 4px;
        display: flex;
        align-items: center;
        position: absolute;
        width: calc(100% - 16px);
        box-sizing: border-box;
    }
    .calendar>>>.el-calendar-day{
        position: relative;
    }
    .calendaritem>img{
        margin-right: 5px;
    }
    .calendar>>>.el-calendar__body{
        overflow: auto;
        height: calc(100vh - 250px);
    }
    .calendar-item{
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        padding: 8px;
        box-sizing: border-box;
    }
    .el-dialog__wrapper>>>.el-dialog__body{
  padding: 0;
}
.el-dialog__wrapper>>>.el-dialog__header{
    display: none;
}
.calender-container{
    padding: 0px 40px;
}
.calendar>>>.fc-event-title-container{
    height: 32px;
    line-height: 32px;
    display: flex;
    align-items: center;
}
.calendar>>>.fc-h-event{
    background-color: rgb(223, 225, 230);
    color: rgb(66, 82, 110);
    border: 0;
}
.calendar>>>.fc-event-title{
    margin-left: 10px;
    font-size: 14px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.calendar>>>.fc-scrollgrid-sync-inner{
    padding: 5px 0;
}
.calendar>>>.fc-toolbar-title{
    font-size: 14px;
    position: absolute;
    right: 30px;
    width: 200px;
    margin-top: -8px;
}
.calendar>>>.fc-toolbar-chunk{
    position: absolute;
    right: 50%;
    margin-top: -50px;
}
.calendar>>>.fc-button-group{
    position: absolute;
    right: 70px;
}
.calendar>>>.fc-button-primary{
    background: transparent;
    color: #000;
    border: 0;
    border-radius: 4px !important;
    outline: none !important;
}
.calendar>>>.fc-button-primary:hover{
    background-color: rgb(216, 216, 219);
}
.calendar>>>.fc-today-button{
    /* background-color: rgb(216, 216, 219); */
}
.quitenewtask{
    position: absolute;
    background-color: #fff;
    z-index: 999;
}
.quitenewtask img{
    position: absolute;
    bottom: 10px;
    left:10px;
    z-index: -1;
}
.quitenewtask>>>.el-textarea__inner{
    height: 100px;
    background-color: transparent;
    border-width: 2px;
}
.calendar>>>.fc-daygrid-day-top{
    flex-direction:initial;
    justify-content: center;
    font-size: 12px;
    color: #666;
}
.calendar>>>.fc-col-header-cell-cushion{
    color: #6B778C;
    font-size: 12px;
}
.calendar{
    overflow: auto;
    height:100%;
    position: relative;
    padding-bottom: 30px;
    box-sizing: border-box;
}
.calendar>>>.fc-daygrid{
    min-height:600px;
}
.calendar>>>.fc-scrollgrid{
    border: 0;
}
.calendar>>>.fc-scrollgrid-section>th{
    border: 0;
}
.calendar>>>.fc-scrollgrid-section-body>td{
    border: 0;
}
.calendar>>>.typeicon{
    margin-left: 10px;
}
.calendar>>>.newcontainer{
    height: 32px;
    width: 100%;
    background-color: rgb(222, 235, 255);
    border: 0 !important;
}
.calendar>>>.fc-daygrid-dot-event{
    padding: 0;
}
.userfiltercontainer{
    width: 250px;
    /* position: absolute; */
    /* right: 480px; */
    display: flex;
    justify-content: flex-end;
    margin-right: 10px;
}
.userfiltercontainer .item-container{
    margin-left: 20px;
}
.item-container{
    display: flex;
    align-items: center;
}
.calender-container>>>.fc-day-today{
    background-color: #fff;
}
.calender-container>>>.fc-day-today .fc-daygrid-day-number{
    background-color: rgb(23, 43, 77);
    color: rgb(255, 255, 255);
    border-radius: 50%;
    height: 24px;
    width: 24px;
    text-align: center;
    line-height: 24px;
    box-sizing: border-box;
    padding: 0;
}
.calender-container>>>.fc-header-toolbar.fc-toolbar {
    position: relative;
}
.filtered>>>.fc-header-toolbar.fc-toolbar {
    position: relative;
    left: -60px;
}
.calender-container>>>.fc-event-rightcontainer-owninguser .Userhead{
    border-radius: 50%;
    height: 16px;
    width: 16px;

}
.calender-container>>>.fc-event-main-frame-rightcontainer{
    display: flex;
    align-items: center;
    margin-right: 5px;
}
.calender-container>>>.fc-event-rightcontainer-owninguser{
    display: flex;
    align-items: center;
}
.calender-container>>>.itemstatus1{
    
}
.calender-container>>>.itemstatus2{
    background-color: rgb(222, 235, 255);
    color: rgb(0, 82, 204);
}
.calender-container>>>.itemstatus3{
    background-color: rgb(227, 252, 239);
    color: rgb(0, 135, 90);
}
.calender-container>>>.itemstatus4{
    background-color: rgb(255, 235, 230);
    color: rgb(191, 38, 0);
}
.calender-container>>>.fc-event-title-container img{
    width: 16px;
    height: 16px;
}
</style>