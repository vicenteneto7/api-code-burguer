import * as Yup from 'yup'
import Product from '../models/Products'
import Category from '../models/category'
import User from '../models/User'

class ProductController {
    async store(request, response) {
        
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            price: Yup.number().required(),
            category: Yup.string().required(),
           })

        try {
            await schema.validateSync(request.body, { abortEarly: false })
        } catch(err) {
            return response.status(400).json({error: err.errors})
        }

        const { filename: path } = request.file 
        const { name, price, category } = request.body

        const products = await Product.create({
            name,
            price,
            category,
            path
        })

        return response.json(products)
    }

    async index(req, res) {
        const prodcts = await Product.findAll({
          include: [
            {
              model: Category,
              as: "category",
              attributes: ["id", "name"],
            },
          ],
        })
    
        return res.json(prodcts)
      }

      async update(req, res) {
        const schema = Yup.object().shape({
          name: Yup.string(),
          price: Yup.number(),
          category_id: Yup.number(),
          offer: Yup.boolean(),
        })
    
        try {
          await schema.validateSync(req.body, { abortEarly: false })
        } catch (err) {
          return res.status(400).json({ error: err.errors })
        }
    
        const { admin: isAdmin } = await User.findByPk(req.userId)
    
        if (!isAdmin) {
          return res.status(401).json()
        }
    
        const { id } = req.params
    
        const product = await Product.findByPk(id)
    
        if (!product) {
          return res
            .status(401)
            .json({ error: "Make sure your produc ID is correct" })
        }
    
        let path
        if (req.file) {
          path = req.file.filename
        }
    
        const { name, price, category_id, offer } = req.body
    
        await Product.update(
          {
            name,
            price,
            category_id,
            path,
            offer,
          },
          { where: { id } },
        )
    
        return res.status(200).json()
      }
    }

export default new ProductController()