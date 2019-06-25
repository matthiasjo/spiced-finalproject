<template>
  <div id="app">
    <div class="nav-wrapper">
      <div id="nav">
        <router-link class="nav" to="/">Welcome</router-link> |
        <router-link class="nav" to="/about">About</router-link> |
        <router-link class="nav" to="/events">Events</router-link>
      </div>
    </div>
    <router-view />
  </div>
</template>

<style src="../public/style.general.css" scoped></style>
