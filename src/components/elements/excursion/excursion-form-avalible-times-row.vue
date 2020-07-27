<template>
  <div>
    <ul>
      <li></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'excursion-form-avalible-times-row',

  props: {
    info: {
      type: Array,
      required: true,
      validator(val) {
        return val.every((item) => item.times && item.date);
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