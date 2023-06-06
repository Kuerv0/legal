export function newDocument(attrs) {
  const defaultAttrs = {
    tipo: 'Documento',
    informacion: 'Descripción',
    anio: new Date().getFullYear(),
    numero: new Date().getTime(),
  };

  const mergedAttrs = {
    ...defaultAttrs,
    ...attrs,
  };

  const document = {
    ...mergedAttrs,
    id_cuerpo_colegiado: 1,
    id_usuario: 11,
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
