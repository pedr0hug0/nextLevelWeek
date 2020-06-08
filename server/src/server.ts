import express from 'express';
import cors from 'cors'; //rodar recomendaçao typescript
import path from 'path';
import routes from './routes'

const app = express();


app.use(cors());//está permitindo todas -- {origin: 'www.'}
app.use(express.json()); //adicionar plugin para o express reconhecer JSON no request

app.use(routes);

app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads'))); //arquivos staticos (imagens, pdfs, etc)

app.listen(3333);