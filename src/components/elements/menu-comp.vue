<template>
<div class="menu" ref="menu">
	<transition name="form-anim" mode="out-in">
		<div key="links" class="menuLinks" v-if="!headerForm">
			<el-row tag="ul" class="form-anim">
				<el-col :span="12" :sm="{span: 12}" :lg="{span: 8}" class="menu__item">
					<router-link :to="{name: 'excursions'}" @click.native="onItemClick">Экскурсии</router-link>
				</el-col>
				<el-col :span="12" :sm="{span: 12}" :lg="{span: 8}" class="menu__item">
					<router-link :to="{name: 'ships-list'}" @click.native="onItemClick">Теплоходы</router-link>
				</el-col>
				<el-col :span="12" :sm="{span: 12}" :lg="{span: 8}" class="menu__item">
					<router-link :to="{name: 'services'}" @click.native="onItemClick">Услуги</router-link>
				</el-col>
				<el-col :span="12" :sm="{span: 12}" :lg="{span: 8}" class="menu__item">
					<router-link :to="{name: 'tariffs'}" @click.native="onItemClick">Тарифы</router-link>
				</el-col>
				<el-col :span="12" :sm="{span: 12}" :lg="{span: 8}" class="menu__item">
					<router-link :to="{name: 'feedback'}" @click.native="onItemClick">Отзывы</router-link>
				</el-col>
				<el-col :span="12" :sm="{span: 12}" :lg="{span: 8}" class="menu__item">
					<router-link :to="{name: 'faq'}" @click.native="onItemClick">Вопрос-ответ</router-link>
				</el-col>
				<el-col :span="12" :sm="{span: 12}" :lg="{span: 8}" class="menu__item">
					<router-link :to="{name: 'gallery'}" @click.native="onItemClick">Фотогалерея</router-link>
				</el-col>
				<el-col :span="12" :sm="{span: 12}" :lg="{span: 8}" class="menu__item">
					<router-link :to="{name: 'news'}" @click.native="onItemClick">Новости</router-link>
				</el-col>
				<el-col :span="12" :sm="{span: 12}" :lg="{span: 8}" class="menu__item">
					<router-link :to="{name: 'articles'}" @click.native="onItemClick">Статьи</router-link>
				</el-col>
				<el-col :span="12" :sm="{span: 24}" :lg="{span: 24}" class="menu__item hidden-md-and-down">
					<el-row justify="center" style="min-width: 800px;">
							<el-col :span="12" :sm="{span: 12}" :lg="{span: 12}" class="menu__item">
								<router-link :to="{name: 'about'}" @click.native="onItemClick">О компании</router-link>
							</el-col>
							<el-col :span="12" :sm="{span: 12}" :lg="{span: 12}" class="menu__item">
								<router-link :to="{name: 'contacts'}" @click.native="onItemClick">Контакты</router-link>
							</el-col>
					</el-row>
				</el-col>

				<el-col :span="12" :sm="{span: 12}" :lg="{span: 12}" class="menu__item hidden-lg-and-up">
					<router-link :to="{name: 'about'}" @click.native="onItemClick">О компании</router-link>
				</el-col>
				<el-col :span="12" :sm="{span: 12}" :lg="{span: 12}" class="menu__item hidden-lg-and-up">
					<router-link :to="{name: 'contacts'}" @click.native="onItemClick">Контакты</router-link>
				</el-col>
				<!-- <el-col :span="12" :sm="{span: 12}" :lg="{span: 8}" class="menu__item">
					<router-link :to="{name: 'contacts'}" @click.native="onItemClick" style="visibility: hidden">Контакты</router-link>
				</el-col> -->
				<div class="contact">
				 <div class="contact__phone-wrap">
					 	<a class="header__item-phone" href="tel:+78124496480">+7 812 449-64-80</a>
          <a
            class="header__item-phone"
            href="tel:+79219312565"
            style="margin-left: 15px"
            >+7 921 931-25-65</a
          >
				 </div>
					<h4 class="visible" @click="onPhoneClick"><a href="javascript:void(0);">Перезвонить?</a></h4>
				</div>
				<div class="social"><icon-list  v-if="!headerForm" /></div>
			</el-row>
		</div>

		<el-row key="form" class="formOpened form-anim" v-else>
			<header-form @onFormSent="$emit('onFormSent')" />
		</el-row>
	</transition>
	<div class="waves">
		<svg width="2180" height="377" viewBox="0 0 2180 377" fill="none" xmlns="http://www.w3.org/2000/svg">
			<g clip-path="url(#clip0)">
			<g opacity="0.9">
			<path opacity="0.9" d="M58.59 54.62C76.3 71 96.74 88.75 136.21 88.75C175.68 88.75 196.21 71 213.91 54.62C230.26 39.62 243.91 27.31 272.5 27.31C301.09 27.31 314.74 39.6 331.09 54.62C348.8 71 369.21 88.75 408.75 88.75C448.29 88.75 468.7 71 486.41 54.62C502.76 39.62 516.41 27.31 545 27.31C573.59 27.31 587.21 39.6 603.59 54.62C621.3 71 641.74 88.75 681.21 88.75C720.68 88.75 741.21 71 758.91 54.62C775.26 39.62 788.91 27.31 817.5 27.31C846.09 27.31 859.74 39.6 876.09 54.62C893.8 71 914.21 88.75 953.75 88.75C993.29 88.75 1013.75 71 1031.41 54.62C1047.76 39.62 1061.41 27.31 1090 27.31V0C1050.49 0 1030 17.75 1012.34 34.14C995.99 49.14 982.34 61.44 953.75 61.44C925.16 61.44 911.51 49.15 895.21 34.14C877.45 17.75 857.01 0 817.5 0C777.99 0 757.55 17.75 739.84 34.14C723.49 49.14 709.84 61.44 681.25 61.44C652.66 61.44 639.01 49.15 622.66 34.14C604.95 17.75 584.51 0 545 0C505.49 0 485.05 17.75 467.34 34.14C450.99 49.14 437.34 61.44 408.75 61.44C380.16 61.44 366.51 49.15 350.21 34.14C332.45 17.75 312.01 0 272.5 0C232.99 0 212.5 17.75 194.84 34.14C178.49 49.14 164.84 61.44 136.25 61.44C107.66 61.44 94.01 49.15 77.66 34.14C59.95 17.75 39.51 0 0 0V27.31C28.61 27.31 42.21 39.6 58.59 54.62Z" fill="#0066FF"/>
			<path opacity="0.9" d="M1012.34 177.88C995.99 192.88 982.34 205.19 953.75 205.19C925.16 205.19 911.51 192.9 895.21 177.88C877.5 161.49 857.06 143.74 817.55 143.74C778.04 143.74 757.55 161.5 739.84 177.88C723.49 192.88 709.84 205.19 681.25 205.19C652.66 205.19 639.01 192.9 622.66 177.88C604.95 161.49 584.51 143.74 545 143.74C505.49 143.74 485.05 161.5 467.34 177.88C450.99 192.88 437.34 205.19 408.75 205.19C380.16 205.19 366.51 192.9 350.21 177.88C332.5 161.49 312.06 143.74 272.55 143.74C233.04 143.74 212.55 161.49 194.89 177.88C178.54 192.88 164.89 205.19 136.3 205.19C107.71 205.19 94.01 192.9 77.66 177.88C59.95 161.5 39.51 143.74 0 143.74V171.05C28.61 171.05 42.24 183.34 58.59 198.36C76.3 214.74 96.74 232.5 136.21 232.5C175.68 232.5 196.21 214.75 213.87 198.37C230.22 183.37 243.87 171.06 272.46 171.06C301.05 171.06 314.7 183.35 331.05 198.37C348.8 214.74 369.21 232.5 408.75 232.5C448.29 232.5 468.7 214.75 486.41 198.37C502.76 183.37 516.41 171.06 545 171.06C573.59 171.06 587.24 183.35 603.59 198.37C621.3 214.74 641.74 232.5 681.21 232.5C720.68 232.5 741.21 214.75 758.87 198.37C775.22 183.37 788.87 171.06 817.46 171.06C846.05 171.06 859.7 183.35 876.05 198.37C893.8 214.74 914.21 232.5 953.75 232.5C993.29 232.5 1013.75 214.75 1031.41 198.37C1047.76 183.37 1061.41 171.06 1090 171.06V143.74C1050.49 143.74 1030.05 161.5 1012.34 177.88Z" fill="#0066FF"/>
			<path opacity="0.9" d="M1012.34 321.62C995.99 336.62 982.34 348.93 953.75 348.93C925.16 348.93 911.51 336.64 895.21 321.62C877.45 305.23 857.01 287.5 817.5 287.5C777.99 287.5 757.55 305.25 739.84 321.64C723.49 336.64 709.84 348.95 681.25 348.95C652.66 348.95 639.01 336.66 622.66 321.64C604.95 305.23 584.51 287.5 545 287.5C505.49 287.5 485.05 305.25 467.34 321.64C450.99 336.64 437.34 348.95 408.75 348.95C380.16 348.95 366.51 336.64 350.21 321.62C332.45 305.23 312.01 287.5 272.5 287.5C232.99 287.5 212.5 305.25 194.84 321.64C178.49 336.64 164.84 348.95 136.25 348.95C107.66 348.95 94.01 336.64 77.66 321.62C59.95 305.23 39.51 287.5 0 287.5V314.81C28.61 314.81 42.24 327.1 58.59 342.12C76.3 358.5 96.74 376.24 136.21 376.24C175.68 376.24 196.21 358.5 213.91 342.1C230.26 327.1 243.91 314.79 272.5 314.79C301.09 314.79 314.74 327.08 331.09 342.1C348.8 358.5 369.21 376.24 408.75 376.24C448.29 376.24 468.7 358.5 486.41 342.1C502.76 327.1 516.41 314.79 545 314.79C573.59 314.79 587.21 327.08 603.59 342.1C621.3 358.5 641.74 376.24 681.21 376.24C720.68 376.24 741.21 358.5 758.91 342.1C775.26 327.1 788.91 314.79 817.5 314.79C846.09 314.79 859.74 327.08 876.09 342.1C893.8 358.5 914.21 376.24 953.75 376.24C993.29 376.24 1013.75 358.49 1031.41 342.1C1047.76 327.1 1061.41 314.79 1090 314.79V287.5C1050.49 287.5 1030.05 305.23 1012.34 321.62Z" fill="#0066FF"/>
			</g>
			</g>
			<g clip-path="url(#clip1)">
			<g opacity="0.9">
			<path opacity="0.9" d="M1148.59 54.62C1166.3 71 1186.74 88.75 1226.21 88.75C1265.68 88.75 1286.21 71 1303.91 54.62C1320.26 39.62 1333.91 27.31 1362.5 27.31C1391.09 27.31 1404.74 39.6 1421.09 54.62C1438.8 71 1459.21 88.75 1498.75 88.75C1538.29 88.75 1558.7 71 1576.41 54.62C1592.76 39.62 1606.41 27.31 1635 27.31C1663.59 27.31 1677.21 39.6 1693.59 54.62C1711.3 71 1731.74 88.75 1771.21 88.75C1810.68 88.75 1831.21 71 1848.91 54.62C1865.26 39.62 1878.91 27.31 1907.5 27.31C1936.09 27.31 1949.74 39.6 1966.09 54.62C1983.8 71 2004.21 88.75 2043.75 88.75C2083.29 88.75 2103.75 71 2121.41 54.62C2137.76 39.62 2151.41 27.31 2180 27.31V0C2140.49 0 2120 17.75 2102.34 34.14C2085.99 49.14 2072.34 61.44 2043.75 61.44C2015.16 61.44 2001.51 49.15 1985.21 34.14C1967.45 17.75 1947.01 0 1907.5 0C1867.99 0 1847.55 17.75 1829.84 34.14C1813.49 49.14 1799.84 61.44 1771.25 61.44C1742.66 61.44 1729.01 49.15 1712.66 34.14C1694.95 17.75 1674.51 0 1635 0C1595.49 0 1575.05 17.75 1557.34 34.14C1540.99 49.14 1527.34 61.44 1498.75 61.44C1470.16 61.44 1456.51 49.15 1440.21 34.14C1422.45 17.75 1402.01 0 1362.5 0C1322.99 0 1302.5 17.75 1284.84 34.14C1268.49 49.14 1254.84 61.44 1226.25 61.44C1197.66 61.44 1184.01 49.15 1167.66 34.14C1149.95 17.75 1129.51 0 1090 0V27.31C1118.61 27.31 1132.21 39.6 1148.59 54.62Z" fill="#0066FF"/>
			<path opacity="0.9" d="M2102.34 177.88C2085.99 192.88 2072.34 205.19 2043.75 205.19C2015.16 205.19 2001.51 192.9 1985.21 177.88C1967.5 161.49 1947.06 143.74 1907.55 143.74C1868.04 143.74 1847.55 161.5 1829.84 177.88C1813.49 192.88 1799.84 205.19 1771.25 205.19C1742.66 205.19 1729.01 192.9 1712.66 177.88C1694.95 161.49 1674.51 143.74 1635 143.74C1595.49 143.74 1575.05 161.5 1557.34 177.88C1540.99 192.88 1527.34 205.19 1498.75 205.19C1470.16 205.19 1456.51 192.9 1440.21 177.88C1422.5 161.49 1402.06 143.74 1362.55 143.74C1323.04 143.74 1302.55 161.49 1284.89 177.88C1268.54 192.88 1254.89 205.19 1226.3 205.19C1197.71 205.19 1184.01 192.9 1167.66 177.88C1149.95 161.5 1129.51 143.74 1090 143.74V171.05C1118.61 171.05 1132.24 183.34 1148.59 198.36C1166.3 214.74 1186.74 232.5 1226.21 232.5C1265.68 232.5 1286.21 214.75 1303.87 198.37C1320.22 183.37 1333.87 171.06 1362.46 171.06C1391.05 171.06 1404.7 183.35 1421.05 198.37C1438.8 214.74 1459.21 232.5 1498.75 232.5C1538.29 232.5 1558.7 214.75 1576.41 198.37C1592.76 183.37 1606.41 171.06 1635 171.06C1663.59 171.06 1677.24 183.35 1693.59 198.37C1711.3 214.74 1731.74 232.5 1771.21 232.5C1810.68 232.5 1831.21 214.75 1848.87 198.37C1865.22 183.37 1878.87 171.06 1907.46 171.06C1936.05 171.06 1949.7 183.35 1966.05 198.37C1983.8 214.74 2004.21 232.5 2043.75 232.5C2083.29 232.5 2103.75 214.75 2121.41 198.37C2137.76 183.37 2151.41 171.06 2180 171.06V143.74C2140.49 143.74 2120.05 161.5 2102.34 177.88Z" fill="#0066FF"/>
			<path opacity="0.9" d="M2102.34 321.62C2085.99 336.62 2072.34 348.93 2043.75 348.93C2015.16 348.93 2001.51 336.64 1985.21 321.62C1967.45 305.23 1947.01 287.5 1907.5 287.5C1867.99 287.5 1847.55 305.25 1829.84 321.64C1813.49 336.64 1799.84 348.95 1771.25 348.95C1742.66 348.95 1729.01 336.66 1712.66 321.64C1694.95 305.23 1674.51 287.5 1635 287.5C1595.49 287.5 1575.05 305.25 1557.34 321.64C1540.99 336.64 1527.34 348.95 1498.75 348.95C1470.16 348.95 1456.51 336.64 1440.21 321.62C1422.45 305.23 1402.01 287.5 1362.5 287.5C1322.99 287.5 1302.5 305.25 1284.84 321.64C1268.49 336.64 1254.84 348.95 1226.25 348.95C1197.66 348.95 1184.01 336.64 1167.66 321.62C1149.95 305.23 1129.51 287.5 1090 287.5V314.81C1118.61 314.81 1132.24 327.1 1148.59 342.12C1166.3 358.5 1186.74 376.24 1226.21 376.24C1265.68 376.24 1286.21 358.5 1303.91 342.1C1320.26 327.1 1333.91 314.79 1362.5 314.79C1391.09 314.79 1404.74 327.08 1421.09 342.1C1438.8 358.5 1459.21 376.24 1498.75 376.24C1538.29 376.24 1558.7 358.5 1576.41 342.1C1592.76 327.1 1606.41 314.79 1635 314.79C1663.59 314.79 1677.21 327.08 1693.59 342.1C1711.3 358.5 1731.74 376.24 1771.21 376.24C1810.68 376.24 1831.21 358.5 1848.91 342.1C1865.26 327.1 1878.91 314.79 1907.5 314.79C1936.09 314.79 1949.74 327.08 1966.09 342.1C1983.8 358.5 2004.21 376.24 2043.75 376.24C2083.29 376.24 2103.75 358.49 2121.41 342.1C2137.76 327.1 2151.41 314.79 2180 314.79V287.5C2140.49 287.5 2120.05 305.23 2102.34 321.62Z" fill="#0066FF"/>
			</g>
			</g>
			<defs>
			<clipPath id="clip0">
			<rect width="1090" height="376.24" fill="white"/>
			</clipPath>
			<clipPath id="clip1">
			<rect x="1090" width="1090" height="376.24" fill="white"/>
			</clipPath>
			</defs>
		</svg>
	</div>
