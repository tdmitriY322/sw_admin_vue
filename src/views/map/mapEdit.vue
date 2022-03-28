<template>
  <div>
    <v-row>
      <v-col cols="8">
        <h2>{{ page_title }}</h2>
        <v-form ref="category-form">
          <v-text-field
            v-model="map.title"
            label="Название"
            clearable
            outlined
            class="mt-4"
          ></v-text-field>
        </v-form>
      </v-col>
      <v-col cols="12">
        <div>
          <yandex-map
            :coords="map.coords"
            :zoom="10"
            style="width: 100%; max-width: 100%; height: 98vh"
            @map-was-initialized="initMap"
            :controls="[
              'geolocationControl',
              'fullscreenControl',
              'searchControl',
              'routeButtonControl',
              'zoomControl',
            ]"
          >
          </yandex-map>
        </div>
      </v-col>
      <v-col cols="4">
        <v-btn
          v-if="edit"
          color="rgba(253, 0, 3, 0.9)"
          elevation="2"
          class="mt-4 mr-4 white--text"
          @click="deletePoint()"
        >
          Удалить
        </v-btn>
        <v-btn
          color="rgba(253, 99, 3, 0.9)"
          elevation="2"
          outlined
          v-andrey
          class="mt-4 mr-5"
          @click="submit()"
        >
          {{ btn_title }}
        </v-btn>
      </v-col>
    </v-row>
  </div>
</template>


<script>
import { mapActions } from "vuex";

