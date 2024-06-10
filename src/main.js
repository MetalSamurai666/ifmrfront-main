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
          title: 'Организован форум по развитию сотрудничества между странами Центральной Азии и Китаем',
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
        },
        publish: {
          title: 'Организован форум по развитию сотрудничества между странами Центральной Азии и Китаем',
          text: `<p>
            <br>4 июня текущего года в г. Ташкент состоялся IV Форум аналитических центров «Центральная Азия – Китай» на тему «Взаимовыгодное сотрудничество на пути к всеобщему процветанию и устойчивому развитию».
            </p>
            <br>
            <p>
                В мероприятии, организованном Институтом стратегических и межрегиональных исследований при Президенте Республики Узбекистан совместно с институтами России, Восточной Европы и Центральной Азии, приняли участие более 40 руководителей и экспертов ведущих научно-исследовательских и аналитических центров.
            </p>    
            <br>
            <h3>Центр осуществляет следующие функции:</h3>
            <br>
            <p>
                В мероприятии приняли участие директор «Центра изучения проблем развития транспорта и логистики» при Министерстве транспорта Республики Узбекистан Бекзод Холматов и сотрудники Центра.
            </p>
            <br>
            <p>
                Несмотря на устойчивый рост грузоперевозок между Узбекистаном и Китаем, Б. Холматов подчеркнул необходимость развития альтернативных сухопутных транспортных коридоров в связи с меняющейся геополитической ситуацией.
            </p>
            <br>
            <p>
                "Объем грузоперевозок за последние 4 года увеличился в два раза и по итогам 2023 года составил свыше 5 млн. тонн" - отметил Б. Холматов.
            </p>
            <br>
            <p>
                Также было предложено сотрудничество по вопросу присоединения Китайской Народной Республики к следующим международным мультимодальным коридорам:
                - "Страны АТР - Китай - Кыргызстан - Узбекистан - Туркменистан - Азербайджан - Грузия - Турция - страны Европейского союза";
                -  между Азией и Европой через “Узбекистан – Туркменистан – Иран – Турция”.
            </p>
            <br>
            <p>
                Реализация вышеуказанных инициатив позволит не только существенно нарастить объёмы взаимной торговли и обеспечить запуск новых проектов кооперации, но и самое главное – ещё более повысить транзитный потенциал региона.
            </p>
        `
        },
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
          title: 'Markaziy Osiyo davlatlari va Xitoy o`rtasidagi hamkorlik aloqalarini rivojlantirish yuzasidan forum tashkillashtirildi',
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
        publish: {
          title: 'Markaziy Osiyo davlatlari va Xitoy o`rtasidagi hamkorlik aloqalarini rivojlantirish yuzasidan forum tashkillashtirildi',
          text: `<p>
            <br>Joriy yilning 4-iyun kuni  Toshkent shahrida "Umumiy farovonlik va barqaror taraqqiyot yo‘lida o‘zaro manfaatli hamkorlik" mavzusida tahlil markazlarining "Markaziy Osiyo – Xitoy" IV forumi bo'lib o'tdi..
            </p>
            <br>
            <p>
              O'zbekiston Respublikasi Prezidenti huzuridagi strategik va mintaqalararo tadqiqotlar instituti tomonidan Rossiya, Sharqiy Yevropa va Markaziy Osiyo instituti bilan hamkorlikda tashkil etilgan tadbirda yetakchi ilmiy-tadqiqot va tahliliy markazlarning 40 dan ortiq rahbar va ekspertlari ishtirok etdi. 
            </p>    
            <br>
            <p>
              Ushbu tadbirda Transport vazirligi tomonidan “Transport va logistikani rivojlantirish muammolarini o'rganish markaz”i direktori Bekzod Xolmatov va Markaz xodimlari ishtirok etishdi.
            </p>
            <br>
            <p>
              Bekzod Xolmatov tomonidan O'zbekiston va Xitoyning o'rtasida yuk tashishlarning barqaror o'sishiga qaramay, o'zgaruvchan geosiyosiy vaziyat tufayli muqobil quruqlik transport yo'laklarini rivojlantirish zarurligi ta'kidlandi.
            </p>
            <br>
            <p>
              "So'nggi 4 yil ichida ikki davlat o'rtasidagi yuk tashish hajmi ikki baravarga oshib, 2023 yil yakuniga ko'ra 5 million tonnani tashkil etdi" deya ta'kidladi B. Xolmatov.
            </p>
            <br>
            <p>
              Shuningdek Xitoy Xalq Respublikasini quyidagi xalqaro multimodal yo'laklarga qo'shish masalalari bo'yicha hamkorlik taklif qilindi:
              <br>
              -  "Osiyo-Tinch okeani mintaqasi davlatlari - Xitoy - Qirg'iziston – O'zbekiston – Turkmaniston – Ozarbayjon – Gruziya – Turkiya - Evropa Ittifoqi mamlakatlari";
              <br> 
              -  Osiyo va Yevropa o'rtasidagi "O'zbekiston – Turkmaniston – Eron – Turkiya".
            </p>
            <br>
            <p>
              Yuqoridagi tashabbuslarni amalda joriy etish orqali "Markaziy Osiyo-Xitoy" o'rtasidagi savdo hajmini o'sishi, yangi kooperatsiya loyihalarini ishga tushirilishi bilan bir qatorda mintaqa tranzit salohiyatini yanada oshirishga erishiladi .
            </p>
        `
        }
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
          title: 'Марказий Осиё мамлакатлари ва Хитой ўртасида ҳамкорликни ривожлантириш бўйича форум ташкил етилди',
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
        },
        publish: {
          title: 'Марказий Осиё мамлакатлари ва Хитой ўртасида ҳамкорликни ривожлантириш бўйича форум ташкил етилди',
          text: `<p>
            <br>Жорий йилнинг 4-июн куни Тошкент шаҳрида "Умумий фаровонлик ва барқарор тараққиёт йўлида ўзаро манфаатли ҳамкорлик" мавзусида таҳлил марказларининг "Марказий Осиё – Хитой" IV форуми бўлиб ўтди.
            </p>
            <br>
            <p>
              Ўзбекистон Республикаси Президенти ҳузуридаги стратегик ва минтақалараро тадқиқотлар институти томонидан Россия, Шарқий Европа ва Марказий Осиё институти билан ҳамкорликда ташкил этилган тадбирда етакчи илмий-тадқиқот ва таҳлилий марказларнинг 40 дан ортиқ раҳбар ва экспертлари иштирок этди.
            </p>
            <br>
            <p>
              Ушбу тадбирда Транспорт вазирлиги томонидан “Транспорт ва логистикани ривожлантириш муаммоларини ўрганиш маркази” директори Бекзод Холматов ва Марказ ходимлари иштирок этишди.
            </p>
            <br>
            <p>
              Бекзод Холматов томонидан Ўзбекистон ва Хитойнинг ўртасида юк ташишларнинг барқарор ўсишига қарамай, ўзгарувчан геосиёсий вазият туфайли муқобил қуруқлик транспорт йўлакларини ривожлантириш зарурлиги таъкидланди.
            </p>
            <br>
            <p>
              "Сўнгги 4 йил ичида икки давлат ўртасидаги юк ташиш ҳажми икки бараварга ошиб, 2023 йил якунига кўра 5 миллион тоннани ташкил этди" дея таъкидлади Б. Холматов.
            </p>
            <br>
            <p>
              Шунингдек, Хитой Халқ Республикасини қуйидаги халқаро мультимодал йўлакларга қўшиш масалалари бўйича ҳамкорлик таклиф қилинди:
              <br>
              - "Осиё-Тинч океани минтақаси давлатлари - Хитой - Қирғизистон – Ўзбекистон – Туркманистон – Озарбайжон – Грузия – Туркия - Европа Иттифоқи мамлакатлари";
              <br>
              - Осиё ва Европа ўртасидаги "Ўзбекистон – Туркманистон – Эрон – Туркия".
            </p>
            <br>
            <p>
              Юқоридаги ташаббусларни амалга жорий этиш орқали "Марказий Осиё-Хитой" ўртасидаги савдо ҳажмининг ўсиши, янги кооперация лойиҳаларини ишга туширилиши билан бир қаторда минтақавий транзит салоҳиятини янада оширишга эришилади.
            </p>
          `
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
