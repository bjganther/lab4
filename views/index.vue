<style>
    [v-cloak] {
        display: none;
    }
</style>

<template>
  <div>
    <h1>Gallery Listing</h1>
    <ul>
      <li v-for="gallery in galleries">
          <a v-bind:href="'/gallery/' + gallery.id"> {{ gallery.name }}
        {{ gallery.id }}
        Floor: {{ gallery.floor }} </a>
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
