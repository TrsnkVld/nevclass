<template>
<el-row class="contactsWrap">
	<el-col class="contactsInfo" :span="24" :lg="{span: 10, offset: 14}">
		<ul class="itemsList">
			<li class="itemsList__item">
				<i class="icon icon-markerBlack"></i>
				<p class="itemsList__item-text">Санкт-Петербург, наб. реки Фонтанки 59, офис 222, Бизнес центр «Лениздат»</p>
			</li>
			<li class="itemsList__item">
				<i class="icon icon-phoneBlack"></i>
				<p class="itemsList__item-text"><a href="tel:+78124496480">+7 812 449 64 80</a></p>
			</li>
			<li class="itemsList__item">
				<i class="icon icon-mailBlack"></i>
				<a href="mailto:mail@nevclass.spb.ru" class="itemsList__item-text">mail@nevclass.spb.ru</a>
			</li>
			<li class="itemsList__item">
				<ul class="innerList">
					<li class="itemsList__item">
						<i class="icon icon-timeBlack"></i>
						<p class="itemsList__item-text">
							<span><b>С апреля по октябрь</b></span>
							<span>с 10:00 до 20:00 (ежедневно)</span>
						</p>
					</li>
					<li class="itemsList__item">
						<i class="icon"></i>
						<p class="itemsList__item-text">
							<span><b>С ноября по март</b></span>
							<span>11:00-18:00 (пн-пт)</span>
						</p>
					</li>
				</ul>
			</li>
		</ul>
		<ul v-if="this.$route.name === 'contacts'" class="contactsInfo__list">
			<li><span>ИНН</span><span>7840009812</span></li>
			<li><span>КПП</span><span>784001001</span></li>
			<li><span>Р/С</span><span>40702810532000005379</span></li>
			<li><span>К/С</span><span>30101810900000000790</span></li>
			<li><span>БИК</span><span>044030790</span></li>
			<li><span>Банк</span><span>ОАО «Банк «Санкт-Петербург» Коммерческий департамент</span></li>
		</ul>
	</el-col>
</el-row>
</template>

<script>
export default {
	name: 'contacts-block',
}
</script>

<style lang="less">
@import '../../less/variables.less';

.contactsWrap {
	padding: 450px 0 0;
	pointer-events: none !important;
	position: relative;
    display: flex;
	
	.up(@sm;{
		padding: 450px 20px 20px;
	});
	
	.up(@lg;{
		padding: 80px;
	});
}

.contactsInfo {
	background-color: @white;
	padding: 40px 20px;
	pointer-events: all;
	overflow: hidden;
	margin-left: auto;

	.itemsList {
		& > .itemsList__item {

			.itemsList__item-text {
				word-wrap: break-word;
				width: calc(100% - 90px);
			}
			
			.up(@sm;{
				width: 50%;
				box-sizing: border-box;
				padding: 0 35px 30px;

				&:last-child {
					padding-bottom: 0;
				}
			});
			
			.up(@lg;{    
				width: 100%;
				padding: 0 0 30px 0;

				&:last-child {
					padding-bottom: 0;
				}
			});
		}
			
		.up(@sm;{
			display: flex;
			flex-flow: wrap;
    		margin: 0 -35px;
		});
			
		.up(@lg;{
			display: block;
    		margin: 0;
		});
	}

	&__list {
		padding-top: 40px;

		li {
			display: flex;
    		margin-bottom: 15px;
    		word-break: break-word;

			span:first-child {
				margin-right: 30px;
				width: 60px;
				flex-shrink: 0;
			}

			&:last-child {
				margin: 0;
			}
		}

		.up(@sm;{
			padding-top: 70px;
			columns: 2 auto;
			column-gap: 70px;
		});

		.up(@lg;{
			columns: auto;
		});
	}

	.up(@sm;{
		padding: 70px;
		border-radius: 20px;
	});

	.up(@lg; {
		max-width: 700px;
	});
}
</style>

