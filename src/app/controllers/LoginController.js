import * as Yup from 'yup'
import User from '../models/User'

class LoginController {
    async store(request, response){
        const schema = Yup.object().shape({
            email: Yup.string().email().required(),
            password: Yup.string().required(),
        })
        if (!(await schema.isValid(request.body))) {

        return response.status(400).json({ error: 'Make sure your password or email are correct' })
        }

        const { email, password } = request.body

        const user = await User.findOne ({
            where: { email },
        })

        if (!user){
            return response.status(400).json({ error: 'Make sure your password or email are correct' })
        }

        if(!(await user.checkPassword(password))){
            return response.status(401).json({ error: 'Make sure your password or email are correct' })
        }

        return response.json({ id: user.id, email, name: user.name, admin: user.admin})
    }
    
}

export default new LoginController()