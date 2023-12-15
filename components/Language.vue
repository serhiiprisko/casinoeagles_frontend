<template>
  <b-dropdown size="sm" variant="primary" right class="language-dropdown">
    <template v-slot:button-content>
      <i :class="`flag:${languageList[$i18n.locale].flag}`" style="border-radius: 50%;" /> {{ languageList[$i18n.locale].translation }}
    </template>
    <b-dropdown-item
      v-for="countryCode in Object.keys(languageList)"
      :key="countryCode"
      :active="countryCode === $i18n.locale"
      @click="changeLanguage(countryCode)"
    >
      <i :class="`flag:${languageList[countryCode].flag}`" style="border-radius: 50%;" /> {{ languageList[countryCode].translation }}
    </b-dropdown-item>
  </b-dropdown>
</template>
<script>
import common from '~/mixins/common'
export default {
  mixins: [common],
  data: () => ({
  }),
  mounted () {
  },
  methods: {
    async changeLanguage (lan) {
      await this.$router.push(this.switchLocalePath(lan))
    }
  }
}
</script>
