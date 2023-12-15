<template>
  <b-container fluid class="mx-0 tab-container">
    <b-row align-v="center">
      <b-col cols="12" class="py-2 border-bottom border-dark">
        <h3 class="text-info">
          {{ $t('personal_details') }}
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
          @keydown.enter="updateProfileAction"
        >
          <b-row>
            <b-col cols="12">
              <b-form-group>
                <b-form-input
                  v-model="registerForm.username"
                  :placeholder="$t('username')"
                  class="is-disable"
                  disabled
                />
              </b-form-group>
            </b-col>
            <b-col cols="12">
              <b-form-group>
                <b-form-input
                  v-model="registerForm.first_name"
                  :placeholder="$t('first_name')"
                  class="is-disable"
                  disabled
                />
              </b-form-group>
            </b-col>
            <b-col cols="12">
              <b-form-group>
                <b-form-input
                  v-model="registerForm.last_name"
                  :placeholder="$t('last_name')"
                  class="is-disable"
                  disabled
                />
              </b-form-group>
            </b-col>
            <b-col cols="12">
              <b-form-group>
                <b-form-input
                  v-model="registerForm.email"
                  type="email"
                  :placeholder="$tc('email_address', 1)"
                  class="is-disable"
                  disabled
                />
              </b-form-group>
            </b-col>
            <b-col cols="12">
              <b-form-group>
                <b-form-input
                  v-model="registerForm.birthday"
                  :placeholder="$t('birthday')"
                  class="is-disable"
                  disabled
                />
              </b-form-group>
            </b-col>
            <b-col cols="12">
              <b-form-group>
                <b-form-radio-group v-model="registerForm.gender">
                  <b-form-radio value="male" class="sign-radio">
                    {{ $t('male') }}
                  </b-form-radio>
                  <b-form-radio value="female" class="sign-radio">
                    {{ $t('female') }}
                  </b-form-radio>
                </b-form-radio-group>
              </b-form-group>
            </b-col>
            <b-col cols="12">
              <b-form-group>
                <b-form-input
                  v-model="$v.registerForm.address.$model"
                  :state="RegisterValidateState('address')"
                  :placeholder="$t('address')"
                />
                <b-form-invalid-feedback>
                  {{ $t('field_required') }}
                </b-form-invalid-feedback>
              </b-form-group>
            </b-col>
            <b-col cols="12">
              <b-form-group>
                <b-form-input
                  v-model="$v.registerForm.postal_code.$model"
                  :state="RegisterValidateState('postal_code')"
                  :placeholder="$t('postal_code')"
                />
                <b-form-invalid-feedback>
                  {{ $t('field_required') }}
                </b-form-invalid-feedback>
              </b-form-group>
            </b-col>
            <b-col cols="12">
              <b-form-group>
                <b-form-input
                  v-model="$v.registerForm.city.$model"
                  :state="RegisterValidateState('city')"
                  :placeholder="$t('city')"
                />
                <b-form-invalid-feedback>
                  {{ $t('field_required') }}
                </b-form-invalid-feedback>
              </b-form-group>
            </b-col>
            <b-col cols="12">
              <b-form-group>
                <v-select
                  v-model="registerForm.country"
                  label="text"
                  class="sign-select"
                  :options="countryList"
                  :clearable="false"
                >
                  <template slot="no-options">
                    {{ $t('no_match_options') }}
                  </template>
                </v-select>
              </b-form-group>
            </b-col>
            <b-col cols="12">
              <b-form-group>
                <b-row>
                  <b-col cols="5" class="pr-0">
                    <v-select
                      v-model="registerForm.countryPhone"
                      label="text"
                      class="sign-select"
                      :options="countryPhoneList"
                      :get-option-label="phone => '(' + phone.value + ')'"
                      :clearable="false"
                    >
                      <template v-slot:option="{text, value}">
                        {{ text + ' (' + value + ')' }}
                      </template>
                      <template slot="no-options">
                        {{ $t('no_match_options') }}
                      </template>
                    </v-select>
                  </b-col>
                  <b-col cols="7" class="pl-1">
                    <b-form-input
                      v-model="$v.registerForm.phone_number1.$model"
                      :state="RegisterValidateState('phone_number1')"
                      :placeholder="$t('phone_number')"
                    />
                    <b-form-invalid-feedback>
                      {{ $t('phone_number_validation') }}
                    </b-form-invalid-feedback>
                  </b-col>
                </b-row>
              </b-form-group>
            </b-col>
            <b-col cols="12">
              <b-form-group>
                <v-select
                  v-model="registerForm.interface_local"
                  :reduce="lan => lan.value"
                  label="text"
                  class="sign-select"
                  :options="languageList"
                  :clearable="false"
                  :searchable="false"
                >
                  <template slot="no-options">
                    {{ $t('no_match_options') }}
                  </template>
                </v-select>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row class="my-3">
            <b-col cols="12" class="d-flex justify-content-center align-items-center">
              <b-button
                pill
                variant="secondary text-dark"
                class="orange-btn"
                @click="updateProfileAction"
              >
                {{ $t('update_profile') }}
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
import countryData from 'countries-list'
import { validationMixin } from 'vuelidate'
import { required } from 'vuelidate/lib/validators'
import common from '~/mixins/common'

