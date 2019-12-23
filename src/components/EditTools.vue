<template>
  <div>
    <div class="EditTools" :class="{ disabled: isDisabled }">
      <ul class="content">
        <li @click="$emit('_add')">
          <Button
            :label-value="'追加'"
            :can-get-focus="false"
            :disabled="isDisabled"
          ></Button>
        </li>
        <li @click="$emit('_delete')">
          <Button
            :label-value="'削除'"
            :can-get-focus="false"
            :disabled="isDisabled || !canDelete"
          ></Button>
        </li>
        <li @click="$emit('_export')">
          <Button :label-value="'エクスポート'" :disabled="isDisabled"></Button>
        </li>
        <li @click="$emit('_import')">
          <Button :label-value="'インポート'" :disabled="isDisabled"></Button>
        </li>
      </ul>
    </div>
    <div class="pad"></div>
  </div>
</template>

<script>
import Button from "@/components/Button";

export default {
  name: "EditTools",
  props: {
    isDisabled: Boolean,
    canAdd: Boolean,
    canDelete: Boolean,
    canExport: Boolean,
    canImport: Boolean
  },
  components: {
    Button
  }
};
</script>

<style scoped lang="stylus">
.EditTools {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  background: #fff;
  box-shadow: 0 4px 4px -2px rgba(0, 0, 0, 0.2);

  &.disabled {
  }
}

.content {
  padding: 8px 12px;
  width: 960px;
  max-width: 100%;
  margin: 0 auto;

  & > li {
    display: inline-block;
  }

  & > li > button {
    margin-right: 8px;
  }
}

.EditTools, .pad {
  height: 47.5px;
}
</style>
