<template>
<section class="collapseWrap" >
	<el-collapse accordion class="el-container">
		<el-col :span="24" :lg="{span: 12}">
			<div
				v-for="(item, index) in chunkArray('left')" 
				data-aos="fade-down"
				data-aos-anchor=".collapseWrap"
				:data-aos-delay="(index+1)*150+itemsDelay"
				:key="index" 
			>
				<collapse-item  
					:data="item"
					:index="index"  
				/>
			</div>
		</el-col>
		<el-col :span="24" :lg="{span: 12}">
			<div
				v-for="(item, index) in chunkArray('right')"
				data-aos="fade-down"
				data-aos-anchor=".collapseWrap"
				:data-aos-delay="(index+1)*150+itemsDelay"
				:key="index+120"
			>
				<collapse-item 
					:data="item"
					:index="index+120"  
				/>
			</div>
		</el-col>
	</el-collapse>
</section>
</template>

<script>
import collapseItem from './collapse-item';

export default {
	name: 'collapse-wrap',
	components: {
		collapseItem,
	},
	props: {
		itemsDelay: {
			type: Number,
			default: 0,
		},
		data: Array,
	},
	data: () => ({
		newArray: [],
		items: [
			{
				title: 'Хотим устроить свадьбу. Что вы можете предложить?',
				text: 'Ночная, дневная или специальная детская экскурсии, корпоративы, дни рождения или торжественное бракосочетание — все это под силу нашим талантливым и опытным организаторам. Весь перечень предлагаемых программ можно найти в левой части сайта. Кликнув на нужном разделе, вы узнаете подробную информацию о предложениях и ценах.',
			},
			{
				title: 'Какие услуги можно заказать?',
				text: 'Ночная, дневная или специальная детская экскурсии, корпоративы, дни рождения или торжественное бракосочетание — все это под силу нашим талантливым и опытным организаторам. Весь перечень предлагаемых программ можно найти в левой части сайта. Кликнув на нужном разделе, вы узнаете подробную информацию о предложениях и ценах.',
			},
			{
				title: 'Обязательно ли заказывать у вас банкет?',
				text: 'Ночная, дневная или специальная детская экскурсии, корпоративы, дни рождения или торжественное бракосочетание — все это под силу нашим талантливым и опытным организаторам. Весь перечень предлагаемых программ можно найти в левой части сайта. Кликнув на нужном разделе, вы узнаете подробную информацию о предложениях и ценах.',
			},
			{
				title: 'Какие судна есть в вашем распоряжении?',
				text: 'Ночная, дневная или специальная детская экскурсии, корпоративы, дни рождения или торжественное бракосочетание — все это под силу нашим талантливым и опытным организаторам. Весь перечень предлагаемых программ можно найти в левой части сайта. Кликнув на нужном разделе, вы узнаете подробную информацию о предложениях и ценах.',
			},
			{
				title: 'А вдруг фото/обещания менеджеров будут отличаться от реальности?',
				text: 'Ночная, дневная или специальная детская экскурсии, корпоративы, дни рождения или торжественное бракосочетание — все это под силу нашим талантливым и опытным организаторам. Весь перечень предлагаемых программ можно найти в левой части сайта. Кликнув на нужном разделе, вы узнаете подробную информацию о предложениях и ценах.',
			},
			{
				title: 'Как арендовать прогулочный теплоход?',
				text: 'Ночная, дневная или специальная детская экскурсии, корпоративы, дни рождения или торжественное бракосочетание — все это под силу нашим талантливым и опытным организаторам. Весь перечень предлагаемых программ можно найти в левой части сайта. Кликнув на нужном разделе, вы узнаете подробную информацию о предложениях и ценах.',
			},
			{
				title: 'Какие услуги можно заказать?',
				text: 'Ночная, дневная или специальная детская экскурсии, корпоративы, дни рождения или торжественное бракосочетание — все это под силу нашим талантливым и опытным организаторам. Весь перечень предлагаемых программ можно найти в левой части сайта. Кликнув на нужном разделе, вы узнаете подробную информацию о предложениях и ценах.',
			},


			{
				title: 'Какие услуги можно заказать?',
				text: 'Ночная, дневная или специальная детская экскурсии, корпоративы, дни рождения или торжественное бракосочетание — все это под силу нашим талантливым и опытным организаторам. Весь перечень предлагаемых программ можно найти в левой части сайта. Кликнув на нужном разделе, вы узнаете подробную информацию о предложениях и ценах.',
			},
			{
				title: 'Какие услуги можно заказать?',
				text: 'Ночная, дневная или специальная детская экскурсии, корпоративы, дни рождения или торжественное бракосочетание — все это под силу нашим талантливым и опытным организаторам. Весь перечень предлагаемых программ можно найти в левой части сайта. Кликнув на нужном разделе, вы узнаете подробную информацию о предложениях и ценах.',
			},
			{
				title: 'Какие услуги можно заказать?',
				text: 'Ночная, дневная или специальная детская экскурсии, корпоративы, дни рождения или торжественное бракосочетание — все это под силу нашим талантливым и опытным организаторам. Весь перечень предлагаемых программ можно найти в левой части сайта. Кликнув на нужном разделе, вы узнаете подробную информацию о предложениях и ценах.',
			},
			{
				title: 'Какие услуги можно заказать?',
				text: 'Ночная, дневная или специальная детская экскурсии, корпоративы, дни рождения или торжественное бракосочетание — все это под силу нашим талантливым и опытным организаторам. Весь перечень предлагаемых программ можно найти в левой части сайта. Кликнув на нужном разделе, вы узнаете подробную информацию о предложениях и ценах.',
			},
			{
				title: 'Какие услуги можно заказать?',
				text: 'Ночная, дневная или специальная детская экскурсии, корпоративы, дни рождения или торжественное бракосочетание — все это под силу нашим талантливым и опытным организаторам. Весь перечень предлагаемых программ можно найти в левой части сайта. Кликнув на нужном разделе, вы узнаете подробную информацию о предложениях и ценах.',
			},
			{
				title: 'Какие услуги можно заказать?',
				text: 'Ночная, дневная или специальная детская экскурсии, корпоративы, дни рождения или торжественное бракосочетание — все это под силу нашим талантливым и опытным организаторам. Весь перечень предлагаемых программ можно найти в левой части сайта. Кликнув на нужном разделе, вы узнаете подробную информацию о предложениях и ценах.',
			},
		],
	}),
	methods: {
		chunkArray(a) {
			if (a) {
				let newArray = this.data;
				let half_length = Math.ceil(newArray.length / 2);
				let leftSide = newArray.slice(0,half_length);
				let rightSide = newArray.slice(half_length, this.data.length);

				if (a === 'left') {
					return leftSide;
				} else {
					return rightSide;
				}
			}
		}
	},
	mounted() {
		//chunkArray(a);
	},
}
</script>

<style lang="less">
@import "../../less/variables";

.collapseWrap {
	.el {

		&-container {
			//display: block;
			flex-flow: wrap;
			
			.up(@sm;{
				padding: 0 80px;
			});
		}

		&-collapse {
			padding: 40px 20px;
			border: none;

			.up(@sm; {
				padding: 80px 40px;
			});
		}
	}
}
</style>