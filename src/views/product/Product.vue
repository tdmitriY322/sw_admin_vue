<template>
  <v-container>
    <v-row>
      <v-col cols="1"><backBtn class="p-0 m-0 mt-6" /></v-col>
      <v-col cols="3">
        <v-form>
          <v-text-field
            class="p-0 m-0 mt-6"
            dense
            append-icon="mdi-magnify"
            outlined
            placeholder="Поиск..."
          />
        </v-form>
      </v-col>
      <v-col cols="4">
        <v-select
          class="p-0 m-0 mt-6"
          outlined
          dense
          ref="category"
          v-model="category"
          :items="categories"
          label="Категории"
          placeholder="Категории"
        ></v-select>
      </v-col>
      <v-spacer />
      <v-col cols="2">
        <v-btn
          class="p-0 m-0 mt-6 text-center white--text"
          depressed
          color="black"
          height="40px"
          @click="$router.push('/product/create')"
        >
          Создать позицию
        </v-btn>
      </v-col>
    </v-row>
    <v-data-table
      hide-default-footer
      :headers="headers"
      :items="some_product"
      :items-per-page="10"
      class="elevation-1"
    >
    <template v-slot:[`item.actions`]="{ item }">
        <v-btn :to="'/product/edit/' + item.id"
        icon
        >
          <v-icon small> mdi-pencil </v-icon>
        </v-btn>
      </template>
    </v-data-table>
  </v-container>
</template>



<script>
import backBtn from "@/components/backToMain";
// import categoriesData from "@/data/categories.json"
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      products: [{ img: "", title: "", discription: "", price: "" }],
      categories: [],
      category: null,
      headers: [
        { text: "Артикул ", align: "start", sortable: false, value: "code" },
        { text: "Название ", value: "name" },
        { text: "ЧПУ", value: "peopleLink" },
        { text: "Цена", value: "price" },
        { text: "Скидка", value: "sale" },
        { text: "Категории ", value: "category" },
        { text: "Метки ", value: "teg" },
        { text: "Действия", value: "actions" },
      ],
      some_product: [],
    };
  },
  computed: mapGetters({
    GOODS: "STATE",
  }),
  async created() {
    
    // this.$set(this, "categories", categoriesData.catagories)
    this.$set(this, "some_product", await this.get_product_list())
  },
  methods: {
     ...mapActions({
      get_product_list: "Product/GET_PRODUCT_LIST",
    }),
  },
  components: {
    backBtn,
  },
};
</script>
