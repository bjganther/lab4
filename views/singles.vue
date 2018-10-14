<style>
    [v-cloak] {
        display: none;
    }
</style>

<template>
  <div>
    <h1>Single Listing</h1>
    
             {{ singles.title }} 
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
