<template>
    <div class="summarycontainer">
        <div class="summary-head">
            <div class="summary-title">空间名称</div>
            <div class="summary-btns">
                <div class="hover-iconbtn">
                    <svgicon name="bianji"/>
                </div>
                <div class="hover-iconbtn">
                    <svgicon name="viewoff"/>
                </div>
                <sharepopup />
    <div  class="hover-iconbtn">

                  <el-popover
                    v-model="pageeditdialogVisible"
                    popper-class="pageedit"
                    placement="bottom"
                    width="100"
                    trigger="click">
<el-popover
                    popper-class="pageedit"
                    placement="left"
                    trigger="hover"
                    width="100">
                    <div class="pageedit-item">
                        <span>导出为Word</span>
                    </div>
                    <div class="pageedit-item">
                        <span>导出为PDF</span>
                    </div>
                    <div slot="reference" class="pageedit-item">
                        <span>导出</span>
                    <span  class="right">
                            <svgicon name="right" />
                        </span>
                    </div>
</el-popover>

                    <div class="pageedit-item" @click="copypagedialogVisible=true">
                        <span>复制</span>
                    </div>

                    <div class="pageedit-item" @click="movepagedialogVisible=true">
                        <span>移动</span>
                    </div>
                    <div class="pageedit-item">
                        <span>存档</span>
                    </div>
                    <div class="pageedit-item">
                        <span>删除</span>
                    </div>
                    <div class="line"></div>
                    <div class="pageedit-item">
                        <span>限制</span>
                    </div>
                    <div class="pageedit-item">
                        <span>页面历史</span>
                    </div>
                    <div class="pageedit-item">
                        <span>附件</span>
                    </div>
                    <div class="pageedit-item">
                        已解决评论                    
                    </div>
                    <el-popover
                    popper-class="pageedit"
                    placement="left"
                    trigger="hover"
                    width="100">
                    <div class="pageedit-item">
                        <span>页面信息</span>
                    </div>
                    <div class="pageedit-item">
                        <span>查看来源</span>
                    </div>
                    <div class="pageedit-item">
                        <span>查看储存格式</span>
                    </div>
                    <div class="pageedit-item">
                        <span>Doc文件导入</span>
                    </div>
                    <div slot="reference" class="pageedit-item">
                        <span>高级详情</span>
                    <span class="right">
                            <svgicon name="right" />
                        </span>
                    </div>

</el-popover>
                    <div class="line"></div>
                    <div class="pageedit-item">
                        <span>Slack Notifications</span>
                    </div>

                    <svgicon slot="reference" name="gengduo"/>
  </el-popover>
                </div>
                

                <div class="btn">取消加星</div>
            </div>
        </div>
        <el-dialog
        :visible.sync="copypagedialogVisible"
        width="50%">
        <copypage />
        </el-dialog>

        <el-dialog
        :visible.sync="movepagedialogVisible"
        width="50%">
        <movepage />
        </el-dialog>
    </div>
</template>
<script>
import svgicon from '@/icon/icon.vue'
import sharepopup from "@/components/popup/share.vue";
import copypage from "@/alert/copypage.vue";
import movepage from "@/alert/articlemove.vue";

export default {
    components:{
          svgicon,sharepopup,copypage,movepage
    },
    computed:{

    },
    watch:{
        copypagedialogVisible(){
            this.pageeditdialogVisible = false
        },
        movepagedialogVisible(){
            this.pageeditdialogVisible = false
        }
    },
    data(){
        return {
            pageeditdialogVisible:false,
            copypagedialogVisible:false,
            movepagedialogVisible:false
        }
    }
}
</script>
<style scoped>
.summary-head{
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.summary-btns{
    display: flex;
}
.hover-iconbtn{
    margin-left: 0px;
}
</style>