<template>
    <v-row>
    <v-col
      cols="12"
      sm="6"
    >
      <v-menu
        ref="menu"
        v-model="menu"
        :close-on-content-click="false"
        :return-value.sync="dates"
        transition="scale-transition"
        offset-y
        min-width="auto"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="dates"
           
            chips
            outlined
            small-chips
            prepend-inner-icon="mdi-calendar"
            readonly
            v-bind="attrs"
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker
            v-model="dates"
            range
            no-title
            scrollable
            locale="ru-RU"
            :weekday-format="getCustomDay"
            :title-date-format="titleDate"
        >
          <v-spacer></v-spacer>
          <v-btn
            text
            color="primary"
            @click="menu = false"
          >
            Cancel
          </v-btn>
          <v-btn
            text
            color="primary"
            @click="$refs.menu.save(dates)"
          >
            OK
          </v-btn>
        </v-date-picker>
      </v-menu>
    </v-col>
  </v-row>
</template>

<script>
  export default {
    methods: {
        getCustomDay(date){
            const daysOfWeek = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
            let i = new Date(date).getDay(date)
            return daysOfWeek[i]
        },
        titleDate(dates) {
            return dates
            .map(n => new Date(n).toLocaleString('ru-RU', {
                weekday: 'short',
                month: 'short',
                day: 'numeric',
            }))
            .join(' - ');
        },
    },
    data () {
      return {
        dates: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
        menu: false,
      }
    },
    computed: { }
  }
</script>