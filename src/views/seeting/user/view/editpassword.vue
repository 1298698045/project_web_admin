<template>
    <div >
        <div class="header mobile">

        </div>
        <div class="body">
            
            <div class="login-wrap">
                <el-steps :active="steps" finish-status="success" align-center>
                    <el-step title="验证手机号"></el-step>
                    <el-step title="重置密码"></el-step>
                </el-steps>
                    <div v-show="steps==0">
                        <div class="content-row">
                            <span style="float:left;margin-top:40px;display:inline-block;width:80px;">
                            手机号：
                            </span>
                             <el-input :class="{'error':!phonerule}" v-model="phone" class="msginput" placeholder="输入手机号"></el-input>
                            <span @click="postverifycodebtn" class="verifycodebtn">{{verifycodebtnname}}</span>
                        </div>
                        <span v-show="!phonerule" class="red">请输入正确的手机号</span>

                        <div class="content-row">
                        <span style="float:left;margin-top:40px;display:inline-block;width:80px;">
                            验证码：
                        </span>
                        <input type="password" style="display:none;"/>
                            <el-input type="text" v-model="verifycode" class="msginput" placeholder="输入验证码"></el-input>
                            <div style="clear:both;"></div>
                        </div>
                        <span v-show="!verifycoderule" class="red">验证码错误</span>

                        <div class="login-btn" @click="next">确认</div>

                    </div>
                    <div v-show="steps==1">
                        <div class="content-row">
                            <span style="float:left;margin-top:30px;display:inline-block;width:80px;">
                                密码：
                            </span>
                            <el-input class="msginput" type="password" v-model="password2" style="margin-top:20px;" placeholder="输入密码"></el-input>
                        </div>
                        <span v-show="!password2rule" class="red">请输入长度大于6位且包含数字和字母的密码</span>
                        <div class="content-row">
                            <span style="float:left;margin-top:40px;display:inline-block;width:80px;">
                                确认密码：
                            </span>
                            <el-input class="msginput" type="password" v-model="password3" placeholder="再次输入密码"></el-input>
                        </div>
                        <div><span v-show="!password3rule" class="red">两次密码不一致</span></div>
                        <div class="login-btn" @click="register">确认</div>
                    </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            steps:0,
                activeName: 'first',
                desKey: '',
                rsaKey: '',
                phone: '',
                phone2: '',
                password: '',
                verifycode: '',
                verifycode2: '',
                password2: '',
                password3: '',
                phonerule: true,
                phone2rule: true,
                passwordrule: true,
                password2rule: true,
                password3rule: true,
                verifycoderule: true,
                verifycodebtnname: '发送验证码',
                verifycodebtnrule:true
        }
    },
    created: function () {
                var that = this
                // ajaxMethodPOSTData('/api/Account/GetPublicKey', null, function (data) {
                //     if (data.status == 1) {
                //         that.desKey = data.data.des_Key;
                //         that.rsaKey = data.data.ras_Key;
                //     } else {
                //         alert(data.msg)
                //     }
                // })
            },
            methods: {
                postverifycodebtn: function () {
                    var that = this
                    if (this.verifycodebtnrule) {
                        if (this.phone.length != 11) {
                            this.phonerule = false
                            return false;
                        } else {
                             //ajaxMethodGetData('/api/Account/SendMsg', { mobile: this.phone }, function (data) {
                                 var data = {
                                     status:1
                                 }
                                 if (data.status==1) {
                                     that.phonerule = true
                                     that.verifycodebtnrule = false
                                     var i = 180
                                     that.verifycodebtnname = '180 秒后重新获取'
                                     var Interval = setInterval(function () {
                                         i--
                                         that.verifycodebtnname = i + ' 秒后重新获取'
                                     }, 1000)
                                     setTimeout(function () {
                                         window.clearInterval(Interval)
                                         that.verifycodebtnrule = true
                                         that.verifycodebtnname = '获取验证码'
                                     }, 1800000)
                                 } else {
                                     alert(data.msg)
                                 }
                             //})
                        }
                    }

                },
                handleClick: function () {
                    if (this.activeName == 'first') {
                        $("#imgAuthCode").click();
                    } else {
                        $("#imgAuthCode1").click();
                    }
                },
                next: function () {
                    var that = this
                    if (this.phone.length != 11) {
                        this.phonerule = false
                        return false;
                    } else {
                        this.phonerule = true
                    }
                    if (this.verifycode == '') {
                        this.verifycoderule = false
                        return false;
                    } else {
                        // ajaxMethodPOSTData('/api/Account/CheckCode', {
                        //     mobile: this.phone,
                        //     code: this.verifycode
                        // }, function (data) {
                             that.steps = 1
                        // })
                    }

                },
                register: function () {
                    var that = this
                    if (this.phone.length != 11) {
                        this.phone2rule = false
                    } else {
                        this.phone2rule = true
                    }
                    var reg = new RegExp(/^(?![^a-zA-Z]+$)(?!\D+$)/)
                    if (this.password2.length < 5 || !reg.test(this.password2)) {
                        this.password2rule = false
                    } else if (this.password3 != this.password2) {
                        this.password2rule = true
                        this.password3rule = false
                    } else {
                        this.password2rule = true
                        this.password3rule = true
                    }
                    if (this.phone2rule == true && this.password2rule == true && this.password3rule == true) {
                        var data = {
                            userName: that.phone,
                            password: that.password2,
                            verifycode: that.verifycode,
                            md5Data: md5(that.phone + that.password2 + that.verifycode)
                        }
                        var data1 = JSON.stringify(data);
                        var encrypt = new JSEncrypt();
                        encrypt.setPublicKey(that.rsaKey);
                        var data4 = encrypt.encrypt(data1);
                        console.log(data4)
                        // ajaxMethodPOSTData('/api/Account/UpdatePwd', { data: data4 }, function (data) {
                        //     if (data.status == 1) {
                        //         alert('修改成功')
                        //         window.location.href = '/multilingualres/index.html'
                        //     } else {
                        //         alert(data.msg)
                        //     }
                        // })
                    }

                }
            }
}
</script>
<style scoped>
 #header-c-beta2 {
            min-width: 980px;
            margin-bottom: 20px;
            position: relative;
            z-index: 200;
            *zoom: 1;
            -webkit-box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
        }

        header .wrap {
            width: 980px;
            margin: 0 auto;
            font-size: 12px;
        }

        #header-c-beta2 .header {
            background-color: #303a40;
            position: relative;
            z-index: 100;
            height: 50px;
            line-height: 50px;
        }

        .body {
            /*height: calc(100% - 80px);
            background: url('/multilingualres/images/loginbg.jpg') no-repeat center;
            background-size: 100%;
            position: relative;
            margin-top: 80px;
            min-width: 1100px;*/
            background-color: white;


        }

        .login-wrap {
            position: absolute;
            top: 50%;
            left: 50%;
            float: right;
            width: 454px;
            height: 500px;
            padding: 40px;
            border-radius: 4px;
            background-color: #fff;
            -webkit-box-sizing: border-box;
            box-sizing: border-box;
            margin-top: -250px;
            margin-left: -172px;
        }

        .div__item {
            width: 50%;
            text-align: center;
            font-size: 18px;
            color: #999;
            line-height: 25px;
            font-weight: 700;
        }

        .div__nav {
            width: 100%;
        }

        .div__active-bar {
            height: 3px;
            border-radius: 4px;
            width: 20px !important;
            margin-left: 47px;
            background-color: #f64;
        }

        .div__nav-wrap::after {
            background-color: white;
        }

        .div__item.is-active {
            color: #333;
        }

        .el-input__inner {
            border-width: 0;
            border-bottom-width: 1px;
            border-radius: 0;
        }

        .login-btn {
            display: block;
            padding: 0;
            margin: 50px auto 0;
            width: 274px;
            border: none;
            line-height: 48px;
            border-radius: 4px;
            background-color: #f64;
            color: #fff;
            font-size: 16px;
            text-align: center;
            cursor: pointer;
        }

        .red {
            color: red;
            font-size: 12px;
            position: absolute;
            margin-top: 5px;
            left: 0;
        }

        .error {
            border-color: red !important;
        }

        #pane-second {
            position: relative;
        }

        #imgAuthCode {
            margin-top: 15px;
        }

        #imgAuthCode1 {
            margin-top: 15px;
        }

        .header-search {
            display: none;
        }

        .header {
            padding-bottom: 0;
            top: 0;
        }

        .forgetpassword {
            position: absolute;
            right: 0;
            margin-top: 8px;
            font-size: 12px;
            cursor: pointer;
            color: #108def;
        }
        .el-steps{
            margin:20px 0;
        }

        .verifycodebtn{
            display:inline-block;
            position:absolute;
            color:rgb(239,96,63);
            width:100px;
            top:43px;
            text-align:right;
            cursor:pointer;
            right:10px;
            font-size: 12px;
        }
        .content-row{
            position:relative;
        }
        .content-row{
            overflow:hidden;
        }
        .red{
            margin-left:120px;
        }
        .msginput{
            margin-top:30px;
            float:left;
            width:290px;
        }
</style>