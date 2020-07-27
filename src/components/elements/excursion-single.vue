<template>
  <div class="excursionSingle" data-aos="bg-anim" data-aos-anchor=".header">
    <div data-aos="fade-left" data-aos-delay="2200" data-aos-anchor=".header">
      <template v-if="data.programText">
        <h3>Программа экскурсии</h3>
        <div class="excursionSingle__content" v-html="data.programText" />
      </template>
      <el-row tag="ul" class="itemsList">
        <el-col
          tag="li"
          class="itemsList__item"
          :span="24"
          :sm="{ span: 12 }"
          :md="{ span: 8 }"
          :lg="{ span: 12 }"
          v-for="({ name, price, icon }, index) in list"
          :key="index"
        >
          <i class="icon icon-person" :class="icon"></i>
          <div class="itemsList__item-text">
            <h5>{{ name }}</h5>
            <span>{{ price | price }} руб.</span>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
  export default {
    name: "excursion-single",
    props: {
      data: Object,
    },
    computed: {
      prices() {
        return this.data.prices;
      },
      list() {
        if (!this.prices) return [];
        const iconByKey = {
          Взрослый: "icon-person",
          Ребенок: "icon-child",
          Иностранец: "icon-backpack",
        };
        
        const adults =  Object.keys(this.prices).filter((key) => !iconByKey[key]);
        const priceForAdult = adults && adults.length ? adults.reduce((acc, key)=> {
          const min = Math.min(...this.prices[key]);
          return Math.min(min, acc);
        }, 9999999) : null;
        
        const childAndForeigner = Object.keys(this.prices).reduce((acc, key) => {
          if (!iconByKey[key]) return acc;
          const obj = {
            name: key,
            icon: iconByKey[key],
            price: Math.min(...this.prices[key]),
          };
          acc.push(obj);
          return acc;
        }, []);
        
        if (priceForAdult) {
          childAndForeigner.push({
            name: 'Взрослый',
            icon: 'icon-person',
            price: priceForAdult,
          })
        }

        childAndForeigner.sort((a, b) => a.price - b.price);

        return childAndForeigner;
      },
    },
    mounted() {},
  };
</script>

<style lang="less">
  @import "../../less/variables.less";

  .excursionSingle {
    padding: 40px 20px 0px;
    background: linear-gradient(0deg, #ffffff 50%, #e5eaf5 0%);
    animation-delay: 1.7s !important;
    animation-fill-mode: forwards !important;
    background-size: 100% 200%;
    background-position: 100% 0%;
    background-position: 100% 100%;
    box-sizing: border-box;
    z-index: 1;
    margin-left: auto;
    width: 100%;
    pointer-events: all;

    &.aos-animate {
      background-position: 100% 100%;
    }

    h3 {
      text-align: left;
      margin-bottom: 40px;
    }

    &__content {
      ul {
        margin-bottom: 40px;

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

        .up(@sm;{margin-bottom: 80px; max-height: 480px; overflow: auto;});
      }
    }

    .itemsList {
      display: flex;
      flex-flow: wrap;
      margin: 0 -10px;

      &__item {
        padding: 0 10px 40px;
        flex: 1 0 310px;

        &-text {
          flex-shrink: 0;
        }

        .up(@sm;{padding: 0 40px 80px;});
        /*
			&:nth-last-child(1), 
			&:nth-last-child(2) {
				padding-bottom: 0;
			}

		*/
      }

      .icon {
        background-color: @black;
      }

      .up(@sm;{margin: 0 -40px;});
    }

    .up(@sm;{padding: 70px 80px 0;});

    .up(@lg;{width: 100%; max-width: 850px;});
  }
</style>
