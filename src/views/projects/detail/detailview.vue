<template>
    <div>
        <detail  :popup="false" :itemid="$route.query.itemid"/>
    </div>
</template>
<script>
import detail from './detail.vue'
export default {
    data(){
        return{
        }
    },
    components:{
        detail
    },
    created(){
    }
}
</script>