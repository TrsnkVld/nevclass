<template>
<section class="textBlock" data-aos="bg-anim">
	<el-container  direction="vertical">
		<h2 data-aos="fade-down"  data-aos-delay="300" v-if="title" class="sectionTitle">{{ title }}</h2>
		<el-row :gutter="80" data-aos="fade-down" data-aos-delay="600" class="textBlock__rows">
			<el-col v-html="textDataL" :span="24" :md="{span: 12}" />
			<el-col v-html="textDataR" :span="24" :md="{span: 12}" />
<!--
			<ol class="policyList" v-if="type=='policy'">
				<li v-for="(paragraph, index) in text" :key="index">
					<h3>{{ paragraph.title }}</h3>
					{{ paragraph.text.info }}
					<ol>
						<li v-for="(item, index) in paragraph.text.items" :key="index">
							{{ item }}
						</li>
					</ol>
				</li>
			</ol>
			<component v-else :is="tagName(paragraph)" class="textBlock__rows-item list" :id="paragraph.index" v-for="paragraph in text" :key="paragraph.index">
				<span v-if="typeOf(paragraph) == 'object'">{{ paragraph.title }}</span>
				<span v-else-if="typeOf(paragraph) == 'string'">{{ paragraph }}</span>
				<li v-else-if="typeOf(paragraph) == 'array'" v-for="line in paragraph" :key="line.index">{{ line }}</li>
			</component>
			<img v-if="img" :src="`${require(`../../assets/img/${img}`)}`"  alt="ship_img" />
			-->
		</el-row>	
	</el-container>
</section>
</template>

<script>
export default {
	name: 'text-block',
	components: {},
	props: [
		'title',
		'text',
		'type',
		'img',
		'textDataL',
		'textDataR',
	],
	methods: {
		typeOf(a) {
			if (typeof(a) === 'string') {
				return 'string';
			} else if (!Array.isArray(a)) {
				return 'object';
			} else {
				return 'array';
			}
		},
		tagName(a) {
			switch(typeof(a)) {
				case "string":
					return 'p';
					break;
				case "object":
					if ('title' in a) {
						return 'h3'
					} else {
						return 'ul';
					}
					break;
				default:
					return 'p';
			}

			/*
			if (e==='string') {
				return 'p';
			} else {
				return 'ul';
			}
			*/
		},
	},
	mounted(){
		//console.log(this.text);
	}
}
</script>

<style lang="less">
@import '../../less/variables.less';


.textBlock {
	background: linear-gradient(0deg, #ffffff 50%, #F2F4FA 0%);
    background-size: 100% 200%;
    background-position: 100% 100%;

	.el-container {
		padding: 40px 20px;
		
		.up(@sm;{
			padding: 80px;
		});
	}

	.sectionTitle {
		padding-top: 0;
	}

	&__rows {
		& .el-col > * {
			margin-bottom: 40px;
			text-align: left;

			&:last-child {
				margin-bottom: 0;
			}
		}

		.el-col {
			&:first-child {
				margin-bottom: 40px;
			
				.up(@md;{	
					margin-bottom: 0;
				});
			}
		}

		ul {
			li {
				margin-bottom: 15px;
				display: flex;
				&::before {
					content: "—";
					margin-right: 20px;
				}

				&:last-child {
					margin-bottom: 0;
				}
			}
		}

		img {
			max-width: 100%;
		}
	}

	&.yellow {
		background: linear-gradient(0deg, #ffffff 50%, #FFE485 0%);
		background-size: 100% 200%;
		background-position: 100% 100%;
		//background-color: @soft_yellow;
	}

	&.white {
		background: @white;
	}

	&.single {
		.textBlock__rows {
			display: flex;
			justify-content: center;
			align-items: center;
			flex-flow: column;
			.el-col {
				width: 100%;
				text-align: center;
				margin: 0 auto;
			
				.up(@md;{	
					max-width: 840px;
				});
			}
		}
	}
}
ol {
}

.policyList {
	
	h3 {
		text-align: left;
		padding-left: 20px;
    	margin-bottom: 25px;
	}

	li {
		position: relative;

		&::before {
			content: counter(my-awesome-counter) ".";
			position: absolute;
			top: 0;
			left: 0;
		}

		&:last-child {
			ol {
				margin-bottom: 0;
			}
		}
	}

	&>li {	

		&::before {
			font-size: 30px;
			line-height: 34px;
			font-weight: bold;
		}
	}

	ol {
		padding-left: 60px;
		margin: 35px 0;

		li {
    		padding-bottom: 30px;
			break-inside: avoid;

			&::before {
				left: -40px;
			}
			

			&:last-child {
				padding-bottom: 0;
			}

		}

		.up(@sm;{
			margin: 35px 0 70px;
		});
	}
}

</style>