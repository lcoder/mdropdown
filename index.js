/**
 * Created by maotingfeng on 16/7/27.
 */
(function( factory ){
    var md = typeof define == "function" ;
    if( typeof module === 'object' && typeof module.exports === 'object' ){
        module.exports = factory() ;
    }else if( md && define.amd ){
        define( ['require','jquery'] , factory ) ;
    }else if( md && define.cmd ) {
        define( 'ymdate' , ['jquery'] , factory ) ;
    }else{
        factory( function(){ return window.jQuery } ) ;
    }
})(function( require ){
    var $ = require('jquery') ;
    // 绑定jquery方法
    $.extend( $.fn , {
        /* dropdown 下拉插件 */
        mdropdown: function( config ){
            var tmpl = '<div class="mdropdown_ui hold_ui"><div class="mdropdown_selected"><span>hold_selected</span></div><div class="mdropdown_options"><ul>hold_options</ul></div></div>' ;
            var settings = { ui: 'mdropdown_blue_ui' , select: $.noop } ;
            $.extend( settings , config ) ;
            function initMDropDown(){
                var $this = $( this ) ,
                    html_dropdown = '' ,
                    html_options = '' ,
                    html_selected = '' ,
                    $options = $this.find("option") ;
                // 默认选中值
                html_selected = $options.filter(':selected').text() ;
                // 生成option
                $options.each( function( index , val ){
                    var $this = $( val ) ,
                        value = $this.val() ,
                        txt = $this.text() ,
                        isOn = html_selected == txt ? 'on' : '' ;
                    html_options += '<li class="' + isOn + '"><a data-value="' + value + '" href="javascript:void(0);">' + txt + '</a></li>' ;
                } ) ;
                // 下拉菜单
                html_dropdown = tmpl.replace( /hold_ui/ , settings.ui ).replace( /hold_selected/ , html_selected ).replace( /hold_options/ , html_options ) ;
                var $dropdown = $( html_dropdown ) ;
                $dropdown.data( '_select' , $this ) ;
                bindEvent( $dropdown ) ;
                $this.hide().after( $dropdown ) ;
            }
            function bindEvent( $dropdown ){
                var $title = $dropdown.find('.mdropdown_selected span') ,
                    $options = $dropdown.find('.mdropdown_options') ;
                $dropdown.on( 'click.mdropdown' , '.mdropdown_selected' , function(){
                    $options.show() ;
                } ).on( 'mouseleave.mdropdown' , function(){
                    $options.hide() ;
                } ).on( 'click.mdropdown' , 'li a' , function(){
                    var $this = $( this ) ,
                        $li = $this.parent() ,
                        value = $this.data('value') ,
                        txt = $this.text() ;
                    // 选中某个值
                    var selected = { value: value , txt: txt } ;
                    $li.addClass('on').siblings().removeClass('on') ;
                    $title.text( selected.txt ) ;
                    $dropdown.data( '_select' ).val( selected.value ) ;
                    settings.select( selected ) ;
                    $options.hide() ;

                } ) ;
            }
            this.each(function(){
                initMDropDown.call( this ) ;
            });
        }
    } ) ;
} );