import Joi from 'joi'
const schemaProduct = Joi.object({
  title: Joi.string().required().min(3).max(100),
  price: Joi.number().required().min(0),
  description: Joi.string().allow('')
})

export default schemaProduct
