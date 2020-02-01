<template>
  <div>
    <table>
      <tr>
        <th>ID</th>
        <th>Solicitante</th>
        <th>Solicitado</th>
        <th>Cliente</th>
        <th>Departamento</th>
        <th>Urgente?</th>
      </tr>
      <tr v-show="!isLoading && ligacoes.length === 0">
        <td colspan="6">Não há ligações</td>
      </tr>
      <tr v-show="isLoading">
        <td colspan="6">Carregando</td>
      </tr>
      <tr v-for="(ligacao, indice) in ligacoes" :key="ligacao.id">
        <td>{{ ligacao.id }}</td>
        <td>{{ ligacao.solicitante }}</td>
        <td>{{ ligacao.solicitado }}</td>
        <td>{{ ligacao.cliente }}</td>
        <td>{{ ligacao.departamento }}</td>
        <td>{{ ligacao.urgente ? 'Sim' : 'Não' }}</td>
        <td><button @click="ExcluirLigacao(indice)">Excluir</button></td>
        <td><button @click="EditarLigacao(indice)">Editar</button></td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  props: ['ligacoes', 'isLoading'],
  methods: {
    ExcluirLigacao(indice) {
      this.$emit('excluir-ligacao', indice);
    },
    EditarLigacao(indice) {
      this.$emit('editar', indice);
    },
  },
};
</script>

<style>

</style>