export default {
  name: "mapEdit",
  data() {
    return {
      btn: {
        edit: {},
        create: {},
        stop_edit: {},
        remove: {},
      },
      active_polygon: {},
      active_edit_polygon_id: 0,
      polygons: {
        coord: [],
        id: 0,
      },
      polygon_list: [],
      all_zone: {},
      edit_polygon_data: [],
      coords_new: [],
      single_zone: {
        coords: [],
        name: "",
        price: "",
        id: "",
      },
      edit_polygon: {},
      visible: false,
      init_map: {},
      new_polygon: [],
      markers: [],
      edit: false,
      page_title: "Создать новую точку",
      btn_title: "Создать",
      map: {
        title: "",

        coords: [48, 68], // массив полигона переданоого с сервера
      },
      marker: {
        coords: [
          [51, 71],
          [52, 72],
          [53, 73],
          [51, 71],
        ],
        polygon: [],
      },
    };
  },

  watch: {
    // all_zone: {
    //   handler() {
    //     this.add_polygon_list()
    //   },
    //   deep: true
    // }
  },
  async created() {
    if (this.$route.params.id) {
      this.edit = true;
      let single_zone = await this.mapSingle(this.$route.params.id);
      // this.$set(this, "edit_polygon_data", response);
      this.$set(this, "map", single_zone);
      console.log("check created response", single_zone);
      this.changeTitle();
      this.map_list();
      console.log("map list WORKINK");
    }
    await this.firstCoord();
  },
  computed: {},

  methods: {
    ...mapActions({
      get_map_list: "Map/GET_POINTS_LIST",
      mapSingle: "Map/GET_MAP_SINGLE",
    }),
    async map_list() {
      this.$set(this, "all_zone", await this.get_map_list());
      console.log(this.all_zone, "all zone!!!");
    },
    changeTitle() {
      if (this.edit == true) {
        this.page_title = "Изменить точку";
        this.btn_title = "Изменить";
      }
    },
    firstCoord() {
      // координата с сервера
      this.marker.coords = this.map.coords;
      console.log("coords of poly", this.map.coords);
    },
    // Событие вызовается когд карта созадется
    initMap(map) {
      this.init_map = map;
      this.add_polygon_list();
      this.changeButton();
      this.createButton();
      this.stopChangeButton();
      this.removePolygonButton();
    },
    get_edit_polygon_data() {
      // Возвращает данные текущего редактируемого полигона
      var data = [];
      this.init_map.geoObjects.each((GeoObject) => {
        if (this.active_edit_polygon_id > 0) {
          if (GeoObject.id == this.active_edit_polygon_id)
            data = GeoObject.geometry.getCoordinates()[0];
        }

        if (GeoObject.properties._data.hintContent === undefined) {
          data = GeoObject.geometry.getCoordinates()[0];
        }
      });
      return data;
    },
    createButton() {
      /*eslint-disable*/
      this.btn.create = new ymaps.control.Button({
        data: {
          content: "Cоздать",
          title: "Click to save the route",
        },
        options: {
          maxWidth: [30, 100, 150],
          float: "right",
          selectOnClick: false,
        },
      });
      this.init_map.controls.add(this.btn.create, {
        right: 5,
        top: 5,
      });
      console.log("кнопка создать полигон");
      this.btn.create.events.add("click", this.addPolygon);

      /*eslint-disable*/
    },
    changeButton() {
      /*eslint-disable*/
      this.btn.edit = new ymaps.control.Button({
        data: {
          // Текст на кнопке.
          content: "Изменить",
          // Текст всплывающей подсказки.
          title: "что то меняет",
        },
        options: {
          // Зададим три значения ширины кнопки для всех состояний.
          maxWidth: [30, 100, 150],
          float: "right",
          selectOnClick: false,
        },
      });
      this.init_map.controls.add(this.btn.edit, {
        right: 5,
        top: 5,
      });
      this.btn.edit.events.add("click", (e) => {
        this.editBtnFunction();
      });
      /*eslint-disable*/
    },
    stopChangeButton() {
      /*eslint-disable*/
      this.btn.stop_edit = new ymaps.control.Button({
        data: {
          // Текст на кнопке.
          content: "Остановить редактирование",
          // Текст всплывающей подсказки.
          title: "что то меняет",
        },
        options: {
          // Зададим три значения ширины кнопки для всех состояний.
          maxWidth: [30, 100, 150],
          float: "right",
          selectOnClick: false,
        },
      });
      this.init_map.controls.add(this.btn.stop_edit, {
        right: 5,
        top: 5,
      });
      this.btn.stop_edit.events.add("click", (e) => {
        this.stopEditBtnFunction();
      });
      // this.edit_button.events.add("click", function (e) {
      // this.edit_polygon.editor.startDrawing();
      //  this.edit_polygon.editor.stopDrawing();
      // this.edit_polygon.editor.stopEditing();
      // });
      /*eslint-disable*/
    },
    removePolygonButton() {
      /*eslint-disable*/
      this.btn.remove = new ymaps.control.Button({
        data: {
          // Текст на кнопке.
          content: "Удалить",
          // Текст всплывающей подсказки.
          title: "что то меняет",
        },
        options: {
          // Зададим три значения ширины кнопки для всех состояний.
          maxWidth: [30, 100, 150],
          float: "right",
          selectOnClick: false,
        },
      });
      this.init_map.controls.add(this.btn.remove, {
        right: 5,
        top: 5,
      });
      this.btn.remove.events.add("click", (e) => {
        this.removePolygonFunction();
        console.log("optons state", this.edit_polygon.editor.state);
      });
      /*eslint-disable*/
    },
    removePolygonFunction() {
      console.log("Кнопка removePolygonFunction рабоает");
      this.init_map.geoObjects.remove(this.active_polygon);
    },
    stopEditBtnFunction() {
      // if (this.edit_polygon.editor) {
      //   console.log("Кнопка stopEditBtnFunction рабоает");
        // this.polygons.coord.push(
        //   this.edit_polygon.geometry.getCoordinates()[0]
        // );
        this.active_polygon.editor.stopDrawing();
        this.active_polygon.editor.stopEditing();
      // }
    },
    editBtnFunction() {
      this.init_map.controls.remove(this.btn.edit);
      this.active_polygon.editor.startDrawing();
        // this.$set(this, "edit_polygon_data", this.single_zone); // Записали на редактирование
        // this.start_edit_polygon()
      console.log("Кнопка editBtnFunction рабоает");
    },
    addPolygon() {
      /*eslint-disable*/
      this.stopEditBtnFunction();
      this.$set(this, "edit_polygon_data", {
        id: 0,
        coords: [],
        name: "",
        price: 0,
      });
      this.edit_polygon = new ymaps.Polygon(
        [],
        {},
        {
          editorDrawingCursor: "crosshair",
          fillColor: "rgba(253, 99, 3, 0.3)",
          strokeColor: "rgba(0, 0, 0, 0.9)",
          strokeWidth: 2,
          fillRule: "nonZero",
        }
      );
      // Добавляем многоугольник на карту.
      this.init_map.geoObjects.add(this.edit_polygon);
      this.edit_polygon.editor.startDrawing();
      // Включаем режим редактирования с возможностью добавления новых вершин.
      this.edit_polygon.events.add("click", function (e) {
        console.log(e.get("target").geometry.getCoordinates());
      });

      /*eslint-disable*/
    },
    add_polygon_list() {
      /*eslint-disable*/
      for (let i = 0; i < this.polygon_list.length; i++) {
        this.init_map.geoObjects.remove(this.polygon_list[i]);
      } 

      if (typeof this.init_map["geoObjects"] == "undefined") return false;
      for (let i = 0; i < this.all_zone.length; i++) {
        var coords = this.all_zone[i].polygon_coords[0];
        if (typeof coords == "string")
          coords = JSON.parse(this.all_zone[i].polygon_coords[0]);
        this.polygon_list[i] = new ymaps.Polygon(
          [coords],
          {
            hintContent: this.all_zone[i].title,
          },
          {
            fillColor: "#00adff",
            interactivityModel: "default#transparent",
            strokeWidth: 1,
            opacity: 0.5,
          }
        );
        this.init_map.geoObjects.add(this.polygon_list[i]);
        // создается айди полигона
        this.polygon_list[i].id = this.all_zone[i].id;

        this.polygon_list[i].events.add("click", (e) => {
          this.active_edit_polygon_id = e._cache.target.id;
          let active_i = 0;
          for (let i = 0; i < this.polygon_list.length; i++) {
            if(this.polygon_list[i].id == this.active_edit_polygon_id) {
              active_i = i; 
            }
          }
          console.log('!!!!1 ' , e._cache.target);
          // this.active_polygon = {}
          this.$set(this, 'active_polygon', this.polygon_list[active_i])
          // this.active_polygon = this.polygon_list[this.active_edit_polygon_id]
          console.log('полигон с номером'+ this.active_edit_polygon_id ,this.active_polygon);
          console.log(this.active_edit_polygon_id);
        });
      }
    },
    // start_edit_polygon() {
    //   /*eslint-disable*/
    //   console.log(this.edit_polygon_data);
    //   var coords = this.edit_polygon_data.coords;
    //   if (typeof coords == "string")
    //     coords = JSON.parse(this.edit_polygon_data.coords);
    //   this.edit_polygon = new ymaps.Polygon([coords], {
    //     editorDrawingCursor: "crosshair",
    //     fillColor: "#6699ff",
    //     // Делаем полигон прозрачным для событий карты.
    //     interactivityModel: "default#transparent",
    //     strokeWidth: 8,
    //     opacity: 0.5,
    //   });

    //   this.init_map.geoObjects.add(this.edit_polygon);
    //   this.edit_polygon.editor.startDrawing();

    //   /*eslint-disable*/
    // },
  },
};
</script>
