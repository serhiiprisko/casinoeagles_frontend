<template>
  <client-only>
    <b-carousel
      id="carousel-1"
      v-model="slider"
      :interval="3000"
      controls
      indicators
      background="#ababab"
      class="my-carousel"
    >
      <b-carousel-slide
        v-for="(slider, index) in sliderList"
        :key="index"
        :img-src="slider"
      />
    </b-carousel>
  </client-only>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  data: () => ({
    slider: 0,
    sliderList: []
  }),
  created () {
    this.$nuxt.$on('slider-action', () => {
      this.gotoAction()
    })
  },
  computed: {
    ...mapGetters(['loggedIn', 'loggedUser', 'getCountryCode'])
  },
  async mounted () {
    await this.getSlidersAction()
  },
  methods: {
    ...mapActions('siteSlider', ['getSliders']),
    async getSlidersAction () {
      const data = await this.getSliders({
        $axios: this.$axios,
        params: {
          lan: this.$i18n.locale,
          is_mobile: this.$mq !== 'xl' && this.$mq !== 'lg'
        }
      })
      if (data.status === 1) {
        this.sliderList = []
        data.sliderList.forEach((slider) => {
          this.sliderList.push(slider.image_url)
        })
      }
    }
  }
}
</script>
