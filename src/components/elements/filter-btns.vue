<template>
<div class="filterBtns" v-if="type=='boats'">
	<el-button icon="icon icon-ship" :class="{active: isActive === 'btn1'}" @click="boatsShowed(50, 'btn1'), shipsFound()">до 50 чел.</el-button>
	<el-button icon="icon icon-ship" :class="{active: isActive === 'btn2'}" @click="boatsShowed(100, 'btn2'), shipsFound()">до 100 чел.</el-button>
	<el-button icon="icon icon-ship" :class="{active: isActive === 'btn3'}" @click="boatsShowed(200, 'btn3'), shipsFound()">до 200 чел.</el-button>
	<el-select v-model="value" placeholder="Выберите услугу" class="el-select-list">
		<el-option
			@click.native="shipsFound"
			v-for="item in options"
			:key="item.value"
			:label="item.label"
			:value="item.value"
		/>
	</el-select>
</div>

<div v-else-if="type=='voyage'" class="filterBtns">
	<div class="filterBtns__group">
		<el-select v-model="valueDate" :placeholder="date[0].label" class="el-select-date">
			<el-option
				@click.native="$emit('onDateOptionClick')"
				v-for="(item, index) in date"
				:key="item.index"
				:label="item"
				:value="index"
			/>
		</el-select>
	</div>
	<div class="filterBtns__group">
		<el-select v-model="valueTime" :placeholder="time[0].label" class="el-select-time">
			<el-option
				@click.native="$emit('onTimeOptionClick')"
				v-for="(item, index) in time"
				:key="index"
				:label="item"
				:value="index"
			/>
		</el-select>
	</div>
</div>

<div v-else-if="type=='tariffs'" class="filterBtns">
	<el-select v-model="valueMonth" class="el-select-date">
		<el-option
			v-for="(item, index) in filterData.months"
			:key="index"
			:label="item"
			:value="index"
		/>
	</el-select>
	<el-select v-model="valueDay" class="el-select-date">
		<el-option
			v-for="(item, index) in filterData.days"
			:key="index"
			:label="item"
			:value="index"
		/>
	</el-select>
	<el-select v-model="valueTime" class="el-select-time">
		<el-option
			v-for="(item, index) in filterData.time"
			:key="index"
			:label="item"
			:value="index"
		/>
	</el-select>
</div>
</template>

<script>
export default {
	name: 'filter-btns',
	components: {},
	props: [
		"type",
		"date",
		"time",
		"filterData"
	],
	data: () => ({
		isActive: '',
        options: [
			{
				value: 'Option1',
				label: 'Свадьба на теплоходе '
			}, 
			{
				value: 'Option2',
				label: 'Retro party'
			}, 
			{
				value: 'Option3',
				label: 'В гостях у сказки'
			}, 
			{
				value: 'Option4',
				label: 'Организация Вашего праздника'
			}, 
			{
				value: 'Option5',
				label: 'Кейтеринг'
			}
		],
        value: '',
        valueMonth: 'Сезон',
        valueDay:   'День',
        valueDate:  'Дата',
        valueTime:  'Время',
	}),
	methods: {
		boatsShowed(count, btn) {
			this.isActive = btn;
			this.$emit("filterBtnClick", count);
		},

		shipsFound() {
			if (document.documentElement.clientWidth < 768) {
				this.$message({
					message: 'Найдено 5 теплоходов',
					type: 'success',
				});
			} 
		}
	}
}
</script>

<style lang="less">
@import "../../less/variables";

.filterBtns {
	display: flex;
	justify-content: center;
	align-items: center;
	flex-flow: wrap;
	padding-bottom: 20px;
	width: auto;
	margin: 0 -10px;

	&-small {
		padding-bottom: 40px;
		
		.filterBtns__group {
			.el-select {
				.up(@sm;{
					margin: 0 10px 20px;
				});

				.up(@md;{
					width: 400px !important;
					flex: none;
				});
			}
			.up(@sm;{
				//width: 430px;
				padding: 0;
			});

			.up(@md;{    
				width: auto;
    			flex: none;
			});
		}

		.up(@sm;{
			padding-bottom: 80px;
			width: 860px;
		});
	}

	.sectionTitle {
		width: 100%;
	}

	.el-container {
		flex-flow: wrap;
		justify-content: center;
		
		.up(@sm;{
			padding: 0 10px;
			padding: 0 80px;
		});
	}

	&__group {
		display: flex;
		flex-flow: column;
		justify-content: center;
		align-items: center;
		width: 100%;
		box-sizing: border-box;

		flex: 1 0 250px;
		padding: 0 10px;

		&-name {
			text-align: center;
			padding: 20px 0 30px;

			.up(@sm;{
				padding-top: 0;
			});
		}

		.el-select {
			margin: 0 0 20px;
		}

		&:first-of-type {
			.filterBtns__group-name {
				padding-top: 0;
			}
		}

		&:nth-child(odd) {
			//padding-left: 0;

			.up(@md;{
				//width: auto;
				//padding: 0;
			});
		}

		&:nth-child(even) {
			//padding-right: 0;

			.up(@md;{
				//width: auto;
				//padding: 0;
			});
		}

		.up(@sm;{
			width: 50%;
			padding: 0 10px;
		});

		.up(@md;{
		});
	}

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
	
	.filterBtns__group {
		.el-select {
			.up(@sm;{
				width: 100%;
			});

			.up(@md;{
				//width: 400px;
			});
		}
	}

	&.filterBtns-small {
		width: 100%;
	}

	.up(@sm;{
		padding-bottom: 50px;
		//margin: 0 auto;
    	//width: 100%;
	});

	.up(@md;{
		margin: auto;
		width: 860px;
	});
}
</style>