<template>
  <b-container fluid class="mx-0 tab-container">
    <b-row align-v="center">
      <b-col cols="12" class="py-2 border-bottom border-dark">
        <h3 class="text-info">
          {{ $t('bet_list') }}
        </h3>
      </b-col>
    </b-row>
    <b-row>
      <b-col cols="12">
        <b-row class="py-2">
          <mq-layout mq="lg+" class="vw-100">
            <b-col cols="3" class="py-1">
              <v-select
                v-model="filterPeriod"
                :reduce="period => period.value"
                label="text"
                class="sign-select"
                :options="periodList"
                :clearable="false"
                :searchable="false"
                @input="updateItems"
              >
                <template slot="no-options">
                  {{ $t('no_match_options') }}
                </template>
              </v-select>
            </b-col>
            <b-col class="d-flex align-items-center py-1">
              <h6 :class="filterPeriod!==3 ? 'text-info' : 'text-white'">
                {{ $t('start_date') }}
              </h6>
              <v-date-picker
                v-model="filterStartDate"
                :masks="calendarMask"
                :model-config="calendarConfig"
                :locale="$i18n.locale"
                is-dark
              >
                <template v-slot="{ inputValue, togglePopover }">
                  <b-input-group class="management-input">
                    <template v-slot:prepend>
                      <b-input-group-text>
                        <font-awesome-icon :icon="['fas', 'calendar-alt']" :class="filterPeriod!==3 ? 'text-gray' : 'text-info'" />
                      </b-input-group-text>
                    </template>
                    <b-form-input
                      :disabled="filterPeriod!==3"
                      readonly
                      class="bg-primary rounded"
                      :value="inputValue"
                      @click="togglePopover"
                    />
                  </b-input-group>
                </template>
              </v-date-picker>
              <h6 class="pl-2" :class="filterPeriod!==3 ? 'text-info' : 'text-white'">
                {{ $t('to') }}
              </h6>
              <v-date-picker
                v-model="filterEndDate"
                :masks="calendarMask"
                :model-config="calendarConfig"
                :locale="$i18n.locale"
                is-dark
              >
                <template v-slot="{ inputValue, togglePopover }">
                  <b-input-group class="management-input">
                    <template v-slot:prepend>
                      <b-input-group-text>
                        <font-awesome-icon :icon="['fas', 'calendar-alt']" :class="filterPeriod!==3 ? 'text-gray' : 'text-info'" />
                      </b-input-group-text>
                    </template>
                    <b-form-input
                      :disabled="filterPeriod!==3"
                      readonly
                      class="bg-primary rounded"
                      :value="inputValue"
                      @click="togglePopover"
                    />
                  </b-input-group>
                </template>
              </v-date-picker>
            </b-col>
          </mq-layout>
          <mq-layout mq="md" class="vw-100">
            <b-col cols="12" class="py-1">
              <v-select
                v-model="filterPeriod"
                :reduce="period => period.value"
                label="text"
                class="sign-select"
                :options="periodList"
                :clearable="false"
                :searchable="false"
                @input="updateItems"
              >
                <template slot="no-options">
                  {{ $t('no_match_options') }}
                </template>
              </v-select>
            </b-col>
            <b-col cols="12" class="py-1 d-flex align-items-center justify-content-end">
              <h6 :class="filterPeriod!==3 ? 'text-info' : 'text-white'" class="text-nowrap">
                {{ $t('start_date') }}
              </h6>
              <v-date-picker
                v-model="filterStartDate"
                :masks="calendarMask"
                :model-config="calendarConfig"
                :locale="$i18n.locale"
                is-dark
              >
                <template v-slot="{ inputValue, togglePopover }">
                  <b-input-group class="management-input">
                    <template v-slot:prepend>
                      <b-input-group-text>
                        <font-awesome-icon :icon="['fas', 'calendar-alt']" :class="filterPeriod!==3 ? 'text-gray' : 'text-info'" />
                      </b-input-group-text>
                    </template>
                    <b-form-input
                      :disabled="filterPeriod!==3"
                      readonly
                      class="bg-primary rounded"
                      :value="inputValue"
                      @click="togglePopover"
                    />
                  </b-input-group>
                </template>
              </v-date-picker>
            </b-col>
            <b-col cols="12" class="py-1 d-flex align-items-center justify-content-end">
              <h6 class="pl-2 text-nowrap" :class="filterPeriod!==3 ? 'text-info' : 'text-white'">
                {{ $t('to') }}
              </h6>
              <v-date-picker
                v-model="filterEndDate"
                :masks="calendarMask"
                :model-config="calendarConfig"
                :locale="$i18n.locale"
                is-dark
              >
                <template v-slot="{ inputValue, togglePopover }">
                  <b-input-group class="management-input">
                    <template v-slot:prepend>
                      <b-input-group-text>
                        <font-awesome-icon :icon="['fas', 'calendar-alt']" :class="filterPeriod!==3 ? 'text-gray' : 'text-info'" />
                      </b-input-group-text>
                    </template>
                    <b-form-input
                      :disabled="filterPeriod!==3"
                      readonly
                      class="bg-primary rounded"
                      :value="inputValue"
                      @click="togglePopover"
                    />
                  </b-input-group>
                </template>
              </v-date-picker>
            </b-col>
          </mq-layout>
        </b-row>
      </b-col>
      <b-col cols="12">
        <b-overlay
          :show="loading"
          spinner-variant="secondary"
          opacity="0"
          no-wrap
        />
        <b-table
          :items="items"
          :fields="fields"
          :sort-by.sync="sortBy"
          :sort-desc.sync="sortDesc"
          sort-icon-left
          responsive
          thead-tr-class="mytable-head"
          tbody-tr-class="mytable-body"
          head-variant="dark"
          table-variant="primary"
        >
          <template #cell(bet)="data">
            <span>{{ data.value | currencyFormat }}</span>
          </template>
          <template #cell(win)="data">
            <span>{{ data.value | currencyFormat }}</span>
          </template>
          <template #cell(total)="data">
            <span>{{ data.value | currencyFormat }}</span>
          </template>
          <template #cell(createdAt)="data">
            <span>{{ data.value | dateFormat(true) }}</span>
          </template>
        </b-table>
      </b-col>
      <b-col cols="12">
        <b-pagination
          v-model="page"
          class="mytable-pagination"
          :total-rows="totalRows"
          :per-page="itemsPerPage"
          align="right"
        ></b-pagination>
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import common from '~/mixins/common'

