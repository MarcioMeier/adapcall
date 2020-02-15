<template>
  <div>
    <form>
      <fieldset :class=" { 'error' : errorMessage}">
        <legend :class=" { 'error' : errorMessage}">{{
          editando ? `Você está editando a ligação ${formLigacao.id}`
          : 'Criar Ligação'}}
        </legend>
        <div>
          Solicitante
          <input type="text"
          v-model="formLigacao.solicitante"
          >
        </div>

        <div>
          Solicitado
          <input type="text"
          v-model="formLigacao.solicitado"
          >
        </div>

        <div>
          Cliente
          <input type="text"
          v-model="formLigacao.cliente"
          >
        </div>

        <div>
          Departamento
          <input type="text"
          v-model="formLigacao.departamento"
          >
        </div>

        <div>
          Urgente?
          <input type="checkbox"
          v-model="formLigacao.urgente"
          >
        </div>

        <br/>
        <div v-if="editando">
          <button
            type="button"
            class="btn btn-success"
            @click="editarLigacao">Salvar Alterações
          </button>
          <button
            type="button"
            class="btn btn-secondary"
            @click="limparCampos">Limpar Campos
          </button>
          <button
            type="button"
            class="btn btn-danger"
            @click="cancelarEdicao">Cancelar Edição
          </button>
        </div>
        <div v-else>
          <button
            type="button"
            class="btn btn-success"
            @click="criarLigacao">Adicionar
          </button>
          <button
            type="button"
            class="btn btn-secondary"
            @click="limparCampos">Limpar Campos
          </button>
        </div>

      </fieldset>
    </form>
  </div>
</template>

<script>
export default {
  props: ['ligacao', 'errorMessage'],
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
