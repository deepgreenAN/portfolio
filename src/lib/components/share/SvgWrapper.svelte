<script lang="ts">
      export let is_dark_mode: boolean;  // タークモードであるかどうか
      export let use_hover: boolean = false;  // ホバー時に色を変更するかどうか
</script>

{#if use_hover}
    <div class="h-10 w-10 text-primary hover:text-bgcolor flex justify-center items-center" class:hover_is_dark_mode={is_dark_mode}>
        <slot/>
    </div>
{:else}
    <div class="h-10 w-10 text-primary flex justify-center items-center" class:is_dark_mode={is_dark_mode}>
        <slot/>
    </div>
{/if}


<style>
    .is_dark_mode {
        @apply text-darkprimary;
    }
    .hover_is_dark_mode {
        @apply text-darkprimary hover:text-darkbgcolor;
    }
</style>