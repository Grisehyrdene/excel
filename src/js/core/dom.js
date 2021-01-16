class Dom {
    constructor(selector) {

        // если передали сюда строку, которая означает селектор, который
        // нам нужен, например #app или .button, то он при помощи этого селектора найдёт ноду в документе
        // если передали непосредственное ноду, то он использует её.

        this.$el = typeof selector === 'string'
            ? document.querySelector(selector)
            : selector;
    }

    // При передачи строки, метод записывает её в виде html.
    html(html){
        if(typeof html === 'string'){
            this.$el.innerHTML = html;

            // возврат this
            // используется для того, чтобы выполнялся шаблон chain
            // то есть можно создавать цепочку вызовов.
            return this;
        }
        // иначе возвращает внешний html без пробелов (trim()).

        return this.$el.outerHTML.trim();
    }

    clear(){
        this.html('');
        return this;
    }

    append(node){
        // если node экземпляр класса
        if (node instanceof Dom){
            node = node.$el;
        }

        // создание полифила
        if(Element.prototype.append){
            this.$el.append(node);
        }else{
            this.$el.appendChild(node);
        }
        // возвращаем для поддержания цепочки
        return this;
    }
}

export function $(selector) {
    return new Dom(selector);
}


$.create = (tagName, classes = '') => {
    const el = document.createElement(tagName);
    if (classes) {
        el.classList.add(classes);
    }
    return $(el);
}

