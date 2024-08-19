import multer from 'multer';
import path from 'path';

// Configuración de almacenamiento en disco
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Directorio para almacenar archivos subidos
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname)); // Renombrar archivo
    }
});

// Crear el middleware Multer
const upload = multer({ storage: storage });

export default upload;