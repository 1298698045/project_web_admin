<template>
<div class="main-container">
        <div class="head">
            <div class="head-name">文件</div>
            <div class="head-btn">
              <div>
                <el-button @click="createdfolder" size="small">
                  创建文件夹
                </el-button>
              </div>
              <el-upload
              class="upload-demo"
              :action="baseURL+'?method=file.upload.create'"
              :data="{
                folderid:folderid[folderid.length-1].id,
                SessionKey:sessionKey
              }"
              :on-success="filelistsearch"
              :show-file-list="false">
              <el-button size="small">
                上传文件
              </el-button>
            </el-upload>
            </div>
        </div>
        <div class="container">
            <div class="container-flexbox">
                <div class="leftshelterbox"></div>
                <div class="main-container-body">
                  <div class="search-container">
                    <div class="item-container">
                    <el-input size="small"
                    placeholder="请输入内容"
                    prefix-icon="el-icon-search" 
                    @change="searchtable" v-model="searchtext">
                    </el-input>
                    </div>
                  </div>
                  <div class="breadcrumb-container">
                      <el-breadcrumb separator="/">
                        <el-breadcrumb-item v-for="(item,index) in folderid" :key="item.id"><a @click="folderchange(item,index)">{{item.name}}</a></el-breadcrumb-item>
                    </el-breadcrumb>
                  </div>
                    <el-table :data="tableData" style="width: 100%"
                    height="calc(100vh - 220px)">
    <el-table-column prop="name" sortable label="名称">
      <template slot-scope="scope">
        <div class="foldername"> 
            <div v-if="!scope.row.fileExtension" @click="tofolder(scope.row)">
              <icon name="folder" :width="32" :height="26" />
            </div>
            <div v-else class="imgcontainer">
              <img :src="scope.row.shareUrl" v-if="scope.row.fileExtension=='png'||scope.row.fileExtension=='jpg'" />
              <img src="/static/img/images/icons/filetype/Excel.png" v-else-if="scope.row.fileExtension=='xlsx'||scope.row.fileExtension=='xls'" />
              <img src="/static/img/images/icons/filetype/Word.png" v-else-if="scope.row.fileExtension=='docx'" />
              <img src="/static/img/images/icons/filetype/Pdf.png" v-else-if="scope.row.fileExtension=='pdf'" />
              <img src="/static/img/images/icons/filetype/PPt.png" v-else-if="scope.row.fileExtension=='ppt'" />
              <img src="/static/img/images/icons/filetype/rar.png" v-else-if="scope.row.fileExtension=='rar'" />
              <img src="/static/img/images/icons/filetype/Folder.png" v-else />
            </div>
            <div>
                <div class="name" v-if="!scope.row.edit">
                  <div v-if="scope.row.fileExtension" @click="handlePictureCardPreview(scope.row)">
                    {{scope.row.name}}
                  </div>
                  <div @click="tofolder(scope.row)" v-if="!scope.row.fileExtension">{{scope.row.name}}</div>
                </div>
                <div class="name" v-if="scope.row.edit">
                  <input ref="foldereditname" v-model="scope.row.name" 
                  @change="foldernamechange(scope.row)" 
                  @blur="foldernameblur(scope.row)" />
              </div>
            </div>
        </div>
      </template>

    </el-table-column>
    <el-table-column prop="fileSize" sortable label="大小" width="200">
      <template slot-scope="scope">   
        <div v-if="scope.row.fileSize">
          <span>{{Math.ceil(scope.row.fileSize/1024)}}kb</span>
        </div>
      </template>
    </el-table-column>
    <el-table-column prop="createdByName" sortable label="创建人" width="200">
      <template slot-scope="scope">   
        <div class="flexbox" v-if="scope.row.createdByName">
          <Userhead :popover="false">
          </Userhead>
            <span class="item-name">{{scope.row.createdByName}}</span>

        </div>
        
      </template>
        </el-table-column>
        <el-table-column prop="createdOn" sortable label="创建时间" width="200">
        </el-table-column>
        <el-table-column prop="address" width="100">
          <template slot-scope="scope">
            <el-dropdown @command="(command)=>{fileCommand(command,scope.row)}">
              <div class="editbtn el-dropdown-link">
                <i class="el-icon-more"></i>
              </div>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="rename">重命名</el-dropdown-item>
                <el-dropdown-item command="delete">移动到回收站</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column>
      </el-table>
                </div>
                <div class="rightshelterbox"></div>
            </div>
        </div>
        <Fileview ref="fileview" v-model="dialogVisible" :fileList="filelist" />

    </div>
  
</template>
<script>
import '@/style/liststyle.css'
import Userhead from '@/components/Userheadphoto.vue'
import checkboxdrop from '@/components/dropbtn/checkboxdrop.vue'
import selectdrop from '@/components/dropbtn/selectdrop.vue'
import commontable from '@/components/table/commontable.vue'
import {filesharegetlist,filedirectorycreate,filedirectorydelete,
filefileinforename,filedirectoryinforename,filedelete} from '@/api/projectapi.js'
import commonapi from '@/api/commonapi.js'
import icon from '@/icon/icon.vue'
import {baseURL} from '@/utils/request.js'
import { getToken } from '@/utils/auth'
import Fileview from '@/components/fileview.vue'

