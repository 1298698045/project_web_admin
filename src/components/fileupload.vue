<template>
<div>
    <el-upload
        ref="upload"
        class="upload-demo"
        drag
        :on-success="uploadsuccess"
        :action="baseURL+'?method=file.attachment.upload'"
        :data="{
            pid:itemid,
            ObjTypeCode: 4200,
            sessionKey:sessionKey,
        }"
        :auto-upload="autoupload"
        :file-list="fileList"
        list-type="picture-card">
                    <i class="el-icon-upload"></i>
                    <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                    <div slot="file" slot-scope="{file}">
                        <!-- {{file}} -->
                    <img
                        class="el-upload-list__item-thumbnail"
                        :src="file.shareUrl?file.shareUrl:file.url" alt=""
                    >
                    <div class="filemsg">
                        {{file.name}}
                        {{file.createdOn}}
                    </div>
                    <span class="el-upload-list__item-actions">
                        <span
                        class="el-upload-list__item-preview"
                        @click="handlePictureCardPreview(file)"
                        >
                        <i class="el-icon-zoom-in"></i>
                        </span>
                        <span
                        v-if="!disabled"
                        class="el-upload-list__item-delete"
                        @click="handleDownload(file)"
                        >
                        <i class="el-icon-download"></i>
                        </span>
                        <span
                        class="el-upload-list__item-delete"
                        @click="handleRemove(file)"
                        >
                        <i class="el-icon-delete"></i>
                        </span>
                    </span>
                    </div>
                </el-upload>
                <Fileview ref="fileview" v-model="dialogVisible" :fileList="fileList"/>
</div>
            
</template>
<script>
import commonapi from '@/api/commonapi.js'
import axios from 'axios'
import { getToken } from '@/utils/auth'
import icon from '@/icon/icon.vue'
import {baseURL} from '@/utils/request.js'
import Fileview from './fileview.vue'
export default {
    data(){
        return {
            baseURL:baseURL,
            fileList:[],
            dialogVisible:false
        }
    },
    created(){
        this.getfile()
    },
    computed:{
        sessionKey(){
            return getToken()
        }
    },
    components:{
        icon,Fileview
    },
    watch:{
        itemid(){
            this.getfile()
        }
    },
    props:['itemid','autoupload','disabled'],
    methods:{
        handleRemove(file,fileList) {
            if(!this.disabled){
                commonapi.fileattachmentdelete(file.id).then((res)=>{
                 this.getfile()
                })
            }else{
                this.$refs.upload.uploadFiles.splice(this.$refs.upload.uploadFiles.findIndex((item)=>{return item.url==file.url}),1)
            }
        },
        handlePictureCardPreview(file){
            this.dialogVisible = true
            this.$refs.fileview.handlePictureCardPreview(file)
            console.log(this.dialogVisible)
        },
        getfile(){
            commonapi.getfilelist(this.itemid).then((res)=>{
                 this.fileList = res.listData
            })
        },
        uploadsuccess(){
            if(this.autoupload){
                this.getfile()
            }else{
                this.$refs.upload.uploadFiles = []
                this.$emit('finish')
            }
        },
        submit(){
            this.$nextTick(()=>{
                this.$refs.upload._props.data.pid=this.itemid
                this.$refs.upload.submit()
            })
        },
        getfilelength(){
            return this.$refs.upload.uploadFiles.length
        }
    }
}           
</script>
<style scoped>

.upload-demo{
    display: flex;
    flex-direction: column-reverse
}
.upload-demo>>>.el-upload--picture-card{
    border: 0;
    width: 100%;
    height:50px;
    margin-bottom: 10px;
}
.upload-demo>>>.el-upload-dragger{
    width: 100%;
    height: 50px;
    line-height: 50px;
    box-sizing: border-box;
}
.upload-demo>>>.el-upload-dragger>*{
    display: inline-block;
    margin: 0 5px;
    vertical-align: middle;
}
.upload-demo>>>.el-icon-upload{
    font-size: 35px;
    position: relative;
    top: -3px;
}
.filemsg{
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    max-width: 100%;
}

</style>