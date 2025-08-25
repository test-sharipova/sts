//menu
window.addEventListener('DOMContentLoaded', () => {
  if (window.innerWidth < 767) {
    const menu = document.querySelector('.menu'),
      menuItem = document.querySelectorAll('.menu li'),
      body = document.querySelector('body'),
      hamburger = document.querySelector('.hamburger');

    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('hamburger_active');
      body.classList.toggle('body_fixed');
      menu.classList.toggle('menu_active');
    });

    menuItem.forEach(item => {
      item.addEventListener('click', () => {
        hamburger.classList.toggle('hamburger_active');
        menu.classList.toggle('menu_active');
        body.classList.toggle('body_fixed');
      });
    });
  }

  //менять иконку сортировки
  $('.cena, .nalichie').on('click', function () {
    $(this).toggleClass('active');
  });

  //маска для телефона

  let element = document.querySelectorAll('.phone');
  let maskOptions = {
    mask: '(000)000-00-00'
  };
  for (let i = 0; i < element.length; i++) {
    let mask = IMask(element[i], maskOptions);
  }

  //показать больше сертификатов
  // Скрываем все элементы кроме первых 6
  $('.sert__list li:gt(5)').hide();

  // Обработчик клика на кнопку
  $('.show-more-sert').on('click', function () {
    // Находим скрытые элементы
    var hiddenElements = $('.sert__list li:hidden');

    // Показываем следующие 6 элементов
    hiddenElements.slice(0, 6).slideDown(300);

    // Скрываем кнопку, если больше нет элементов
    if (hiddenElements.length <= 6) {
      $(this).hide();
    }
  });

  // Скрываем кнопку сразу если элементов меньше или равно 6
  if ($('.sert__list li').length <= 6) {
    $('.show-more-sert').hide();
  }

  //показать больше ФОТО
  if (window.innerWidth > 767) {
    // Скрываем все элементы кроме первых 6
    $('.photos__list li:gt(3)').hide();

    // Обработчик клика на кнопку
    $('.show-more-photos').on('click', function () {
      // Находим скрытые элементы
      var hiddenElements = $('.photos__list li:hidden');

      // Показываем следующие 6 элементов
      hiddenElements.slice(0, 4).slideDown(300);

      // Скрываем кнопку, если больше нет элементов
      if (hiddenElements.length <= 4) {
        $(this).hide();
      }
    });

    // Скрываем кнопку сразу если элементов меньше или равно 6
    if ($('.photos__list li').length <= 4) {
      $('.show-more-photos').hide();
    }
  }

  //загрузить файл

  $('.myfile').change(function () {
    var $input = $(this);
    var $label = $input.prev();
    var $parent = $input.closest('.main-form__download');

    if ($input.val() != '') {
      // Получаем имя файла
      var fileName = $input.val().split('\\').pop();

      // Создаем элемент с крестиком
      $label.html(fileName + '<span class="remove-file"></span>');

      // Добавляем обработчик клика на крестик
      $label.find('.remove-file').click(function (e) {
        e.preventDefault();
        e.stopPropagation(); // Останавливаем всплытие события
        $input.val(''); // Очищаем значение input
        $label.text('Прикрепить файл'); // Возвращаем исходный текст
        $parent.removeClass('file-filled');
        return false; // Дополнительная защита от всплытия
      });



      if ($input.val() !== '') {
        $parent.addClass('file-filled');
      } else {
        $parent.removeClass('file-filled');
      }

    } else {
      $label.text('Прикрепить файл');
    }
  });

  //select
  function customSelect() {
    let select = function () {
      let selectHeader = document.querySelectorAll('.select__header');
      let selectItem = document.querySelectorAll('.select__item');

      selectHeader.forEach(item => {
        item.addEventListener('click', function () {
          // Закрываем все другие селекты перед открытием текущего
          document.querySelectorAll('.select').forEach(select => {
            if (select !== this.parentElement) {
              select.classList.remove('is-active');
            }
          });

          // Переключаем текущий селект
          this.parentElement.classList.toggle('is-active');
        });
      });

      selectItem.forEach(item => {
        item.addEventListener('click', selectChoose)
      });

      function selectChoose() {
        if (!this.closest('.select').classList.contains('checked')) {
          this.closest('.select').classList.add('checked')
        }
        let text = this.innerText,
          select = this.closest('.select'),
          currentText = select.querySelector('.select__header');
        currentText.innerText = text;
        select.classList.remove('is-active');
      }

      // Закрытие при клике вне селекта
      document.addEventListener('click', function (e) {
        if (!e.target.closest('.select')) {
          document.querySelectorAll('.select.is-active').forEach(select => {
            select.classList.remove('is-active');
          });
        }
      });
    };
    select();
  }
  customSelect();

  //modal 
  $('.order').on('click', function () {
    $('.modal, .overlay').fadeIn(0);
    if (window.innerWidth < 767) {
      $('body').addClass('body_fixed');
    }

  });
  $('.modal__close').on('click', function () {
    $('.modal, .overlay, .modal_order').fadeOut(0);
    if (window.innerWidth < 767) {
      $('body').removeClass('body_fixed');
    }
  });

  //добавить заказ

  $('.consult_order').each(function (i) {
    $(this).on('click', function () {
      var newElems = $("<div class='form__input__order__wrap'></div>")
        .append("<input class='form__input__order' disabled>")
        .append("<button type='button' class='remove__input'></button>");



      $('.form__textarea__wrapper').append(newElems);


      $('.form__input__order').val($('.order_name').eq(i).text() + 'x' + $('.order_diametr').eq(i).text() + ',' + $('.order_gosst').eq(i).text() + ',' + $('.order_gosst').eq(i).text());
      $('.overlay, .modal_order').fadeIn(0);

      $('.remove__input, .modal__close').click(function () {

        $('.form__input__order__wrap').remove();

      });
       if (window.innerWidth < 767) {
      $('body').addClass('body_fixed');
    }
    });
   

  });

  //фильтры моб версия

  //инпуты
  $('.show-filter').on('click', function () {
    $('.table__form').addClass('table__form_active');
    if (window.innerWidth < 767) {
      $('body').addClass('body_fixed');
    }

  });

  $('.filter-close-mob').on('click', function () {
    $('.table__form').removeClass('table__form_active');
    if (window.innerWidth < 767) {
      $('body').removeClass('body_fixed');
    }

  });

  $('.form-order__label span').each(function (i) {
    $(this).on('click', function () {
      $('.form-order__label').eq(i).addClass('form-order__label_active');
      $('.close-filer-input').eq(i).addClass('close-filer-input_active');
    });
  });

  $('.close-filer-input').each(function (i) {
    $(this).on('click', function () {
      $('.close-filer-input').removeClass('close-filer-input_active');
      $('.form-order__label').eq(i).removeClass('form-order__label_active');
    });
  });

  $('.close-filter-input2').on('click', function () {
    $('.close-filer-input').removeClass('close-filer-input_active');
    $('.form-order__label').removeClass('form-order__label_active');
  });

  //селекты

  if (window.innerWidth < 767) {

    $('.select__header').each(function (e) {
      $(this).on('click', function () {
        $('.select').eq(e).addClass('select_active');

      });
    });

    $('.select__item, .close-filter-select').on('click', function () {
      $('.select').removeClass('select_active');
      $('.select').removeClass('is-active');
    });


  }


});