import multer from 'multer';
import path from 'path';

// Définir le dossier de destination et le nom de fichier
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads/'); // Dossier où les images seront enregistrées
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname)); // Nom unique du fichier
  }
});

// Filtrer les fichiers pour s'assurer qu'ils sont bien des images
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb(new Error('Only images are allowed'));
  }
};

// Initialiser multer avec la configuration définie
const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 5 }, // Limite de 5MB par fichier
  fileFilter: fileFilter
});

export default upload;
