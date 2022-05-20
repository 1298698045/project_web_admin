<template>
<div class="container">
    <editor
                  v-model="Description"
                  :init="editdescribe">
                  </editor>
</div>
    
</template>

<script>

import tinymce from "tinymce";
import Editor from "@tinymce/tinymce-vue";
import "tinymce/themes/silver/theme";
import "tinymce/icons/default";
import plugins from "tinymce/plugins"
import tinymceinit from "@/utils/tinymceinit.js"
function mouseup(){
    window.removeEventListener('mousemove',mousemove)
    window.removeEventListener('mouseup',mouseup)
}
function mousemove(e){
    this.left = e.pageX
}

export default {
    data(){
        return{
            left:'',
            Description:'123',
            editdescribe:tinymceinit
        }
    },
    mounted() {
        setTimeout(() => {
            
        }, 1000);
  },
  components:{
      Editor
  },
    methods:{
        mousedown(){
            window.addEventListener('mousemove',mousemove(left))
            window.addEventListener('mouseup',mouseup)
        },
    }
}
</script>
<style scoped>
.container{
    height: 200px;
}
</style>