export default {
  data: () => ({
    languageList: {
      en: { name: 'English', translation: 'English', flag: 'GB' },
      fr: { name: 'French', translation: 'Français', flag: 'FR' },
      fi: { name: 'Finnish', translation: 'Suomi', flag: 'FI' },
      de: { name: 'German', translation: 'Deutsch', flag: 'DE' },
      it: { name: 'Italian', translation: 'Italiano', flag: 'IT' },
      se: { name: 'Swedish', translation: 'Svenska', flag: 'SE' },
      no: { name: 'Norwegian', translation: 'Norsk', flag: 'NO' },
      in: { name: 'Indian', translation: 'Indian', flag: 'IN' },
      cn: { name: 'Chinese', translation: '中文', flag: 'CN' },
      ru: { name: 'Russian', translation: 'русский', flag: 'RU' },
      tr: { name: 'Turkish', translation: 'Türk', flag: 'TR' }
    }
  }),
  methods: {
    sleep (ms) {
      return new Promise(resolve => setTimeout(resolve, ms))
    }
  }
}
