<script setup>
</script>

<template>
    <div class="structure">
        <div class="container">
            <div class="structure__box">
                <div class="structure__title">Организационная Структура</div>

                <div class="card main">
                    <img src="@/assets/img/icons/user.svg" class="card__logo">

                    <div class="card__title">Директор</div>
                </div>

                <ul class="structure__list">
                    <li class="card">
                        <img src="@/assets/img/icons/user-w.svg" class="card__logo">

                        <div class="card__title">Заместитель директора</div>
                    </li>
                    <li class="card">
                        <img src="@/assets/img/icons/line.svg" class="card__logo">

                        <div class="card__title">Отдел изучения проблем развития транспорта и логистики</div>
                    </li>
                    <li class="card">
                        <img src="@/assets/img/icons/plane.svg" class="card__logo">

                        <div class="card__title">Отдел изучения проблем международных транспортных коридоров и транзита</div>
                    </li>
                    <li class="card">
                        <img src="@/assets/img/icons/calc.svg" class="card__logo">

                        <div class="card__title">Главный бухгалтер</div>
                    </li>
                    <li class="card">
                        <img src="@/assets/img/icons/leaf.svg" class="card__logo">

                        <div class="card__title">Отдел изучения проблем безопасности и экологии на транспорте</div>
                    </li>
                    <li class="card">
                        <img src="@/assets/img/icons/building.svg" class="card__logo">

                        <div class="card__title">Главный юристконсульт</div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .structure{
        background-image: url('@/assets/img/photos/struct.png');
        &__box{
            padding: 75px 0px;
            display: flex;
            flex-direction: column;
            align-items: center;
        }
        &__title{
            font-size: 64px;
            font-weight: 700;
            text-align: center;
            color: #fff;
        }
        .card{
            padding: 25px;
            display: flex;
            flex-direction: column;
            gap: 10px;
            align-items: center;
            background-color: $blue;
            color: #fff;
            position: relative;
            &::after{
                content: '';
                position: absolute;
                top: 0;
                bottom: 0;
                left: 100%;
                margin: auto;
                width: 50px;
                height: 2px;
                background: #ccc;
            }
            &__title{
                font-family: 'Roboto Slab';
                font-size: 24px;
                text-align: center;
            }
            &:nth-child(even){
                &::after{
                    left: unset;
                    right: 100%;
                }
            }
            &.main{
                margin: 50px 0px;
                background-color: #204B77;
                padding: 25px 40px;
                &::after{
                    // display: none;
                    left: 0;
                    right: 0;
                    top: 100%;
                    bottom: unset;
                    width: 2px;
                    height: 1px;
                }
            }
        }
        &__list{
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 15px 95px;
            padding: 0px 175px;
        }
    }
</style>