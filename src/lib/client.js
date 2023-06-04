import ky from 'ky';

const PREFIX_URL = import.meta.env.VITE_PREFIX_URL;

export default class Client {
  constructor(prefixUrl = PREFIX_URL) {
    this.httpClient = ky.extend({ prefixUrl });
  }

  getDocuments() {
    return this.httpClient.get('api/timers').json();
  }

  createDocument(data) {
    return this.httpClient.post('api/timers', { json: data });
  }

  updateDocument(data) {
    return this.httpClient.put('api/timers', { json: data });
  }

  deleteDocument(data) {
    return this.httpClient.delete('api/timers', { json: data });
  }

  startDocument(data) {
    return this.httpClient.post('api/timers/start', { json: data });
  }

  stopDocument(data) {
    return this.httpClient.post('api/timers/stop', { json: data });
  }
}
