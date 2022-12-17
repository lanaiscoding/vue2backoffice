import Vue from 'vue'
import I18n from 'vue-i18n'

import EN from './en'
import ZH from './zh'
Vue.use(I18n);

const messages = {
    en: {
        ...EN
    },
    zh: {
        ...ZH
    },
}

const getCurrentLanguage = () => {
    const UAlang = navigator.language

    const langCode = UAlang.indexOf('zh') !== -1 ? 'zh' : 'en'
    localStorage.setItem('lang', langCode)
    return langCode
}

const i18n = new I18n({
    locale: getCurrentLanguage() || 'zh',
    messages: messages,
})

export default i18n