import request from '@/utils/request'

export default {
  /**
   * query teacher with condition
   * @param current
   * @param limit how many one page
   * @param teacherQuery  condition
   * @returns {*}
   */
  getTeacherList(current, limit, teacherQuery) {
    return request({
      url: `/eduservice/teacher/pageTeacherCondition/${current}/${limit}`,
      method: 'post',
      // requestBody  data 将数据变为json
      data: teacherQuery
    })
  },
  /**
   * delete teacher by id
   * @param id
   * @returns {AxiosPromise}
   */
  deleteTeacherById(id) {
    return request({
      url: `/eduservice/teacher/${id}`,
      method: 'delete'
    })
  },
  /**
   * add teacher
   * @param teacher
   * @returns {*}
   */
  addTeacher(teacher) {
    return request({
      url: `/eduservice/teacher/addTeacher`,
      method: 'post',
      data: teacher
    })
  },
  getTeacherById(id) {
    return request({
      url: `/eduservice/teacher/getTeacherById/${id}`,
      method: 'get'
    })
  },
  updateTeacher(teacher) {
    return request({
      url: `/eduservice/teacher/updateTeacher`,
      method: 'put',
      data: teacher
    })
  }

}
