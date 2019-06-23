<template>
  <div id="app">
    <div class="nav-wrapper">
      <div id="nav">
        <router-link to="/">Home</router-link> |
        <router-link to="/about">About</router-link>
      </div>
    </div>
    <router-view />
  </div>
</template>

<style src="../public/style.test.css" scoped></style>
