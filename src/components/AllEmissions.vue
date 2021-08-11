<template>
  <div class="container">
    <h3>Tokens Emitidos</h3> 
    <table class="table table-hover">
      <thead>
        <tr>
          <th scope="col">Quantidade</th>
          <th scope="col">Quem reconheceu</th>
          <th scope="col">Quem recebeu</th>
          <th scope="col">Descrição</th>
          <th scope="col">Ação</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(i, index) in allTokens" :key="index">
          <td>{{ i.amount }}</td>
          <td>{{ i.fromName }}</td>
          <td>{{ i.name }}</td>
          <td>{{ i.description }}</td>
          <button
          type="button"
          class="btn btn-primary btn-sm mt-2 mb-2 ml-2 mr-2"
          @click="openIntentionModal(i)"
        >
          Liquidar
        </button>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
export default {
  name: "AllEmissions",
  computed: {
    allTokens: function() {
      return this.$store.state.tokens;
    },
    userProfile: function() {
      return this.$store.state.userProfile;
    }    
  },
  methods: {
    openIntentionModal(i) {
      let payload = {
        emissionId: i.id,

      }
      console.log(payload);
    }
  }
};
</script>
