# 一个基于jQuery和Bootstrap的树插件
# 将一个基本的无序列别转换成树
# @Copyright yuez.me 2014
# @Author Yuez
# @Version 0.2

$ = jQuery
$.fn.extend
  EasyTree: (options) ->
    # 简单的日志记录
    log = (message) ->
      console.log message if settings.debug

    clone = (obj) ->
      if null == obj or "object" != typeof obj
        return obj
      copy = obj.constructor()
      for attr of obj
        if obj.hasOwnProperty(attr)
          copy[attr] = obj[attr]
      return copy

    success_alert = (message) ->
      common_fixed_top_alert(message, 'success')

    warning_alert = (message) ->
      common_fixed_top_alert(message, 'warning')

    danger_alert = (message) ->
      common_fixed_top_alert(message, 'danger')

    common_fixed_top_alert = (message, type) ->
      the_container = clone base_alert
      if type == 'success'
        the_class = clone ALERT_SUCCESS_CLASS
      else if type == 'warning'
        the_class = clone ALERT_WARNING_CLASS
      else if type == 'danger'
        the_class = clone ALERT_DANGER_CLASS
      else
        the_class = type.toString
      the_alert = $(the_container).addClass(the_class).append(message)
      easy_tree.append(the_alert)

    settings =
      selectable: true
      deletable: false
      editable: false
      addable: false
      debug: false
      i18n:
        defaultNull: '请选择要删除的项'
        deleteConfirmation: '您确认要执行删除操作吗？'
        confirmButtonLabel: '确认'
        editNull: '请选择要编辑的项。'
        editMultiple: '一次只能编辑一项'
        addMultiple: '请选择一项添加'
        collapseTip: '收起分支'
        expandTip: '展开分支'
        selectTip: '选择'
        unselectTip: '取消选择'
        editTip: '编辑'
        addTip: '添加'
        deleteTip: '删除'
        cancelButtonLabel: '取消'

    base_alert = '<div class="alert alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button> </div>'
    ALERT_SUCCESS_CLASS = 'alert-success'
    ALERT_WARNING_CLASS = 'alert-warning'
    ALERT_DANGER_CLASS  = 'alert-danger'
    expand_class    = 'glyphicon-folder-open'
    collapse_class  = 'glyphicon-folder-close'
    collapse_button   = "<span class='glyphicon glyphicon-folder-close'></span>"
    file_icon       = '<span class="glyphicon glyphicon-file"></span>'

    settings = $.extend settings, options

    easy_tree = @

    # 绘制
    draw = ->
      # 识别li为节点还是项
      easy_tree.find('li').each ->
        has_children = (item) ->
          $(item).is('li:has(ul)')

        item = $(@)
        if has_children(item)
          item.prepend(clone(collapse_button))
          item.addClass('parent_li').find('.glyphicon').attr('title', settings.i18n.expandTip)
        else
          item.prepend(clone(file_icon))

    # 关闭所有节点
    collapse_all = ->
      easy_tree.find('li.parent_li > ul > li').hide();

    # 清理
    clean = ->
        easy_tree.find('li > span.glyphicon').remove()
        easy_tree.find('li.parent_li').removeClass 'parent_li'

    # 绑定节点点击事件
    bind_node_click_events = ->
      easy_tree.delegate 'li.parent_li > .glyphicon', 'click', (e) ->
        e.preventDefault()
        e.stopPropagation()
        children = $(@).parent('li.parent_li').find(' > ul > li')
        if children.is(':visible')
          $(@).parent('li.parent_li').trigger('easyTree.collapse')
          log '关闭节点'
          children.hide('fast')
          $(@).attr('title', settings.i18n.expandTip).addClass(collapse_class).removeClass(expand_class)
        else
          $(@).parent('li.parent_li').trigger('easyTree.expand')
          log '打开节点'
          children.show('fast')
          $(@).attr('title', settings.i18n.collapseTip).addClass(expand_class).removeClass(collapse_class)

    # 解绑节点点击事件
    unbind_node_click_events = ->
      log '解除节点点击事件'
      easy_tree.undelegate 'li.parent_li > .glyphicon', 'click'

    @.draw = ->
      clean()
      draw()
      bind_node_click_events()

    @.destroy = ->
      unbind_node_click_events()
      clean()

    init = ->
      log '初始化Easy Tree'
      clean()
      draw()
      collapse_all()
      bind_node_click_events()

    init()



    return easy_tree
