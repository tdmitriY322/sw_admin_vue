<template>
  <div class="dashboard">
    <br />
    <v-row>
      <v-col lg="8" cols="12">
        <v-row>
          <v-col
            lg="6"
            cols="12"
            v-for="(item, index) in activityLog"
            :key="index"
          >
            <v-card elevation="2" class="rounded-lg">
              <v-card-text class="d-flex justify-space-between align-center">
                <div>
                  <strong>{{ item.title }}</strong> <br />
                  <span>За последнеюю неделю</span>
                </div>
                <v-avatar
                  size="60"
                  :color="item.color"
                  style="border: 3px solid #444"
                >
                  <span style="color: white">{{ item.amount }} +</span>
                </v-avatar>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12">
            <v-btn block color="black" class="my-2 white--text" to="/moreinfo">
              Посмотреть еще
            </v-btn>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12" lg="4">
        <v-card>
          <v-card-title>Уведомления</v-card-title>
          <v-card-text class="py-0">
            <v-timeline align-top dense>
              <v-timeline-item color="indigo" small>
                <strong>5 минут назад</strong>
                <div class="text-caption">Текст сообщения</div>
              </v-timeline-item>
              <v-timeline-item color="green" small>
                <strong>35 минут назад</strong>
                <div class="text-caption mb-2">Текст сообщения!</div>
              </v-timeline-item>

              <v-timeline-item color="indigo" small>
                <strong>44 минут назад</strong>
                <div class="text-caption">Текст сообщения!</div>
              </v-timeline-item>
            </v-timeline>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="4">
        <v-card class="pa-4" min-height="200">
          <v-card-title class="font-weight-medium text-center">
            Список задач
          </v-card-title>
          <v-text-field
            v-model="createTaskTitle"
            label="Новая задача"
            outlined
            clearable
            append-icon="mdi-plus"
            @click:append="addTask"
            @keyup.enter="addTask"
          ></v-text-field>
          <v-list class="pt-0" flat>
            <div v-for="task in tasks" :key="task.id">
              <v-list-item
                @click="doneTask(task.id)"
                :class="{ '#c4c4c4': task.done }"
              >
                <template v-slot: default>
                  <v-list-item-action>
                    <v-checkbox :input-value="task.done"></v-checkbox>
                  </v-list-item-action>

                  <v-list-item-content>
                    <v-list-item-title
                      :class="{ 'text-decoration-line-through': task.done }"
                    >
                      {{ task.title }}
                    </v-list-item-title>
                  </v-list-item-content>

                  <v-list-item-action>
                    <v-btn @click.stop="deleteTask(task.id)" icon>
                      <v-icon color="#c4c4c4">mdi-delete</v-icon>
                    </v-btn>
                  </v-list-item-action>
                </template>
              </v-list-item>
            </div>
          </v-list>
        </v-card>
      </v-col>
      <v-col cols="8">
        <v-card>
          <v-data-table
            class="top-product elevation-1"
            hide-default-footer
            :headers="headers"
            :items="items"
            :items-per-page="10"
          ></v-data-table>
        </v-card>
      </v-col>
      <v-col cols="12"> </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import UserModel from '@/models/users'
import message from '@/mixins/showMessage'
export default {
  name: "Dashboard",
  data() {
    return {
      tasks: [
        {
          id: "1",
          title: "Составить список задач",
          done: false,
        },
      ],
      createTaskTitle: "",
      value: "",
      events: [],
      colors: [
        "blue",
        "indigo",
        "deep-purple",
        "cyan",
        "green",
        "orange",
        "grey darken-1",
      ],
      names: [
        "Meeting",
        "Holiday",
        "PTO",
        "Travel",
        "Event",
        "Birthday",
        "Conference",
        "Party",
      ],
      activityLog: [
        {
          title: "Всего продано",
          amount: 50,
          icon: "mdi-account",
          color: "cyan lighten-3",
        },
        {
          title: "Всего поситителей сайта",
          amount: 3433,
          icon: "mdi-account-group-outline",
          color: "green darken-2",
        },
        {
          title: "Всего заработано",
          amount: 3433,
          icon: "mdi-account-group-outline",
          color: "blue-grey darken-1",
        },
        {
          title: "Всего заказов",
          amount: 3433,
          icon: "mdi-account-group-outline",
          color: "deep-orange darken-1",
        },
      ],
      headers: [
        { text: "ID", align: "start", value: "code" },
        { text: "Название", value: "name" },
        { text: "Оценка ", value: "teg" },
      ],
      items: [],
    };
  },
  created() {
      let user = new UserModel({
          user: {
              name: 'Nikolay', 
              surname: 'DOljnskiy', 
              lastName: '1', 
          }
      })
      console.log('MODEL USER !!!',user);
      this.showColors(this.colors)
      console.log('123!!',this.get_test_api());
  },
  methods: {
     ...mapActions({
      get_test_api: "Test/GET_PRODUCTS_FROM_API",
    }),
    onButtonClick(item) {
      console.log("click on " + item.no);
    },
    addTask() {
      let newTask = {
        id: Date.now(),
        title: this.createTaskTitle,
        done: false,
      };
      this.tasks.push(newTask);
      this.newTaskTitle = "";
    },
    doneTask(id) {
      let task = this.tasks.filter((task) => task.id === id)[0];
      task.done = !task.done;
    },
    deleteTask(id) {
      this.tasks = this.tasks.filter((task) => task.id !== id);
    },
    deleteAllTasks(id) {
      this.tasks = this.tasks.filter((task) => task.id === !id);
    },
  },
  mixins: [ message ],
};

</script>

<style scoped>
.overlap-icon {
  position: absolute;
  top: -33px;
  text-align: center;
  padding-top: 12px;
}
</style>