</div>
</template>

<script>
// import socialLinks from './social-links';
import IconList from "./social-icon-list";
import headerForm from './order-forms/header-form';

export default {
	name: 'menu-comp',	
	components: {
		IconList,
		headerForm
	},
	props: [
		'headerForm'
	],
    methods: {
        onItemClick() {
            this.$emit("itemClick");
		},
		
        onPhoneClick() {
            this.$emit("onPhoneClick");
        }
    },
}
</script>

<style lang="less">
@import '../../less/variables.less';
	.menu {
		padding-top: 90px;
		font-size: 50px;
		font-weight: bold;
		width: 100vw;
		height: 100vh;
		position: fixed;
		top: 0;
		left: 0;
		display: flex;
		justify-content: flex-start;
		background: @black;
    	flex-flow: column;
		align-items: center;
		z-index: -1;
		box-sizing: border-box;
		pointer-events: all;

		&Links {
			height: 100%;
			width: 100%;
			display: flex;
			max-height: calc(100vh - 200px);
			position: relative;
			
			.el-row {
				max-height: 100%;
				max-width: 1200px;
				justify-content: space-between;
				display: flex;
				flex-flow: wrap;
				height: 100%;
				// min-height: 350px;

				&::before {
					display: none;
				}
				
				.up(@sm;{
					//padding-bottom: 204px;
				});

				.upLandscape(@sm;{
					max-height: none !important;
					margin-top: 104px !important;
					// max-height: calc(100vh - 104px) !important;
				});

				.up(@md;{
					//display: block;
					height: 100%;
					//max-height: none !important;
				});

				.up(@lg;{
					align-content: space-between;
					//max-height: none !important;
					max-height: 380px !important;
				});
			}

			.up(@sm;{
				padding: 0;
				max-height: calc(100vh - 368px);
			});

			.upLandscape(@sm;{
				max-height: none;
			});

			.up(@md;{
				max-height: calc(100vh - 285px);
				// margin-top: 50px;
			});

			.up(@lg;{
				margin-top: 0;
			});

		}

		.header__item-phone:hover {
			color: #0062CC;
		}

		.waves {
			max-width: calc(100% - 40px);
			position: fixed;
			overflow: hidden;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%); 
			z-index: -1;
			opacity: 0.07;
			height: 130px;
			width: 400px;
			

			svg {
				position: absolute;
				right: 0;
				top: 0;
				height: 100%;
				width: auto;
				animation: banner_waves 50s linear infinite;
			}

			.up(@sm;{
				max-width: calc(100% - 160px);
				height: 220px;
    			width: 680px;
			});

			.up(@lg;{
				height: 366px;
				width: 1060px;
			});
		}
		/*
			&::after {
				/////////////////////////////content: '';
				display: block;
				height: 366px;
				height: 27.5vw;
				position: fixed;
				top: 50%;
				left: 50%;
				transform: translate(-50%,-50%);
				background-image: url('../../assets/icons/banner_message.svg');
				background-size: contain;
				background-repeat-y: no-repeat;
				animation: banner_waves 50s linear infinite;
				z-index: -1;
				opacity: 0.04;
				width: calc(100% - 40px);

				.up(@sm;{
					width: calc(100% - 160px);
				});

				.up(@lg;{
					height: 366px;
					width: 1060px;
				});
			}
		*/

		&-enter-active, &-leave-active {
			transition: .5s ease-in-out;
			opacity: 1;
		}

		&-enter, &-leave-to {
			transition: .5s ease-in-out;
			opacity: 0;
		}

		.el-row {
			position: unset;
			overflow: auto;
			padding: 0 20px;
			transition: .8s;
			max-height: calc(100vh - 408px);
			margin-top: 50px;

			.up(@sm; {
				margin: auto;
			});

			@supports (-webkit-touch-callout: none) {
				padding: 0 20px 80px;
			}	

			&.visible {
				opacity: 0;
				transform: translateY(40px);
			}

			&.formOpened {
				width: 100%;
				height: 100%;
				position: relative !important;
				top: 0;

				.upLandscape(@sm;{
					.el-row {
						margin-top: 20px;
					}
				});
			}

			.up(@sm;{
				padding: 0;
				max-height: calc(100vh - 408px);
			});

			.upLandscape(@sm;{
				margin-top: 85px;
				max-height: calc(100% - 85px);
			});

			.up(@sm;{
					padding: 0;
    			max-height: calc(100% - 200px);
			});

			.upLandscape(@sm;{
					max-height: 100%;
				});

			.up(@md;{
					padding: 0;
    			max-height: 566px;
			});
		}

		.header__item-phone {
			// margin-top: 50px;

			.up(@sm;{
				position: absolute;
				bottom: 90px;
				left: 90px;
			});

			.up(@md;{
				display: none;
			});
		}

		.social {
			position: absolute;
			left: 0;
    	bottom: -60px;
    	padding: 0;
			width: 100%;
			
				.up(@sm;{
				bottom: -120px;
			});

			.up(@md;{
				bottom: -70px;
			});

			// .up(@sm;{
			// 	position: absolute;
			// 	top: 100%;
			// 	right: 0;
			// 	padding: 0;
			// 	width: 100%;
			// });

			// .upLandscape(@sm;{    
			// 	position: unset;
    	// 		padding: 40px 0 20px;
			// });

			// .up(@md;{
			// 	right: 50%;
			// 	transform: translateX(50%);
			// 	padding-top: 30px;
			// 	padding-bottom: 0;
			// });

			// .up(@lg;{
			// 	padding-top: 55px;
			// });

			.upLandscape(@sm;{
					position: fixed;
					top: 30px;
					bottom: unset;
					left: 0;
				});
		}

		.contact {
			position: absolute;
			left: 0;
			bottom: 10px;
			
			display: flex;
			justify-content: center;
			align-items: center;
			flex-wrap: wrap;
			padding: 0;
			width: 100%;

			text-align: center;

			.up(@sm;{
					bottom: -50px;

			});

			.header__item-phone {
				position: unset;

				.up(@sm;{
					// margin-top: 45px;
					margin-top: 0px;
				});
			}

			h4 {
				width: 100%;
				.up(@lg;{
					text-align: left;
				});
			}

			// .up(@lg;{        
			// 	width: auto;
			// 	padding: 40px 20px;
			// 	display: flex;
			// 	flex-flow: column;
			// 	justify-content: flex-end;
			// });

			// .up(@sm;{
			// 	position: absolute;
			// 	left: 0;
			// 	top: 100%;
			// 	padding: 40px 80px 80px;
			// 	padding: 45px 0 70px;
			// 	width: 100%;    
			// });

			.upLandscape(@sm;{    
				position: unset;
    			padding: 40px 0 20px;
			});

			.up(@md;{
				display: none;
			});
		}
		&__item {
			font-size: 50px;
			line-height: 60px;
			color: @white;
			font-weight: normal;
			text-align: center;
			padding: 12px 0;
			display: flex;
			justify-content: center;
			align-items: center;

			.router-link-exact-active {
				pointer-events: none;
				color: @btn_hover;
			}

			&:hover,
			&:focus {
				background: none;
			}

			.down(@xs;{
				width: 100%;
			});

			.up(@sm;{
				padding: 0 30px;
			});

			.up(@lg;{
				//padding: 30px;
			});
		}
		.up(@sm;{
			padding: 0 80px;
			justify-content: center;
		});

		.upLandscape(@sm;{   
			padding: 0px 20px;
		});
	}

