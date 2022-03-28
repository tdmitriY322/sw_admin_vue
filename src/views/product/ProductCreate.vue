<template>
  <div>
    <backBtn />
    <v-row class="mt-4">
      <v-col cols="7">
        <h2>{{ page.title }}</h2>
        <v-form ref="product-form">
          {{ product.сity }}
          <v-autocomplete
            v-model="product.сity"
            require
            class="p-0 m-0 mt-6"
            :disabled="loading"
            :items="сityes"
            label="Выберите город"
            placeholder="Город"
            outlined
            chips
            clearable
            small-chips
            multiple
          />

          <v-file-input
            v-if="edit"
            v-model="product.image"
            :rules="[$validation.required]"
            required
            :disabled="loading"
            accept="image/*"
            label="Выберите фото"
            outlined
            chips
            clearable
            prepend-inner-icon="mdi-camera"
            prepend-icon=""
          />

          <v-text-field
            v-model="product.wp_number"
            :disabled="loading"
            label="№ WP(необязательное поле)"
            outlined
            clearable
          />

          <v-text-field
            v-model="product.vendor_code"
            :rules="[$validation.required]"
            required
            @keypress="IsNumber($event)"
            :disabled="loading"
            label="Арктикул"
            outlined
          />

          <v-select
            v-model="product.category"
            :rules="[$validation.required]"
            required
            :disabled="loading"
            ref="category"
            :items="categories"
            label="Выберите категорию"
            placeholder="Выберите категорию"
            outlined
          />

          <v-text-field
            v-model="product.name"
            :rules="[$validation.required]"
            :disabled="loading"
            label="Название"
            clearable
            outlined
          />

          <v-text-field
            v-model="product.people_link"
            :rules="[$validation.required]"
            required
            :disabled="loading"
            label="ЧПУ(человеко-читаемая ссылка)"
            outlined
            clearable
          />

          <v-textarea
            v-model="product.discription"
            :disabled="loading"
            label="Описание"
            outlined
            clearable
          />

          <v-textarea
            v-model="product.sub_discription"
            :disabled="loading"
            label="Краткое описание"
            outlined
            clearable
          />

          <v-text-field
            v-model.number="product.actualy_cost"
            label="Текущая стоимость"
            :disabled="depence"
            @keypress="IsNumber($event)"
            suffix="₸"
            outlined
            clearable
          />

          <v-text-field
            v-model="product.sale_cost"
            :disabled="loading"
            @keypress="IsNumber($event)"
            label="Стоимость с учетом скидки"
            suffix="₸"
            outlined
            clearable
          />

          <v-text-field
            v-model="product.base_cost"
            :rules="[$validation.required]"
            @keypress="IsNumber($event)"
            suffix="₸"
            required
            :disabled="loading"
            label="Базовая стоимость"
            outlined
            clearable
          />

          <v-text-field
            v-model="product.weight"
            @keypress="IsNumber($event)"
            :disabled="loading"
            suffix="ГР"
            label="Вес"
            outlined
            clearable
          />

          <v-switch
            v-model="product.sale"
            :disabled="loading"
            prepend-icon=""
            color="primary"
            label="Распродажа"
            outlined
          />

          <v-text-field
            v-model="product.composition"
            :disabled="loading"
            label="Состав"
            outlined
            clearable
          />

          <v-textarea
            v-model="product.wishes"
            :disabled="loading"
            label="Пожелания"
            outlined
            clearable
          />

          <v-text-field
            v-model="product.calories"
            :disabled="loading"
            @keypress="IsNumber($event)"
            suffix="ККАЛ"
            label="Каллораж"
            clearable
            outlined
          />

          <v-autocomplete
            v-model="product.up_sale"
            :disabled="loading"
            :items="up_sales"
            label="Выбор апсейлов"
            outlined
            chips
            small-chips
            multiple
            required
          />

          <v-autocomplete
            v-model="product.cross_sale"
            :disabled="loading"
            :items="cross_sales"
            label="Выбор кроссейлов"
            outlined
            chips
            small-chips
            multiple
            required
          />

          <v-autocomplete
            v-model="product.topping"
            :disabled="loading"
            :items="toppings"
            label="Выбор топингов"
            outlined
            chips
            small-chips
            multiple
            required
          />

          <v-autocomplete
            v-model="product.same_product"
            :disabled="loading"
            :items="same_products"
            label="Выбор схожих для покупки товаров"
            outlined
            chips
            small-chips
            multiple
            required
          />

          <v-autocomplete
            v-model="product.multi_up_sale"
            :disabled="loading"
            :items="multiUpSales"
            label="Выбор множественные апсейлы"
            outlined
            chips
            small-chips
            multiple
            required
          />

          <v-btn color="primary" elevation="2" @click="submit">
            {{ page.button }}
          </v-btn>
          <v-btn
            v-if="edit"
            color="primary"
            elevation="2"
            @click="deleteProduct()"
          >
            Удалить товар
          </v-btn>
        </v-form>
      </v-col>

      <!-- loader = 'loading', -->

      <v-col cols="4">
        <h2>Предпросмотр</h2>
        <v-card width="250" class="p-0 m-0 mt-6">
          <v-img :src="url" height="250" width="250"></v-img>

          <v-card-title primary-title>
            <div>
              <h3 class="headline mb-0">{{ product.name }}</h3>
            </div>
          </v-card-title>
          <v-card-text class="">
            <div>{{ product.sub_discription }}</div>
            <div class="d-flex justify-space-between mt-2">
              <div class="price mt-2">
                <span class="font-weight-bold headline" style="color: #fd6303"
                  >{{ product.sale_cost }}₸</span
                >
              </div>
              <div class="">
                <div>
                  <del>{{ product.actualy_cost }}₸</del>
                </div>
                <div>Экономия {{ product.economy }}₸</div>
              </div>
            </div>
          </v-card-text>

          <v-card-actions>
            <v-btn color="#fd6303" block outlined>Заказать</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import backBtn from "@/components/backToMain";
