/**
 * @param {{
    getFile: (filename: string) =>  ReadableStream
  }} FileDB
 * @return {
    (req: Express.Request, res: Express.Response) => Promise<void>
  }
 */
<<<<<<< HEAD
module.exports = (FileDB) => async (req, res) => {
  try {
    const fileReadStream = await FileDB.getFile(req.params.fileName);
    fileReadStream.pipe(res);
    return;
  } catch (error) {
=======
module.exports = (FileDB) => async (req, res)=>{
  try{
    const fileReadStream = await FileDB.getFile(req.params.fileName);
    fileReadStream.pipe(res);
    return;
  } catch(error){
>>>>>>> 15c5f0f... refactor user and files components
    res.status(500).send(error);
  }
};
