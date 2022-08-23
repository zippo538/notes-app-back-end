const {nano} = require ('nanoid');
const {notes} = require ('./notes');
const addNoteHandler = (request,h)=> {
    const { title, tags, body } = request.payload;
  const id = nano(16);
  const createdAt = new Date().toISOString();
  const updatedAt = createdAt;
  const newNote = {
    // eslint-disable-next-line no-undef
    title, tags, body, id, createdAt, updatedAt,
  };
  notes.push(newNote);
  const isSuccess = notes.filter((note) => note.id === id).length > 0;

  if (isSuccess) {
    const response = h.response({
      status: 'success',
      message: 'Catatan berhasil ditambahkan',
      data: {
        noteId: id,
      },
    });
    response.statusCode(201);
    return response;
  }
  else {
    const response = h.response({
      status: 'fail',
      message: 'Catatan belum ditambahkan',
  
    });
    response.header('Access-Control-Allow-Origin', '*');
    response.statusCode(500);
    return response;

  }

};


const getAllNotesHandler = () => ({
  status: 'success',
  data: {
    notes,
  },
});

const getNoteByIdHandler = (request,h) => {
const {id} = request.params;

const note = notes.filter((n) => n.id === id) [0];
if(note !== undefined) {
  return {
    status : 'success',
    data : {
      note,
    },
  };
}
else {
  const response = h.response({
    status : 'fail',
    message : 'Data tidak ditemukan',
  });
  response.statusCode(404);
  return response ;
}
}

const editNoteByIdHandler = (request,h) =>{
  const {id} = request.params;

  const {title,tag,body} = request.payload ;
  const updatedAt = new Date().toISOString();

  const findIndex = notes.findIndex((note)=> note.id === id);

  if (findIndex !== -1){
    notes[findIndex] = {
      ...notes[findIndex],
      title,
      tag,
      body,
      updatedAt,
    }
    const response = h.response({
      status : 'success',
      message : 'Data berhasil ditambahkan',
    })
    response.statusCode(200);
    return response;
  } 
  else{
    const response = h.response({
      status : 'fail',
      message : 'Data tidak ditemukan',
    })
    response.statusCode(404);
    return response;
  }
}

const deleteNoteByIdHandler = (request,h)=>{
const {id} = request.params ;


const findIndex = notes.findIndex((note) => note.id === id);
if (findIndex !== -1){
  notes.splice(findIndex,1)
  const repsonse = h.repsonse({
    status : 'success',
    message : 'data berhasil dihapus',
  })
  repsonse.statusCode(200);
  return response;
} 

}
module.exports = { deleteNoteByIdHandler,editNoteByIdHandler,addNoteHandler, getAllNotesHandler, getNoteByIdHandler };