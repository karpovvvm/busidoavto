<template>
    <transition
        appear
        :enter-active-class="enter"
        :leave-active-class="leave"
        :mode="mode"
    >
        <slot></slot>
    </transition>
</template>

<script>
export default {
    name:  'TransitionBlock',
    props: {
        enter: {
            type:    String,
            default: 'animated fadeIn',
        },
        leave: {
            type:    String,
            default: 'animated fadeOut',
        },
        mode:  {
            type:    String,
            default: 'out-in',
        },
    },
};
</script>

<style scoped>

</style>
