<template>
  <b-container fluid class="mx-0 footer-container">
    <b-row class="border-bottom border-white py-4" align-h="center">
      <b-col
        v-for="(content, index) in footerContent"
        :key="index"
        cols="12"
        md="4"
        lg="4"
        xl="4"
        class="d-flex flex-wrap justify-content-center px-4"
      >
        <span v-if="content" class="px-4" v-html="content.content" />
      </b-col>
    </b-row>
    <b-row class="py-2" align-h="center" style="background: #EBEBEB">
      <b-col :cols="($mq==='xl' || $mq==='lg') ? 12 : 12" class="d-flex flex-wrap justify-content-center align-items-center">
        <b-img v-for="index in 13" :key="index" :src="`/footer_logo/${index}.png`" class="px-2 py-1" height="30" />
      </b-col>
    </b-row>
    <b-row class="py-2" align-h="center" style="background: #EBEBEB">
      <b-col :cols="($mq==='xl' || $mq==='lg') ? 12 : 12" class="d-flex flex-wrap justify-content-center align-items-center">
        <b-img v-for="index in 3" :key="index" :src="`/footer_logo/2_${index}.png`" class="px-2 py-1" height="30" />
      </b-col>
    </b-row>
    <b-row class="border-bottom border-white py-4" align-h="center">
      <b-col cols="12" class="d-flex flex-wrap justify-content-center align-items-center">
        <span v-if="licenseContent" v-html="licenseContent.content" />
      </b-col>
<!--      <b-col :cols="($mq==='xl' || $mq==='lg') ? 10 : 12" class="d-flex flex-wrap justify-content-center align-items-center">-->
<!--        <b-img v-for="index in 5" :key="index" :src="`/payment_logo/bottom/${index}.png`" class="px-2" height="20" />-->
<!--      </b-col>-->
    </b-row>
    <b-row class="border-bottom border-light py-2">
      <b-col cols="12" class="d-flex flex-wrap justify-content-center align-items-center">
        <h5 v-for="(content, idx) in templateList" :key="idx" class="faq-text px-3 mt-2 text-uppercase" @click="gotoFaq(idx)">
          {{ $t(content.content_tab + '') }}
        </h5>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  props: {
    fixed: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    loading: false,
    footerContent: [],
    licenseContent: '',
    templateList: []
  }),
  computed: {
    ...mapGetters(['getManagementTab'])
  },
  async mounted () {
    await this.getLicenseTextTemplateAction()
    await this.getContentTemplateAction()
    await this.getFooterTemplateAction()
  },
  methods: {
    ...mapActions(['setManagementTab']),
    ...mapActions('siteContent', ['getContentTemplates', 'getFaqTemplates', 'getFooterTemplates']),
    async getLicenseTextTemplateAction () {
      const data = await this.getContentTemplates({
        $axios: this.$axios,
        params: {
          content_tab: 'license_line',
          language: this.$i18n.locale
        }
      })
      if (data.status === 1) {
        this.licenseContent = data.templateList[0]
      }
    },
    async getFooterTemplateAction () {
      const data = await this.getFooterTemplates({
        $axios: this.$axios,
        params: {
          language: this.$i18n.locale
        }
      })
      if (data.status === 1) {
        this.footerContent = data.templateList
      }
    },
    async getContentTemplateAction () {
      const data = await this.getFaqTemplates({
        $axios: this.$axios,
        params: {
          language: this.$i18n.locale
        }
      })
      if (data.status === 1) {
        this.templateList = data.templateList
      }
    },
    gotoFaq (index) {
      this.popupWindow(this.localePath('/faq/' + index, this.$i18n.locale), 'FAQ', 1024, 768)
    },
    popupWindow (url, title, w, h) {
      const left = (screen.width / 2) - (w / 2)
      const top = (screen.height / 2) - (h / 2)
      return window.open(url, title, 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left)
    }
  }
}
</script>
