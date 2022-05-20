<template>
  <div class="roadmap-container">
    <div class="roadmap" ref="roadmap" @scroll="roadmapscroll">
      <div class="roadmap-main" ref="roadmap-main">
        <div class="roadmap-head">
          <div class="head-left">事务</div>
          <div class="head-right" v-if="dateitemactive==1">
              <div class="head-date weekdate" v-for="item in datedata" :key="item.id"
                :style="{width:daystep*item.datenumber+'px'}">
                <div class="weekdate-title">{{item.title}}</div>
                <div class="weekcontainer">
                  <div v-for="week in item.weeks" :key="week.id" class="week-item">
                    <div>{{week.week}}</div>
                    <div>{{week.date}}</div>
                  </div>
                </div>
              </div>
          </div>
          <div class="head-right" v-if="dateitemactive==2">
              <div class="head-date" v-for="item in datedata" :key="item.id" 
              :style="{width:daystep*item.datenumber+'px'}">
              {{item.title}}</div>
          </div>
          <div class="head-right" v-if="dateitemactive==3">
              <div class="head-date" v-for="item in datedata" :key="item.id" 
              :style="{width:daystep*item.datenumber+'px'}">
              {{item.title}}</div>
          </div>
        </div>
        <div class="roadmap-body">
          <div class="lefttable">
            <draggable
              handle=".list-item-head"
              class="contentlist"
              v-model="listdata.data"
              group="content"
              animation="300"
              dragClass="dragClass"
              ghostClass="ghostClass"
              chosenClass="chosenClass"
              @choose="choose"
              @start="onStart"
              @end="onEnd"
              :move="onMove"
            >
              <div
                :class="{ active: activecontent == index }"
                class="contentlist-item group-contentlist"
                v-for="(content, index) in listdata.data"
                :key="index"
              >
                <div
                  @mouseover="itemhover(content.number)"
                  @mouseleave="itemhoverleave"
                  :class="{
                    bgbox: index % 2 != 0,
                    hover: hoverindex == content.number,
                  }"
                  class="list-item-head"
                >
                  <div class="list-item-name">
                    <span v-if="content.hsssubtasks">
                      <i
                      v-show="!content.show"
                      class="el-icon-arrow-right"
                      @click.stop="showgroup(content)"
                    ></i>
                    <i
                      v-show="content.show"
                      class="el-icon-arrow-down"
                      @click.stop="showgroup(content)"
                    ></i>
                    </span>
                    <span class="spacebkx" v-if="!content.hsssubtasks"></span>
                    <img :src="'/static/img'+content.IssueType.iconUrl" />
                    <span class="itemname" @click="showdetail(content)">{{ content.name }}</span>
                  </div>
                  <div
                    class="newitem-btn list-item-edit iconbtn hover-iconbtn"
                    v-if="!drag"
                    @click.stop="newitem(content, index)"
                  >
                    <i class="el-icon-plus"></i>
                  </div>
                </div>

                <draggable
                  v-show="content.show"
                  class="draggablecontent"
                  v-model="content.list"
                  group="site"
                  animation="300"
                  dragClass="dragClass"
                  ghostClass="ghostClass"
                  chosenClass="chosenClass"
                  @start="onStart"
                  @end="onEnd"
                  @choose="choose"
                  :move="
                    (e) => {
                      onMove(e, content.list);
                    }
                  "
                >
                  <transition-group :groupid="content.id">
                    <div
                     @click="showdetail(item)"
                      @mouseover="itemhover(item.number)"
                      @mouseleave="itemhoverleave"
                      :number="item.number"
                      :class="{ hover: hoverindex == item.number }"
                      class="item"
                      v-for="(item, itemindex) in content.list"
                      :key="item.id"
                    >
                      <div class="item-left">
                        <div class="item-type">
                          <img :src="'/static/img'+item.IssueType.iconUrl" />
                        </div>
                        <div class="item-name">
                          {{ item.name }}
                        </div>
                        <!-- <div class="item-number">
                          子任务-{{ itemindex }}
                        </div> -->
                      </div>
                      <!-- <div class="item-group">正在进行</div> -->
                    </div>
                  </transition-group>
                </draggable>

                <div class="edit-box" v-show="content.edit">
                  <img src="/static/img/images/icons/issuetypes/subtask.png" alt="" />
                  <input
                    v-model="newlistitemtitle"
                    ref="newiteminput"
                    class="newiteminput"
                    placeholder="请输入标题"
                    @keydown="(e) => finishedit(e, content, index)"
                    @keydown.13.prevent.stop="
                      (e) => finishedit(e, content, index)
                    "
                    @blur="finishedit(27, content, index)"
                  />
                </div>
              </div>
              <div :class="{ bgbox: listdata.data.length % 2 != 0 }">
                <div class="newlist-content" v-if="!newlistbox">
                  <div class="newlist-btn" @click="newlist">
                    <i class="el-icon-plus"></i>
                    <span>创建 事务</span>
                  </div>
                </div>

                <div class="newlist-box" v-else>
                  <input
                    v-model="newlisttitle"
                    @keydown.13.stop.prevent="(e) => finishnewlist(e)"
                    @keydown="(e) => finishnewlist(e)"
                    @blur="finishnewlist(27)"
                    ref="newlistinput"
                    type="text"
                    class="newlist-input"
                    placeholder="请输入标题"
                  />
                </div>
              </div>
            </draggable>
          </div>
          <div class="righttable">
            <div class="righttablerow-box" ref="righttablerowbox">
              <div
                class="righttable-row"
                v-for="(item, index) in listdata.data"
                :key="item.id"
                :class="{
                  bgbox: index % 2 != 0,
                  hover: hoverindex == item.number,
                  chosenClass: chooseindex == item.number,
                }"
              >
                <div
                  class="righttable-rowhead"
                  @mouseover="itemhover(item.number)"
                  @mouseleave="itemhoverleave"
                >
                  <div
                    v-if="item.showchart"
                    class="chart-item"
                    @click="showdetail(item)"
                    @mouseover="chartitemover(item)"
                    @mouseleave="chartiteleave(item)"
                    @mousedown.stop="e=>chartitemmousedown(e,item)"
                    :style="{
                      'background-color': item.backgroundcolor,
                      width: item.width + 'px',
                      left: item.left + 'px',
                    }"
                  >
                    <div class="item-dropbox">
                      <div
                        class="left sizebtn"
                        @mousedown.stop.prevent="sizebtnclick('left', item)"
                      ></div>
                      <div
                        class="right sizebtn"
                        @mousedown.stop.prevent="sizebtnclick('right', item)"
                      ></div>
                      <div class="showconnect"></div>
                      <div class="starttime">{{item.ScheduledStart}}</div>
                      <div class="endtime">{{item.ScheduledEnd}}</div>
                    </div>
                    <div class="item-relevance">
                      <img src="/static/img/svg/relevance.svg" alt="" />
                    </div>
                  </div>
                </div>
                <div v-if="item.show">
                  <div
                    class="item"
                    v-for="items in item.list"
                    :key="items.id"
                    @mouseover="itemhover(items.number)"
                    @mouseleave="itemhoverleave"
                    :class="{
                      hover: hoverindex == items.number,
                      chosenClass: chooseindex == items.number,
                    }"
                  >
                    <div
                    v-if="items.showchart"
                    class="chart-item"
                    @click="showdetail(item)"
                    @mouseover="chartitemover(items)"
                    @mouseleave="chartiteleave(items)"
                    @mousedown.stop="(e)=>chartitemmousedown(e,items)"
                    :style="{
                      'background-color': items.backgroundcolor,
                      width: items.width + 'px',
                      left: items.left + 'px',
                    }"
                  >
                    <div class="item-dropbox">
                      <div
                        class="left sizebtn"
                        @mousedown.stop.prevent="sizebtnclick('left', items)"
                      ></div>
                      <div
                        class="right sizebtn"
                        @mousedown.stop.prevent="sizebtnclick('right', items)"
                      ></div>
                      <div class="showconnect"></div>
                      <div class="starttime">2021-10-8</div>
                      <div class="endtime">2021-10-8</div>
                    </div>
                    <div class="item-relevance">
                      <img src="/static/img/svg/relevance.svg" alt="" />
                    </div>
                  </div>
                  </div>
                  <div class="item" v-if="activecontent==index"></div>
                </div>
              </div>
              <div
                class="righttable-row"
                :class="{ bgbox: listdata.data % 2 != 0 }"
              >
                <div class="righttable-rowhead"></div>
              </div>
            </div>
            <div class="connectbtn-box" v-show="connectbtnboxshow" 
            @mouseover="connectbtnboxover"
            @mousele="connectmouseout"
            :style="{'left':connectbtnboxitem.left+'px',
            'top':connectbtnboxitem.top+'px',
            'width':connectbtnboxitem.width+'px',
            }">
            <transition name="leftconnectbtn">
              <div v-show="connectbtnboxshow&&connectbtn.left" 
                @mouseover="connectbtnboxover" 
                @mouseout="connectmouseout" 
                class="left connectbtn" 
                @mousedown.stop.prevent="connectbtnclick('left')">
                <img src="/static/img/svg/relevance.svg" alt="" />
            </div>
            </transition>
              
          <transition name="rightconnectbtn">
            <div 
            v-show="connectbtnboxshow&&connectbtn.right" 
            @mouseover="connectbtnboxover" 
            @mouseout="connectmouseout" 
            class="right connectbtn" 
            @mousedown.stop.prevent="connectbtnclick('right')">
              <img src="/static/img/svg/relevance.svg" alt="" />
            </div>
            </transition>
            

            </div>
            <div class="line-box">
              <div v-for="item in monthdate" :key="item.id"></div>
            </div>
            <div class="svgbox">
                <svg v-show="showsvg" xmlns="http://www.w3.org/2000/svg" version="1.1">
                 <path v-show="!item.hidden" v-for="item in relates" :key="item.id" @mouseover="pathmouseenter(item)" 
                      @mouseout="pathmouseout(item)"
                      :d='item.str'
                      fill='transparent'
                      stroke-width='2'
                      :stroke='item.stroke'
                      cursor="pointer">
                  </path>
                  <path v-show="connectlineshow"
                      :d='connectline'
                      fill='transparent'
                      stroke-width='2'
                      stroke='rgb(4, 117, 247)'
                      cursor="pointer">
                  </path>
                </svg>
            </div>
          </div>
        </div>
        <div class="datechange today">
          <div class="dateitem" @click="returntoday">今天</div>
        </div>
        <div class="datechange">
          <div class="dateitem" @click="dateitemactivechange(1)" :class="{'active':dateitemactive=='1'}">周</div>
          <div class="dateitem" @click="dateitemactivechange(2)" :class="{'active':dateitemactive=='2'}">月</div>
          <div class="dateitem" @click="dateitemactivechange(3)" :class="{'active':dateitemactive=='3'}">季度</div>
        </div>
      </div>
    </div>
    <div
      class="transverseOutside"
      ref="transverseOutside"
      v-show="showtransverseOutside"
    >
      <div
        class="transverseIn"
        :style="{
          width: transverseInsize + 'px',
          left: transverseInleft + 'px',
        }"
        @mousedown.stop.prevent="transverseInmousedown"
      ></div>
    </div>
    <div
      class="portraitOutside"
      ref="portraitOutside"
      v-show="showportraitOutside"
    >
      <div
        class="portraitIn"
        :style="{ height: portraitInsize + 'px', top: portraitIntop + 'px' }"
        @mousedown.stop.prevent="portraitInmousedown"
      ></div>
    </div>
    <el-dialog title="" 
    :visible.sync="detaildialog" 
    :close-on-click-modal="false"
    :modal="false" width="465px" top="168px">
        <itemdetail @close="detaildialog=false" :twoarrange="true"></itemdetail>
    </el-dialog>
  </div>
