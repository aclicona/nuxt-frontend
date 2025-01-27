import { defineNuxtPlugin } from '#app'
import VueGoogleMaps from '@fawmi/vue-google-maps'

export default defineNuxtPlugin((nuxtApp) => {
    const config = useRuntimeConfig()

    nuxtApp.vueApp.use(VueGoogleMaps, {
        load: {
            key: config.public.googleMapsApiKey,
            libraries: ['places']  // Add any additional libraries you need
        }
    })
})
