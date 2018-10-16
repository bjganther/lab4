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
        

        <form v-on:submit.prevent="add">
            <input placeholder="TODO" type="text" v-model="todo">
            <input type="submit" value="Add">
        </form>

        <ul>
            <li v-for="todo in todos">
                {{ todo }}

            </li>
        </ul>

    </div>

</template>

<script>

  export default {

    data() {
      return {
        todo: '',
        todos: []
      }
    },
    methods: {
      add() {

        this.todos.push(this.todo);
        //this.todos=this.todo;
        // let commentobject = {"comm": "whatsup"};

        this.todo = '';
        // return this.todos;

      }
    }
  }
</script>

<style>
</style>

