<template>
<div class="boatsDefaultFilter" data-aos="fade-down" data-aos-delay="800" >
    <el-button icon="icon icon-ship" :class="{active: activeBtn === 'btn1'}" @click="currentFilter(50), activeBtn='btn1'">до 50 чел.</el-button>
    <el-button icon="icon icon-ship" :class="{active: activeBtn === 'btn2'}" @click="currentFilter(120), activeBtn='btn2'">до 120 чел.</el-button>
    
    <!--
    <el-button icon="icon icon-ship" :class="{active: activeBtn === 'btn3'}" @click="currentFilter(200), activeBtn='btn3'">до 200 чел.</el-button>
    <el-select v-model="selectedService" placeholder="Выберите услугу" class="el-select-list">
        <el-option
            @click.native="toggleShips"
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
        />
    </el-select>
    -->
</div>

</template>

<script>
export default {
    name: 'boats-default-filter',
    data:() => ({
        selectedService: '',
        activeBtn: '',
        options: [
			{
				value: 'Свадьба на теплоходе',
				label: 'Свадьба на теплоходе'
			}, 
			{
				value: 'Retro party',
				label: 'Retro party'
			}, 
			{
				value: 'В гостях у сказки',
				label: 'В гостях у сказки'
			}, 
			{
				value: 'Организация Вашего праздника',
				label: 'Организация Вашего праздника'
			}, 
			{
				value: 'Кейтеринг',
				label: 'Кейтеринг'
			}
		],
    }),
    methods: {
        currentFilter(quantity) {
            this.$emit('onFilterBtnClick', quantity)
        },
		toggleShips() {
            this.$emit('onSelectFilterClick', this.selectedService)
		},
    }
}
</script>

<style lang="less">
@import "../../less/variables";

.boatsDefaultFilter {
    padding-top: 35px;
    padding-left: 10px;
    padding-right: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-flow: wrap;
    padding-bottom: 20px;
    width: auto;
    margin: 0 -10px;

    .el-button {
        min-width: 190px;
        padding-left: 60px;
        margin: 0 20px 20px;
        width: 100%;
        font-weight: normal;
        text-align: left;

        .up(@sm;{
            margin: 0 10px 20px;
            width: calc(50% - 20px);
        });

        .up(@lg;{
            width: auto;
            padding-left: 50px;
            text-align: center;
        });
    }

    .el-select {
        margin: 0 20px 20px;
        width: 100%;

        .up(@sm;{
            margin: 0 10px 20px;
            width: calc(50% - 20px);
        });

        .up(@lg;{
            width: auto;
        });
    }

    .up(@sm;{
        padding-bottom: 50px;
        padding-top: 75px;
        width: auto;
        margin: 0 -10px;
        padding-left: 60px;
        padding-right: 60px;
    });

    .up(@md;{
        margin: auto;
        max-width: 1000px;
    });
}

</style>