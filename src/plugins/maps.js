import Vue from 'vue';
import YmapPlugin from 'vue-yandex-maps';

const settings = { 
    apiKey: 'ffd5f3c8-d398-4822-ad63-6db99694627f',
    lang: 'ru_RU',
    coordorder: 'latlong',
    enterprise: false,
    version: '2.1'
 };

Vue.use(YmapPlugin, settings);