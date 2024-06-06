import Sequelize from 'sequelize'
import configDatabase from '../config/database'
import User from '../app/models/User'
import Product from '../app/models/Products'
import mongoose from 'mongoose'

const models = [User, Product]

class Database {
  constructor() {
    this.init()
    this.mongo()
  }

  init() {
    this.connection = new Sequelize(configDatabase)
    models
      .map((model) => model.init(this.connection))
      .map(
        (model) => model.associate && model.associate(this.connection.models),
      )
  }
  mongo() {
    this.mongoConnection = mongoose.connect(
      'mongodb://mongo:AaFCAg1A3466Dgh4fHbgFC4hc1bACg2C@roundhouse.proxy.rlwy.net:23464',
      {
        useNewUrlParser: true,
      },
    )
  }
}

export default new Database()
