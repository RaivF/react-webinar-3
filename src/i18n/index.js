import translate from "./translate";

class I18nService {
  /**
   * @param services {Services} Менеджер сервисов
   * @param config {Object}
   */
  constructor(services, config = {}) {
    this.services = services;
    this.config = config;
    this.lang = this.config.lang;
    this.listeners = [];
  }

  setLang = (lang) => {
    this.lang = lang;
    this.notify();
  }

  t = (text, number) => {
    return translate(this.lang, text, number);
  }

  getState = () => {
    return this.lang;
  }

  subscribe = (listener) => {
    this.listeners.push(listener);

    return () => {
      this.listeners = this.listeners.filter(item => item !== listener);
    }
  }

  notify = () => {
    this.listeners.forEach(listener => listener(this.getState()));
  }
}

export default I18nService;
