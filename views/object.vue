<style>
    [v-cloak] {
        display: none;
    }
</style>

<template>
  <div>
    <h1 class="titleBanner"> Gallery Listing </h1>
    <ul class="objectUL">
      <li class="objectLI" v-for="object in objects">
            <a v-bind:href="'/object/' + object.objectnumber "> {{ object.title }}
           <!-- <img v-bind:src="object.primaryimageurl%>" alt="<%- object.primaryimageurl%>" style="max-width:360px;">-->
          <img class="thumbnail" v-bind:src="object.primaryimageurl"/>
          <p class="details"> Accession year: {{ object.accessionyear }}
              <br>
              Object number: {{ object.objectnumber }}
              <br>
              Culture: {{ object.culture }}</p>
            </a>
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
