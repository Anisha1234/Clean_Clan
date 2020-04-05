/**
 * @param {{
    getFile: (filename: string) =>  ReadableStream
  }} FileDB
 * @return {
    (req: Express.Request, res: Express.Response) => Promise<void>
  }
 */
module.exports = (FileDB) => async (req, res)=>{
  try{
    const fileReadStream = await FileDB.getFile(req.params.fileName);
    fileReadStream.pipe(res);
    return;
  } catch(error){
    res.status(500).send(error);
  }
};
