
export default class StorageUtils {
  /**
   * 生成存储对象
   * @param  {Boolean} isSession 是否为临时对象
   * @return {Storage} 存储对象
   */
  static generatorStorage(isSession) { return isSession ? sessionStorage : localStorage; }

  /**
   * 获取存储值
   * @param  {Boolean} isSession 是否为临时对象
   * @param  {Array} keys 键值集合
   * @return {?} 获取到的数据
   */
  static get(isSession, ...keys) {
    const tmp = [];
    const storage = StorageUtils.generatorStorage(isSession);

    keys.forEach((key) => {
      tmp.push(JSON.parse(storage.getItem(key)));
    });

    return tmp.length > 1 ? tmp : tmp[0];
  }

  /**
   * 存储值
   * @param  {Boolean} isSession 是否为临时对象
   * @param  {?} datas 数据集合
   */
  static set(isSession,...datas) {
    const storage = StorageUtils.generatorStorage(isSession);
    datas.forEach(({ key, value }) => {
      try {
        storage.setItem(key, JSON.stringify(value));
      } catch (e) {
        remove(storage, key);
        storage.setItem(key, JSON.stringify(value));
      }
    });
  }

  /**
   * 移除指定存储值
   * @param  {Boolean} isSession 是否为临时对象
   * @param  {?} keys 键值集合
   */
  static remove(isSession, ...keys) {
    const storage = StorageUtils.generatorStorage(isSession);
    keys.forEach((key) => {
      storage.removeItem(key);
    });
  }

  /**
   * 清空存储值
   * @param  {Storage} storage 存储对象
   */
  static clear(isSession) {
    StorageUtils.generatorStorage(isSession).clear();
  }
}
