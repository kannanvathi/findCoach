<template>
    <router-view></router-view>
</template>
<script>
export default {
    created() {
        this.$router.push({name: 'quiz-list'})
    },
    setup() {
        
    },
}
</script>