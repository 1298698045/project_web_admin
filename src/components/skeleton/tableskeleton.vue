<template>
     <div style="padding: 14px;">
       <div v-for="(skeleton,index) in skeletons" :key="skeleton" >
       <div v-for="skeletonrow in skeletons[index].skeletonrow" :key="skeletonrow" :style="skeleton.style">
         <el-skeleton-item v-for="skeletonitem in skeleton.skeletonitem" :key="skeletonitem" 
         :variant="skeletonitem.variant" :style="skeletonitem.style" />
       </div>
       </div>
     </div>
</template>
<script>
export default {
    data(){
        return{
            skeletons:[{
                style:'display: flex; align-items: center; justify-items: space-between;height: 24px;margin-top:20px',
                skeletonrow:15,
                skeletonitem:[{
                    variant:'text',
                    style:'width: 7%;margin-right: 16px;height:24px'
                },{
                    variant:'text',
                    style:'width: 10%;margin-right: 16px;height:24px'
                },{
                    variant:'text',
                    style:'width: 35%;margin-right: 16px;height:24px'
                },{
                    variant:'text',
                    style:'width: 8%;margin-right: 16px;height:24px'
                },{
                    variant:'text',
                    style:'width: 12%;margin-right: 16px;height:24px'
                },{
                    variant:'text',
                    style:'width: 8%;margin-right: 16px;height:24px'
                },{
                    variant:'text',
                    style:'width: 10%;margin-right: 16px;height:24px'
                },{
                    variant:'text',
                    style:'width: 6%;margin-right: 16px;height:24px'
                },{
                    variant:'text',
                    style:'width: 10%;margin-right: 16px;height:24px'
                },{
                    variant:'text',
                    style:'width: 6%;margin-right: 16px;height:24px'
                },]
            }]
        }
    }
}
</script>