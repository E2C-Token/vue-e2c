<template>
  <div class="overview">
    <div class="container">
      <div>
        <AllEmissions />
      </div>
      <div class="row">        
       <WaitingToLiquidate />
      </div>
    </div>
  </div>
</template>

<script>

import WaitingToLiquidate from "../components/WaitingToLiquidate"
import AllEmissions from "../components/AllEmissions"
export default {
  name: "Overview",
  props: {
    msg: String,
  },
  components: {    
    AllEmissions,
    WaitingToLiquidate
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
