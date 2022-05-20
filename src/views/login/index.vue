<template>
    <div class="login">
        <div class="login-head">
            <img src="@/assets/logo.png" alt="">
            <span>任务管理系统</span>
        </div>
        <div class="login-container">
        
        <div class="login-form">
            <div class="login-form-title"></div>
            <div class="form-body">
                <div class="username">
                    <el-input
                        placeholder="输入账号"
                        prefix-icon="el-icon-user"
                        v-model="userName">
                    </el-input>
                </div>
                <div class="userNameerror" v-show="userNameerror">{{userNameerrortext}}</div>
                <div class="password">
                <el-input show-password
                        placeholder="输入密码"
                        prefix-icon="el-icon-lock"
                        v-model="password">
                    </el-input>
                <div class="passworderror" v-show="passworderror">{{passworderrortext}}</div>
                </div>
                <div class="imgCheck">
                    <el-input 
                        placeholder="输入图片验证码"
                        v-model="imgCheck">
                    </el-input>
                    <canvas @click="getimgchecksrc" id="canvas" width="100" height="30"></canvas>
                   
                </div>
                <div class="imgCheckerror" v-show="imgCheckerror">
                    {{imgCheckerrortext}}
                    </div>
                <div class="register">
                <div class="forgetpassword">
                    <span @click="register">注册</span>
                </div>
                <div class="forgetpassword">
                    <span @click="forgetpassword">忘记密码</span>
                </div>
                </div>
                <div class="loginbtn">
                    <el-button type="primary" @click="login">
                    登录
                </el-button>
                </div>
            </div>
        </div>
        </div>
    </div>
</template>
<script>
import {draw,randomColor} from '@/utils/imageVerifyCode.js'
import {setToken,getToken} from '@/utils/auth.js'
import {userlogin} from '@/api/article.js'

export default {
    data(){
        return{
            userName:'',
            password:'',
            userNameerror:false,
            passworderror:false,
            imgCheckerror:false,
            imgCheckerrortext:'验证码错误',
            passworderrortext:'',
            userNameerrortext:'',
            imgCheck:'',
            shownum:[],
        }
    },
    created(){
        if(getToken()){
            this.$router.push('/')
        }
    },
    mounted(){
        this.getimgchecksrc()
    },
    methods:{
        login(){
            if(this.userName==''){
                this.userNameerror = true
                this.userNameerrortext = '请输入用户名'
                return
            }
            // if(this.userName.length!=11){
            //     this.userNameerror = true
            //     this.userNameerrortext = '请输入正确的手机号'
            //     return
            // }
            this.userNameerror = false
            if(this.password==''){
                this.passworderror = true
                this.passworderrortext = '请输入密码'
                return
            }
            this.passworderror = false
            if(this.imgCheck==''){
                this.imgCheckerror = true
                this.imgCheckerrortext = '请输入验证码'
                return
            }
            if(this.imgCheck.toLowerCase()!=this.shownum.join('')){
                this.imgCheckerror = true
                this.imgCheckerrortext = '验证码错误'
                return
            } 
            this.imgCheckerror = false
            const message = {
                userName:this.userName,
                // pwd:md5(this.password),
                password:this.password,
            }
            userlogin(message).then((res)=>{
                if(res.status==0){
                     this.passworderror = true
                     this.passworderrortext = res.msg
                }else{
                    setToken(res.access_token)
                    this.$router.push('/')
                }
            }).catch((res)=>{
                draw(this.shownum);
                if(res.Code==1300){
                    this.passworderror = true
                    this.passworderrortext = '用户名或密码错误'
                }
            })
            
            //this.$router.push('/')
        },
        forgetpassword(){
            this.$router.push('/forgetpassword')
        },
        register(){
            this.$router.push('/register')
        },
        getimgchecksrc(){
            draw(this.shownum);
        },
    }
}
</script>
<style scoped>
.login-container{
    display: flex;
    flex-direction: column;
    margin: 0px auto 24px;
    width: 400px;
    padding: 52px 40px;
    background: rgb(255, 255, 255);
    border-radius: 3px;
    box-shadow: rgb(0 0 0 / 10%) 0px 0px 10px;
    box-sizing: border-box;
    color: rgb(94, 108, 132);
    margin-top: calc(15vh - 50px);
}
.login{
    background-size: calc(((100vw - 400px) / 2) - 32px), calc(((100vw - 400px) / 2) - 32px), cover;
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: -1;
    background-color: rgb(250, 251, 252);
    background-image: url('/static/img/svg/logoleft.svg'), url('/static/img/svg/logoright.svg');
    background-repeat: no-repeat, no-repeat;
    background-attachment: fixed, fixed;
    background-size: 368px, 368px;
    background-position: left bottom, right bottom;
}
.login-head{
    margin: 0px auto;
    width: 400px;
    display: flex;
    align-items: center;
    margin-top: 50px;
    justify-content: center
}
.login-head img{
    width: 60px;
    margin-right: 20px;
}
.login-head>span{
    font-size: 22px;
    font-weight: 700;
}
.password{
    margin-top: 30px;
}
.loginbtn{
    margin-top: 20px;
}
.loginbtn .el-button{
    width: 100%;
}
.forgetpassword{
    margin-top: 20px;
    color: #409EFF;
    text-align: right;
    font-size: 12px;
    cursor: pointer;
}
.register{
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
}
.imgCheck{
    margin-top: 30px;
    display: flex;
    justify-items: center;
    justify-content: space-between;
}
.imgCheck .el-input{
    width: 50%;
}
.passworderror,.imgCheckerror,.userNameerror{
    position: absolute;
    margin-top: 6px;
    font-size: 12px;
    color: red;
}
#canvas{
    margin-left: 20px;
}
</style>