import ky from 'ky';

const PREFIX_URL = import.meta.env.VITE_PREFIX_URL;

export default class Client {
  constructor(prefixUrl = PREFIX_URL) {
    this.httpClient = ky.extend({ prefixUrl });
  }

  getDocuments() {
    return this.httpClient.get('api/documentos').json();
  }

  getDocumentById(id) {
    return this.httpClient.get(`api/documentos/${id}`).json();
  }

  createDocument(data) {
    return this.httpClient.post('api/documentos', { json: data }).json();
  }

  updateDocument(data) {
    return this.httpClient.patch(`api/documentos/${data.id}`, { json: data });
  }

  deleteDocumentById(id) {
    return this.httpClient.delete(`api/documentos/${id}`);
  }
}
