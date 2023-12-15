<template>
  <b-sidebar
    v-model="showSideBar"
    shadow
    backdrop-variant="transparent"
    backdrop
    no-header
  >
    <div>
      <b-list-group>
        <b-list-group-item class="bg-light text-info" @click="showLanguage=!showLanguage">
          <div class="d-flex justify-content-between align-items-center ">
            <i
              :class="`flag:${languageList[$i18n.locale].flag}`"
              style="border-radius: 50%;font-size: 1.2rem"
            />
            <h4 class="text-info w-100 pl-1 mb-0">
              {{ languageList[$i18n.locale].translation }}
            </h4>
            <font-awesome-icon
              :icon="['fas', 'chevron-down']"
              class="text-white"
              style="cursor: pointer;"
            />
          </div>
        </b-list-group-item>
        <template v-if="showLanguage">
          <b-list-group-item
            v-for="countryCode in Object.keys(languageList)"
            :key="countryCode"
            class="language-item"
            :active="countryCode === $i18n.locale"
            @click="changeLanguage(countryCode)"
          >
            <div class="d-flex justify-content-between align-items-center px-2">
              <i
                :class="`flag:${languageList[countryCode].flag}`"
                style="border-radius: 50%;font-size: 1.2rem"
              />
              <h4 class="text-info w-100 pl-1 mb-0">
                {{ languageList[countryCode].translation }}
              </h4>
            </div>
          </b-list-group-item>
        </template>
        <b-list-group-item class="bg-light text-info" @click="gotoPage(0)">
          <div class="d-flex justify-content-start align-items-center ">
            <h4 class="text-info mb-0" style="text-transform: uppercase;font-weight: 200">
              {{ $t('casino') }}
            </h4>
          </div>
        </b-list-group-item>
        <b-list-group-item class="bg-light text-info" @click="gotoPage(1)">
          <div class="d-flex justify-content-start align-items-center ">
            <h4 class="text-info mb-0" style="text-transform: uppercase;font-weight: 200">
              {{ $t('live_casino') }}
            </h4>
          </div>
        </b-list-group-item>
        <b-list-group-item class="bg-light text-info" @click="gotoPage(2)">
          <div class="d-flex justify-content-start align-items-center ">
            <h4 class="text-info mb-0" style="text-transform: uppercase;font-weight: 200">
              {{ $t('faq') }}
            </h4>
          </div>
        </b-list-group-item>
        <b-list-group-item class="bg-light text-info" @click="gotoPage(3)">
          <div class="d-flex justify-content-start align-items-center ">
            <h4 class="text-info mb-0" style="text-transform: uppercase;font-weight: 200">
              {{ $t('contact_us') }}
            </h4>
          </div>
        </b-list-group-item>
        <b-list-group-item class="bg-light text-info" @click="gotoPage(4)">
          <div class="d-flex justify-content-start align-items-center ">
            <h4 class="text-info mb-0" style="text-transform: uppercase;font-weight: 200">
              {{ $t('promotion') }}
            </h4>
          </div>
        </b-list-group-item>
      </b-list-group>
    </div>
  </b-sidebar>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import common from '~/mixins/common'

export default {
  mixins: [common],
  data: () => ({
    showSideBar: false,
    showLanguage: false
  }),
  watch: {
  },
  created () {
    this.$nuxt.$on('sidebar-event', () => {
      this.showSideBar = !this.showSideBar
    })
  },
  computed: {
    ...mapGetters(['loggedUser'])
  },
  mounted () {
  },
  methods: {
    ...mapActions('player', ['getPlayer', 'updateProfile']),
    async changeLanguage (lan) {
      await this.$router.push(this.switchLocalePath(lan))
    },
    gotoPage (index) {
      this.showSideBar = false
      this.$nuxt.$emit('redirect-page-event', index)
    }
  }
}
</script>
