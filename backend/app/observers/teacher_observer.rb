class TeacherObserver < ActiveRecord::Observer

  def after_create(teacher)
    User.create!(email: teacher.email, mobile_number: teacher.mobile,
      password: SecureRandom.hex(6), resource: teacher,
      role_ids: [Role.find_by(title: 'Teacher').id])
  end

end
