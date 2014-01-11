EASY-TREE.js
============

A plugin base on jquery and bootstrap 3, can convert an un-order list to a tree easily. The tree that
selectable, addable, editable and deletable

##Demo##

[Example](http://zgs225.github.io/easy-tree)

1. git clone https://github.com/zgs225/easy-tree.git
2. npm install
3. grunt

##Usage##

    <div class='easy-tree'>
        <ul>
            <li>Example 1</li>
            <li>Example 2</li>
            <li>Example 3</li>
            <li>Example 4</li>
        <ul>
    </div>

    $('.easy-tree').EasyTree();


##Options##

**selectable**: the tree can be selected or not. Default true.

**deletable**: the tree's node can be deleted or not. Default false.

**editable**: the tree's node can be edited or not. Default false.

**addable**: can create node for the tree or not. Default false.

##i18n##

    $('.easy-tree').EasyTree({
        i18n: {
            ...
            TODO
        }
    });

##Dependencies##

+ jQuery
+ Bootstrap 3


