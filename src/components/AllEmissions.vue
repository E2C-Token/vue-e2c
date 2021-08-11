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
          <!-- Button trigger modal -->
          <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#intention">
            Liquidar
          </button>
        </tr>
      </tbody>
    </table>
    <!-- Modal -->
    <div class="modal fade" id="intention" data-backdrop="static" data-keyboard="false" tabindex="-1" aria-labelledby="intentionLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="intentionLabel">Intenção de liquidação</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <h2>Detalhes da emissão</h2>
            <h3>Nome</h3>
            <h3>Descrição</h3>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
            <button type="button" class="btn btn-primary">Salvar</button>
          </div>
        </div>
      </div>
    </div>
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
