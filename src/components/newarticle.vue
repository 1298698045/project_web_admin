<template>
    <div>
      <editor id="editor" v-model="editdescribe.value" :init="editdescribe.init" ></editor>

    </div>
</template>
<script>
import Editor from "@tinymce/tinymce-vue";
import plugins from "tinymce/plugins"
var stringplugins = plugins.join(' ')
export default {
      components:{
        Editor
    },
    mounted() {
    },
    data() {
      return {
          editdescribe:{
                value:'',
                show:false,
                init: {
                menubar:false,
                initial:true,
                plugins: stringplugins,
                toolbar: 'undo redo restoredraft | cut copy | forecolor backcolor bold italic underline strikethrough link | alignleft aligncenter alignright alignjustify | bullist numlist blockquote subscript superscript removeformat | \ '+stringplugins,
                fixed_toolbar_container:'#doc-app .toolbar',
                custom_ui_selector: 'body',
                placeholder:'placeholder占位文字',
                toolbar_mode : 'wrap',
                toolbar_sticky: true,
                autosave_ask_before_unload: false,
                fontsize_formats: '12px 14px 16px 18px 24px 36px 48px 56px 72px',
                font_formats: '微软雅黑=Microsoft YaHei,Helvetica Neue,PingFang SC,sans-serif;苹果苹方=PingFang SC,Microsoft YaHei,sans-serif;宋体=simsun,serif;仿宋体=FangSong,serif;黑体=SimHei,sans-serif;Arial=arial,helvetica,sans-serif;Arial Black=arial black,avant garde;Book Antiqua=book antiqua,palatino;Comic Sans MS=comic sans ms,sans-serif;Courier New=courier new,courier;Georgia=georgia,palatino;Helvetica=helvetica;Impact=impact,chicago;Symbol=symbol;Tahoma=tahoma,arial,helvetica,sans-serif;Terminal=terminal,monaco;Times New Roman=times new roman,times;Verdana=verdana,geneva;Webdings=webdings;Wingdings=wingdings,zapf dingbats;知乎配置=BlinkMacSystemFont, Helvetica Neue, PingFang SC, Microsoft YaHei, Source Han Sans SC, Noto Sans CJK SC, WenQuanYi Micro Hei, sans-serif;小米配置=Helvetica Neue,Helvetica,Arial,Microsoft Yahei,Hiragino Sans GB,Heiti SC,WenQuanYi Micro Hei,sans-serif',
                height:240,
                language_url: "static/tinymce/zh_CN.js",
                language: "zh_CN",
                skin_url: "static/tinymce/skins/ui/oxide", 
                }
            },
      };
    },
    methods: {
      
    }
  }
</script>
<style scoped>
</style>