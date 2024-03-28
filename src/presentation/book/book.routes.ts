import { Router } from 'express';
import { BookController } from './book.controller';
import { BookDatasourceImpl, BookRepositoryImpl } from '../../infrastructure';
import { AuthMiddleware } from '../middlewares/auth.middleware';

export class BookRoutes {
    static get routes(): Router {
        const router = Router();

        const datasource = new BookDatasourceImpl();

        const repository = new BookRepositoryImpl(datasource);

        const controller = new  BookController(repository)

        router.use(AuthMiddleware.validateJWT)

        
        router.post('/',controller.createBook)
        router.get('/',controller.getAllBooks)
        router.get('/:id',controller.getABook)
        router.delete('/:id',controller.deleteABook)
        router.put('/:id',controller.updateABook)
        router.get('/search/:searchTerm',controller.searchBooks)





        return router;
    }
}