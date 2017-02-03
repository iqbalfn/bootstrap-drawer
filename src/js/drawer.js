/* ========================================================================
 * Bootstrap Drawer: drawer.js v1.0.0
 * http://iqbalfn.com/bootstrap-drawer
 * ========================================================================
 * Copyright 2011-2016 Iqbal Fauzi.
 * Licensed under MIT (https://github.com/iqbalfn/bootstrap-drawer/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
    'use strict';
  
    // DRAWER CLASS DEFINITION
    // =======================

    var Drawer = function (element, options) {
        this.options             = options;
        this.$body               = $(document.body);
        this.$element            = $(element);
        this.$dialog             = this.$element.find('.drawer-dialog');
        this.$backdrop           = null;
        this.isShown             = null;
        this.originalBodyPad     = null;
        this.scrollbarWidth      = 0;
        this.ignoreBackdropClick = false;
        
        this.$element.on('click.dismiss.bs.drawer', '[data-dismiss="drawer"]', $.proxy(this.hide, this));
    }
    
    Drawer.VERSION  = '1.0.0';
    
    Drawer.TRANSITION_DURATION = 300;
    Drawer.BACKDROP_TRANSITION_DURATION = 300;
    
    Drawer.DEFAULTS = {
        backdrop: true,
        keyboard: true,
        show: true
    }
    
    Drawer.prototype.toggle = function (_relatedTarget) {
        return this.isShown ? this.hide() : this.show(_relatedTarget);
    }
    
    Drawer.prototype.show = function(_relatedTarget){
        var that = this;
        var e    = $.Event('show.bs.drawer', { relatedTarget: _relatedTarget });
        this.$element.trigger(e);
        
        if(this.isShown || e.isDefaultPrevented())
            return;
        
        this.isShown = true;
        
        this.checkScrollbar();
        this.setScrollbar();
        
        this.$body.addClass('drawer-open');
        
        if(!this.$backdrop){
            this.$backdrop = $('<div class="drawer-backdrop"></div>');
            this.$body.append(this.$backdrop);
            this.$backdrop.data('bs.drawer', this);
            this.$backdrop.click(function(e){
                $(this).data('bs.drawer').hide(e);
            });
        }
        
        setTimeout(function(el){ el.addClass('active'); }, 10, this.$backdrop);
        
        this.$element.addClass('active');
        this.$body.on('keydown.dismiss.bs.drawer', function(e){
            if(e.keyCode === 27)
                that.hide(e);
        });
        
        var e = $.Event('shown.bs.drawer', { relatedTarget: _relatedTarget });
        setTimeout(function(that,e){that.$element.trigger(e);}, Drawer.TRANSITION_DURATION, that, e);
    }
    
    Drawer.prototype.hide = function(e){
        if(e)
            e.preventDefault();
        var that = this;
        
        e = $.Event('hide.bs.drawer');
        
        this.$element.trigger(e);
        
        if(!this.isShown || e.isDefaultPrevented())
            return;
        
        this.isShown = false;
        
        this.$backdrop.removeClass('active');
        this.$element.removeClass('active');
        this.$body.off('keydown.dismiss.bs.drawer');
        
        setTimeout(function(that){
            that.$element.trigger('hidden.bs.drawer');
            that.$body.removeClass('drawer-open');
            that.resetScrollbar();
        }, Drawer.TRANSITION_DURATION, that);
    }
    
    Drawer.prototype.checkScrollbar = function () {
        var fullWindowWidth = window.innerWidth;
        if (!fullWindowWidth) { // workaround for missing window.innerWidth in IE8
            var documentElementRect = document.documentElement.getBoundingClientRect();
            fullWindowWidth = documentElementRect.right - Math.abs(documentElementRect.left);
        }
        this.bodyIsOverflowing = document.body.clientWidth < fullWindowWidth;
        this.scrollbarWidth = this.measureScrollbar();
    }
    
    Drawer.prototype.setScrollbar = function () {
        var bodyPad = parseInt((this.$body.css('padding-right') || 0), 10);
        this.originalBodyPad = document.body.style.paddingRight || '';
        if(this.bodyIsOverflowing)
            this.$body.css('padding-right', bodyPad + this.scrollbarWidth);
    }
    
    Drawer.prototype.measureScrollbar = function () { // thx walsh
        var scrollDiv = document.createElement('div');
        scrollDiv.className = 'drawer-scrollbar-measure';
        this.$body.append(scrollDiv);
        var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
        this.$body[0].removeChild(scrollDiv);
        return scrollbarWidth;
    }
    
    Drawer.prototype.resetScrollbar = function () {
        this.$body.css('padding-right', this.originalBodyPad);
    }
  
    // DRAWER PLUGIN DEFINITION
    // ========================

    function Plugin(option, _relatedTarget) {
        return this.each(function () {
            var $this   = $(this);
            var data    = $this.data('bs.drawer');
            var options = $.extend({}, Drawer.DEFAULTS, $this.data(), typeof option == 'object' && option);

            if (!data)
                $this.data('bs.drawer', (data = new Drawer(this, options)));
            
            if (typeof option == 'string')
                data[option](_relatedTarget);
            else if (options.show)
                data.show(_relatedTarget);
        });
    }

    var old = $.fn.drawer;

    $.fn.drawer             = Plugin;
    $.fn.drawer.Constructor = Drawer;


    // DRAWER NO CONFLICT
    // =================

    $.fn.drawer.noConflict = function(){
        $.fn.drawer = old;
        return this;
    }
  
    // DRAWER DATA-API
    // ===============
    
    $(document).on('click.bs.drawer.data-api', '[data-toggle="drawer"]', function (e) {
        var $this   = $(this);
        var href    = $this.attr('href');
        var $target = $($this.attr('data-target') || (href && href.replace(/.*(?=#[^\s]+$)/, ''))); // strip for ie7
        var option  = $target.data('bs.drawer') ? 'toggle' : $.extend({}, $target.data(), $this.data());

        if($this.is('a'))
            e.preventDefault();
        
        Plugin.call($target, option, this)
    });
}(jQuery);