.form-anim {
	//position: absolute !important;
    top: 90px;
	left: 0;
	
	&-enter-active, &-leave-active {
		transition: .4s !important;	// todo: get rid of !important
		opacity: 1;
		transform: translateY(0);
	}
	&-enter, &-leave-to {
		transition: .4s !important;	// todo: get rid of !important
		opacity: 0;
		transform: translateY(40px);
	}

	.up(@sm; {
		top: 0px;
		position: unset !important;// todo: get rid of !important
	});

	.upLandscape(@sm;{
		//top: 110px;
	});

	.up(@lg;{
		//max-height: 560px;
	});
}

.formOpened.form-anim {
	&-enter-active, &-leave-active {
		transform: translateY(0);
	}
	&-enter, &-leave-to {
		transform: translateY(-40px);
	}
}

.contact__phone-wrap {
	display: grid;
	grid-gap: 20px;

	.up(@sm; {
		grid-template-columns: repeat(2, 1fr);
	});
}

// TODO rewrite to less
@media (max-height: 500px) {
		.menu  {
			.el-row,
			.menuLinks {
				max-height: unset;
			}

			.el-row {
				margin-top: unset;
				padding-bottom: 40px;
			}

			.contact,
			 .social {
				position: static;
			}

			 .contact {
				margin: 20px 0;
			 }
		}

}
</style>