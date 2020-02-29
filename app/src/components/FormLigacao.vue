<template>
  <div>
    <form>
      <fieldset :class=" { 'error' : errorMessage}">
        <legend :class=" { 'error' : errorMessage}">{{
          editando ? `Você está editando a ligação ${formLigacao.id}`
          : 'Criar Ligação'}}
        </legend>
        <div class="form-row" style="margin-left:5px;">
          <div class="form-group col-md-6">
            <label>Solicitante</label>
            <input
              type="text"
              class="form-control"
              id="solicitante"
              v-model="formLigacao.solicitante"
            >
          </div>

          <div class="form-group col-md-6">
            <label>Solicitado</label>
            <input
              type="text"
              class="form-control"
              id="solicitado"
              v-model="formLigacao.solicitado"
            >
          </div>

          <div class="form-group col-md-6">
            <label>Cliente</label>
            <input
              type="text"
              class="form-control"
              id="cliente"
              v-model="formLigacao.cliente"
            >
          </div>

          <div class="form-group col-md-6">
            <label>Departamento</label>
            <input
              type="text"
              class="form-control"
              id="departamento"
              v-model="formLigacao.departamento"
            >
          </div>

          <div class="form-group">
            <div class="custom-control custom-checkbox">
              <input
                class="custom-control-input"
                type="checkbox"
                id="urgente"
                v-model="formLigacao.urgente"
              >
              <label class="custom-control-label" for="urgente">
                Urgente?
              </label>
            </div>
          </div>
          </div>
      </fieldset>
    </form>
    <div v-if="isLoading">
      <ac-button type="info">
        <ac-loading>Carregando</ac-loading>
      </ac-button>
    </div>
    <div v-else-if="editando">
      <ac-button
        type="success"
        @click.native.prevent="editarLigacao">Salvar Alterações
      </ac-button>
      <ac-button
        type="secondary"
        @click.native.prevent="limparCampos">Limpar Campos
      </ac-button>
      <ac-button
        type="danger"
        @click.native.prevent="cancelarEdicao">Cancelar Edição
      </ac-button>
    </div>
    <div v-else>
      <ac-button
        type="success"
        @click.native.prevent="criarLigacao">Adicionar
      </ac-button>
      <ac-button
        type="secondary"
        @click.native.prevent="limparCampos">Limpar Campos
      </ac-button>
    </div>
  </div>
</template>

<script>
export default {
  props: ['ligacao', 'errorMessage', 'isLoading'],
  data() {
    return {
      formLigacao: '',
      editando: false,
    };
  },
  methods: {
    criarLigacao() {
      this.$emit('adicionar-ligacao', { ...this.formLigacao });
      // this.formLigacao = this.novaLigacao();
    },
    novaLigacao() {
      return {
        solicitante: '',
        solicitado: '',
        cliente: '',
        departamento: '',
        urgente: false,
      };
    },
    editarLigacao() {
      this.$emit('editar-ligacao', { ...this.formLigacao });
    },
    limparCampos() {
      // eslint-disable-next-line no-restricted-syntax
      for (const key in this.formLigacao) {
        if (key === 'id' || typeof key === 'function') {
          // eslint-disable-next-line no-continue
          continue;
        }

        if (typeof this.formLigacao[key] === 'boolean') {
          this.formLigacao[key] = false;
        } else {
          this.formLigacao[key] = '';
        }
      }
    },
    cancelarEdicao() {
      this.$emit('reset-form');
    },
  },
  mounted() {
    if (this.ligacao) {
      this.editando = true;
      this.formLigacao = { ...this.ligacao };
    } else {
      this.editando = false;
      this.formLigacao = this.novaLigacao();
    }
  },
};
</script>

<style>
  .error {
    color: tomato;
    border-color: red;
  }
</style>
