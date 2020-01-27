<template>
  <div id="app">
    <h1>{{title}}</h1>
    <Ligacoes
      :ligacoes="ligacoes"
    />
    <FormLigacao
      @adicionar-ligacao="adicionarLigacao"
      @apagar-lista="apagarLista"
    />
  </div>
</template>

<script>

import Ligacoes from './components/Ligacoes'
import FormLigacao from './components/FormLigacao'

export default {
  components: {
    Ligacoes,
    FormLigacao,
  },
  data() {
    return {
      title: 'Ligações da Regi',
      ligacoes: [
        {
          id: 2524,
          solicitante: 'Germano',
          solicitado: 'Luis',
          cliente: 'Colcci',
          departamento: 'TI',
          urgente: false,
        },
        {
          id: 2525,
          solicitante: 'Márcio',
          solicitado: 'Fernando',
          cliente: 'Colcci',
          departamento: 'TI',
          urgente: true,
        },
      ],
    }
  },
  methods: {
    adicionarLigacao(ligacao) {
      this.ligacoes.push(ligacao);
    },
    apagarLista() {
      this.ligacoes = [];
    }
  }
}
</script>
<style>
</style>
