<template>
<div class="container">
    <calendar calendartype="my" :hiddenbread="true" />
</div>
</template>
<script>
import calendar from '@/views/projects/calendar/calendar.vue'
export default {
    data(){return{}},
    components:{
        calendar
    }
}
</script>
<style scoped>
.container{
    height: calc(100vh - 56px);
}
</style>