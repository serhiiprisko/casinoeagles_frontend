<template>
  <div />
</template>

<script>
export default {
  mounted () {
    let trackingInfo = ''
    if (this.$route.query.tracking_code) {
      trackingInfo = `?tracking_code=${this.$route.query.tracking_code}`
    }
    this.$router.push(this.localePath('/online-casino' + trackingInfo, this.$i18n.locale))
  }
}
</script>
