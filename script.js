/* ========================================
   FUNDACION RAFAEL NADAL - SCRIPT.JS
   Compatible: Chrome, Firefox, Safari, Edge
======================================== */

(function() {
    'use strict';
  
    // ===== NUMERO DE WHATSAPP =====
    var WHATSAPP_NUMBER = '18437034758';
  
    // ===== MENU MOVIL =====
    var menuToggle = document.getElementById('menuToggle');
    var nav = document.getElementById('nav');
  
    if (menuToggle && nav) {
      menuToggle.addEventListener('click', function() {
        var isOpen = nav.classList.contains('open');
        if (isOpen) {
          nav.classList.remove('open');
          menuToggle.setAttribute('aria-expanded', 'false');
        } else {
          nav.classList.add('open');
          menuToggle.setAttribute('aria-expanded', 'true');
        }
      });
  
      // Cerrar menu al hacer click en un enlace
      var navLinks = nav.querySelectorAll('a');
      for (var i = 0; i < navLinks.length; i++) {
        navLinks[i].addEventListener('click', function() {
          nav.classList.remove('open');
          menuToggle.setAttribute('aria-expanded', 'false');
        });
      }
  
      // Cerrar menu al hacer click fuera
      document.addEventListener('click', function(e) {
        if (!nav.contains(e.target) && !menuToggle.contains(e.target)) {
          nav.classList.remove('open');
        }
      });
    }
  
    // ===== HEADER SCROLL EFFECT =====
    var header = document.getElementById('header');
    if (header) {
      window.addEventListener('scroll', function() {
        if (window.scrollY > 60) {
          header.style.background = 'rgba(0, 20, 70, 1)';
          header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.3)';
        } else {
          header.style.background = 'rgba(0, 30, 80, 0.97)';
          header.style.boxShadow = 'none';
        }
      });
    }
  
    // ===== SMOOTH SCROLL =====
    var anchorLinks = document.querySelectorAll('a[href^="#"]');
    for (var j = 0; j < anchorLinks.length; j++) {
      anchorLinks[j].addEventListener('click', function(e) {
        var targetId = this.getAttribute('href');
        if (targetId === '#') return;
        var target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          var headerHeight = header ? header.offsetHeight : 0;
          var targetPos = target.getBoundingClientRect().top + window.pageYOffset - headerHeight - 10;
          smoothScrollTo(targetPos, 700);
        }
      });
    }
  
    function smoothScrollTo(targetY, duration) {
      var startY = window.pageYOffset;
      var diff = targetY - startY;
      var startTime = null;
  
      function step(currentTime) {
        if (!startTime) startTime = currentTime;
        var elapsed = currentTime - startTime;
        var progress = Math.min(elapsed / duration, 1);
        var ease = easeInOut(progress);
        window.scrollTo(0, startY + diff * ease);
        if (elapsed < duration) {
          window.requestAnimationFrame(step);
        }
      }
  
      if (window.requestAnimationFrame) {
        window.requestAnimationFrame(step);
      } else {
        window.scrollTo(0, targetY);
      }
    }
  
    function easeInOut(t) {
      return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    }
  
    // ===== ANIMACION DE CONTADORES EN ESTADISTICAS =====
    var statsAnimated = false;
  
    function animateCounters() {
      if (statsAnimated) return;
      var statsSection = document.querySelector('.estadisticas');
      if (!statsSection) return;
  
      var rect = statsSection.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        statsAnimated = true;
        var nums = statsSection.querySelectorAll('.stat-numero');
        var targets  = [12000, 47, 2.5, 15];
        var prefixes = ['+',   '',  '$', ''];
        var suffixes = [',000','', 'M+', ''];
  
        for (var k = 0; k < nums.length; k++) {
          (function(el, target, prefix, suffix) {
            var duration = 1800;
            var startTime = null;
  
            function count(currentTime) {
              if (!startTime) startTime = currentTime;
              var elapsed  = currentTime - startTime;
              var progress = Math.min(elapsed / duration, 1);
              var ease     = easeInOut(progress);
              var current  = target * ease;
  
              el.textContent = target === 2.5
                ? prefix + current.toFixed(1) + suffix
                : prefix + Math.floor(current).toLocaleString() + suffix;
  
              if (elapsed < duration) {
                window.requestAnimationFrame(count);
              } else {
                el.textContent = target === 2.5
                  ? prefix + target.toFixed(1) + suffix
                  : prefix + target.toLocaleString() + suffix;
              }
            }
  
            if (window.requestAnimationFrame) {
              window.requestAnimationFrame(count);
            }
          })(nums[k], targets[k], prefixes[k], suffixes[k]);
        }
      }
    }
  
    window.addEventListener('scroll', animateCounters);
    animateCounters();
  
    // ===== ANIMACION DE ENTRADA EN CARDS =====
    var animatables = document.querySelectorAll('.ayuda-card, .testimonio-card, .paso');
    for (var m = 0; m < animatables.length; m++) {
      animatables[m].style.opacity    = '0';
      animatables[m].style.transform  = 'translateY(24px)';
      animatables[m].style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    }
  
    function animateOnScroll() {
      var cards = document.querySelectorAll('.ayuda-card, .testimonio-card, .paso');
      for (var i = 0; i < cards.length; i++) {
        var rect = cards[i].getBoundingClientRect();
        if (rect.top < window.innerHeight - 60) {
          cards[i].style.opacity   = '1';
          cards[i].style.transform = 'translateY(0)';
        }
      }
    }
  
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll();
  
    // ===== EFECTO PARALLAX EN HERO =====
    var heroBg = document.querySelector('.hero-bg');
    if (heroBg) {
      window.addEventListener('scroll', function() {
        var scrollY = window.pageYOffset;
        if (scrollY < window.innerHeight) {
          heroBg.style.transform = 'translateY(' + (scrollY * 0.3) + 'px)';
        }
      });
    }
  
    // ===== RESALTAR ENLACE ACTIVO EN NAVEGACION =====
    var sections = document.querySelectorAll('section[id]');
    var navItems = document.querySelectorAll('#nav ul li a');
  
    function updateActiveNav() {
      var scrollPos = window.pageYOffset + 100;
      for (var i = 0; i < sections.length; i++) {
        var section = sections[i];
        var top    = section.offsetTop;
        var bottom = top + section.offsetHeight;
        if (scrollPos >= top && scrollPos < bottom) {
          for (var j = 0; j < navItems.length; j++) {
            navItems[j].style.color = '';
          }
          var activeLink = document.querySelector('#nav ul li a[href="#' + section.id + '"]');
          if (activeLink && !activeLink.classList.contains('btn-nav')) {
            activeLink.style.color = '#c9a84c';
          }
          break;
        }
      }
    }
  
    window.addEventListener('scroll', updateActiveNav);
    updateActiveNav();
  
    // ===== TOOLTIP EN TABLA =====
    var listaItems = document.querySelectorAll('.lista-item');
    for (var n = 0; n < listaItems.length; n++) {
      listaItems[n].setAttribute('title', 'Haz clic en "Solicitar" para aplicar a este monto');
    }
  
    // ===== LAZY LOAD IMAGENES =====
    if ('IntersectionObserver' in window) {
      var lazyImgs = document.querySelectorAll('img[loading="lazy"]');
      var imgObserver = new IntersectionObserver(function(entries) {
        for (var i = 0; i < entries.length; i++) {
          if (entries[i].isIntersecting) {
            var img = entries[i].target;
            if (img.dataset.src) img.src = img.dataset.src;
            imgObserver.unobserve(img);
          }
        }
      }, { rootMargin: '100px' });
  
      for (var p = 0; p < lazyImgs.length; p++) {
        imgObserver.observe(lazyImgs[p]);
      }
    }
  
    // ===== MENSAJE DE EXITO GLOBAL =====
    function mostrarExito(msg) {
      var existente = document.getElementById('msgExito');
      if (existente) existente.parentNode.removeChild(existente);
  
      var div = document.createElement('div');
      div.id = 'msgExito';
      div.style.cssText = [
        'position:fixed',
        'top:90px',
        'left:50%',
        'transform:translateX(-50%)',
        'background:#1a7f37',
        'color:#fff',
        'padding:16px 30px',
        'border-radius:10px',
        'font-family:Arial,Helvetica,sans-serif',
        'font-size:14px',
        'font-weight:700',
        'z-index:99999',
        'box-shadow:0 8px 30px rgba(0,0,0,0.25)',
        'text-align:center',
        'max-width:90%',
        'line-height:1.5'
      ].join(';');
  
      div.innerHTML = msg || '&#10003; ¡Accion completada!';
      document.body.appendChild(div);
  
      setTimeout(function() {
        if (div && div.parentNode) div.parentNode.removeChild(div);
      }, 5000);
    }
  
    // ===== HELPERS DE VALIDACION =====
    function showError(fieldId, msg) {
      var field   = document.getElementById(fieldId);
      var errorEl = document.getElementById('error-' + fieldId);
      if (field)   field.classList.add('error');
      if (errorEl) errorEl.textContent = msg;
    }
  
    function clearError(fieldId) {
      var field   = document.getElementById(fieldId);
      var errorEl = document.getElementById('error-' + fieldId);
      if (field)   field.classList.remove('error');
      if (errorEl) errorEl.textContent = '';
    }
  
    // ===== FORMULARIO DE SOLICITUD =====
    var form       = document.getElementById('solicitudForm');
    var btnEnviar  = document.getElementById('btnEnviar');
    var btnTexto   = document.getElementById('btnTexto');
    var btnLoading = document.getElementById('btnLoading');
  
    if (form) {
      form.addEventListener('submit', function(e) {
        e.preventDefault();
  
        var nombre   = document.getElementById('nombre');
        var apellido = document.getElementById('apellido');
        var ciudad   = document.getElementById('ciudad');
        var telefono = document.getElementById('telefono');
        var monto    = document.getElementById('monto');
        var mensaje  = document.getElementById('mensaje');
  
        var valid = true;
  
        clearError('nombre');
        clearError('apellido');
        clearError('ciudad');
        clearError('telefono');
        clearError('monto');
  
        if (!nombre.value.trim() || nombre.value.trim().length < 2) {
          showError('nombre', 'Por favor ingresa tu nombre completo.');
          valid = false;
        }
        if (!apellido.value.trim() || apellido.value.trim().length < 2) {
          showError('apellido', 'Por favor ingresa tu apellido.');
          valid = false;
        }
        if (!ciudad.value.trim() || ciudad.value.trim().length < 3) {
          showError('ciudad', 'Por favor ingresa tu ciudad y pais.');
          valid = false;
        }
        if (!telefono.value.trim().replace(/\s+/g, '') || telefono.value.trim().replace(/\s+/g, '').length < 7) {
          showError('telefono', 'Por favor ingresa un numero de telefono valido.');
          valid = false;
        }
        if (!monto.value) {
          showError('monto', 'Por favor selecciona el monto de ayuda que deseas.');
          valid = false;
        }
  
        if (!valid) return;
  
        // Mostrar loading
        btnTexto.style.display  = 'none';
        btnLoading.style.display = 'inline';
        btnEnviar.disabled = true;
  
        // Construir mensaje WhatsApp
        var mensajeWA = '';
        mensajeWA += '🌟 *NUEVA SOLICITUD - FUNDACION RAFAEL NADAL* 🌟\n\n';
        mensajeWA += '━━━━━━━━━━━━━━━━━━━━━\n';
        mensajeWA += '👤 *Nombre:* ' + nombre.value.trim() + ' ' + apellido.value.trim() + '\n';
        mensajeWA += '📍 *Ciudad:* ' + ciudad.value.trim() + '\n';
        mensajeWA += '📱 *Telefono:* ' + telefono.value.trim() + '\n';
        mensajeWA += '💰 *Monto Solicitado:* ' + monto.value + '\n';
        if (mensaje && mensaje.value.trim()) {
          mensajeWA += '📝 *Mensaje:* ' + mensaje.value.trim() + '\n';
        }
        mensajeWA += '━━━━━━━━━━━━━━━━━━━━━\n';
        mensajeWA += '✅ _Solicitud enviada desde la pagina web oficial._';
  
        var urlWhatsApp = 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(mensajeWA);
  
        // Abrir WhatsApp directamente (evita bloqueos en Safari/iPhone)
        var linkWA = document.createElement('a');
        linkWA.href   = urlWhatsApp;
        linkWA.target = '_blank';
        linkWA.rel    = 'noopener noreferrer';
        document.body.appendChild(linkWA);
        linkWA.click();
        document.body.removeChild(linkWA);
  
        // Restaurar boton y limpiar
        btnTexto.style.display   = 'inline';
        btnLoading.style.display = 'none';
        btnEnviar.disabled = false;
        form.reset();
        mostrarExito('&#10003; ¡Solicitud enviada! Pronto te contactaremos por WhatsApp.');
      });
    }
  
    // ===== SISTEMA DE OPINIONES =====
    var opinionForm          = document.getElementById('opinionForm');
    var comentariosContainer = document.getElementById('comentariosPublicos');
    var starBtns             = document.querySelectorAll('.star-btn');
    var opinionRating        = 0;
  
    // Estrellas interactivas
    for (var s = 0; s < starBtns.length; s++) {
      starBtns[s].addEventListener('mouseover', function() {
        var val = parseInt(this.getAttribute('data-val'));
        for (var x = 0; x < starBtns.length; x++) {
          starBtns[x].classList.toggle('activa', parseInt(starBtns[x].getAttribute('data-val')) <= val);
        }
      });
      starBtns[s].addEventListener('mouseout', function() {
        for (var x = 0; x < starBtns.length; x++) {
          starBtns[x].classList.toggle('activa', parseInt(starBtns[x].getAttribute('data-val')) <= opinionRating);
        }
      });
      starBtns[s].addEventListener('click', function() {
        opinionRating = parseInt(this.getAttribute('data-val'));
        for (var x = 0; x < starBtns.length; x++) {
          starBtns[x].classList.toggle('activa', parseInt(starBtns[x].getAttribute('data-val')) <= opinionRating);
        }
        var errStars = document.getElementById('error-op-stars');
        if (errStars) errStars.textContent = '';
      });
    }
  
    function getIniciales(nombre) {
      var partes = nombre.trim().split(' ');
      if (partes.length >= 2) return (partes[0][0] + partes[1][0]).toUpperCase();
      return partes[0].substring(0, 2).toUpperCase();
    }
  
    function generarEstrellas(n) {
      var html = '';
      for (var i = 1; i <= 5; i++) {
        html += '<span style="color:' + (i <= n ? '#c9a84c' : 'rgba(255,255,255,0.2)') + '">&#9733;</span>';
      }
      return html;
    }
  
    function getFecha() {
      var d = new Date();
      var meses = ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'];
      return d.getDate() + ' ' + meses[d.getMonth()] + ' ' + d.getFullYear();
    }
  
    function crearTarjetaComentario(id, nombre, ciudad, monto, comentario, estrellas, fecha) {
      var div = document.createElement('div');
      div.className = 'comentario-publico';
      div.setAttribute('data-id', id);
      div.innerHTML =
        '<div class="test-stars">' + generarEstrellas(estrellas) + '</div>' +
        '<p class="test-texto">"' + comentario + '"</p>' +
        '<div class="test-persona">' +
          '<div class="avatar-iniciales">' + getIniciales(nombre) + '</div>' +
          '<div class="test-info">' +
            '<strong>' + nombre + '</strong>' +
            '<span>' + ciudad + '</span>' +
            '<span class="test-monto">Recibio: ' + monto + '</span>' +
            '<span class="comentario-fecha">Publicado el ' + fecha + '</span>' +
          '</div>' +
        '</div>';
      return div;
    }
  
    if (opinionForm) {
      opinionForm.addEventListener('submit', function(e) {
        e.preventDefault();
  
        var opNombre     = document.getElementById('op-nombre');
        var opCiudad     = document.getElementById('op-ciudad');
        var opMonto      = document.getElementById('op-monto');
        var opComentario = document.getElementById('op-comentario');
        var errStars     = document.getElementById('error-op-stars');
        var valid2       = true;
  
        clearError('op-nombre');
        clearError('op-ciudad');
        clearError('op-monto');
        clearError('op-comentario');
        if (errStars) errStars.textContent = '';
  
        if (!opNombre.value.trim() || opNombre.value.trim().length < 2) {
          showError('op-nombre', 'Escribe tu nombre.');
          valid2 = false;
        }
        if (!opCiudad.value.trim() || opCiudad.value.trim().length < 2) {
          showError('op-ciudad', 'Escribe tu ciudad.');
          valid2 = false;
        }
        if (!opMonto.value) {
          showError('op-monto', 'Selecciona el monto.');
          valid2 = false;
        }
        if (!opComentario.value.trim() || opComentario.value.trim().length < 10) {
          showError('op-comentario', 'Escribe un comentario de al menos 10 caracteres.');
          valid2 = false;
        }
        if (opinionRating === 0) {
          if (errStars) errStars.textContent = 'Por favor selecciona una calificacion de estrellas.';
          valid2 = false;
        }
  
        if (!valid2) return;
  
        var nuevoId = 'com-' + Date.now();
        var tarjeta = crearTarjetaComentario(
          nuevoId,
          opNombre.value.trim(),
          opCiudad.value.trim(),
          opMonto.value,
          opComentario.value.trim(),
          opinionRating,
          getFecha()
        );
  
        if (comentariosContainer.firstChild) {
          comentariosContainer.insertBefore(tarjeta, comentariosContainer.firstChild);
        } else {
          comentariosContainer.appendChild(tarjeta);
        }
  
        opinionForm.reset();
        opinionRating = 0;
        for (var x = 0; x < starBtns.length; x++) {
          starBtns[x].classList.remove('activa');
        }
  
        setTimeout(function() {
          tarjeta.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 100);
  
        mostrarExito('&#10003; ¡Tu comentario fue publicado!');
      });
    }
  
    // ===== SISTEMA ADMIN: CTRL+SHIFT+D =====
    var adminModal     = document.getElementById('adminModal');
    var adminClave     = document.getElementById('adminClave');
    var adminCancelar  = document.getElementById('adminCancelar');
    var adminConfirmar = document.getElementById('adminConfirmar');
    var ADMIN_PASS     = 'admin123';
    var pendienteEliminarId = null;
  
    document.addEventListener('keydown', function(e) {
      if (e.ctrlKey && e.shiftKey && (e.key === 'D' || e.key === 'd')) {
        e.preventDefault();
        pendienteEliminarId = null;
        mostrarModalAdmin();
      }
      if (e.key === 'Escape' && adminModal && adminModal.style.display !== 'none') {
        cerrarModalAdmin();
      }
    });
  
    function mostrarModalAdmin() {
      if (!adminModal) return;
      adminModal.style.display = 'flex';
      var errAdmin = document.getElementById('error-admin');
      if (errAdmin) errAdmin.textContent = '';
      if (adminClave) {
        adminClave.value = '';
        setTimeout(function() { adminClave.focus(); }, 100);
      }
    }
  
    function cerrarModalAdmin() {
      if (adminModal) adminModal.style.display = 'none';
      pendienteEliminarId = null;
    }
  
    if (adminCancelar)  adminCancelar.addEventListener('click', cerrarModalAdmin);
    if (adminConfirmar) adminConfirmar.addEventListener('click', verificarAdmin);
  
    if (adminClave) {
      adminClave.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') verificarAdmin();
      });
      adminClave.addEventListener('input', function() {
        if (this.value === ADMIN_PASS) verificarAdmin();
      });
    }
  
    if (adminModal) {
      adminModal.addEventListener('click', function(e) {
        if (e.target === adminModal) cerrarModalAdmin();
      });
    }
  
    function verificarAdmin() {
      var errAdmin = document.getElementById('error-admin');
      if (!adminClave || adminClave.value !== ADMIN_PASS) {
        if (errAdmin) errAdmin.textContent = 'Contrasena incorrecta. Intenta de nuevo.';
        if (adminClave) { adminClave.value = ''; adminClave.focus(); }
        return;
      }
      cerrarModalAdmin();
      if (comentariosContainer) {
        var todos = comentariosContainer.querySelectorAll('.comentario-publico');
        for (var i = 0; i < todos.length; i++) {
          todos[i].parentNode.removeChild(todos[i]);
        }
      }
      mostrarExito('&#10003; Todos los comentarios fueron eliminados.');
    }
  
    console.log('%c FUNDACION RAFAEL NADAL', 'color:#c9a84c;font-size:18px;font-weight:bold;');
    console.log('%c Pagina web cargada correctamente.', 'color:#003087;font-size:13px;');
  
  })();