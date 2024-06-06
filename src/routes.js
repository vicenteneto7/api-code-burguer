import { Router } from 'express'
import multer from 'multer'
import multerConfig from './config/multer'
import UserController from './app/controllers/UserController'
import LoginController from './app/controllers/LoginController'
import ProductController from './app/controllers/ProductController'
import authMiddleware from './app/middlewares/auth'
import CategoryController from './app/controllers/CategoryController'

const upload = multer(multerConfig)
const routes = new Router()

routes.post('/users', UserController.store)
routes.post('/login', LoginController.store)

routes.use(authMiddleware) // as rotas abaixo serão chamadas pelo middleware

routes.post('/products', upload.single('file'), ProductController.store)
routes.get('/products', ProductController.index)

routes.post("/categories", upload.single("file"), CategoryController.store)
routes.get("/categories", CategoryController.index)
routes.put("/categories/:id", upload.single("file"), CategoryController.update)

export default routes


