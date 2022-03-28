<template>
  <div>
    <v-row>
      <v-col cols="3" offset="9">
        <v-btn
        to="/category/creat"
        color="rgba(253, 99, 3, 0.9)"
        outlined
        class="mb-4"
        >Создать новую категорию</v-btn>
      </v-col>
    </v-row>
    <v-data-table
      :headers="headers"
      item-key="id"
      :items="category"
      hide-default-footer
      sort-by="calories"
      class="elevation-1"
    >
      <template v-slot:[`item.actions`]="{ item }">
        <v-btn :to="'/category/edit/' + item.id"
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
        text: "Категории",
        align: "start",
        sortable: false,
        value: "title",
      },
      { text: "Действия", value: "actions", sortable: false },
    ],
    category: [],
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Новая категория" : "Изменить";
    },
    ...mapGetters({
      CATEGORY_STATE: "ProductCategory/CATEGORY_STATE",
    }),
  },
  created() {
    this.initialize();
  },

  methods: {
    ...mapActions({
      get_category_list: "ProductCategory/GET_CATEGORY_LIST",
    }),
    async initialize() {
      this.$set(this, "category", await this.get_category_list());
    },  
  },
};
</script>