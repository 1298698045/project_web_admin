<template>
    <div>
        <el-dropdown @visible-change="visiblechange" @command="(value)=>handleCommand(value,rowid)" trigger="click" @visibleChange="getdata">
                <span class="el-dropdown-link">
                    {{label}}
                <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu  slot="dropdown">
                <el-dropdown-item :command="item.statusId+'&'+item.name+'&'+item.statusCategoryId" v-for="item in statusdata" :key="item.id">
                  <el-tag v-if="item.statusCategoryId == 1" type="info" size="mini">
                    {{item.name}}
                  </el-tag>
                  <el-tag v-if="item.statusCategoryId == 2" size="mini">{{item.name}}</el-tag>
                  <el-tag v-if="item.statusCategoryId == 3" type="success" size="mini">{{item.name}}</el-tag>
                </el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
    </div>
</template>
<script>
import commonapi from '@/api/commonapi.js'

export default {
    data(){
        return {}
    },
    props:['statusdata','value','label','rowid'],
    methods:{
        visiblechange(val){
            this.$emit('visiblechange',val)
        },
        handleCommand(val,rowid){
            const statusId = val.split('&')[0]
            const name = val.split('&')[1]
            const statusCategoryId = val.split('&')[2]
            commonapi.entitysaverecord({
                StateCode:statusId
            },4200,rowid).then(()=>{
                this.$message.success('保存成功')
                this.$emit('change',statusId,name,statusCategoryId,rowid)
            })
            },
            getdata(type){
            if(type==true){

            }  
            }
    }

}
</script>