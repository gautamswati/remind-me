<template>
  <div class="hello">
    <h1 class="text-lg text-yellow-900">{{ msg }}</h1>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  }
}
</script>
