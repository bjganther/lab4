<style>
    [v-cloak] {
        display: none;
    }
</style>

<template>
  <div>
      <h1 class="titleBanner"> {{ singles.title }} </h1>
      <img v-bind:src="singles.primaryimageurl">
      <p class="title"> {{ singles.description }} </p>
      People: {{ singles.people[0].name }}
      <a v-bind:href="singles.url"> More Information </a>


  </div>
</template>

<script>

export default {
    data() {
      return {};
    }
}
</script>

<style>
</style>
