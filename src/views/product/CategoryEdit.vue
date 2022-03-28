<template>
  <div>
    <v-row>
      <v-col cols="8">
        <h2>{{ page_title }}</h2>
        <v-form ref="category-form">
          <v-text-field
            v-model="category.title"
            label="Категория"
            clearable
            outlined
            class="mt-4"
          ></v-text-field>

          <v-text-field
            v-model="category.sub_category"
            label="Подкатегория"
            clearable
            outlined
          ></v-text-field>

          <v-btn
            v-if="edit"
            color="rgba(253, 0, 3, 0.9)"
            elevation="2"
            class="mt-4 mr-4 white--text"
            @click="deleteCategory()"
          >
            Удалить
          </v-btn>

          <v-btn
            color="rgba(253, 99, 3, 0.9)"
            elevation="2"
            outlined
            class="mt-4 mr-5"
            @click="submit"
          >
            {{ btn_title }}
          </v-btn>
        </v-form>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapActions } from "vuex";
// import axios from "axios";
export default {
  name: "createGoods",
  props: ["srcImg"],
  data() {
    return {
      edit: false,
      page_title: "Создать новую категорию",
      btn_title: "Создать",
      category: {
        title: "",
        sub_category: "",
      },
      categories: [],
    };
  },
  watch: {},
  async created() {
    if (this.$route.params.id) {
      this.edit = true;
      let response = await this.categorySinge(this.$route.params.id);
      this.$set(this, "category", response);
      console.log('!!!!' ,this.category);
      this.changeTitle();
    }
  },
  components: {},
  computed: {},
  methods: {
    ...mapActions({
      get_category_list: "ProductCategory/GET_CATEGORY_LIST",
      categorySinge: "ProductCategory/GET_CATEGORY_SINGLE",
      editCategory: "ProductCategory/EDIT_CATEGORY",
      
    }),
    async category_list() {
      this.$set(this, "category", await this.get_category_list());
    },
    changeTitle() {
      if (this.edit == true) {
        this.page_title = "Изменить категорию";
        this.btn_title = "Изменить";
      }
    },
    // postCategory() {
    //   axios
    //     .post(
    //       "https://0ec4a03f-e055-447b-9bcb-397e050fa22d.mock.pstmn.io/category/edit",
    //       this.category
    //     )
    //     .then(function (response) {
    //       console.log(response);
    //     })
    //     .catch(function (error) {
    //       console.log(error);
    //     });
    // },
    async submit(){
      // this.postCategory()
      let response = await this.editCategory(this.category)
      console.log("submit response !!!", response);
      alert(response.message)
    }
  },
};
</script>
