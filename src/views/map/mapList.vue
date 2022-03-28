<template>
  <div>
    <v-row>
      <v-col cols="3" offset="9">
        <v-btn
        to="/map/edit"
        color="rgba(253, 99, 3, 0.9)"
        outlined
        class="mb-4"
        >Создать новую точку</v-btn>
      </v-col>
    </v-row>
    <v-data-table
      :headers="headers"
      item-key="id"
      :items="map_point"
      hide-default-footer
      sort-by="calories"
      class="elevation-1"
    >
      <template v-slot:[`item.actions`]="{ item }">
        <v-btn :to="'/map/edit/' + item.id"
        icon
        >
          <v-icon small> mdi-pencil </v-icon>
        </v-btn>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data: () => ({
    headers: [
      {
        text: "Название",
        align: "start",
        sortable: false,
        value: "title",
      },
      { text: "Действия", value: "actions", sortable: false },
    ],
    map_point: [],
  }),

  computed: {

    ...mapGetters({
    }),
  },
  created() {
    this.initialize();
  },

  methods: {
    ...mapActions({
      get_map_list: "Map/GET_POINTS_LIST",
    }),
    async initialize() {
      this.$set(this, "map_point", await this.get_map_list());
      console.log('MAP LIST',this.get_map_list);
    
    },  
  },
};
</script>