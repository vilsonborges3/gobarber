import File from '../models/File';

class FileController {
  async store(req, res) {
    const { originalname: name, filename: path } = req.file; // sera salvo como name e path cada dado removido da requisisição
    const file = await File.create({
      name,
      path,
    });

    return res.json(file);
  }
}

export default new FileController();
