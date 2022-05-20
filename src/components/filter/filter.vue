<template>
    <div class="templatecontainer">
        <div class="search-container">
        <div class="item-container">
            <el-input
            class="searchinput"
            @change="$emit('search',filterExpression,searchtext)"
            size="small"
                placeholder="请输入内容"
                prefix-icon="el-icon-search"
                v-model="searchtext">
            </el-input>
        </div>
        <div class="item-container filteritem btn" 
        v-for="(item,index) in filterExpression" :key="item.id"
        :class="{'shuritem':item.value.length!==0}">
            <div class="" v-if="item.type=='S'">
                <el-popover
                    popper-class="filterpopper"
                    width="200"
                    trigger="click">
                    <div class="popoverinputcontainer">
                        <el-input 
                        :ref="item.column"
                        v-model="item.testvalue"
                        placeholder="开始输入..."
                        type="textarea" 
                        resize="none">
                        </el-input>
                    </div>
                    <div class="btn" @click="item.complete = true;item.value=item.testvalue;$emit('search',filterExpression)">
                        更新
                    </div>
                    <div slot="reference" :ref="item.column+'click'">
                        <div v-if="item.value.length==0">{{item.label}}</div>
                        <div v-else>{{item.label}}:"{{item.value}}"</div>
                    </div>
                </el-popover>
            </div>
            <div class="" v-if="item.type=='L'||item.type=='IssueType'">
                <checkboxdrop 
                @change="(value,label)=>{filtervaluechange(item,value,label)}"
                v-model="item.value"
                class="" 
                :ref="item.column"
                :picklistValues="item.picklistValues"
                :filterdata="item.filterValues">
                <span :ref="item.column+'click'">
                    <span v-if="item.value.length==0">{{item.label}}</span>
                    <span v-else>{{item.label}}:</span>
                </span>
                </checkboxdrop>
            </div>
            <div class="" v-if="item.type=='Y'||item.type=='U'||item.type=='status'">
                <checkboxdrop 
                @change="(value,label)=>{filtervaluechange(item,value,label)}"
                v-model="item.value"
                class="" 
                :ref="item.column"
                :checkboxdroptype="item.type"
                :filtertable="true"
                :picklistValues="item.picklistValues"
                :referencedEntityObjectTypeCode="item.referencedEntityObjectTypeCode">
                <span :ref="item.column+'click'">
                    <span v-if="item.value.length==0">{{item.label}}</span>
                    <span v-else>{{item.label}}:</span>
                </span>
                </checkboxdrop>
            </div>
            <div class="" v-if="item.type=='D'||item.type=='F'">
                <el-popover
                    popper-class="filterpopper"
                    trigger="click">
                    <div class="popoverinputcontainer">
                        <div class="popoverinputcontainer-operator">
                            <el-radio 
                            @change="item.operatorType=operator.operatorType;"
                            v-model="item.operator" 
                            v-for="operator in item.operatorlist" 
                            :key="operator.operator" 
                            :label="operator.operator">{{operator.label}}</el-radio>
                        </div>
                        <div v-if="item.operator=='in_day'">
                            <el-date-picker
                                v-model="item['value='+item.operator]"
                                type="date"
                                format="dd"
                                value-format="dd"
                                placeholder="选择日期">
                            </el-date-picker>
                        </div>
                        <div v-else-if="item.operator=='in_month'">
                            <el-date-picker
                                v-model="item['value='+item.operator]"
                                type="month"
                                format="MM"
                                value-format="MM"
                                placeholder="选择日期">
                                </el-date-picker>
                        </div>
                        <div v-else-if="item.operator=='in_year'">
                            <el-date-picker
                                v-model="item['value='+item.operator]"
                                type="year"
                                format="yyyy"
                                value-format="yyyy"
                                placeholder="选择日期">
                                </el-date-picker>
                        </div>
                        <div v-else-if="item.operator=='in_monthday'">
                            <el-date-picker
                                v-model="item['value='+item.operator]"
                                type="date"
                                format="MM-dd"
                                value-format="MM-dd"
                                placeholder="选择日期">
                                </el-date-picker>
                        </div>
                        <div v-else-if="item.operatorType!=0">
                            <div v-if="item.operatorType==1">
                                <el-date-picker
                                v-model="item['value='+item.operator]"
                                type="datetime"
                                format="yyyy-MM-dd HH:mm"
                                value-format="yyyy-MM-dd HH:mm"
                                placeholder="选择日期">
                                </el-date-picker>
                            </div>
                            <div v-if="item.operatorType==3">
                                <el-date-picker
                                v-model="item['value='+item.operator]"
                                type="datetimerange"
                                format="yyyy-MM-dd HH:mm"
                                value-format="yyyy-MM-dd HH:mm"
                                placeholder="选择日期">
                                </el-date-picker>
                            </div>
                        </div>
                    </div>
                    <div class="btn" @click="item.complete = true;
                    timefilterchoose(item,item['value='+item.operator])
                    ">
                        更新
                    </div>
                    <div :ref="item.column+'click'" slot="reference">
                        <div v-if="(item.operatorlabel&&item.operatorlabel.length>0)||item.value.length>0">
                        {{item.label}}:
                        <span v-if="typeof item.value=='object'">
                            {{item.value.join('至')}}
                        </span>
                        <span v-else>
                            {{item.operatorlabel}} 
                            {{item.value}}
                        </span>
                        </div>
                    <div v-else>{{item.label}}
                        {{item.operatorlabel}}
                    </div>
                    </div>
                </el-popover>
            </div>
            <span class="deletecontainer" @click="removefilteritem(index)">
                <i class="el-icon-close"></i>
            </span>
            <!-- <checkboxdrop v-model="item.value" class="btn" :filterdata="item">
                <span>{{item.label}}</span>
            </checkboxdrop> -->
        </div>
        <div class="item-container morefilter" v-if="filterdata.entity">
            <div class="filteritem btn">
                <checkboxdrop class="" :shownumber="false" @change="(val)=>{morefilterchange(val,true)}" v-model="addfilter" :filterdata="filterdata.entity.attributes">
                    <span ref="morefilterref">更多</span>
                    <span class="deletecontainer">
                        <i class="el-icon-plus"></i>
                    </span>
                </checkboxdrop> 
            </div>
        </div>
        <div class="item-container line"></div>
        <div class="item-container" @click="clearfilter">
            <div class="clearfilter">
                重置
            </div>
        </div>
        <div class="item-container" @click="savefilter">
            <div class="save">
                保存筛选
            </div>
        </div>
    </div>
    </div>
