<script>
    export let isActive = false;
    export let isFirst = false;
    export let isHover = false;
    export let isSelectable = false;
    export let getOptionLabel = undefined;
    export let item = undefined;
    export let filterText = '';

    let itemClasses = '';

    $: {
        const classes = [];
        if (isActive) {
            classes.push('active');
        }
        if (isFirst) {
            classes.push('first');
        }
        if (isHover) {
            classes.push('hover');
        }
        if (item.isGroupHeader) {
            classes.push('groupHeader');
        }
        if (item.isGroupItem) {
            classes.push('groupItem');
        }
        if (!isSelectable) {
            classes.push('notSelectable');
        }
        itemClasses = classes.join(' ');
    }
</script>

<style>
    .item {
        cursor: default;
        height: var(--height, 42px);
        line-height: var(--height, 42px);
        padding: var(--itemPadding, 0 14px);
        color: var(--itemColor, #383838);
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        font-size: 12px;

    }

    .groupHeader {
        text-transform: var(--groupTitleTextTransform, uppercase);
    }

    .groupItem {
        padding-left: var(--groupItemPaddingLeft, 40px);
    }

    .item:active {
        background: var(--itemActiveBackground, #b9daff);
    }

    .item.active {
        background: var(--itemIsActiveBG, #18a0fb);
        color: var(--itemIsActiveColor, #fff);
    }

   .item.notSelectable {
        color: var(--itemIsNotSelectableColor, #999);
    }

    .item.first {
        border-radius: var(--itemFirstBorderRadius, 2px 2px 0 0);
    }

    .item.hover:not(.active) {
        background: var(--itemHoverBG, #18a0fb13);
        color: var(--itemHoverColor, inherit);
    }
</style>

<div class="item {itemClasses}">
    {@html getOptionLabel(item, filterText)}
</div>
