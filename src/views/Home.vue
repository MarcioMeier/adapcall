<template>
  <div>
    <h1>{{title}}</h1>
    <Ligacoes
      :ligacoes="ligacoes"
      :is-loading="isLoading"
      @excluir-ligacao="excluirLigacao"
      @editar="editar"
    />
    <br/>
    <button
      @click="() => mostraFormulario = !mostraFormulario"
      >
        {{ mostraFormulario ? 'Esconde Formulário' : 'Mostra Formulário'}}
      </button>
    <br/>
    <FormLigacao
      v-if="mostraFormulario"
      :ligacao="ligacao"
      @adicionar-ligacao="adicionarLigacao"
      @apagar-lista="apagarLista"
      @editar-ligacao="editarLigacao"
      @reset-form="resetForm"
    />
  </div>
</template>

<script>

import Ligacoes from '../components/Ligacoes.vue';
import FormLigacao from '../components/FormLigacao.vue';

export default {
  components: {
    Ligacoes,
    FormLigacao,
  },
  data() {
    return {
      title: 'Ligações da Regi',
      mostraFormulario: false,
      ligacao: null,
      ligacoes: '',
      isLoading: false,
    };
  },
  methods: {
    adicionarLigacao(ligacao) {
      this.ligacoes.push({
        ...ligacao,
        id: (this.getNextId()),
      });

      this.resetForm();
    },
    editarLigacao(ligacaoEditada) {
      const indice = this.ligacoes.findIndex(ligacao => ligacao.id === ligacaoEditada.id);
      if (indice < 0) return;

      this.ligacoes.splice(indice, 1, ligacaoEditada);
      this.resetForm();
    },
    apagarLista() {
      this.ligacoes = [];
    },
    excluirLigacao(indice) {
      this.ligacoes.splice(indice, 1);
    },
    editar(indice) {
      this.mostraFormulario = false;
      this.ligacao = this.ligacoes[indice];

      this.$nextTick(() => {
        this.mostraFormulario = true;
      });
    },
    getNextId() {
      const { id } = Array.from(this.ligacoes).sort((a, b) => {
        if (a.id > b.id) return -1;
        return 1;
      })[0];

      return id + 1;
    },
    resetForm() {
      this.ligacao = '';
      this.mostraFormulario = false;
    },
    async getLigacoes() {
      try {
        const { status, data } = await axios.get('http://5e3589a5f7e55d0014ad4dca.mockapi.io/api/v1/ligacao');
        if (status !== 200) {
          throw Error('Erro ao obter os dados');
        }

        if (!Array.isArray(data)) {
          return [];
        }

        return data;
      } catch (error) {
        throw error;
      }
    },
    async PostLigacao(ligacao) {
      try {
        const { status, data } = await axios.post('http://5e3589a5f7e55d0014ad4dca.mockapi.io/api/v1/ligacao', ligacao);
        if (status !== 200) {
          throw Error('Erro ao obter os dados');
        }

        return data;
      } catch (error) {
        throw error;
      }
    },
    async PutLigacao(id,ligacao) {
      try {
        const { status, data } = await axios.put(`http://5e3589a5f7e55d0014ad4dca.mockapi.io/api/v1/ligacao/${id}`, ligacao);
        if (status !== 200) {
          throw Error('Erro ao obter os dados');
        }

        return data;
      } catch (error) {
        throw error;
      }
    },
    async DeleteLigacao(id) {
      try {
        const { status } = await axios.delete(`http://5e3589a5f7e55d0014ad4dca.mockapi.io/api/v1/ligacao/${id}`);
        if (status !== 200) {
          throw Error('Erro ao obter os dados');
        }
      } catch (error) {
        throw error;
      }
    },
  },
  async mounted() {
    try {
      this.isLoading = true;
      this.ligacoes = await this.getLigacoes();
    } catch (error) {
      console.log(error.message || error.error || error);
    } finally {
      this.isLoading = false;
    }
  },
};
</script>
