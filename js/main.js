$(document).ready(() => {
    let isDark = localStore.getItem('hugo-theme-dream-is-dark')
    isDark = isDark ? isDark : window.defaultDark ? 'y' : isDark
  
    function setClassName() {
      return (
        window.backgroundDark || window.backgroundImageDark
          ? localStore.getItem('hugo-theme-dream-is-dark') === 'y'
          : window.darkNav
      )
        ? 'os-theme-light'
        : 'os-theme-dark'
    }
  
    const osInstance = $('body')
      .overlayScrollbars({
        className: setClassName(),
        scrollbars: {
          autoHide: 'scroll',
          clickScrolling: true,
        },
      })
      .overlayScrollbars()
  
    if (window.fixedNav) {
      const nav = $('.dream-nav')
      const fake = $('.fake-dream-nav')
        nav.addClass('fixed').css('background', isDark === 'y' ? window.backgroundDark : window.background)
        $('.dream-single-aside').css('top', 54)
        if (!fake.length) {
          $('<div class="fake-dream-nav" />').css('height', 54).insertBefore(nav)
        }
    }
  
    window.overlayScrollbarsInstance = osInstance
  
    function initFilp() {
      $('.dream-flip-toggle').click(() => {
        $('.flip-container').toggleClass('flip-it')
      })
    }
  
    initFilp()
  })
  