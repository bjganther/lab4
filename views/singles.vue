<style>
    [v-cloak] {
        display: none;
    }
</style>

<template>
    <div>
        <h1 class="titleBanner"> {{ singles.title }}</h1>

        <div class="left">
        <img v-bind:src="singles.primaryimageurl"/>
        </div>
        <div class="right">
            <h2> About </h2>
                <br>
                <strong> People: </strong> {{ singles.people[0].name }}
                <br>
                <strong> Description: </strong> {{ singles.description }}
                <br>
                <strong> Technique: </strong> {{ singles.technique }}
                <br>
                <strong> Culture: </strong> {{ singles.culture }}
                <br>
                <strong> Accession method: </strong> {{ singles.accessionmethod}}
                <br>
                <strong> Verification: </strong> {{ singles.verificationleveldescription }}
                <br>
                <a v-bind:href="singles.url"> More Information </a>
            </div>
            <div class="comment">
                <h2> Comments </h2>
                <!-- form for entering comments -->
                <form v-bind:action="'/object/' + singles.objectnumber+ '/comment'" method="post" v-onsubmit="add">
                    <input name = "todo" placeholder="Leave a comment" type="text" v-model="todo">
                    <input type="submit" value="Submit">
                </form>

                <ul>
                    <li v-for="todo in todos">
                        {{ todo }}

                    </li>
                </ul>

        </div>
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


        this.todos=this.todo;
        let commentobject = {"comm": "whatsup"};

        this.todo = '';
        return this.todos

      }
    }
  }
</script>

<style>
</style>

