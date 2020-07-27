<template>
  <div>
    <p>{{ info.date }}</p>
    <ol>
      <li v-for="(time, index) in info.times" :key="index">
        <button @click="setFormTime(info.date, time)">{{ time }}</button>
      </li>
    </ol>
  </div>
</template>

<script>
export default {
  name: 'excursion-form-avalible-times-col',

  props: {
    info: {
      type: Object,
      required: true,
      validator(val) {
        const keys = Object.keys(val);
        return keys.length === 2 && ['date', 'times'].every((prop) => keys.includes(prop)) && Array.isArray(val.times);
      }
    }
  },

  methods: {
    setFormTime(date, time) {
      this.$emit('setFormTime', {date, time});
    }
  }
}
</script>