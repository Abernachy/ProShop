import mongoose from 'mongoose'
import dotenv from 'dotenv'
import colors from 'colors'
import users from './data/users.js'
import products from './data/products.js'
import User from './models/userModel.js'
import Product from './models/productModel.js'
import Order from './models/orderModel.js'
import connectDB from './config/db.js'

dotenv.config()

connectDB()

const importData = async () => {
	try {
		// To seed we first want to delete the data we have
		await Order.deleteMany()
		await Product.deleteMany()
		await User.deleteMany()

		// Next we will insert some seed data
		//This will create an array of the users that will be inserted into the User table

		const createdUser = await User.insertMany(users)

		const adminUser = createdUser[0]._id

		const sampleProducts = products.map((product) => {
			return { ...product, user: adminUser }
		})
		await Product.insertMany(sampleProducts)
		console.log('Data Imported!'.green.inverse)
		process.exit()
	} catch (error) {
		console.error(`${error}`.red.inverse)
		process.exit(1)
	}
}

const destroyData = async () => {
	try {
		// To seed we first want to delete the data we have
		await Order.deleteMany()
		await Product.deleteMany()
		await User.deleteMany()

		console.log('Data Destroyed!'.red.inverse)
		process.exit()
	} catch (error) {
		console.error(`${error}`.red.inverse)
		process.exit(1)
	}
}

// seeder -d
if (process.argv[2] === '-d') {
	destroyData()
} else {
	importData()
}
