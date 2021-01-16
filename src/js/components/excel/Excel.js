import {$} from "../../core/dom";

export class Excel{
    constructor(selector, options) {
        this.$el = $(selector);
        this.components = options.components || [];
    }

    getRoot(){

        // обёртка для элементов
        const $root = $.create('div', 'excel');

        this.components.forEach(Component =>{
           // в статических полях класса мы объявили название CSS класса
           const $el = $.create('div', Component.className);

           // создаём экземпляр класса
           const component = new Component($el);
           // получаем его HTML
           $el.html(component.toHTML());
           // добавляем внутрь обёртки
           $root.append($el);
       });

        return $root;

    }
    render(){
        this.$el.append(this.getRoot());
    }
}