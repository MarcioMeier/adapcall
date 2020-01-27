<template>
  <div>
    <table v-if="ligacoes.length">
      <tr>
        <th>ID</th>
        <th>Solicitante</th>
        <th>Solicitado</th>
        <th>Cliente</th>
        <th>Departamento</th>
        <th>Urgente?</th>
      </tr>
      <tr v-for="ligacao in ligacoes" :key="ligacao.id">
        <td>{{ ligacao.id }}</td>
        <td>{{ ligacao.solicitante }}</td>
        <td>{{ ligacao.solicitado }}</td>
        <td>{{ ligacao.cliente }}</td>
        <td>{{ ligacao.departamento }}</td>
        <td>{{ ligacao.urgente ? 'Sim' : 'Não' }}</td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  props: ['ligacoes']
}
</script>

<style>

</style>