import Vue from 'vue';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';

// Устанавливаем плагин `Loading`,
// используя глобальный метод `use` с
// передачей дополнительных параметров
Vue.use(Loading, {
  loader: 'dots',
  color: '#5D00FF',
  zIndex: 999,
});

// Создадим пустую ссылку.
let loader = null;

// Показать прелоадер.
function showLoader() {
  // Используем локальную функцию
  // для скрытия прелоадера.
  hideLoader();

  // Показываем прелоадер,
  // используя метод `show` самого плагина,
  // установленного глобально во Vue.
  loader = Vue.$loading.show();
}

// Скрыть прелоадер.
function hideLoader() {
  // Если ссылка не пуста,
  // т.е. существует предыдущий прелоадер.
  if (loader) {
    // а) скрываем прелоадер,
    // используя метод `hide` компонента плагина.
    loader.hide();

    // б) удаляем ссылку на объект.
    loader = null;
  }
}

// Экспортируете как вам удобнее:
// объектом или отдельными функциями.
export default {
  loaderStart: showLoader,
  loaderEnd: hideLoader
}