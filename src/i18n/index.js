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
    let langCode
    localStorage.getItem('lang')
    if (localStorage.getItem('lang')) {
        console.log('111')
        langCode = localStorage.getItem('lang')
    } else {
        const UAlang = navigator.language
        langCode = UAlang.indexOf('zh') !== -1 ? 'zh' : 'en'
        localStorage.setItem('lang', langCode)
    }
    return langCode
}

const i18n = new I18n({
    locale: getCurrentLanguage() || 'zh',
    messages: messages,
})

export default i18n