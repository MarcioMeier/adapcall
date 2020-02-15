<template>
  <div class="home">
    <div v-if="errorMessage" class="alert alert-danger"> {{ errorMessage }}</div>
    <div v-show="isLoading['list']"><ac-full-loading></ac-full-loading></div>

    <div v-show="!isLoading['list']">
      <ac-button
        type="danger"
        @click.native.prevent="() => mostraFormulario = !mostraFormulario"
        :icon="mostraFormulario ? 'fa-angle-up' : 'fa-angle-down'">
          {{ mostraFormulario ? 'Fechar Formulário' : 'Abrir Formulário'}}
      </ac-button>
      <ac-button
      @click.native.prevent="carregarLista">
        Recarregar Lista
      </ac-button>
      <br/>

      <div>
        <transition name="fade">
          <FormLigacao
            v-if="mostraFormulario"
            :ligacao="ligacao"
            :error-message="errorMessage"
            :is-loading="isLoading['form']"
            @adicionar-ligacao="adicionarLigacao"
            @editar-ligacao="editarLigacao"
            @reset-form="resetForm"
          />
        </transition>
      </div>
      <h1>{{title}} <i class="fas fa-address-book"></i></h1>
      <Ligacoes
        :ligacoes="ligacoes"
        :is-loading="isLoading"
        @excluir-ligacao="excluirLigacao"
        @editar="editar"
      />
    </div>
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
      errorMessage: '',
      isLoading: {},
    };
  },
  methods: {
    async adicionarLigacao(ligacao) {
      const response = await this.request({
        id: 'form',
        method: 'POST',
        data: ligacao,
      });

      if (!response) return;

      this.ligacoes.push(response.data);
      this.resetForm();
    },
    async editarLigacao(ligacaoEditada) {
      const response = await this.request({
        id: 'form',
        url: `http://5e3589a5f7e55d0014ad4dca.mockapi.io/api/v1/ligacao/${ligacaoEditada.id}`,
        method: 'PUT',
        data: ligacaoEditada,
      });

      if (!response) return;

      const indice = this.obterIndiceLista(ligacaoEditada);
      if (indice < 0) return;

      this.ligacoes.splice(indice, 1, ligacaoEditada);
      this.resetForm();
    },
    async excluirLigacao(indice) {
      this.$set(this.isLoading, indice, true);

      const { id } = this.ligacoes[indice];
      const response = await this.request({
        id,
        method: 'DELETE',
        url: `http://5e3589a5f7e55d0014ad4dca.mockapi.io/api/v1/ligacao/${id}`,
      });

      this.$set(this.isLoading, indice, false);

      if (!response) return;

      this.ligacoes.splice(indice, 1);
    },
    editar(indice) {
      this.mostraFormulario = false;
      this.ligacao = this.ligacoes[indice];

      this.$nextTick(() => {
        this.mostraFormulario = true;
      });
    },
    obterIndiceLista(ligacao) {
      return this.ligacoes.findIndex(lig => lig.id === ligacao.id);
    },
    async carregarLista() {
      try {
        this.ligacoes = [];
        const response = await this.request({ id: 'list' });
        if (!response) return;

        this.ligacoes = response.data;
      } catch (error) {
        throw error;
      }
    },
    resetForm() {
      this.ligacao = '';
      this.mostraFormulario = false;
      this.errorMessage = '';
    },
    async request({ id, ...params }) {
      if (this.isLoading[id]) return;

      try {
        this.$set(this.isLoading, id, true);
        // eslint-disable-next-line consistent-return
        return await axios({
          url: 'http://5e3589a5f7e55d0014ad4dca.mockapi.io/api/v1/ligacao',
          method: 'GET',
          ...params,
        });
      } catch (error) {
        this.errorMessage = error.response.data || error.message || error;
      } finally {
        this.$set(this.isLoading, id, false);
      }
    },
  },
  mounted() {
    this.carregarLista();
  },
};
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
