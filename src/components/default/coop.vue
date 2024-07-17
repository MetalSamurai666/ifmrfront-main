<script setup> 
</script>

<template>
    <div class="coop">
        <div class="container">
            <div class="coop__box">
                <div class="coop__title">
                    Сотрудничество и партнерство
                </div>

                <div class="coop__text">
                    Мы активно взаимодействуем с научно-исследовательскими учреждениями, органами государственного и хозяйственного управления, а также другими организациями в целях обмена опытом и координации действий. Наша цель – создать благоприятные условия для развития транспортной и логистической отрасли в Узбекистане и способствовать повышению качества жизни граждан.
                </div>

                <router-link to="/" class="coop__link">
                    Контакты
                    <img src="@/assets/img/icons/link.svg">
                </router-link>
                
                <img src="@/assets/img/photos/coop.png" class="coop__img">
            </div>
        </div>
    </div>
</template>

<!-- <3 -->

<style lang="scss" scoped>
    .coop{
        background: rgb(45,55,153);
        background: linear-gradient(135deg, rgba(45,55,153,1) 0%, rgba(0,89,194,1) 100%);
        overflow: hidden;
        &__box{
            padding: 75px 0px;
            position: relative;
            color: #fff;
        }
        &__title{
            max-width: 50%;
            font-weight: 700;
            font-size: 48px;
            line-height: 100%;
        }
        &__text{
            max-width: 50%;
            font-family: 'Montserrat';
            line-height: 140%;
            margin: 30px 0px;
        }
        &__link{
            font-weight: 700;
            font-size: 20px;
            text-transform: uppercase;
            color: #fff;
            display: flex;
            align-items: center;
            gap: 10px;
            width: fit-content;
            position: relative;
            &::after{
                content: '';
                position: absolute;
                left: 0;
                bottom: -3px;
                height: 1px;
                width: 100%;
                background: #fff;
            }
            img{
                width: 24px;
                filter: invert(1);
            }
        }
        &__img{
            position: absolute;
            right: -150px;
            top: 0;
            height: 100%;
        }

        @media (max-width: 600px) {
            &__box{
                padding: 40px 0px;
            }
            &__title{
                font-size: 30px;
                max-width: 100%;
            }
            &__text{
                max-width: 100%;
            }
            &__img{
                display: none;
            }
        }
    }
</style>