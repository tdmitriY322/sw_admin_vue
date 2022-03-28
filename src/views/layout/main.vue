<template>
    <v-app id="inspire">
        <Toolbars :drawer="drawer" @drawerEvent="drawer = !drawer"/>
       

        <v-main style="background: #f5f5f540">

        <v-container class="py-8 px-6" fluid>
            <slot />
        </v-container>
        
        </v-main>
  </v-app>
</template>


<script>
import Toolbars from "@/components/Toolbars";
export default {
  name: "App",
  components: { Toolbars },
  data: () => ({
    cards: ["Today", "Yesterday"],
    drawer: true,
  }),
  methods: {},
};
</script>