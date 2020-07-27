<template>
<div class="tariffsFilter">
	<el-select v-model="filter.season" :placeholder="filter.season || 'Любой месяц'" class="el-select-date" data-aos="fade-down" data-aos-delay="900">
        <el-option
			:key="'Любой месяц'"
			:label="'Любой месяц'"
			:value="''"
		/>
		<el-option
			v-for="(item, index) in seasons"
			:key="index"
			:label="item"
			:value="item"
		/>
	</el-select>
	<el-select v-model="filter.days" :placeholder="filter.days || 'Любой день'" class="el-select-date" data-aos="fade-down" data-aos-delay="900">
		 <el-option
			:key="'Любой день'"
			:label="'Любой день'"
			:value="''"
		/>
        <el-option
			v-for="(item, index) in days"
			:key="index"
			:label="item"
			:value="item"
		/>
	</el-select>
	<el-select v-model="filter.times" :placeholder="filter.times || 'Любое время'" class="el-select-time"  data-aos="fade-down" data-aos-delay="900">
		 <el-option
			:key="'Любое время'"
			:label="'Любое время'"
			:value="''"
		/>
        <el-option
			v-for="(item, index) in times" 
			:key="index"
			:label="item"
			:value="item"
		/>
	</el-select>
</div>
</template>

<script>
export default {
    name: 'tariffs-filter',
    props: [
        'data'
    ],
    data: () => ({
        valueMonth: '',
        valueDay: '',
        valueTime: '',
    }),
    computed: {
        filter() {
            return this.$store.state.tariffsFilter;
        },
        seasons() {
            return this.uniqItemsByKey();
        },
        days() {
            return this.uniqItemsByKey('DAYS');
        },
        times() {
            return this.uniqItemsByKey('TIME', false);
        },
    },

    methods: {
        uniqItems(items) {
            const uniq = items.reduce((uniq, item) => {
                Object.values(item).forEach(val => {
                    uniq.add(val);
                });
                return uniq;
            }, new Set());
            return [...uniq];
        },

        itemsByKey(key = 'SEASON') {
            return this.data.filter(el => {
                return el[key];
            }).map(el=>{
                return el[key];
            });
        },

        uniqItemsByKey(key = 'SEASON', sort = true) {
            const res = this.uniqItems(this.itemsByKey(key));
            if (sort) {
                const compare = {
                    SEASON: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
                    DAYS: ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'],
                }

                res.sort((a, b) => {
                    const compareArr = compare[key];
                    return compareArr.indexOf(a) - compareArr.indexOf(b);
                })
            }
            return res;
        }
    },
    mounted() {
        // this.filter.season = this.seasons[0];
        // this.filter.days = this.days[0];
        // this.filter.times = this.times[0];
    }
}
</script>

<style lang="less">
@import "../../less/variables";

.tariffsFilter {
	display: flex;
    justify-content: flex-start;
	align-items: center;
	flex-flow: wrap;
	width: auto;
    padding-top: 40px;
    padding-left: 0;
    padding-right: 0;
    justify-content: flex-start;

    &[data-aos].aos-animate {
        //transition-delay: 1.6s;
    }
    
	.el-select {
		margin: 0 20px 20px;
        width: 100%;
        
        &-day {
            .up(@sm;{
                max-width: 300px;
                min-width: auto;
            });
        }
        
        &-time {
            .up(@sm;{
                //max-width: 250px;
                //min-width: auto;
            });
        }

		.up(@sm;{
			margin: 0 10px 20px;
			width: calc(50% - 20px);
        });
        
        .up(@lg;{
            min-width: auto;

            &:nth-child(1) {
                width: 380px;
            }

            &:nth-child(2) {
                width: 280px;
            }

            &:nth-child(3) {
                width: 240px;
            }
        });
	}

	.up(@sm;{
		padding-bottom: 30px;
        padding-top: 75px;
        padding-left: 70px;
        padding-right: 70px;
		//margin: 0 auto;
    	//width: 100%;
	});

	.up(@md;{
		margin: auto;
		max-width: 970px;
    });
    
    .up(@lg;{
        justify-content: center;
    });
}
</style>