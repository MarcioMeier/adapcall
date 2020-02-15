<template>
  <div>
    <table class="table table-striped">
      <thead>
        <tr>
          <th>ID</th>
          <th>Solicitante</th>
          <th>Solicitado</th>
          <th>Cliente</th>
          <th>Departamento</th>
          <th>Urgente?</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-show="ligacoes.length === 0">
          <td colspan="6">Não há ligações</td>
        </tr>
        <tr v-for="(ligacao, indice) in ligacoes" :key="ligacao.id">
          <td>{{ ligacao.id }}</td>
          <td>{{ ligacao.solicitante }}</td>
          <td>{{ ligacao.solicitado }}</td>
          <td>{{ ligacao.cliente }}</td>
          <td>{{ ligacao.departamento }}</td>
          <td>{{ ligacao.urgente ? 'Sim' : 'Não' }}</td>
          <td v-if="!isLoading[indice]">
            <button class="btn btn-primary" @click="ExcluirLigacao(indice)">Excluir</button>
            <button class="btn btn-secondary" @click="EditarLigacao(indice)">Editar</button>
          </td>
          <td v-if="isLoading[indice]" colspan="2">Carregando...</td>
        </tr>
      </tbody>
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