export default {
  mixins: [common],
  data: () => ({
    loading: false,
    periodList: [],
    calendarMask: {
      input: 'YYYY-MM-DD'
    },
    calendarConfig: {
      type: 'string',
      mask: 'YYYY-MM-DD'
    },
    fields: [],
    items: [],
    filterPeriod: 2,
    filterStartDate: '',
    filterEndDate: '',
    sortBy: '',
    sortDesc: false,
    page: 1,
    itemsPerPage: 10,
    totalRows: 0
  }),
  computed: {
    ...mapGetters(['loggedUser'])
  },
  watch: {
    filterStartDate () {
      this.updateItems()
    },
    filterEndDate () {
      this.updateItems()
    },
    sortBy () {
      this.updateItems()
    },
    sortDesc () {
      this.updateItems()
    },
    page () {
      this.updateItems()
    }
  },
  async mounted () {
    this.periodList = [
      {
        text: this.$t('last_24hours'),
        value: 0
      },
      {
        text: this.$t('last_7days'),
        value: 1
      },
      {
        text: this.$t('last_30days'),
        value: 2
      },
      {
        text: this.$t('custom'),
        value: 3
      }
    ]
    this.fields = [
      {
        key: 'createdAt',
        label: this.$t('date'),
        sortable: true
      },
      {
        key: 'name',
        label: this.$t('game_name'),
        sortable: true
      },
      {
        key: 'bet',
        label: this.$t('bet'),
        sortable: true
      },
      {
        key: 'win',
        label: this.$t('win'),
        sortable: true
      },
      {
        key: 'total',
        label: this.$t('total'),
        sortable: false
      }
    ]
    await this.updateItems()
  },
  methods: {
    ...mapActions('playerTransaction', ['getBetList']),
    async updateItems () {
      this.loading = true
      try {
        const data = await this.getBetList({
          $axios: this.$axios,
          params: {
            playerId: this.loggedUser.id,
            filterPeriod: this.filterPeriod,
            filterStartDate: this.filterStartDate,
            filterEndDate: this.filterEndDate,
            sortBy: this.sortBy,
            sortDesc: this.sortDesc,
            page: this.page,
            itemsPerPage: this.itemsPerPage
          }
        })
        if (data.status === 1) {
          this.items = data.transactions.rows
          this.totalRows = data.transactions.count
        }
      } catch (error) {
        console.log(error)
      }
      this.loading = false
    }
  }
}
</script>
