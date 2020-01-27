<template>
  <div>
    <form @submit.prevent="criarLigacao">
      <fieldset>
        <legend>Criar Ligação</legend>

        <div>
          Solicitante
          <input type="text"
          v-model="ligacao.solicitante"
          >
        </div>
        
        <div>
          Solicitado
          <input type="text"
          v-model="ligacao.solicitado"
          >
        </div>
        
        <div>
          Cliente
          <input type="text"
          v-model="ligacao.cliente"
          >
        </div>
        
        <div>
          Departamento
          <input type="text"
          v-model="ligacao.departamento"
          >
        </div>
        
        <div>
          Urgente?
          <input type="checkbox"
          v-model="ligacao.urgente"
          >
        </div>

        <br/>
        <div>
          <button type="submit">Adicionar</button>
          &nbsp;
          <button type="button" @click="apagarLista">Apagar Lista</button>
        </div>

      </fieldset>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ligacao: this.novaLigacao(),
      lastId: 2525,
    };
  },
  methods: {
    criarLigacao() {
      this.$emit('adicionar-ligacao', {
        ...this.ligacao,
        id: (++this.lastId)}
      );
      this.ligacao=this.novaLigacao();
    },
    novaLigacao() {
      return {
        solicitante: '',
        solicitado: '',
        cliente: '',
        departamento: '',
        urgente: false,
      }
    },
    apagarLista() {
      this.$emit('apagar-lista');
    }
  },
};
</script>

<style>

</style>