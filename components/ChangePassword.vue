<template>
  <b-container fluid class="mx-0 tab-container">
    <b-row align-v="center">
      <b-col cols="12" class="py-2 border-bottom border-dark">
        <h3 class="text-info">
          {{ $t('change_password') }}
        </h3>
      </b-col>
    </b-row>
    <b-row>
      <b-col
        cols="12"
        md="8"
        lg="8"
        xl="8"
        class="py-4 d-flex align-items-center"
      >
        <b-overlay
          :show="loading"
          spinner-variant="secondary"
          opacity="0"
          no-wrap
        />
        <b-form
          class="px-3"
          @keydown.enter="changePasswordAction"
        >
          <b-row>
            <b-col cols="12">
              <b-form-group>
                <b-alert :show="isWrongOldPassword" variant="danger">
                  {{ $t('wrong_old_password') }}
                </b-alert>
                <b-alert :show="isSuccess" variant="success">
                  {{ $t('player_password_changed') }}
                </b-alert>
              </b-form-group>
            </b-col>
            <b-col cols="12">
              <b-form-group>
                <b-form-input
                  v-model="$v.form.oldPassword.$model"
                  :state="validateState('oldPassword')"
                  :placeholder="$t('old_password')"
                />
                <b-form-invalid-feedback>
                  {{ $t('field_required') }}
                </b-form-invalid-feedback>
              </b-form-group>
            </b-col>
            <b-col cols="12">
              <b-form-group>
                <b-form-input
                  v-model="$v.form.newPassword.$model"
                  :state="validateState('newPassword')"
                  :placeholder="$t('new_password')"
                />
                <b-form-invalid-feedback>
                  {{ $t('password_validation') }}
                </b-form-invalid-feedback>
              </b-form-group>
            </b-col>
            <b-col cols="12">
              <b-form-group>
                <b-form-input
                  v-model="$v.form.confirmPassword.$model"
                  :state="validateState('confirmPassword')"
                  :placeholder="$t('confirm_new_password')"
                />
                <b-form-invalid-feedback>
                  {{ $t('confirm_password_validation') }}
                </b-form-invalid-feedback>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row class="my-3">
            <b-col cols="12" class="d-flex justify-content-center align-items-center">
              <b-button
                pill
                variant="secondary text-dark"
                class="orange-btn"
                @click="changePasswordAction"
              >
                {{ $t('save_new_password') }}
              </b-button>
            </b-col>
          </b-row>
        </b-form>
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import { validationMixin } from 'vuelidate'
import { required, sameAs } from 'vuelidate/lib/validators'
import common from '~/mixins/common'

export default {
  mixins: [validationMixin, common],
  data: () => ({
    loading: false,
    isWrongOldPassword: false,
    isSuccess: false,
    form: {
      oldPassword: null,
      newPassword: null,
      confirmPassword: null
    }
  }),
  validations: {
    form: {
      oldPassword: {
        required
      },
      newPassword: {
        required
      },
      confirmPassword: {
        required,
        sameAsPassword: sameAs('newPassword')
      }
    }
  },
  computed: {
    ...mapGetters(['loggedUser'])
  },
  mounted () {
  },
  methods: {
    ...mapActions('player', ['updatePassword']),
    validateState (name) {
      const { $dirty, $error } = this.$v.form[name]
      return $dirty ? !$error : null
    },
    async changePasswordAction () {
      this.$v.form.$touch()
      if (!this.$v.form.$anyError) {
        this.loading = true
        this.form.id = this.loggedUser.id
        try {
          const data = await this.updatePassword({
            $axios: this.$axios,
            params: this.form
          })
          if (data.status === 1) {
            this.isSuccess = true
            this.isWrongOldPassword = false
          } else {
            this.isWrongOldPassword = true
            this.isSuccess = false
          }
        } catch (e) {
          console.log(e)
          this.isWrongOldPassword = true
        }
        this.loading = false
      }
    }
  }
}
</script>