export default {
  data() {
    return {
      baseURL:baseURL,
      dialogVisible:false,
      folderid:[],
      tableconfig:{
        border:false,
        stripe:false,
        height:'calc(100vh - 240px)'
      },
      searchtext:'',
      tableData:[],
      filelist:[]
    };
  },
  computed:{
      sessionKey(){
          return getToken()
      }
  },
  components:{
        Userhead,checkboxdrop,commontable,selectdrop,icon,Fileview
  },
  created(){
    this.folderid.push({name:'文件库',id:this.$route.query.id})
    // this.folderid.push({name:'文件库',id:'10010000-0000-0000-0000-000000000001'})
    this.$store.state.showleftNavbar = false
    this.filelistsearch()
  },
  methods:{
    handlePictureCardPreview(file){
      this.dialogVisible = true
      this.$refs.fileview.handlePictureCardPreview(file)
    },
    toprojectdetail(name){
      this.$store.state.projecttype = name
    },
    fileCommand(command,row){
      if(command=='delete'){
        if(row.fileExtension){
          filedelete(row.id).then(()=>{
           this.filelistsearch()
          })
        }else{
          filedirectorydelete(row.id).then(()=>{
           this.filelistsearch()
          })
        }
        

      }else if(command=='rename'){
          this.$set(row,'edit',true)
          this.$nextTick(()=>{
            this.$refs.foldereditname.focus()
        })
      }
    },
    filelistsearch(){
      filesharegetlist(this.searchtext,this.folderid[this.folderid.length-1].id).then(res=>{
         this.tableData = res.folders.concat(res.files)
         this.filelist = res.files
      })
    },
    handleClick(row){
      this.$router.push({
        path:'/projects/board/'+row.Name,
        query:{
          id:row.LIST_RECORD_ID
        }
      })
    },
    createdfolder() {
        this.tableData.unshift({
            edit:true,
            Name:''
        })
        
        this.$nextTick(()=>{
          this.$refs.foldereditname.focus()
        })
    },
    foldernamechange(row){
      if(row.name==''){
        this.filelistsearch()
        return 
      }
      if(row.fileExtension){
          filefileinforename(row.id,row.name).then(()=>{
            this.filelistsearch()
          })
      }else{
        if(row.id){
        //编辑
        filedirectoryinforename(row.id,row.name).then(()=>{
          this.filelistsearch()
        })
        }else{
          //新建
          filedirectorycreate(row.name,this.folderid[this.folderid.length-1].id).then(()=>{
            this.filelistsearch()
          })
        }
      }
      
      row.edit = false
    },
    foldernameblur(row){
      this.filelistsearch()
      row.edit = false
    },
    searchtable(){
      this.filelistsearch()
      // console.log(this.$refs.table)
      // this.$refs.table.getlist({
      //   search:this.ruleForm.search,
      //   Category:this.ruleForm.Category.join(',')
      // })
    },
    tofolder(row){
      this.folderid.push({name:row.name,id:row.id})
      this.filelistsearch()
    },
    projectfavor(type,row){
      commonapi.entitysaverecord({
        IsStar:!row.IsStar
      },20290,row.LIST_RECORD_ID).then(()=>{
        this.$set(row,'IsStar',!row.IsStar)
      })
    },
    folderchange(item,index){
      // console.log(this.folderid.splice(0,index))
      this.folderid = this.folderid.splice(0,index+1)
      this.filelistsearch()
    }
  }
};
</script>
<style  scoped>
.toview{
  cursor: pointer;
  color: #108def;
}
.head-name{
        font-size: 22px;
        color: #172b4d;
        padding: 0px 10px 15px 5px;
    }
    .main-container{
        border-left: 0;
        padding:25px 35px 35px 35px;
    }
    .flexbox{
      display: flex;
    }
    .item-name{
      margin-left: 5px;
    }
    .search-container{
      display: flex;
        margin-bottom: 10px;

    }
    .search-container>div{
      margin-right: 10px;
    }
    .el-select>>>.el-select__tags{
      width: fit-content !important;
      flex-wrap: nowrap !important;
      max-width: 1000px !important;
      position: relative;
      top: 4px;
      transform: none;
    }
    .el-select>>>.el-input{
      position: absolute;
      top: 0;
    }
    .el-select{
      min-width: 220px;
      padding-right: 30px;
      height: 28px;
    }
    .head{
      display: flex;
      justify-content: space-between;
    }
    .table-container{
      margin-top: 10px;
    }
    .el-table>>>.el-icon-star-on{
      color: rgb(255,170,0);
      font-size: 18px;
      font-weight: 700;
    }
    .el-table>>>.el-icon-star-off:hover{
      color: #172b4d;
    }
    .starbtn{
      font-size: 18px;
      font-weight: 700;
      color: #999;
    }
    .foldername{
      display: flex;
      align-items: center;
      cursor: pointer;
    }
    .foldername>div{
      display: flex;
      align-items: center;
    }
    .foldername .name{
      margin-left: 5px;
    }
    .breadcrumb-container{
      margin:20px 10px 10px;
    }
    .name input{
      height: 22px;
      outline: 0; 
      border: 1px solid #dedede;
      border-radius: 4px;
      text-indent: 5px;
    }
    .name input:focus{
      border:1px solid #108def;
    }
    .head-btn{
      display: flex;
    }
    .head-btn>div{
      margin-left: 5px;
    }
    .imgcontainer img{
      width: 32px;
      height: 32px;
    }
</style>