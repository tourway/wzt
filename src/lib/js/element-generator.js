
export default class ElementGenerator {
  /**
   * 元素生成器
   * @param {object} 任意名称的对象 自定义对象
   *   @property {string} type 元素类型
   *   @property {string} id 元素 Id 名称
   *   @property {string} html innerHTML 的方法内容
   *   @property {string} className 元素 class 名称
   *   @property {string} text 元素的 innerText
   *   @property {string} value 元素的 value
   *   @property {object} attrs 元素自己的属性
   *   @property {object} dataObj 元素的自定义属性
   * @param {string} defaultClassName 默认的类名
   * @return {DOM element} 已创建的元素
   */
  static single({
    type = 'div',
    id,
    className,
    text,
    dataObj,
    value,
    attrs,
    html
  }, defaultClassName = '') {
    const element = document.createElement(type);

    if (id) {
      element.id = id;
    }

    if (className) {
      element.className = className;
    }
    element.className += ` ${defaultClassName}`;

    if (text) {
      element.textContent = text;
    } else if (value) {
      element.value = value;
    } else if (html) {
      element.innerHTML = html;
    }

    if (attrs) {
      const keys = Object.keys(attrs);

      keys.forEach((key) => {
        const attrsValue = attrs[key];
        if (attrsValue) {
          element.setAttribute(key, attrsValue);
        }
      });
    }

    if (dataObj) {
      const keys = Object.keys(dataObj);

      keys.forEach((key) => {
        element.setAttribute(`data-${key}`, dataObj[key]);
      });
    }

    return element;
  }

  /**
   * 元素片段生成器
   * @param  {number} number 生成数量
   * @param  {...argment} node 元素节点
   * @return {DOM element} 已创建的元素片段
   */
  static fragmentRest(number = 0, ...node) {
    return ElementGenerator.fragment(number, node);
  }

  /**
   * 元素片段生成器
   * @param  {number} number 生成数量
   * @param  {array} nodeList 元素节点列表
   * @return {DOM element} 已创建的元素片段
   */
  static fragment(number = 0, nodeList) {
    const fragment = document.createDocumentFragment();

    if (number > 1) {
      for (let i = number - 1; i >= 0; i -= 1) {
        fragment.appendChild(nodeList[0]);
      }
    } else {
      nodeList.forEach((n) => {
        if (!n.nodeType) {
          fragment.appendChild(ElementGenerator.single(n));
        } else {
          fragment.appendChild(n);
        }
      });
    }

    return fragment;
  }
}
