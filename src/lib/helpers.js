export function newDocument(attrs) {
  const defaultAttrs = {
    id: new Date().getTime(),
    id_cuerpo_colegiado: 1,
    id_usuario: 11,
    tipo: 'Acuerdo',
    informacion: '',
    anio: new Date().getFullYear(),
    numero: '',
  };

  const document = {
    ...defaultAttrs,
    ...attrs,
  };

  return document;
}

export function findById(array, id, cb) {
  array.forEach((el) => {
    if (el.id === id) {
      cb(el);
      return;
    }
  });
}