</template>
<script>
import draggable from "vuedraggable";
import itemdetail from "@/views/projects/detail/detail.vue"
import commonapi from "@/api/commonapi.js"
import {TransitionAndRankJWMBoardView} from '@/api/projectapi.js'

export default {
  components: {
    draggable,
    itemdetail
  },
  data() {
    return {
      listdata:{data:[],relates:[]},
      showchildren:null,
      dateitemactive:'2',
      edititemindex:null,
      showsvg:true,
      showtransverseOutside: false,
      showportraitOutside: false,
      transverseInstep: 1,
      portraitInstep: 1,
      transverseInsize: 500,
      portraitInsize: 100,
      transverseInmousestart: 0,
      portraitInmousestart: 0,
      transverseInleft: 0,
      portraitIntop: 0,
      transverseInmouse: false,
      portraitInmouse: false,
      chooseindex: null,
      hoverindex: null,
      newlisttitle: "",
      newlistitemtitle: "",
      newlistbox: false,
      activecontent: null,
      drag: false,
      sizebtnmouse: false,
      sizebtnmousemoveitem: null,
      activesizebtnmousemoveitem: null,
      chartitemmouse:false,
      activechartitem:null,
      activechartitemoffsetX:0,
      connectmouse:false,
      connectmousetype:'',
      connectbtnboxitem:{},
      connectbtnboxshow:false,
      connectbtnboxmouse:false,
      connectbtn:{
        left:true,
        right:true,
      },
      connectlineshow:false,
      connectline:'',
      activeconnectbtnboxitem:null,
      openconnect:true,
      detaildialog:false,
      detailitem:null,
      activemousemoveevent:true,
      activepathitem:null,
      openlist:[],
      relatedContext:{}
    };
  },
  props: ["data"],
  created() {
    document
      .getElementsByTagName("body")[0]
      .addEventListener("mousemove", this.bodymousemove);
    document.getElementsByTagName("body")[0].addEventListener("mouseup", () => {
      setTimeout(() => {
        if(this.connectlineshow){
          //新增事务关联（连线）
          console.log(this.connectmousetype)
          var from = null
          var to = null
          if(this.connectmousetype=='right'){
            from = this.activeconnectbtnboxitem.number
            to =  this.connectbtnboxitem.number
          }else{
            to = this.activeconnectbtnboxitem.number
            from =  this.connectbtnboxitem.number
          }
          if((this.listdata.relates.filter(item=>item.from==from&&item.to==to).length==0)
          &&(this.listdata.relates.filter(item=>item.from==to&&item.to==from).length==0)
          &&(to!=from)){
            this.listdata.relates.push({
              from:from,
              to:to
            })
          }else{
            this.$message.error('此事务已处于关联状态');
          }
        }
        if(this.chartitemmouse){
          //事务移动位置
          this.savetasktime(this.activechartitem)
        }
        if(this.sizebtnmouse){
          //事务移动位置
          this.savetasktime(this.sizebtnmousemoveitem)
        }
        this.transverseInmouse = false;
        this.portraitInmouse = false;
        this.sizebtnmouse = false;
        this.chartitemmouse = false;
        this.connectmouse = false;
        this.connectbtn.right = true
        this.connectbtnboxshow = false
        this.connectlineshow = false
        this.openconnect = true
        this.activemousemoveevent = true
      }, 0);
        
    });
  },
  mounted() {
    this.setscrollsize();
    window.onresize = () => {
      this.setscrollsize();
    };
    this.returntoday()
  },
  computed: {
    //一天的距离
    daystep(){
      if(this.dateitemactive==1){
        return 35
      }
      if(this.dateitemactive==2){
        return 8
      }
      if(this.dateitemactive==3){
        return 2.67
      }
    },
    //日期数据
    datedata(){
      let datedata = []
      const today = new Date()
      const thisyear = today.getFullYear()
      const thismonth = today.getMonth() + 1
      const capmonth = ['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月',]

      if(this.dateitemactive==1){
        datedata = this.weekdate(36,today,thisyear,thismonth,capmonth)
      }
      if(this.dateitemactive==2){
        datedata = this.monthdate(36,today,thisyear,thismonth,capmonth)
      }
      if(this.dateitemactive==3){
        datedata = this.quarterdate(36,today,thisyear,thismonth,capmonth)
      }
      return datedata
    },
    starttime(){
      let starttime = new Date(this.datedata[0].year+'-'+this.datedata[0].month+'-'+1)
      if(this.dateitemactive==1){
        starttime = new Date(this.datedata[0].weeks[0].year+'-'+this.datedata[0].weeks[0].month+'-'+this.datedata[0].weeks[0].date)
      }
      return starttime
    },
    activecontentlist() {
      return (list, key) => {
        if (list) {
          return list.filter((item) => {
            return item.groupid == key;
          });
        } else {
          return list;
        }
      };
    },
    relates() {
      var arr = [];
      this.listdata.relates.forEach((item) => {
        var from = this.filterlist('from',item)
        var to = this.filterlist('to',item)
        if(from.hidden||to.hidden){
          return;
        }
        var startdropX = from.left+from.width
        var endropX = to.left
        var startdropY = from.top
        var endropY = to.top
        var color = 'rgb(193, 199, 208)'
        if(endropX>startdropX){
          var p1 = {
            X:startdropX,
            Y:startdropY
          }
          var p4 = {
            X:endropX,
            Y:endropY
          }
          var p2 = {
            X:startdropX+(endropX-startdropX)/3+20,
            Y:startdropY,
          }
          var p3 = {
            X:endropX-(endropX-startdropX)/3-20,
            Y:endropY,
          }
          var str = 'M '+p1.X+' '+p1.Y+' C '+p2.X +' '+p2.Y+' '+p3.X+' '+p3.Y+' '+p4.X+' '+p4.Y
        }else{
          color = '#f56c6c'
          if(endropY>startdropY){
            var step = 22
            var xstep = 22
            var ystep = (-step*startdropY+step*endropY+step*startdropX-step*endropX)/(2*step+startdropX-endropX)          
          }else{
            console.log(1)
            var step = -22
            var xstep = 22
            var ystep = (-xstep*startdropY+xstep*endropY+step*startdropX-step*endropX)/(2*xstep+startdropX-endropX)
          }
          var p1 = {
            X:startdropX,
            Y:startdropY
          }
          var p2 = {
            X:startdropX+xstep,
            Y:startdropY,
          }
          var p3 = {
            X:startdropX+xstep,
            Y:startdropY+step,
          }
          var p4 = {
            X:startdropX,
            Y:startdropY+ystep,
          }
          var p5 = {
            X:endropX,
            Y:endropY-ystep,
          }
          var p6 = {
            X:endropX-xstep,
            Y:endropY-step,
          }
          var p7 = {
            X:endropX-xstep,
            Y:endropY,
          }
          var p8 = {
            X:endropX,
            Y:endropY
          }
          var str = 'M '+p1.X+' '+p1.Y+' C '+p2.X +' '+p2.Y+' '+p3.X+' '+p3.Y+' '+p4.X+' '+p4.Y
          +' L '+p4.X+' '+p4.Y+' '+p5.X+' '+p5.Y
          +' M '+p5.X+' '+p5.Y+' C '+p6.X +' '+p6.Y+' '+p7.X+' '+p7.Y+' '+p8.X+' '+p8.Y
        }
        arr.push({
          p1:p1,
          p2:p2,
          p3:p3,
          p4:p4,
          str:str,
          stroke:color,
          showtitle:true,
        })
      });
      return arr;
    },
    
  },
  watch: {
    data:{
      handler(){
        this.setdatalocation()
      },
      deep:true
    },
    
    transverseInleft(val) {
      this.$refs.roadmap.scroll(
        val * this.transverseInstep,
        this.$refs.roadmap.scrollTop
      );
    },
    portraitIntop(val) {
      this.$refs.roadmap.scroll(
        this.$refs.roadmap.scrollLeft,
        val * this.portraitInstep
      );
    },
    '$parent.$parent.showleft'(){
      console.log(this.$refs.roadmap.clientWidth)
      setTimeout(() => {
          this.setscrollsize()
      }, 200);
    }
  },
  methods: {
    //保存事务
    savetasktime(item){
      commonapi.entitysaverecord({
          ScheduledEnd:item.ScheduledEnd,
          ScheduledStart:item.ScheduledStart
      },4200,item.id).then(()=>{
        this.$message.success('保存成功')
      })
    },
    //日期类型改变
    dateitemactivechange(item){
      this.dateitemactive = item
      this.setdatalocation()
      setTimeout(() => {
        this.returntoday()
      }, 0);
    },
    //格式化数据，生成位置
    setdatalocation(){
      this.listdata = this.formatlocation(this.data)
        let item = null
        if(this.showchildren!=null){
          item = this.listdata.data.find((item)=>{
            return item.id==this.showchildren
          })
          this.showchildren = null
          item.show = true
          
        }
        if(this.edititemindex!=null){
          const index = this.edititemindex
          this.edititemindex = null
          this.$nextTick(()=>{
            this.$set(item,"edit",true);
            this.$nextTick(()=>{
              this.$refs.newiteminput[index].focus();
            })
          })
        }
        setTimeout(() => {
          this.setscrollsize();
        }, 0);
    },
    formatlocation(data){
      let listdata = {
          data:[],
          relates:[]
      }
      let count = 0
      data.forEach((item,index)=>{
        // console.log(item)
        let children = []
        count++
        item.children.forEach((childrenitem,childrenindex)=>{
            if(childrenitem.id!==item.index){
                const obj = this.format(childrenitem)
                obj.number = count
                children.push(obj)
                count++
            }
        })
        const obj = this.format(item)
        let nitem = {
            "list":children,
            "hsssubtasks":item.subtasks.issues.length>0?true:false,
            "number":count - children.length-1,
            ...obj
        }
        listdata.data.push(nitem)
      })
      return listdata
    },
    format(item){
        let ScheduledEnd = item.ScheduledEnd.date
        let ScheduledStart = item.ScheduledStart.date
        let left = ''
        let width = ''
        if(ScheduledEnd==null){
          const today = new Date()
          ScheduledEnd = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()
        }
        if(ScheduledStart==null){
            ScheduledStart = ScheduledEnd
        }
        ScheduledStart = new Date(ScheduledStart+' 00:00:00')
        ScheduledEnd = new Date(ScheduledEnd+' 00:00:00')
        const startdiftime = ScheduledStart - this.starttime
        const startdifday = startdiftime/(1000*60*60*24)
        left = startdifday*this.daystep
        const enddiftime = ScheduledEnd - ScheduledStart
        const enddifday = enddiftime/(1000*60*60*24)
        if(enddifday==0){
          width = 50
        }else{
          width = enddifday*this.daystep  
        }
        let show = false
        if(this.openlist.find((v)=>{return v==item.id})){
          show = true
        }
        let obj = {
            "id":item.id,
            "name": item.Subject.textValue,
            "show": show,
            "showchart": true,
            "left": left,
            "backgroundcolor": "rgb(0, 82, 204)",
            "width": width,
            "IssueType":item.IssueType,
            "ScheduledEnd":item.ScheduledEnd.date,
            "ScheduledStart":item.ScheduledStart.date
        }
        return obj
    },
    //回到当天
    returntoday(){
      const today = new Date((new Date()).toLocaleDateString())
      const diftime = today - this.starttime
      const difday = diftime/(1000*60*60*24)
      let left = difday*this.daystep
      left -= (this.$refs.roadmap.clientWidth - 300)/2
      this.transverseInleft = left/this.transverseInstep
    },
    weekdate(n,today,thisyear,thismonth,capmonth){
      const week = ['一','二','三','四','五','六','七']
      let day = 1
      let weekdate = []
      let weeknumber = 0

      for(let i=-1;i<n;i++){
        const step = thismonth+i-12
        let item = {}
        if(i<12-thismonth){
          item.year = thisyear-1
          item.month = thismonth+i+1
          item.title = (thisyear-1)+'年 '+capmonth[thismonth+i]
        }else if(i<24-thismonth){
          item.year = thisyear
          item.month = step+1
          item.title = capmonth[step]
        }else{
          const number = Math.ceil((i-24+thismonth+1)/12)
          item.year = thisyear+number
          item.month = thismonth+i-12*(number+1)+1
          item.title = (thisyear+number)+'年 '
          +capmonth[thismonth+i-12*(number+1)]
        }
        
        let weekday = 1
        const datenumber = new Date(item.year,item.month,0).getDate()
        item.datenumber = datenumber
        if(day<7){
          weekdate.push({
              title:item.title,
              year:item.year,
              month:item.month,
              datenumber:7,
              weeks:[]
          })
          const date = new Date(item.year,item.month-1,day)
          weekday = date.getDay()

          if(weekday==0){
            weekday = 7
          }
          weeknumber = weekday-1
          const prevdate = new Date(item.year,item.month-1,0)
          for(let k=0;k<weekday-1;k++){
            let dateday = prevdate.getDate() - weekday + k + 2
            weekdate[weekdate.length-1].weeks.push({
              week:week[k],
              date:dateday,
              year:item.year,
              month:item.month-1
            })
          }
        }

        for(let j=weekday-1;j<datenumber+weekday-1;j++){
          if(weeknumber==7){
            weeknumber = 0
          }
          const date = new Date(item.year,item.month,day)
          let dateday = date.getDate()
          if(weekdate[weekdate.length-1].weeks.length==7){
            weekdate.push({
              title:item.title,
              year:item.year,
              month:item.month,
              datenumber:7,
              weeks:[]
          })
          }
          weekdate[weekdate.length-1].title = item.title
          weekdate[weekdate.length-1].weeks.push({
            week:week[weeknumber],
            date:dateday,
            year:item.year,
            month:item.month
          })
          weeknumber++
          day++
        }
      }
      console.log(weekdate)
      return weekdate
    },
    quarterdate(n,today,thisyear,thismonth,capmonth){
      thismonth = 2
      let datedata = []
      for(let i=-1;i<n;i=i+3){
        const step = thismonth+i-12
        let item = {}
        if(i<12-thismonth){
          let lastmonth = capmonth[thismonth+i+2]
          if(thismonth+i+2>11){
            lastmonth = (thisyear)+'年 '+capmonth[thismonth+i+2-12]
          }
          item.title = (thisyear-1)+'年 '+ capmonth[thismonth+i]+' - '+lastmonth
          item.year=thisyear-1
          item.month=thismonth+i+1
        }else if(i<24-thismonth){
          let lastmonth = capmonth[step+2]
          if(step+2>11){
            lastmonth = (thisyear+1)+'年 '+capmonth[step+2-12]
          }
          item.title = capmonth[step] + ' - ' + lastmonth
          item.year=thisyear
          item.month=step+1
        }else{ 
          
          const number = Math.ceil((i-24+thismonth+1)/12)
          const yearstep = 12*(number+1)-2
          let lastmonth = capmonth[thismonth+i-yearstep]
          if(thismonth+i-yearstep>11){
            lastmonth = capmonth[thismonth+i-yearstep-12]
          }
          item.title = (thisyear+number)+'年 '
          +capmonth[thismonth+i-yearstep-2]
          +' - '
          +lastmonth
          item.year=thisyear+number
          item.month=thismonth+i-yearstep-2+1
        }
        let datenumber = 0
        let n = 0
        while(n<3){
          datenumber += (new Date(item.year,item.month+n,0)).getDate()
          n++
        }
        item.datenumber = datenumber
        datedata.push(item)
      } 
      return datedata
    },
    monthdate(n,today,thisyear,thismonth,capmonth){
      //生成n个月份
      //规则:当前月份的前12个月份和当前月份和后n-12个月份共n+1个月份
      let datedata = []
      for(let i=-1;i<n;i++){
        const step = thismonth+i-12
        let item = {}
        if(i<12-thismonth){
          item.title = (thisyear-1)+'年 '+capmonth[thismonth+i]
          item.year=thisyear-1
          item.month=thismonth+i+1
        }else if(i<24-thismonth){
          item.title = capmonth[step]
          item.year=thisyear
          item.month=step+1
        }else{
          const number = Math.ceil((i-24+thismonth+1)/12)
          item.title = (thisyear+number)+'年 '
          +capmonth[thismonth+i-12*(number+1)]
          item.year=thisyear+number
          item.month=thismonth+i-12*(number+1)+1
        }
        item.datenumber = (new Date(item.year,item.month,0)).getDate()
        datedata.push(item)
      } 
      return datedata
    },
    pathmouseenter(item){
      this.activepathitem = item.stroke
      item.showtitle=true
      item.stroke = 'rgb(4, 117, 247)'
      this.showsvg=false
      this.showsvg=true
    },
    pathmouseout(item){
      item.showtitle=false
      item.stroke = this.activepathitem
      this.showsvg=false
      this.showsvg=true
    },
    filterlist(name,item) {
      var top = -22 
      for(var i = 0;i<this.listdata.data.length;i++){
          top += 44
        var items = this.listdata.data[i]
        if (item[name] == items.number) {
            this.$set(items,'hidden',false)
            this.$set(items,'top',top)
            return items
        }else{
          for(var j = 0;j<items.list.length;j++){
            var listitem = items.list[j]
            if(items.show){
              top += 44
            }
            if (item[name] == listitem.number&&items.show) {
                this.$set(listitem,'top',top)
                this.$set(listitem,'hidden',false)
                return listitem
            }else if(item[name] == listitem.number){
                this.$set(listitem,'top',top)
                this.$set(listitem,'hidden',true)
                return listitem
            }
          }
        }
      }
    },
    bodymousemove(e) {
      if (this.transverseInmouse) {
        //滚动条
        this.transverseInmousemove(e);
      }
      if (this.portraitInmouse) {
        //滚动条
        this.portraitInmousemove(e);
      }
      if (this.sizebtnmouse) {
        //事务宽度
        this.sizebtnmousemove(e);
        this.activemousemoveevent = false
      }
      if (this.chartitemmouse) {
        //事务位置
        this.chartitemmousemove(e);
        this.activemousemoveevent = false
      }
      if(this.connectmouse){
        this.connectmousemove(e);
      }
    },
    itemhover(index) {
      if (!this.drag) {
        this.hoverindex = index;
      }
    },
    itemhoverleave() {
      if (!this.drag) {
        this.hoverindex = null;
      }
    },

    //开始拖拽事件
    onStart(e) {
      this.drag = true;
    },
    choose() {
      this.hoverindex = null;
    },
    onMove(e, list) {
      this.chooseindex = null;
      this.relatedContext = e.relatedContext
      return true;
    },
    //拖拽结束事件
    onEnd(e) {
      console.log(this.relatedContext)
      var item = e.item._underlying_vm_
      const relateditem = this.relatedContext.element
      let dragoption = {
        issueIds:[item.id]
      }
      if(e.newIndex<=this.relatedContext.index){
        dragoption.beforeIssueId = relateditem.id
      }else{
        dragoption.afterIssueId = relateditem.id
      }

      if(e.from.__vue__.$attrs.groupid!=e.to.__vue__.$attrs.groupid){
         commonapi.entitysaverecord({
          ParentActivityId:{Id:e.to.__vue__.$attrs.groupid},
         },4200,item.id).then(()=>{
           this.savesort(dragoption)
         })
      }else{
        this.savesort(dragoption)
      }
      this.drag = false;
      this.chooseindex = null;
    },
    savesort(dragoption){
      return TransitionAndRankJWMBoardView(dragoption)
    },
    //新建事务
    newitem(item, index) {
      if(!item.show){
        this.showgroup(item)
      }
      this.activecontent = index;
      this.edititemindex = index;
      if(item.list.length!=0){
        this.$nextTick(()=>{
          this.$set(item,"edit",true);
          this.$nextTick(()=>{
            this.$refs.newiteminput[this.edititemindex].focus();
          })
        })
      }
    },
    finishedit(e, item) {
      setTimeout(() => {
        if (e == 27) {
          if (this.newlistitemtitle != "") {
            // item.list.push({
            //   name: this.newlistitemtitle,
            //   list: [],
            // });
            item.edit = false;
            this.savechildrentask(item.is)
            this.newlistitemtitle = "";
          }
          this.edititemindex = null;
          this.activecontent = null
          item.edit = false;
        } else {
          if (e.keyCode == 27) {
            item.edit = false;
            this.newlistitemtitle = "";
            this.edititemindex = null;
            this.activecontent = null
          } else if (e.keyCode == 13 && this.newlistitemtitle != "") {
            item.edit = false;
            this.savechildrentask(item.id)
            // item.list.push({
            //   name: this.newlistitemtitle,
            // });
            this.newlistitemtitle = "";
          }
        }
      },100);
    },
    footclick() {
      //alert(1)
    },
    //快速新建保存
    savechildrentask(parent){
      this.activecontent = null
      this.edititemindex = null
      commonapi.entitysaverecord({
          ActivityTypeCode:4212,
          RegardingObjectId:{Id:this.$route.query.id},
          Subject:this.newlistitemtitle,
          ParentActivityId:{Id:parent},
          IssueType:'10010'
      },4200).then(()=>{
        // console.log(parent)
        this.showchildren = parent
        this.$emit('getchildrendata',parent)
      })
    },
    savetask(){
      commonapi.entitysaverecord({
          ActivityTypeCode:4212,
          RegardingObjectId:{Id:this.$route.query.id},
          Subject:this.newlisttitle
      },4200).then(()=>{
        this.$emit('getchildrendata')
      })
    },
    //新建列表
    newlist() {
      this.newlistbox = true;
      setTimeout(() => {
        this.$refs.newlistinput.focus();
      }, 0);
    },
    finishnewlist(e) {
      if (e == 27) {
        if (this.newlisttitle != "") {
          // this.listdata.data.push({
          //   name: this.newlisttitle,
          //   list: [],
          // });
          this.savetask()
          this.newlisttitle = "";

        }
        this.newlistbox = false;
      } else {
        if (e.keyCode == 27) {
          this.newlistbox = false;
          this.newlisttitle = "";
        } else if (e.keyCode == 13 && this.newlisttitle != "") {
          // this.listdata.data.push({
          //   name: this.newlisttitle,
          //   list: [],
          // });
          this.savetask()
          this.newlisttitle = "";
        }
      }
    },
    showgroup(item) {
      if(item.list.length==0){
        const parentid = item.id
        this.showchildren = JSON.parse(JSON.stringify(item.id))
        this.$emit('getchildrendata',parentid)
      }
      item.show = !item.show
      if(item.show){
        this.openlist.push(item.id)
      }else{
        this.openlist.splice(this.openlist.findIndex((listitem)=>{return listitem.id==item.id}),1)
      }
    },
    //滚动条
    //计算滚动条长度
    setscrollsize() {
      if (
        this.$refs["roadmap-main"].clientWidth >
        this.$refs.roadmap.clientWidth - 17
      ) {
        this.showtransverseOutside = true;
      }else{
        this.showportraitOutside = false;
      }
      if (
        this.$refs["roadmap-main"].clientHeight >
        this.$refs.roadmap.clientHeight
      ) {
        this.showportraitOutside = true;
      }else{
        this.showportraitOutside = false;
      }
      setTimeout(() => {
        this.transverseInstep =
          this.$refs.righttablerowbox.clientWidth /
          (this.$refs.transverseOutside.clientWidth + 10);
        this.transverseInsize =
          this.$refs.transverseOutside.clientWidth / this.transverseInstep;
        this.portraitInstep =
          this.$refs.righttablerowbox.clientHeight /
          (this.$refs.portraitOutside.clientHeight + 10);
        this.portraitInsize =
          this.$refs.portraitOutside.clientHeight / this.portraitInstep;
      }, 0);
    },
    transverseInmousedown(e) {
      this.transverseInmousestart = e.offsetX;
      this.transverseInmouse = true;
    },
    transverseInmousemove(e) {
      var width = this.$parent.$parent.showleft ? 240 : 20;
      if (this.transverseInmouse) {
        var left = e.pageX - 327 - 23 - width - this.transverseInmousestart;
        if (left < 0) {
          left = 0;
        }
        var maxleft =
          this.$refs.transverseOutside.clientWidth - this.transverseInsize;
        if (left > maxleft) {
          left = maxleft;
        }
        this.transverseInleft = left;
      }
    },
    portraitInmousedown(e) {
      this.portraitInmousestart = e.offsetY;
      this.portraitInmouse = true;
    },
    portraitInmousemove(e) {
      if (this.portraitInmouse) {
        var top = e.pageY - 75 - 94 - 55 - this.portraitInmousestart;
        if (top < 0) {
          top = 0;
        }
        var maxtop = this.$refs.portraitOutside.clientHeight - this.portraitInsize;
        if (top > maxtop) {
          top = maxtop;
        }
        this.portraitIntop = top;
      }
    },
    roadmapscroll() {
      this.transverseInleft =
        this.$refs.roadmap.scrollLeft / this.transverseInstep;
      this.portraitIntop = this.$refs.roadmap.scrollTop / this.portraitInstep;
    },
    sizebtnclick(type, item) {
      this.sizebtnmouse = type;
      this.sizebtnmousemoveitem = item;
      this.activesizebtnmousemoveitem = JSON.parse(JSON.stringify(item));
    },
    sizebtnmousemove(e) {
      var width = this.$parent.$parent.showleft ? 240 : 20;
      var oleft = this.activesizebtnmousemoveitem.left;
      var owidth = this.activesizebtnmousemoveitem.width;
      var oldwidth = this.sizebtnmousemoveitem.width
      var oldleft = this.sizebtnmousemoveitem.left
      var left = this.$refs.roadmap.scrollLeft + e.pageX - width - 323 - 17;
      const daystep = this.daystep/2
      if((this.sizebtnmouse == "left"&&Math.abs(left-oldleft)>=daystep)||
      (this.sizebtnmouse == "right"&&Math.abs(Math.abs(left-oldleft)-oldwidth)>=daystep)){
        let stepwidth = daystep
        if (this.sizebtnmouse == "left") {
          if((oldleft - left)<0){
            stepwidth = -daystep
          }
          this.sizebtnmousemoveitem.width = owidth + (oleft - left)+stepwidth;
          this.sizebtnmousemoveitem.left = left-stepwidth;
        } else if (this.sizebtnmouse == "right") {
          if((left - oldleft - oldwidth)<0){
            stepwidth = -daystep
          }
          this.sizebtnmousemoveitem.width = left - oleft + stepwidth;
        }
        this.formatmoveitemtime(this.sizebtnmousemoveitem)

      }
    },
    chartitemmousedown(e,item){
      this.chartitemmouse = true
      this.activechartitem = item
      this.activechartitemoffsetX = e.offsetX
      this.connectbtnboxshow = false
    },
    chartitemmousemove(e){
      const width = this.$parent.$parent.showleft ? 240 : 20;
      const left = e.pageX + this.$refs.roadmap.scrollLeft - this.activechartitemoffsetX - width -323 - 17
      if(Math.abs(this.activechartitem.left-left)>=this.daystep){
        this.activechartitem.left = left
        this.formatmoveitemtime(this.activechartitem)
      }
    },
    formatmoveitemtime(item){
        const difday = (item.left/this.daystep).toFixed(0)
        const diftime = new Date(difday*1000*60*60*24)
        const newtime = this.starttime.getTime()+diftime.getTime()
        const newtimestr = (new Date(newtime)).toLocaleDateString()
        const enddifday = (item.width/this.daystep).toFixed(0)
        const enddiftime = new Date(enddifday*1000*60*60*24)
        const endtime = enddiftime.getTime()+newtime
        const endtimestr = (new Date(endtime)).toLocaleDateString()
        item.ScheduledStart = newtimestr
        item.ScheduledEnd = endtimestr
    },
    connectbtnclick(type,item){
      this.connectmouse = true
      this.connectmousetype = type
    },
    connectmousemove(e){
      this.openconnect = false
      this.connectbtn.right = false
      var width = this.$parent.$parent.showleft ? 240 : 20;
      var right = 0
      var top = 0
      if(this.connectmousetype=='right'){
        var right = this.activeconnectbtnboxitem.width
        var top = 20
      }
      this.connectbtnboxitem = {
        left:e.pageX+this.$refs.roadmap.scrollLeft-width-355,
        top:e.pageY+this.$refs.roadmap.scrollTop - 200,
        number:this.connectbtnboxitem.number
      }
      this.connectlineshow = true
      this.connectline = 'M '+(this.activeconnectbtnboxitem.left+right)+' '+this.activeconnectbtnboxitem.top 
      +' L'+(this.connectbtnboxitem.left+20)+' '+(this.connectbtnboxitem.top-20)
    },
    chartitemover(item){
      this.settop(item)
      if(this.openconnect){
        this.activeconnectbtnboxitem = item
        this.connectbtnboxshow = true
      }
      this.connectbtnboxitem = item
    },
    //设置hoveritem的top值
    settop(item){
       var top = -22
      for(var i = 0;i<this.listdata.data.length;i++){
          top += 44
        var items = this.listdata.data[i]
        if (item.id == items.id) {
            this.$set(items,'top',top)
            return items
        }else{
          for(var j = 0;j<items.list.length;j++){
            var listitem = items.list[j]
            if(items.show){
              top += 44
            }
            if (item.id == listitem.id&&items.show) {
                this.$set(listitem,'top',top)
                return listitem
            }else if(item.id == listitem.id){
                this.$set(listitem,'top',top)
                return listitem
            }
          }
        }
      }
    },
    chartiteleave(item){
      if(this.openconnect){
        this.connectbtnboxshow = false
      }
    },
    connectbtnboxover(){
      this.connectbtnboxshow = true
    },
    connectmouseout(){
      if(this.openconnect){
        this.connectbtnboxshow = false
      }
    },
    showdetail(item){
      if(this.activemousemoveevent){
        this.chartitemmouse = false
        this.detaildialog = true
        this.detailitem = item
      }
    }
  },
};
</script>
<style scoped>
.ghostClass {
  background-color: rgb(196, 219, 253) !important;
}
.chosenClass {
  background-color: rgb(196, 219, 253) !important;
  opacity: 1 !important;
}
.dragClass {
  background-color: rgb(222, 235, 255) !important;
  opacity: 1 !important;
  box-shadow: none !important;
  outline: none !important;
  background-image: none !important;
}
.roadmap-container {
  position: relative;
  height: calc(100vh - 150px);
}
.roadmap {
  border: 1px solid #bbb;
  border-radius: 4px;
  overflow: scroll;
  width: 100%;
  height: calc(100vh - 150px);
  position: absolute;
  top: 17px;
  left: 17px;
}
.list-item-head {
  display: flex;
  align-items: center;
  height: 44px;
  cursor: pointer;
}
.list-item-name{
  display: flex;
  align-items: center;
}
.list-item-name img {
  position: relative;
  margin: 0 5px;
}
.itemname{
  max-width: 200px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  display: inline-block;
}
.roadmap-head {
  display: flex;
  height: 50px;
  line-height: 50px;
  background-color: #f2f2f2;
  border-bottom: 1px solid #dedede;
  width: fit-content;
  position: sticky;
  top: 0;
  z-index: 3;
}
.head-left {
  width: 300px;
  box-sizing: border-box;
  padding-left: 20px;
  border-right: 2px solid #bbb;
  flex: none;
  position: sticky;
  left: 0;
  background-color: #f2f2f2;
}
.head-right {
  display: flex;
  flex: 1;
  font-size: 12px;
}
.head-date {
  width: 260px;
  text-align: center;
  border-right: 1px solid #dedede;
  box-sizing: border-box;
}
.head-date:last-child {
  border-right: 0;
}
.list-item-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.list-item-name i {
  font-weight: 700;
  margin-left: 5px;
  font-size: 12px;
  cursor: pointer;
}
.roadmap-body {
  display: flex;
  width: 100%;
  height: calc(100% - 51px);
}
.lefttable {
  width: 300px;
  height: fit-content;
  box-sizing: border-box;
  border-right: 2px solid #bbb;
  flex: none;
  position: sticky;
  left: 0;
  background-color: white;
  border-bottom: 1px solid #dedede;
  z-index: 2;
}
.lefttable .list-item-edit {
  margin-right: 15px;
  font-weight: 700;
  width: 24px;
  height: 24px;
  line-height: 24px;
  color: #000 !important;
  display: none;
  background-color: #dedede;
}
.list-item-edit:hover {
  background-color: #ccc;
}
.list-item-head:hover .list-item-edit {
  display: block;
}
.bgbox {
  background-color: #f3f3f3;
}
.newlist-content {
  padding: 6px 10px;
}
.newlist-btn {
  height: 32px;
  line-height: 32px;
  padding-left: 15px;
  cursor: pointer;
  border-radius: 4px;
}
.newlist-btn:hover {
  background-color: #ddd;
}
.newlist-btn i {
  font-weight: 700;
}
.contentlist .item {
  display: flex;
  justify-content: space-between;
  padding: 11px 0 11px 50px;
  cursor: pointer;
  height: 44px;
  box-sizing: border-box;
}
.item-type img {
  margin-top: 2px;
}
.item-type {
  margin-right: 10px;
}
.item-left {
  display: flex;
}
.item-group {
  background-color: #deebff;
  color: #0747a6;
  border-radius: 4px;
  font-size: 12px;
  line-height: 22px;
  padding: 0 5px;
  margin-right: 10px;
  font-weight: 700;
}
.newlist-box {
  padding: 6px 10px;
}
.newlist-input {
  box-shadow: rgb(76 154 255) 0px 0px 0px 2px inset;
  border: 0;
  outline: none;
  height: 32px;
  width: 100%;
  border-radius: 4px;
  text-indent: 5px;
}
.edit-box {
  margin: 5px 10px 5px 40px;
  padding: 0 10px;
  height: 32px;
  display: flex;
  align-items: center;
  box-shadow: rgb(76 154 255) 0px 0px 0px 2px inset;
}
.newiteminput {
  border: 0;
  outline: none;
  text-indent: 5px;
  flex: 1;
}
.righttable {
  flex: 1;
  height: fit-content;
  border-bottom: 1px solid #dedede;
  position: relative;
  z-index: 1;
}
.line-box {
  width: 100%;
  height: 100%;
  display: flex;
  position: absolute;
  top: 0;
  pointer-events: none;
}
.line-box > div {
  width: 260px;
  border-right: 1px solid #dedede;
}
.line-box > div:last-child {
  border-right: 0;
}
.transverseOutside {
  position: absolute;
  border-radius: 10px;
  visibility: visible;
  z-index: 11;
  right: 7px;
  left: 327px;
  height: 10px;
  bottom: 0px;
}
.transverseOutside:hover {
  background-color: rgba(0, 0, 0, 0.2);
}
.transverseIn {
  position: relative;
  border-radius: 10px;
  background-color: rgba(0, 0, 0, 0.4);
  height: 100%;
  width: 591px;
}
.portraitOutside {
  position: absolute;
  border-radius: 10px;
  visibility: visible;
  z-index: 11;
  top: 75px;
  bottom: 7px;
  width: 10px;
  right: 0px;
}
.portraitOutside:hover {
  background-color: rgba(0, 0, 0, 0.2);
}
.portraitIn {
  position: relative;
  border-radius: 10px;
  background-color: rgba(0, 0, 0, 0.4);
  width: 100%;
  height: 160px;
}
.righttablerow-box {
  width: 100%;
  background-color: #fff;
}
.righttable-rowhead {
  height: 44px;
}
.roadmap-main {
  height: fit-content;
  width: fit-content;
}
.righttable-row .item {
  height: 44px;
  box-sizing: border-box;
  background-color: #fff;
}
.hover {
  background-color: rgb(235, 236, 240) !important;
}
.chart-item {
  height: 24px;
  border-radius: 4px;
  position: absolute;
  top: 9px;
  z-index: 100;
  cursor: pointer;
}
.item-dropbox {
  /* display: none; */
}
.sizebtn {
  height: 16px;
  width: 6px;
  border-radius: 4px;
  background: rgb(24, 130, 252);
  margin: 4px;
  float: left;
}
.sizebtn:hover {
  cursor: e-resize;
}
.connectbtn {
  position: absolute;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: rgb(0, 82, 204);
  cursor: pointer;
}
.connectbtn img {
  display: none;
  width: 16px;
  height: 16px;
  position: absolute;
  left: -4px;
  top: -4px;
  background-color: rgb(0, 82, 204);
  border-radius: 50%;
}
.connectbtn:hover img {
  display: block;
}
.left.connectbtn {
  top: -8px;
  left: 12px;
}
.right.connectbtn {
  bottom: -8px;
  right: 12px;
}
.showconnect {
  float: right;
}
.sizebtn.right {
  float: right;
}
.chart-item:hover .item-dropbox {
  display: block;
}
.righttable-row {
  position: relative;
}
.righttable-row .item {
  position: relative;
}
.chart-item .starttime {
  position: absolute;
  left: -70px;
  margin-top: 3px;
  font-size: 12px;
  color: #777;
}
.chart-item .endtime {
  position: absolute;
  right: -70px;
  margin-top: 3px;
  font-size: 12px;
  color: #777;
}
.item-relevance {
  position: absolute;
  right: 12px;
  border-radius: 50%;
  height: 16px;
  width: 16px;
  margin-top: 2px;
  padding: 2px;
}
.item-relevance:hover {
  background-color: rgb(4, 117, 247);
}
.item-relevance img {
  width: 16px;
  height: 16px;
}
.svgbox{
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}
.svgbox svg{
  width: 100%;
  height: 100%;
}
.svgbox path{
  pointer-events: all;
}
.item-dropbox{
  display: none;
}
.chart-item:hover .item-dropbox{
  display: block;
}
.connectbtn-box{
  position: absolute;
  z-index: 10;
  margin-top: -15px;
  height: 28px;
}
.rightconnectbtn-enter-active, .rightconnectbtn-leave-active,.leftconnectbtn-enter-active, .leftconnectbtn-leave-active {
  transition: all .3s;
}
.rightconnectbtn-enter, .rightconnectbtn-leave-to {
  bottom: 0 !important;
}
.leftconnectbtn-enter, .leftconnectbtn-leave-to {
  top: 0 !important;
}
.el-dialog__wrapper{
  pointer-events: none;
}
.el-dialog__wrapper>>>.el-dialog{
  margin-bottom: 0;
  position: absolute;
  right: 0;
  border-radius: 0;
  pointer-events: all;

}
.el-dialog__wrapper>>>.el-dialog__body{
  padding: 0;
}
.el-dialog__wrapper>>>.el-dialog__header{
  padding: 0;
}
.datechange{
  position: fixed;
  right: 20px;
  display: flex;
  bottom: 15px;
  z-index: 9;
  background-color: #FFFFFF;
  box-shadow: 0px 4px 4px rgba(0,0,0,0.25);
  border-radius: 4px;
}
.datechange.today{
  right: 290px;
}
.dateitem{
  width: 85px;
  height: 32px;
  line-height: 32px;
  text-align: center;
}
.dateitem:hover{
  background-color: #f2f2f2;
  cursor: pointer;
}
.dateitem.active{
  background-color: #253858;
  color: #fff;
}
.dateitem+.dateitem{
  border-left: 1px solid #dedede;
}
.weekcontainer{
  display: flex;
  justify-content: space-around;
  color: #7A869A;
}
.weekdate{
  line-height: 16px;
}
.weekdate-title{
  color: #999;
}
.spacebkx{
  width: 17px;
  display: inline-block;
}
.item-type img{
  width: 16px;
  height: 16px;
}
.list-item-name img{
  width: 16px;
  height: 16px;
}
.edit-box img{
  width: 16px;
  height: 16px;
}
.item-left{
  align-items: center;
}
.item-type{
  display: flex;
  align-items: center;
}
</style>