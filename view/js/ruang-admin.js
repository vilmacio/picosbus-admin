
(function ($) {
  "use strict"; // Start of use strict

  document.addEventListener("DOMContentLoaded", function () {
    if (!window.location.pathname.includes('login')) {
      console.log('verificando token...')
      const token = localStorage.getItem('pb-token')
      if (token) {
        console.log('tem token')
      } else {
        window.location.href = '/login.html'
      }
    }
  });

  // Toggle the side navigation
  $("#sidebarToggle, #sidebarToggleTop").on('click', function (e) {
    $("body").toggleClass("sidebar-toggled");
    $(".sidebar").toggleClass("toggled");
    if ($(".sidebar").hasClass("toggled")) {
      $('.sidebar .collapse').collapse('hide');
    };
  });

  // Close any open menu accordions when window is resized below 768px
  $(window).resize(function () {
    if ($(window).width() < 768) {
      $('.sidebar .collapse').collapse('hide');
    };
  });

  // Prevent the content wrapper from scrolling when the fixed side navigation hovered over
  $('body.fixed-nav .sidebar').on('mousewheel DOMMouseScroll wheel', function (e) {
    if ($(window).width() > 768) {
      var e0 = e.originalEvent,
        delta = e0.wheelDelta || -e0.detail;
      this.scrollTop += (delta < 0 ? 1 : -1) * 30;
      e.preventDefault();
    }
  });

  // Scroll to top button appear
  $(document).on('scroll', function () {
    var scrollDistance = $(this).scrollTop();
    if (scrollDistance > 100) {
      $('.scroll-to-top').fadeIn();
    } else {
      $('.scroll-to-top').fadeOut();
    }
  });

  // Smooth scrolling using jQuery easing
  $(document).on('click', 'a.scroll-to-top', function (e) {
    var $anchor = $(this);
    $('html, body').stop().animate({
      scrollTop: ($($anchor.attr('href')).offset().top)
    }, 1000, 'easeInOutExpo');
    e.preventDefault();
  });

})(jQuery); // End of use strict

// Modal Javascript

$(document).ready(function () {
  $("#myBtn").click(function () {
    $('.modal').modal('show');
  });

  $("#modalLong").click(function () {
    $('.modal').modal('show');
  });

  $("#modalScroll").click(function () {
    $('.modal').modal('show');
  });

  $('#modalCenter').click(function () {
    $('.modal').modal('show');
  });
});

// Popover Javascript

$(function () {
  $('[data-toggle="popover"]').popover()
});
$('.popover-dismiss').popover({
  trigger: 'focus'
});


// Version in Sidebar

var version = document.getElementById('version-ruangadmin');

version.innerHTML = "Version 1.1";


// Tabela de rotas
async function getData() {
  const fetchResponse = await fetch('http://localhost:3000/api/rotas', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  })

  const data = await fetchResponse.json()

  return data
}

async function mountTable() {
  const routes = await getData()
  
  const table = document.getElementById("tabela_rotas");

  routes.forEach(route => {

    const row = table.insertRow();

    const idCell = row.insertCell(0);
    const cidadeCell = row.insertCell(1);
    const startCell = row.insertCell(2);
    const endCell = row.insertCell(3);
    const statusCell = row.insertCell(4);
    const actionCell = row.insertCell(5);

    idCell.innerHTML = `<a href="#">${route.id}</a>`;
    cidadeCell.innerHTML = `${route.cidade.nome} - ${route.cidade.uf}`;
    startCell.innerHTML = route.ponto_origem.bairro;
    endCell.innerHTML = route.ponto_destino.bairro;
    statusCell.innerHTML = `<span class="badge badge-success">Ativo</span>`;
    actionCell.innerHTML = `<a href="rota.html?id=${route.id}" class="btn btn-sm btn-primary">Detalhes</a>`;
  })
}

mountTable()
