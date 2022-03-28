<template>
 <div>
    <v-navigation-drawer v-model="drawer"
   app>
    <v-img
      height="140"
      class="pa-4"
      color='white'
    >
      <div class="text-center">
        <v-avatar class="mb-4" color="grey darken-1" size="64">
          <v-img
            aspect-ratio="30"
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAA1BMVEWUlJS/LzW1AAAASElEQVR4nO3BgQAAAADDoPlTX+AIVQEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADwDcaiAAFXD1ujAAAAAElFTkSuQmCC"
          />
        </v-avatar>
        <h2 class="black--text">Название</h2>
      </div>
    </v-img>
    <v-divider></v-divider>

    <v-list>
      <v-list-group
        v-for="item in items"
        :key="item.title"
        v-model="item.active"
        :prepend-icon="item.action"
        no-action
      >
        <template v-slot:activator >
          <v-list-item-content>
            <v-list-item-title v-text="item.title"></v-list-item-title>
          </v-list-item-content>
        </template>

        <v-list-item
          v-for="child in item.items"
          :key="child.title"
          link
          :to="child.link"
          no-action
          :prepend-icon="child.action"
        >
          <v-list-item-content>
            <v-list-item-title v-text="child.title"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-group>
    </v-list>
  </v-navigation-drawer>


  <v-app-bar app elevate-on-scroll elevation="3" color="white">
    <v-app-bar-nav-icon @click="$emit('drawerEvent')"></v-app-bar-nav-icon>
    <v-spacer />
    <v-col lg="6" cols="12">
      <v-form>
        <v-text-field
          class="p-0 m-0 mt-6"
          full-width
          dense
          append-icon="mdi-magnify"
          outlined
          rounded
          placeholder="Поиск"
        />
      </v-form>
    </v-col>
    <v-spacer />
    <v-menu offset-y>
      <template v-slot:activator="{ attrs, on }">
        <span
          class="mx-5 mr-10"
          style="cursor: pointer"
          v-bind="attrs"
          v-on="on"
        >
          <v-badge content="3" color="red" offset-y="10" offset-x="10">
            <v-icon>mdi-bell</v-icon>
          </v-badge>
        </span>
      </template>

      <v-list three-line width="250"> 
        <template v-for="(item, index) in notifications">
          <v-subheader
            v-if="item.header"
            :key="item.header"
            v-text="item.header"
          ></v-subheader>

          <v-divider
            v-else-if="item.divider"
            :key="index"
            :inset="item.inset"
          ></v-divider>

          <v-list-item v-else :key="item.title">
            <v-list-item-avatar>
              <v-img :src="item.avatar"></v-img>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title v-html="item.title"></v-list-item-title>
              <v-list-item-subtitle
                v-html="item.subtitle"
              ></v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
    </v-menu>
    <v-menu offset-y>
      <template v-slot:activator="{ attrs, on }">
        <span style="cursor: pointer" v-bind="attrs" v-on="on">
          <v-chip link>
            <v-badge dot bottom color="green" offset-y="10" offset-x="10">
              <v-avatar size="40">
                <v-img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAA1BMVEWUlJS/LzW1AAAASElEQVR4nO3BgQAAAADDoPlTX+AIVQEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADwDcaiAAFXD1ujAAAAAElFTkSuQmCC" />
              </v-avatar>
            </v-badge>
            <span class="ml-3">{{ user.name }}</span>
          </v-chip>
        </span>
      </template>
      <v-list width="250" class="py-0">
        <v-list-item two-line>
          <v-list-item-avatar>
            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAA1BMVEWUlJS/LzW1AAAASElEQVR4nO3BgQAAAADDoPlTX+AIVQEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADwDcaiAAFXD1ujAAAAAElFTkSuQmCC" />
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>{{ user.name }}</v-list-item-title>
            <v-list-item-subtitle>Онлайн</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-divider />
        <v-list-item link v-for="(menu, i) in menus" :key="i" :to="menu.link">
          <v-list-item-icon>
            <v-icon>{{ menu.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-title>
            {{ menu.title }}
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
 </div>
</template>

<script>
export default {
  name: "Toolbar",
  props: ["drawer"],
  data() {

    return {
        links: [
            ["mdi-microsoft-windows", "Доска",],
            ["mdi-clipboard-list-outline", "Продукты"],
            ["mdi-card-account-details-outline", "Заказы"],
            ["mdi-account", "Профиль"],
            ["mdi-cog", "Настройки"],
      ],


       items: [
        {
          action: 'mdi-microsoft-windows',
          items: [
          { title: 'Аналитика', link: '/' },
          { title: 'E-commerce' },
          ],
          title: 'Доска ',
        },
        {
          action: 'mdi-cube-outline',
          active: false,
          items: [
            { title: 'Список товаров', action: 'mdi-plus-circle-outline', link: '/product', }, 
            { title: 'Категирии товаров', link: '/product/category' }, 
          ],
          title: 'Продукты',
        },
        {
          action: 'mdi-clipboard-list-outline',
          items: [{ title: 'Список мест', link: '/map'}],
          title: 'Карта',
        },
        {
          action: 'mdi-account',
          items: [{ title: 'List Item' }],
          title: 'Профиль ',
        },
        {
          action: 'mdi-cog',
          items: [{ title: 'Изменить настройки', link: '/settings' }],
          title: 'Настройки',
        },
      ],
      menus: [
          { title: "Профиль", icon: "mdi-account", link: '/user/profile',  },
          { title: "Поменять пароль", icon: "mdi-key",link: '/user/changepassword' },
          { title: "Настройки", icon: "mdi-cog",link: '/user/settings' },
          { title: "Выйти", icon: "mdi-logout", link: '/signIn' },
      ],



      notifications: [
      {
          avatar: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAA1BMVEWUlJS/LzW1AAAASElEQVR4nO3BgQAAAADDoPlTX+AIVQEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADwDcaiAAFXD1ujAAAAAElFTkSuQmCC",
          title: "Заголовок",
          subtitle: `<span class="text--primary">Всем</span> &mdash; Текст сообщения...`,
      },
      { divider: true, inset: true },
      {
          avatar: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAA1BMVEWUlJS/LzW1AAAASElEQVR4nO3BgQAAAADDoPlTX+AIVQEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADwDcaiAAFXD1ujAAAAAElFTkSuQmCC",
          title: 'Заголовок <span class="grey--text text--lighten-1">4</span>',
          subtitle: `<span class="text--primary">Всем</span> &mdash; Текст сообщения...`,
      },
      { divider: true, inset: true },
      
    ],
    user: {
        name: 'Пользователь'
    }
    
    };
  },
};
</script>

<style scoped></style>