export default {
  mixins: [validationMixin, common],
  data: () => ({
    loading: false,
    registerForm: '',
    countryPhoneList: [],
    countryList: [],
    languageList: []
  }),
  validations: {
    registerForm: {
      phone_number1: {
        required
      },
      address: {
        required
      },
      postal_code: {
        required
      },
      city: {
        required
      }
    }
  },
  computed: {
    ...mapGetters(['loggedUser'])
  },
  async mounted () {
    this.setLanguageData()
    Object.keys(countryData.countries).forEach((key) => {
      this.countryPhoneList.push({
        text: countryData.countries[key].name,
        value: '+' + countryData.countries[key].phone.split(',')[0]
      })
      this.countryList.push({
        text: countryData.countries[key].name,
        value: key
      })
    })
    await this.getPlayerAction()
  },
  methods: {
    ...mapActions('player', ['getPlayer', 'updateProfile']),
    setLanguageData () {
      this.languageList.push({
        text: this.$t('english'),
        value: 'en'
      })
      this.languageList.push({
        text: this.$t('french'),
        value: 'fr'
      })
      this.languageList.push({
        text: this.$t('finnish'),
        value: 'fi'
      })
      this.languageList.push({
        text: this.$t('german'),
        value: 'de'
      })
      this.languageList.push({
        text: this.$t('italian'),
        value: 'it'
      })
      this.languageList.push({
        text: this.$t('swedish'),
        value: 'se'
      })
      this.languageList.push({
        text: this.$t('norwegian'),
        value: 'no'
      })
      this.languageList.push({
        text: this.$t('indian'),
        value: 'in'
      })
    },
    RegisterValidateState (name) {
      const { $dirty, $error } = this.$v.registerForm[name]
      return $dirty ? !$error : null
    },
    async getPlayerAction () {
      try {
        const data = await this.getPlayer({
          $axios: this.$axios,
          params: {
            playerId: this.loggedUser.id
          }
        })
        if (data.status === 1) {
          this.registerForm = data.player
          this.registerForm.countryPhone = {
            text: countryData.countries[data.player.country].name,
            value: '+' + countryData.countries[data.player.country].phone.split(',')[0]
          }
          this.registerForm.country = {
            text: countryData.countries[data.player.country].name,
            value: data.player.country
          }
          this.registerForm.phone_number1 = this.registerForm.phone_number.replace(this.registerForm.countryPhone.value, '')
        }
      } catch (e) {
        console.log(e)
      }
    },
    async updateProfileAction () {
      this.$v.registerForm.$touch()
      if (!this.$v.registerForm.$anyError) {
        this.registerForm.phone_number = this.registerForm.countryPhone.value + this.registerForm.phone_number1
        this.registerForm.country = this.registerForm.country.value
        this.loading = true
        this.registerForm.id = this.loggedUser.id
        try {
          const data = await this.updateProfile({
            $axios: this.$axios,
            params: this.registerForm
          })
          if (data.status === 1) {
            this.$bvToast.toast(this.$t('profile_updated'), {
              variant: 'success',
              appendToast: true,
              toaster: 'b-toaster-top-right',
              noCloseButton: true,
              autoHideDelay: 3500,
              solid: true
            })
          } else {
            this.$bvToast.toast(this.$t('action_failed'), {
              variant: 'danger',
              appendToast: true,
              toaster: 'b-toaster-top-right',
              noCloseButton: true,
              autoHideDelay: 3500,
              solid: true
            })
          }
        } catch (e) {
          console.log(e)
          this.$bvToast.toast(this.$t('action_failed'), {
            variant: 'danger',
            appendToast: true,
            toaster: 'b-toaster-top-right',
            noCloseButton: true,
            autoHideDelay: 3500,
            solid: true
          })
        }
        this.loading = false
      }
    }
  }
}
</script>
