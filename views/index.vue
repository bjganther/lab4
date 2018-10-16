<style>
    [v-cloak] {
        display: none;
    }
</style>

<template>
  <div>
    <h1 class="titleBanner">Gallery Listing</h1>
    <ul class="galleryUL">
      <li class="galleryLI" v-for="gallery in galleries">
          <span> {{ gallery.id }}</span>
          <a v-bind:href="'/gallery/' + gallery.id"> {{ gallery.name }} </a>
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
