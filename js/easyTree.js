(function() {
  var $;

  $ = jQuery;

  $.fn.extend({
    EasyTree: function(options) {
      var ALERT_DANGER_CLASS, ALERT_SUCCESS_CLASS, ALERT_WARNING_CLASS, base_alert, bind_node_click_events, clean, clone, collapse_all, collapse_button, collapse_class, common_fixed_top_alert, danger_alert, draw, easy_tree, expand_class, file_icon, init, log, settings, success_alert, unbind_node_click_events, warning_alert;
      log = function(message) {
        if (settings.debug) {
          return console.log(message);
        }
      };
      clone = function(obj) {
        var attr, copy;
        if (null === obj || "object" !== typeof obj) {
          return obj;
        }
        copy = obj.constructor();
        for (attr in obj) {
          if (obj.hasOwnProperty(attr)) {
            copy[attr] = obj[attr];
          }
        }
        return copy;
      };
      success_alert = function(message) {
        return common_fixed_top_alert(message, 'success');
      };
      warning_alert = function(message) {
        return common_fixed_top_alert(message, 'warning');
      };
      danger_alert = function(message) {
        return common_fixed_top_alert(message, 'danger');
      };
      common_fixed_top_alert = function(message, type) {
        var the_alert, the_class, the_container;
        the_container = clone(base_alert);
        if (type === 'success') {
          the_class = clone(ALERT_SUCCESS_CLASS);
        } else if (type === 'warning') {
          the_class = clone(ALERT_WARNING_CLASS);
        } else if (type === 'danger') {
          the_class = clone(ALERT_DANGER_CLASS);
        } else {
          the_class = type.toString;
        }
        the_alert = $(the_container).addClass(the_class).append(message);
        return easy_tree.append(the_alert);
      };
      settings = {
        selectable: true,
        deletable: false,
        editable: false,
        addable: false,
        debug: false,
        i18n: {
          defaultNull: '请选择要删除的项',
          deleteConfirmation: '您确认要执行删除操作吗？',
          confirmButtonLabel: '确认',
          editNull: '请选择要编辑的项。',
          editMultiple: '一次只能编辑一项',
          addMultiple: '请选择一项添加',
          collapseTip: '收起分支',
          expandTip: '展开分支',
          selectTip: '选择',
          unselectTip: '取消选择',
          editTip: '编辑',
          addTip: '添加',
          deleteTip: '删除',
          cancelButtonLabel: '取消'
        }
      };
      base_alert = '<div class="alert alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button> </div>';
      ALERT_SUCCESS_CLASS = 'alert-success';
      ALERT_WARNING_CLASS = 'alert-warning';
      ALERT_DANGER_CLASS = 'alert-danger';
      expand_class = 'glyphicon-folder-open';
      collapse_class = 'glyphicon-folder-close';
      collapse_button = "<span class='glyphicon glyphicon-folder-close'></span>";
      file_icon = '<span class="glyphicon glyphicon-file"></span>';
      settings = $.extend(settings, options);
      easy_tree = this;
      draw = function() {
        return easy_tree.find('li').each(function() {
          var has_children, item;
          has_children = function(item) {
            return $(item).is('li:has(ul)');
          };
          item = $(this);
          if (has_children(item)) {
            item.prepend(clone(collapse_button));
            return item.addClass('parent_li').find('.glyphicon').attr('title', settings.i18n.expandTip);
          } else {
            return item.prepend(clone(file_icon));
          }
        });
      };
      collapse_all = function() {
        return easy_tree.find('li.parent_li > ul > li').hide();
      };
      clean = function() {
        easy_tree.find('li > span.glyphicon').remove();
        return easy_tree.find('li.parent_li').removeClass('parent_li');
      };
      bind_node_click_events = function() {
        return easy_tree.delegate('li.parent_li > .glyphicon', 'click', function(e) {
          var children;
          e.preventDefault();
          e.stopPropagation();
          children = $(this).parent('li.parent_li').find(' > ul > li');
          if (children.is(':visible')) {
            $(this).parent('li.parent_li').trigger('easyTree.collapse');
            log('关闭节点');
            children.hide('fast');
            return $(this).attr('title', settings.i18n.expandTip).addClass(collapse_class).removeClass(expand_class);
          } else {
            $(this).parent('li.parent_li').trigger('easyTree.expand');
            log('打开节点');
            children.show('fast');
            return $(this).attr('title', settings.i18n.collapseTip).addClass(expand_class).removeClass(collapse_class);
          }
        });
      };
      unbind_node_click_events = function() {
        log('解除节点点击事件');
        return easy_tree.undelegate('li.parent_li > .glyphicon', 'click');
      };
      this.draw = function() {
        clean();
        draw();
        return bind_node_click_events();
      };
      this.destroy = function() {
        unbind_node_click_events();
        return clean();
      };
      init = function() {
        log('初始化Easy Tree');
        clean();
        draw();
        collapse_all();
        return bind_node_click_events();
      };
      init();
      return easy_tree;
    }
  });

}).call(this);
