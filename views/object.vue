<style>
    [v-cloak] {
        display: none;
    }
</style>

<template>
  <div>
    <h1>Gallery Listing</h1>
    <ul>
      <li v-for="object in objects">
            <a v-bind:href="'/object/' + object.objectnumber "> {{ object.title }} </a>
           <!-- <img v-bind:src="object.primaryimageurl%>" alt="<%- object.primaryimageurl%>" style="max-width:360px;">-->
      </li>
    </ul>
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
