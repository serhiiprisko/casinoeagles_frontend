<template>
  <client-only>
    <vue-flux
      ref="slider"
      :options="vfOptions"
      :images="vfImages"
      :transitions="vfTransitions"
      :class="($mq==='xl' || $mq==='lg') ? 'desktop' : 'mobile'"
    >
      <template v-slot:preloader>
        <flux-preloader />
      </template>

      <template v-slot:controls>
        <flux-controls />
      </template>

      <template v-slot:pagination>
        <flux-pagination />
      </template>

    </vue-flux>
  </client-only>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  data: () => ({
    vfOptions: {
      autoplay: true,
      delay: 2000
    },
    vfImages: [],
    vfTransitions: ['cube', 'fade', 'zip', 'slide', 'blocks1', 'book', 'swipe', 'blocks2', 'concentric', 'waterfall', 'round1', 'blinds2d', 'explode', 'wave', 'fall']
  }),
  created () {
    this.$nuxt.$on('slider-action', () => {
      this.gotoAction()
    })
  },
  computed: {
    ...mapGetters(['loggedUser', 'getCountryCode'])
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
        this.vfImages = []
        data.sliderList.forEach((slider) => {
          this.vfImages.push(slider.image_url)
        })
      }
    }
  }
}
</script>
