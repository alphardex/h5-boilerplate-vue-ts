<template>
  <div class="input-group input-spinner">
    <button class="btn minus" @click="dec">
      <i class="minus-icon"></i>
    </button>
    <input
      type="text"
      readonly
      :value="modelValue"
      :model-value="currentValue"
      class="form-control"
    />
    <button class="btn plus" @click="inc">
      <i class="plus-icon"></i>
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";

interface State {
  currentValue: number | string;
}

export default defineComponent({
  name: "InputNumber",
  props: {
    min: {
      type: Number,
      default: -Infinity,
    },
    max: {
      type: Number,
      default: Infinity,
    },
    modelValue: {
      type: Number,
      default: 1,
    },
    step: {
      type: Number,
      default: 1,
    },
  },
  emits: ["update:modelValue"],
  setup(props, { emit }) {
    const state = reactive<State>({
      currentValue: 0,
    });
    const setCurrentValue = (newValue: number) => {
      const { currentValue } = state;
      if (newValue === currentValue) {
        return;
      }
      if (newValue >= props.max) {
        newValue = props.max;
      }
      if (newValue <= props.min) {
        newValue = props.min;
      }
      state.currentValue = newValue;
      emit("update:modelValue", newValue);
    };
    const inc = () => {
      const newValue = props.modelValue + props.step;
      setCurrentValue(newValue);
    };
    const dec = () => {
      const newValue = props.modelValue - props.step;
      setCurrentValue(newValue);
    };
    return {
      ...toRefs(state),
      inc,
      dec,
    };
  },
});
</script>

<style lang="scss" scoped></style>
