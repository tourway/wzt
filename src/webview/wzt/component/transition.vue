<template>
  <!-- 路由出口 -->
  <!-- 路由匹配到的组件将渲染在这里 -->
   <transition name="component-fade" mode="out-in">
     <router-view></router-view>
   </transition>
</template>
