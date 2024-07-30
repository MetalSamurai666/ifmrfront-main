<script setup>
    import { onMounted, ref } from 'vue'
    import { useCenterStore } from '@/stores/data/center'
    import { storeToRefs } from 'pinia'
    import { useI18n } from 'vue-i18n'
    import { url } from '@/helpers/api'

    const { locale } = useI18n()

    const showBox = ref(false)
    const centerStore = useCenterStore()
    const { centers } = storeToRefs(centerStore)

    onMounted(() => {
        centerStore.getAllCenters()
    })
</script>

<template>
    <div class="search">
        <!-- <poster
            :poster="{
                title: data.title || '',
                info: data?.description || '',
                img: data?.img?.at(0)?.response,
                alt: true
            }"
        /> -->
        <div class="placeholder"></div>
        <div class="filter">
            <div class="container">
                <div class="filter__title">Поиск центра транспортной логистики</div>

                <div class="filter__box">
                    <div class="filter__head">
                        <div class="filter__search">
                            <img src="@/assets/logo/search.svg">

                            <input type="text" placeholder="Названия центра транспортной логистики">

                            <button>Поиск</button>
                        </div>
                    </div>

                    <div :class="showBox ? 'filter__body show' : 'filter__body'">
                        <el-form :label-position="'top'">
                            <el-row :gutter="30" class="filter__row">
                                <el-col :span="12" class="filter__col">
                                    <el-form-item label="Область">
                                        <el-select placeholder="Выберите область" size="large">
                                            <el-option label="Zone one" value="shanghai" />
                                            <el-option label="Zone two" value="beijing" />
                                        </el-select>
                                    </el-form-item>

                                    <el-row :gutter="20">
                                        <el-col :span="12">
                                            <el-form-item label="Тип">
                                                <el-select placeholder="Выберите" size="large">
                                                    <el-option label="Zone one" value="shanghai" />
                                                    <el-option label="Zone two" value="beijing" />
                                                </el-select>
                                            </el-form-item>
                                        </el-col>
                                        <el-col :span="12">
                                            <el-form-item label="Тип склада">
                                                <el-select placeholder="Выберите" size="large">
                                                    <el-option label="Zone one" value="shanghai" />
                                                    <el-option label="Zone two" value="beijing" />
                                                </el-select>
                                            </el-form-item>
                                        </el-col>
                                    </el-row>

                                    <el-row :gutter="30">
                                        <el-col :span="12">
                                            <el-form-item label="Транспортная связь">
                                                <el-select placeholder="Выберите" size="large">
                                                    <el-option label="Zone one" value="shanghai" />
                                                    <el-option label="Zone two" value="beijing" />
                                                </el-select>
                                            </el-form-item>
                                        </el-col>
                                        <el-col></el-col>
                                    </el-row>
                                </el-col>

                                <el-col :span="12" class="filter__col">
                                    <el-form-item label="Район/город">
                                        <el-select placeholder="Выберите район" size="large">
                                            <el-option label="Zone one" value="shanghai" />
                                            <el-option label="Zone two" value="beijing" />
                                        </el-select>
                                    </el-form-item>

                                    <!-- <el-row :gutter="30">
                                        <el-col :span="12"> -->
                                            <el-row :gutter="20">
                                                <el-col :span="12">
                                                    <el-form-item label="Транспортная связь">
                                                        <el-select placeholder="Выберите" size="large">
                                                            <el-option label="Zone one" value="shanghai" />
                                                            <el-option label="Zone two" value="beijing" />
                                                        </el-select>
                                                    </el-form-item>
                                                </el-col>

                                                <el-col :span="12">
                                                    <el-row :gutter="20">
                                                        <el-col :span="12">
                                                            <el-form-item label="Площадь (от)">
                                                                <el-input size="large" />
                                                            </el-form-item>
                                                        </el-col>
                                                        <el-col :span="12">
                                                            <el-form-item label="Площадь (до)">
                                                                <el-input size="large" />
                                                            </el-form-item>
                                                        </el-col>
                                                    </el-row>
                                                </el-col>
                                            </el-row>
                                            
                                        <!-- </el-col>
                                    </el-row> -->
                                </el-col>
                            </el-row>
                        </el-form>
                    </div>
                </div>

                <button class="filter__show" @click="showBox = !showBox">
                    Расширенный поиск
                </button>
            </div>
        </div>
        <div class="list">
            <div class="container">
                <div class="filter__title">
                    По заданным Вами параметрам найдены следующие центры транспортной логистики
                </div>

                <ul class="list__grid">
                    <li class="item" v-for="item of centers" :key="item">
                        <router-link :to="`/logi/${item?._id}`" class="item__box">
                            <div class="item__top">
                                <img :src="url+'/'+item?.img[0]?.response" alt="Item image" class="item__img">

                                <div class="item__title">
                                    {{ 
                                        item?.translates?.find((item) => item?.language == locale)?.title||
                                        item?.translates?.find((item) => item?.language == 'ru')?.title ||
                                        '' 
                                    }}
                                </div>
                            </div>

                            <div class="item__mid">
                                <div class="item__rating">{{ item?.rating }} балл </div>

                                <router-link to="/">Подробнее об оценке</router-link>
                            </div>

                            <div class="item__address">
                                {{ 
                                    item?.translates?.find((item) => item?.language == locale)?.address||
                                    item?.translates?.find((item) => item?.language == 'ru')?.address ||
                                    '' 
                                }}
                            </div>

                            <router-link :to="item?._id" class="item__more">Подробнее</router-link>
                        </router-link>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
    .placeholder {
        background-color: #2a37af;
        height: 300px;
    }

    .filter {
        padding: 40px 0px;

        &__title {
            font-size: 28px;
            font-weight: 700;
            text-align: center;
        }

        &__box {
            padding: 20px 30px;
            background-color: #F0F2F9;
            margin-top: 20px;
            border-radius: 22px;
        }

        &__search {
            display: flex;
            gap: 20px;
            padding-bottom: 10px;
            border-bottom: 1px solid #CBCBCB;

            img {
                width: 30px;
            }

            input {
                flex: 1;
                font-size: 24px;
                background: 0;
                outline: 0;
            }

            button {
                font-size: 24px;
                background-color: #FD9000;
                color: #fff;
                padding: 10px 60px;
                text-align: center;
                border-radius: 15px;
            }
        }

        &__body {
            max-height: 0em;
            overflow: hidden;
            // transition: .3s linear;
            &.show{
                padding: 10px 0px;
                max-height: 75em;
            }
        }

        &__show{
            color: #FD9000;
            font-size: 18px;
            margin-top: 20px;
        }

        @media (max-width: 600px) {
            &__search{
                img{
                    display: none;
                }
                input{
                    font-size: 16px;
                }
                button{
                    padding: 5px 10px;
                    height: 40px;
                    font-size: 16px;
                }
            }
            &__row{
                flex-direction: column;
            }
            &__col{
                max-width: 100%;
            }
        }
    }

    .list{
        padding: 0px 0px 40px;
        &__grid{
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 20px;
            padding: 40px 20px;
            margin: -20px;
            .item{
                &__box{
                    box-shadow: 4px 8px 18.8px 0px #0000001A;
                    display: flex;
                    flex-direction: column;
                    gap: 10px;
                    padding: 30px 20px 20px;
                    border-radius: 20px;
                    transition: .3s linear;
                    height: 100%;
                    &:hover{
                        box-shadow: none;
                    }
                }
                &__top{
                    display: flex;
                    align-items: center;
                    gap: 10px;
                }
                &__img{
                    max-width: 110px;
                }
                &__title{
                    font-size: 24px;
                    font-weight: 600;
                }
                &__mid{
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    a{
                        color: #FD9000;
                        font-size: 14px;
                    }
                }
                &__rating{
                    font-weight: 600;
                }
                &__more{
                    font-size: 20px;
                    color: #FD9000;
                }
            }
        }
        @media (max-width: 600px) {
            &__grid{
                grid-template-columns: 1fr;
                padding: 30px 10px;
                margin: -10px;
            }
        }
    }
</style>