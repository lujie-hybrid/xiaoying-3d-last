<template>
  <v-new-player
    :id="id"
    :width="width"
    v-if="url"
    :height="height"
    :url="url"
  ></v-new-player>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      url: "",
      width: 0,
      height: 0,
      id: "",
    };
  },
  created() {
    this.url = this.getQueryString("u");
    this.id = this.getQueryString("id");
    this.width = parseInt(this.getQueryString("w"));
    this.height = parseInt(this.getQueryString("h"));
  },
  methods: {
    getQueryString(name) {
      const reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
      const r = window.location.search.substr(1).match(reg);
      if (r != null) return unescape(r[2]);
      return null;
    },
  },
};
</script>
<style lang="scss" scoped></style>
