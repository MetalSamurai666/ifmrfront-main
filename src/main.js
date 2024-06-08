import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createI18n } from 'vue-i18n'

import App from './App.vue'
import router from './router'
import VueCookies from 'vue-cookies'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

import VueSplide from '@splidejs/vue-splide'
import '@splidejs/vue-splide/css'

const i18n = createI18n({
  legacy: false,
  locale: 'ru',
  fallbackLocale: 'ru',
  messages: {
    ru: {
      localeTitle: 'Ру',
      message: {
        homeTitle: 'ЦЕНТР ИЗУЧЕНИЯ ПРОБЛЕМ РАЗВИТИЯ ТРАНСПОРТА И ЛОГИСТИКИ',
        nav: {
          main: 'Главная',
          about: 'О нас',
          pubs: 'Публикации',
          news: 'Новости',
          partners: 'Партнёры',
          contacts: 'Контакты',
        },
        infra: {
          title: 'РАЗВИТИЕ ТРАНСПОРТНОЙ ИНФРАСТРУКТУРЫ: ВЗГЛЯД В БУДУЩЕЕ УЗБЕКИСТАНА',
          text: 'В этом видео мы погрузимся в мир транспортной инфраструктуры Узбекистана и рассмотрим его будущие перспективы. От важных проектов модернизации до инновационных технологий, мы расскажем о том, как страна стремится стать лидером в сфере транспортной логистики. Присоединяйтесь к нам, чтобы узнать, какие шаги предпринимаются для создания эффективной, устойчивой и современной транспортной системы в Узбекистане.'
        },
        infographic: {
          title: 'Инфографика',
          card1: 'Транспортные коридоры',
          card2: 'Сухие порты Узбекистана',
        },
        card: {
          title: 'Экологическая устойчивость: взгляд в будущее',
          info: 'Проблемы экологической устойчивости становятся все более актуальными в контексте развития транспортной инфраструктуры. Правительство, осознавая важность уменьшения негативного воздействия транспорта на окружающую среду, активно внедряет меры по снижению выбросов и оптимизации энергопотребления в транспортной сфере.'
        },
        list: {
          more: 'Больше публикаций'
        },
        useful: {
          title: 'Полезные ссылки',
          info: 'Министерство развития информационных технологий и коммуникаций Республики Узбекистан'
        },
        partners: {
          title: 'Наши партнёры'
        },
        rating: {
          title: 'Рейтинг сайта',
          star: 'звёзд',
          leaveReview: 'Оставьте ваш отзыв',
          yourRating: 'Ваша оценка',
          fullname: 'Ф.И.О.',
          review: 'Отзыв',
          send: 'Отправить'
        },
        contacts: {
          address: '100011, Республика Узбекистан, г. Ташкент, массив Хадра, 33А',
          officeTitle1: 'Приёмная',
          officePhone1: '+998 71 244-01-17',
          officeTitle2: 'Офис',
          officePhone2: '+998 71 244-02-40',
          email: 'info@ifmr.uz'
        }
      }
    },
    uz: {
      localeTitle: 'O`z',
      message: {
        homeTitle: 'TRANSPORT VA LOGISTIKANI RIVOJLANTIRISH MUAMMOLARINI O`RGANISH MARKAZI',
        nav: {
          main: 'Bosh sahifa',
          about: 'Biz haqimizda',
          pubs: 'Nashrlar',
          news: 'Yangiliklar',
          partners: 'Hamkorlar',
          contacts: 'Aloqa',
        },
        infra: {
          title: 'TRANSPORT INFRATUZILMASINI RIVOJLANTIRISH: O`ZBEKISTON KELAJAGIGA QARASH',
          text: 'Ushbu videoda biz O`zbekiston transport infratuzilmasi dunyosiga sho`ng`iymiz va uning kelajakdagi istiqbollarini ko`rib chiqamiz. Muhim modernizatsiya loyihalaridan tortib innovatsion texnologiyalargacha, biz mamlakat transport logistikasida qanday qilib etakchi bo`lishga intilayotgani haqida gaplashamiz. O`zbekistonda samarali, barqaror va zamonaviy transport tizimini yaratish bo`yicha qanday qadamlar qo`yilayotganini bilish uchun bizga qo`shiling.'
        },
        infographic: {
          title: 'Infografika',
          card1: 'Transport yo`laklari',
          card2: 'O`zbekistonning quruq portlari',
        },
        card: {
          title: 'Ekologik barqarorlik: kelajakka qarash',
          info: 'Ekologik barqarorlik muammolari rivojlanish kontekstida tobora dolzarb bo`lib bormoqda transport infratuzilmasi. Hukumat salbiyni kamaytirish muhimligini anglab etdi transportning atrof-muhitga ta`siri, chiqindilarni kamaytirish choralarini faol ravishda amalga oshirmoqda va transport sohasida energiya sarfini optimallashtirish.'
        },
        list: {
          more: 'Ko`proq nashrlar'
        },
        useful: {
          title: 'Foydali havolalar',
          info: 'O`zbekiston Respublikasi axborot texnologiyalari va kommunikatsiyalarini rivojlantirish vazirligi'
        },
        partners: {
          title: 'Bizning hamkorlarimiz'
        },
        rating: {
          title: 'Sayt reytingi',
          star: 'yulduz',
          leaveReview: 'Fikringizni qoldiring',
          yourRating: 'Sizning bahoingiz',
          fullname: 'F.I.SH.',
          review: 'Fikringiz',
          send: 'Yuborish'
        },
        contacts: {
          address: "100011, O‘zbekiston Respublikasi, Toshkent shahar, Xadra massivi, 33A",
          officeTitle1: "Qabulxona",
          officePhone1: "+998 71 244-01-17",
          officeTitle2: "Ofis",
          officePhone2: "+998 71 244-02-40",
          email: "info@ifmr.uz"
        },  
      }
    },
    uzk: {
      localeTitle: 'Уз',
      message: {
        homeTitle: 'ТРАНСПОРТ ВА ЛОГИСТИКАНИ РИВОЖЛАНТИРИШ МУАММОЛАРИНИ ЎРГАНИШ МАРКАЗИ',
        nav: {
          main: 'Бош сахифа',
          about: 'Биз хакимизда',
          pubs: 'Нашрлар',
          news: 'Янгиликлар',
          partners: 'Хамкорлар',
          contacts: 'Алока',
        },
        infra: {
          title: 'ТРАНСПОРТ ИНФРАТУЗИЛМАСИНИ РИВОЖЛАНТИРИШ: ЎЗБЕКИСТОН КЕЛАЖАГИГА НАЗАР',
          text: 'Ушбу видеода биз Ўзбекистоннинг траспорт инфратузилмаси дунёсига шўнғиймиз ва унинг келажакдаги истиқболларини кўриб чиқамиз. Муҳим модернизация лойиҳаларидан инновацион технологияларгача мамлакат transport логистикаси соҳасида етакчи бўлишга интилаётгани ҳақида гаплашамиз. Ўзбекистонда самарали, барқарор ва замонавий транспорт тизимини яратиш бўйича қандай қадамлар қўйилаётганини билиш учун бизга қўшилинг.'
        },
        infographic: {
          title: 'Инфографика',
          card1: 'Транспорт йулаклари',
          card2: 'Ўзбекистоннинг қуруқ портлари',
        },
        card: {
          title: 'Экологик барқарорлик: келажакка қараш',
          info: 'Екологик барқарорлик масалалари ривожланиш шароитида тобора долзарб бўлиб бормоқда transport инфратузилмаси. Ҳукумат салбийни камайтириш муҳимлигини англаб етди транспортнинг атроф-муҳитга таъсири, чиқиндиларни камайтириш бўйича чора-тадбирларни фаол амалга оширади ва transport соҳасида енергия сарфини оптималлаштириш.'
        },
        list: {
          more: 'Купрок нашрлар'
        },
        useful: {
          title: 'Фойдали ҳаволалар',
          info: 'Ўзбекистон Республикаси ахборот технологиялари ва коммуникацияларини ривожлантириш вазирлиги'
        },
        partners: {
          title: 'Бизнинг ҳамкорларимиз'
        },
        rating: {
          title: 'Сайт рейтинги',
          star: 'юлдуз',
          leaveReview: 'Фикрингизни қолдиринг',
          yourRating: 'Сизнинг баҳоингиз',
          fullname: 'Ф.И.Ш.',
          review: 'Фикрингиз',
          send: 'Юбориш'
        },
        contacts: {
          address: "100011, Ўзбекистон Республикаси, Тошкент шаҳар, Хадра массиви, 33А",
          officeTitle1: "Қабулхона",
          officePhone1: "+998 71 244-01-17",
          officeTitle2: "Офис",
          officePhone2: "+998 71 244-02-40",
          email: "info@ifmr.uz"
        }
      }
    },
  }
})

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.use(VueCookies, { expires: '7d' })
app.use(createPinia())
app.use(i18n)
app.use(VueSplide)
app.use(router)
app.use(ElementPlus)
app.mount('#app')
