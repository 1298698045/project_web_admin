<template>
  <el-breadcrumb>
    <el-breadcrumb-item v-for="item in breadcrumb" :key="item.id">
      <router-link tag="a" :to="item.path">{{ item.title }}</router-link>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>
<script>
export default {
  data() {
    return {
        breadcrumb:[]
    };
  },
  watch: {
    $route(route) {
        for (let i = 0; i < this.breadcrumb.length; i++) {
            const item = this.breadcrumb[i];
            if(item.name==route.name){
                this.breadcrumb.splice(i,this.breadcrumb.length-1)
            }
        }
        if(this.breadcrumb.filter((item)=>item.path==route.fullPath).length==0){
            const title = route.meta.title!=''?route.meta.title:route.params.projectname
            this.breadcrumb.push({
                path:route.fullPath,
                title:title,
                name:route.name
            })
        }
    },
  },
  created() {
  },
  methods: {
  },
};
</script>
<style scoped>
</style>
