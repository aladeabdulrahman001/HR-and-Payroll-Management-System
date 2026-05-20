import User from '../../models/userModel.js'
import EmployeeProfile from '../../models/employeeProfileModel.js'
import bcrypt from 'bcrypt'

const seedAdmin = async () => {
  try {
    const existing = await User.findOne({ email: 'admin@company.com' })
    if (existing) return console.log('Admin already exists')

    const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10)

    const user = await User.create({
      email: 'admin@company.com',
      hashedPassword,
      role: 'ADMIN',
      isActive: true
    })

    await EmployeeProfile.create({
      user: user._id,
      firstName: 'Super',
      lastName: 'Admin',
      phone: '09051496462',
      department: 'Management',
      jobTitle: 'Administrator',
      hireDate: Date.now(),
      address: '123 Admin St, Company City',
      isActive: true
    })

    console.log('Admin seeded successfully')
  } catch (err) {
    console.error('Error seeding admin:', err)
  }
}

// seedAdmin()