import { mapMutations, mapGetters, mapActions } from "vuex";

export default {
  name: "createGoods",
  data() {
    return {
      page: {
        title: "Создать новый товар",
        button: "Coздать",
      },
      edit: false,
      сityes: ["Караганда", "Алма-ата", "Калининград", "Санкт-Петербург"],
      сity: null,
      categories: [],
      categories_json: {},
      category: null,
      up_sales: ["Добавить апсейлы"],
      cross_sales: ["Добавить кроссейлы"],
      toppings: ["Добавить топингов"],
      same_products: ["Добавить схожих для покупки товаров "],
      multiUpSales: ["Добавить множественные апсейлы"],
      loading: false,
      depence: false,
      product: {
        image: null,
        economy: "",
        сity: "",
        wp_number: "",
        category: "",
        vendor_code: "",
        name: "",
        people_link: "",
        discription: "",
        sub_discription: "",
        actualy_cost: "",
        sale_cost: "",
        base_cost: "",
        weight: "",
        sale: false,
        wishes: "",
        up_sale: "",
        calories: "",
        cross_sale: "",
        topping: "",
        same_product: "",
        multi_upsale: "",
      },
    };
  },
  watch: {
    changeSwitch() {
      this.depence = this.product.sale;
    },
  },
  async created() {
    if (this.$route.params.id) {
      this.edit = true;
      let response = await this.productDataSinge(this.$route.params.id);
      this.$set(this, "product", response);
      let singleCategory = await this.categorySinge(this.$route.params.id);
      this.$set(this, "category", singleCategory);
      this.changeTitle();
    }
    this.category_list();
  },
  components: { backBtn },
  computed: {
    ...mapGetters({
      GOODS: "STATE",
    }),
    url() {
      if (!this.product.image) return;
      return URL.createObjectURL(this.product.image);
    },
  },
  methods: {
    changeTitle() {
      if (this.edit == true) {
        this.page.title = "Изменить товар";
        this.page.button = "Изменить";
      }
    },
    IsNumber(event) {
      if (!/\d/.test(event.key) && event.key !== ".")
        return event.preventDefault();
    },
    ...mapActions({
      createProduct: "Product/CREATE_PRODUCT",
      productDataSinge: "Product/GET_PRODUCT_SINGE",
      get_category_list: "ProductCategory/GET_CATEGORY_LIST",
      categorySinge: "ProductCategory/GET_CATEGORY_SINGLE",
      delete: "Product/DELETE_PRODUCT_LIST",
    }),
    ...mapMutations(["CREATE_PRODUCT"]),
    async submit() {
      if (!this.$refs["product-form"].validate()) return false;
      this.loading = true;
      await this.createProduct(this.product);
      this.postProduct();
      console.log("213!!!!!", this.createProduct(this.product));
      this.loading = false;
    },
    async category_list() {
      this.$set(this, "categories_json", await this.get_category_list());
      for (let i = 0; i < this.categories_json.length; i++) {
        this.categories.unshift(this.categories_json[i].title);
      }
      console.log("category list setted", this.categories);
    },
    deleteProduct(){
      this.delete()
    }
  },
};
</script>