</template>
<script>
import Userhead from '@/components/Userheadphoto.vue'
import checkboxdrop from '@/components/dropbtn/checkboxdrop.vue'
import selectdrop from '@/components/dropbtn/selectdrop.vue'
import commonapi from '@/api/commonapi.js'

export default {
    data(){
        return {
            checkList:[],
            searchtext:'',
            grouptype:'无',
            choseuser:false,
            selectdata:['无','被分配人','长篇故事'],
            addfilter:[],
            filterExpressiondata:[],
            state:''
        }
    },
    computed:{
        filterExpression:{
            get(val){
                return this.filterExpressiondata
            },
            set(val){
            }
        }
    },
    created(){
        
    },
    mounted(){
        // this.createdfilter()
    },
    watch:{
        filterdata(){
            this.createdfilter()
        }
    },
    props:['filterdata'],
    components:{
        Userhead,checkboxdrop,selectdrop
    },
    methods:{
        clearfilter(){
            this.$emit('reload')
        },
        createdfilter(){
            this.addfilter.splice(0,this.addfilter.length)
            if(this.filterdata.filter){
                if(this.filterdata.filter[0].FilterExpression!=''){
                const filterExpressiondata =  JSON.parse(this.filterdata.filter[0].FilterExpression)
                this.morefilterchange(filterExpressiondata)
                }
            }
        },
        removefilteritem(index){
            this.filterExpressiondata.splice(index,1)
            this.addfilter.splice(index,1)
            this.$emit('search',this.filterExpression)
        },
        timefilterchoose(item,val){
            item.operatorlabel = item.operatorlist.find((operator)=>{return item.operator==operator.operator}).label
            item.value = val
            if(!val){
                item.value = ''
                item.valuetype = 'novalue'
            }
            this.$emit('search',this.filterExpression)
        },
        filtervaluechange(item,value,label){
            item.picklistValues = label
            // this.savefilter()
            this.$emit('search',this.filterExpression)
        },
        userchose(){
            this.choseuser = !this.choseuser
        },
        valuechange(val){
            this.grouptype = val
            this.$emit('search',this.grouptype)
        },
        morefilterchange(val,add){
            var newfilterExpression = this.filterExpression.filter((item)=>{
                return val.find((element=>{return item.column == element}))?true:false
            })
            this.filterExpressiondata = newfilterExpression
            val.forEach((element,index) => {
                if(typeof element == 'object'){
                    var picklistValues = element.picklistValues
                    var operator = element.operator
                    var column = element.attribute
                    var value = element.operands
                }else{
                    var column = element
                }
                const field = this.filterdata.entity.attributes.find((item)=>{return item.name==column})
                if(!field){
                    return false;
                }
                if(!this.addfilter.find((item)=>{ return item==column})){
                    this.addfilter.push(column)
                }
                if(!this.filterExpressiondata.find((item)=>{return item.column==column})){
                    if(field.type=='Y'||field.type=='L'||field.type=='O'||(typeof value=='object'&&value.length>1)){
                        var value = value?value:[]
                    }
                    else{
                        var value = value?value[0]:''
                    }
                    if(field.type=='S'){
                        operator = 'contains'
                    }
                    operator = operator?operator:'eq'
                    picklistValues = picklistValues?picklistValues:[]
                    const operatorlabel = field.operator.find((item)=>{return item.operator==operator}).label
                    const operatorType = field.operator.find((item)=>{return item.operator==operator}).operatorType
                    var valuetype = ''
                    if(operatorType==0){
                       valuetype = 'novalue'
                    }
                    const defaultattr = {}
                    defaultattr['value='+operator] = value
                    this.filterExpressiondata.push({
                        column:column,
                        label:field.label,
                        type:field.type,
                        value:value,
                        testvalue:value,
                        complete:false,
                        referencedEntityObjectTypeCode:field.referencedEntityObjectTypeCode,
                        picklistValues:picklistValues,
                        operator:operator,
                        filterValues:field.filterValues,
                        operatorlist:field.operator,
                        operatorType:operatorType,
                        operatorlabel:operatorlabel,
                        valuetype:valuetype,
                        newfilter:true,
                        ...defaultattr
                    })
                    if(add){
                        this.$nextTick(()=>{
                            this.$refs.morefilterref.click()
                            this.$refs[column+'click'][0].click()
                            this.$nextTick(()=>{
                                if(typeof this.$refs[column]){
                                    if(typeof this.$refs[column][0].focus == 'function'){
                                        this.$refs[column][0].focus()
                                    }
                                }
                            })
                        })
                    }
                }
            });
            const newfilter = this.filterExpressiondata[this.filterExpressiondata.length-1]
            if(newfilter&&newfilter.newfilter){
                newfilter.newfilter = false
            }
            
            

        },
        savefilter(){
            const data = this.getfilterexpression()
            commonapi.entityfilterexpressionsave(data,this.filterdata.filter[0].ReturnedTypeCode,this.filterdata.filter[0].SavedQueryId)
            .then(()=>{
                this.$message.success('保存成功')
                this.$emit('reload')
            })
        },
        getfilterexpression(){
            const data = []
            this.filterExpression.forEach((item,index)=>{
                // if(item.value.length>0||item.valuetype=='novalue'){
                    const operands = typeof item.value == 'object'?item.value:[item.value]
                    data.push({
                        sort:index+1,
                        attribute:item.column,
                        column:item.column,
                        label:item.label,
                        operator:item.operator,
                        logical:'AND',
                        picklistValues:item.picklistValues,
                        operands:operands,
                        id:index+1,
                        isEditable:true,
                        type:item.type
                    })
                // }
            })
            return data
        }
    }
}
</script>
<style scoped>
    .templatecontainer{
        padding: 10px 40px;
        display: flex;
        align-items: center;
        justify-content: space-between
    }
    .search-container{
        display: flex;
        align-items: center;   
        flex-wrap: wrap;
    }
    .item-container{
        margin-right: 10px;
        display: flex;
        margin-bottom: 10px;
    }
    .adduser{
        width: 32px !important;
        height: 32px !important;
        line-height: 32px;
        color: rgb(122, 134, 154);
        background-color: rgb(223, 225, 230);
        border-radius: 50%;
        display: flex;
        align-items: center;   
        justify-content: center;
        cursor: pointer;
    }
    .userchose{
        padding: 2px;
        border-radius: 50%;
        height: 32px;
        width: 32px;
        border: 2px solid transparent;
    }
    .userchose.active{
        border: 2px solid rgb(0, 82, 204);
    }
    .dropbtn .el-dropdown{
        color:  rgb(66, 82, 110) !important;        
    }
    .morefilter>>>.el-icon--right{
        display: none;
    }
    .filteritem{
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .filteritem>>>.el-input__inner{
        margin-left: 10px;
        height: 16px;
        line-height: 16px;
        border: 0;
        background-color: transparent;
    }
    .popoverinputcontainer{
        margin-bottom: 15px;
    }
    .filterpopper{
        padding: 0;
    }
    .deletecontainer{
        margin-left: 10px;
    }
    .templatecontainer .btn:hover{
        background-color: rgb(231, 232, 236);
    }
    .deletecontainer i::before{
        margin-right: 0;
    }
    .filteritem>>>.dropbtn{
        padding: 0;
    }
    .popoverinputcontainer-operator{
        max-height: 150px;
        min-width: 200px;
        margin-bottom: 20px;
        overflow: auto;
    }
    .popoverinputcontainer-operator .el-radio{
        display: block;
        margin: 5px 0;
    }
    .save{
        color:#0065FF ;
        cursor: pointer;
    }
    .save:hover{
        text-decoration: underline;
    }
    .clearfilter{
        color: #6B778C;
        cursor: pointer;
    }
    .clearfilter:hover{
        text-decoration: underline;
    }
    .filter-search .item-container.shuritem,
    .filter-search .item-container.shuritem span,
    .filter-search .item-container.shuritem>>>i,
    .filter-search .item-container.shuritem .dropbtn>>>.el-dropdown,
    .filter-search .item-container.shuritem .dropbtn{
        background-color: #253858 !important;
        color: #fff !important;
    }
    .line{
        width: 2px;
        height: 20px;
        background-color: #f2f2f2;
    }
</style>